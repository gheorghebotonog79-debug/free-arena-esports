"use client";

import Image from "next/image";
import { ArrowRight, Check, Copy, ExternalLink, Lock, Map, RadioTower, RefreshCw, UsersRound } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { CopyToast } from "@/components/ui/copy-toast";
import type { Locale } from "@/i18n/routing";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import type { LiveServerKey, LiveServersResponse, LiveServerStatus, LiveServerStatusKind } from "@/lib/live-server-targets";
import { getCanonicalServerPath } from "@/lib/server-url";
import { publicServers, type PublicServerConfig } from "@/lib/servers";

const REFRESH_MS = 30_000;
const COVER_IMAGE = "/assets/hero/free-arena-global-hero.png";

type PopularSearchLink = {
  href: string;
  label: string;
};

type SpotlightServer = {
  address: string;
  connectHref: string;
  connectable: boolean;
  coverPosition: string;
  displayName: string;
  features: string[];
  icon: string;
  key: LiveServerKey;
  map: string;
  maxPlayers: number;
  players: number;
  playersLabel: string;
  status: LiveServerStatusKind;
  statusLabel: string;
  summary: string;
};

const productCopy: Record<
  Locale,
  Record<LiveServerKey, { coverPosition: string; name: string; summary: string }>
> = {
  ro: {
    cs16: {
      coverPosition: "58% center",
      name: "CS 1.6 Classic",
      summary: "Runde clasice, IP direct și progres pentru jucătorii care vor Counter-Strike curat.",
    },
    respawn: {
      coverPosition: "64% center",
      name: "Respawn",
      summary: "Dueluri rapide, warm-up continuu și activitate zilnică pentru fraguri multe.",
    },
    cs2: {
      coverPosition: "72% center",
      name: "CS2",
      summary: "Direcția modernă FREE-ARENA pentru jucători competitivi și meciuri actuale.",
    },
    global: {
      coverPosition: "50% center",
      name: "Global",
      summary: "Slotul pregătit pentru extinderea comunității și servere conectate.",
    },
  },
  en: {
    cs16: {
      coverPosition: "58% center",
      name: "CS 1.6 Classic",
      summary: "Classic rounds, direct IP, and progress for players who want clean Counter-Strike.",
    },
    respawn: {
      coverPosition: "64% center",
      name: "Respawn",
      summary: "Fast duels, constant warm-up, and daily activity for high-frag sessions.",
    },
    cs2: {
      coverPosition: "72% center",
      name: "CS2",
      summary: "FREE-ARENA's modern direction for competitive players and current matches.",
    },
    global: {
      coverPosition: "50% center",
      name: "Global",
      summary: "The prepared slot for community expansion and connected servers.",
    },
  },
};

const sectionCopy: Record<
  Locale,
  {
    copy: string;
    eyebrow: string;
    features: string;
    mapUnavailable: string;
    pendingAddress: string;
    pendingAddressLabel: string;
    planned: string;
    title: string;
  }
> = {
  ro: {
    eyebrow: "Servere live",
    title: "SERVER NETWORK",
    copy: "Alege serverul tău și intră direct în joc.",
    features: "Funcții",
    mapUnavailable: "În verificare",
    pendingAddress: "DNS nepornit încă",
    pendingAddressLabel: "Lansare",
    planned: "Pregătit pentru lansare",
  },
  en: {
    eyebrow: "Live servers",
    title: "SERVER NETWORK",
    copy: "Choose your server and jump straight into the game.",
    features: "Features",
    mapUnavailable: "Checking",
    pendingAddress: "DNS not live yet",
    pendingAddressLabel: "Launch",
    planned: "Ready for launch",
  },
};

const popularSearchCopy: Record<
  Locale,
  {
    label: string;
    links: readonly PopularSearchLink[];
  }
> = {
  ro: {
    label: "Căutări populare",
    links: [
      { href: "/cs2-servers", label: "CS2 servers" },
      { href: "/respawn-server", label: "Respawn server" },
      { href: "/cs-1-6-servers", label: "Servere CS 1.6" },
    ],
  },
  en: {
    label: "Popular searches",
    links: [
      { href: "/cs2-servers", label: "CS2 servers" },
      { href: "/respawn-server", label: "Respawn server" },
      { href: "/cs-1-6-servers", label: "CS 1.6 servers" },
    ],
  },
};

const cardToneClass: Record<LiveServerKey, string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  global: "server-card--global",
};

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
}

