import Image from "next/image";
import { ArrowRight, ExternalLink, Gamepad2, ListChecks, RadioTower, Server, ShoppingCart, Trophy, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { publicServers, type PublicServerConfig, type PublicServerSlug } from "@/lib/servers";

type ServerHomeLinkItem = {
  actionLabel: string;
  copy: string;
  coreLabel: string;
  coreValue: string;
  detailsLabel: string;
  href: string;
  kind: "server";
  serverKey: Extract<PublicServerSlug, "cs16" | "respawn" | "cs2">;
  statusLabel: string;
  tag: string;
  tags: readonly string[];
  title: string;
  tone: HomeCardTone;
};

type ActionHomeLinkItem = {
  actionLabel: string;
  copy: string;
  coreLabel: string;
  coreValue: string;
  href: string;
  Icon: LucideIcon;
  kind: "action";
  metricLabel: string;
  metricValue: string;
  secondaryLabel: string;
  secondaryValue: string;
  statusLabel: string;
  tag: string;
  tags: readonly string[];
  title: string;
  tone: HomeCardTone;
};

type HomeLinkItem = ServerHomeLinkItem | ActionHomeLinkItem;
type HomeCardTone = "cs16" | "respawn" | "cs2" | "rankings" | "shop" | "staff" | "servers";

const cardVariantClass: Record<HomeLinkItem["tone"], string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  rankings: "server-card--global",
  shop: "server-card--cs16",
  staff: "server-card--respawn",
  servers: "server-card--cs2",
};

const serverByKey = Object.fromEntries(publicServers.map((server) => [server.key, server])) as Record<PublicServerSlug, PublicServerConfig>;

