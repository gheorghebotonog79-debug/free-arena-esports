"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Copy,
  Gamepad2,
  Info,
  RadioTower,
  RefreshCw,
  Server,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import {
  ServerDetailsModal,
  type ServerDetailsModalServer,
} from "@/components/servers/ServerDetailsModal";
import { CopyToast } from "@/components/ui/copy-toast";
import { useLocale, useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { gameServers } from "@/data/platform";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import type {
  LiveServerKey,
  LiveServersResponse,
  LiveServerStatus,
  LiveServerStatusKind,
} from "@/lib/live-server-targets";

const REFRESH_INTERVAL_MS = 30_000;

const statusClasses: Record<LiveServerStatusKind, string> = {
  loading: "bg-white/8 text-white/58 border border-white/14",
  online: "bg-arena-green/12 text-arena-green border border-arena-green/30",
  offline: "bg-arena-red/12 text-arena-red border border-arena-red/30",
  pending: "bg-arena-gold/12 text-arena-gold border border-arena-gold/30",
};

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
}

export function ServerGrid() {
  const t = useTranslations("Servers");
  const locale = useLocale();
  const isMountedRef = useRef(false);
  const isRequestingRef = useRef(false);
  const copyToastTimeoutRef = useRef<number | null>(null);
  const [serverStatuses, setServerStatuses] = useState<Partial<Record<LiveServerKey, LiveServerStatus>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [copiedServer, setCopiedServer] = useState<LiveServerKey | null>(null);
  const [copyToastMessage, setCopyToastMessage] = useState<string | null>(null);
  const [selectedServerKey, setSelectedServerKey] = useState<LiveServerKey | null>(null);

  const loadServerStatuses = useCallback(async ({ initial = false }: { initial?: boolean } = {}) => {
    if (isRequestingRef.current) {
      return;
    }

    isRequestingRef.current = true;

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

      const checkedAtDate = new Date(payload.checkedAt);

      setServerStatuses(
        Object.fromEntries(payload.servers.map((server) => [server.key, server])),
      );
      setLastUpdatedAt(Number.isNaN(checkedAtDate.getTime()) ? new Date() : checkedAtDate);
    } catch {
      if (isMountedRef.current && initial) {
        setServerStatuses({});
      }
    } finally {
      isRequestingRef.current = false;

      if (isMountedRef.current) {
        if (initial) {
          setIsLoading(false);
        } else {
          setIsRefreshing(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    void loadServerStatuses({ initial: true });
    const interval = window.setInterval(() => {
      void loadServerStatuses();
    }, REFRESH_INTERVAL_MS);

    return () => {
      isMountedRef.current = false;
      window.clearInterval(interval);
      if (copyToastTimeoutRef.current !== null) {
        window.clearTimeout(copyToastTimeoutRef.current);
      }
    };
  }, [loadServerStatuses]);

  async function handleCopyAddress(key: LiveServerKey, address: string) {
    try {
      await copyTextToClipboard(address);
      setCopiedServer(key);
      setCopyToastMessage(t("toast.serverCopied", { address }));
      window.setTimeout(() => setCopiedServer((current) => (current === key ? null : current)), 1800);
      if (copyToastTimeoutRef.current !== null) {
        window.clearTimeout(copyToastTimeoutRef.current);
      }
      copyToastTimeoutRef.current = window.setTimeout(() => {
        setCopyToastMessage(null);
        copyToastTimeoutRef.current = null;
      }, 2400);
    } catch {
      setCopiedServer(null);
      setCopyToastMessage(null);
    }
  }

  const formattedLastUpdatedAt = lastUpdatedAt
    ? new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(lastUpdatedAt)
    : t("refresh.never");

  const serverCards = gameServers.map((server): ServerDetailsModalServer & {
    icon: string;
    region: string;
  } => {
    const liveServer = serverStatuses[server.key];
    const isPendingServer = "pending" in server && server.pending === true;
    const status: LiveServerStatusKind = isPendingServer
      ? "pending"
      : isLoading && !liveServer
        ? "loading"
        : liveServer?.status ?? "offline";
    const isOnline = status === "online";
    const displayName = t(`items.${server.key}.name`);
    const serverName = liveServer?.serverName || displayName;
    const map = status === "pending"
      ? t("fallback.unavailable")
      : status === "loading"
        ? t("loading.value")
        : liveServer?.map || t("fallback.map");
    const players = status === "pending"
      ? t("fallback.unavailable")
      : status === "loading"
        ? t("loading.value")
        : liveServer
          ? `${liveServer.players}/${liveServer.maxPlayers}`
          : t("fallback.players");
    const ping = status === "pending"
      ? t("fallback.unavailable")
      : status === "loading"
        ? t("loading.value")
        : liveServer?.ping !== null && liveServer?.ping !== undefined
          ? `${liveServer.ping}ms`
          : t("fallback.ping");

    return {
      key: server.key,
      icon: server.icon,
      displayName,
      serverName,
      status,
      statusLabel: t(`status.${status}`),
      address: liveServer?.address || server.address,
      map,
      players,
      ping,
      lastCheckedAt: liveServer?.checkedAt ?? null,
      connectHref: liveServer?.connectUrl || server.connectHref,
      connectable: server.connectable,
      isOnline,
      region: t(`items.${server.key}.region`),
      translatedTags: server.tags.map((tag) => t(`tags.${tag}`)),
    };
  });
  const selectedServer = serverCards.find((server) => server.key === selectedServerKey) ?? null;

  return (
    <section
      id="servers"
      className="cinematic-section bg-[#080909] px-4 py-20 sm:px-6 lg:px-8"
      aria-busy={isLoading || isRefreshing}
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          copy={t("heading.copy")}
        />

        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white/58" aria-live="polite">
            <Clock3 size={17} className="shrink-0 text-arena-cyan" aria-hidden="true" />
            <span className="min-w-0 truncate">
              {t("refresh.lastUpdated")}{" "}
              <time dateTime={lastUpdatedAt?.toISOString()}>
                {formattedLastUpdatedAt}
              </time>
            </span>
          </div>
          <button
            type="button"
            onClick={() => void loadServerStatuses()}
            disabled={isLoading || isRefreshing}
            className="button-ghost inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-black/24 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-xl transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10 disabled:cursor-not-allowed disabled:text-white/42 sm:w-auto"
            aria-label={t("refresh.aria")}
          >
            <RefreshCw
              size={17}
              className={isLoading || isRefreshing ? "animate-spin text-arena-cyan" : "text-arena-cyan"}
              aria-hidden="true"
            />
            {isLoading || isRefreshing ? t("refresh.refreshing") : t("refresh.button")}
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serverCards.map((server, index) => {
            const isCopied = copiedServer === server.key;

            return (
              <MotionCard
                key={server.key}
                delay={index * 0.06}
                className="premium-card glass-panel relative flex h-full flex-col overflow-hidden rounded-lg p-5"
              >
                {isRefreshing ? (
                  <span
                    className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-arena-cyan/70 to-transparent opacity-80"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="animated-border grid size-14 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/30 shadow-[0_0_34px_rgba(56,213,255,0.1)]">
                      <Image
                        src={server.icon}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                      />
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="line-clamp-2 font-display text-xl font-black leading-tight text-white sm:text-2xl"
                        title={server.serverName}
                      >
                        {server.displayName}
                      </h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
                        {server.region}
                      </p>
                    </div>
                  </div>
                  <span className={`live-badge inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${server.isOnline ? "live-pulse status-active" : ""} ${statusClasses[server.status]}`}>
                    {server.isOnline ? (
                      <span className="signal-bars mr-2" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : null}
                    {server.statusLabel}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="premium-card flex min-h-28 flex-col rounded-lg bg-black/28 p-3">
                    <UsersRound size={18} className="text-arena-cyan" aria-hidden="true" />
                    <p className="mt-auto font-display text-xl font-black leading-tight text-white sm:text-2xl">{server.players}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.players")}
                    </p>
                  </div>
                  <div className="premium-card flex min-h-28 min-w-0 flex-col rounded-lg bg-black/28 p-3">
                    <Gamepad2 size={18} className="text-arena-green" aria-hidden="true" />
                    <p
                      className="mt-auto line-clamp-2 text-sm font-black uppercase leading-tight text-white sm:text-base"
                      title={server.map}
                    >
                      {server.map}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.map")}
                    </p>
                  </div>
                  <div className="premium-card flex min-h-28 flex-col rounded-lg bg-black/28 p-3">
                    <RadioTower size={18} className="text-arena-red" aria-hidden="true" />
                    <p className="mt-auto font-display text-xl font-black leading-tight text-white sm:text-2xl">{server.ping}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.ping")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {server.translatedTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-bold text-white/62 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white/64">
                      <Server size={17} className="text-white/42" aria-hidden="true" />
                      <span className="truncate">{server.address}</span>
                    </div>
                    <ShieldCheck
                      size={20}
                      className={`shrink-0 ${server.isOnline ? "text-arena-green" : "text-white/28"}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => void handleCopyAddress(server.key, server.address)}
                      className="button-ghost inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-xl transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
                      aria-label={t("actions.copyIpFor", {
                        server: server.displayName,
                      })}
                    >
                      {isCopied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                      {isCopied ? t("actions.copied") : t("actions.copyIp")}
                    </button>

                    {server.connectable && server.isOnline ? (
                      <a
                        href={server.connectHref}
                        className="button-glow inline-flex w-full items-center justify-center gap-2 rounded-lg bg-arena-green px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                        aria-label={t("actions.connectTo", {
                          server: server.displayName,
                        })}
                      >
                        {t("actions.connect")}
                        <ArrowRight size={17} aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-white/12 bg-white/[0.045] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white/42"
                      >
                        {server.status === "loading"
                          ? t("actions.loading")
                          : server.status === "pending"
                            ? t("actions.pending")
                            : t("actions.offline")}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedServerKey(server.key)}
                      className="button-ghost inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.045] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-xl transition hover:border-arena-green/60 hover:bg-arena-green/10 sm:col-span-2"
                      aria-label={t("actions.detailsFor", {
                        server: server.displayName,
                      })}
                    >
                      <Info size={17} aria-hidden="true" />
                      {t("actions.details")}
                    </button>
                  </div>
                </div>
              </MotionCard>
            );
          })}
        </div>

        <ServerDetailsModal
          server={selectedServer}
          isCopied={selectedServer ? copiedServer === selectedServer.key : false}
          isRefreshing={isLoading || isRefreshing}
          onClose={() => setSelectedServerKey(null)}
          onCopy={handleCopyAddress}
        />
        <CopyToast message={copyToastMessage} />
      </div>
    </section>
  );
}
