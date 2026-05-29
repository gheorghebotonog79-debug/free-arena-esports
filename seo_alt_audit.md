# SEO Image Alt Audit

Project: play.free-arena.ro
Date: 2026-05-29
Branch: seo/indexation-consolidation

## Summary

Public `next/image` usage was reviewed for server identity, branding, and content images. Meaningful alt text was added where the image contributes to content or identity.

## Alt Text Added Or Improved

| File | Image type | Alt behavior |
| --- | --- | --- |
| `src/components/layout/site-header.tsx` | FREE-ARENA logo | `FREE-ARENA` |
| `src/components/home/HeroCinematic.tsx` | game signal icons | localized signal label |
| `src/components/home/HeroWarRoom.tsx` | game signal icons | localized signal label |
| `src/components/home/ServerHudCard.tsx` | server identity icon | `${displayName} icon` |
| `src/components/sections/server-grid.tsx` | server identity icon | `${server.displayName} icon` |
| `src/components/server/ServerSeoHero.tsx` | dedicated server icon | `FREE-ARENA ${hero.name} server icon` |
| `src/components/server/ServerDetailPage.tsx` | legacy detail server icon | `${displayName} icon` |

## Existing Meaningful Alt Text

| File | Status |
| --- | --- |
| `src/components/sections/community-section.tsx` | Already uses localized alt text from translations. |

## Remaining Decorative Media

No public `next/image` component currently uses `alt=""` after this pass.

Decorative visual effects implemented through CSS backgrounds, particles, gradients, and pseudo-elements do not require alt text.

## SEO Impact

The update improves accessibility and image relevance for branded/server identity assets without changing layout or visual design.
