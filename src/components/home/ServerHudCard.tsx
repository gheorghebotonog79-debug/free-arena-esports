"use client";

import Image from "next/image";
import { ArrowRight, Check, Copy, ExternalLink, Lock, RadioTower, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LiveServerKey, LiveServerStatusKind } from "@/lib/live-server-targets";

type ServerHudCardProps = {
  address: string;
  connectHref: string;
  connectable: boolean;
  copied: boolean;
  detailsLabel: string;
  displayName: string;
  icon: string;
  isOnline: boolean;
  labels: {
    connect: string;
    copyIp: string;
    copied: string;
    details: string;
    ip: string;
    map: string;
    ping: string;
    players: string;
    planned: string;
  };
  map: string;
  maxPlayers: number;
  onCopy: () => void;
  ping: string;
  players: number;
  playersLabel: string;
  region: string;
  serverKey: LiveServerKey;
  status: LiveServerStatusKind;
  statusLabel: string;
  tags: string[];
};

const cardVariantClass: Record<LiveServerKey, string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  global: "server-card--global",
};

export function ServerHudCard({
  address,
  connectHref,
  connectable,
  copied,
  detailsLabel,
  displayName,
  icon,
  isOnline,
  labels,
  map,
  maxPlayers,
  onCopy,
  ping,
  players,
  playersLabel,
  region,
  serverKey,
  status,
  statusLabel,
  tags,
}: ServerHudCardProps) {
  const isPending = status === "pending";
  const isLoading = status === "loading";
  const isOffline = status === "offline";
  const progress = maxPlayers > 0 ? Math.min(100, Math.round((players / maxPlayers) * 100)) : 0;
  const occupancyTone = isPending || isOffline || isLoading
    ? "idle"
    : progress >= 85
      ? "high"
      : progress >= 45
        ? "medium"
        : "low";

  return (
    <article
      className={`server-tactical-card ${cardVariantClass[serverKey]} server-tactical-card--${status} ${isPending ? "server-tactical-card--locked" : ""} group flex h-full min-w-0 flex-col p-4 sm:p-5`}
      data-occupancy={occupancyTone}
      data-status={status}
    >
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />
      {isPending ? (
        <div className="server-coming-soon-overlay" aria-hidden="true">
          <span>
            <Lock size={26} />
            COMING SOON
          </span>
        </div>
      ) : null}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="server-card__icon grid size-16 shrink-0 place-items-center">
            <Image src={icon} alt="" width={52} height={52} className="size-12 object-contain" />
          </span>
          <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
            <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
            {statusLabel}
          </span>
        </div>
        <div className="mt-3 min-w-0">
          <h3 className="server-card__title line-clamp-2 font-display text-2xl font-black uppercase leading-none text-white 2xl:text-[1.7rem]">
            {displayName}
          </h3>
          <p className="server-card__region mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">{region}</p>
        </div>

        <div className="server-player-core mt-6 min-h-36 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/50">
              <UsersRound size={16} className="server-card__accent-icon" aria-hidden="true" />
              {labels.players}
            </div>
            <p className="server-player-count font-display text-4xl font-black text-white" aria-label={isPending ? labels.planned : playersLabel}>
              {isPending || isLoading ? (
                "--"
              ) : (
                <>
                  <span className="server-player-count__current">{players}</span>
                  <span className="server-player-count__slash">/</span>
                  <span className="server-player-count__max">{maxPlayers}</span>
                </>
              )}
            </p>
          </div>
          <div className="server-player-bar mt-4">
            <span style={{ width: isPending || isLoading ? "0%" : `${progress}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Metric label={labels.map} value={isPending ? labels.planned : map} />
            <Metric label={labels.ping} value={isPending ? "--" : ping} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="server-tag px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white/38">{labels.ip}</p>
          <div className="server-ip-row flex min-w-0 items-center gap-2 px-3 py-3">
            <RadioTower size={16} className="server-card__accent-icon shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate font-mono text-sm font-black text-white">{address}</span>
          </div>

          <div className={`server-actions-grid mt-4 grid gap-2 sm:grid-cols-2 ${isPending ? "pointer-events-none" : ""}`}>
            {isPending ? (
              <span className="server-disabled-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white/50 sm:col-span-2">
                <Lock size={15} aria-hidden="true" />
                COMING SOON
              </span>
            ) : (
              <>
                {connectable && isOnline ? (
                  <a
                    href={connectHref}
                    className="server-join-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] transition sm:col-span-2"
                  >
                    {labels.connect}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="server-disabled-button inline-flex items-center justify-center px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white/36 sm:col-span-2">
                    <ShieldCheck size={15} className="mr-2" aria-hidden="true" />
                    {statusLabel}
                  </span>
                )}
                <Link
                  href={`/servers/${serverKey}`}
                  className="server-details-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
                  aria-label={detailsLabel}
                >
                  {labels.details}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={onCopy}
                  className="server-copy-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
                >
                  {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  {copied ? labels.copied : labels.copyIp}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="server-metric min-w-0 p-2">
      <p className="text-[0.64rem] font-black uppercase tracking-[0.14em] text-white/34">{label}</p>
      <p className="mt-1 truncate text-sm font-black uppercase text-white">{value}</p>
    </div>
  );
}
