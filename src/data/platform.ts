import type { LucideIcon } from "lucide-react";
import { Crown, MessageSquare, ShieldCheck, Trophy, UsersRound, WalletCards } from "lucide-react";

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
    key: "cs16Classic",
    statusKey: "online",
    statusClass: "bg-arena-green/12 text-arena-green border border-arena-green/30",
    icon: `${iconBase}/CS.png`,
    players: "31/32",
    tickrate: "100",
    ping: "14ms",
    address: "play.free-arena.ro:27015",
    tags: ["classic", "ranked", "vip"],
  },
  {
    key: "cs2Premier",
    statusKey: "warmup",
    statusClass: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
    icon: `${iconBase}/CS2.png`,
    players: "8/10",
    tickrate: "128",
    ping: "21ms",
    address: "cs2.free-arena.ro",
    tags: ["premier", "faceitStyle", "antiCheat"],
  },
  {
    key: "mixedArena",
    statusKey: "queue",
    statusClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
    icon: `${iconBase}/APEX.png`,
    players: "64/80",
    tickrate: "64",
    ping: "33ms",
    address: "hub.free-arena.ro",
    tags: ["events", "scrims", "community"],
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
