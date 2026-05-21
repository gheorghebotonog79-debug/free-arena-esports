export type LiveServerKey = "cs16" | "global" | "cs2" | "respawn";

export type LiveServerStatusKind = "loading" | "online" | "offline";

export type LiveServerTarget = {
  key: LiveServerKey;
  gameType: "counterstrike16" | "counterstrike2";
  host: string;
  port: number;
  fallbackName: string;
  fallbackMaxPlayers: number;
};

export type LiveServerStatus = {
  key: LiveServerKey;
  status: Exclude<LiveServerStatusKind, "loading">;
  online: boolean;
  serverName: string;
  map: string;
  players: number;
  maxPlayers: number;
  ping: number | null;
  address: string;
  connectUrl: string;
  checkedAt: string;
};

export type LiveServersResponse = {
  servers: LiveServerStatus[];
  checkedAt: string;
};

export const liveServerTargets = [
  {
    key: "cs16",
    gameType: "counterstrike16",
    host: "cs.free-arena.ro",
    port: 27015,
    fallbackName: "FREE-ARENA.RO CS 1.6",
    fallbackMaxPlayers: 32,
  },
  {
    key: "global",
    gameType: "counterstrike16",
    host: "global.free-arena.ro",
    port: 27015,
    fallbackName: "FREE-ARENA.RO Global",
    fallbackMaxPlayers: 32,
  },
  {
    key: "cs2",
    gameType: "counterstrike2",
    host: "cs2.free-arena.ro",
    port: 27015,
    fallbackName: "FREE-ARENA.RO CS2",
    fallbackMaxPlayers: 32,
  },
  {
    key: "respawn",
    gameType: "counterstrike16",
    host: "respawn.free-arena.ro",
    port: 27015,
    fallbackName: "FREE-ARENA.RO Respawn",
    fallbackMaxPlayers: 32,
  },
] as const satisfies readonly LiveServerTarget[];
