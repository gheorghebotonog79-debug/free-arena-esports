import { GameDig } from "gamedig";
import {
  liveServerTargets,
  type LiveServerStatus,
  type LiveServersResponse,
  type LiveServerTarget,
} from "@/lib/live-server-targets";
import { publicServers, type PublicServerConfig } from "@/lib/servers";

const QUERY_TIMEOUT_MS = 5_000;
const ATTEMPT_TIMEOUT_MS = 8_000;
const LAST_KNOWN_ONLINE_TTL_MS = 10 * 60_000;
const STATUS_BRIDGE_URL = "https://free-arena.ro/api/server-status.php";

const lastKnownOnline = new Map<string, LiveServerStatus>();

type BridgeServerStatus = {
  ok?: boolean;
  name?: string;
  map?: string;
  players?: number;
  maxPlayers?: number;
};

type BridgeServerResponse = {
  ok?: boolean;
  checkedAt?: string;
  server?: BridgeServerStatus;
  servers?: Partial<Record<string, BridgeServerStatus>>;
};

function buildAddress(target: LiveServerTarget) {
  return target.address;
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : fallback;
}

function queryHosts(target: LiveServerTarget) {
  return Array.from(new Set([target.queryHost, target.host].filter(Boolean))) as string[];
}

function baseStatus(target: PublicServerConfig, checkedAt: string) {
  return {
    key: target.key,
    id: target.key,
    slug: target.slug,
    name: target.fallbackName,
    game: target.game,
    region: target.region,
    host: target.host,
    port: target.port,
    tags: target.tags,
    address: target.address,
    checkedAt,
    lastUpdated: checkedAt,
    connectable: target.connectable,
    pending: target.pending === true,
  };
}

function offlineStatus(target: LiveServerTarget, checkedAt: string): LiveServerStatus {
  return {
    ...baseStatus(target, checkedAt),
    status: "offline",
    online: false,
    serverName: target.fallbackName,
    map: "",
    players: 0,
    maxPlayers: target.fallbackMaxPlayers,
    ping: null,
    connectUrl: `steam://connect/${buildAddress(target)}`,
  };
}

function pendingStatus(target: PublicServerConfig, checkedAt: string): LiveServerStatus {
  return {
    ...baseStatus(target, checkedAt),
    status: "pending",
    online: false,
    serverName: target.fallbackName,
    map: "",
    players: 0,
    maxPlayers: 0,
    ping: null,
    connectUrl: "",
  };
}

function rememberOnlineStatus(status: LiveServerStatus) {
  lastKnownOnline.set(status.key, status);
  return status;
}

function lastKnownStatus(target: LiveServerTarget, checkedAt: string) {
  const status = lastKnownOnline.get(target.key);

  if (!status) {
    return null;
  }

  const lastUpdatedAt = Date.parse(status.lastUpdated);

  if (!Number.isFinite(lastUpdatedAt) || Date.now() - lastUpdatedAt > LAST_KNOWN_ONLINE_TTL_MS) {
    lastKnownOnline.delete(target.key);
    return null;
  }

  return {
    ...status,
    checkedAt,
  };
}

async function queryStatusBridge(target: LiveServerTarget, checkedAt: string) {
  try {
    const response = await fetch(`${STATUS_BRIDGE_URL}?server=${target.key}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json() as BridgeServerResponse;
    const bridgeStatus = payload.server ?? payload.servers?.[target.key];

    if (!payload.ok || !bridgeStatus?.ok) {
      return null;
    }

    const address = buildAddress(target);

    return rememberOnlineStatus({
      ...baseStatus(target, checkedAt),
      lastUpdated: payload.checkedAt ?? checkedAt,
      status: "online",
      online: true,
      serverName: bridgeStatus.name?.trim() || target.fallbackName,
      map: bridgeStatus.map?.trim() || "",
      players: normalizeNumber(bridgeStatus.players, 0),
      maxPlayers: normalizeNumber(bridgeStatus.maxPlayers, target.fallbackMaxPlayers),
      ping: null,
      connectUrl: `steam://connect/${address}`,
    });
  } catch {
    return null;
  }
}

async function queryServer(target: LiveServerTarget): Promise<LiveServerStatus> {
  const checkedAt = new Date().toISOString();

  for (const host of queryHosts(target)) {
    try {
      const state = await GameDig.query({
        type: target.gameType,
        host,
        port: target.port,
        givenPortOnly: true,
        requestPlayers: false,
        maxRetries: 1,
        socketTimeout: QUERY_TIMEOUT_MS,
        attemptTimeout: ATTEMPT_TIMEOUT_MS,
        ipFamily: 4,
      });

      const address = buildAddress(target);

      return rememberOnlineStatus({
        ...baseStatus(target, checkedAt),
        status: "online",
        online: true,
        serverName: state.name?.trim() || target.fallbackName,
        map: state.map?.trim() || "",
        players: normalizeNumber(state.numplayers, 0),
        maxPlayers: normalizeNumber(state.maxplayers, target.fallbackMaxPlayers),
        ping: normalizeNumber(state.ping, 0),
        connectUrl: `steam://connect/${address}`,
      });
    } catch {
      // Try the next host form, e.g. direct IP first and public DNS as fallback.
    }
  }

  const bridgeStatus = await queryStatusBridge(target, checkedAt);

  if (bridgeStatus) {
    return bridgeStatus;
  }

  return lastKnownStatus(target, checkedAt) ?? offlineStatus(target, checkedAt);
}

export async function queryLiveServers(): Promise<LiveServersResponse> {
  const liveStatuses = await Promise.all(liveServerTargets.map((target) => queryServer(target)));
  const statusByKey = new Map(liveStatuses.map((server) => [server.key, server]));
  const checkedAt = new Date().toISOString();
  const servers = publicServers.map((server) => (
    statusByKey.get(server.key) ?? pendingStatus(server, checkedAt)
  ));

  return {
    servers,
    checkedAt,
  };
}
