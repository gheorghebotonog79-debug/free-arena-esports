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
```

## Backend Activation Blockers

Admin login is intentionally not activated until the production database and secrets are configured.

Required Vercel ENV values:

```bash
DATABASE_URL=
AUTH_SECRET=
ADMIN_SEED_EMAIL=
ADMIN_SEED_USERNAME=
ADMIN_SEED_PASSWORD_HASH=
```

Generate the admin password hash locally:

```bash
npm run auth:hash-password -- "replace-with-strong-password"
```

After ENV is configured:

```bash
npm run backend:preflight:strict
npm run db:migrate
npm run db:seed
```

Then verify:

- `/admin/setup` shows all backend checks as ready.
- `/admin/login` accepts the seeded co-owner account.
- `/admin/dashboard` opens after login.
- Admin CRUD actions write audit logs.

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
