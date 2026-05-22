# Admin Security and Dashboard Report

Date: 2026-05-22

## Implemented

- Added lightweight login rate limiting for `/api/admin/auth/login`.
- Added `requireAdminPageAccess` for page-level RBAC checks.
- Added `requireAdminApiAccess` foundation for future protected admin APIs.
- Added reusable admin shell/navigation components.
- Added protected admin read pages:
  - `/admin/servers`
  - `/admin/news`
  - `/admin/tournaments`
  - `/admin/vip`
  - `/admin/settings`
  - `/admin/audit`
- Updated `/admin/dashboard` to use the shared admin shell and link to real admin areas.

## Security Behavior

- Login attempts are limited per IP + identifier in a 15 minute window.
- Successful login clears the rate-limit bucket for that IP + identifier.
- Rate-limited attempts are audit logged when the database is reachable.
- Each admin read page requires the matching RBAC permission.
- Access-denied pages render inside the protected admin shell and do not expose public UI state.

## Database Activation Status

The code is ready for real PostgreSQL-backed admin login, but the current environment does not expose:

- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_USERNAME`
- `ADMIN_SEED_PASSWORD_HASH`

Until those values are configured and migrations/seeding are run, `/admin/login` can render but no real admin can authenticate.

## Next Required Operations

1. Create or connect a PostgreSQL database.
2. Add `DATABASE_URL` and `AUTH_SECRET` to Vercel.
3. Generate the first admin password hash with `npm run auth:hash-password`.
4. Add admin seed env vars.
5. Run `npm run db:migrate` and `npm run db:seed` against production.
6. Test `/admin/login` with the seeded account.

## Remaining Backend Work

- Durable rate limiting with Redis or managed store.
- CRUD mutations for admin modules.
- Validation schemas for future mutate endpoints.
- Detailed audit diff payloads for create/update/delete.
- Steam and Discord OAuth providers.
- Optional 2FA for high-impact admin roles.
