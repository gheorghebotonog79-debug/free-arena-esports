# FREE-ARENA.RO Launch Checklist

Date: 2026-05-22

## Public Platform Status

The public play platform is ready for production use:

- RO/EN localized public site.
- Cinematic responsive homepage.
- Live game server status API and UI.
- TeamSpeak status endpoint and card.
- SEO metadata, sitemap, robots, legal pages.
- Health endpoint for uptime monitors.
- Security headers.
- Admin route/API smoke checks.
- Vercel production deployment on `https://play.free-arena.ro`.

## Current Production Checks

Run after every deploy:

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke:admin -- https://play.free-arena.ro
npm run smoke:headers -- https://play.free-arena.ro
```

Optional backend readiness check:

```bash
npm run backend:preflight
npm run vercel:env:audit
```

Optional local PostgreSQL test environment:

```bash
npm run db:local:check
npm run db:local:bootstrap
npm run db:local:verify
npm run backend:preflight:local
```

## Backend Activation Blockers

Production admin login is activated.

Configured Vercel Production ENV values:

```bash
DATABASE_URL
AUTH_SECRET
ADMIN_SEED_EMAIL
ADMIN_SEED_USERNAME
ADMIN_SEED_PASSWORD_HASH
NEXTAUTH_URL
ADMIN_SESSION_MAX_AGE_SECONDS
```

Production database status:

- Neon PostgreSQL resource connected through Vercel Marketplace.
- Prisma migrations applied.
- Production database seeded.
- Initial co-owner admin login verified on `https://play.free-arena.ro`.

Production admin credentials:

- Stored locally only in ignored `tmp/production-admin-credentials.txt`.
- Never commit or paste the password into source files, docs, or chat.

Before any future backend deploy, verify:

```bash
npm run vercel:env:audit:strict
node scripts/backend-preflight.mjs --strict --check-db
npm run smoke:admin -- https://play.free-arena.ro
npm run smoke:headers -- https://play.free-arena.ro
```

## Release Checklist

- Git working tree clean.
- Latest commit pushed to `origin/main`.
- Vercel production deploy is `READY`.
- `play.free-arena.ro` points to the latest production deployment.
- Smoke checks pass on production.
- Local backup archive exists on the SSD backup drive.
- Release tag pushed to GitHub.

## Next Product Phase

After admin login is live:

- Publish real news from admin to public site.
- Manage server metadata from admin database records.
- Add real tournament pages and registration flow.
- Add VIP packages and account integration.
- Add Discord OAuth and Steam login.
- Add player profiles, sanctions/history, and operational audit views.
