import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CommunitySection } from "@/components/sections/community-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServerGrid } from "@/components/sections/server-grid";
import { TournamentSection } from "@/components/sections/tournament-section";

export default function Home() {
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
