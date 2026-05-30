import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RankingsPage } from "@/components/rankings/RankingsPage";
import { rankingsPageContent } from "@/data/rankings-page";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata, getLocalizedUrl, siteUrl } from "@/lib/seo";
import { queryPlayerProgress } from "@/lib/query-player-progress";
import type { PlayerProgressResponse } from "@/lib/player-progress";

export const revalidate = 60;

type RankingsRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: RankingsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const content = rankingsPageContent[safeLocale];

  return buildPublicMetadata({
    description: content.metadataDescription,
    imageAlt: content.imageAlt,
    locale: safeLocale,
    path: "/rankings",
    title: content.metadataTitle,
  });
}

export default async function RankingsRoute({ params }: RankingsRouteProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const progress = await queryPlayerProgress(15);
  const structuredData = buildRankingsStructuredData(locale, progress);

  return (
    <>
      <SiteHeader />
      <main className="neon-page-shell cyber-root bg-arena-black text-white">
        <NeonAtmosphere />
        <RankingsPage locale={locale} progress={progress} />
      </main>
      <SiteFooter />
      <LiveChatLauncher />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

function buildRankingsStructuredData(locale: Locale, progress: PlayerProgressResponse) {
  const content = rankingsPageContent[locale];
  const url = getLocalizedUrl(locale, "/rankings");
  const topPlayers = progress.players.slice(0, 5);
  const breadcrumbLabels = content.breadcrumb;
  const itemList = topPlayers.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${url}#leaderboard`,
        name: content.topPlayersTitle,
        numberOfItems: topPlayers.length,
        itemListElement: topPlayers.map((player, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: player.nick,
          item: {
            "@type": "Thing",
            name: player.nick,
          },
        })),
      }
    : null;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: content.metadataTitle,
      description: content.metadataDescription,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: "FREE-ARENA",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: breadcrumbLabels.home,
          item: getLocalizedUrl(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: breadcrumbLabels.current,
          item: url,
        },
      ],
    },
    ...(itemList ? [itemList] : []),
  ];
}
