#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { cwd, env, exit, platform, stdout } from "node:process";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const environment = readArg("--environment") ?? "production";
const fromFile = readArg("--from");
const required = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "ADMIN_SEED_EMAIL",
  "ADMIN_SEED_USERNAME",
  "ADMIN_SEED_PASSWORD_HASH",
];
const recommended = [
  "NEXTAUTH_URL",
  "ADMIN_SESSION_MAX_AGE_SECONDS",
  "TEAMSPEAK_HOST",
  "TEAMSPEAK_VOICE_PORT",
  "TEAMSPEAK_QUERY_PORT",
  "TEAMSPEAK_VIRTUAL_SERVER_ID",
];
const optional = [
  "DISCORD_CLIENT_ID",
  "DISCORD_CLIENT_SECRET",
  "DISCORD_GUILD_ID",
  "DISCORD_INVITE_CODE",
  "DISCORD_BOT_TOKEN",
  "DISCORD_CHANNEL_NEWS_ID",
  "STEAM_API_KEY",
  "TEAMSPEAK_QUERY_USER",
  "TEAMSPEAK_QUERY_PASSWORD",
  "TEAMSPEAK_STATUS_URL",
  "TEAMSPEAK_STATUS_TOKEN",
];
const knownKeys = new Set([...required, ...recommended, ...optional]);

function readArg(name) {
  const index = args.indexOf(name);

  if (index === -1) {
    return null;
  }

  return args[index + 1] ?? null;
}

function quoteWindows(value) {
  return `"${value.replace(/"/g, '""')}"`;
}

function findVercelCandidates() {
  const candidates = [];

  if (env.VERCEL_CLI_PATH) {
    candidates.push(env.VERCEL_CLI_PATH);
  }

  candidates.push(platform === "win32" ? "vercel.cmd" : "vercel");

  const localBin = resolve(
    cwd(),
    "node_modules",
    ".bin",
    platform === "win32" ? "vercel.cmd" : "vercel",
  );

  if (existsSync(localBin)) {
    candidates.unshift(localBin);
  }

  if (platform === "win32" && env.LOCALAPPDATA) {
    const npxRoot = join(env.LOCALAPPDATA, "npm-cache", "_npx");

    if (existsSync(npxRoot)) {
      for (const entry of readdirSync(npxRoot, { withFileTypes: true })) {
        if (!entry.isDirectory()) {
          continue;
        }

        const candidate = join(npxRoot, entry.name, "node_modules", ".bin", "vercel.cmd");

        if (existsSync(candidate)) {
          candidates.push(candidate);
        }
      }
    }
  }

  return [...new Set(candidates)];
}

function runVercelEnvList() {
  const commandArgs = ["env", "list", environment, "--format", "json", "--non-interactive"];

  for (const candidate of findVercelCandidates()) {
    const result =
      platform === "win32" && candidate.endsWith(".cmd")
        ? spawnSync([quoteWindows(candidate), ...commandArgs].join(" "), {
            cwd: cwd(),
            encoding: "utf8",
            shell: true,
          })
        : spawnSync(candidate, commandArgs, {
            cwd: cwd(),
            encoding: "utf8",
          });

    if (result.status === 0 && result.stdout) {
      return {
        ok: true,
        output: result.stdout,
        source: basename(candidate),
      };
    }
  }

  return {
    ok: false,
    output: "",
    source: "not-found",
  };
}

function readAuditSource() {
  if (fromFile) {
    const filePath = resolve(cwd(), fromFile);

    return {
      ok: true,
      output: readFileSync(filePath, "utf8"),
      source: filePath,
    };
  }

  return runVercelEnvList();
}

function extractConfiguredKeys(output) {
  const configured = new Set();

  try {
    const payload = JSON.parse(output);
    collectKnownKeys(payload, configured);
    return configured;
  } catch {
    // Fall through to text parsing for older Vercel CLI output.
  }

  for (const line of output.split(/\r?\n/)) {
    const tokens = line.match(/\b[A-Z][A-Z0-9_]{2,}\b/g) ?? [];

    for (const token of tokens) {
      if (knownKeys.has(token)) {
        configured.add(token);
      }
    }
  }

  return configured;
}

function collectKnownKeys(value, configured) {
  if (typeof value === "string") {
    if (knownKeys.has(value)) {
      configured.add(value);
    }

    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectKnownKeys(item, configured);
    }

    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    if ((key === "key" || key === "name") && typeof nestedValue === "string" && knownKeys.has(nestedValue)) {
      configured.add(nestedValue);
      continue;
    }

    collectKnownKeys(nestedValue, configured);
  }
}

function printGroup(title, keys, configured) {
  stdout.write(`${title}\n`);

  for (const key of keys) {
    stdout.write(`  ${configured.has(key) ? "PASS" : "MISS"} ${key}\n`);
  }

  stdout.write("\n");
}

const source = readAuditSource();

stdout.write("FREE-ARENA Vercel ENV audit\n");
stdout.write(`Environment: ${environment}\n`);
stdout.write(`Mode: ${strict ? "strict" : "advisory"}\n`);

if (!source.ok) {
  stdout.write("Source: Vercel CLI not available or env list failed.\n");
  stdout.write("Set VERCEL_CLI_PATH or pass --from <saved-vercel-env-list.txt>.\n");
  exit(1);
}

stdout.write(`Source: ${source.source}\n\n`);

const configured = extractConfiguredKeys(source.output);
const missingRequired = required.filter((key) => !configured.has(key));
const missingRecommended = recommended.filter((key) => !configured.has(key));

printGroup("Required for admin activation", required, configured);
printGroup("Recommended runtime ENV", recommended, configured);
printGroup("Optional integrations", optional, configured);

if (missingRequired.length === 0) {
  stdout.write("Backend activation ENV status: ready\n");
} else {
  stdout.write(`Backend activation ENV status: blocked (${missingRequired.join(", ")})\n`);
}

if (missingRecommended.length > 0) {
  stdout.write(`Recommended ENV still missing: ${missingRecommended.join(", ")}\n`);
}

if (strict && missingRequired.length > 0) {
  exit(1);
}
