import type { Locale } from "@/i18n/routing";
import { officialContactChannels } from "@/lib/contact";

export type ContactCardKey =
  | "discord"
  | "forum"
  | "general"
  | "partnerships"
  | "staff"
  | "teamspeak";

export type ContactCardTone = "cyan" | "global" | "orange" | "red";
export type ContactCardType = "email" | "external" | "teamspeak";

export type ContactCardContent = {
  description: string;
  href?: string;
  key: ContactCardKey;
  primaryLabel: string;
  secondaryLabel?: string;
  status: string;
  title: string;
  tone: ContactCardTone;
  type: ContactCardType;
  value: string;
};

export type ContactCommandCenterContent = {
  actions: {
    copied: string;
    copiedToast: string;
    copyAria: string;
    emailAria: string;
    openAria: string;
  };
  cards: readonly ContactCardContent[];
  help: {
    eyebrow: string;
    items: readonly string[];
    title: string;
  };
  hero: {
    eyebrow: string;
    subtitle: string;
    title: string;
  };
  metadata: {
    description: string;
    title: string;
  };
  sectionTitle: string;
};

export const contactCommandCenterContent: Record<Locale, ContactCommandCenterContent> = {
  ro: {
    metadata: {
      title: "Contact FREE-ARENA | Suport, Staff, Parteneriate",
      description:
        "Contactează FREE-ARENA pentru suport, recrutare staff, parteneriate, TeamSpeak, Discord și forum.",
    },
    hero: {
      eyebrow: "Command center",
      title: "CONTACT FREE-ARENA",
      subtitle: "Canal oficial pentru suport, recrutare, parteneriate și comunitate.",
    },
    sectionTitle: "Canale oficiale",
    actions: {
      copied: "Copiat",
      copiedToast: "{value} copiat.",
      copyAria: "Copiază {value}",
      emailAria: "Trimite email către {value}",
      openAria: "Deschide {title}",
    },
    cards: [
      {
        key: "general",
        type: "email",
        tone: "cyan",
        title: "Contact general",
        description: "Pentru suport general, probleme tehnice și mesaje legate de comunitate.",
        status: "Canal oficial",
        value: officialContactChannels.generalEmail,
        primaryLabel: "Trimite email",
        secondaryLabel: "Copiază email",
      },
      {
        key: "staff",
        type: "email",
        tone: "red",
        title: "Recrutare staff",
        description: "Pentru aplicații staff, discuții despre roluri și coordonare cu echipa.",
        status: "Recrutare",
        value: officialContactChannels.staffEmail,
        primaryLabel: "Aplică prin email",
        secondaryLabel: "Copiază email",
      },
      {
        key: "partnerships",
        type: "email",
        tone: "orange",
        title: "Parteneriate",
        description: "Pentru colaborări, evenimente, promovare și proiecte comune.",
        status: "Colaborări",
        value: officialContactChannels.partnershipsEmail,
        primaryLabel: "Trimite propunere",
        secondaryLabel: "Copiază email",
      },
      {
        key: "teamspeak",
        type: "teamspeak",
        tone: "cyan",
        title: "TeamSpeak",
        description: "Voice stabil pentru jucători, clanuri și staff.",
        status: "Voice server",
        value: officialContactChannels.teamspeakAddress,
        href: officialContactChannels.teamspeakUrl,
        primaryLabel: "Conectare TS3",
        secondaryLabel: "Copiază server",
      },
      {
        key: "discord",
        type: "external",
        tone: "global",
        title: "Discord",
        description: "Chat rapid, noutăți, evenimente și comunicare cu staff-ul.",
        status: "Comunitate",
        value: "discord.gg/freearena",
        href: officialContactChannels.discordUrl,
        primaryLabel: "Intră pe Discord",
      },
      {
        key: "forum",
        type: "external",
        tone: "orange",
        title: "Forum",
        description: "Cereri admin, cereri VIP, regulament, suport și anunțuri oficiale.",
        status: "Forum oficial",
        value: "free-arena.ro",
        href: officialContactChannels.forumUrl,
        primaryLabel: "Deschide forum",
      },
    ],
    help: {
      eyebrow: "Help topics",
      title: "Pentru ce ne poți contacta?",
      items: [
        "Probleme tehnice",
        "Cereri admin / staff",
        "Sugestii servere",
        "Reclamații",
        "Colaborări",
        "Evenimente",
        "Promovare comunitate",
      ],
    },
  },
  en: {
    metadata: {
      title: "Contact FREE-ARENA | Support, Staff, Partnerships",
      description:
        "Contact FREE-ARENA for support, staff recruitment, partnerships, TeamSpeak, Discord and forum.",
    },
    hero: {
      eyebrow: "Command center",
      title: "CONTACT FREE-ARENA",
      subtitle: "Official channel for support, recruitment, partnerships and community communication.",
    },
    sectionTitle: "Official channels",
    actions: {
      copied: "Copied",
      copiedToast: "{value} copied.",
      copyAria: "Copy {value}",
      emailAria: "Send email to {value}",
      openAria: "Open {title}",
    },
    cards: [
      {
        key: "general",
        type: "email",
        tone: "cyan",
        title: "General contact",
        description: "For general support, technical issues and community messages.",
        status: "Official channel",
        value: officialContactChannels.generalEmail,
        primaryLabel: "Send email",
        secondaryLabel: "Copy email",
      },
      {
        key: "staff",
        type: "email",
        tone: "red",
        title: "Staff recruitment",
        description: "For staff applications, role discussions and team coordination.",
        status: "Recruitment",
        value: officialContactChannels.staffEmail,
        primaryLabel: "Apply by email",
        secondaryLabel: "Copy email",
      },
      {
        key: "partnerships",
        type: "email",
        tone: "orange",
        title: "Partnerships",
        description: "For collaborations, events, promotion and shared projects.",
        status: "Partnerships",
        value: officialContactChannels.partnershipsEmail,
        primaryLabel: "Send proposal",
        secondaryLabel: "Copy email",
      },
      {
        key: "teamspeak",
        type: "teamspeak",
        tone: "cyan",
        title: "TeamSpeak",
        description: "Stable voice for players, clans and staff.",
        status: "Voice server",
        value: officialContactChannels.teamspeakAddress,
        href: officialContactChannels.teamspeakUrl,
        primaryLabel: "Connect TS3",
        secondaryLabel: "Copy server",
      },
      {
        key: "discord",
        type: "external",
        tone: "global",
        title: "Discord",
        description: "Fast chat, news, events and communication with staff.",
        status: "Community",
        value: "discord.gg/freearena",
        href: officialContactChannels.discordUrl,
        primaryLabel: "Join Discord",
      },
      {
        key: "forum",
        type: "external",
        tone: "orange",
        title: "Forum",
        description: "Admin requests, VIP requests, rules, support and official announcements.",
        status: "Official forum",
        value: "free-arena.ro",
        href: officialContactChannels.forumUrl,
        primaryLabel: "Open forum",
      },
    ],
    help: {
      eyebrow: "Help topics",
      title: "What can you contact us for?",
      items: [
        "Technical issues",
        "Admin / staff applications",
        "Server suggestions",
        "Complaints",
        "Partnerships",
        "Events",
        "Community promotion",
      ],
    },
  },
};
