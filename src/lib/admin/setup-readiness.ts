import { db } from "@/lib/db";

export type SetupCheckState = "missing" | "ok" | "pending" | "warning";

export type SetupReadinessCheck = {
  configured: boolean;
  detail: string;
  label: string;
  status: SetupCheckState;
};

export type SetupReadiness = {
  checks: {
    adminSeed: SetupReadinessCheck;
    authSecret: SetupReadinessCheck;
    database: SetupReadinessCheck;
    migrationSeed: SetupReadinessCheck;
  };
  ok: boolean;
  status: "blocked" | "ok" | "pending";
  timestamp: string;
};

function hasEnv(name: string) {
  return Boolean(process.env[name]?.trim());
}

function envCheck(name: string, label: string, detail: string): SetupReadinessCheck {
  const configured = hasEnv(name);

  return {
    configured,
    detail: configured ? `${label} is configured.` : detail,
    label,
    status: configured ? "ok" : "missing",
  };
}

async function checkDatabase(): Promise<SetupReadinessCheck> {
  const configured = hasEnv("DATABASE_URL");

  if (!configured) {
    return {
      configured: false,
      detail: "DATABASE_URL is not configured. Admin login and CRUD cannot reach PostgreSQL yet.",
      label: "Database URL",
      status: "missing",
    };
  }

  try {
    await db.$queryRaw`SELECT 1`;

    return {
      configured: true,
      detail: "Database connection responds.",
      label: "Database URL",
      status: "ok",
    };
  } catch {
    return {
      configured: true,
      detail: "DATABASE_URL exists, but the database connection did not respond.",
      label: "Database URL",
      status: "warning",
    };
  }
}

async function checkMigrationSeed(databaseConfigured: boolean): Promise<SetupReadinessCheck> {
  if (!databaseConfigured) {
    return {
      configured: false,
      detail: "Run migrations and seed after DATABASE_URL is configured.",
      label: "Migrations and seed",
      status: "pending",
    };
  }

  try {
    const [roles, seededAdmins] = await Promise.all([
      db.adminRole.count(),
      db.user.count({
        where: {
          isActive: true,
          passwordHash: {
            not: null,
          },
          role: "co_owner",
        },
      }),
    ]);

    const configured = roles > 0 && seededAdmins > 0;

    return {
      configured,
      detail: configured
        ? `${roles} admin roles and ${seededAdmins} seeded co-owner account(s) found.`
        : "Database responds, but admin roles or seeded co-owner account are missing.",
      label: "Migrations and seed",
      status: configured ? "ok" : "pending",
    };
  } catch {
    return {
      configured: false,
      detail: "Database connected, but schema/seed checks failed. Run db:migrate and db:seed.",
      label: "Migrations and seed",
      status: "warning",
    };
  }
}

function checkAdminSeedEnv(): SetupReadinessCheck {
  const required = ["ADMIN_SEED_EMAIL", "ADMIN_SEED_USERNAME", "ADMIN_SEED_PASSWORD_HASH"];
  const missing = required.filter((name) => !hasEnv(name));

  return {
    configured: missing.length === 0,
    detail:
      missing.length === 0
        ? "Admin seed environment values are configured."
        : `Missing seed env: ${missing.join(", ")}.`,
    label: "Admin seed ENV",
    status: missing.length === 0 ? "ok" : "missing",
  };
}

export async function getSetupReadiness(): Promise<SetupReadiness> {
  const database = await checkDatabase();
  const migrationSeed = await checkMigrationSeed(database.configured && database.status === "ok");
  const authSecret = envCheck(
    "AUTH_SECRET",
    "Auth secret",
    "AUTH_SECRET is required for production admin sessions.",
  );
  const adminSeed = checkAdminSeedEnv();
  const checks = {
    adminSeed,
    authSecret,
    database,
    migrationSeed,
  };
  const ok = Object.values(checks).every((check) => check.status === "ok");
  const hasMissing = Object.values(checks).some((check) => check.status === "missing");

  return {
    checks,
    ok,
    status: ok ? "ok" : hasMissing ? "blocked" : "pending",
    timestamp: new Date().toISOString(),
  };
}
