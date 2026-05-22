# Admin API Cache Control Report

Date: 2026-05-22

## Implemented

- Added shared no-store headers for admin JSON responses.
- Updated admin API error responses to use the same no-store policy.
- Updated `/api/admin/session` to use shared admin JSON helpers.
- Extended the admin smoke test to verify no-store cache behavior on protected admin API responses.

## Cache Policy

Admin API JSON responses now include:

- `Cache-Control: no-store, max-age=0, must-revalidate`
- `Pragma: no-cache`
- `Expires: 0`

## Why

Admin/session/setup responses can include operational state and should not be cached by browsers, proxies, or CDN layers.

## Verification

Use:

```bash
npm run smoke:admin -- https://play.free-arena.ro
```

The smoke test verifies:

- Admin setup JSON includes `no-store`.
- Unauthorized admin API responses include `no-store`.
- CSRF admin API responses include `no-store`.
