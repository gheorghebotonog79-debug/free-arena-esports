import { setRequestLocale } from "next-intl/server";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { CommunityHubSection } from "@/components/home/CommunityHubSection";
import { ContactRecruitmentSection } from "@/components/home/ContactRecruitmentSection";
import { ForumActivitySection } from "@/components/home/ForumActivitySection";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { RecruitmentTerminalSection } from "@/components/home/RecruitmentTerminalSection";
import { ServerSection } from "@/components/home/ServerSection";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import { TrustProofSection } from "@/components/home/TrustProofSection";
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
        <ServerSection />
        <TrustProofSection locale={activeLocale} />
        <CommunityHubSection />
        <ForumActivitySection locale={activeLocale} />
        <RecruitmentTerminalSection />
        <ContactRecruitmentSection locale={activeLocale} />
        <TopPlayersSection />
        <VipPreviewSection />
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
