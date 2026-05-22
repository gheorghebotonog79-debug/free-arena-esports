import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;
const PASSWORD_HASH_PREFIX = "scrypt:v1";

function toBase64Url(buffer: Buffer) {
  return buffer.toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url");
}

export async function hashAdminPassword(password: string) {
  const salt = randomBytes(24);
  const key = await scrypt(password, salt, KEY_LENGTH);

  return `${PASSWORD_HASH_PREFIX}:${toBase64Url(salt)}:${toBase64Url(key as Buffer)}`;
}

export async function verifyAdminPassword(password: string, storedHash: string) {
  const [algorithm, version, salt, expectedHash] = storedHash.split(":");

  if (`${algorithm}:${version}` !== PASSWORD_HASH_PREFIX || !salt || !expectedHash) {
    return false;
  }

  const expected = fromBase64Url(expectedHash);
  const actual = await scrypt(password, fromBase64Url(salt), expected.length);

  if (!(actual instanceof Buffer) || actual.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}
