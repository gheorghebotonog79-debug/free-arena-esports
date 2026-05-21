# FREE-ARENA.RO

FREE-ARENA.RO is a cinematic esports platform frontend for a competitive gaming network. It is built as a production-ready Next.js App Router project with multilingual routing, responsive layouts, premium motion, and a structure prepared for future backend integrations such as live server status, tournaments, accounts, rankings, VIP modules, and community operations.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript strict mode
- TailwindCSS
- Framer Motion
- Lucide React
- next-intl

## Project Structure

```text
messages/          Locale message files
public/            Static assets and generated game icons
src/app/           App Router pages, layouts, sitemap, robots, global CSS
src/components/    Layout, section, and UI components
src/data/          Static data definitions ready for backend replacement
src/i18n/          next-intl routing, navigation, and request config
src/lib/           Shared route constants
DEPLOYMENT.md      Deployment notes for play.free-arena.ro
```

## Multilingual Support

Romanian is the default language and English is the secondary language.

Available routes:

- `/ro` Romanian
- `/en` English

The root route `/` redirects to `/ro`. SEO metadata includes canonical and hreflang entries for `ro`, `en`, and `x-default`.

Translation files live in:

- `messages/ro.json`
- `messages/en.json`

## Setup

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/ro
http://localhost:3000/en
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Production Build

```bash
npm ci
npm run build
```

Start the production server:

```bash
npx next start --hostname 127.0.0.1 --port 3000
```

## Deployment Notes

The intended production domain is:

```text
https://play.free-arena.ro
```

Use a reverse proxy such as Nginx in front of the Next.js server. See `DEPLOYMENT.md` for a full deployment checklist and an example Nginx configuration.

Before publishing or deploying, verify:

- `/ro` returns `200`
- `/en` returns `200`
- `/` redirects to `/ro`
- `sitemap.xml` includes both localized URLs
- generated folders such as `node_modules/`, `.next/`, logs, and local screenshots are not committed
