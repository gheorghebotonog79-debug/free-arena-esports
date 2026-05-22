import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { stdin, stdout, stderr } from "node:process";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

function toBase64Url(buffer) {
  return Buffer.from(buffer).toString("base64url");
}

async function readPasswordFromStdin() {
  const chunks = [];

  for await (const chunk of stdin) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8").trim();
}

async function hashPassword(password) {
  const salt = randomBytes(24);
  const key = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt:v1:${toBase64Url(salt)}:${toBase64Url(key)}`;
}

const password = process.argv[2] ?? await readPasswordFromStdin();

if (!password || password.length < 12) {
  stderr.write("Password must be at least 12 characters.\n");
  process.exit(1);
}

stdout.write(`${await hashPassword(password)}\n`);
