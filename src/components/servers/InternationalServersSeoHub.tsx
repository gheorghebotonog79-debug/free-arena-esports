import type { LucideIcon } from "lucide-react";
import { ArrowRight, CircleHelp, Globe2, Search } from "lucide-react";
import { TacticalCardChrome } from "@/components/public/PublicPagePrimitives";
import { Link } from "@/i18n/navigation";

type HubCard = {
  copy: string;
  href: string;
  label: string;
  tone: "cs16" | "cs2" | "global" | "respawn";
  title: string;
};

export const internationalServersHubFaq = [
  {
    question: "Is FREE-ARENA open to EU players?",
    answer:
      "Yes. FREE-ARENA is rooted in Romania, but the English pages, Discord, TeamSpeak and server hubs are built to welcome EU and international players.",
  },
  {
    question: "Which Counter-Strike servers can I join?",
    answer:
      "FREE-ARENA links CS2, CS 1.6 Classic and Respawn pages with direct IPs, live status, rankings and support channels.",
  },
  {
    question: "Where do English-speaking players get support?",
    answer:
      "Use the FREE-ARENA Discord, TeamSpeak or forum. The English routes keep the main server, support and community links visible.",
  },
  {
    question: "Is the community only for Romanian players?",
    answer:
      "No. Romanian players are the core community, but international players are welcome if they follow the rules and respect fair play.",
  },
] as const;

const serverCards: readonly HubCard[] = [
  {
    title: "Counter-Strike Europe",
    label: "EU hub",
    href: "/counter-strike-servers-europe",
    tone: "global",
    copy:
      "The international entry point for EU players looking for CS2 servers, CS 1.6 servers, Respawn practice and English-friendly community paths.",
  },
  {
    title: "CS2 servers Europe",
    label: "Counter-Strike 2",
    href: "/cs2-servers",
    tone: "cs2",
    copy:
      "A focused path for Counter-Strike 2 players who want direct IP, support, Discord, TeamSpeak and FREE-ARENA server context.",
  },
  {
    title: "CS 1.6 servers Europe",
    label: "Classic + Respawn",
    href: "/cs-1-6-servers",
    tone: "cs16",
    copy:
      "Classic Counter-Strike rounds and Respawn practice for players who still want readable CS 1.6 action and a real community.",
  },
  {
    title: "Respawn server",
    label: "Warm-up",
    href: "/respawn-server",
    tone: "respawn",
    copy:
      "Fast Counter-Strike practice for warm-up, aim, frequent duels and short sessions before competitive games.",
  },
];

const ecosystemLinks: readonly HubCard[] = [
  {
    title: "Rankings",
    href: "/rankings",
    label: "Progress",
    tone: "global",
    copy: "Follow active players, progress, XP and server activity.",
  },
  {
    title: "Discord",
    href: "/discord",
    label: "Community",
    tone: "cs2",
    copy: "Announcements, community chat, reports and fast support.",
  },
  {
    title: "TeamSpeak",
    href: "/teamspeak",
    label: "Voice",
    tone: "respawn",
    copy: "Voice server for mixes, public rooms, staff support and team sessions.",
  },
  {
    title: "All servers",
    href: "/servers",
    label: "Live status",
    tone: "cs16",
    copy: "Live status, maps, players and connection IPs in one hub.",
  },
];

export function InternationalServersSeoHub() {
  return (
    <section className="bg-[#080909] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/44"
        >
          <Link href="/" className="transition hover:text-cyan-200">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-cyan-200">Servers</span>
        </nav>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              Europe server hub
            </p>
            <h2 className="mt-5 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              FREE-ARENA for EU Counter-Strike players
            </h2>
          </div>

          <article className="premium-card glass-panel server-tactical-card server-card--global server-tactical-card--online min-h-0 rounded-lg p-5 sm:p-6" data-occupancy="low" data-status="online">
            <TacticalCardChrome />
            <div className="grid gap-5 text-sm font-semibold leading-7 text-white/66">
              <p>
                FREE-ARENA is based in Romania, but the English server hub is built for EU players who search for
                Counter-Strike servers Europe, CS2 servers Europe, CS 1.6 servers and Respawn practice.
              </p>
              <p>
                This section connects the live server grid with dedicated English pages, direct IPs, Discord,
                TeamSpeak, rankings and support routes so international players can understand the community quickly.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/counter-strike-servers-europe"
                className="button-glow inline-flex items-center justify-center gap-2 rounded-lg bg-arena-cyan px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                Europe hub
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/discord"
                className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                Join Discord
              </Link>
              <Link
                href="/teamspeak"
                className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                TeamSpeak
              </Link>
            </div>
          </article>
        </div>

        <HubGrid
          Icon={Search}
          copy="These English pages target real player intent without creating thin parallel routes."
          items={serverCards}
          title="Popular international searches"
        />

        <HubGrid
          Icon={Globe2}
          copy="International players need quick paths to activity, voice, support and player progress."
          items={ecosystemLinks}
          title="Community routes"
        />

        <div id="servers-faq" className="mt-14">
          <div className="flex max-w-4xl items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-arena-gold/30 bg-arena-gold/12 text-arena-gold">
              <CircleHelp size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                FAQ for international players
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                Short answers for EU players discovering FREE-ARENA through Google, Discord or server pages.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {internationalServersHubFaq.map((item) => (
              <article key={item.question} className="premium-card glass-panel server-tactical-card server-card--global server-tactical-card--online min-h-72 rounded-lg p-5" data-occupancy="low" data-status="online">
                <TacticalCardChrome />
                <h3 className="font-display text-xl font-black uppercase text-white">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HubGrid({
  copy,
  Icon,
  items,
  title,
}: {
  copy: string;
  Icon: LucideIcon;
  items: readonly HubCard[];
  title: string;
}) {
  return (
    <div className="mt-14">
      <div className="flex max-w-4xl items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white">
            {title}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
            {copy}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`premium-card glass-panel group server-tactical-card server-card--${item.tone} server-tactical-card--online h-full min-h-80 rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10`}
            data-occupancy={item.tone === "global" ? "idle" : "low"}
            data-status="online"
          >
            <TacticalCardChrome />
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
              {item.label}
            </p>
            <div className="mt-3 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-black uppercase text-white">
                {item.title}
              </h3>
              <ArrowRight size={18} className="shrink-0 text-cyan-200 transition group-hover:translate-x-1" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
              {item.copy}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
