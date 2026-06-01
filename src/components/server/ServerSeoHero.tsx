"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Headphones, Map, MessageSquare, RadioTower, ShieldCheck, UserPlus, UsersRound, type LucideIcon } from "lucide-react";
import { CopyToast } from "@/components/ui/copy-toast";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import { trackEvent } from "@/lib/analytics";
import type { LiveServerStatus, LiveServersResponse, LiveServerStatusKind } from "@/lib/live-server-targets";
import type { ServerSeoPageData } from "@/lib/serverSeo";
import type { PublicServerConfig } from "@/lib/servers";

const REFRESH_MS = 30_000;

type ServerSeoHeroProps = {
  labels: {
    address: string;
    checking: string;
    copied: string;
    copyIp: string;
    discord: string;
    joinServer: string;
    map: string;
    monitored: string;
    players: string;
    server: string;
    staff: string;
    status: string;
    teamspeak: string;
  };
  locale: Locale;
  page: ServerSeoPageData;
  server: PublicServerConfig;
};

const statusClasses: Record<LiveServerStatusKind, string> = {
  loading: "border-white/14 bg-white/[0.055] text-white/70",
  online: "border-arena-green/34 bg-arena-green/12 text-arena-green",
  offline: "border-arena-red/34 bg-arena-red/12 text-arena-red",
  pending: "border-arena-gold/34 bg-arena-gold/12 text-arena-gold",
};

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
}

function formatPing(value: number | null | undefined, fallback: string) {
  return typeof value === "number" && Number.isFinite(value) ? `${value}ms` : fallback;
}

