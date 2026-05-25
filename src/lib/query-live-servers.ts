import { GameDig } from "gamedig";
import {
  liveServerTargets,
  type LiveServerStatus,
  type LiveServersResponse,
  type LiveServerTarget,
} from "@/lib/live-server-targets";
import { publicServers, type PublicServerConfig } from "@/lib/servers";

const QUERY_TIMEOUT_MS = 2_400;
const ATTEMPT_TIMEOUT_MS = 4_200;

function buildAddress(target: LiveServerTarget) {
  return target.address;
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : fallback;
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
    map: "--",
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

async function queryServer(target: LiveServerTarget): Promise<LiveServerStatus> {
  const checkedAt = new Date().toISOString();

  try {
    const state = await GameDig.query({
      type: target.gameType,
      host: target.queryHost ?? target.host,
      port: target.port,
      givenPortOnly: true,
      requestPlayers: false,
      maxRetries: 0,
      socketTimeout: QUERY_TIMEOUT_MS,
      attemptTimeout: ATTEMPT_TIMEOUT_MS,
      ipFamily: 4,
    });

    const address = buildAddress(target);

    return {
      ...baseStatus(target, checkedAt),
      status: "online",
      online: true,
      serverName: state.name?.trim() || target.fallbackName,
      map: state.map?.trim() || "--",
      players: normalizeNumber(state.numplayers, 0),
      maxPlayers: normalizeNumber(state.maxplayers, target.fallbackMaxPlayers),
      ping: normalizeNumber(state.ping, 0),
      connectUrl: `steam://connect/${address}`,
    };
  } catch {
    return offlineStatus(target, checkedAt);
  }
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
