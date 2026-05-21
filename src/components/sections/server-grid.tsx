"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Gamepad2, RadioTower, Server, ShieldCheck, UsersRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { gameServers } from "@/data/platform";
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
  const [serverStatuses, setServerStatuses] = useState<Partial<Record<LiveServerKey, LiveServerStatus>>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadServerStatuses() {
      try {
        const response = await fetch("/api/servers");

        if (!response.ok) {
          throw new Error("Server status request failed");
        }

        const payload: unknown = await response.json();

        if (!isActive || !isLiveServersResponse(payload)) {
          return;
        }

        setServerStatuses(
          Object.fromEntries(payload.servers.map((server) => [server.key, server])),
        );
      } catch {
        if (isActive) {
          setServerStatuses({});
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadServerStatuses();
    const interval = window.setInterval(loadServerStatuses, REFRESH_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section id="servers" className="cinematic-section bg-[#080909] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          copy={t("heading.copy")}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {gameServers.map((server, index) => {
            const liveServer = serverStatuses[server.key];
            const status: LiveServerStatusKind = isLoading && !liveServer
              ? "loading"
              : liveServer?.status ?? "offline";
            const isOnline = status === "online";
            const serverName = liveServer?.serverName || t(`items.${server.key}.name`);
            const map = status === "loading" ? t("loading.value") : liveServer?.map || t("fallback.map");
            const players = status === "loading"
              ? t("loading.value")
              : liveServer
                ? `${liveServer.players}/${liveServer.maxPlayers}`
                : t("fallback.players");
            const ping = status === "loading"
              ? t("loading.value")
              : liveServer?.ping !== null && liveServer?.ping !== undefined
                ? `${liveServer.ping}ms`
                : t("fallback.ping");
            const address = liveServer?.address || server.address;
            const connectHref = liveServer?.connectUrl || server.connectHref;

            return (
              <MotionCard
                key={server.key}
                delay={index * 0.06}
                className="premium-card glass-panel flex h-full flex-col rounded-lg p-5"
              >
                <div className="flex items-start justify-between gap-4">
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
                      <h3 className="break-words font-display text-2xl font-black text-white">
                        {serverName}
                      </h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
                        {t(`items.${server.key}.region`)}
                      </p>
                    </div>
                  </div>
                  <span className={`live-badge inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${isOnline ? "live-pulse status-active" : ""} ${statusClasses[status]}`}>
                    {isOnline ? (
                      <span className="signal-bars mr-2" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : null}
                    {t(`status.${status}`)}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="premium-card rounded-lg bg-black/28 p-3">
                    <UsersRound size={18} className="text-arena-cyan" aria-hidden="true" />
                    <p className="mt-3 font-display text-xl font-black text-white sm:text-2xl">{players}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.players")}
                    </p>
                  </div>
                  <div className="premium-card min-w-0 rounded-lg bg-black/28 p-3">
                    <Gamepad2 size={18} className="text-arena-green" aria-hidden="true" />
                    <p className="mt-3 truncate font-display text-xl font-black text-white sm:text-2xl" title={map}>
                      {map}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.map")}
                    </p>
                  </div>
                  <div className="premium-card rounded-lg bg-black/28 p-3">
                    <RadioTower size={18} className="text-arena-red" aria-hidden="true" />
                    <p className="mt-3 font-display text-xl font-black text-white sm:text-2xl">{ping}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.ping")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {server.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-bold text-white/62 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur"
                    >
                      {t(`tags.${tag}`)}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white/64">
                      <Server size={17} className="text-white/42" aria-hidden="true" />
                      <span className="truncate">{address}</span>
                    </div>
                    <ShieldCheck
                      size={20}
                      className={`shrink-0 ${isOnline ? "text-arena-green" : "text-white/28"}`}
                      aria-hidden="true"
                    />
                  </div>

                  {server.connectable && isOnline ? (
                    <a
                      href={connectHref}
                      className="button-glow mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-arena-green px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                      aria-label={t("actions.connectTo", {
                        server: serverName,
                      })}
                    >
                      {t("actions.connect")}
                      <ArrowRight size={17} aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-white/12 bg-white/[0.045] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white/42"
                    >
                      {status === "loading" ? t("actions.loading") : t("actions.offline")}
                    </button>
                  )}
                </div>
              </MotionCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
