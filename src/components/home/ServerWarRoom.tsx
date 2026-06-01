"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Clock3, Copy, ExternalLink, Gamepad2, Lock, RadioTower, RefreshCw, ShieldCheck, UsersRound, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ServerHudCard } from "@/components/home/ServerHudCard";
import { CopyToast } from "@/components/ui/copy-toast";
import { Link } from "@/i18n/navigation";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import type { LiveServerKey, LiveServersResponse, LiveServerStatus, LiveServerStatusKind } from "@/lib/live-server-targets";
import { publicServers } from "@/lib/servers";

const REFRESH_MS = 30_000;

type ServerWarRoomCard = {
  address: string;
  connectHref: string;
  connectable: boolean;
  displayName: string;
  icon: string;
  isOnline: boolean;
  key: LiveServerKey;
  lastCheckedAt: string | null;
  map: string;
  maxPlayers: number;
  ping: string;
  players: number;
  playersLabel: string;
  region: string;
  status: LiveServerStatusKind;
  statusLabel: string;
  tags: string[];
};

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

export function ServerWarRoom() {
  const t = useTranslations("WarRoom.servers");
  const serverT = useTranslations("Servers");
  const locale = useLocale();
  const toastTimeoutRef = useRef<number | null>(null);
  const [serverStatuses, setServerStatuses] = useState<Partial<Record<LiveServerKey, LiveServerStatus>>>({});
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedServer, setCopiedServer] = useState<LiveServerKey | null>(null);
  const [selectedServerKey, setSelectedServerKey] = useState<LiveServerKey | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadServers = useCallback(async ({ initial = false }: { initial?: boolean } = {}) => {
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

      if (!isLiveServersResponse(payload)) {
        throw new Error("Unexpected server payload");
      }

      setServerStatuses(Object.fromEntries(payload.servers.map((server) => [server.key, server])));
      const checkedAt = new Date(payload.checkedAt);
      setLastUpdatedAt(Number.isNaN(checkedAt.getTime()) ? new Date() : checkedAt);
    } catch {
      if (initial) {
        setServerStatuses({});
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadServers({ initial: true });
    const interval = window.setInterval(() => {
      void loadServers();
    }, REFRESH_MS);

    return () => {
      window.clearInterval(interval);
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [loadServers]);

  useEffect(() => {
    if (!selectedServerKey) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedServerKey(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedServerKey]);

  async function handleCopy(key: LiveServerKey, address: string) {
    try {
      await copyTextToClipboard(address);
      setCopiedServer(key);
      setToastMessage(serverT("toast.serverCopied", { address }));
      window.setTimeout(() => setCopiedServer((current) => (current === key ? null : current)), 1800);

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

  const formattedLastUpdatedAt = lastUpdatedAt
    ? new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(lastUpdatedAt)
    : serverT("loading.value");

  const serverCards: ServerWarRoomCard[] = publicServers.map((server) => {
    const live = serverStatuses[server.key];
    const isPending = server.pending === true;
    const status: LiveServerStatusKind = isPending
      ? "pending"
      : isLoading && !live
        ? "loading"
        : live?.status ?? "offline";
    const players = status === "loading" ? 0 : live?.players ?? 0;
    const maxPlayers = status === "loading" ? server.fallbackMaxPlayers : live?.maxPlayers ?? server.fallbackMaxPlayers;
    const playersLabel = `${players}/${maxPlayers}`;
    const map = status === "loading" ? serverT("fallback.map") : live?.map || serverT("fallback.map");
    const ping = status === "loading"
      ? serverT("fallback.ping")
      : formatPing(live?.ping, serverT("fallback.ping"));
    const statusLabel = status === "online"
      ? "LIVE"
      : status === "pending"
        ? "COMING SOON"
        : serverT(`status.${status}`);

    return {
      address: live?.address || server.address,
      connectHref: live?.connectUrl || server.connectHref,
      connectable: server.connectable,
      displayName: serverT(`items.${server.key}.name`),
      icon: server.icon,
      isOnline: status === "online",
      key: server.key,
      lastCheckedAt: live?.checkedAt ?? null,
      map,
      maxPlayers,
      ping,
      players,
      playersLabel: isPending ? serverT("fallback.unavailable") : playersLabel,
      region: serverT(`items.${server.key}.region`),
      status,
      statusLabel,
      tags: server.tags.map((tag) => serverT(`tags.${tag}`)),
    };
  });
  const selectedServer = serverCards.find((server) => server.key === selectedServerKey) ?? null;

  return (
    <section className="neon-section px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="neon-kicker section-badge-label px-4 py-2">
              {t("eyebrow")}
            </p>
            <h2 id="servers" className="neon-heading neon-title neon-text-pulse mt-4 scroll-mt-24 font-display text-[clamp(2.7rem,7vw,6.2rem)] font-black uppercase leading-[0.86] text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
              {t("copy")}
            </p>
          </div>

          <div className="neon-panel neon-border neon-hover neon-scanline flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 px-2 text-xs font-black uppercase tracking-[0.14em] text-white/54">
              <Clock3 size={16} className="text-cyan-200" aria-hidden="true" />
              {t("updated")}: {formattedLastUpdatedAt}
            </div>
            <button
              type="button"
              onClick={() => void loadServers()}
              disabled={isLoading || isRefreshing}
              className="neon-button-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading || isRefreshing ? "animate-spin" : ""} aria-hidden="true" />
              {isLoading || isRefreshing ? t("refreshing") : t("refresh")}
            </button>
            <Link
              href="/servers"
              className="neon-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition"
            >
              {t("allServers")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="server-card-grid mt-10">
          {serverCards.map((server) => (
            <ServerHudCard
              address={server.address}
              connectHref={server.connectHref}
              connectable={server.connectable}
              copied={copiedServer === server.key}
              detailsLabel={serverT("actions.detailsFor", { server: server.displayName })}
              displayName={server.displayName}
              icon={server.icon}
              isOnline={server.isOnline}
              key={server.key}
              labels={{
                connect: "CONNECT",
                copied: t("copied"),
                copyIp: t("copyIp"),
                details: "DETAILS",
                ip: t("labels.ip"),
                map: t("labels.map"),
                ping: t("labels.ping"),
                players: t("labels.players"),
                planned: t("planned"),
              }}
              map={server.map}
              maxPlayers={server.maxPlayers}
              onCopy={() => void handleCopy(server.key, server.address)}
              onDetails={() => setSelectedServerKey(server.key)}
              ping={server.ping}
              players={server.players}
              playersLabel={server.playersLabel}
              region={server.region}
              serverKey={server.key}
              status={server.status}
              statusLabel={server.statusLabel}
              tags={server.tags}
            />
          ))}
        </div>
      </div>
      {selectedServer ? (
        <ServerDetailsDrawer
          copied={copiedServer === selectedServer.key}
          labels={{
            close: serverT("actions.closeDetails"),
            connect: serverT("actions.connect"),
            copied: t("copied"),
            copyIp: t("copyIp"),
            ip: t("labels.ip"),
            lastChecked: serverT("modal.lastChecked"),
            lastCheckedUnavailable: serverT("modal.lastCheckedUnavailable"),
            map: t("labels.map"),
            offlineMessage: serverT("modal.offlineMessage"),
            pendingMessage: serverT("modal.pendingMessage"),
            ping: t("labels.ping"),
            planned: t("planned"),
            players: t("labels.players"),
            statusSummary: serverT("modal.statusSummaryLabel"),
            title: serverT("modal.eyebrow"),
          }}
          locale={locale}
          onClose={() => setSelectedServerKey(null)}
          onCopy={() => void handleCopy(selectedServer.key, selectedServer.address)}
          server={selectedServer}
          summary={serverT(`modal.summary.${selectedServer.status}`, { server: selectedServer.displayName })}
        />
      ) : null}
      <CopyToast message={toastMessage} />
    </section>
  );
}

function ServerDetailsDrawer({
  copied,
  labels,
  locale,
  onClose,
  onCopy,
  server,
  summary,
}: {
  copied: boolean;
  labels: {
    close: string;
    connect: string;
    copied: string;
    copyIp: string;
    ip: string;
    lastChecked: string;
    lastCheckedUnavailable: string;
    map: string;
    offlineMessage: string;
    pendingMessage: string;
    ping: string;
    planned: string;
    players: string;
    statusSummary: string;
    title: string;
  };
  locale: string;
  onClose: () => void;
  onCopy: () => void;
  server: ServerWarRoomCard;
  summary: string;
}) {
  const lastCheckedDate = server.lastCheckedAt ? new Date(server.lastCheckedAt) : null;
  const formattedLastChecked = lastCheckedDate && !Number.isNaN(lastCheckedDate.getTime())
    ? new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(lastCheckedDate)
    : labels.lastCheckedUnavailable;
  const canConnect = server.connectable && server.isOnline && server.status !== "pending";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/72 px-4 py-5 backdrop-blur-sm sm:items-center sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <article
        aria-labelledby="server-details-title"
        aria-modal="true"
        className={`server-tactical-card server-tactical-card--${server.status} max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto p-5 sm:p-6`}
        data-occupancy={server.isOnline ? "low" : "idle"}
        data-status={server.status}
        role="dialog"
      >
        <div className="server-card__backdrop" aria-hidden="true" />
        <div className="server-card__noise" aria-hidden="true" />
        <div className="server-card__scanline" aria-hidden="true" />
        <div className="server-card__shine" aria-hidden="true" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="server-card__region text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                {labels.title}
              </p>
              <h3 id="server-details-title" className="server-card__title mt-2 truncate font-display text-4xl font-black uppercase leading-none text-white">
                {server.displayName}
              </h3>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-white/42">{server.region}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="server-copy-button grid size-11 shrink-0 place-items-center text-white transition"
              aria-label={labels.close}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-cyan-200">{labels.statusSummary}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/68">{summary}</p>
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <DrawerMetric Icon={UsersRound} label={labels.players} value={server.status === "pending" ? labels.planned : server.playersLabel} />
            <DrawerMetric Icon={Gamepad2} label={labels.map} value={server.status === "pending" ? labels.planned : server.map} />
            <DrawerMetric Icon={RadioTower} label={labels.ping} value={server.status === "pending" ? labels.planned : server.ping} />
            <DrawerMetric Icon={ShieldCheck} label={labels.lastChecked} value={formattedLastChecked} />
          </dl>

          {server.status === "pending" || server.status === "offline" ? (
            <p className="mt-5 border border-white/10 bg-black/30 p-4 text-sm font-semibold leading-6 text-white/58">
              {server.status === "pending" ? labels.pendingMessage : labels.offlineMessage}
            </p>
          ) : null}

          <div className="mt-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white/38">{labels.ip}</p>
            <div className="server-ip-row flex min-w-0 items-center gap-2 px-3 py-3">
              <RadioTower size={16} className="server-card__accent-icon shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate font-mono text-sm font-black text-white">{server.address}</span>
            </div>
          </div>

          <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${server.status === "pending" ? "pointer-events-none opacity-70" : ""}`}>
            <button
              type="button"
              onClick={onCopy}
              disabled={server.status === "pending"}
              className="server-copy-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition disabled:cursor-not-allowed"
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? labels.copied : labels.copyIp}
            </button>

            {canConnect ? (
              <a
                href={server.connectHref}
                className="server-join-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
              >
                {labels.connect}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : (
              <span className="server-disabled-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white/42">
                <Lock size={15} aria-hidden="true" />
                {server.statusLabel}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function DrawerMetric({
  Icon,
  label,
  value,
}: {
  Icon: typeof UsersRound;
  label: string;
  value: string;
}) {
  return (
    <div className="server-metric min-w-0 p-3">
      <dt className="flex items-center gap-2 text-[0.64rem] font-black uppercase tracking-[0.14em] text-white/34">
        <Icon size={15} className="server-card__accent-icon" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-2 truncate text-sm font-black uppercase text-white">{value}</dd>
    </div>
  );
}
