# Admin CRUD UI Foundation Report

Date: 2026-05-22

## Implemented

- Added reusable client-side `AdminApiForm`.
- Wired create forms to protected admin API endpoints:
  - `/admin/servers` -> `POST /api/admin/servers`
  - `/admin/news` -> `POST /api/admin/news`
  - `/admin/tournaments` -> `POST /api/admin/tournaments`
  - `/admin/vip` -> `POST /api/admin/vip`
  - `/admin/settings` -> `POST /api/admin/settings`
- Forms only render when the authenticated role has the matching write permission.
- Form submissions send JSON payloads, show success/error feedback, and refresh the current admin page.
- JSON fields validate client-side enough to avoid malformed JSON payloads before reaching the API.

## Preserved

- Public RO/EN site unchanged.
- GameDig and TeamSpeak APIs unchanged.
- Admin API protection unchanged.
- DB activation remains pending and is not required for the public site.

## Pending

- Edit and delete UI controls for existing records.
- More specialized UX per resource after DB activation.
- Optimistic updates or table-level filtering once admin usage grows.
- Real production login test after `DATABASE_URL`, `AUTH_SECRET`, and seed admin are configured.