const content: Record<Locale, { eyebrow: string; ipLabel: string; regionLabel: string; title: string; links: readonly HomeLinkItem[] }> = {
  ro: {
    eyebrow: "Directii principale",
    ipLabel: "IP server",
    regionLabel: "Zona",
    title: "Intră rapid în ecosistemul FREE-ARENA",
    links: [
      {
        actionLabel: "Joacă",
        coreLabel: "Mod joc",
        coreValue: "CS 1.6",
        detailsLabel: "Detalii",
        href: "/server/cs16-classic",
        kind: "server",
        serverKey: "cs16",
        statusLabel: "LIVE",
        tag: "Server",
        tags: ["classic", "ranked", "vip"],
        title: "CS 1.6 Classic",
        tone: "cs16",
        copy: "Serverul clasic FREE-ARENA pentru runde curate, hărți cunoscute și conectare rapidă.",
      },
      {
        actionLabel: "Joacă",
        coreLabel: "Mod joc",
        coreValue: "RESPAWN",
        detailsLabel: "Detalii",
        href: "/server/respawn",
        kind: "server",
        serverKey: "respawn",
        statusLabel: "LIVE",
        tag: "Server",
        tags: ["warm-up", "ranked", "vip"],
        title: "Respawn",
        tone: "respawn",
        copy: "Warm-up rapid, dueluri continue, progres și activitate zilnică pentru jucători activi.",
      },
      {
        actionLabel: "Joacă",
        coreLabel: "Mod joc",
        coreValue: "CS2",
        detailsLabel: "Detalii",
        href: "/server/cs2",
        kind: "server",
        serverKey: "cs2",
        statusLabel: "LIVE",
        tag: "Server",
        tags: ["premier", "modern", "anti-cheat"],
        title: "CS2",
        tone: "cs2",
        copy: "Direcția modernă FREE-ARENA pentru jucători competitivi și meciuri actuale.",
      },
      {
        actionLabel: "Vezi top jucători",
        coreLabel: "Acțiune",
        coreValue: "TOP",
        href: "/rankings",
        Icon: Trophy,
        kind: "action",
        metricLabel: "Focus",
        metricValue: "XP / KILLS",
        secondaryLabel: "Status",
        secondaryValue: "Live",
        statusLabel: "LIVE",
        tag: "Top",
        tags: ["clasament", "progres"],
        title: "Clasament",
        tone: "rankings",
        copy: "Top jucători, kill-uri, headshot-uri, timp jucat și activitate pe servere.",
      },
      {
        actionLabel: "Vezi pachete",
        coreLabel: "Actiune",
        coreValue: "VIP",
        href: "/shop",
        Icon: ShoppingCart,
        kind: "action",
        metricLabel: "Pachete",
        metricValue: "Gold / Diamond",
        secondaryLabel: "Test",
        secondaryValue: "/testvip",
        statusLabel: "ACTIV",
        tag: "VIP",
        tags: ["queen", "gold", "diamond"],
        title: "Shop VIP",
        tone: "shop",
        copy: "Pachete VIP, QUEEN gratuit pentru fete, test VIP și activare prin comunitate.",
      },
      {
        actionLabel: "Aplica admin",
        coreLabel: "Actiune",
        coreValue: "STAFF",
        href: "/join-staff",
        Icon: UserPlus,
        kind: "action",
        metricLabel: "Rol",
        metricValue: "Admin",
        secondaryLabel: "Canal",
        secondaryValue: "Forum",
        statusLabel: "OPEN",
        tag: "Staff",
        tags: ["admin", "support"],
        title: "Aplica staff",
        tone: "staff",
        copy: "Pagina pentru jucatorii maturi care vor sa ajute comunitatea FREE-ARENA.",
      },
      {
        actionLabel: "Vezi serverele",
        coreLabel: "Actiune",
        coreValue: "HUB",
        href: "/servers",
        Icon: ListChecks,
        kind: "action",
        metricLabel: "Status",
        metricValue: "Live",
        secondaryLabel: "IP-uri",
        secondaryValue: "Toate",
        statusLabel: "HUB",
        tag: "Hub",
        tags: ["status", "servere"],
        title: "Toate serverele",
        tone: "servers",
        copy: "Hub-ul cu status live, IP-uri de conectare și serverele active FREE-ARENA.",
      },
    ],
  },
  en: {
    eyebrow: "Main paths",
    ipLabel: "Server IP",
    regionLabel: "Region",
    title: "Enter the FREE-ARENA ecosystem",
    links: [
      {
        actionLabel: "Play",
        coreLabel: "Game mode",
        coreValue: "CS 1.6",
        detailsLabel: "Details",
        href: "/server/cs16-classic",
        kind: "server",
        serverKey: "cs16",
        statusLabel: "LIVE",
        tag: "Server",
        tags: ["classic", "ranked", "vip"],
        title: "CS 1.6 Classic",
        tone: "cs16",
        copy: "The classic FREE-ARENA server for clean rounds, familiar maps, and quick connection.",
      },
      {
        actionLabel: "Play",
        coreLabel: "Game mode",
        coreValue: "RESPAWN",
        detailsLabel: "Details",
        href: "/server/respawn",
        kind: "server",
        serverKey: "respawn",
        statusLabel: "LIVE",
        tag: "Server",
        tags: ["warm-up", "ranked", "vip"],
        title: "Respawn",
        tone: "respawn",
        copy: "Fast warm-up, constant duels, progress, and daily activity for active players.",
      },
      {
        actionLabel: "Play",
        coreLabel: "Game mode",
        coreValue: "CS2",
        detailsLabel: "Details",
        href: "/server/cs2",
        kind: "server",
        serverKey: "cs2",
        statusLabel: "LIVE",
        tag: "Server",
        tags: ["premier", "modern", "anti-cheat"],
        title: "CS2",
        tone: "cs2",
        copy: "The modern FREE-ARENA direction for competitive players and current matches.",
      },
      {
        actionLabel: "View top players",
        coreLabel: "Action",
        coreValue: "TOP",
        href: "/rankings",
        Icon: Trophy,
        kind: "action",
        metricLabel: "Focus",
        metricValue: "XP / KILLS",
        secondaryLabel: "Status",
        secondaryValue: "Live",
        statusLabel: "LIVE",
        tag: "Top",
        tags: ["rankings", "progress"],
        title: "Rankings",
        tone: "rankings",
        copy: "Top players, kills, headshots, played time, and server activity.",
      },
      {
        actionLabel: "View packages",
        coreLabel: "Action",
        coreValue: "VIP",
        href: "/shop",
        Icon: ShoppingCart,
        kind: "action",
        metricLabel: "Packages",
        metricValue: "Gold / Diamond",
        secondaryLabel: "Test",
        secondaryValue: "/testvip",
        statusLabel: "ACTIVE",
        tag: "VIP",
        tags: ["queen", "gold", "diamond"],
        title: "VIP Shop",
        tone: "shop",
        copy: "VIP packages, free QUEEN rank for girls, test VIP, and community activation.",
      },
      {
        actionLabel: "Apply admin",
        coreLabel: "Action",
        coreValue: "STAFF",
        href: "/join-staff",
        Icon: UserPlus,
        kind: "action",
        metricLabel: "Role",
        metricValue: "Admin",
        secondaryLabel: "Channel",
        secondaryValue: "Forum",
        statusLabel: "OPEN",
        tag: "Staff",
        tags: ["admin", "support"],
        title: "Join staff",
        tone: "staff",
        copy: "Page for mature players who want to help the FREE-ARENA community.",
      },
      {
        actionLabel: "View servers",
        coreLabel: "Action",
        coreValue: "HUB",
        href: "/servers",
        Icon: ListChecks,
        kind: "action",
        metricLabel: "Status",
        metricValue: "Live",
        secondaryLabel: "IPs",
        secondaryValue: "All",
        statusLabel: "HUB",
        tag: "Hub",
        tags: ["status", "servers"],
        title: "All servers",
        tone: "servers",
        copy: "The live status hub with connection IPs and active FREE-ARENA servers.",
      },
    ],
  },
};

