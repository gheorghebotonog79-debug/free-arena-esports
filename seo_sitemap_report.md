# SEO Sitemap Report

Project: play.free-arena.ro
Date: 2026-05-29
Branch: seo/indexation-consolidation

## Summary

The sitemap was cleaned to include only final canonical URLs. The redirecting root URL was removed.

## Sitemap Diff

| Metric | Before | After |
| --- | ---: | ---: |
| Total URLs | 21 | 20 |
| Redirect URLs in sitemap | 1 | 0 |
| Canonical localized home URLs | 2 | 2 |
| Canonical dedicated server URLs | 8 | 8 |
| Duplicate URLs | 0 detected | 0 expected |

## Removed URL

| URL | Reason |
| --- | --- |
| `https://play.free-arena.ro/` | Root redirects through locale routing; sitemap now uses `/ro` and `/en` only. |

## Canonical URLs Included

- `https://play.free-arena.ro/ro`
- `https://play.free-arena.ro/en`
- `https://play.free-arena.ro/ro/servers`
- `https://play.free-arena.ro/en/servers`
- `https://play.free-arena.ro/ro/teamspeak`
- `https://play.free-arena.ro/en/teamspeak`
- `https://play.free-arena.ro/ro/discord`
- `https://play.free-arena.ro/en/discord`
- `https://play.free-arena.ro/ro/terms`
- `https://play.free-arena.ro/en/terms`
- `https://play.free-arena.ro/ro/privacy`
- `https://play.free-arena.ro/en/privacy`
- `https://play.free-arena.ro/ro/server/cs16-classic`
- `https://play.free-arena.ro/en/server/cs16-classic`
- `https://play.free-arena.ro/ro/server/respawn`
- `https://play.free-arena.ro/en/server/respawn`
- `https://play.free-arena.ro/ro/server/cs2`
- `https://play.free-arena.ro/en/server/cs2`
- `https://play.free-arena.ro/ro/server/global`
- `https://play.free-arena.ro/en/server/global`

## Excluded URLs

| URL pattern | Reason |
| --- | --- |
| `/` | Redirecting locale entry; not a final URL. |
| `/servers/cs16` | Redirects to `/ro/server/cs16-classic`. |
| `/servers/respawn` | Redirects to `/ro/server/respawn`. |
| `/servers/cs2` | Redirects to `/ro/server/cs2`. |
| `/servers/global` | Redirects to `/ro/server/global`. |
| `/ro/servers/*` | Legacy detail URLs now redirect to canonical `/ro/server/*`. |
| `/en/servers/*` | Legacy detail URLs now redirect to canonical `/en/server/*`. |
| `/rankings`, `/ro/rankings`, `/en/rankings` | Redirect to localized homepage `#top-players` anchors. |

## Orphan URL Check

All sitemap URL groups have internal discovery paths:

- Home: locale routing and canonical alternates.
- Server hub: header/footer/play buttons.
- Dedicated server pages: server cards and server internal links.
- Discord and TeamSpeak: header, hero actions, community sections, footer.
- Terms and Privacy: footer links.

## Validation Status

Code validation passed with lint and TypeScript. Live sitemap validation requires deployment and recrawl because no production deploy was performed.
