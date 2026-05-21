import type { LucideIcon } from "lucide-react";
import { Crown, MessageSquare, ShieldCheck, Trophy, UsersRound, WalletCards } from "lucide-react";

const iconBase = "/assets/game-icons";

export const platformStats = [
  { label: "Players", value: "24K" },
  { label: "Servers", value: "18" },
  { label: "Cups", value: "12" },
  { label: "Uptime", value: "99%" },
] as const;

export const spotlightMatch = {
  title: "Free Arena Derby",
  mode: "Best of 3",
  slots: "10 players",
  status: "Admin ready",
  teams: [
    {
      name: "Alpha Five",
      record: "8W - 2L",
      icon: `${iconBase}/CS2.png`,
    },
    {
      name: "Night Core",
      record: "7W - 3L",
      icon: `${iconBase}/VAL.png`,
    },
  ],
} as const;

export const gameServers = [
  {
    name: "CS 1.6 Classic",
    region: "Romania",
    status: "Online",
    statusClass: "bg-arena-green/12 text-arena-green border border-arena-green/30",
    icon: `${iconBase}/CS.png`,
    players: "31/32",
    tickrate: "100",
    ping: "14ms",
    address: "play.free-arena.ro:27015",
    tags: ["Classic", "Ranked", "VIP"],
  },
  {
    name: "CS2 Premier",
    region: "EU Central",
    status: "Warmup",
    statusClass: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
    icon: `${iconBase}/CS2.png`,
    players: "8/10",
    tickrate: "128",
    ping: "21ms",
    address: "cs2.free-arena.ro",
    tags: ["Premier", "Faceit style", "Anti-cheat"],
  },
  {
    name: "Mixed Arena",
    region: "Global",
    status: "Queue",
    statusClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
    icon: `${iconBase}/APEX.png`,
    players: "64/80",
    tickrate: "64",
    ping: "33ms",
    address: "hub.free-arena.ro",
    tags: ["Events", "Scrims", "Community"],
  },
] as const;

export const tournamentCards = [
  {
    label: "Saturday bracket",
    title: "Counter-Strike Weekend Cup",
    copy: "Team registration, map veto, match state, and result verification are ready for service wiring.",
    status: "Open",
    slots: "12/16",
  },
  {
    label: "Monthly ladder",
    title: "FREE-ARENA.RO Season Ladder",
    copy: "Ranked standings are structured for backend scoring, season resets, rewards, and audit trails.",
    status: "Active",
    slots: "246",
  },
  {
    label: "Community event",
    title: "VIP Night Showmatch",
    copy: "Event metadata supports hosts, prizes, participants, and broadcast-ready match summaries.",
    status: "Ready",
    slots: "10/10",
  },
] as const;

type CommunityPillar = {
  title: string;
  copy: string;
  icon: LucideIcon;
  iconClass: string;
};

export const communityPillars: CommunityPillar[] = [
  {
    title: "Player identity",
    copy: "Profiles can connect Steam, ranks, sanctions, teams, and platform-wide progression.",
    icon: UsersRound,
    iconClass: "bg-arena-cyan/12 text-arena-cyan border border-arena-cyan/30",
  },
  {
    title: "VIP economy",
    copy: "Store surfaces are prepared for credits, perks, inventory, invoices, and entitlement checks.",
    icon: WalletCards,
    iconClass: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
  },
  {
    title: "Admin control",
    copy: "Operations can expand into moderation queues, server actions, ban history, and audit logs.",
    icon: ShieldCheck,
    iconClass: "bg-arena-green/12 text-arena-green border border-arena-green/30",
  },
  {
    title: "Community feed",
    copy: "News, Discord events, patch notes, winners, and staff announcements have a clean content path.",
    icon: MessageSquare,
    iconClass: "bg-arena-red/12 text-arena-red border border-arena-red/30",
  },
  {
    title: "Rewards",
    copy: "Badge, mission, and battle pass style data can plug into this structure without UI rewrites.",
    icon: Trophy,
    iconClass: "bg-white/8 text-white border border-white/14",
  },
  {
    title: "Staff roles",
    copy: "Role-aware navigation and permissioned dashboard areas can be added as the backend matures.",
    icon: Crown,
    iconClass: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
  },
];
