# FREE-ARENA.RO Database Architecture

This is the first real backend foundation for FREE-ARENA.RO. It introduces PostgreSQL through Prisma without changing the existing public cinematic frontend.

## Stack

- PostgreSQL
- Prisma ORM `6.x`
- Prisma Client
- Prisma migrations
- Seed script for roles, public server records, and platform settings

## Environment

Required for database commands:

```text
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/free_arena?schema=public
```

Optional first-admin seed variables:

```text
ADMIN_SEED_EMAIL=
ADMIN_SEED_USERNAME=
ADMIN_SEED_PASSWORD_HASH=
```

Use a password hash only. Do not put a raw password in `.env`, `.env.example`, docs, or commits.

## Commands

Validate the schema:

```bash
npm run db:validate
```

Generate Prisma Client:

```bash
npm run db:generate
```

Apply migrations in production:

```bash
npm run db:migrate
```

Run local development migrations:

```bash
npm run db:migrate:dev
```

Seed base roles and settings:

```bash
npm run db:seed
```

## Core Models

### User

Admin/player identity base.

Key fields:

- `email`
- `username`
- `avatar`
- `role`
- `passwordHash`
- `lastLoginAt`
- `isActive`

`passwordHash` is optional at schema level so OAuth-only users can exist later.

### AdminRole

Stores RBAC role definitions.

Seeded roles:

- `helper`
- `moderator`
- `admin`
- `head_admin`
- `co_owner`

Permissions are stored as JSON arrays so the role system can evolve without a migration for every permission.

### AdminAuditLog

Append-only operational record for admin actions.

Designed to log:

- login/logout
- create/edit/delete
- publish/unpublish
- server maintenance toggles
- VIP edits
- settings changes

### NewsPost

Localized content foundation for news, announcements, event reports, and Discord-imported posts.

Important constraint:

- unique `locale + slug`

### GameServer

Database-backed future source for server definitions.

Current live public API still uses the existing GameDig config. This table prepares the admin/backend phase without changing that behavior.

### Tournament

Foundation for real tournament/event records.

Statuses remain string-based for now so the first admin UI can define the exact lifecycle before locking it into enums.

### VipPackage

Foundation for real VIP/store packages.

`perks` is JSON for flexible benefit definitions. Payment or entitlement history is intentionally not added yet.

### PlayerProfile

Player identity extension for Steam, Discord, rank, reputation, and moderation counters.

### SystemSetting

Key/value settings for platform configuration that should later move out of static frontend files.

## Indexing Strategy

Indexes were added for:

- user role and active state
- audit actor/action/target/timestamp
- news publish status and locale slug
- server host/port uniqueness
- tournament status/start date
- VIP enabled state
- player external IDs and rank/reputation
- system setting key

## Migration

Initial migration:

```text
prisma/migrations/20260522101500_init_backend_foundation/migration.sql
```

This migration creates the initial PostgreSQL tables, constraints, relations, and indexes.

## Current Boundaries

Implemented now:

- Prisma setup
- PostgreSQL schema
- migration SQL
- seed script
- DB client singleton
- RBAC helper definitions
- audit log write helper

Not implemented in this phase:

- admin login UI
- session cookies
- NextAuth/Auth.js
- `/api/admin/*`
- dashboard screens
- CRUD mutations
- Discord/Steam OAuth
- payment/VIP grants

Those belong to the next incremental phases.