export function ServerSeoHero({ labels, locale, page, server }: ServerSeoHeroProps) {
  const hero = page.hero[locale];
  const copyToastTimeoutRef = useRef<number | null>(null);
  const [liveServer, setLiveServer] = useState<LiveServerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(!server.pending);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadServer = useCallback(async () => {
    if (server.pending) {
      setIsLoading(false);
      setLiveServer(null);
      return;
    }

    try {
      const response = await fetch("/api/servers", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Server status request failed");
      }

      const payload: unknown = await response.json();

      if (!isLiveServersResponse(payload)) {
        throw new Error("Unexpected server payload");
      }

      setLiveServer(payload.servers.find((item) => item.key === server.key) ?? null);
    } catch {
      setLiveServer(null);
    } finally {
      setIsLoading(false);
    }
  }, [server.key, server.pending]);

  useEffect(() => {
    void loadServer();
    const interval = window.setInterval(() => {
      void loadServer();
    }, REFRESH_MS);

    return () => {
      window.clearInterval(interval);
      if (copyToastTimeoutRef.current !== null) {
        window.clearTimeout(copyToastTimeoutRef.current);
      }
    };
  }, [loadServer]);

  async function handleCopyAddress() {
    try {
      trackEvent("click_copy_ip", { location: "server_seo_hero", server: server.key });
      await copyTextToClipboard(server.address);
      setCopied(true);
      setToastMessage(`${labels.copied}: ${server.address}`);
      window.setTimeout(() => setCopied(false), 1800);

      if (copyToastTimeoutRef.current !== null) {
        window.clearTimeout(copyToastTimeoutRef.current);
      }

      copyToastTimeoutRef.current = window.setTimeout(() => {
        setToastMessage(null);
        copyToastTimeoutRef.current = null;
      }, 2400);
    } catch {
      setCopied(false);
      setToastMessage(null);
    }
  }

  const status: LiveServerStatusKind = server.pending
    ? "pending"
    : isLoading && !liveServer
      ? "loading"
      : liveServer?.status ?? "offline";
  const statusLabel = status === "loading"
    ? labels.checking
    : status === "pending"
      ? hero.statusLabel
      : status === "online"
        ? "Online"
        : "Offline";
  const players = status === "loading" || status === "pending" ? 0 : liveServer?.players ?? 0;
  const maxPlayers = status === "pending" ? server.fallbackMaxPlayers : liveServer?.maxPlayers ?? server.fallbackMaxPlayers;
  const map = status === "loading" || status === "pending" ? labels.checking : liveServer?.map || labels.checking;
  const ping = status === "pending" ? labels.monitored : formatPing(liveServer?.ping, labels.monitored);
  const canConnect = server.connectable && Boolean(server.connectHref);

  return (
    <>
      <section className="neon-section relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_22%_20%,rgba(0,229,255,0.16),transparent_52%),radial-gradient(circle_at_78%_0%,rgba(255,0,51,0.12),transparent_48%)]" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,0.78fr)] lg:items-stretch">
          <div className="premium-card glass-panel animated-border rounded-lg p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
                  {hero.eyebrow}
                </p>
                <h1 className="neon-heading neon-title neon-text-pulse mt-6 max-w-5xl break-words font-display text-[clamp(2.7rem,6vw,5.4rem)] font-black uppercase leading-[0.86] text-white">
                  FREE-ARENA {hero.name}
                </h1>
                <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/70 sm:text-lg">
                  {hero.description}
                </p>
              </div>
              <span className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black uppercase tracking-[0.14em] ${statusClasses[status]}`}>
                <RadioTower size={15} aria-hidden="true" />
                {statusLabel}
              </span>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_13rem]">
              <div className="rounded-lg border border-cyan-300/20 bg-black/34 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                  {labels.address}
                </p>
                <p className="mt-3 break-all font-mono text-2xl font-black text-white sm:break-normal sm:text-3xl">
                  {server.address}
                </p>
              </div>

              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => void handleCopyAddress()}
                  className="button-ghost inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
                >
                  {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                  {copied ? labels.copied : labels.copyIp}
                </button>
                {canConnect ? (
                  <a
                    href={server.connectHref}
                    className="button-glow inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-arena-green px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
                    onClick={() => trackEvent("click_play_now", { location: "server_seo_hero", server: server.key })}
                  >
                    {labels.joinServer}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                ) : null}
                <Link
                  href="/discord"
                  onClick={() => trackEvent("click_join_discord", { location: "server_seo_hero", server: server.key })}
                  className="button-ghost inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#98a3ff]/35 bg-[#5865f2]/12 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-[#98a3ff]/70 hover:bg-[#5865f2]/20"
                >
                  <MessageSquare size={17} aria-hidden="true" />
                  {labels.discord}
                </Link>
                <Link
                  href="/join-staff"
                  onClick={() => trackEvent("click_apply_staff", { location: "server_seo_hero", server: server.key })}
                  className="button-ghost inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-arena-gold/60 hover:bg-arena-gold/10"
                >
                  <UserPlus size={17} aria-hidden="true" />
                  {labels.staff}
                </Link>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Metric Icon={UsersRound} label={labels.players} value={`${players}/${maxPlayers}`} />
              <Metric Icon={Map} label={labels.map} value={map} />
              <Metric Icon={RadioTower} label="Ping" value={ping} />
              <Metric Icon={ShieldCheck} label={labels.status} value={statusLabel} />
            </div>
          </div>

          <aside className="premium-card glass-panel neon-hover rounded-lg p-5 sm:p-6">
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
              <span className="rounded-lg border border-white/14 bg-white/[0.055] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/70">
                {server.game}
              </span>
            </div>
            <div className="mt-8 grid gap-3">
              <InfoRow label={labels.server} value={hero.name} />
              <InfoRow label="Host" value={server.host} />
              <InfoRow label="Port" value={String(server.port)} />
              <div className="grid gap-2 sm:grid-cols-2">
                <Link
                  href="/teamspeak"
                  onClick={() => trackEvent("click_teamspeak", { location: "server_seo_hero", server: server.key })}
                  className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
                >
                  <Headphones size={16} aria-hidden="true" />
                  {labels.teamspeak}
                </Link>
                <Link
                  href="/servers"
                  onClick={() => trackEvent("click_server_details", { location: "server_seo_hero", target: "servers", server: server.key })}
                  className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-green/60 hover:bg-arena-green/10"
                >
                  {locale === "ro" ? "Servere" : "Servers"}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CopyToast message={toastMessage} />
    </>
  );
}

function Metric({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="server-metric min-w-0 p-3">
      <dt className="flex items-center gap-2 text-[0.66rem] font-black uppercase tracking-[0.14em] text-white/34">
        <Icon size={15} className="server-card__accent-icon" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-2 truncate text-base font-black uppercase text-white">{value}</dd>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/28 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
        {label}
      </p>
      <p className="mt-2 break-words font-display text-2xl font-black uppercase text-white">
        {value}
      </p>
    </div>
  );
}
