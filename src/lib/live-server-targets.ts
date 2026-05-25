import { publicServers, type PublicServerConfig, type PublicServerSlug } from "@/lib/servers";

export type LiveServerKey = PublicServerSlug;

export type LiveServerStatusKind = "loading" | "online" | "offline" | "pending";

export type LiveServerTarget = PublicServerConfig & {
  gameType: "counterstrike16" | "counterstrike2";
};

export type LiveServerStatus = {
  key: LiveServerKey;
  id: LiveServerKey;
  slug: LiveServerKey;
  name: string;
  game: string;
  region: string;
  host: string;
  port: number;
  tags: readonly string[];
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
  lastUpdated: string;
  connectable: boolean;
  pending: boolean;
};

export type LiveServersResponse = {
  servers: LiveServerStatus[];
  checkedAt: string;
};

export const liveServerTargets = publicServers.filter(
  (server): server is LiveServerTarget => server.liveQueryable && Boolean(server.gameType),
);
