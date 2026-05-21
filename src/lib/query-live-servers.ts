import { GameDig } from "gamedig";
import {
  liveServerTargets,
  type LiveServerStatus,
  type LiveServersResponse,
  type LiveServerTarget,
} from "@/lib/live-server-targets";

const QUERY_TIMEOUT_MS = 2_400;
const ATTEMPT_TIMEOUT_MS = 4_200;

function buildAddress(target: LiveServerTarget) {
  return `${target.host}:${target.port}`;
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : fallback;
}

function offlineStatus(target: LiveServerTarget, checkedAt: string): LiveServerStatus {
  return {
    key: target.key,
    status: "offline",
    online: false,
    serverName: target.fallbackName,
    map: "--",
    players: 0,
    maxPlayers: target.fallbackMaxPlayers,
    ping: null,
    address: buildAddress(target),
    connectUrl: `steam://connect/${buildAddress(target)}`,
    checkedAt,
  };
}

async function queryServer(target: LiveServerTarget): Promise<LiveServerStatus> {
  const checkedAt = new Date().toISOString();

  try {
    const state = await GameDig.query({
      type: target.gameType,
      host: target.host,
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
      key: target.key,
      status: "online",
      online: true,
      serverName: state.name?.trim() || target.fallbackName,
      map: state.map?.trim() || "--",
      players: normalizeNumber(state.numplayers, 0),
      maxPlayers: normalizeNumber(state.maxplayers, target.fallbackMaxPlayers),
      ping: normalizeNumber(state.ping, 0),
      address,
      connectUrl: state.connect ? `steam://connect/${state.connect}` : `steam://connect/${address}`,
      checkedAt,
    };
  } catch {
    return offlineStatus(target, checkedAt);
  }
}

export async function queryLiveServers(): Promise<LiveServersResponse> {
  const servers = await Promise.all(liveServerTargets.map((target) => queryServer(target)));

  return {
    servers,
    checkedAt: new Date().toISOString(),
  };
}
