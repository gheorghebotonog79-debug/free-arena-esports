# Admin Smoke Testing Report

Date: 2026-05-22

## Implemented

- Added `scripts/smoke-admin-routes.mjs`.
- Added npm command: `npm run smoke:admin`.
- Added monitoring documentation for local and live smoke checks.

## Coverage

The smoke test verifies:

- `/ro` returns `200` and includes the FREE-ARENA brand marker.
- `/en` returns `200` and includes the FREE-ARENA brand marker.
- `/admin/login` returns `200`.
- `/admin/setup` returns `200`.
- `/api/admin/setup/status` returns setup readiness JSON.
- `/admin/servers` redirects to `/admin/login` without a session.
- `/admin/news` redirects to `/admin/login` without a session.
- `/api/admin/servers` returns `401` without a session.
- Cross-origin `POST /api/admin/servers` returns `403`.
- `/api/health` returns a valid JSON payload.

## Usage

Local:

```bash
npm run smoke:admin
```

Live:

```bash
npm run smoke:admin -- https://play.free-arena.ro
```

## Notes

- The script does not require DB activation.
- The script does not authenticate or mutate real data.
- `/api/health` may report degraded if an external service is down, but the check still confirms the health endpoint responds with the expected JSON shape.
