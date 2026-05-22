#!/usr/bin/env node

import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { cwd, env, exit, stdout } from "node:process";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const keyLength = 64;
const defaultDatabaseUrl =
  "postgresql://free_arena:free_arena@localhost:5432/free_arena?schema=public";
const credentialsPath = resolve(cwd(), "tmp", "local-admin-credentials.txt");

process.env.DATABASE_URL ||= env.LOCAL_DATABASE_URL || defaultDatabaseUrl;

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

function toBase64Url(buffer) {
  return Buffer.from(buffer).toString("base64url");
}

async function hashPassword(password) {
  const salt = randomBytes(24);
  const key = await scrypt(password, salt, keyLength);

  return `scrypt:v1:${toBase64Url(salt)}:${toBase64Url(key)}`;
}

function createPassword() {
  return `FreeArena-${randomBytes(18).toString("base64url")}`;
}

function redactDatabaseUrl(value) {
  return value.replace(/:[^:@/]+@/, ":***@");
}

try {
  const email = env.LOCAL_ADMIN_EMAIL || "admin.local@free-arena.ro";
  const username = env.LOCAL_ADMIN_USERNAME || "local_co_owner";
  const password = env.LOCAL_ADMIN_PASSWORD || createPassword();
  const passwordHash = await hashPassword(password);

  const role = await prisma.adminRole.findUnique({
    where: {
      name: "co_owner",
    },
  });

  if (!role) {
    throw new Error("co_owner role is missing. Run npm run db:local:bootstrap first.");
  }

  const admin = await prisma.user.upsert({
    create: {
      email,
      isActive: true,
      passwordHash,
      role: "co_owner",
      username,
    },
    update: {
      isActive: true,
      passwordHash,
      role: "co_owner",
      username,
    },
    where: {
      email,
    },
  });

  await prisma.adminAuditLog.create({
    data: {
      actorId: admin.id,
      action: "admin.local_seed",
      target: "User",
      metadata: {
        email,
        role: "co_owner",
      },
    },
  });

  mkdirSync(dirname(credentialsPath), { recursive: true });
  writeFileSync(
    credentialsPath,
    [
      "FREE-ARENA local admin credentials",
      "Do not commit this file. It is ignored by Git.",
      "",
      `DATABASE_URL=${redactDatabaseUrl(process.env.DATABASE_URL)}`,
      `LOCAL_ADMIN_EMAIL=${email}`,
      `LOCAL_ADMIN_USERNAME=${username}`,
      `LOCAL_ADMIN_PASSWORD=${password}`,
      "",
      "Use only for local admin smoke testing.",
    ].join("\n"),
    "utf8",
  );

  stdout.write("FREE-ARENA local admin seed complete.\n");
  stdout.write(`Admin email: ${email}\n`);
  stdout.write(`Admin username: ${username}\n`);
  stdout.write(`Credentials file: ${credentialsPath}\n`);
} catch (error) {
  stdout.write(`${error instanceof Error ? error.message : "Unknown local admin seed error."}\n`);
  exit(1);
} finally {
  await prisma.$disconnect();
}
