"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Clock3, RefreshCw } from "lucide-react";
import { ServerHudCard } from "@/components/home/ServerHudCard";
import { CopyToast } from "@/components/ui/copy-toast";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import type {
  LiveServerKey,
  LiveServersResponse,
  LiveServerStatus,
  LiveServerStatusKind,
} from "@/lib/live-server-targets";
import { publicServers } from "@/lib/servers";

const REFRESH_INTERVAL_MS = 30_000;

type ServerStatusFilter = "all" | "online" | "offline" | "pending";

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
}

function formatPing(value: number | string | null | undefined, fallback: string) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const ping = typeof value === "number" ? value : Number(value);

  return Number.isFinite(ping) ? `${ping}ms` : fallback;
}

export function ServerGrid() {
  const t = useTranslations("Servers");
  const warRoomT = useTranslations("WarRoom.servers");
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
  const [statusFilter, setStatusFilter] = useState<ServerStatusFilter>("all");

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

  const serverCards = publicServers.map((server) => {
    const liveServer = serverStatuses[server.key];
    const isPendingServer = "pending" in server && server.pending === true;
    const status: LiveServerStatusKind = isPendingServer
      ? "pending"
      : isLoading && !liveServer
        ? "loading"
        : liveServer?.status ?? "offline";
    const isOnline = status === "online";
    const displayName = t(`items.${server.key}.name`);
    const map = status === "pending"
      ? t("fallback.unavailable")
      : status === "loading"
        ? t("fallback.map")
        : liveServer?.map || t("fallback.map");
    const playersLabel = status === "pending"
      ? t("fallback.unavailable")
      : status === "loading"
        ? t("loading.value")
        : liveServer
          ? `${liveServer.players}/${liveServer.maxPlayers}`
          : t("fallback.players");
    const ping = status === "pending"
      ? t("fallback.unavailable")
      : status === "loading"
        ? t("fallback.ping")
        : formatPing(liveServer?.ping, t("fallback.ping"));
    const playerCount = status === "loading" || status === "pending" ? 0 : liveServer?.players ?? 0;
    const maxPlayers = status === "pending" ? server.fallbackMaxPlayers : liveServer?.maxPlayers ?? server.fallbackMaxPlayers;
    const pingValue = typeof liveServer?.ping === "number" && Number.isFinite(liveServer.ping)
      ? liveServer.ping
      : null;

    const statusLabel = status === "online"
      ? "LIVE"
      : status === "pending"
        ? "COMING SOON"
        : t(`status.${status}`);

    return {
      key: server.key,
      icon: server.icon,
      displayName,
      status,
      statusLabel,
      address: liveServer?.address || server.address,
      map,
      playersLabel,
      playerCount,
      maxPlayers,
      ping,
      pingValue,
      lastCheckedAt: liveServer?.checkedAt ?? null,
      connectHref: liveServer?.connectUrl || server.connectHref,
      connectable: server.connectable,
      isOnline,
      region: t(`items.${server.key}.region`),
      translatedTags: server.tags.map((tag) => t(`tags.${tag}`)),
    };
  });
  const hubLabels = locale === "ro"
    ? {
        active: "ACTIVE",
        all: "TOATE",
        avgPing: "PING MEDIU",
        filter: "STATUS FILTER",
        offline: "OFFLINE",
        online: "ONLINE",
        pending: "SOON",
        players: "JUCATORI",
      }
    : {
        active: "ACTIVE",
        all: "ALL",
        avgPing: "AVG PING",
        filter: "STATUS FILTER",
        offline: "OFFLINE",
        online: "ONLINE",
        pending: "SOON",
        players: "PLAYERS",
      };
  const filterOptions: { key: ServerStatusFilter; label: string }[] = [
    { key: "all", label: hubLabels.all },
    { key: "online", label: hubLabels.online },
    { key: "offline", label: hubLabels.offline },
    { key: "pending", label: hubLabels.pending },
  ];
  const visibleServerCards = statusFilter === "all"
    ? serverCards
    : serverCards.filter((server) => server.status === statusFilter);
  const activeServers = serverCards.filter((server) => server.status !== "pending");
  const onlineCount = serverCards.filter((server) => server.status === "online").length;
  const totalPlayers = serverCards.reduce((sum, server) => sum + server.playerCount, 0);
  const totalSlots = serverCards.reduce((sum, server) => sum + server.maxPlayers, 0);
  const pingValues = serverCards.flatMap((server) => (server.pingValue === null ? [] : [server.pingValue]));
  const averagePing = pingValues.length > 0
    ? `${Math.round(pingValues.reduce((sum, value) => sum + value, 0) / pingValues.length)}ms`
    : t("fallback.ping");
  const activeServersLabel = isLoading ? t("loading.value") : `${onlineCount}/${activeServers.length}`;
  const playersLabel = isLoading ? t("loading.value") : `${totalPlayers}/${totalSlots}`;
  const averagePingLabel = isLoading ? t("loading.value") : averagePing;

  function getFilterCount(filter: ServerStatusFilter) {
    return filter === "all"
      ? serverCards.length
      : serverCards.filter((server) => server.status === filter).length;
  }

  return (
    <section
      id="servers"
      className="neon-section cinematic-section bg-[#080909] px-4 py-20 sm:px-6 lg:px-8"
      aria-busy={isLoading || isRefreshing}
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          copy={t("heading.copy")}
          as="h1"
        />

        <div className="neon-border neon-hover neon-scanline mt-8 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
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

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="neon-border neon-hover rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-arena-cyan">{hubLabels.active}</p>
            <p className="mt-2 font-display text-3xl font-black text-white">
              {activeServersLabel}
            </p>
          </div>
          <div className="neon-border neon-hover rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-arena-cyan">{hubLabels.players}</p>
            <p className="mt-2 font-display text-3xl font-black text-white">
              {playersLabel}
            </p>
          </div>
          <div className="neon-border neon-hover rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-arena-cyan">{hubLabels.avgPing}</p>
            <p className="mt-2 font-display text-3xl font-black text-white">{averagePingLabel}</p>
          </div>
        </div>

        <div className="neon-border neon-hover mt-4 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/46">{hubLabels.filter}</p>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = statusFilter === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setStatusFilter(option.key)}
                  className={`server-status-filter-button rounded-lg border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${
                    isActive
                      ? "border-arena-cyan/70 bg-arena-cyan/12 text-arena-cyan"
                      : "border-white/12 bg-black/24 text-white/54 hover:border-arena-cyan/44 hover:text-white"
                  }`}
                  aria-pressed={isActive}
                >
                  {option.label} {getFilterCount(option.key)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="server-card-grid mt-10">
          {visibleServerCards.map((server) => (
            <ServerHudCard
              address={server.address}
              connectHref={server.connectHref}
              connectable={server.connectable}
              copied={copiedServer === server.key}
              detailsLabel={t("actions.detailsFor", { server: server.displayName })}
              displayName={server.displayName}
              icon={server.icon}
              isOnline={server.isOnline}
              key={server.key}
              labels={{
                connect: "CONNECT",
                copied: warRoomT("copied"),
                copyIp: warRoomT("copyIp"),
                details: "DETAILS",
                ip: warRoomT("labels.ip"),
                loading: t("loading.value"),
                map: warRoomT("labels.map"),
                ping: warRoomT("labels.ping"),
                players: warRoomT("labels.players"),
                planned: warRoomT("planned"),
              }}
              map={server.map}
              maxPlayers={server.maxPlayers}
              onCopy={() => void handleCopyAddress(server.key, server.address)}
              ping={server.ping}
              players={server.playerCount}
              playersLabel={server.playersLabel}
              region={server.region}
              serverKey={server.key}
              status={server.status}
              statusLabel={server.statusLabel}
              tags={server.translatedTags}
            />
          ))}
        </div>

        {visibleServerCards.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-white/58">
            {locale === "ro" ? "Nu exista servere in acest status." : "No servers in this status."}
          </p>
        ) : null}

        <CopyToast message={copyToastMessage} />
      </div>
    </section>
  );
}
