#!/usr/bin/env node

const baseUrl = (process.argv[2] ?? process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);

const requiredHeaders = [
  ["strict-transport-security", "max-age=63072000; includeSubDomains; preload"],
  ["x-frame-options", "DENY"],
  ["x-content-type-options", "nosniff"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["permissions-policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()"],
  ["cross-origin-opener-policy", "same-origin"],
];

const checks = [
  {
    label: "RO page security headers",
    path: "/ro",
  },
  {
    label: "Admin login security headers",
    path: "/admin/login",
  },
  {
    label: "Health API security headers",
    path: "/api/health",
  },
];

function normalize(value) {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

async function runCheck(check) {
  const started = performance.now();
  const response = await fetch(`${baseUrl}${check.path}`, {
    redirect: "manual",
  });
  const duration = Math.round(performance.now() - started);
  const missing = [];

  for (const [header, expectedValue] of requiredHeaders) {
    const value = normalize(response.headers.get(header));

    if (value !== expectedValue) {
      missing.push(`${header}: expected "${expectedValue}", got "${value || "(missing)"}"`);
    }
  }

  return {
    duration,
    label: check.label,
    missing,
    ok: missing.length === 0,
    status: response.status,
  };
}

const results = [];

for (const check of checks) {
  try {
    results.push(await runCheck(check));
  } catch (error) {
    results.push({
      duration: 0,
      label: check.label,
      missing: [error instanceof Error ? error.message : "Unknown request error."],
      ok: false,
      status: "ERR",
    });
  }
}

console.log("FREE-ARENA security header smoke checks");
console.log(`Base URL: ${baseUrl}`);
console.log("");

for (const result of results) {
  console.log(
    `${result.ok ? "PASS" : "FAIL"} ${String(result.status).padEnd(4)} ${String(result.duration).padStart(5)}ms ${result.label}`,
  );

  for (const detail of result.missing) {
    console.log(`     ${detail}`);
  }
}

console.log("");
console.log(`${results.filter((result) => result.ok).length}/${results.length} checks passed.`);

if (results.some((result) => !result.ok)) {
  process.exit(1);
}
