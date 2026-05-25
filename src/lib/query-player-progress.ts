import {
  DEFAULT_RSU_API_BASE_URL,
  sanitizePlayer,
  sanitizeSummary,
  type PlayerProgressResponse,
  type PlayerSearchResponse,
} from "@/lib/player-progress";

const REQUEST_TIMEOUT_MS = 8_000;
const MAX_TOP_LIMIT = 50;

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

export async function queryPlayerProgress(limit = 15): Promise<PlayerProgressResponse> {
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), MAX_TOP_LIMIT);
  const [topPayload, summaryPayload] = await Promise.all([
    fetchRsuJson(`/top.php?limit=${safeLimit}`),
    fetchRsuJson("/summary.php"),
  ]);
  const top = readRecord(topPayload);
  const summary = readRecord(summaryPayload);

  return {
    ok: Boolean(top.ok) && Boolean(summary.ok),
    players: readPlayers(top.players),
    summary: sanitizeSummary(summary.summary),
    cached: Boolean(top.cached || summary.cached),
    updatedAt: typeof top.updatedAt === "string"
      ? top.updatedAt
      : typeof summary.updatedAt === "string"
        ? summary.updatedAt
        : null,
  };
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

  const payload = readRecord(await fetchRsuJson(`/search.php?q=${encodeURIComponent(safeQuery)}`));
  const players = readPlayers(payload.players);

  return {
    ok: Boolean(payload.ok),
    query: typeof payload.query === "string" ? payload.query : safeQuery,
    count: typeof payload.count === "number" ? payload.count : players.length,
    players,
  };
}
