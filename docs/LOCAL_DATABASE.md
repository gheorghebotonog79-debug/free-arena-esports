# Local PostgreSQL Setup

Use this only for local backend/admin testing. Production still requires a managed PostgreSQL database and Vercel ENV values.

## Commands

Validate Docker, Compose, and Prisma without starting the database:

```bash
npm run db:local:check
```

Start PostgreSQL, run migrations, and seed local data:

```bash
npm run db:local:bootstrap
```

Check container status:

```bash
npm run db:local:status
```

Verify migrated and seeded data:

```bash
npm run db:local:verify
npm run backend:preflight:local
```

View logs:

```bash
npm run db:local:logs
```

Stop the local database:

```bash
npm run db:local:down
```

## Default Local Connection

```bash
postgresql://free_arena:free_arena@localhost:5432/free_arena?schema=public
```

Override it with:

```bash
LOCAL_DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public
```

## Admin Seed

The seed script creates roles, server records, and settings by default.

To seed a local co-owner admin, set:

```bash
ADMIN_SEED_EMAIL=
ADMIN_SEED_USERNAME=
ADMIN_SEED_PASSWORD_HASH=
```

Generate the password hash with:

```bash
npm run auth:hash-password -- "replace-with-strong-password"
```

## Safety

- This setup is local-only.
- Do not use the default local database credentials in production.
- Do not commit `.env.local` or generated secret values.
