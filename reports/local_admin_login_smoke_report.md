# Local Admin Login Smoke Report

Date: 2026-05-22

## Implemented

- Added `scripts/local-admin-seed.mjs`.
- Added `scripts/smoke-local-admin-login.mjs`.
- Added `npm run admin:local:seed`.
- Added `npm run smoke:admin:login:local`.
- Updated local database documentation.

## Local Admin Seed

The seed script creates or updates a local `co_owner` admin in the local PostgreSQL database.

Default values:

- Email: `admin.local@free-arena.ro`
- Username: `local_co_owner`
- Password: generated automatically

Credentials are written to:

```bash
tmp/local-admin-credentials.txt
```

The `tmp/` directory is ignored by Git.

## Smoke Test

The local admin login smoke test verifies:

- Login redirects to `/admin/dashboard`.
- Session cookie is issued.
- `/api/admin/session` returns the authenticated co-owner.
- `/admin/dashboard` renders with the authenticated cookie.

## Verification Result

Local admin login was verified successfully:

- Local PostgreSQL contained 1 seeded admin user.
- Login returned a redirect to `/admin/dashboard`.
- Admin session cookie was issued.
- `/api/admin/session` returned a valid `co_owner` user.
- `/admin/dashboard` rendered with the authenticated session.

## Safety

- No production secrets are written.
- No credentials are committed.
- The local admin account is for local PostgreSQL only.
