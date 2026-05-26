import { setRequestLocale } from "next-intl/server";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";
import { CommunitySection } from "@/components/home/CommunitySection";
import { FinalCta } from "@/components/home/FinalCta";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { NewsSection } from "@/components/home/NewsSection";
import { ServerSection } from "@/components/home/ServerSection";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TournamentSection } from "@/components/sections/tournament-section";
import { getPublishedNews } from "@/lib/public-news";
import { getPublicTournaments } from "@/lib/public-tournaments";

export const revalidate = 60;

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [newsPosts, tournaments] = await Promise.all([
    getPublishedNews(locale),
    getPublicTournaments(4),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="neon-page-shell cyber-root">
        <NeonAtmosphere />
        <HeroCinematic />
        <ServerSection />
        <CommunitySection />
        <TopPlayersSection />
        <TournamentSection locale={locale} tournaments={tournaments} />
        <NewsSection locale={locale} posts={newsPosts} />
        <FinalCta />
      </main>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
