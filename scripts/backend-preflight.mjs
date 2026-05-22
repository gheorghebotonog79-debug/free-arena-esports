#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd, execPath, exit, platform } from "node:process";

const root = cwd();
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const checkDb = args.has("--check-db");
const env = { ...process.env };
const checks = [];

function loadEnvFile(filename) {
  const filePath = resolve(root, filename);

  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!Object.prototype.hasOwnProperty.call(env, key)) {
      env[key] = value;
    }
  }
}

function getEnv(name) {
  return env[name]?.trim() ?? "";
}

function isPlaceholder(value) {
  return /USER|PASSWORD|HOST|CHANGE_ME|example|localhost/i.test(value);
}

function addCheck({ detail, name, ok, strictRequired = false, warning = false }) {
  let status = ok ? "PASS" : warning ? "WARN" : "FAIL";

  if (!ok && strict && strictRequired) {
    status = "FAIL";
  } else if (!ok && strictRequired) {
    status = "WARN";
  }

  checks.push({
    detail,
    name,
    ok,
    status,
    strictRequired,
  });
}

function run(command, commandArgs) {
  const commandEnv = { ...process.env, ...env };
  const localPrismaCli = resolve(root, "node_modules", "prisma", "build", "index.js");
  const executable =
    command === "prisma" && existsSync(localPrismaCli)
      ? execPath
      : platform === "win32" && command === "npx"
        ? "npx.cmd"
        : command;
  const args = command === "prisma" && existsSync(localPrismaCli)
    ? [localPrismaCli, ...commandArgs]
    : commandArgs;

  if (!commandEnv.DATABASE_URL) {
    commandEnv.DATABASE_URL =
      "postgresql://free_arena:free_arena@localhost:5432/free_arena?schema=public";
  }

  const result = spawnSync(executable, args, {
    cwd: root,
    encoding: "utf8",
    env: commandEnv,
  });

  return {
    ok: result.status === 0,
    output: [result.error?.message, result.stdout, result.stderr].filter(Boolean).join("\n").trim(),
  };
}

function checkFiles() {
  addCheck({
    detail: "prisma/schema.prisma exists.",
    name: "Prisma schema",
    ok: existsSync(resolve(root, "prisma/schema.prisma")),
  });

  const migrationsPath = resolve(root, "prisma/migrations");
  const migrationCount = existsSync(migrationsPath)
    ? readdirSync(migrationsPath, { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
    : 0;

  addCheck({
    detail:
      migrationCount > 0
        ? `${migrationCount} migration folder(s) found.`
        : "No migration folders found.",
    name: "Prisma migrations",
    ok: migrationCount > 0,
  });

  addCheck({
    detail: "prisma/seed.mjs exists.",
    name: "Seed script",
    ok: existsSync(resolve(root, "prisma/seed.mjs")),
  });
}

function checkEnv() {
  const databaseUrl = getEnv("DATABASE_URL");
  const authSecret = getEnv("AUTH_SECRET");
  const seedEmail = getEnv("ADMIN_SEED_EMAIL");
  const seedUsername = getEnv("ADMIN_SEED_USERNAME");
  const seedPasswordHash = getEnv("ADMIN_SEED_PASSWORD_HASH");

  addCheck({
    detail:
      databaseUrl && !isPlaceholder(databaseUrl)
        ? "DATABASE_URL is configured and does not look like a placeholder."
        : "DATABASE_URL is missing or still looks like a placeholder.",
    name: "DATABASE_URL",
    ok: Boolean(databaseUrl) && !isPlaceholder(databaseUrl),
    strictRequired: true,
  });

  addCheck({
    detail:
      authSecret.length >= 32
        ? "AUTH_SECRET is configured with production-safe length."
        : "AUTH_SECRET is missing or shorter than 32 characters.",
    name: "AUTH_SECRET",
    ok: authSecret.length >= 32,
    strictRequired: true,
  });

  addCheck({
    detail: seedEmail ? "ADMIN_SEED_EMAIL is configured." : "ADMIN_SEED_EMAIL is missing.",
    name: "ADMIN_SEED_EMAIL",
    ok: Boolean(seedEmail),
    strictRequired: true,
  });

  addCheck({
    detail: seedUsername ? "ADMIN_SEED_USERNAME is configured." : "ADMIN_SEED_USERNAME is missing.",
    name: "ADMIN_SEED_USERNAME",
    ok: Boolean(seedUsername),
    strictRequired: true,
  });

  addCheck({
    detail:
      /^scrypt:v1:[A-Za-z0-9_-]+:[A-Za-z0-9_-]+$/.test(seedPasswordHash)
        ? "ADMIN_SEED_PASSWORD_HASH uses the expected scrypt:v1 format."
        : "ADMIN_SEED_PASSWORD_HASH is missing or not in the expected scrypt:v1 format.",
    name: "ADMIN_SEED_PASSWORD_HASH",
    ok: /^scrypt:v1:[A-Za-z0-9_-]+:[A-Za-z0-9_-]+$/.test(seedPasswordHash),
    strictRequired: true,
  });
}

function checkPrismaCommands() {
  const validate = run("prisma", ["validate"]);

  addCheck({
    detail: validate.ok ? "Prisma schema validates." : `Prisma validate failed:\n${validate.output}`,
    name: "Prisma validate",
    ok: validate.ok,
  });

  const generate = run("prisma", ["generate"]);

  addCheck({
    detail: generate.ok ? "Prisma Client generates successfully." : `Prisma generate failed:\n${generate.output}`,
    name: "Prisma generate",
    ok: generate.ok,
  });
}

function checkDatabaseConnection() {
  const databaseUrl = getEnv("DATABASE_URL");

  if (!checkDb) {
    addCheck({
      detail: "Database connection check skipped. Pass --check-db after DATABASE_URL is real.",
      name: "Database connection",
      ok: false,
      warning: true,
    });
    return;
  }

  if (!databaseUrl || isPlaceholder(databaseUrl)) {
    addCheck({
      detail: "Database connection check cannot run until DATABASE_URL is configured.",
      name: "Database connection",
      ok: false,
      strictRequired: true,
    });
    return;
  }

  const migrateStatus = run("prisma", ["migrate", "status"]);

  addCheck({
    detail: migrateStatus.ok
      ? "Prisma can reach the database and inspect migration status."
      : `Prisma migrate status failed:\n${migrateStatus.output}`,
    name: "Database connection",
    ok: migrateStatus.ok,
    strictRequired: true,
  });
}

function printSummary() {
  const failed = checks.filter((check) => check.status === "FAIL");
  const warnings = checks.filter((check) => check.status === "WARN");

  console.log("FREE-ARENA backend preflight");
  console.log(`Mode: ${strict ? "strict" : "advisory"}${checkDb ? " + database check" : ""}`);
  console.log("");

  for (const check of checks) {
    console.log(`${check.status.padEnd(4)} ${check.name}`);
    console.log(`     ${check.detail.replace(/\n/g, "\n     ")}`);
  }

  console.log("");
  console.log(`${checks.length - failed.length - warnings.length}/${checks.length} passed`);

  if (warnings.length > 0) {
    console.log(`${warnings.length} warning(s) need attention before production admin activation.`);
  }

  if (failed.length > 0) {
    console.log(`${failed.length} failure(s) found.`);
  }

  if (strict && [...failed, ...warnings].some((check) => check.strictRequired || check.status === "FAIL")) {
    exit(1);
  }

  if (!strict && failed.some((check) => !check.strictRequired)) {
    exit(1);
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

checkFiles();
checkEnv();
checkPrismaCommands();
checkDatabaseConnection();
printSummary();
