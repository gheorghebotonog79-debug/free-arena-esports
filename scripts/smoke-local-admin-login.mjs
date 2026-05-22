#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd, env, exit, stdout } from "node:process";

const baseUrl = (process.argv[2] || env.SMOKE_BASE_URL || "http://127.0.0.1:3001").replace(/\/+$/, "");
const credentialsFile = resolve(cwd(), "tmp", "local-admin-credentials.txt");
const sessionCookieName = "free_arena_admin_session";

function readCredentialsFile() {
  if (!existsSync(credentialsFile)) {
    return {};
  }

  const values = {};

  for (const line of readFileSync(credentialsFile, "utf8").split(/\r?\n/)) {
    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    values[line.slice(0, separatorIndex)] = line.slice(separatorIndex + 1);
  }

  return values;
}

function getCredentials() {
  const fileValues = readCredentialsFile();
  const identifier = env.LOCAL_ADMIN_EMAIL || fileValues.LOCAL_ADMIN_EMAIL;
  const password = env.LOCAL_ADMIN_PASSWORD || fileValues.LOCAL_ADMIN_PASSWORD;

  if (!identifier || !password) {
    throw new Error("Missing local admin credentials. Run npm run admin:local:seed first.");
  }

  return {
    identifier,
    password,
  };
}

function getSetCookieHeaders(headers) {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  return [headers.get("set-cookie")].filter(Boolean);
}

function getCookieHeader(setCookieHeaders) {
  const sessionCookie = setCookieHeaders.find((cookie) => cookie.startsWith(`${sessionCookieName}=`));

  if (!sessionCookie) {
    throw new Error("Login did not return the admin session cookie.");
  }

  return sessionCookie.split(";")[0];
}

async function readText(response) {
  return await response.text();
}

try {
  const credentials = getCredentials();
  const formData = new FormData();
  formData.set("identifier", credentials.identifier);
  formData.set("password", credentials.password);
  formData.set("next", "/admin/dashboard");

  stdout.write("FREE-ARENA local admin login smoke\n");
  stdout.write(`Base URL: ${baseUrl}\n`);
  stdout.write(`Identifier: ${credentials.identifier}\n\n`);

  const loginResponse = await fetch(`${baseUrl}/api/admin/auth/login`, {
    body: formData,
    method: "POST",
    redirect: "manual",
  });

  if (![302, 303, 307, 308].includes(loginResponse.status)) {
    throw new Error(`Login expected redirect, got HTTP ${loginResponse.status}.`);
  }

  const location = loginResponse.headers.get("location") || "";

  if (!location.includes("/admin/dashboard")) {
    throw new Error(`Login redirect did not target /admin/dashboard. Location: ${location}`);
  }

  const cookieHeader = getCookieHeader(getSetCookieHeaders(loginResponse.headers));
  stdout.write("PASS login redirect and session cookie\n");

  const sessionResponse = await fetch(`${baseUrl}/api/admin/session`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  const sessionPayload = await sessionResponse.json();

  if (sessionResponse.status !== 200 || sessionPayload?.ok !== true || sessionPayload?.user?.role !== "co_owner") {
    throw new Error(`Session check failed with HTTP ${sessionResponse.status}.`);
  }

  stdout.write("PASS admin session API\n");

  const dashboardResponse = await fetch(`${baseUrl}/admin/dashboard`, {
    headers: {
      Cookie: cookieHeader,
    },
    redirect: "manual",
  });
  const dashboardHtml = await readText(dashboardResponse);

  if (dashboardResponse.status !== 200 || !dashboardHtml.includes("Admin dashboard")) {
    throw new Error(`Dashboard check failed with HTTP ${dashboardResponse.status}.`);
  }

  stdout.write("PASS admin dashboard page\n");
  stdout.write("\n3/3 checks passed.\n");
} catch (error) {
  stdout.write(`${error instanceof Error ? error.message : "Unknown local admin login smoke error."}\n`);
  exit(1);
}
