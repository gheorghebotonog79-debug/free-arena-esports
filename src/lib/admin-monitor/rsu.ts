import { DEFAULT_RSU_API_BASE_URL, sanitizePlayer } from "@/lib/player-progress";
import { normalizeAdminName, normalizeSteamId } from "@/lib/admin-monitor/scoring";

const REQUEST_TIMEOUT_MS = 8_000;

function getRsuApiBaseUrl() {
  return (process.env.RSU_API_BASE_URL || DEFAULT_RSU_API_BASE_URL).replace(/\/+$/, "");
}

function readRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function identitiesMatch(candidate: string | null | undefined, expected: string | null) {
  if (!expected) {
    return false;
  }

  return normalizeSteamId(candidate) === expected;
}

async function fetchRsuJson(path: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers: HeadersInit = {
    accept: "application/json",
  };

  if (process.env.RSU_API_TOKEN) {
    headers["X-FA-API-TOKEN"] = process.env.RSU_API_TOKEN;
  }

  try {
    const response = await fetch(`${getRsuApiBaseUrl()}${path}`, {
      cache: "no-store",
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    return response.json() as Promise<unknown>;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchRsuPlayedTimeMinutes(input: {
  playerName?: string | null;
  steamId: string;
}) {
  const normalizedSteamId = normalizeSteamId(input.steamId);

  if (!normalizedSteamId) {
    return null;
  }

  const payload = readRecord(
    await fetchRsuJson(`/search.php?q=${encodeURIComponent(normalizedSteamId)}`),
  );
  const players = Array.isArray(payload.players)
    ? payload.players.map(sanitizePlayer).filter((player) => player !== null)
    : [];
  const normalizedName = normalizeAdminName(input.playerName)?.toLowerCase() ?? null;
  const player = players.find((candidate) => (
    identitiesMatch(candidate.player, normalizedSteamId) ||
    identitiesMatch(candidate.steamId, normalizedSteamId) ||
    (normalizedName !== null && candidate.nick.trim().toLowerCase() === normalizedName)
  ));

  if (!player) {
    return null;
  }

  return Math.floor(Math.max(player.playedTime, 0) / 60);
}
