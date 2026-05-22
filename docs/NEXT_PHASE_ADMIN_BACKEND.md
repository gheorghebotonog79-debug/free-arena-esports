# FREE-ARENA.RO Next Phase: Admin and Backend Foundation

This document defines the next production phase for `play.free-arena.ro` without adding fake admin screens or unfinished backend behavior to the public UI.

## Goals

- Add secure admin authentication.
- Move tournaments, news, VIP, Discord, and server operations from static frontend structures to real services.
- Keep the cinematic public site stable while backend modules are introduced behind protected routes.
- Preserve Romanian and English localization for any user-facing admin or public content.

## Proposed Routes

Public routes remain unchanged:

- `/ro`
- `/en`
- `/ro/terms`
- `/ro/privacy`
- `/en/terms`
- `/en/privacy`

Admin route structure:

- `/admin/login`
- `/admin/dashboard`
- `/admin/servers`
- `/admin/events`
- `/admin/vip`
- `/admin/discord`
- `/api/admin/*`

## Current Implementation Checkpoint

Implemented foundation:

- `/admin/login` server-rendered login page.
- `/admin/dashboard` protected operational overview.
- `/admin/servers` protected database read view.
- `/admin/news` protected database read view.
- `/admin/tournaments` protected database read view.
- `/admin/vip` protected database read view.
- `/admin/settings` protected database read view.
- `/admin/audit` protected audit log view.
- `/api/admin/auth/login` credentials login endpoint.
- `/api/admin/auth/logout` logout endpoint.
- `/api/admin/session` protected session inspection endpoint.
- `/api/admin/servers` and `/api/admin/servers/[id]` CRUD foundation.
- `/api/admin/news` and `/api/admin/news/[id]` CRUD foundation.
- `/api/admin/tournaments` and `/api/admin/tournaments/[id]` CRUD foundation.
- `/api/admin/vip` and `/api/admin/vip/[id]` CRUD foundation.
- `/api/admin/settings` and `/api/admin/settings/[id]` CRUD foundation.
- Middleware guard for `/admin/*`.
- Database-backed `AdminSession` records.
- HTTP-only admin session cookie.
- Login/logout audit events in `AdminAuditLog`.
- In-memory login rate limit foundation.
- Page-level and API-level RBAC checks for admin areas.
- Same-origin protection for admin API mutations.
- Validation helpers for admin write payloads.
- Admin create forms wired to protected CRUD endpoints for servers, news, tournaments, VIP, and settings.

Still pending:

- Admin edit/delete UI controls for existing records.
- Durable distributed rate limiting backed by Redis or a managed edge store.
- Optional Steam and Discord OAuth providers.
- Two-factor authentication for high-impact admin actions.

## Admin Login

Recommended approach:

- Use server-side sessions with secure, HTTP-only cookies.
- Add rate limiting on login attempts.
- Store password hashes with a modern algorithm such as Argon2 or bcrypt.
- Add optional two-factor authentication before giving access to destructive actions.
- Do not expose admin tokens or secrets to client components.

Suggested roles:

- `owner`: full access, billing and secrets excluded from routine UI.
- `manager`: events, announcements, VIP overview.
- `server-admin`: server status, announcements, player actions when backend is ready.
- `moderator`: reports, sanctions, player support.
- `viewer`: read-only operations dashboard.

## Dashboard Servers

The current `/api/servers` and GameDig integration should remain public and lightweight.

Next backend phase:

- Store server definitions in a database instead of static config.
- Track uptime history, map history, and player count snapshots.
- Add manual labels such as maintenance, event mode, featured, or hidden.
- Keep Global pending/offline logic explicit until that server becomes active.
- Protect write operations under `/api/admin/servers`.

## Events and Tournaments

Recommended modules:

- Event calendar.
- Team registration.
- Brackets and match state.
- Map veto records.
- Result reporting and admin confirmation.
- Prize/VIP reward assignment.
- Public event feed with RO/EN fields.

Data should support:

- Draft, scheduled, live, completed, cancelled.
- Team size and slot limits.
- Staff owner and audit trail.
- Linked Discord announcement ID when posted.

## VIP, Store, and Account Integration

Do not build VIP as static fake UI. The first real version should include:

- Steam account linking.
- Entitlements and expiration dates.
- Purchase/manual grant history.
- Server-side validation endpoint for game servers.
- Invoice/payment metadata if payments are introduced.
- Admin audit log for every manual VIP change.

## Discord Integration

Discord should be implemented server-side only:

- Bot token stays in environment variables.
- Public UI consumes a safe `/api/discord` response.
- Admin dashboard can publish news/events to selected channels.
- Discord role sync should run through backend jobs or server actions.

See `docs/DISCORD_INTEGRATION.md` for the integration plan and ENV variables.

## News and Event Feed

Recommended feed sources:

- Admin-created announcements.
- Discord channel imports.
- Tournament results.
- Server maintenance notices.
- VIP/store updates.

Each item should include:

- Localized title and body.
- Status: draft, published, archived.
- Publish date.
- Author/admin ID.
- Optional Discord message ID.

## Audit Log

Every admin write action should create an audit record:

- Admin ID.
- Action type.
- Target entity.
- Before/after payload when safe.
- IP/user-agent hash.
- Timestamp.

Audit data should never expose secrets in the UI.

## Endpoint Protection

Recommended security rules:

- `/api/admin/*` requires an authenticated admin session.
- Use role checks per route.
- Validate request bodies with schemas.
- Add rate limits for login, Discord actions, and high-impact server actions.
- Return generic errors to clients and detailed errors only in server logs.

## Database Candidates

Practical options:

- PostgreSQL with Prisma or Drizzle for structured data.
- Redis for short-lived rate limits, queues, and status cache.
- Vercel Postgres or a VPS-hosted PostgreSQL instance depending on deployment preference.

## Rollout Order

1. Add admin auth and protected shell routes.
2. Add database schema and audit log.
3. Move event/tournament data to backend.
4. Add Discord status and news feed API.
5. Add VIP/account model.
6. Add admin dashboards for safe read-only views.
7. Enable write operations gradually behind roles.

## Non-Goals for Current Public Site

- No fake admin dashboard.
- No fake payments.
- No client-side tokens.
- No public exposure of Discord or TeamSpeak credentials.
- No redesign of the cinematic public UI.
