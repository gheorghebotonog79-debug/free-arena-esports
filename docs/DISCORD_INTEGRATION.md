# FREE-ARENA.RO Discord Integration Plan

This plan prepares a real Discord integration without pretending that live Discord data exists before the bot and permissions are configured.

## Proposed ENV Variables

```text
DISCORD_GUILD_ID=
DISCORD_INVITE_CODE=
DISCORD_BOT_TOKEN=
DISCORD_CHANNEL_NEWS_ID=
```

Rules:

- `DISCORD_BOT_TOKEN` must only be used server-side.
- Never expose bot tokens to client components, public JSON, logs, screenshots, or docs.
- Public responses should include only safe data such as online state, member counts, invite URL, and recent published news.

## Public API Shape

Recommended future route:

```text
GET /api/discord
```

Suggested safe response:

```json
{
  "ok": true,
  "online": true,
  "guildName": "FREE-ARENA.RO",
  "inviteUrl": "https://discord.gg/...",
  "approximateMembers": 1800,
  "approximatePresence": 240,
  "news": [],
  "checkedAt": "2026-05-22T00:00:00.000Z"
}
```

If Discord does not respond:

```json
{
  "ok": false,
  "online": false,
  "inviteUrl": "https://discord.gg/...",
  "news": [],
  "message": "discord_unavailable",
  "checkedAt": "2026-05-22T00:00:00.000Z"
}
```

## Features

### Real Discord Status

- Fetch guild data through the Discord API using the bot token.
- Cache responses for 30-60 seconds.
- Show fallback state in UI if Discord is down or ENV is missing.

### Invite Count

- Use `DISCORD_INVITE_CODE` to fetch invite metadata.
- Display approximate member count only if Discord returns it safely.
- Keep the existing join button active even when live status is unavailable.

### Event and News Feed

- Read selected messages from `DISCORD_CHANNEL_NEWS_ID`.
- Convert Discord messages into safe public cards.
- Store important events in the backend once the admin system exists.
- Avoid rendering raw untrusted HTML from Discord.

### Admin Publishing

Future admin dashboard can:

- Draft a news post.
- Publish it to the website feed.
- Optionally post it to Discord.
- Store the Discord message ID for edits or audit.

## Fallback Strategy

- Missing ENV: show planned/offline metadata, keep invite button.
- Discord API error: show degraded state, keep cached data if available.
- Invalid token: server logs only; public response should not reveal secret details.
- Rate limit: respect Discord headers and keep a stale cache when safe.

## Security Notes

- Bot token is a production secret.
- Scope the bot permissions tightly.
- Use server-side fetch only.
- Validate all outgoing admin actions.
- Audit every admin-triggered Discord publish/delete/update action.
