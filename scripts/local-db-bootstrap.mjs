#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { connect } from "node:net";
import { resolve } from "node:path";
import { cwd, env, execPath, exit, platform, stdout } from "node:process";

const composeFile = "docker-compose.postgres.yml";
const defaultDatabaseUrl =
  "postgresql://free_arena:free_arena@localhost:5432/free_arena?schema=public";
const databaseUrl = env.LOCAL_DATABASE_URL || env.DATABASE_URL || defaultDatabaseUrl;
const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");
const skipSeed = args.has("--skip-seed");

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
    shell: platform === "win32" && command.endsWith(".cmd"),
    stdio: options.capture ? "pipe" : "inherit",
  });

  if (result.status !== 0) {
    if (options.capture) {
      stdout.write([result.stdout, result.stderr].filter(Boolean).join("\n"));
    }

    throw new Error(`${command} ${commandArgs.join(" ")} failed.`);
  }

  return result;
}

function getPrismaCommand() {
  const localPrismaCli = resolve(cwd(), "node_modules", "prisma", "build", "index.js");

  if (!existsSync(localPrismaCli)) {
    throw new Error("Local Prisma CLI not found. Run npm install first.");
  }

  return {
    args: [localPrismaCli],
    command: execPath,
  };
}

function waitForPort(host, port, timeoutMs = 60_000) {
  const startedAt = Date.now();

  return new Promise((resolveWait, rejectWait) => {
    const tryConnect = () => {
      const socket = connect({ host, port });

      socket.once("connect", () => {
        socket.end();
        resolveWait();
      });

      socket.once("error", () => {
        socket.destroy();

        if (Date.now() - startedAt > timeoutMs) {
          rejectWait(new Error(`Timed out waiting for ${host}:${port}.`));
          return;
        }

        setTimeout(tryConnect, 1000);
      });
    };

    tryConnect();
  });
}

function parsePortFromDatabaseUrl(value) {
  try {
    return Number(new URL(value).port || 5432);
  } catch {
    return 5432;
  }
}

function printEnvWarning() {
  const missingSeed = ["ADMIN_SEED_EMAIL", "ADMIN_SEED_USERNAME", "ADMIN_SEED_PASSWORD_HASH"].filter(
    (name) => !env[name],
  );

  if (missingSeed.length > 0) {
    stdout.write(`Seed admin will be skipped unless these env values are set: ${missingSeed.join(", ")}\n`);
  }
}

try {
  stdout.write("FREE-ARENA local PostgreSQL bootstrap\n");
  stdout.write(`Database URL: ${databaseUrl.replace(/:[^:@/]+@/, ":***@")}\n`);

  run("docker", ["--version"], { capture: true });
  run("docker", ["compose", "-f", composeFile, "config"], { capture: true });

  const prisma = getPrismaCommand();
  run(prisma.command, [...prisma.args, "validate"], { capture: true });

  if (checkOnly) {
    stdout.write("Local DB bootstrap check OK.\n");
    exit(0);
  }

  printEnvWarning();
  run("docker", ["compose", "-f", composeFile, "up", "-d"]);
  await waitForPort("127.0.0.1", parsePortFromDatabaseUrl(databaseUrl));

  run(prisma.command, [...prisma.args, "migrate", "deploy"]);

  if (!skipSeed) {
    run(prisma.command, [...prisma.args, "db", "seed"]);
  }

  stdout.write("Local PostgreSQL bootstrap complete.\n");
} catch (error) {
  stdout.write(`${error instanceof Error ? error.message : "Unknown local DB bootstrap error."}\n`);
  exit(1);
}
