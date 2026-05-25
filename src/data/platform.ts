import type { LucideIcon } from "lucide-react";
import type { PublicServerSlug } from "@/lib/servers";
import { publicServers } from "@/lib/servers";
import {
  Crown,
  Headphones,
  MessageSquare,
  ShieldCheck,
  Trophy,
  UsersRound,
  WalletCards,
} from "lucide-react";

type GameServerCard = {
  key: PublicServerSlug;
  icon: string;
  address: string;
  connectHref: string;
  connectable: boolean;
  pending?: boolean;
  tags: readonly string[];
};

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
      icon: "/assets/game-icons/CS2.png",
    },
    {
      key: "nightCore",
      icon: "/assets/game-icons/VAL.png",
    },
  ],
} as const;

export const gameServers = publicServers.map((server) => ({
  key: server.key,
  icon: server.icon,
  address: server.address,
  connectHref: server.connectHref,
  connectable: server.connectable,
  pending: server.pending,
  tags: server.tags,
})) satisfies readonly GameServerCard[];

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
  channels?: readonly string[];
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
    members: "Online",
    href: "ts3server://ts.free-arena.ro",
    external: false,
    iconClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
    statusClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
    channels: ["public", "cs16", "cs2", "adminSupport", "vipLounge"],
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