function buildSpotlightServer({
  copy,
  live,
  server,
  serverT,
  statusCopy,
}: {
  copy: Record<LiveServerKey, { coverPosition: string; name: string; summary: string }>;
  live: LiveServerStatus | undefined;
  server: PublicServerConfig;
  serverT: ReturnType<typeof useTranslations>;
  statusCopy: typeof sectionCopy[Locale];
}): SpotlightServer {
  const status: LiveServerStatusKind = server.pending
    ? "pending"
    : live?.status ?? "loading";
  const isPending = status === "pending";
  const isLoading = status === "loading";
  const players = isLoading || isPending ? 0 : live?.players ?? 0;
  const maxPlayers = isLoading || isPending ? server.fallbackMaxPlayers : live?.maxPlayers ?? server.fallbackMaxPlayers;
  const statusLabel = status === "online"
    ? "LIVE"
    : status === "pending"
      ? serverT("actions.pending")
      : serverT(`status.${status}`);
  const map = isPending
    ? statusCopy.planned
    : isLoading
      ? serverT("loading.value")
      : live?.map || statusCopy.mapUnavailable;

  return {
    address: live?.address || server.address,
    connectHref: live?.connectUrl || server.connectHref,
    connectable: server.connectable,
    coverPosition: copy[server.key].coverPosition,
    displayName: copy[server.key].name,
    features: server.tags.map((tag) => serverT(`tags.${tag}`)),
    icon: server.icon,
    key: server.key,
    map,
    maxPlayers,
    players,
    playersLabel: isPending
      ? statusCopy.planned
      : isLoading
        ? serverT("loading.value")
        : `${players}/${maxPlayers}`,
    status,
    statusLabel,
    summary: copy[server.key].summary,
  };
}

