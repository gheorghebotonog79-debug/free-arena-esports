"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  Crosshair,
  ExternalLink,
  Headphones,
  MessageSquare,
  Search,
  Skull,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  formatCompactNumber,
  type PlayerProgressPlayer,
  type PlayerProgressResponse,
  type PlayerSearchResponse,
} from "@/lib/player-progress";

const REFRESH_MS = 60_000;
const SEARCH_DEBOUNCE_MS = 350;

const channels = [
  {
    key: "discord",
    href: "https://discord.gg/freearena",
    Icon: MessageSquare,
    external: true,
    tone: "text-[#98a3ff]",
  },
  {
    key: "teamspeak",
    href: "ts3server://ts.free-arena.ro",
    Icon: Headphones,
    external: false,
    tone: "text-cyber-cyan",
  },
  {
    key: "forum",
    href: "https://free-arena.ro",
    Icon: ExternalLink,
    external: true,
    tone: "text-cyber-red",
  },
] as const;

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

export function CommunityPanel() {
  const t = useTranslations("WarRoom.community");
  const statT = useTranslations("PlayerProgress.stats");
  const [progress, setProgress] = useState<PlayerProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlayerProgressPlayer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const loadProgress = useCallback(async () => {
    try {
      const response = await fetch("/api/player-progress?limit=8", { cache: "no-store" });

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

  const players = progress?.players ?? [];
  const summary = progress?.summary;
  const shownResults = query.trim().length >= 2 ? results : players.slice(0, 4);

  return (
    <section id="community" className="cyber-section scroll-mt-32 border-b border-cyber-cyan/18 bg-[#070708] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="cyber-panel hud-frame hud-red p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyber-cyan">
                {t("eyebrow")}
              </p>
              <h2 className="cyber-title mt-3 font-display text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.9] text-white">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/62 sm:text-base">
                {t("copy")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:min-w-80">
              <MiniStat Icon={UsersRound} label={statT("players")} value={isLoading ? "0" : formatCompactNumber(summary?.totalPlayers ?? 0)} />
              <MiniStat Icon={Skull} label={statT("kills")} value={isLoading ? "0" : formatCompactNumber(summary?.totalKills ?? 0)} />
              <MiniStat Icon={Crosshair} label={statT("headshots")} value={isLoading ? "0" : formatCompactNumber(summary?.totalHeadshots ?? 0)} />
            </div>
          </div>

          {hasError ? (
            <div className="mt-5 border border-cyber-amber/30 bg-cyber-amber/10 p-3 text-sm font-bold text-white/70">
              {t("error")}
            </div>
          ) : null}

          <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-display text-3xl font-black uppercase text-white">{t("topPlayers")}</h3>
                <Trophy size={30} className="text-cyber-amber" aria-hidden="true" />
              </div>
              <div className="grid gap-2">
                {isLoading ? (
                  <LeaderboardSkeleton />
                ) : players.length > 0 ? (
                  players.map((player, index) => (
                    <PlayerRankRow key={player.player} player={player} rank={index + 1} />
                  ))
                ) : (
                  <p className="border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/58">{t("empty")}</p>
                )}
              </div>
            </div>

            <div className="cyber-panel p-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-cyber-red" htmlFor="warroom-player-search">
                {t("playerSearch")}
              </label>
              <div className="mt-3 flex items-center gap-2 border border-white/12 bg-black/42 px-3 py-2 focus-within:border-cyber-cyan/70">
                <Search size={18} className="shrink-0 text-cyber-cyan" aria-hidden="true" />
                <input
                  id="warroom-player-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("placeholder")}
                  className="min-h-10 w-full bg-transparent text-sm font-black text-white outline-none placeholder:text-white/34"
                />
              </div>
              <div className="mt-4 grid gap-2">
                {query.trim().length < 2 ? (
                  <p className="border border-white/10 bg-black/28 p-3 text-sm font-semibold text-white/50">{t("min")}</p>
                ) : isSearching ? (
                  <p className="border border-cyber-cyan/24 bg-cyber-cyan/10 p-3 text-sm font-bold text-cyber-cyan">{t("searching")}</p>
                ) : searchError ? (
                  <p className="border border-cyber-red/24 bg-cyber-red/10 p-3 text-sm font-bold text-white/60">{t("error")}</p>
                ) : shownResults.length > 0 ? (
                  shownResults.map((player) => <CompactPlayer key={player.player} player={player} />)
                ) : (
                  <p className="border border-white/10 bg-black/28 p-3 text-sm font-semibold text-white/50">{t("empty")}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          {channels.map((channel) => (
            <CommunityChannel
              Icon={channel.Icon}
              copy={t(`cards.${channel.key}.copy`)}
              cta={t(`cards.${channel.key}.cta`)}
              external={channel.external}
              href={channel.href}
              key={channel.key}
              title={t(`cards.${channel.key}.title`)}
              tone={channel.tone}
            />
          ))}
        </aside>
      </div>
    </section>
  );
}

function MiniStat({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/34 p-3">
      <Icon size={17} className="text-cyber-cyan" aria-hidden="true" />
      <p className="mt-2 font-display text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/38">{label}</p>
    </div>
  );
}

function PlayerRankRow({ player, rank }: { player: PlayerProgressPlayer; rank: number }) {
  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-white/10 bg-black/30 p-3 transition hover:border-cyber-red/36 hover:bg-cyber-red/10">
      <div className="grid size-10 place-items-center border border-cyber-red/34 bg-cyber-red/12 font-display text-lg font-black text-cyber-red">
        {rank}
      </div>
      <div className="min-w-0">
        <h4 className="truncate font-display text-xl font-black text-white">{player.nick}</h4>
        <p className="truncate font-mono text-xs text-white/36">{player.player}</p>
      </div>
      <div className="text-right">
        <p className="font-display text-xl font-black text-cyber-cyan">{formatCompactNumber(player.xp)}</p>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-white/34">XP</p>
      </div>
    </article>
  );
}

function CompactPlayer({ player }: { player: PlayerProgressPlayer }) {
  return (
    <article className="flex items-center justify-between gap-3 border border-white/10 bg-black/30 p-3">
      <div className="min-w-0">
        <h4 className="truncate text-sm font-black text-white">{player.nick}</h4>
        <p className="mt-1 truncate font-mono text-xs text-white/34">{player.player}</p>
      </div>
      <span className="shrink-0 font-display text-lg font-black text-cyber-cyan">{formatCompactNumber(player.kills)}</span>
    </article>
  );
}

function CommunityChannel({
  Icon,
  copy,
  cta,
  external,
  href,
  title,
  tone,
}: {
  Icon: LucideIcon;
  copy: string;
  cta: string;
  external: boolean;
  href: string;
  title: string;
  tone: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="cyber-panel cyber-card group min-h-44 p-5"
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <Icon size={34} className={tone} aria-hidden="true" />
          <ArrowRight size={20} className="text-white/42 transition group-hover:translate-x-1 group-hover:text-cyber-red" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-3xl font-black uppercase text-white">{title}</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/58">{copy}</p>
        <span className="mt-auto pt-5 text-xs font-black uppercase tracking-[0.18em] text-cyber-cyan">{cta}</span>
      </div>
    </a>
  );
}

function LeaderboardSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-[4.35rem] animate-pulse border border-white/8 bg-white/[0.035]" />
      ))}
    </>
  );
}
