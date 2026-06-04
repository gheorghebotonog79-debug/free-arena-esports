import { setRequestLocale } from "next-intl/server";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { CommunityHubSection } from "@/components/home/CommunityHubSection";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { RecruitmentTerminalSection } from "@/components/home/RecruitmentTerminalSection";
import { ServerSection } from "@/components/home/ServerSection";
import { StaffRecruitmentSection } from "@/components/home/StaffRecruitmentSection";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import { VipPreviewSection } from "@/components/home/VipPreviewSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicPageShell } from "@/components/public/PublicPagePrimitives";

export const revalidate = 60;

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = locale === "en" ? "en" : "ro";

  return (
    <>
      <SiteHeader />
      <PublicPageShell>
        <HeroCinematic />
        <StaffRecruitmentSection locale={activeLocale} />
        <ServerSection />
        <CommunityHubSection />
        <RecruitmentTerminalSection />
        <TopPlayersSection />
        <VipPreviewSection />
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
