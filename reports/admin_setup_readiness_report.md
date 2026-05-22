# Admin Setup Readiness Report

Date: 2026-05-22

## Implemented

- Added `/admin/setup` as a public-safe setup status page.
- Added `/api/admin/setup/status` as a public-safe JSON readiness endpoint.
- Added `getSetupReadiness()` helper for backend/admin activation checks.
- Added link from `/admin/login` to `/admin/setup`.
- Updated middleware so `/admin/setup` is accessible before admin login.

## Checks

The readiness system checks:

- `DATABASE_URL` configured.
- Database connection responds when `DATABASE_URL` exists.
- `AUTH_SECRET` configured.
- `ADMIN_SEED_EMAIL`, `ADMIN_SEED_USERNAME`, and `ADMIN_SEED_PASSWORD_HASH` configured.
- Admin roles and at least one active seeded `co_owner` account exist after migration/seed.

## Safety

- The setup endpoint exposes only status booleans and short details.
- It never returns secret values.
- It does not mutate the database.
- It does not unlock admin routes.

## Pending

- Choose/create PostgreSQL.
- Add production ENV values.
- Run migrations and seed.
- Test real `/admin/login`.
