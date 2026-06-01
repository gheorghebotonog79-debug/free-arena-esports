"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock3,
  Copy,
  Gamepad2,
  Headphones,
  Map,
  MessageSquare,
  RadioTower,
  RefreshCw,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CopyToast } from "@/components/ui/copy-toast";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServerStats, type ServerStatItem } from "@/components/server/ServerStats";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import type { LiveServerStatus, LiveServersResponse, LiveServerStatusKind } from "@/lib/live-server-targets";
import type { PublicServerConfig } from "@/lib/servers";

const REFRESH_INTERVAL_MS = 30_000;

const statusClasses: Record<LiveServerStatusKind, string> = {
  loading: "bg-white/8 text-white/58 border border-white/14",
  online: "bg-arena-green/12 text-arena-green border border-arena-green/30",
  offline: "bg-arena-red/12 text-arena-red border border-arena-red/30",
  pending: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
};

type ServerDetailPageProps = {
  server: PublicServerConfig;
};

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
}

function readStringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function formatLastUpdated(value: string | null, locale: string, fallback: string) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatPing(value: number | string | null | undefined, fallback: string) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const ping = typeof value === "number" ? value : Number(value);

  return Number.isFinite(ping) ? `${ping}ms` : fallback;
}

export function ServerDetailPage({ server }: ServerDetailPageProps) {
  const t = useTranslations("ServerDetail");
  const serverT = useTranslations("Servers");
  const locale = useLocale();
  const isMountedRef = useRef(false);
  const copyToastTimeoutRef = useRef<number | null>(null);
  const [liveServer, setLiveServer] = useState<LiveServerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(!server.pending);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyToastMessage, setCopyToastMessage] = useState<string | null>(null);

  const loadServer = useCallback(async ({ initial = false }: { initial?: boolean } = {}) => {
    if (server.pending) {
      setIsLoading(false);
      setLiveServer(null);
      return;
    }

    if (initial) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const response = await fetch("/api/servers", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Server status request failed");
      }

      const payload: unknown = await response.json();

      if (!isMountedRef.current || !isLiveServersResponse(payload)) {
        return;
      }

      setLiveServer(payload.servers.find((item) => item.key === server.key) ?? null);
      setHasError(false);
    } catch {
      if (isMountedRef.current) {
        setHasError(true);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, [server.key, server.pending]);

  useEffect(() => {
    isMountedRef.current = true;
    void loadServer({ initial: true });
    const interval = window.setInterval(() => {
      void loadServer();
    }, REFRESH_INTERVAL_MS);

    return () => {
      isMountedRef.current = false;
      window.clearInterval(interval);
      if (copyToastTimeoutRef.current !== null) {
        window.clearTimeout(copyToastTimeoutRef.current);
      }
    };
  }, [loadServer]);

  async function handleCopyAddress() {
    try {
      trackEvent("click_copy_ip", { location: "legacy_server_page", server: server.key });
      await copyTextToClipboard(server.address);
      setCopied(true);
      setCopyToastMessage(t("toast.copied", { address: server.address }));
      window.setTimeout(() => setCopied(false), 1800);
      if (copyToastTimeoutRef.current !== null) {
        window.clearTimeout(copyToastTimeoutRef.current);
      }
      copyToastTimeoutRef.current = window.setTimeout(() => {
        setCopyToastMessage(null);
        copyToastTimeoutRef.current = null;
      }, 2400);
    } catch {
      setCopied(false);
      setCopyToastMessage(null);
    }
  }

  const displayName = serverT(`items.${server.key}.name`);
  const region = serverT(`items.${server.key}.region`);
  const status: LiveServerStatusKind = server.pending
    ? "pending"
    : isLoading && !liveServer
      ? "loading"
      : liveServer?.status ?? "offline";
  const isOnline = status === "online";
  const statusLabel = serverT(`status.${status}`);
  const translatedTags = server.tags.map((tag) => serverT(`tags.${tag}`));
  const description = t(`items.${server.key}.description`);
  const rules = readStringList(t.raw(`items.${server.key}.rules`));
  const vipBenefits = readStringList(t.raw(`items.${server.key}.vipBenefits`));
  const plannedFeatures = readStringList(t.raw(`items.${server.key}.plannedFeatures`));
  const lastUpdated = formatLastUpdated(liveServer?.lastUpdated ?? liveServer?.checkedAt ?? null, locale, t("states.notAvailable"));
  const stats: ServerStatItem[] = [
    {
      key: "players",
      label: t("stats.players"),
      value: isLoading && !liveServer
        ? `0/${server.fallbackMaxPlayers}`
        : liveServer
          ? `${liveServer.players}/${liveServer.maxPlayers}`
          : t("states.offlinePlayers"),
      Icon: UsersRound,
      toneClass: "text-arena-cyan",
    },
    {
      key: "map",
      label: t("stats.map"),
      value: isLoading && !liveServer ? t("states.unknown") : liveServer?.map || t("states.unknown"),
      Icon: Map,
      toneClass: "text-arena-green",
    },
    {
      key: "ping",
      label: t("stats.ping"),
      value: isLoading && !liveServer
        ? t("states.notAvailable")
        : formatPing(liveServer?.ping, t("states.notAvailable")),
      Icon: RadioTower,
      toneClass: "text-arena-red",
    },
    {
      key: "status",
      label: t("stats.status"),
      value: statusLabel,
      Icon: ShieldCheck,
      toneClass: isOnline ? "text-arena-green" : "text-arena-gold",
    },
    {
      key: "lastUpdated",
      label: t("stats.lastUpdated"),
      value: lastUpdated,
      Icon: Clock3,
      toneClass: "text-arena-cyan",
    },
  ];

  return (
    <>
      <main className="cinematic-section min-h-screen bg-arena-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href="/#servers"
            className="button-ghost inline-flex items-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
          >
            <ArrowRight size={17} className="rotate-180" aria-hidden="true" />
            {t("actions.backToServers")}
          </Link>

          <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="premium-card glass-panel animated-border rounded-lg p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-4">
                  <span className="animated-border grid size-16 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/30 shadow-[0_0_34px_rgba(56,213,255,0.1)]">
                    <Image
                      src={server.icon}
                      alt={`${displayName} icon`}
                      width={52}
                      height={52}
                      className="h-12 w-12 object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-arena-green">
                      {t("hero.eyebrow")}
                    </p>
                    <h1 className="mt-4 break-words font-display text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                      {displayName}
                    </h1>
                    <p className="mt-4 text-base font-semibold uppercase tracking-[0.16em] text-white/44">
                      {server.game} / {region}
                    </p>
                  </div>
                </div>
                <span className={`live-badge inline-flex w-fit items-center rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] ${isOnline ? "live-pulse status-active" : ""} ${statusClasses[status]}`}>
                  {isOnline ? (
                    <span className="signal-bars mr-2" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : null}
                  {statusLabel}
                </span>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-7 text-white/68">
                {description}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-black/28 p-4 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/38">
                    {t("hero.address")}
                  </p>
                  <p className="mt-2 break-all font-mono text-sm font-black text-white sm:break-normal sm:text-base">
                    {server.address}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleCopyAddress()}
                  className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
                >
                  {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                  {copied ? t("actions.copied") : t("actions.copyIp")}
                </button>
                {server.connectable && isOnline ? (
                  <a
                    href={server.connectHref}
                    className="button-glow inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-arena-green px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                    onClick={() => trackEvent("click_play_now", { location: "legacy_server_page", server: server.key })}
                  >
                    {t("actions.connect")}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="premium-card glass-panel rounded-lg p-6 sm:p-8">
              <SectionHeading
                eyebrow={t("overview.eyebrow")}
                title={server.pending ? t("pending.title") : t("overview.title")}
                copy={server.pending ? t("pending.copy") : t("overview.copy")}
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {translatedTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/64"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {hasError ? (
                <div className="mt-6 flex gap-3 rounded-lg border border-arena-red/24 bg-arena-red/10 p-4 text-sm font-semibold text-white/70">
                  <AlertTriangle size={19} className="shrink-0 text-arena-red" aria-hidden="true" />
                  <span>{t("states.error")}</span>
                </div>
              ) : null}
              {!server.pending && status === "offline" ? (
                <div className="mt-6 flex gap-3 rounded-lg border border-arena-gold/24 bg-arena-gold/10 p-4 text-sm font-semibold text-white/70">
                  <AlertTriangle size={19} className="shrink-0 text-arena-gold" aria-hidden="true" />
                  <span>{t("states.offline")}</span>
                </div>
              ) : null}
              {server.pending ? (
                <div className="mt-6 flex gap-3 rounded-lg border border-arena-gold/24 bg-arena-gold/10 p-4 text-sm font-semibold text-white/70">
                  <Clock3 size={19} className="shrink-0 text-arena-gold" aria-hidden="true" />
                  <span>{t("pending.copy")}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => void loadServer()}
                  disabled={isLoading || isRefreshing}
                  className="button-ghost mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10 disabled:cursor-not-allowed disabled:text-white/36"
                >
                  <RefreshCw size={17} className={isRefreshing ? "animate-spin text-arena-cyan" : "text-arena-cyan"} aria-hidden="true" />
                  {isRefreshing ? t("actions.refreshing") : t("actions.refresh")}
                </button>
              )}
            </div>
          </section>

          <div className="mt-10">
            <ServerStats
              title={t("stats.title")}
              pending={server.pending === true}
              pendingTitle={t("pending.title")}
              pendingCopy={t("pending.copy")}
              items={stats}
            />
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <InfoPanel
              title={t("sections.description")}
              icon={<Gamepad2 size={22} className="text-arena-cyan" aria-hidden="true" />}
            >
              <p className="text-sm leading-7 text-white/66">{description}</p>
            </InfoPanel>
            <InfoPanel
              title={t("sections.rules")}
              icon={<ShieldCheck size={22} className="text-arena-green" aria-hidden="true" />}
            >
              <BulletList items={rules} />
            </InfoPanel>
            <InfoPanel
              title={server.pending ? t("sections.planned") : t("sections.vipBenefits")}
              icon={<Trophy size={22} className="text-arena-gold" aria-hidden="true" />}
            >
              <BulletList items={server.pending ? plannedFeatures : vipBenefits} />
            </InfoPanel>
          </div>

          <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-green">
                  {t("community.eyebrow")}
                </p>
                <h2 className="mt-3 font-display text-3xl font-black uppercase text-white">
                  {t("community.title")}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                  {t("community.copy")}
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 lg:w-[34rem]">
                <a href="https://discord.gg/freearena" target="_blank" rel="noreferrer" className="button-glow inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-arena-green" onClick={() => trackEvent("click_join_discord", { location: "legacy_server_community", server: server.key })}>
                  <MessageSquare size={17} aria-hidden="true" />
                  Discord
                </a>
                <a href="ts3server://ts.free-arena.ro" className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10" onClick={() => trackEvent("click_teamspeak", { location: "legacy_server_community", server: server.key })}>
                  <Headphones size={17} aria-hidden="true" />
                  TeamSpeak
                </a>
                <a href="https://free-arena.ro" target="_blank" rel="noreferrer" className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-green/60 hover:bg-arena-green/10" onClick={() => trackEvent("click_forum", { location: "legacy_server_community", server: server.key })}>
                  <MessageSquare size={17} aria-hidden="true" />
                  Forum
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <CopyToast message={copyToastMessage} />
    </>
  );
}

function InfoPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="premium-card glass-panel h-full rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-black uppercase text-white">{title}</h2>
        {icon}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-white/66">
          <Check size={16} className="mt-1 shrink-0 text-arena-green" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
