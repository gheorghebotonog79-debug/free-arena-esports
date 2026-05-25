"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Clock3, RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ServerHudCard } from "@/components/home/ServerHudCard";
import { CopyToast } from "@/components/ui/copy-toast";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import type { LiveServerKey, LiveServersResponse, LiveServerStatus, LiveServerStatusKind } from "@/lib/live-server-targets";
import { publicServers } from "@/lib/servers";

const REFRESH_MS = 30_000;

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
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
    : "--";

  return (
    <section id="servers" className="cyber-section scroll-mt-32 border-b border-cyber-red/22 bg-[#050607] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="hud-chip inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyber-red">
              {t("eyebrow")}
            </p>
            <h2 className="cyber-title mt-4 font-display text-[clamp(2.7rem,7vw,6.2rem)] font-black uppercase leading-[0.86] text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
              {t("copy")}
            </p>
          </div>

          <div className="cyber-panel flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 px-2 text-xs font-black uppercase tracking-[0.14em] text-white/54">
              <Clock3 size={16} className="text-cyber-cyan" aria-hidden="true" />
              {t("updated")}: {formattedLastUpdatedAt}
            </div>
            <button
              type="button"
              onClick={() => void loadServers()}
              disabled={isLoading || isRefreshing}
              className="cyber-outline-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading || isRefreshing ? "animate-spin" : ""} aria-hidden="true" />
              {isLoading || isRefreshing ? t("refreshing") : t("refresh")}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {publicServers.map((server) => {
            const live = serverStatuses[server.key];
            const isPending = server.pending === true;
            const status: LiveServerStatusKind = isPending
              ? "pending"
              : isLoading && !live
                ? "loading"
                : live?.status ?? "offline";
            const players = status === "loading" ? 0 : live?.players ?? 0;
            const maxPlayers = status === "loading" ? server.fallbackMaxPlayers : live?.maxPlayers ?? server.fallbackMaxPlayers;
            const playersLabel = status === "loading" ? serverT("loading.value") : `${players}/${maxPlayers}`;
            const map = status === "loading" ? serverT("loading.value") : live?.map || serverT("fallback.map");
            const ping = status === "loading"
              ? serverT("loading.value")
              : live?.ping !== null && live?.ping !== undefined
                ? `${live.ping}ms`
                : serverT("fallback.ping");

            return (
              <ServerHudCard
                address={live?.address || server.address}
                connectHref={live?.connectUrl || server.connectHref}
                connectable={server.connectable}
                copied={copiedServer === server.key}
                detailsLabel={serverT("actions.detailsFor", { server: serverT(`items.${server.key}.name`) })}
                displayName={serverT(`items.${server.key}.name`)}
                icon={server.icon}
                isOnline={status === "online"}
                key={server.key}
                labels={{
                  connect: t("connect"),
                  copied: t("copied"),
                  copyIp: t("copyIp"),
                  details: t("details"),
                  ip: t("labels.ip"),
                  map: t("labels.map"),
                  ping: t("labels.ping"),
                  players: t("labels.players"),
                  planned: t("planned"),
                }}
                map={map}
                maxPlayers={maxPlayers}
                onCopy={() => void handleCopy(server.key, live?.address || server.address)}
                ping={ping}
                players={players}
                playersLabel={isPending ? "--" : playersLabel}
                region={serverT(`items.${server.key}.region`)}
                serverKey={server.key}
                status={status}
                statusLabel={serverT(`status.${status}`)}
                tags={server.tags.map((tag) => serverT(`tags.${tag}`))}
              />
            );
          })}
        </div>
      </div>
      <CopyToast message={toastMessage} />
    </section>
  );
}
