# Vercel ENV Audit Report

Date: 2026-05-22

## Implemented

- Added `scripts/vercel-env-audit.mjs`.
- Added `npm run vercel:env:audit`.
- Added `npm run vercel:env:audit:strict`.
- Updated the launch checklist with Vercel ENV audit commands.

## Purpose

The audit checks whether production Vercel ENV variable names exist without printing secret values.

Required for admin activation:

- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_USERNAME`
- `ADMIN_SEED_PASSWORD_HASH`

Recommended runtime ENV:

- `NEXTAUTH_URL`
- `ADMIN_SESSION_MAX_AGE_SECONDS`
- TeamSpeak runtime settings

Optional integrations:

- Discord OAuth/news settings
- Steam API key
- TeamSpeak query or status provider settings

## Usage

Advisory check:

```bash
npm run vercel:env:audit
```

Strict check before enabling admin login:

```bash
npm run vercel:env:audit:strict
```

If Vercel CLI is not in PATH, set:

```bash
VERCEL_CLI_PATH=/path/to/vercel
```

Or audit a saved Vercel env list:

```bash
npm run vercel:env:audit -- --from saved-vercel-env-list.txt
```

## Safety

- The script captures Vercel CLI output internally.
- It only reports key names as present or missing.
- It does not print values.
- It does not modify Vercel ENV.
