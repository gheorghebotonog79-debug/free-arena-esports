import { ArrowRight, ListChecks, Server, ShoppingCart, Trophy, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";

type HomeLinkItem = {
  copy: string;
  href: string;
  Icon: LucideIcon;
  tag: string;
  title: string;
  tone: "cs16" | "respawn" | "cs2" | "rankings" | "shop" | "staff" | "servers";
};

const cardVariantClass: Record<HomeLinkItem["tone"], string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  rankings: "server-card--global",
  shop: "server-card--cs16",
  staff: "server-card--respawn",
  servers: "server-card--cs2",
};

const content: Record<Locale, { codeLabel: string; eyebrow: string; openLabel: string; routeLabel: string; statusLabel: string; title: string; links: readonly HomeLinkItem[] }> = {
  ro: {
    codeLabel: "Cod ruta",
    eyebrow: "Directii principale",
    openLabel: "Deschide",
    routeLabel: "FREE-ARENA",
    statusLabel: "Activ",
    title: "Intra rapid in ecosistemul FREE-ARENA",
    links: [
      {
        href: "/server/cs16-classic",
        Icon: Server,
        tag: "Server",
        title: "CS 1.6 Classic",
        tone: "cs16",
        copy: "Pagina oficiala pentru serverul clasic FREE-ARENA, cu IP, reguli, FAQ si beneficii.",
      },
      {
        href: "/server/respawn",
        Icon: Server,
        tag: "Server",
        title: "Respawn",
        tone: "respawn",
        copy: "Server pentru warm-up, dueluri rapide, progres si activitate zilnica.",
      },
      {
        href: "/server/cs2",
        Icon: Server,
        tag: "Server",
        title: "CS2",
        tone: "cs2",
        copy: "Directia moderna FREE-ARENA pentru jucatori competitivi si comunitate activa.",
      },
      {
        href: "/rankings",
        Icon: Trophy,
        tag: "Top",
        title: "Clasament",
        tone: "rankings",
        copy: "Top jucatori, kill-uri, headshot-uri, timp jucat si activitate pe servere.",
      },
      {
        href: "/shop",
        Icon: ShoppingCart,
        tag: "VIP",
        title: "Shop VIP",
        tone: "shop",
        copy: "Pachete VIP si activare manuala prin forum, Discord sau contact direct.",
      },
      {
        href: "/join-staff",
        Icon: UserPlus,
        tag: "Staff",
        title: "Aplica staff",
        tone: "staff",
        copy: "Pagina pentru jucatorii maturi care vor sa ajute comunitatea FREE-ARENA.",
      },
      {
        href: "/servers",
        Icon: ListChecks,
        tag: "Hub",
        title: "Toate serverele",
        tone: "servers",
        copy: "Hub-ul cu status live, IP-uri de conectare si serverele active FREE-ARENA.",
      },
    ],
  },
  en: {
    codeLabel: "Route code",
    eyebrow: "Main paths",
    openLabel: "Open path",
    routeLabel: "FREE-ARENA",
    statusLabel: "Active",
    title: "Enter the FREE-ARENA ecosystem",
    links: [
      {
        href: "/server/cs16-classic",
        Icon: Server,
        tag: "Server",
        title: "CS 1.6 Classic",
        tone: "cs16",
        copy: "Canonical page for the classic FREE-ARENA server with IP, rules, FAQ, and benefits.",
      },
      {
        href: "/server/respawn",
        Icon: Server,
        tag: "Server",
        title: "Respawn",
        tone: "respawn",
        copy: "Warm-up server for fast duels, progress, and daily activity.",
      },
      {
        href: "/server/cs2",
        Icon: Server,
        tag: "Server",
        title: "CS2",
        tone: "cs2",
        copy: "The modern FREE-ARENA direction for competitive players and active community play.",
      },
      {
        href: "/rankings",
        Icon: Trophy,
        tag: "Top",
        title: "Rankings",
        tone: "rankings",
        copy: "Top players, kills, headshots, played time, and server activity.",
      },
      {
        href: "/shop",
        Icon: ShoppingCart,
        tag: "VIP",
        title: "VIP Shop",
        tone: "shop",
        copy: "VIP packages and manual activation through forum, Discord, or direct contact.",
      },
      {
        href: "/join-staff",
        Icon: UserPlus,
        tag: "Staff",
        title: "Join staff",
        tone: "staff",
        copy: "Page for mature players who want to help the FREE-ARENA community.",
      },
      {
        href: "/servers",
        Icon: ListChecks,
        tag: "Hub",
        title: "All servers",
        tone: "servers",
        copy: "The live status hub with connection IPs and active FREE-ARENA servers.",
      },
    ],
  },
};

export function HomeInternalLinks({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h2 className="neon-heading mt-5 max-w-4xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
              {page.title}
            </h2>
          </div>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {page.links.map(({ Icon, copy, href, tag, title, tone }, index) => (
            <TrackedLink
              key={href}
              href={href}
              eventName={href === "/shop" ? "click_shop_vip" : href === "/join-staff" ? "click_apply_staff" : "click_server_details"}
              eventPayload={{ location: "homepage_internal_links", target: href }}
              className={`server-tactical-card neon-hover ${cardVariantClass[tone]} server-tactical-card--online home-path-card group flex h-full min-w-0 flex-col p-4 sm:p-5`}
              data-occupancy="low"
              data-status="online"
            >
              <span className="server-card__backdrop" aria-hidden="true" />
              <span className="server-card__noise" aria-hidden="true" />
              <span className="server-card__scanline" aria-hidden="true" />
              <span className="server-card__shine" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="server-card__icon grid size-16 shrink-0 place-items-center">
                    <Icon size={30} className="server-card__accent-icon" aria-hidden="true" />
                  </span>
                  <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
                    <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
                    {page.statusLabel}
                  </span>
                </div>
                <div className="mt-3 min-w-0">
                  <h3 className="server-card__title line-clamp-2 font-display text-2xl font-black uppercase leading-none text-white">
                    {title}
                  </h3>
                  <p className="server-card__region mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">
                    {page.routeLabel}
                  </p>
                </div>

                <div className="server-player-core mt-6 min-h-40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-white/50">
                      {page.codeLabel}
                    </p>
                    <p className="server-player-count font-display text-4xl font-black text-white">
                      FA-{String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="server-player-bar mt-4">
                    <span style={{ width: "100%" }} />
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-white/64">
                    {copy}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="server-tag px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
                    {tag}
                  </span>
                  <span className="server-tag px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
                    FREE-ARENA
                  </span>
                </div>

                <span className="server-details-button mt-auto inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition">
                  {page.openLabel}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
