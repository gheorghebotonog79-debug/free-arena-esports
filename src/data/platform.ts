import type { LucideIcon } from "lucide-react";
import {
  Crown,
  Headphones,
  MessageSquare,
  ShieldCheck,
  Trophy,
  UsersRound,
  WalletCards,
} from "lucide-react";

const iconBase = "/assets/game-icons";

export const platformStats = [
  { key: "players", value: "24K" },
  { key: "servers", value: "18" },
  { key: "cups", value: "12" },
  { key: "uptime", value: "99%" },
] as const;

export const spotlightMatch = {
  titleKey: "title",
  modeKey: "mode",
  slotsKey: "slots",
  statusKey: "status",
  teams: [
    {
      key: "alphaFive",
      icon: `${iconBase}/CS2.png`,
    },
    {
      key: "nightCore",
      icon: `${iconBase}/VAL.png`,
    },
  ],
} as const;

export const gameServers = [
  {
    key: "cs16",
    statusKey: "online",
    statusClass: "bg-arena-green/12 text-arena-green border border-arena-green/30",
    icon: `${iconBase}/CS.png`,
    players: "29/32",
    tickrate: "100",
    ping: "12ms",
    address: "play.free-arena.ro:27015",
    connectHref: "steam://connect/play.free-arena.ro:27015",
    connectable: true,
    tags: ["classic", "ranked", "vip"],
  },
  {
    key: "global",
    statusKey: "online",
    statusClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
    icon: `${iconBase}/GL.png`,
    players: "54/64",
    tickrate: "100",
    ping: "18ms",
    address: "global.free-arena.ro:27015",
    connectHref: "steam://connect/global.free-arena.ro:27015",
    connectable: true,
    tags: ["global", "scrims", "community"],
  },
  {
    key: "cs2",
    statusKey: "warmup",
    statusClass: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
    icon: `${iconBase}/CS2.png`,
    players: "9/10",
    tickrate: "128",
    ping: "21ms",
    address: "cs2.free-arena.ro:27015",
    connectHref: "steam://connect/cs2.free-arena.ro:27015",
    connectable: true,
    tags: ["premier", "faceitStyle", "antiCheat"],
  },
  {
    key: "respawn",
    statusKey: "comingSoon",
    statusClass: "bg-white/8 text-white/58 border border-white/14",
    icon: `${iconBase}/RES.png`,
    players: "0/32",
    tickrate: "100",
    ping: "--",
    address: "respawn.free-arena.ro:27015",
    connectHref: "",
    connectable: false,
    tags: ["respawn", "soon", "events"],
  },
] as const;

export const tournamentCards = [
  {
    key: "saturdayBracket",
    statusKey: "open",
    slots: "12/16",
  },
  {
    key: "monthlyLadder",
    statusKey: "active",
    slots: "246",
  },
  {
    key: "communityEvent",
    statusKey: "ready",
    slots: "10/10",
  },
] as const;

type CommunityPillar = {
  key: string;
  icon: LucideIcon;
  iconClass: string;
};

type CommunityChannel = {
  key: string;
  icon: LucideIcon;
  endpoint: string;
  members: string;
  href: string;
  external: boolean;
  iconClass: string;
  statusClass: string;
};

export const communityChannels: CommunityChannel[] = [
  {
    key: "discord",
    icon: MessageSquare,
    endpoint: "discord.gg/freearena",
    members: "1.8K",
    href: "https://discord.gg/freearena",
    external: true,
    iconClass: "bg-[#5865f2]/14 text-[#98a3ff] border border-[#98a3ff]/30",
    statusClass: "bg-arena-green/12 text-arena-green border border-arena-green/30",
  },
  {
    key: "teamspeak",
    icon: Headphones,
    endpoint: "ts.free-arena.ro",
    members: "76",
    href: "ts3server://ts.free-arena.ro",
    external: false,
    iconClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
    statusClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
  },
];

export const communityPillars: CommunityPillar[] = [
  {
    key: "playerIdentity",
    icon: UsersRound,
    iconClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
  },
  {
    key: "vipEconomy",
    icon: WalletCards,
    iconClass: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
  },
  {
    key: "adminControl",
    icon: ShieldCheck,
    iconClass: "bg-arena-green/12 text-arena-green border border-arena-green/30",
  },
  {
    key: "communityFeed",
    icon: MessageSquare,
    iconClass: "bg-arena-red/12 text-arena-red border border-arena-red/30",
  },
  {
    key: "rewards",
    icon: Trophy,
    iconClass: "bg-white/8 text-white border border-white/14",
  },
  {
    key: "staffRoles",
    icon: Crown,
    iconClass: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
  },
];
