import Image from "next/image";
import { ArrowRight, Headphones, MessageSquare } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ServerSeoPageData } from "@/lib/serverSeo";
import type { PublicServerConfig } from "@/lib/servers";
import type { Locale } from "@/i18n/routing";

type ServerSeoHeroProps = {
  labels: {
    address: string;
    discord: string;
    joinServer: string;
    server: string;
    teamspeak: string;
  };
  locale: Locale;
  page: ServerSeoPageData;
  server: PublicServerConfig;
};

export function ServerSeoHero({ labels, locale, page, server }: ServerSeoHeroProps) {
  const hero = page.hero[locale];
  const joinClassName = "button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white";

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="min-w-0">
          <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
            {hero.eyebrow}
          </p>
          <h1 className="neon-heading mt-6 max-w-5xl break-words font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.84] text-white">
            FREE-ARENA {hero.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/66 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {server.connectable && server.connectHref ? (
              <a href={server.connectHref} className={joinClassName}>
                {labels.joinServer}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            ) : (
              <Link href="/servers" className={joinClassName}>
                {labels.joinServer}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
            <Link
              href="/discord"
              className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-[#98a3ff]/60 hover:bg-[#5865f2]/10"
            >
              <MessageSquare size={18} aria-hidden="true" />
              {labels.discord}
            </Link>
            <Link
              href="/teamspeak"
              className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
            >
              <Headphones size={18} aria-hidden="true" />
              {labels.teamspeak}
            </Link>
          </div>
        </div>

        <aside className="premium-card glass-panel animated-border rounded-lg p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-20 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-black/32">
              <Image
                src={server.icon}
                alt={`FREE-ARENA ${hero.name} server icon`}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
                priority
              />
            </span>
            <span className="rounded-lg border border-arena-green/30 bg-arena-green/12 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-arena-green">
              {hero.statusLabel}
            </span>
          </div>
          <div className="mt-8 grid gap-3">
            <div className="rounded-lg border border-white/10 bg-black/28 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                {labels.server}
              </p>
              <p className="mt-2 break-words font-display text-3xl font-black uppercase text-white">
                {hero.name}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/28 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                {labels.address}
              </p>
              <p className="mt-2 break-all font-mono text-sm font-black text-white sm:break-normal">
                {server.address}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
