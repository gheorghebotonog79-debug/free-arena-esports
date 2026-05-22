# Backend Foundation Report

Date: 2026-05-22

## Implemented

- Added Prisma and Prisma Client.
- Added PostgreSQL schema in `prisma/schema.prisma`.
- Added Prisma config in `prisma.config.ts`.
- Added initial migration SQL:
  - `prisma/migrations/20260522101500_init_backend_foundation/migration.sql`
- Added seed script:
  - `prisma/seed.mjs`
- Added DB client singleton:
  - `src/lib/db.ts`
- Added RBAC role/permission helper:
  - `src/lib/admin/rbac.ts`
- Added audit log write helper:
  - `src/lib/admin/audit.ts`
- Added database architecture documentation:
  - `docs/DATABASE_ARCHITECTURE.md`
- Updated `.env.example` with backend/admin/Discord/Steam environment placeholders.
- Added DB scripts to `package.json`.

## Models Created

- `User`
- `AdminRole`
- `AdminAuditLog`
- `NewsPost`
- `GameServer`
- `Tournament`
- `VipPackage`
- `PlayerProfile`
- `SystemSetting`

## Seed Behavior

The seed creates:

- admin roles: helper, moderator, admin, head_admin, co_owner
- server records for CS 1.6, Respawn, CS2, Global
- system settings for default locale, contact email, Discord status, Steam status

The first admin user is only seeded when all of these are present:

- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_USERNAME`
- `ADMIN_SEED_PASSWORD_HASH`

Raw passwords are intentionally not supported by the seed.

## Auth Flow

Not implemented in this phase.

The schema is ready for credentials auth through `User.passwordHash`, and for future Discord/Steam identity through `PlayerProfile.discordId` and `PlayerProfile.steamId`.

## Role System

Implemented as reusable role definitions and permission checks in `src/lib/admin/rbac.ts`.

Permission examples:

- `servers:read`
- `servers:write`
- `news:*`
- `audit:read`
- `*`

## Audit System

Implemented base write helper:

- `writeAdminAuditLog`

No admin actions are wired yet because admin routes are not implemented in this phase.

## Manual Configuration Needed

Set these in local `.env` or Vercel production variables before running migrations:

```text
DATABASE_URL=
AUTH_SECRET=
NEXTAUTH_URL=https://play.free-arena.ro
```

For first admin seeding:

```text
ADMIN_SEED_EMAIL=
ADMIN_SEED_USERNAME=
ADMIN_SEED_PASSWORD_HASH=
```

For future OAuth:

```text
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
STEAM_API_KEY=
```

## Validation

To validate this phase on a machine with a real PostgreSQL URL:

```bash
npm run db:validate
npm run db:generate
npm run db:migrate
npm run db:seed
npm run lint
npm run typecheck
npm run build
```

## Remaining Risks

- No production PostgreSQL database has been connected yet.
- `npm audit --omit=dev` reports advisories through `gamedig` -> `fast-xml-parser` and `next` -> `postcss`; npm proposes `audit fix --force` with breaking dependency changes, so no forced fix was applied in this DB foundation phase.
- Auth/session protection is not implemented yet.
- `/api/admin/*` routes do not exist yet.
- Existing public GameDig server API remains static-config based until admin server management is wired in a later phase.

## Recommended Next Phase

Implement admin authentication:

- Add Auth.js/NextAuth foundation.
- Add `/admin/login`.
- Protect `/admin/*`.
- Add session helpers.
- Log login/logout to `AdminAuditLog`.
- Keep public site unchanged.
