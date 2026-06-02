import { ArrowRight, ListChecks, Server, ShoppingCart, Trophy, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";

type HomeLinkItem = {
  copy: string;
  href: string;
  Icon: LucideIcon;
  title: string;
  tone: "cs16" | "respawn" | "cs2" | "rankings" | "shop" | "staff" | "servers";
};

const content: Record<Locale, { eyebrow: string; title: string; openLabel: string; links: readonly HomeLinkItem[] }> = {
  ro: {
    eyebrow: "Directii principale",
    title: "Intra rapid in ecosistemul FREE-ARENA",
    openLabel: "Deschide",
    links: [
      {
        href: "/server/cs16-classic",
        Icon: Server,
        title: "CS 1.6 Classic",
        tone: "cs16",
        copy: "Pagina oficiala pentru serverul clasic FREE-ARENA, cu IP, reguli, FAQ si beneficii.",
      },
      {
        href: "/server/respawn",
        Icon: Server,
        title: "Respawn",
        tone: "respawn",
        copy: "Server pentru warm-up, dueluri rapide, progres si activitate zilnica.",
      },
      {
        href: "/server/cs2",
        Icon: Server,
        title: "CS2",
        tone: "cs2",
        copy: "Directia moderna FREE-ARENA pentru jucatori competitivi si comunitate activa.",
      },
      {
        href: "/rankings",
        Icon: Trophy,
        title: "Clasament",
        tone: "rankings",
        copy: "Top jucatori, kill-uri, headshot-uri, timp jucat si activitate pe servere.",
      },
      {
        href: "/shop",
        Icon: ShoppingCart,
        title: "Shop VIP",
        tone: "shop",
        copy: "Pachete VIP si activare manuala prin forum, Discord sau contact direct.",
      },
      {
        href: "/join-staff",
        Icon: UserPlus,
        title: "Aplica staff",
        tone: "staff",
        copy: "Pagina pentru jucatorii maturi care vor sa ajute comunitatea FREE-ARENA.",
      },
      {
        href: "/servers",
        Icon: ListChecks,
        title: "Toate serverele",
        tone: "servers",
        copy: "Hub-ul cu status live, IP-uri de conectare si serverele active FREE-ARENA.",
      },
    ],
  },
  en: {
    eyebrow: "Main paths",
    title: "Enter the FREE-ARENA ecosystem",
    openLabel: "Open path",
    links: [
      {
        href: "/server/cs16-classic",
        Icon: Server,
        title: "CS 1.6 Classic",
        tone: "cs16",
        copy: "Canonical page for the classic FREE-ARENA server with IP, rules, FAQ, and benefits.",
      },
      {
        href: "/server/respawn",
        Icon: Server,
        title: "Respawn",
        tone: "respawn",
        copy: "Warm-up server for fast duels, progress, and daily activity.",
      },
      {
        href: "/server/cs2",
        Icon: Server,
        title: "CS2",
        tone: "cs2",
        copy: "The modern FREE-ARENA direction for competitive players and active community play.",
      },
      {
        href: "/rankings",
        Icon: Trophy,
        title: "Rankings",
        tone: "rankings",
        copy: "Top players, kills, headshots, played time, and server activity.",
      },
      {
        href: "/shop",
        Icon: ShoppingCart,
        title: "VIP Shop",
        tone: "shop",
        copy: "VIP packages and manual activation through forum, Discord, or direct contact.",
      },
      {
        href: "/join-staff",
        Icon: UserPlus,
        title: "Join staff",
        tone: "staff",
        copy: "Page for mature players who want to help the FREE-ARENA community.",
      },
      {
        href: "/servers",
        Icon: ListChecks,
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
          {page.links.map(({ Icon, copy, href, title, tone }, index) => (
            <TrackedLink
              key={href}
              href={href}
              eventName={href === "/shop" ? "click_shop_vip" : href === "/join-staff" ? "click_apply_staff" : "click_server_details"}
              eventPayload={{ location: "homepage_internal_links", target: href }}
              className={`home-link-card home-link-card--${tone} neon-hover group flex h-full flex-col p-5 transition`}
            >
              <span className="home-link-card__backdrop" aria-hidden="true" />
              <span className="home-link-card__scanline" aria-hidden="true" />
              <span className="home-link-card__shine" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="home-link-card__icon grid size-11 shrink-0 place-items-center">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="home-link-card__badge">
                    FA-{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="home-link-card__title mt-6 font-display text-xl font-black uppercase text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/64">
                  {copy}
                </p>
                <span className="mt-auto flex items-center justify-between pt-6 text-xs font-black uppercase tracking-[0.16em] text-white/46">
                  {page.openLabel}
                  <ArrowRight size={18} className="home-link-card__arrow shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
