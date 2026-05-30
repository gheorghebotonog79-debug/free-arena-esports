import { ArrowRight, Network } from "lucide-react";
import { serverSeoPages, serverSeoSlugs } from "@/data/servers/seo-pages";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { ServerSeoPageData } from "@/lib/serverSeo";

type ServerInternalLinksProps = {
  labels: {
    discord: string;
    hub: string;
    related: string;
    servers: string;
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
    <section className="neon-section px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="premium-card glass-panel neon-hover rounded-lg p-5">
          <div className="flex items-center gap-3">
            <Network size={22} className="text-cyan-200" aria-hidden="true" />
            <h2 className="neon-title neon-text-pulse font-display text-2xl font-black uppercase text-white">
              {labels.hub}
            </h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Link href="/servers" className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-green/60 hover:bg-arena-green/10">
              {labels.servers}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/discord" className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-[#98a3ff]/60 hover:bg-[#5865f2]/10">
              {labels.discord}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/teamspeak" className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10">
              {labels.teamspeak}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="premium-card glass-panel neon-hover rounded-lg p-5">
          <h2 className="neon-title neon-text-pulse font-display text-2xl font-black uppercase text-white">
            {labels.related}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {relatedServers.map((serverPage) => (
              <Link
                key={serverPage.slug}
                href={`/server/${serverPage.slug}`}
                className="neon-border neon-hover rounded-lg border border-white/10 bg-black/28 p-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                {serverPage.hero[locale].name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
