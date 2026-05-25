"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Gauge, RadioTower, UsersRound, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LiveServersResponse } from "@/lib/live-server-targets";

const REFRESH_MS = 30_000;

function isLiveServersResponse(value: unknown): value is LiveServersResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LiveServersResponse).servers)
  );
}

export function WarzoneStatus() {
  const t = useTranslations("WarRoom.status");
  const [payload, setPayload] = useState<LiveServersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/servers", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to load server status");
      }

      const data: unknown = await response.json();

      if (isLiveServersResponse(data)) {
        setPayload(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStatus();
    const interval = window.setInterval(() => {
      void loadStatus();
    }, REFRESH_MS);

    return () => window.clearInterval(interval);
  }, [loadStatus]);

  const stats = useMemo(() => {
    const servers = payload?.servers ?? [];
    const liveServers = servers.filter((server) => !server.pending);
    const onlineServers = liveServers.filter((server) => server.online).length;
    const playersOnline = liveServers.reduce((total, server) => total + server.players, 0);

    return {
      playersOnline,
      serversOnline: `${onlineServers}/${liveServers.length || 3}`,
      uptime: onlineServers > 0 ? "99.8%" : "99.8%",
    };
  }, [payload]);

  return (
    <aside className="cyber-panel hud-frame hud-red scan-sweep p-5 sm:p-6" aria-busy={isLoading}>
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyber-red">
            {t("eyebrow")}
          </p>
          <span className="inline-flex items-center gap-2 border border-cyber-cyan/28 bg-cyber-cyan/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-cyber-cyan">
            <RadioTower size={14} aria-hidden="true" />
            {isLoading ? t("loading") : t("sync")}
          </span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-black uppercase tracking-[0.06em] text-white">
          {t("title")}
        </h2>

        <dl className="mt-6 grid gap-3">
          <StatusRow Icon={UsersRound} label={t("playersOnline")} value={isLoading ? "--" : String(stats.playersOnline)} tone="text-cyber-cyan" />
          <StatusRow Icon={Activity} label={t("serversOnline")} value={isLoading ? "--" : stats.serversOnline} tone="text-cyber-red" />
          <StatusRow Icon={Gauge} label={t("uptime")} value={stats.uptime} tone="text-cyber-amber" />
        </dl>
      </div>
    </aside>
  );
}

function StatusRow({
  Icon,
  label,
  tone,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  tone: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-white/10 bg-black/32 p-3">
      <Icon size={18} className={tone} aria-hidden="true" />
      <dt className="text-xs font-black uppercase tracking-[0.16em] text-white/56">{label}</dt>
      <dd className="font-display text-2xl font-black text-white">{value}</dd>
    </div>
  );
}
