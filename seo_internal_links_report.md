# SEO Internal Links Report

Project: play.free-arena.ro
Date: 2026-05-29
Branch: seo/indexation-consolidation

## Objective

Consolidate public server detail links from the legacy `/servers/*` route family to the canonical `/server/*` SEO route family.

## Canonical Server URL Map

| Legacy public slug | Canonical SEO URL |
| --- | --- |
| `/servers/cs16` | `/server/cs16-classic` |
| `/servers/respawn` | `/server/respawn` |
| `/servers/cs2` | `/server/cs2` |
| `/servers/global` | `/server/global` |

The map is centralized in `src/lib/server-url.ts`.

## Internal Links Updated

| File | Previous link | New link |
| --- | --- | --- |
| `src/components/sections/server-grid.tsx` | `/servers/${server.key}` | `getCanonicalServerPath(server.key)` |
| `src/components/home/ServerHudCard.tsx` | `/servers/${serverKey}` | `getCanonicalServerPath(serverKey)` |

## Internal Link Scan Result

No public UI link remains that points users from cards/buttons/featured sections to `/servers/*` detail URLs.

Remaining `/servers/*` references are intentional:

| Location | Reason |
| --- | --- |
| `next.config.ts` | 301 redirect sources from legacy URLs to canonical URLs |
| `src/app/(public)/[locale]/servers/[slug]/page.tsx` | legacy route file, shielded by redirect rules for known server slugs |
| `src/app/(admin)/admin/servers/page.tsx` | admin API endpoints, not public SEO URLs |

## Navigation And Footer

The server hub link remains `/#servers`, which is an anchor to the homepage server section and not a duplicate detail route.

The privacy page was added to the footer link list so the sitemap URL is internally discoverable and not orphaned.

## Risk Notes

The legacy route file still exists, but known public server slugs are covered by permanent redirects before the route renders. Live HTTP validation requires deployment because this branch has not been deployed.
