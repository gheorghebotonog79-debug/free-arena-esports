"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, Crown, Medal, Skull, Sparkles, Trophy, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import {
  formatCompactNumber,
  type PlayerProgressPlayer,
  type PlayerProgressResponse,
} from "@/lib/player-progress";

const REFRESH_MS = 60_000;
const BUNDLED_FALLBACK_UPDATED_AT = "2026-05-27T10:01:17+03:00";
const BUNDLED_FALLBACK_TOP_PLAYER = "rds";

function isProgressResponse(value: unknown): value is PlayerProgressResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as PlayerProgressResponse).players)
  );
}

function getRankLabel(rank: number) {
  return `#${String(rank).padStart(2, "0")}`;
}

function isBundledFallbackProgress(payload: PlayerProgressResponse) {
  return (
    payload.cached &&
    payload.updatedAt === BUNDLED_FALLBACK_UPDATED_AT &&
    payload.summary?.topPlayer?.nick === BUNDLED_FALLBACK_TOP_PLAYER
  );
}

export function TopPlayersSection() {
  const t = useTranslations("PlayerProgress.preview");
  const [progress, setProgress] = useState<PlayerProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnavailable, setIsUnavailable] = useState(false);

  const loadProgress = useCallback(async () => {
    try {
      const response = await fetch("/api/player-progress?limit=5", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Player progress failed");
      }

      const payload: unknown = await response.json();

      if (!isProgressResponse(payload)) {
        throw new Error("Unexpected player progress payload");
      }

      const hasRealRankingData = payload.ok && payload.players.length > 0 && !isBundledFallbackProgress(payload);

      setProgress(hasRealRankingData ? payload : null);
      setIsUnavailable(!hasRealRankingData);
    } catch {
      setProgress(null);
      setIsUnavailable(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProgress();
    const interval = window.setInterval(() => {
      void loadProgress();
    }, REFRESH_MS);

    return () => window.clearInterval(interval);
  }, [loadProgress]);

  const players = progress?.players.slice(0, 5) ?? [];
  const champion = players[0] ?? null;
  const challengers = players.slice(1, 5);
  const summary = progress?.summary ?? null;
  const hasLiveRankings = !isLoading && !isUnavailable && players.length > 0;

  return (
    <section id="top-players" className="hall-legends-section neon-section scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="neon-kicker section-badge-label inline-flex items-center gap-2 px-4 py-2">
              <Trophy size={15} aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 className="neon-heading mt-5 font-display text-[clamp(2.55rem,5.8vw,5.8rem)] font-black uppercase leading-[0.86] text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/64">
              {t("copy")}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <span className="hall-legends-live inline-flex w-fit items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
              <span className="signal-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              {hasLiveRankings ? t("statusLive") : t("statusUpdating")}
            </span>
            <TrackedLink
              href="/rankings"
              eventName="click_server_details"
              eventPayload={{ location: "homepage_hall_of_legends", target: "rankings" }}
              className="server-details-button inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition"
            >
              {t("cta")}
              <ArrowRight size={15} aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>

        {hasLiveRankings && summary ? (
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <TopStat Icon={UsersRound} label={t("stats.players")} value={formatCompactNumber(summary.totalPlayers)} />
            <TopStat Icon={Skull} label={t("stats.kills")} value={formatCompactNumber(summary.totalKills)} />
            <TopStat Icon={Sparkles} label={t("stats.points")} value={formatCompactNumber(champion?.xp ?? summary.topPlayer?.xp ?? 0)} />
          </dl>
        ) : null}

        <div className="mt-9">
          {isLoading ? (
            <LeaderboardSkeleton />
          ) : hasLiveRankings && champion ? (
            <div className="hall-legends-grid grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
              <LegendChampion player={champion} />
              <div className="grid gap-3">
                <p className="server-card__region px-1 text-xs font-black uppercase tracking-[0.18em]">
                  {t("topFive")}
                </p>
                {challengers.map((player, index) => (
                  <LegendRow key={player.player} player={player} rank={index + 2} />
                ))}
              </div>
            </div>
          ) : (
            <div className="hall-legends-fallback server-tactical-card server-card--global server-tactical-card--online p-6 sm:p-7" data-occupancy="idle" data-status="online">
              <div className="server-card__backdrop" aria-hidden="true" />
              <div className="server-card__noise" aria-hidden="true" />
              <div className="server-card__scanline" aria-hidden="true" />
              <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="hall-legend-fallback-icon grid size-14 shrink-0 place-items-center">
                  <AlertTriangle size={28} className="server-card__accent-icon" aria-hidden="true" />
                </span>
                <div>
                  <p className="server-card__region text-xs font-black uppercase tracking-[0.18em]">
                    {t("fallbackEyebrow")}
                  </p>
                  <p className="mt-2 text-lg font-black text-white">
                    {t("fallback")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TopStat({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="hall-legends-stat server-tactical-card neon-hover server-tactical-card--online h-full p-4" data-occupancy="low" data-status="online">
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="relative z-10">
        <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/46">
          <Icon size={17} className="server-card__accent-icon" aria-hidden="true" />
          {label}
        </dt>
        <dd className="server-card__title mt-3 font-display text-3xl font-black text-white">{value}</dd>
      </div>
    </div>
  );
}

function LegendChampion({ player }: { player: PlayerProgressPlayer }) {
  const t = useTranslations("PlayerProgress.preview");

  return (
    <article
      className="hall-legend-card hall-legend-card--champion hall-legend-card--rank-1 server-tactical-card neon-hover server-tactical-card--online group flex min-w-0 flex-col p-5 sm:p-7"
      data-occupancy="high"
      data-rank="1"
      data-status="online"
    >
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="hall-legend-rank hall-legend-rank--gold grid size-16 place-items-center font-display text-2xl font-black text-white">
              1
            </span>
            <span className="hall-legend-medal grid size-14 place-items-center" aria-hidden="true">
              <Crown size={30} />
            </span>
          </div>
          <span className="hall-legend-badge px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em]">
            {t("champion")}
          </span>
        </div>

        <p className="server-card__region mt-8 text-xs font-black uppercase tracking-[0.18em]">
          {getRankLabel(1)}
        </p>
        <h3 className="server-card__title mt-3 min-w-0 break-words font-display text-[clamp(2.55rem,6vw,5rem)] font-black uppercase leading-[0.82] text-white">
          {player.nick}
        </h3>

        <dl className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
          <LegendMetric label={t("labels.points")} value={formatCompactNumber(player.xp)} />
          <LegendMetric label={t("labels.kills")} value={formatCompactNumber(player.kills)} />
          <LegendMetric label={t("labels.kd")} value={player.kdRatio.toFixed(2)} />
          <LegendMetric label={t("labels.headshots")} value={formatCompactNumber(player.headshots)} />
        </dl>
      </div>
    </article>
  );
}

function LegendRow({ player, rank }: { player: PlayerProgressPlayer; rank: number }) {
  const t = useTranslations("PlayerProgress.preview");
  const isMedalRank = rank <= 3;

  return (
    <article
      className={`hall-legend-row hall-legend-card--rank-${rank} server-tactical-card neon-hover server-tactical-card--online min-w-0 p-4`}
      data-occupancy={isMedalRank ? "medium" : "low"}
      data-rank={rank}
      data-status="online"
    >
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />
      <div className="relative z-10 grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
        <div className="flex items-center gap-3">
          <span className="hall-legend-rank grid size-12 place-items-center font-display text-xl font-black text-white">
            {rank}
          </span>
          {isMedalRank ? (
            <span className="hall-legend-medal hall-legend-medal--small grid size-10 place-items-center" aria-hidden="true">
              <Medal size={22} />
            </span>
          ) : null}
        </div>

        <div className="min-w-0">
          <p className="server-card__region text-xs font-black uppercase tracking-[0.18em]">
            {getRankLabel(rank)}
          </p>
          <h3 className="mt-2 truncate font-display text-2xl font-black uppercase text-white" title={player.nick}>
            {player.nick}
          </h3>
        </div>

        <dl className="grid grid-cols-2 gap-2 sm:w-56">
          <LegendMetric compact label={t("labels.points")} value={formatCompactNumber(player.xp)} />
          <LegendMetric compact label={t("labels.kills")} value={formatCompactNumber(player.kills)} />
        </dl>
      </div>
    </article>
  );
}

function LegendMetric({ compact = false, label, value }: { compact?: boolean; label: string; value: string }) {
  return (
    <div className={`hall-legend-metric min-w-0 ${compact ? "p-2.5" : "p-3"}`}>
      <dt className="text-[0.64rem] font-black uppercase tracking-[0.12em] text-white/36">{label}</dt>
      <dd className={`mt-1 font-black text-white ${compact ? "text-base" : "font-display text-2xl"}`}>{value}</dd>
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
      <div className="server-tactical-card hall-legend-card hall-legend-card--champion animate-pulse p-5 sm:p-7" data-occupancy="low" data-status="loading">
        <div className="server-card__backdrop" aria-hidden="true" />
        <div className="server-card__noise" aria-hidden="true" />
        <div className="server-card__scanline" aria-hidden="true" />
      </div>
      <div className="grid gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="server-tactical-card hall-legend-row animate-pulse p-4" data-occupancy="low" data-status="loading">
            <div className="server-card__backdrop" aria-hidden="true" />
            <div className="server-card__noise" aria-hidden="true" />
            <div className="server-card__scanline" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
