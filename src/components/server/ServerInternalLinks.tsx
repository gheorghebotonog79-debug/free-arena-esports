import { ArrowRight, Network } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import {
  TacticalActions,
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalGrid,
  TacticalSection,
} from "@/components/public/PublicPagePrimitives";
import { serverSeoPages, serverSeoSlugs } from "@/data/servers/seo-pages";
import type { Locale } from "@/i18n/routing";
import type { ServerSeoPageData } from "@/lib/serverSeo";

type ServerInternalLinksProps = {
  labels: {
    discord: string;
    hub: string;
    related: string;
    servers: string;
    staff: string;
    teamspeak: string;
  };
  locale: Locale;
  page: ServerSeoPageData;
};

export function ServerInternalLinks({ labels, locale, page }: ServerInternalLinksProps) {
  const relatedServers = serverSeoSlugs
    .filter((slug) => slug !== page.slug)
    .map((slug) => serverSeoPages[slug]);

  return (
    <TacticalSection className="pb-16">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <TacticalCard tone="cs2" className="min-h-80">
          <TacticalCardHeader
            Icon={Network}
            badge={<TacticalBadge>HUB</TacticalBadge>}
            eyebrow="FREE-ARENA.RO"
            title={labels.hub}
          />
          <TacticalActions className="sm:grid-cols-2 lg:grid-cols-1">
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "server_internal_hub", server: page.slug, target: "servers" }} href="/servers" className="server-details-button inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition">
              {labels.servers}
              <ArrowRight size={17} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink eventName="click_join_discord" eventPayload={{ location: "server_internal_hub", server: page.slug }} href="/discord" className="server-details-button inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition">
              {labels.discord}
              <ArrowRight size={17} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink eventName="click_teamspeak" eventPayload={{ location: "server_internal_hub", server: page.slug }} href="/teamspeak" className="server-details-button inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition">
              {labels.teamspeak}
              <ArrowRight size={17} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink eventName="click_apply_staff" eventPayload={{ location: "server_internal_hub", server: page.slug }} href="/join-staff" className="server-join-button inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] transition">
              {labels.staff}
              <ArrowRight size={17} aria-hidden="true" />
            </TrackedLink>
          </TacticalActions>
        </TacticalCard>

        <TacticalCard tone="global" className="min-h-80">
          <TacticalCardHeader
            Icon={Network}
            badge={<TacticalBadge>NETWORK</TacticalBadge>}
            eyebrow="SERVER NETWORK"
            title={labels.related}
          />
          <TacticalGrid columns="three" className="mt-5">
            {relatedServers.map((serverPage) => (
              <TrackedLink
                key={serverPage.slug}
                eventName="click_server_details"
                eventPayload={{ location: "server_related_links", server: page.slug, target: serverPage.slug }}
                href={`/server/${serverPage.slug}`}
                className="server-details-button inline-flex min-h-16 items-center justify-center px-4 py-3 text-center text-sm font-black uppercase tracking-[0.12em] text-white transition"
              >
                {serverPage.hero[locale].name}
              </TrackedLink>
            ))}
          </TacticalGrid>
        </TacticalCard>
      </div>
    </TacticalSection>
  );
}
