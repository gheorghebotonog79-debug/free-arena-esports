# Backend Preflight Report

Date: 2026-05-22

## Implemented

- Added `scripts/backend-preflight.mjs`.
- Added `npm run backend:preflight` for local advisory backend readiness checks.
- Added `npm run backend:preflight:strict` for production activation checks after PostgreSQL ENV is configured.

## What It Checks

- Prisma schema exists.
- Prisma migrations exist.
- Prisma seed script exists.
- `DATABASE_URL` is present and does not look like a placeholder.
- `AUTH_SECRET` is at least 32 characters.
- Admin seed ENV values are present:
  - `ADMIN_SEED_EMAIL`
  - `ADMIN_SEED_USERNAME`
  - `ADMIN_SEED_PASSWORD_HASH`
- Admin password hash uses the expected `scrypt:v1` format.
- `prisma validate` passes.
- `prisma generate` passes.

## Modes

Advisory mode:

```bash
npm run backend:preflight
```

Use this during development. Missing production ENV values are reported as warnings so public site work is not blocked.

Strict production mode:

```bash
npm run backend:preflight:strict
```

Use this after Vercel/PostgreSQL ENV values are configured. It also checks database reachability through Prisma migration status.

## Safety

- The script does not print secret values.
- The script does not mutate the database.
- The strict mode should be run only after real production ENV values exist.

## Pending Before Real Admin Activation

- Configure PostgreSQL.
- Set production `DATABASE_URL`.
- Set production `AUTH_SECRET`.
- Generate and set `ADMIN_SEED_PASSWORD_HASH`.
- Run Prisma migrations and seed.
- Test real `/admin/login`.
