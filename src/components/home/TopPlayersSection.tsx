"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Crosshair, Search, Skull, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  formatCompactNumber,
  formatPlayedTime,
  type PlayerProgressPlayer,
  type PlayerProgressResponse,
  type PlayerSearchResponse,
} from "@/lib/player-progress";

const REFRESH_MS = 60_000;
const SEARCH_DEBOUNCE_MS = 350;

function isProgressResponse(value: unknown): value is PlayerProgressResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as PlayerProgressResponse).players)
  );
}

function isSearchResponse(value: unknown): value is PlayerSearchResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as PlayerSearchResponse).players)
  );
}

export function TopPlayersSection() {
  const t = useTranslations("PlayerProgress");
  const [progress, setProgress] = useState<PlayerProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlayerProgressPlayer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const loadProgress = useCallback(async () => {
    try {
      const response = await fetch("/api/player-progress?limit=10", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Player progress failed");
      }

      const payload: unknown = await response.json();

      if (!isProgressResponse(payload) || !payload.ok) {
        throw new Error("Unexpected player progress payload");
      }

      setProgress(payload);
      setHasError(false);
    } catch {
      setHasError(true);
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

  useEffect(() => {
    const value = query.trim();

    if (value.length < 2) {
      setResults([]);
      setSearchError(false);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsSearching(true);

      try {
        const response = await fetch(`/api/player-progress/search?q=${encodeURIComponent(value)}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const payload: unknown = await response.json();

        if (!isSearchResponse(payload)) {
          throw new Error("Unexpected search payload");
        }

        setResults(payload.players);
        setSearchError(false);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setResults([]);
          setSearchError(true);
        }
      } finally {
        setIsSearching(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  const summary = progress?.summary;
  const players = progress?.players ?? [];
  const searchActive = query.trim().length >= 2;
  const shownSearchResults = searchActive ? results : [];

  return (
    <section id="top-players" className="cyber-section scroll-mt-32 border-b border-white/10 bg-[#050509] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="hud-chip inline-flex border-cyber-cyan/28 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyber-cyan">
                  {t("heading.eyebrow")}
                </p>
                <h2 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.84] text-white">
                  {t("heading.title")}
                </h2>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/62">
                  {t("heading.copy")}
                </p>
              </div>
              <span className="live-badge inline-flex w-fit items-center gap-2 border border-cyber-cyan/24 bg-cyber-cyan/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyber-cyan">
                <span className="signal-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                {t("status.live")}
              </span>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <TopStat Icon={UsersRound} label={t("stats.players")} value={isLoading ? "--" : formatCompactNumber(summary?.totalPlayers ?? 0)} />
              <TopStat Icon={Skull} label={t("stats.kills")} value={isLoading ? "--" : formatCompactNumber(summary?.totalKills ?? 0)} />
              <TopStat Icon={Crosshair} label={t("stats.headshots")} value={isLoading ? "--" : formatCompactNumber(summary?.totalHeadshots ?? 0)} />
            </dl>

            {hasError ? (
              <div className="mt-5 flex gap-3 border border-cyber-amber/28 bg-cyber-amber/10 p-4 text-sm font-semibold text-white/70">
                <AlertTriangle size={19} className="shrink-0 text-cyber-amber" aria-hidden="true" />
                <span>{t("states.error")}</span>
              </div>
            ) : null}

            <div className="mt-8 grid gap-2">
              {isLoading ? (
                <LeaderboardSkeleton />
              ) : players.length > 0 ? (
                players.map((player, index) => (
                  <PlayerRow key={player.player} player={player} rank={index + 1} />
                ))
              ) : (
                <p className="border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/58">{t("states.empty")}</p>
              )}
            </div>
          </div>

          <aside className="cyber-panel h-fit p-5">
            <div className="relative z-10">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-cyber-red" htmlFor="player-search">
                {t("search.label")}
              </label>
              <div className="mt-3 flex items-center gap-2 border border-white/12 bg-black/42 px-3 py-2 focus-within:border-cyber-cyan/70">
                <Search size={18} className="shrink-0 text-cyber-cyan" aria-hidden="true" />
                <input
                  id="player-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("search.placeholder")}
                  className="min-h-10 w-full bg-transparent text-sm font-black text-white outline-none placeholder:text-white/34"
                />
              </div>

              <div className="mt-4 grid gap-2">
                {!searchActive ? (
                  <p className="border border-white/10 bg-black/28 p-3 text-sm font-semibold text-white/50">{t("search.min")}</p>
                ) : isSearching ? (
                  <p className="border border-cyber-cyan/24 bg-cyber-cyan/10 p-3 text-sm font-bold text-cyber-cyan">{t("search.loading")}</p>
                ) : searchError ? (
                  <p className="border border-cyber-red/24 bg-cyber-red/10 p-3 text-sm font-bold text-white/60">{t("search.error")}</p>
                ) : shownSearchResults.length > 0 ? (
                  shownSearchResults.map((player) => <CompactPlayer key={player.player} player={player} />)
                ) : (
                  <p className="border border-white/10 bg-black/28 p-3 text-sm font-semibold text-white/50">{t("search.empty")}</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TopStat({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="cyber-panel p-4">
      <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/42">
        <Icon size={17} className="text-cyber-cyan" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-3 font-display text-3xl font-black text-white">{value}</dd>
    </div>
  );
}

function PlayerRow({ player, rank }: { player: PlayerProgressPlayer; rank: number }) {
  return (
    <article className="grid gap-3 border border-white/10 bg-[#0b0f16]/76 p-3 transition hover:border-cyber-cyan/38 hover:bg-cyber-cyan/5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <div className="grid size-11 place-items-center border border-cyber-red/28 bg-cyber-red/10 font-display text-lg font-black text-cyber-red">
        {rank}
      </div>
      <div className="min-w-0">
        <h3 className="truncate font-display text-xl font-black text-white">{player.nick}</h3>
        <p className="mt-1 truncate font-mono text-xs text-white/36">{player.player}</p>
      </div>
      <dl className="grid grid-cols-3 gap-2 sm:w-80">
        <SmallMetric label="XP" value={formatCompactNumber(player.xp)} />
        <SmallMetric label="K/D" value={player.kdRatio.toFixed(2)} />
        <SmallMetric label="Time" value={formatPlayedTime(player.playedTime)} />
      </dl>
    </article>
  );
}

function CompactPlayer({ player }: { player: PlayerProgressPlayer }) {
  return (
    <article className="flex items-center justify-between gap-3 border border-white/10 bg-black/30 p-3">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-black text-white">{player.nick}</h3>
        <p className="mt-1 truncate font-mono text-xs text-white/34">{player.player}</p>
      </div>
      <span className="shrink-0 font-display text-lg font-black text-cyber-cyan">{formatCompactNumber(player.xp)}</span>
    </article>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/28 p-2">
      <dt className="text-[0.64rem] font-black uppercase tracking-[0.12em] text-white/34">{label}</dt>
      <dd className="mt-1 text-sm font-black text-white">{value}</dd>
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-[5.2rem] animate-pulse border border-white/8 bg-white/[0.035]" />
      ))}
    </>
  );
}
