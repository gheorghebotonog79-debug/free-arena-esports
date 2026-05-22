# Security Headers Report

Date: 2026-05-22

## Implemented

- Added application-wide security headers through `next.config.ts`.
- Added `npm run smoke:headers` to verify headers on public, admin, and API routes.

## Headers

- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `X-DNS-Prefetch-Control`

## Smoke Check

Run locally after starting the production server:

```bash
npm run smoke:headers
```

Run against production:

```bash
npm run smoke:headers -- https://play.free-arena.ro
```

The smoke check verifies:

- `/ro`
- `/admin/login`
- `/api/health`

## Notes

- A strict Content Security Policy was not added yet because the current Next.js/Framer Motion setup needs a careful nonce or hash strategy to avoid breaking runtime scripts and hydration.
- The current headers are safe for the public site, admin pages, and API routes.
