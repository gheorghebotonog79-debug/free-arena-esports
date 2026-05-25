import { setRequestLocale } from "next-intl/server";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { CommunitySection } from "@/components/home/CommunitySection";
import { FinalCta } from "@/components/home/FinalCta";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { NewsSection } from "@/components/home/NewsSection";
import { ServerSection } from "@/components/home/ServerSection";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPublishedNews } from "@/lib/public-news";

export const revalidate = 60;

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const newsPosts = await getPublishedNews(locale);

  return (
    <>
      <SiteHeader />
      <main className="cyber-root">
        <HeroCinematic />
        <ServerSection />
        <CommunitySection />
        <TopPlayersSection />
        <NewsSection locale={locale} posts={newsPosts} />
        <FinalCta />
      </main>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
