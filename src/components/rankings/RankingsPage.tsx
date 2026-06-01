import type { ReactNode } from "react";
import { Activity, ArrowRight, Clock, Crosshair, Gauge, Medal, Skull, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import { rankingsPageContent, type RankingMetricKey } from "@/data/rankings-page";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatCompactNumber, formatPlayedTime, type PlayerProgressResponse } from "@/lib/player-progress";

type RankingsPageProps = {
  locale: Locale;
  progress: PlayerProgressResponse;
};

type RankedPlayer = PlayerProgressResponse["players"][number];

const metricIcons: Record<RankingMetricKey, LucideIcon> = {
  players: Trophy,
  kills: Skull,
  headshots: Crosshair,
  playtime: Clock,
};

export function RankingsPage({ locale, progress }: RankingsPageProps) {
  const content = rankingsPageContent[locale];
  const players = progress.players;
  const topPlayers = players.slice(0, 5);
  const topKills = rankBy(players, "kills").slice(0, 5);
  const topHeadshots = rankBy(players, "headshots").slice(0, 5);
  const topPlaytime = rankBy(players, "playedTime").slice(0, 5);

  return (
    <>
      <section className="neon-section px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/48" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-cyan-200">
              {content.breadcrumb.home}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-cyan-200">{content.breadcrumb.current}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-end">
            <div>
              <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
                {content.eyebrow}
              </p>
              <h1 className="neon-heading neon-title neon-text-pulse mt-5 max-w-5xl font-display text-[clamp(3.2rem,8vw,7.4rem)] font-black uppercase leading-[0.84] text-white">
                {content.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/66">
                {content.description}
              </p>
            </div>

            <aside className="premium-card glass-panel neon-hover rounded-lg p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-lg border border-arena-gold/30 bg-arena-gold/10 text-arena-gold">
                  <Medal size={23} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">FREE-ARENA</p>
                  <p className="mt-1 font-display text-2xl font-black uppercase text-white">
                    {content.topPlayersTitle}
                  </p>
                </div>
              </div>
              <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-white/66">
                {content.heroBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(56,213,255,0.75)]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <Activity size={22} aria-hidden="true" />
            </span>
            <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
              {content.activityTitle}
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ActivityStat
              Icon={Trophy}
              label={locale === "ro" ? "Jucatori urmariti" : "Tracked players"}
              value={formatCompactNumber(progress.summary?.totalPlayers ?? players.length)}
            />
            <ActivityStat
              Icon={Skull}
              label={locale === "ro" ? "Kill-uri totale" : "Total kills"}
              value={formatCompactNumber(progress.summary?.totalKills ?? sum(players, "kills"))}
            />
            <ActivityStat
              Icon={Crosshair}
              label={locale === "ro" ? "Headshot-uri" : "Headshots"}
              value={formatCompactNumber(progress.summary?.totalHeadshots ?? sum(players, "headshots"))}
            />
            <ActivityStat
              Icon={Gauge}
              label={locale === "ro" ? "Timp jucat" : "Played time"}
              value={formatPlayedTime(progress.summary?.totalPlayedTime ?? sum(players, "playedTime"))}
            />
          </div>
        </div>
      </section>

      <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-2">
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="players" players={topPlayers} title={content.topPlayersTitle} value={(player) => `${formatCompactNumber(player.xp)} XP`} />
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="kills" players={topKills} title={content.killsTitle} value={(player) => formatCompactNumber(player.kills)} />
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="headshots" players={topHeadshots} title={content.headshotsTitle} value={(player) => formatCompactNumber(player.headshots)} />
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="playtime" players={topPlaytime} title={content.playtimeTitle} value={(player) => formatPlayedTime(player.playedTime)} />
        </div>
      </section>

      <TopPlayersSection />

      <section className="neon-section px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-2">
          <ContentPanel title={content.how.title}>
            {content.how.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ContentPanel>
          <ContentPanel title={content.why.title}>
            {content.why.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ContentPanel>
        </div>
      </section>

      <section className="neon-section px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <Activity size={22} aria-hidden="true" />
            </span>
            <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
              {content.internalLinksTitle}
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.serverLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="premium-card glass-panel neon-hover group rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-black uppercase text-white">
                    {item.title}
                  </h3>
                  <ArrowRight size={18} className="shrink-0 text-cyan-200 transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm leading-6 text-white/62">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ActivityStat({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <article className="premium-card glass-panel neon-hover rounded-lg p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-lg border border-white/12 bg-white/[0.055] text-cyan-200">
          <Icon size={20} aria-hidden="true" />
        </span>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-white/42">{label}</p>
      </div>
      <p className="mt-5 font-display text-4xl font-black uppercase text-white">{value}</p>
    </article>
  );
}

function RankingList({
  emptyLabel,
  icon,
  players,
  title,
  value,
}: {
  emptyLabel: string;
  icon: RankingMetricKey;
  players: readonly RankedPlayer[];
  title: string;
  value: (player: RankedPlayer) => string;
}) {
  const Icon = metricIcons[icon];

  return (
    <article className="premium-card glass-panel neon-hover rounded-lg p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon size={20} aria-hidden="true" />
        </span>
        <h2 className="neon-title neon-text-pulse font-display text-2xl font-black uppercase text-white">{title}</h2>
      </div>
      <ol className="mt-5 grid gap-3">
        {players.length > 0 ? players.map((player, index) => (
          <li key={`${title}-${player.player}`} className="server-metric flex items-center gap-3 p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.07] font-display text-sm font-black text-white">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-black text-white" title={player.nick}>
              {player.nick}
            </span>
            <span className="font-mono text-xs font-black uppercase text-cyan-200">{value(player)}</span>
          </li>
        )) : (
          <li className="server-metric p-3 text-sm font-semibold text-white/54">{emptyLabel}</li>
        )}
      </ol>
    </article>
  );
}

function ContentPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <article className="premium-card glass-panel neon-hover rounded-lg p-5">
      <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">{title}</h2>
      <div className="mt-5 grid gap-5 text-sm leading-7 text-white/66">
        {children}
      </div>
    </article>
  );
}

function rankBy(players: readonly RankedPlayer[], key: "kills" | "headshots" | "playedTime") {
  return [...players].sort((first, second) => second[key] - first[key]);
}

function sum(players: readonly RankedPlayer[], key: "kills" | "headshots" | "playedTime") {
  return players.reduce((total, player) => total + player[key], 0);
}
