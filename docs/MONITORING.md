# FREE-ARENA.RO Monitoring

The public platform exposes a lightweight health endpoint:

```text
https://play.free-arena.ro/api/health
```

The endpoint checks:

- `/api/servers`
- `/api/teamspeak`
- `/ro`
- `/en`

## Health Response

Successful response:

```json
{
  "ok": true,
  "status": "ok",
  "checks": {
    "servers": {
      "ok": true,
      "status": "ok",
      "detail": "3 live server targets returned",
      "latencyMs": 120
    }
  },
  "timestamp": "2026-05-22T00:00:00.000Z"
}
```

If one dependency fails, the endpoint returns a degraded response and HTTP `503`. It should not crash the application.

## Recommended External Monitors

Use one of:

- UptimeRobot
- BetterStack
- HetrixTools

Recommended checks:

- `https://play.free-arena.ro/api/health`
- `https://play.free-arena.ro/ro`
- `https://play.free-arena.ro/en`
- `https://play.free-arena.ro/api/servers`
- `https://play.free-arena.ro/api/teamspeak`

Recommended interval:

- 1-5 minutes for `/api/health`
- 5-10 minutes for localized pages and individual APIs

Alert when:

- `/api/health` returns non-200.
- `/ro` or `/en` does not return 200.
- `/api/servers` does not return JSON with live server targets.
- `/api/teamspeak` stays offline/degraded longer than the chosen incident threshold.

## Notes

- TeamSpeak status depends on the configured HTTPS proxy or direct ServerQuery ENV variables.
- GameDig server checks may degrade when an individual game server is unreachable.
- Global remains a pending public card and is not queried by GameDig until it becomes active.
