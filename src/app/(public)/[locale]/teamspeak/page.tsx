import type { Metadata } from "next";
import { Headphones } from "lucide-react";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SimpleSeoPage } from "@/components/seo/simple-seo-page";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata } from "@/lib/seo";

type TeamSpeakPageProps = {
  params: Promise<{ locale: string }>;
};

const content: Record<
  Locale,
  {
    action: { href: string; label: string };
    description: string;
    eyebrow: string;
    highlights: readonly string[];
    metadataDescription: string;
    metadataTitle: string;
    title: string;
  }
> = {
  ro: {
    metadataTitle: "FREE-ARENA TeamSpeak | Voice pentru CS 1.6 si CS2",
    metadataDescription:
      "Conecteaza-te pe TeamSpeak FREE-ARENA pentru voice, suport si comunitatea CS 1.6 si CS2 din Romania.",
    eyebrow: "Voice server",
    title: "TeamSpeak FREE-ARENA",
    description:
      "TeamSpeak-ul FREE-ARENA este zona de voice pentru jucatori, admini si comunitatea CS 1.6 / CS2.",
    highlights: [
      "Adresa publica: ts.free-arena.ro",
      "Canale pentru CS 1.6, CS2, suport admin si comunitate.",
      "Parte din comunitatea FREE-ARENA Romania alaturi de servere si Discord.",
    ],
    action: {
      href: "ts3server://ts.free-arena.ro",
      label: "Conectare TeamSpeak",
    },
  },
  en: {
    metadataTitle: "FREE-ARENA TeamSpeak | Voice server for CS 1.6 and CS2",
    metadataDescription:
      "Connect to FREE-ARENA TeamSpeak for voice, support and the CS 1.6 and CS2 gaming community.",
    eyebrow: "Voice server",
    title: "FREE-ARENA TeamSpeak",
    description:
      "FREE-ARENA TeamSpeak is the voice hub for players, admins and the CS 1.6 / CS2 community.",
    highlights: [
      "Public address: ts.free-arena.ro",
      "Channels for CS 1.6, CS2, admin support and community voice.",
      "Part of the FREE-ARENA community together with live servers and Discord.",
    ],
    action: {
      href: "ts3server://ts.free-arena.ro",
      label: "Connect TeamSpeak",
    },
  },
};

export async function generateMetadata({ params }: TeamSpeakPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const page = content[safeLocale];

  return buildPublicMetadata({
    description: page.metadataDescription,
    imageAlt: "FREE-ARENA TeamSpeak",
    locale: safeLocale,
    path: "/teamspeak",
    title: page.metadataTitle,
  });
}

export default async function TeamSpeakPage({ params }: TeamSpeakPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <SimpleSeoPage Icon={Headphones} {...content[locale]} />;
}
