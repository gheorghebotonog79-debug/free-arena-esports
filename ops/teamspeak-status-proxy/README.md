# FREE-ARENA TeamSpeak Status Proxy

Small private HTTP service used by Vercel to read TeamSpeak ServerQuery data through the FREE-ARENA VPS.

The public route should be exposed behind HTTPS by the VPS reverse proxy:

```text
https://dashboard.free-arena.ro/api/teamspeak-status
```

The service requires a bearer token when `STATUS_TOKEN` is configured.

Required environment variables:

```text
TEAMSPEAK_HOST=ts.free-arena.ro
TEAMSPEAK_VOICE_PORT=9987
TEAMSPEAK_QUERY_PORT=10011
TEAMSPEAK_QUERY_USER=
TEAMSPEAK_QUERY_PASSWORD=
TEAMSPEAK_VIRTUAL_SERVER_ID=1
STATUS_TOKEN=
```

The VPS deploy helper wires this proxy into the existing `/opt/cs16-platform` Docker/Nginx stack and exposes:

```text
https://dashboard.free-arena.ro/api/teamspeak-status
```
