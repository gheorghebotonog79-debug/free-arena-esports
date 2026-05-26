const iconBase = "/assets/game-icons";

export type PublicServerSlug = "cs16" | "respawn" | "cs2" | "global";

export type PublicServerConfig = {
  key: PublicServerSlug;
  slug: PublicServerSlug;
  icon: string;
  game: string;
  region: string;
  address: string;
  host: string;
  queryHost?: string;
  port: number;
  gameType?: "counterstrike16" | "counterstrike2";
  fallbackName: string;
  fallbackMaxPlayers: number;
  connectHref: string;
  connectable: boolean;
  liveQueryable: boolean;
  pending?: boolean;
  tags: readonly string[];
};

export const publicServers: readonly PublicServerConfig[] = [
  {
    key: "cs16",
    slug: "cs16",
    icon: `${iconBase}/CS.png`,
    game: "Counter-Strike 1.6",
    region: "Romania",
    address: "cs.free-arena.ro:27015",
    host: "cs.free-arena.ro",
    port: 27015,
    gameType: "counterstrike16",
    fallbackName: "FREE-ARENA.RO CS 1.6",
    fallbackMaxPlayers: 32,
    connectHref: "steam://connect/cs.free-arena.ro:27015",
    connectable: true,
    liveQueryable: true,
    tags: ["classic", "ranked", "vip"],
  },
  {
    key: "respawn",
    slug: "respawn",
    icon: `${iconBase}/RES.png`,
    game: "Counter-Strike 1.6 Respawn",
    region: "Romania",
    address: "respawn.free-arena.ro:27015",
    host: "respawn.free-arena.ro",
    port: 27015,
    gameType: "counterstrike16",
    fallbackName: "FREE-ARENA.RO Respawn",
    fallbackMaxPlayers: 32,
    connectHref: "steam://connect/respawn.free-arena.ro:27015",
    connectable: true,
    liveQueryable: true,
    tags: ["respawn", "ranked", "vip"],
  },
  {
    key: "cs2",
    slug: "cs2",
    icon: `${iconBase}/CS2.png`,
    game: "Counter-Strike 2",
    region: "EU Central",
    address: "cs2.free-arena.ro:27015",
    host: "cs2.free-arena.ro",
    port: 27015,
    gameType: "counterstrike2",
    fallbackName: "FREE-ARENA.RO CS2",
    fallbackMaxPlayers: 32,
    connectHref: "steam://connect/cs2.free-arena.ro:27015",
    connectable: true,
    liveQueryable: true,
    tags: ["premier", "faceitStyle", "antiCheat"],
  },
  {
    key: "global",
    slug: "global",
    icon: `${iconBase}/GL.png`,
    game: "FREE-ARENA Global",
    region: "Coming soon",
    address: "global.free-arena.ro:27015",
    host: "global.free-arena.ro",
    port: 27015,
    fallbackName: "FREE-ARENA.RO Global",
    fallbackMaxPlayers: 0,
    connectHref: "",
    connectable: false,
    liveQueryable: false,
    pending: true,
    tags: ["global", "soon", "community"],
  },
] as const;

export const publicServerSlugs = publicServers.map((server) => server.slug);

export function getPublicServerConfig(slug: string) {
  return publicServers.find((server) => server.slug === slug) ?? null;
}
