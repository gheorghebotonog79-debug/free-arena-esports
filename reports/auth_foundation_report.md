# Admin Authentication Foundation Report

Date: 2026-05-22

## Implemented

- Added a separate admin route group for `/admin/*` without changing public RO/EN routes.
- Added `/admin/login` with credentials form and safe redirect handling.
- Added `/admin/dashboard` protected by server-side session checks.
- Added `/api/admin/auth/login` for credentials login.
- Added `/api/admin/auth/logout` for session cleanup.
- Added `/api/admin/session` for protected session inspection.
- Updated middleware so `/admin/*` requires a session cookie except `/admin/login`.
- Added database-backed `AdminSession` model and migration.
- Added secure session token generation with HTTP-only cookies.
- Session tokens are stored as HMAC-SHA256 hashes using `AUTH_SECRET`.
- Login and logout actions write to `AdminAuditLog`.
- Added password hashing utility script: `npm run auth:hash-password`.

## Database Changes

Migration:

- `prisma/migrations/20260522104000_add_admin_sessions/migration.sql`

New model:

- `AdminSession`

Relations:

- `User.adminSessions`

Indexes:

- `AdminSession.userId`
- `AdminSession.expiresAt`
- `AdminSession.lastSeenAt`
- unique `AdminSession.tokenHash`

## Required Production ENV

- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_USERNAME`
- `ADMIN_SEED_PASSWORD_HASH`
- `ADMIN_SESSION_MAX_AGE_SECONDS`

Optional/future:

- `NEXTAUTH_URL`
- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `STEAM_API_KEY`

## Auth Flow

1. Admin opens `/admin/login`.
2. Credentials are posted to `/api/admin/auth/login`.
3. The endpoint validates origin, user state, and password hash.
4. A random session token is created.
5. The HMAC hash is stored in `AdminSession`.
6. The raw token is stored only in a secure HTTP-only cookie.
7. Admin is redirected to `/admin/dashboard`.
8. Logout deletes the DB session and clears the cookie.

## Security Notes

- No secrets are committed.
- No raw admin passwords are stored.
- Admin APIs return generic errors.
- Middleware blocks unauthenticated `/admin/*` page access.
- `/api/admin/session` returns `401` without a valid session.
- Login requires a configured database and seeded admin account.

## Remaining Risks / Next Steps

- Add login rate limiting before opening admin publicly.
- Add optional 2FA for head admin and co-owner roles.
- Add per-route permission checks for future mutate endpoints.
- Build real CRUD modules for news, servers, tournaments, VIP, settings, and audit views.
- Add Steam and Discord OAuth once provider credentials are available.
