# FREE-ARENA.RO Deployment

Deployment target: `play.free-arena.ro`

This project is a Next.js 15 App Router application with Romanian as the default locale and English as the secondary locale.

## Requirements

- Node.js `20.11.0` or newer
- npm
- Nginx or another reverse proxy
- TLS certificate for `play.free-arena.ro`

## Production Build

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

## Vercel Deployment

The repository is ready for Vercel as a standard Next.js project.

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Development Command: `npm run dev`
- Output Directory: leave empty/default
- Node.js Version: `20.x` or newer
- Root Directory: repository root

The base frontend can deploy without database or auth credentials. Live TeamSpeak status is optional and should be configured with environment variables only.

Recommended production variables for TeamSpeak:

```text
TEAMSPEAK_HOST=ts.free-arena.ro
TEAMSPEAK_VOICE_PORT=9987
TEAMSPEAK_QUERY_PORT=10011
TEAMSPEAK_QUERY_USER=
TEAMSPEAK_QUERY_PASSWORD=
TEAMSPEAK_VIRTUAL_SERVER_ID=1
```

If the hosting provider cannot reach the TeamSpeak ServerQuery TCP port directly, expose a small trusted HTTPS status proxy and configure:

```text
TEAMSPEAK_STATUS_URL=https://dashboard.free-arena.ro/api/teamspeak-status
TEAMSPEAK_STATUS_TOKEN=
```

When `TEAMSPEAK_STATUS_URL` is present, `/api/teamspeak` reads that JSON endpoint first. If the proxy is unavailable, the app falls back gracefully to the direct ServerQuery path or an offline state.

After importing the GitHub repository into Vercel:

1. Deploy the `main` branch.
2. Open the generated Vercel preview URL.
3. Verify `/ro`, `/en`, and `/` work as expected.
4. Add `play.free-arena.ro` in Project Settings -> Domains.
5. Configure DNS for the `play` subdomain with the CNAME record shown by Vercel. For external DNS this is usually `play CNAME cname.vercel-dns-0.com`, but use the exact value shown in Vercel for the project.
6. Wait for DNS and TLS verification to complete in Vercel.

## Custom Domain Checks

After `play.free-arena.ro` is connected to Vercel, verify:

- `https://play.free-arena.ro/` redirects to `/ro`
- `https://play.free-arena.ro/ro` returns `200`
- `https://play.free-arena.ro/en` returns `200`
- `https://play.free-arena.ro/sitemap.xml` is reachable
- `https://play.free-arena.ro/robots.txt` is reachable
- alternate locale links are present for Romanian, English, and `x-default`

## Start Next.js

Run the app behind a reverse proxy on localhost:

```bash
NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1 --port 3000
```

Recommended process manager example with PM2:

```bash
pm2 start "npm run start -- --hostname 127.0.0.1 --port 3000" --name free-arena-ro
pm2 save
```

## Nginx Reverse Proxy

Example server block for `play.free-arena.ro`:

```nginx
server {
    listen 80;
    server_name play.free-arena.ro;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name play.free-arena.ro;

    ssl_certificate /etc/letsencrypt/live/play.free-arena.ro/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/play.free-arena.ro/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Locale Routing

The localized routes are:

- Romanian: `https://play.free-arena.ro/ro`
- English: `https://play.free-arena.ro/en`

The root path redirects to Romanian:

```text
https://play.free-arena.ro/ -> https://play.free-arena.ro/ro
```

## SEO Checks

After deployment, verify:

- `/ro` returns `200`
- `/en` returns `200`
- `/` redirects to `/ro`
- pages include `canonical` and `hreflang` links for `ro`, `en`, and `x-default`
- `sitemap.xml` includes both localized URLs

## Rollback

Keep the previous deployment directory or PM2 process snapshot available. To rollback:

```bash
pm2 stop free-arena-ro
cd /path/to/previous/free-arena-ro-esports
pm2 start "npx next start --hostname 127.0.0.1 --port 3000" --name free-arena-ro
pm2 save
```
