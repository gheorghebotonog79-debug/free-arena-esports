import {
  DEFAULT_RSU_API_BASE_URL,
  sanitizePlayer,
  sanitizeSummary,
  type PlayerProgressResponse,
  type PlayerSearchResponse,
} from "@/lib/player-progress";

const REQUEST_TIMEOUT_MS = 8_000;
const MAX_TOP_LIMIT = 50;

const fallbackPlayers = [
  {
    player: "STEAM_1:1:651258344",
    steamId: "90071996842380001",
    nick: "rds",
    xp: 1339,
    level: 0,
    kills: 257,
    deaths: 220,
    headshots: 20,
    assists: 124,
    shots: 8800,
    hits: 1933,
    damage: 60642,
    playedTime: 21630,
    lastLogin: "05/26/2026 - 21:59:38",
    kdRatio: 1.17,
    hsRate: 7.78,
    accuracy: 21.97,
  },
  {
    player: "STEAM_1:1:1051954115",
    steamId: "90071996842380519",
    nick: "+?13 kenza",
    xp: 1128,
    level: 0,
    kills: 225,
    deaths: 164,
    headshots: 32,
    assists: 93,
    shots: 5928,
    hits: 1628,
    damage: 59558,
    playedTime: 15879,
    lastLogin: "05/27/2026 - 00:53:30",
    kdRatio: 1.37,
    hsRate: 14.22,
    accuracy: 27.46,
  },
  {
    player: "STEAM_1:0:1720177858",
    steamId: "90071996842381137",
    nick: "DaaL CHawaL",
    xp: 1101,
    level: 0,
    kills: 207,
    deaths: 143,
    headshots: 30,
    assists: 115,
    shots: 6934,
    hits: 1366,
    damage: 52932,
    playedTime: 13303,
    lastLogin: "05/27/2026 - 08:16:47",
    kdRatio: 1.45,
    hsRate: 14.49,
    accuracy: 19.7,
  },
  {
    player: "STEAM_1:0:1579912404",
    steamId: "90071996842379992",
    nick: "BULGARIA",
    xp: 1034,
    level: 0,
    kills: 278,
    deaths: 241,
    headshots: 30,
    assists: 113,
    shots: 6564,
    hits: 2214,
    damage: 93487,
    playedTime: 21920,
    lastLogin: "05/26/2026 - 19:04:53",
    kdRatio: 1.15,
    hsRate: 10.79,
    accuracy: 33.73,
  },
  {
    player: "STEAM_2:0:353893616",
    steamId: "90071996842380426",
    nick: "Tibike a Fonok",
    xp: 910,
    level: 0,
    kills: 127,
    deaths: 109,
    headshots: 10,
    assists: 47,
    shots: 2352,
    hits: 556,
    damage: 31328,
    playedTime: 10231,
    lastLogin: "05/26/2026 - 23:20:49",
    kdRatio: 1.17,
    hsRate: 7.87,
    accuracy: 23.64,
  },
] satisfies PlayerProgressResponse["players"];

const fallbackSummary = {
  totalPlayers: 285,
  totalKills: 7276,
  totalDeaths: 6809,
  totalHeadshots: 829,
  totalPlayedTime: 638705,
  topPlayer: {
    nick: "rds",
    steamId: "90071996842380001",
    xp: 1339,
    kills: 257,
  },
} satisfies NonNullable<PlayerProgressResponse["summary"]>;

const FALLBACK_UPDATED_AT = "2026-05-27T10:01:17+03:00";

function getApiBaseUrl() {
  return (process.env.RSU_API_BASE_URL || DEFAULT_RSU_API_BASE_URL).replace(/\/+$/, "");
}

async function fetchRsuJson(path: string) {
  const controller = new AbortController();
  const timeout = windowlessSetTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers: HeadersInit = {
    accept: "application/json",
  };

  if (process.env.RSU_API_TOKEN) {
    headers["X-FA-API-TOKEN"] = process.env.RSU_API_TOKEN;
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      headers,
      signal: controller.signal,
      next: { revalidate: 45 },
    });

    if (!response.ok) {
      throw new Error(`RSU API returned ${response.status}`);
    }

    return response.json() as Promise<unknown>;
  } finally {
    clearTimeout(timeout);
  }
}

function windowlessSetTimeout(callback: () => void, ms: number) {
  return setTimeout(callback, ms);
}

function readRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function readPlayers(value: unknown) {
  return Array.isArray(value)
    ? value.map(sanitizePlayer).filter((player) => player !== null)
    : [];
}

function buildFallbackProgressResponse(limit: number): PlayerProgressResponse {
  return {
    ok: true,
    players: fallbackPlayers.slice(0, limit),
    summary: fallbackSummary,
    cached: true,
    updatedAt: FALLBACK_UPDATED_AT,
  };
}

function buildFallbackSearchResponse(query: string): PlayerSearchResponse {
  const normalizedQuery = query.toLowerCase();
  const players = fallbackPlayers.filter((player) => (
    player.nick.toLowerCase().includes(normalizedQuery) ||
    player.player.toLowerCase().includes(normalizedQuery) ||
    player.steamId.toLowerCase().includes(normalizedQuery)
  ));

  return {
    ok: true,
    query,
    count: players.length,
    players,
  };
}

export async function queryPlayerProgress(limit = 15): Promise<PlayerProgressResponse> {
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), MAX_TOP_LIMIT);

  try {
    const [topPayload, summaryPayload] = await Promise.all([
      fetchRsuJson(`/top.php?limit=${safeLimit}`),
      fetchRsuJson("/summary.php"),
    ]);
    const top = readRecord(topPayload);
    const summary = readRecord(summaryPayload);
    const players = readPlayers(top.players);
    const sanitizedSummary = sanitizeSummary(summary.summary);

    if (players.length === 0 || !sanitizedSummary) {
      return buildFallbackProgressResponse(safeLimit);
    }

    return {
      ok: Boolean(top.ok) && Boolean(summary.ok),
      players,
      summary: sanitizedSummary,
      cached: Boolean(top.cached || summary.cached),
      updatedAt: typeof top.updatedAt === "string"
        ? top.updatedAt
        : typeof summary.updatedAt === "string"
          ? summary.updatedAt
          : null,
    };
  } catch {
    return buildFallbackProgressResponse(safeLimit);
  }
}

export async function searchPlayerProgress(query: string): Promise<PlayerSearchResponse> {
  const safeQuery = query.trim().slice(0, 64);

  if (safeQuery.length < 2) {
    return {
      ok: false,
      query: safeQuery,
      count: 0,
      players: [],
    };
  }

  try {
    const payload = readRecord(await fetchRsuJson(`/search.php?q=${encodeURIComponent(safeQuery)}`));
    const players = readPlayers(payload.players);

    if (players.length === 0) {
      return buildFallbackSearchResponse(safeQuery);
    }

    return {
      ok: Boolean(payload.ok),
      query: typeof payload.query === "string" ? payload.query : safeQuery,
      count: typeof payload.count === "number" ? payload.count : players.length,
      players,
    };
  } catch {
    return buildFallbackSearchResponse(safeQuery);
  }
}
