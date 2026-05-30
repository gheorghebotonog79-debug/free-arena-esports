"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Copy, Crown, Crosshair, Search, Skull, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
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

function filterLocalPlayers(players: PlayerProgressPlayer[] | undefined, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length < 2) {
    return [];
  }

  return (players ?? []).filter((player) => {
    return (
      player.nick.toLowerCase().includes(normalizedQuery) ||
      player.player.toLowerCase().includes(normalizedQuery) ||
      player.steamId.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function TopPlayersSection() {
  const t = useTranslations("PlayerProgress");
  const copiedPlayerTimeoutRef = useRef<number | null>(null);
  const [progress, setProgress] = useState<PlayerProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlayerProgressPlayer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [copiedPlayerId, setCopiedPlayerId] = useState<string | null>(null);
  const cachedProgressPlayers = progress?.players;

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

      setProgress(payload);
      setHasError(!payload.ok);
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

    return () => {
      window.clearInterval(interval);
      if (copiedPlayerTimeoutRef.current !== null) {
        window.clearTimeout(copiedPlayerTimeoutRef.current);
      }
    };
  }, [loadProgress]);

  useEffect(() => {
    const value = query.trim();

    if (value.length < 2) {
      setResults([]);
      setSearchError(false);
      setIsSearching(false);
      return;
    }

    const localMatches = filterLocalPlayers(cachedProgressPlayers, value);

    if (localMatches.length > 0) {
      setResults(localMatches);
      setSearchError(false);
      setIsSearching(false);
    } else {
      setResults([]);
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsSearching(localMatches.length === 0);

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

        let nextResults = payload.players;

        nextResults = nextResults.length > 0 ? nextResults : localMatches;

        if (nextResults.length === 0) {
          const topResponse = await fetch("/api/player-progress?limit=10", {
            cache: "no-store",
            signal: controller.signal,
          });

          if (topResponse.ok) {
            const topPayload: unknown = await topResponse.json();

            if (isProgressResponse(topPayload)) {
              nextResults = filterLocalPlayers(topPayload.players, value);
            }
          }
        }

        setResults(nextResults);
        setSearchError(false);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setResults(localMatches);
          setSearchError(localMatches.length === 0);
        }
      } finally {
        setIsSearching(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [cachedProgressPlayers, query]);

  const summary = progress?.summary;
  const players = progress?.players ?? [];
  const topPlayers = players.slice(0, 5);
  const searchActive = query.trim().length >= 2;
  const shownSearchResults = searchActive ? results : [];

  async function handleCopySteamId(playerId: string) {
    try {
      await copyTextToClipboard(playerId);
      setCopiedPlayerId(playerId);

      if (copiedPlayerTimeoutRef.current !== null) {
        window.clearTimeout(copiedPlayerTimeoutRef.current);
      }

      copiedPlayerTimeoutRef.current = window.setTimeout(() => {
        setCopiedPlayerId((current) => (current === playerId ? null : current));
        copiedPlayerTimeoutRef.current = null;
      }, 1800);
    } catch {
      setCopiedPlayerId(null);
    }
  }

  return (
    <section id="top-players" className="neon-section scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="neon-kicker section-badge-label px-4 py-2">
                  HALL OF FAME
                </p>
                <h2 className="neon-heading neon-title neon-text-pulse mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.84] text-white">
                  {t("heading.title")}
                </h2>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/62">
                  {t("heading.copy")}
                </p>
              </div>
              <span className="live-badge inline-flex w-fit items-center gap-2 border border-cyan-300/24 bg-cyan-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
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
              <div className="mt-5 flex gap-3 border border-amber-300/28 bg-amber-300/10 p-4 text-sm font-semibold text-white/70">
                <AlertTriangle size={19} className="shrink-0 text-amber-200" aria-hidden="true" />
                <span>{t("states.error")}</span>
              </div>
            ) : null}
          </div>

          <aside className="server-tactical-card neon-hover leaderboard-search-card h-fit p-5" data-occupancy="low" data-status="online">
            <div className="server-card__backdrop" aria-hidden="true" />
            <div className="server-card__noise" aria-hidden="true" />
            <div className="server-card__scanline" aria-hidden="true" />
            <div className="server-card__shine" aria-hidden="true" />
            <div className="relative z-10">
              <label className="server-card__region text-xs font-black uppercase tracking-[0.2em]" htmlFor="player-search">
                {t("search.label")}
              </label>
              <div className="server-ip-row mt-3 flex items-center gap-2 px-3 py-2 focus-within:border-cyan-300/70">
                <Search size={18} className="server-card__accent-icon shrink-0" aria-hidden="true" />
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
                  <p className="server-metric p-3 text-sm font-semibold text-white/50">{t("search.min")}</p>
                ) : isSearching ? (
                  <p className="server-metric p-3 text-sm font-bold text-cyan-200">{t("search.loading")}</p>
                ) : searchError ? (
                  <p className="server-metric p-3 text-sm font-bold text-white/60">{t("search.error")}</p>
                ) : shownSearchResults.length > 0 ? (
                  shownSearchResults.map((player) => (
                    <CompactPlayer
                      copied={copiedPlayerId === player.player}
                      key={player.player}
                      onCopySteamId={() => void handleCopySteamId(player.player)}
                      player={player}
                    />
                  ))
                ) : (
                  <p className="server-metric p-3 text-sm font-semibold text-white/50">{t("search.empty")}</p>
                )}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            {isLoading ? (
              <LeaderboardSkeleton />
            ) : topPlayers.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {topPlayers.map((player, index) => (
                  <PodiumCard key={player.player} player={player} rank={index + 1} />
                ))}
              </div>
            ) : (
              <p className="border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/58">{t("states.empty")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TopStat({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="server-tactical-card neon-hover leaderboard-stat-card h-full p-4" data-occupancy="low" data-status="online">
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />
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

function PodiumCard({ player, rank }: { player: PlayerProgressPlayer; rank: number }) {
  const isChampion = rank === 1;

  return (
    <article
      className="server-tactical-card neon-hover server-tactical-card--online leaderboard-player-card group flex h-full min-w-0 flex-col p-5"
      data-occupancy="low"
      data-rank={rank}
      data-status="online"
    >
      <div className="server-card__backdrop" aria-hidden="true" />
      <div className="server-card__noise" aria-hidden="true" />
      <div className="server-card__scanline" aria-hidden="true" />
      <div className="server-card__shine" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="leaderboard-rank-medal grid size-11 place-items-center font-display text-xl font-black text-white">
              {rank}
            </div>
            <div className="leaderboard-avatar grid size-12 place-items-center rounded-full" aria-hidden="true">
              <UsersRound size={21} />
            </div>
          </div>
          {isChampion ? (
            <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
              <Crown size={15} aria-hidden="true" />
              Top 1
            </span>
          ) : (
            <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
              <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
              Top {rank}
            </span>
          )}
        </div>
        <h3 className="server-card__title mt-5 truncate font-display text-3xl font-black uppercase leading-none text-white" title={player.nick}>
          {player.nick}
        </h3>
        <p className="server-card__region mt-2 truncate font-mono text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          {player.player}
        </p>
        <dl className="server-player-core mt-auto grid grid-cols-2 gap-2 p-3">
          <SmallMetric label="XP" value={formatCompactNumber(player.xp)} />
          <SmallMetric label="Kills" value={formatCompactNumber(player.kills)} />
          <SmallMetric label="HS" value={formatCompactNumber(player.headshots)} />
          <SmallMetric label="Time" value={formatPlayedTime(player.playedTime)} />
        </dl>
      </div>
    </article>
  );
}

function CompactPlayer({
  copied,
  onCopySteamId,
  player,
}: {
  copied: boolean;
  onCopySteamId: () => void;
  player: PlayerProgressPlayer;
}) {
  return (
    <article className="server-metric group grid gap-3 p-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.07] text-white/46 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
          <UsersRound size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="server-card__title truncate text-sm font-black text-white" title={player.nick}>
            {player.nick}
          </h3>
          <p className="mt-1 truncate font-mono text-[0.68rem] text-white/38">
            {player.player}
          </p>
        </div>
        <button
          type="button"
          onClick={onCopySteamId}
          className="server-copy-button grid size-9 shrink-0 place-items-center text-white transition"
          title={copied ? "Copied" : "Copy SteamID"}
          aria-label={copied ? "SteamID copied" : `Copy SteamID for ${player.nick}`}
        >
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        </button>
      </div>

      <dl className="grid grid-cols-4 gap-2">
        <SmallMetric label="XP" value={formatCompactNumber(player.xp)} />
        <SmallMetric label="Kills" value={formatCompactNumber(player.kills)} />
        <SmallMetric label="HS" value={formatCompactNumber(player.headshots)} />
        <SmallMetric label="Time" value={formatPlayedTime(player.playedTime)} />
      </dl>
    </article>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="server-metric min-w-0 p-2">
      <dt className="text-[0.64rem] font-black uppercase tracking-[0.12em] text-white/34">{label}</dt>
      <dd className="mt-1 text-sm font-black text-white">{value}</dd>
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="server-tactical-card neon-hover leaderboard-player-card animate-pulse p-5" data-occupancy="low" data-status="loading">
          <div className="server-card__backdrop" aria-hidden="true" />
          <div className="server-card__noise" aria-hidden="true" />
          <div className="server-card__scanline" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