export function HomeInternalLinks({ locale }: { locale: Locale }) {
  const page = content[locale];
  const intro = locale === "ro"
    ? "Pentru jucători, staff și comunitate: server, top, VIP, admin sau hub complet."
    : "For players, staff, and community: server, top, VIP, admin, or the full hub.";

  return (
    <section className="fa-premium-section-tight px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h2 className="neon-heading mt-5 max-w-4xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
              {page.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
              {intro}
            </p>
          </div>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {page.links.map((item) => (
            item.kind === "server" ? (
              <ServerPathCard key={item.href} item={item} labels={page} />
            ) : (
              <ActionPathCard key={item.href} item={item} />
            )
          ))}
        </div>
      </div>
    </section>
  );
}

function ServerPathCard({
  item,
  labels,
}: {
  item: ServerHomeLinkItem;
  labels: { ipLabel: string; regionLabel: string };
}) {
  const server = serverByKey[item.serverKey];

  return (
    <article
      className={`server-tactical-card neon-hover ${cardVariantClass[item.tone]} server-tactical-card--online home-path-card group flex h-full min-w-0 flex-col p-4 sm:p-5`}
      data-occupancy="low"
      data-status="online"
    >
      <CardChrome />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="server-card__icon grid size-16 shrink-0 place-items-center">
            <Image src={server.icon} alt={`${item.title} icon`} width={52} height={52} className="size-12 object-contain" />
          </span>
          <StatusBadge label={item.statusLabel} />
        </div>

        <div className="mt-3 min-w-0">
          <h3 className="server-card__title line-clamp-2 font-display text-2xl font-black uppercase leading-none text-white">
            {item.title}
          </h3>
          <p className="server-card__region mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">
            {server.region}
          </p>
        </div>

        <div className="server-player-core mt-6 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/50">
              <Gamepad2 size={16} className="server-card__accent-icon" aria-hidden="true" />
              {item.coreLabel}
            </div>
            <p className="server-player-count font-display font-black text-white">
              {item.coreValue}
            </p>
          </div>
          <div className="server-player-bar mt-4">
            <span style={{ width: "100%" }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Metric label={labels.ipLabel} value={server.address} />
            <Metric label={labels.regionLabel} value={server.region} />
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold leading-6 text-white/64">
          {item.copy}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Tag label={item.tag} />
          {item.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="mt-auto pt-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white/38">{labels.ipLabel}</p>
          <div className="server-ip-row flex min-w-0 items-center gap-2 px-3 py-3">
            <RadioTower size={16} className="server-card__accent-icon shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate font-mono text-sm font-black text-white">{server.address}</span>
          </div>

          <div className="server-actions-grid mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <TrackedAnchor
              href={server.connectHref}
              eventName="click_play_now"
              eventPayload={{ location: "homepage_internal_links", server: item.serverKey }}
              className="server-join-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              {item.actionLabel}
              <ExternalLink size={15} aria-hidden="true" />
            </TrackedAnchor>
            <TrackedLink
              href={item.href}
              eventName="click_server_details"
              eventPayload={{ location: "homepage_internal_links", server: item.serverKey, target: item.href }}
              className="server-details-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
            >
              {item.detailsLabel}
              <ArrowRight size={15} aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionPathCard({ item }: { item: ActionHomeLinkItem }) {
  const eventName = item.href === "/shop"
    ? "click_shop_vip"
    : item.href === "/join-staff"
      ? "click_apply_staff"
      : "click_server_details";

  return (
    <article
      className={`server-tactical-card neon-hover ${cardVariantClass[item.tone]} server-tactical-card--online home-path-card home-path-card--action group flex h-full min-w-0 flex-col p-4 sm:p-5`}
      data-occupancy="low"
      data-status="online"
    >
      <CardChrome />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="server-card__icon grid size-16 shrink-0 place-items-center">
            <item.Icon size={30} className="server-card__accent-icon" aria-hidden="true" />
          </span>
          <StatusBadge label={item.statusLabel} />
        </div>

        <div className="mt-3 min-w-0">
          <h3 className="server-card__title line-clamp-2 font-display text-2xl font-black uppercase leading-none text-white">
            {item.title}
          </h3>
          <p className="server-card__region mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">
            FREE-ARENA
          </p>
        </div>

        <div className="server-player-core mt-6 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/50">
              <Server size={16} className="server-card__accent-icon" aria-hidden="true" />
              {item.coreLabel}
            </div>
            <p className="server-player-count font-display font-black text-white">
              {item.coreValue}
            </p>
          </div>
          <div className="server-player-bar mt-4">
            <span style={{ width: "100%" }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Metric label={item.metricLabel} value={item.metricValue} />
            <Metric label={item.secondaryLabel} value={item.secondaryValue} />
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold leading-6 text-white/64">
          {item.copy}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Tag label={item.tag} />
          {item.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="mt-auto pt-6">
          <TrackedLink
            href={item.href}
            eventName={eventName}
            eventPayload={{ location: "homepage_internal_links", target: item.href }}
            className="server-details-button inline-flex w-full items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
          >
            {item.actionLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}

function CardChrome() {
  return (
    <>
      <span className="server-card__backdrop" aria-hidden="true" />
      <span className="server-card__noise" aria-hidden="true" />
      <span className="server-card__scanline" aria-hidden="true" />
      <span className="server-card__shine" aria-hidden="true" />
    </>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
      <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
      {label}
    </span>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="server-tag px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
      {label}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  const isCommand = value.startsWith("/");

  return (
    <div className="server-metric min-w-0 p-2">
      <p className="text-[0.64rem] font-black uppercase tracking-[0.14em] text-white/34">{label}</p>
      <p className={`mt-1 truncate text-sm font-black text-white ${isCommand ? "" : "uppercase"}`}>{value}</p>
    </div>
  );
}
