"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Clock3,
  Crosshair,
  ExternalLink,
  Headphones,
  MessageSquare,
  RefreshCw,
  Search,
  Skull,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { forumLinks } from "@/lib/forum-links";
import {
  formatCompactNumber,
  formatPlayedTime,
  type PlayerProgressPlayer,
  type PlayerProgressResponse,
  type PlayerProgressSummary,
  type PlayerSearchResponse,
} from "@/lib/player-progress";

const REFRESH_INTERVAL_MS = 60_000;
const SEARCH_DEBOUNCE_MS = 350;

function isPlayerProgressResponse(value: unknown): value is PlayerProgressResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as PlayerProgressResponse).players)
  );
}

function isPlayerSearchResponse(value: unknown): value is PlayerSearchResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as PlayerSearchResponse).players)
  );
}

function formatUpdatedAt(value: string | null, locale: string, fallback: string) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Bucharest",
  }).format(date);
}

export function PlayerProgressHub() {
  const t = useTranslations("PlayerProgress");
  const locale = useLocale();
  const [progress, setProgress] = useState<PlayerProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PlayerProgressPlayer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const loadProgress = useCallback(async ({ initial = false }: { initial?: boolean } = {}) => {
    if (initial) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const response = await fetch("/api/player-progress?limit=15", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Player progress request failed");
      }

      const payload: unknown = await response.json();

      if (!isPlayerProgressResponse(payload) || !payload.ok) {
        throw new Error("Unexpected player progress payload");
      }

      setProgress(payload);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadProgress({ initial: true });
    const interval = window.setInterval(() => {
      void loadProgress();
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [loadProgress]);

  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length < 2) {
      setSearchResults([]);
      setSearchError(false);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsSearching(true);

      try {
        const response = await fetch(`/api/player-progress/search?q=${encodeURIComponent(query)}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Player search failed");
        }

        const payload: unknown = await response.json();

        if (!isPlayerSearchResponse(payload)) {
          throw new Error("Unexpected player search payload");
        }

        setSearchResults(payload.players);
        setSearchError(false);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSearchResults([]);
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
  }, [searchQuery]);

  const summary = progress?.summary ?? null;
  const players = progress?.players ?? [];
  const topPlayer = players[0] ?? null;
  const updatedAt = formatUpdatedAt(progress?.updatedAt ?? null, locale, t("states.notAvailable"));
  const statCards = useMemo(
    () => buildStatCards(summary, t),
    [summary, t],
  );

  return (
    <section id="community" className="cinematic-section border-t border-white/10 bg-[#070808] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t("heading.eyebrow")}
            title={t("heading.title")}
            copy={t("heading.copy")}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="live-badge inline-flex w-fit items-center rounded-lg border border-arena-green/30 bg-arena-green/12 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-arena-green">
              <span className="signal-bars mr-2" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              {t("status.live")}
            </span>
            <button
              type="button"
              onClick={() => void loadProgress()}
              disabled={isLoading || isRefreshing}
              className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10 disabled:cursor-not-allowed disabled:text-white/36"
            >
              <RefreshCw size={17} className={isRefreshing ? "animate-spin text-arena-cyan" : "text-arena-cyan"} aria-hidden="true" />
              {isRefreshing ? t("actions.refreshing") : t("actions.refresh")}
            </button>
          </div>
        </div>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(({ key, label, value, Icon, tone }) => (
            <MotionCard key={key} as="div" delay={0.03} className="premium-card glass-panel rounded-lg p-4">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                <Icon size={17} className={tone} aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-3 break-words font-display text-3xl font-black text-white">
                {isLoading ? t("states.loadingValue") : value}
              </dd>
            </MotionCard>
          ))}
        </dl>

        {hasError ? (
          <div className="mt-5 flex gap-3 rounded-lg border border-arena-gold/24 bg-arena-gold/10 p-4 text-sm font-semibold text-white/70">
            <AlertTriangle size={19} className="shrink-0 text-arena-gold" aria-hidden="true" />
            <span>{t("states.error")}</span>
          </div>
        ) : null}

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <MotionReveal>
            <section className="premium-card glass-panel animated-border rounded-lg p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-cyan">
                    {t("leaderboard.eyebrow")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-black uppercase text-white">
                    {t("leaderboard.title")}
                  </h3>
                </div>
                <p className="text-sm font-semibold text-white/48">
                  {t("leaderboard.updated", { time: updatedAt })}
                </p>
              </div>

              <div className="mt-6 grid gap-2">
                {isLoading ? (
                  <LeaderboardSkeleton />
                ) : players.length > 0 ? (
                  players.map((player, index) => (
                    <PlayerRow
                      key={player.player}
                      player={player}
                      rank={index + 1}
                      labels={{
                        xp: t("player.xp"),
                        kills: t("player.kills"),
                        kd: t("player.kd"),
                        hs: t("player.hs"),
                      }}
                    />
                  ))
                ) : (
                  <div className="rounded-lg border border-white/10 bg-black/24 p-5 text-sm font-semibold text-white/58">
                    {t("states.empty")}
                  </div>
                )}
              </div>
            </section>
          </MotionReveal>

          <div className="grid gap-5">
            <MotionCard className="premium-card glass-panel rounded-lg p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-gold">
                    {t("feature.eyebrow")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-black uppercase text-white">
                    {topPlayer?.nick ?? summary?.topPlayer?.nick ?? t("feature.empty")}
                  </h3>
                </div>
                <Trophy size={34} className="text-arena-gold" aria-hidden="true" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <MiniStat label={t("player.xp")} value={topPlayer ? formatCompactNumber(topPlayer.xp) : "0"} />
                <MiniStat label={t("player.kills")} value={topPlayer ? formatCompactNumber(topPlayer.kills) : "0"} />
                <MiniStat label={t("player.kd")} value={topPlayer ? topPlayer.kdRatio.toFixed(2) : "0.00"} />
                <MiniStat label={t("player.played")} value={topPlayer ? formatPlayedTime(topPlayer.playedTime) : "0m"} />
              </div>
            </MotionCard>

            <MotionCard className="premium-card glass-panel rounded-lg p-5 sm:p-6">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-arena-green" htmlFor="player-search">
                {t("search.label")}
              </label>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/12 bg-black/30 px-3 py-2 focus-within:border-arena-cyan/60">
                <Search size={18} className="shrink-0 text-arena-cyan" aria-hidden="true" />
                <input
                  id="player-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t("search.placeholder")}
                  className="min-h-10 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/34"
                />
              </div>

              <div className="mt-4 grid gap-2">
                {searchQuery.trim().length < 2 ? (
                  <p className="rounded-lg border border-white/10 bg-black/24 p-3 text-sm font-semibold text-white/50">
                    {t("search.min")}
                  </p>
                ) : isSearching ? (
                  <p className="rounded-lg border border-arena-cyan/20 bg-arena-cyan/10 p-3 text-sm font-semibold text-arena-cyan">
                    {t("search.loading")}
                  </p>
                ) : searchError ? (
                  <p className="rounded-lg border border-arena-gold/20 bg-arena-gold/10 p-3 text-sm font-semibold text-white/64">
                    {t("search.error")}
                  </p>
                ) : searchResults.length > 0 ? (
                  searchResults.map((player) => (
                    <CompactPlayerRow key={player.player} player={player} />
                  ))
                ) : (
                  <p className="rounded-lg border border-white/10 bg-black/24 p-3 text-sm font-semibold text-white/50">
                    {t("search.empty")}
                  </p>
                )}
              </div>
            </MotionCard>

            <MotionCard className="premium-card glass-panel rounded-lg p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-cyan">
                {t("community.eyebrow")}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <CommunityLink href="https://discord.gg/freearena" label="Discord" Icon={MessageSquare} />
                <CommunityLink href="ts3server://ts.free-arena.ro" label="TeamSpeak" Icon={Headphones} />
                <CommunityLink href={forumLinks.home} label="Forum" Icon={ExternalLink} external />
              </div>
            </MotionCard>
          </div>
        </div>
      </div>
    </section>
  );
}

type StatTranslator = (key: "stats.players" | "stats.kills" | "stats.headshots" | "stats.played") => string;

function buildStatCards(summary: PlayerProgressSummary | null, t: StatTranslator) {
  return [
    {
      key: "players",
      label: t("stats.players"),
      value: summary ? formatCompactNumber(summary.totalPlayers) : "0",
      Icon: UsersRound,
      tone: "text-arena-cyan",
    },
    {
      key: "kills",
      label: t("stats.kills"),
      value: summary ? formatCompactNumber(summary.totalKills) : "0",
      Icon: Skull,
      tone: "text-arena-red",
    },
    {
      key: "headshots",
      label: t("stats.headshots"),
      value: summary ? formatCompactNumber(summary.totalHeadshots) : "0",
      Icon: Crosshair,
      tone: "text-arena-gold",
    },
    {
      key: "played",
      label: t("stats.played"),
      value: summary ? formatPlayedTime(summary.totalPlayedTime) : "0m",
      Icon: Clock3,
      tone: "text-arena-green",
    },
  ];
}

function PlayerRow({
  player,
  rank,
  labels,
}: {
  player: PlayerProgressPlayer;
  rank: number;
  labels: { xp: string; kills: string; kd: string; hs: string };
}) {
  return (
    <article className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 transition hover:border-arena-cyan/30 hover:bg-arena-cyan/5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <div className="grid size-11 place-items-center rounded-lg border border-arena-cyan/25 bg-arena-cyan/10 font-display text-lg font-black text-arena-cyan">
        {rank}
      </div>
      <div className="min-w-0">
        <h4 className="truncate font-display text-xl font-black text-white">{player.nick}</h4>
        <p className="mt-1 truncate font-mono text-xs font-bold text-white/40">{player.player}</p>
      </div>
      <dl className="grid grid-cols-2 gap-2 sm:w-[24rem] sm:grid-cols-4">
        <SmallMetric label={labels.xp} value={formatCompactNumber(player.xp)} />
        <SmallMetric label={labels.kills} value={formatCompactNumber(player.kills)} />
        <SmallMetric label={labels.kd} value={player.kdRatio.toFixed(2)} />
        <SmallMetric label={labels.hs} value={`${player.hsRate.toFixed(0)}%`} />
      </dl>
    </article>
  );
}

function CompactPlayerRow({ player }: { player: PlayerProgressPlayer }) {
  return (
    <article className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/24 p-3">
      <div className="min-w-0">
        <h4 className="truncate text-sm font-black text-white">{player.nick}</h4>
        <p className="mt-1 truncate font-mono text-xs text-white/36">{player.player}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-display text-lg font-black text-arena-cyan">{formatCompactNumber(player.xp)}</p>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/36">XP</p>
      </div>
    </article>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/28 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className="mt-2 font-display text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/26 p-2">
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/34">{label}</dt>
      <dd className="mt-1 text-sm font-black text-white">{value}</dd>
    </div>
  );
}

function CommunityLink({
  href,
  label,
  Icon,
  external = false,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-3 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-green/60 hover:bg-arena-green/10"
    >
      <Icon size={17} aria-hidden="true" />
      {label}
      <ArrowRight size={15} aria-hidden="true" />
    </a>
  );
}

function LeaderboardSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-[5.75rem] animate-pulse rounded-lg border border-white/8 bg-white/[0.035]" />
      ))}
    </>
  );
}
