import { setRequestLocale } from "next-intl/server";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";
import { CommunityHubSection } from "@/components/home/CommunityHubSection";
import { ContactRecruitmentSection } from "@/components/home/ContactRecruitmentSection";
import { ForumActivitySection } from "@/components/home/ForumActivitySection";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { HomeActivitySection } from "@/components/home/HomeActivitySection";
import { HomeInternalLinks } from "@/components/home/HomeInternalLinks";
import { NewsSection } from "@/components/home/NewsSection";
import { ServerSection } from "@/components/home/ServerSection";
import { StaffRecruitmentSection } from "@/components/home/StaffRecruitmentSection";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import { TrustProofSection } from "@/components/home/TrustProofSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TournamentSection } from "@/components/sections/tournament-section";
import { routing, type Locale } from "@/i18n/routing";
import { getPublishedNews } from "@/lib/public-news";
import { getPublicTournaments } from "@/lib/public-tournaments";

export const revalidate = 60;
const SHOW_TOURNAMENTS_SECTION = false;

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = routing.locales.includes(locale as Locale) ? locale as Locale : routing.defaultLocale;
  const [newsPosts, tournaments] = await Promise.all([
    getPublishedNews(locale),
    SHOW_TOURNAMENTS_SECTION ? getPublicTournaments(4) : Promise.resolve([]),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="neon-page-shell cyber-root fa-dark-flame-bg">
        <NeonAtmosphere />
        <HeroCinematic />
        <ServerSection />
        <CommunityHubSection />
        <TopPlayersSection />
        <HomeInternalLinks locale={safeLocale} />
        <StaffRecruitmentSection locale={safeLocale} />
        <ForumActivitySection locale={safeLocale} />
        <HomeActivitySection locale={safeLocale} />
        <ContactRecruitmentSection locale={safeLocale} />
        <TrustProofSection locale={safeLocale} />
        {SHOW_TOURNAMENTS_SECTION ? <TournamentSection locale={locale} tournaments={tournaments} /> : null}
        <NewsSection locale={locale} posts={newsPosts} />
      </main>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
