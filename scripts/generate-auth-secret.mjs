#!/usr/bin/env node

import { randomBytes } from "node:crypto";
import { stdout } from "node:process";

const args = new Set(process.argv.slice(2));
const bytes = 48;
const secret = randomBytes(bytes).toString("base64url");

if (args.has("--check")) {
  stdout.write(`AUTH_SECRET generator OK (${bytes} random bytes, ${secret.length} base64url characters).\n`);
  process.exit(0);
}

if (args.has("--plain")) {
  stdout.write(`${secret}\n`);
  process.exit(0);
}

stdout.write(`# Generated FREE-ARENA admin auth secret\n`);
stdout.write(`# Do not commit this value. Add it only to Vercel ENV / local private env.\n`);
stdout.write(`AUTH_SECRET=${secret}\n`);
