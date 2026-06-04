import { setRequestLocale } from "next-intl/server";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";
import { CommunityHubSection } from "@/components/home/CommunityHubSection";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { RecruitmentTerminalSection } from "@/components/home/RecruitmentTerminalSection";
import { ServerSection } from "@/components/home/ServerSection";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import { VipPreviewSection } from "@/components/home/VipPreviewSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const revalidate = 60;

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main className="neon-page-shell cyber-root fa-dark-flame-bg">
        <NeonAtmosphere />
        <HeroCinematic />
        <ServerSection />
        <CommunityHubSection />
        <RecruitmentTerminalSection />
        <TopPlayersSection />
        <VipPreviewSection />
      </main>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
