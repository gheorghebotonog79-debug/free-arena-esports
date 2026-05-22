import { setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CommunitySection } from "@/components/sections/community-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServerGrid } from "@/components/sections/server-grid";
import { TournamentSection } from "@/components/sections/tournament-section";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServerGrid />
        <TournamentSection />
        <CommunitySection />
      </main>
      <SiteFooter />
    </>
  );
}

