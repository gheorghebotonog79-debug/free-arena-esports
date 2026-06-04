import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SimpleSeoPage } from "@/components/seo/simple-seo-page";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata } from "@/lib/seo";

type DiscordPageProps = {
  params: Promise<{ locale: string }>;
};

const content: Record<
  Locale,
  {
    action: { external: true; href: string; label: string };
    description: string;
    eyebrow: string;
    highlights: readonly string[];
    metadataDescription: string;
    metadataTitle: string;
    title: string;
  }
> = {
  ro: {
    metadataTitle: "FREE-ARENA Discord | Comunitate gaming CS 1.6 și CS2",
    metadataDescription:
      "Intră pe Discord FREE-ARENA pentru anunțuri, evenimente, suport și comunitatea CS 1.6 și CS2.",
    eyebrow: "Community chat",
    title: "Discord FREE-ARENA",
    description:
      "Discord-ul FREE-ARENA adună comunitatea pentru anunțuri, discuții, evenimente și suport rapid.",
    highlights: [
      "Invitație publică: discord.gg/freearena",
      "Canale pentru servere, evenimente, staff și comunitate.",
      "Conectat cu serverele FREE-ARENA CS 1.6, CS2 și TeamSpeak.",
    ],
    action: {
      external: true,
      href: "https://discord.gg/freearena",
      label: "Intră pe Discord",
    },
  },
  en: {
    metadataTitle: "FREE-ARENA Discord | CS 1.6 and CS2 gaming community",
    metadataDescription:
      "Join FREE-ARENA Discord for announcements, events, support and the CS 1.6 and CS2 community.",
    eyebrow: "Community chat",
    title: "FREE-ARENA Discord",
    description:
      "FREE-ARENA Discord brings the community together for announcements, conversations, events and quick support.",
    highlights: [
      "Public invite: discord.gg/freearena",
      "Channels for servers, events, staff and community updates.",
      "Connected with FREE-ARENA CS 1.6, CS2 and TeamSpeak.",
    ],
    action: {
      external: true,
      href: "https://discord.gg/freearena",
      label: "Join Discord",
    },
  },
};

export async function generateMetadata({ params }: DiscordPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const page = content[safeLocale];

  return buildPublicMetadata({
    description: page.metadataDescription,
    imageAlt: "FREE-ARENA Discord",
    locale: safeLocale,
    path: "/discord",
    title: page.metadataTitle,
  });
}

export default async function DiscordPage({ params }: DiscordPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <SimpleSeoPage Icon={MessageSquare} {...content[locale]} />;
}
