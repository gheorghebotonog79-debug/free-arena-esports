import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServerGrid } from "@/components/sections/server-grid";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata } from "@/lib/seo";

export const revalidate = 60;

type ServersPageProps = {
  params: Promise<{ locale: string }>;
};

const seo: Record<Locale, { description: string; imageAlt: string; title: string }> = {
  ro: {
    title: "Servere FREE-ARENA | CS 1.6, CS2 si comunitate gaming",
    description:
      "Vezi serverele FREE-ARENA pentru CS 1.6, Respawn si CS2, cu status live, IP-uri de conectare si comunitatea FREE-ARENA Romania.",
    imageAlt: "Servere FREE-ARENA CS 1.6 si CS2",
  },
  en: {
    title: "FREE-ARENA Servers | CS 1.6, CS2 and gaming community",
    description:
      "Browse FREE-ARENA CS 1.6, Respawn and CS2 servers with live status, connection IPs and the FREE-ARENA gaming community.",
    imageAlt: "FREE-ARENA CS 1.6 and CS2 servers",
  },
};

export async function generateMetadata({ params }: ServersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  return buildPublicMetadata({
    locale: safeLocale,
    path: "/servers",
    ...seo[safeLocale],
  });
}

export default async function ServersPage({ params }: ServersPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main className="neon-page-shell cyber-root">
        <NeonAtmosphere />
        <ServerGrid />
      </main>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
