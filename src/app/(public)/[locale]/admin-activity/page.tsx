import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { PublicAdminActivityHub } from "@/components/admin-activity/PublicAdminActivity";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicPageShell } from "@/components/public/PublicPagePrimitives";
import { routing } from "@/i18n/routing";
import { getPublicAdminActivityList } from "@/lib/admin-monitor/public-activity";
import { buildPublicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type AdminActivityPageProps = {
  params: Promise<{ locale: string }>;
};

const metadataContent = {
  ro: {
    description:
      "Vezi activitatea adminilor FREE-ARENA generată automat din evenimentele serverelor: minute online, acțiuni, recrutări și puncte.",
    title: "Admin Activity FREE-ARENA | Activitate admini",
  },
  en: {
    description:
      "View FREE-ARENA admin activity generated automatically from server events: online minutes, actions, recruits and points.",
    title: "FREE-ARENA Admin Activity | Staff monitor",
  },
} as const;

export async function generateMetadata({ params }: AdminActivityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const content = metadataContent[safeLocale];

  return buildPublicMetadata({
    description: content.description,
    imageAlt: "FREE-ARENA Admin Activity",
    locale: safeLocale,
    path: "/admin-activity",
    title: content.title,
  });
}

export default async function AdminActivityPage({ params }: AdminActivityPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const activity = await getPublicAdminActivityList();

  return (
    <>
      <SiteHeader />
      <PublicPageShell>
        <PublicAdminActivityHub
          admins={activity.admins}
          locale={locale}
          month={activity.month}
          totals={activity.totals}
        />
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
