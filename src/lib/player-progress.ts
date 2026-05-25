export const DEFAULT_RSU_API_BASE_URL = "https://free-arena.ro/api/rsu";

export type PlayerProgressPlayer = {
  player: string;
  steamId: string;
  nick: string;
  xp: number;
  level: number;
  kills: number;
  deaths: number;
  headshots: number;
  assists: number;
  shots: number;
  hits: number;
  damage: number;
  playedTime: number;
  lastLogin: string;
  kdRatio: number;
  hsRate: number;
  accuracy: number;
};

export type PlayerProgressSummary = {
  totalPlayers: number;
  totalKills: number;
  totalDeaths: number;
  totalHeadshots: number;
  totalPlayedTime: number;
  topPlayer: {
    nick: string;
    steamId: string;
    xp: number;
    kills: number;
  } | null;
};

export type PlayerProgressResponse = {
  ok: boolean;
  players: PlayerProgressPlayer[];
  summary: PlayerProgressSummary | null;
  cached: boolean;
  updatedAt: string | null;
};

export type PlayerSearchResponse = {
  ok: boolean;
  query: string;
  count: number;
  players: PlayerProgressPlayer[];
};

function readNumber(value: unknown) {
  const numeric = Number(value);

  return Number.isFinite(numeric) ? numeric : 0;
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function sanitizePlayer(value: unknown): PlayerProgressPlayer | null {
  if (!isRecord(value)) {
    return null;
  }

  const player = readString(value.player);
  const steamId = readString(value.steamId);
  const nick = readString(value.nick);

  if (!player || !nick) {
    return null;
  }

  return {
    player,
    steamId,
    nick,
    xp: readNumber(value.xp),
    level: readNumber(value.level),
    kills: readNumber(value.kills),
    deaths: readNumber(value.deaths),
    headshots: readNumber(value.headshots),
    assists: readNumber(value.assists),
    shots: readNumber(value.shots),
    hits: readNumber(value.hits),
    damage: readNumber(value.damage),
    playedTime: readNumber(value.playedTime),
    lastLogin: readString(value.lastLogin),
    kdRatio: readNumber(value.kdRatio),
    hsRate: readNumber(value.hsRate),
    accuracy: readNumber(value.accuracy),
  };
}

export function sanitizeSummary(value: unknown): PlayerProgressSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const topPlayer = isRecord(value.topPlayer)
    ? {
        nick: readString(value.topPlayer.nick),
        steamId: readString(value.topPlayer.steamId),
        xp: readNumber(value.topPlayer.xp),
        kills: readNumber(value.topPlayer.kills),
      }
    : null;

  return {
    totalPlayers: readNumber(value.totalPlayers),
    totalKills: readNumber(value.totalKills),
    totalDeaths: readNumber(value.totalDeaths),
    totalHeadshots: readNumber(value.totalHeadshots),
    totalPlayedTime: readNumber(value.totalPlayedTime),
    topPlayer: topPlayer?.nick ? topPlayer : null,
  };
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: value >= 10_000 ? 1 : 0,
  }).format(value);
}

export function formatPlayedTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);

  if (hours >= 1) {
    return `${hours}h`;
  }

  const minutes = Math.floor(safeSeconds / 60);

  return `${minutes}m`;
}
