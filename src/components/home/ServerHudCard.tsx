"use client";

import Image from "next/image";
import { ArrowRight, Check, Copy, ExternalLink, RadioTower, ShieldCheck, UsersRound } from "lucide-react";
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

const statusTone: Record<LiveServerStatusKind, string> = {
  loading: "border-white/18 bg-white/[0.06] text-white/58",
  online: "border-cyber-cyan/36 bg-cyber-cyan/12 text-cyber-cyan",
  offline: "border-cyber-red/34 bg-cyber-red/12 text-cyber-red",
  pending: "border-cyber-amber/36 bg-cyber-amber/12 text-cyber-amber",
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
  const progress = maxPlayers > 0 ? Math.min(100, Math.round((players / maxPlayers) * 100)) : 0;

  return (
    <article className="cyber-panel cyber-card group flex h-full min-w-0 flex-col p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(255,42,31,0.16),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(0,230,255,0.12),transparent_26%)]" aria-hidden="true" />
      <div className="cyber-scanline opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-14 shrink-0 place-items-center border border-cyber-red/34 bg-black/52 shadow-[0_0_30px_rgba(255,42,31,0.18)]">
            <Image src={icon} alt="" width={44} height={44} className="size-11 object-contain" />
          </span>
          <span className={`live-badge inline-flex shrink-0 items-center gap-2 border px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] ${statusTone[status]}`}>
            {isOnline ? <span className="size-2 rounded-full bg-cyber-cyan shadow-[0_0_14px_rgba(0,230,255,0.9)]" aria-hidden="true" /> : null}
            {statusLabel}
          </span>
        </div>
        <div className="mt-3 min-w-0">
          <h3 className="line-clamp-2 font-display text-xl font-black uppercase leading-none text-white 2xl:text-2xl">
            {displayName}
          </h3>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">{region}</p>
        </div>

        <div className="mt-6 min-h-28 border border-white/10 bg-black/34 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/50">
              <UsersRound size={16} className="text-cyber-cyan" aria-hidden="true" />
              {labels.players}
            </div>
            <p className="font-display text-3xl font-black text-white">
              {isPending ? "--" : playersLabel}
            </p>
          </div>
          <div className="hud-progress mt-4">
            <span style={{ width: isPending ? "0%" : `${progress}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Metric label={labels.map} value={isPending ? labels.planned : map} />
            <Metric label={labels.ping} value={isPending ? "--" : ping} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="hud-chip bg-black/34 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white/38">{labels.ip}</p>
          <div className="flex min-w-0 items-center gap-2 border border-cyber-red/24 bg-black/40 px-3 py-3">
            <RadioTower size={16} className="shrink-0 text-cyber-red" aria-hidden="true" />
            <span className="min-w-0 truncate font-mono text-sm font-black text-white">{address}</span>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onCopy}
              className="cyber-outline-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.13em] transition hover:border-cyber-cyan"
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? labels.copied : labels.copyIp}
            </button>
            {connectable && isOnline ? (
              <a
                href={connectHref}
                className="cyber-red-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.13em] transition hover:scale-[1.02]"
              >
                {labels.connect}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex items-center justify-center border border-white/10 bg-white/[0.035] px-3 py-3 text-xs font-black uppercase tracking-[0.13em] text-white/36">
                <ShieldCheck size={15} className="mr-2" aria-hidden="true" />
                {isPending ? labels.planned : statusLabel}
              </span>
            )}
            <Link
              href={`/servers/${serverKey}`}
              className="scan-sweep inline-flex items-center justify-center gap-2 border border-cyber-red/32 bg-cyber-red/10 px-3 py-3 text-xs font-black uppercase tracking-[0.13em] text-white transition hover:border-cyber-red hover:bg-cyber-red/20 sm:col-span-2"
              aria-label={detailsLabel}
            >
              {labels.details}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border border-white/10 bg-white/[0.04] p-2">
      <p className="text-[0.64rem] font-black uppercase tracking-[0.14em] text-white/34">{label}</p>
      <p className="mt-1 truncate text-sm font-black uppercase text-white">{value}</p>
    </div>
  );
}
