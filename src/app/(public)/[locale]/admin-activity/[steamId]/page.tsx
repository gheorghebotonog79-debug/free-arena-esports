import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { PublicAdminActivityDetailPage } from "@/components/admin-activity/PublicAdminActivity";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicPageShell } from "@/components/public/PublicPagePrimitives";
import { routing } from "@/i18n/routing";
import { getPublicAdminActivityDetail } from "@/lib/admin-monitor/public-activity";
import { buildPublicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type AdminActivityDetailPageProps = {
  params: Promise<{
    locale: string;
    steamId: string;
  }>;
};

export async function generateMetadata({
  params,
}: AdminActivityDetailPageProps): Promise<Metadata> {
  const { locale, steamId } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const decodedSteamId = decodeURIComponent(steamId);
  const title = safeLocale === "ro"
    ? `Activitate admin ${decodedSteamId}`
    : `Admin activity ${decodedSteamId}`;
  const description = safeLocale === "ro"
    ? "Fișă publică de activitate admin FREE-ARENA generată din evenimente reale trimise de servere."
    : "Public FREE-ARENA admin activity profile generated from real server events.";

  return buildPublicMetadata({
    description,
    imageAlt: "FREE-ARENA Admin Activity",
    locale: safeLocale,
    path: `/admin-activity/${encodeURIComponent(decodedSteamId)}`,
    title,
  });
}

export default async function AdminActivityDetailPage({
  params,
}: AdminActivityDetailPageProps) {
  const { locale, steamId } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const detail = await getPublicAdminActivityDetail(decodeURIComponent(steamId));

  if (!detail) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <PublicPageShell>
        <PublicAdminActivityDetailPage detail={detail} locale={locale} />
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