export function ServerSpotlight() {
  const locale = useLocale() as Locale;
  const serverT = useTranslations("Servers");
  const toastTimeoutRef = useRef<number | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);
  const [serverStatuses, setServerStatuses] = useState<Partial<Record<LiveServerKey, LiveServerStatus>>>({});
  const [copiedServer, setCopiedServer] = useState<LiveServerKey | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadServers = useCallback(async () => {
    try {
      const response = await fetch("/api/servers", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Server spotlight status request failed");
      }

      const payload: unknown = await response.json();

      if (!isLiveServersResponse(payload)) {
        throw new Error("Unexpected server spotlight payload");
      }

      setServerStatuses(Object.fromEntries(payload.servers.map((server) => [server.key, server])));
    } catch {
      setServerStatuses({});
    }
  }, []);

  useEffect(() => {
    void loadServers();
    const interval = window.setInterval(() => {
      void loadServers();
    }, REFRESH_MS);

    return () => {
      window.clearInterval(interval);

      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }

      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, [loadServers]);

  async function handleCopy(server: SpotlightServer) {
    if (server.status === "pending") {
      return;
    }

    try {
      await copyTextToClipboard(server.address);
      setCopiedServer(server.key);
      setToastMessage(serverT("toast.serverCopied", { address: server.address }));

      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = window.setTimeout(() => {
        setCopiedServer((current) => (current === server.key ? null : current));
        copiedTimeoutRef.current = null;
      }, 1800);

      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }

      toastTimeoutRef.current = window.setTimeout(() => {
        setToastMessage(null);
        toastTimeoutRef.current = null;
      }, 2400);
    } catch {
      setCopiedServer(null);
      setToastMessage(null);
    }
  }

  const labels = sectionCopy[locale];
  const popularSearch = popularSearchCopy[locale];
  const serverCopy = productCopy[locale];
  const spotlightServers = publicServers.map((server) => (
    buildSpotlightServer({
      copy: serverCopy,
      live: serverStatuses[server.key],
      server,
      serverT,
      statusCopy: labels,
    })
  ));

  return (
    <section id="server-spotlight" className="neon-section server-spotlight-section scroll-mt-44 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-40">
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {labels.eyebrow}
            </p>
            <h2 className="neon-heading mt-4 font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-black uppercase leading-[0.9] text-white">
              {labels.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/68">
              {labels.copy}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadServers()}
            className="server-copy-button inline-flex min-h-12 w-fit items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition"
          >
            <RefreshCw size={16} aria-hidden="true" />
            {serverT("refresh.button")}
          </button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
          {spotlightServers.map((server) => (
            <SpotlightCard
              copied={copiedServer === server.key}
              featuresLabel={labels.features}
              key={server.key}
              labels={{
                connect: serverT("actions.connect"),
                copied: serverT("actions.copied"),
                copyIp: serverT("actions.copyIp"),
                details: serverT("actions.details"),
                map: serverT("labels.map"),
                pendingAddress: labels.pendingAddress,
                pendingAddressLabel: labels.pendingAddressLabel,
                players: serverT("labels.players"),
                serverIp: serverT("labels.host"),
              }}
              onCopy={() => void handleCopy(server)}
              server={server}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-cyan-300/15 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/38">
            {popularSearch.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearch.links.map((link) => (
              <TrackedLink
                className="server-tag inline-flex items-center gap-2 px-3 py-2 text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/64 transition hover:text-white"
                eventName="click_server_details"
                eventPayload={{ location: "server_spotlight_popular_searches", target: link.href }}
                href={link.href}
                key={link.href}
              >
                {link.label}
                <ArrowRight size={13} aria-hidden="true" />
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
      <CopyToast message={toastMessage} />
    </section>
  );
}

function SpotlightCard({
  copied,
  featuresLabel,
  labels,
  onCopy,
  server,
}: {
  copied: boolean;
  featuresLabel: string;
  labels: {
    connect: string;
    copied: string;
    copyIp: string;
    details: string;
    map: string;
    pendingAddress: string;
    pendingAddressLabel: string;
    players: string;
    serverIp: string;
  };
  onCopy: () => void;
  server: SpotlightServer;
}) {
  const isPending = server.status === "pending";
  const canConnect = server.connectable && server.status === "online";
  const progress = server.status === "online" && server.maxPlayers > 0
    ? Math.min(100, Math.round((server.players / server.maxPlayers) * 100))
    : 0;

  return (
    <article
      className={`server-spotlight-card server-tactical-card neon-hover ${cardToneClass[server.key]} server-tactical-card--${server.status} group flex h-full min-w-0 flex-col`}
      data-occupancy={progress >= 85 ? "high" : progress >= 45 ? "medium" : server.status === "online" ? "low" : "idle"}
      data-status={server.status}
    >
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />

      <div className="server-spotlight-cover relative min-h-48 overflow-hidden">
        <Image
          src={COVER_IMAGE}
          alt={`${server.displayName} cover`}
          fill
          sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 50vw, 100vw"
          className="server-spotlight-cover__image object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: server.coverPosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.58)_74%,rgba(0,0,0,0.86)),radial-gradient(420px_220px_at_24%_12%,rgb(var(--card-glow-rgb)/0.24),transparent_68%)]" aria-hidden="true" />
        <div className="relative z-10 flex h-full min-h-48 flex-col justify-between p-4">
          <div className="flex items-start justify-between gap-3">
            <span className="server-card__icon grid size-14 shrink-0 place-items-center">
              <Image src={server.icon} alt="" width={44} height={44} className="size-10 object-contain" aria-hidden="true" />
            </span>
            <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
              <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
              {server.statusLabel}
            </span>
          </div>
          <div>
            <p className="server-card__region text-xs font-black uppercase tracking-[0.18em]">
              FREE-ARENA.RO
            </p>
            <h3 className="server-card__title mt-2 font-display text-[clamp(1.8rem,2.35vw,2.45rem)] font-black uppercase leading-none text-white">
              {server.displayName}
            </h3>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold leading-6 text-white/66">
          {server.summary}
        </p>

        <dl className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <SpotlightMetric Icon={UsersRound} label={labels.players} value={server.playersLabel} />
          <SpotlightMetric Icon={Map} label={labels.map} value={server.map} />
        </dl>

        <div className="server-player-bar mt-3">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-4">
          <p className="mb-2.5 text-xs font-black uppercase tracking-[0.16em] text-white/38">
            {isPending ? labels.pendingAddressLabel : labels.serverIp}
          </p>
          <div className="server-ip-row flex min-w-0 items-center gap-2 px-3 py-2.5">
            <RadioTower size={16} className="server-card__accent-icon shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate font-mono text-sm font-black text-white">
              {isPending ? labels.pendingAddress : server.address}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2.5 text-xs font-black uppercase tracking-[0.16em] text-white/38">{featuresLabel}</p>
          <div className="flex flex-wrap gap-2">
            {server.features.map((feature) => (
              <span key={feature} className="server-tag px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="server-spotlight-actions mt-auto grid auto-rows-fr gap-2 pt-5 sm:grid-cols-2">
          {canConnect ? (
            <TrackedAnchor
              href={server.connectHref}
              eventName="click_play_now"
              eventPayload={{ location: "server_spotlight", server: server.key }}
              className="server-join-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              {labels.connect}
              <ExternalLink size={15} aria-hidden="true" />
            </TrackedAnchor>
          ) : (
            <span className="server-disabled-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white/42">
              <Lock size={15} aria-hidden="true" />
              {server.statusLabel}
            </span>
          )}
          {isPending ? (
            <span className="server-disabled-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white/42">
              <Lock size={15} aria-hidden="true" />
              {labels.pendingAddress}
            </span>
          ) : (
            <button
              type="button"
              onClick={onCopy}
              className="server-copy-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? labels.copied : labels.copyIp}
            </button>
          )}
          <TrackedLink
            href={getCanonicalServerPath(server.key)}
            eventName="click_server_details"
            eventPayload={{ location: "server_spotlight", server: server.key }}
            className="server-details-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition sm:col-span-2"
          >
            {labels.details}
            <ArrowRight size={15} aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}

function SpotlightMetric({
  Icon,
  label,
  value,
}: {
  Icon: typeof UsersRound;
  label: string;
  value: string;
}) {
  return (
    <div className="server-metric min-w-0 p-2.5">
      <dt className="flex items-center gap-2 text-[0.64rem] font-black uppercase tracking-[0.14em] text-white/34">
        <Icon size={15} className="server-card__accent-icon" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1.5 truncate text-sm font-black uppercase text-white">{value}</dd>
    </div>
  );
}
