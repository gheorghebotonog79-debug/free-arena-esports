import { stdout, stderr, exit } from "node:process";

const DEFAULT_BASE_URL = "http://127.0.0.1:3000";
const REQUEST_TIMEOUT_MS = 20_000;

const baseUrl = normalizeBaseUrl(process.argv[2] || process.env.SMOKE_BASE_URL || DEFAULT_BASE_URL);

const checks = [
  {
    name: "RO public page",
    path: "/ro",
    expectedStatus: 200,
    includes: "FREE-ARENA.RO",
  },
  {
    name: "EN public page",
    path: "/en",
    expectedStatus: 200,
    includes: "FREE-ARENA.RO",
  },
  {
    name: "Admin login page",
    path: "/admin/login",
    expectedStatus: 200,
    includes: "Admin login",
  },
  {
    name: "Admin setup page",
    path: "/admin/setup",
    expectedStatus: 200,
    includes: "Admin setup status",
  },
  {
    name: "Admin setup JSON",
    path: "/api/admin/setup/status",
    expectedStatus: 200,
    json: (payload) => Boolean(payload?.checks?.database && payload?.checks?.authSecret),
    cacheControlIncludes: "no-store",
  },
  {
    name: "Admin servers page protected",
    path: "/admin/servers",
    expectedStatus: [302, 307, 308],
    locationIncludes: "/admin/login",
  },
  {
    name: "Admin news page protected",
    path: "/admin/news",
    expectedStatus: [302, 307, 308],
    locationIncludes: "/admin/login",
  },
  {
    name: "Admin API protected",
    path: "/api/admin/servers",
    expectedStatus: 401,
    json: (payload) => payload?.ok === false && payload?.error === "unauthorized",
    cacheControlIncludes: "no-store",
  },
  {
    name: "Admin mutation CSRF",
    path: "/api/admin/servers",
    method: "POST",
    body: "{}",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://evil.example",
    },
    expectedStatus: 403,
    json: (payload) => payload?.ok === false && payload?.error === "csrf",
    cacheControlIncludes: "no-store",
  },
  {
    name: "Health endpoint responds",
    path: "/api/health",
    expectedStatus: [200, 503],
    json: (payload) => Boolean(payload?.checks && payload?.timestamp),
    allowDegraded: true,
  },
];

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
}

function expectedStatusMatches(actual, expected) {
  return Array.isArray(expected) ? expected.includes(actual) : actual === expected;
}

function formatExpectedStatus(expected) {
  return Array.isArray(expected) ? expected.join("/") : String(expected);
}

async function readResponsePayload(response) {
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json") && text) {
    try {
      return {
        json: JSON.parse(text),
        text,
      };
    } catch {
      return {
        json: null,
        text,
      };
    }
  }

  return {
    json: null,
    text,
  };
}

async function runCheck(check) {
  const url = `${baseUrl}${check.path}`;
  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      body: check.body,
      headers: check.headers,
      method: check.method || "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const latencyMs = Date.now() - startedAt;
    const { json, text } = await readResponsePayload(response);
    const errors = [];

    if (!expectedStatusMatches(response.status, check.expectedStatus)) {
      errors.push(`expected HTTP ${formatExpectedStatus(check.expectedStatus)}, got ${response.status}`);
    }

    if (check.includes && !text.includes(check.includes)) {
      errors.push(`response did not include "${check.includes}"`);
    }

    if (check.locationIncludes) {
      const location = response.headers.get("location") || "";

      if (!location.includes(check.locationIncludes)) {
        errors.push(`Location header did not include "${check.locationIncludes}"`);
      }
    }

    if (check.json && !check.json(json)) {
      errors.push("JSON payload did not match expected shape");
    }

    if (check.cacheControlIncludes) {
      const cacheControl = response.headers.get("cache-control") || "";

      if (!cacheControl.includes(check.cacheControlIncludes)) {
        errors.push(`Cache-Control header did not include "${check.cacheControlIncludes}"`);
      }
    }

    if (check.allowDegraded && json?.status === "degraded") {
      return {
        ...check,
        latencyMs,
        ok: errors.length === 0,
        status: response.status,
        warning: "degraded",
        errors,
      };
    }

    return {
      ...check,
      latencyMs,
      ok: errors.length === 0,
      status: response.status,
      errors,
    };
  } catch (error) {
    return {
      ...check,
      latencyMs: Date.now() - startedAt,
      ok: false,
      status: "ERR",
      errors: [error instanceof Error ? error.message : "Unknown request failure"],
    };
  }
}

function printResult(result) {
  const label = result.ok ? "PASS" : "FAIL";
  const warning = result.warning ? ` (${result.warning})` : "";
  const line = `${label.padEnd(4)} ${String(result.status).padEnd(4)} ${String(result.latencyMs).padStart(5)}ms ${result.name}${warning}`;

  stdout.write(`${line}\n`);

  for (const error of result.errors) {
    stdout.write(`     - ${error}\n`);
  }
}

stdout.write(`FREE-ARENA smoke checks\nBase URL: ${baseUrl}\n\n`);

const results = [];

for (const check of checks) {
  const result = await runCheck(check);
  results.push(result);
  printResult(result);
}

const failed = results.filter((result) => !result.ok);

stdout.write(`\n${results.length - failed.length}/${results.length} checks passed.\n`);

if (failed.length > 0) {
  stderr.write(`${failed.length} smoke check(s) failed.\n`);
  exit(1);
}
