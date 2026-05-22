#!/usr/bin/env node

import { stdout, exit } from "node:process";

const defaultDatabaseUrl =
  "postgresql://free_arena:free_arena@localhost:5432/free_arena?schema=public";

process.env.DATABASE_URL ||= process.env.LOCAL_DATABASE_URL || defaultDatabaseUrl;

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

function redactDatabaseUrl(value) {
  return value.replace(/:[^:@/]+@/, ":***@");
}

function assertMinimum(name, count, minimum) {
  if (count < minimum) {
    throw new Error(`${name} expected at least ${minimum}, got ${count}.`);
  }
}

try {
  const [roles, gameServers, settings, users, migrations] = await Promise.all([
    prisma.adminRole.count(),
    prisma.gameServer.count(),
    prisma.systemSetting.count(),
    prisma.user.count(),
    prisma.$queryRaw`SELECT COUNT(*)::int AS count FROM "_prisma_migrations"`,
  ]);
  const migrationCount = Number(migrations[0]?.count ?? 0);

  assertMinimum("admin roles", roles, 5);
  assertMinimum("game servers", gameServers, 4);
  assertMinimum("system settings", settings, 4);
  assertMinimum("migrations", migrationCount, 2);

  stdout.write("FREE-ARENA local database verification\n");
  stdout.write(`Database URL: ${redactDatabaseUrl(process.env.DATABASE_URL)}\n`);
  stdout.write(`PASS admin roles: ${roles}\n`);
  stdout.write(`PASS game servers: ${gameServers}\n`);
  stdout.write(`PASS system settings: ${settings}\n`);
  stdout.write(`PASS migrations: ${migrationCount}\n`);
  stdout.write(`INFO users: ${users}\n`);

  if (users === 0) {
    stdout.write("INFO admin user is not seeded yet. Set ADMIN_SEED_* env values to test login.\n");
  }
} catch (error) {
  stdout.write(`${error instanceof Error ? error.message : "Unknown local DB verification error."}\n`);
  exit(1);
} finally {
  await prisma.$disconnect();
}
