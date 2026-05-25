import { setRequestLocale } from "next-intl/server";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { CommunityPanel } from "@/components/home/CommunityPanel";
import { HeroWarRoom } from "@/components/home/HeroWarRoom";
import { NewsPanel } from "@/components/home/NewsPanel";
import { ServerWarRoom } from "@/components/home/ServerWarRoom";
import { WarRoomCta } from "@/components/home/WarRoomCta";
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
        <HeroWarRoom />
        <ServerWarRoom />
        <CommunityPanel />
        <NewsPanel locale={locale} posts={newsPosts} />
        <WarRoomCta />
      </main>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
