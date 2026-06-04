import type { ReactNode } from "react";
import { Activity, ArrowRight, Clock, Crosshair, Gauge, Medal, Skull, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { TopPlayersSection } from "@/components/home/TopPlayersSection";
import {
  TacticalActions,
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalGrid,
  TacticalInfoBlock,
  TacticalSection,
} from "@/components/public/PublicPagePrimitives";
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

            <TacticalCard as="aside" tone="cs16" className="min-h-80">
              <TacticalCardHeader
                Icon={Medal}
                badge={<TacticalBadge dot>LIVE DATA</TacticalBadge>}
                eyebrow="FREE-ARENA"
                title={content.topPlayersTitle}
              />
              <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-white/66">
                {content.heroBullets.map((item, index) => (
                  <TacticalInfoBlock key={item} label={`0${index + 1}`} value={item} />
                ))}
              </ul>
            </TacticalCard>
          </div>
        </div>
      </section>

      <TacticalSection
        className="pb-14"
        eyebrow={<span className="inline-flex items-center gap-2"><Activity size={15} aria-hidden="true" /> FREE-ARENA</span>}
        title={content.activityTitle}
      >
          <TacticalGrid columns="four">
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
          </TacticalGrid>
      </TacticalSection>

      <TacticalSection
        className="pb-14"
        eyebrow="HALL OF LEGENDS"
        title={locale === "ro" ? "Top 5 jucători" : "Top 5 players"}
        description={locale === "ro" ? "Clasamente reale din progresul live FREE-ARENA." : "Real leaderboards from FREE-ARENA live progress."}
      >
        <TacticalGrid columns="two">
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="players" players={topPlayers} title={content.topPlayersTitle} value={(player) => `${formatCompactNumber(player.xp)} XP`} />
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="kills" players={topKills} title={content.killsTitle} value={(player) => formatCompactNumber(player.kills)} />
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="headshots" players={topHeadshots} title={content.headshotsTitle} value={(player) => formatCompactNumber(player.headshots)} />
          <RankingList emptyLabel={locale === "ro" ? "In verificare" : "Checking"} icon="playtime" players={topPlaytime} title={content.playtimeTitle} value={(player) => formatPlayedTime(player.playedTime)} />
        </TacticalGrid>
      </TacticalSection>

      <TopPlayersSection />

      <TacticalSection className="pb-14">
        <TacticalGrid columns="two">
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
        </TacticalGrid>
      </TacticalSection>

      <TacticalSection
        className="pb-16"
        eyebrow="SERVER NETWORK"
        title={content.internalLinksTitle}
      >
          <TacticalGrid columns="three">
            {content.serverLinks.map((item) => (
              <TacticalCard key={item.href} tone={item.href.includes("respawn") ? "respawn" : item.href.includes("cs2") ? "cs2" : "cs16"} className="min-h-64">
                <TacticalCardHeader
                  Icon={Trophy}
                  badge={<TacticalBadge>SERVER</TacticalBadge>}
                  eyebrow="FREE-ARENA.RO"
                  title={item.title}
                />
                <p className="mt-3 text-sm leading-6 text-white/62">{item.copy}</p>
                <TacticalActions className="sm:grid-cols-1">
                  <TrackedLink
                    eventName="click_server_details"
                    eventPayload={{ location: "rankings_internal_links", target: item.href }}
                    href={item.href}
                    className="server-details-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
                  >
                    {locale === "ro" ? "Detalii" : "Details"}
                    <ArrowRight size={15} aria-hidden="true" />
                  </TrackedLink>
                </TacticalActions>
              </TacticalCard>
            ))}
          </TacticalGrid>
      </TacticalSection>
    </>
  );
}

function ActivityStat({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <TacticalCard tone="cs2" className="min-h-40">
      <TacticalInfoBlock Icon={Icon} label={label} value={<span className="font-display text-3xl">{value}</span>} />
    </TacticalCard>
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
  const tone = icon === "kills" ? "respawn" : icon === "headshots" ? "cs16" : icon === "playtime" ? "global" : "cs2";

  return (
    <TacticalCard tone={tone} className="min-h-[28rem]">
      <TacticalCardHeader
        Icon={Icon}
        badge={<TacticalBadge dot>{players.length > 0 ? "LIVE" : emptyLabel}</TacticalBadge>}
        eyebrow="FREE-ARENA.RO"
        title={title}
      />
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
    </TacticalCard>
  );
}

function ContentPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <TacticalCard tone="global" className="min-h-96">
      <TacticalCardHeader
        badge={<TacticalBadge>INFO</TacticalBadge>}
        eyebrow="FREE-ARENA.RO"
        Icon={Activity}
        title={title}
      />
      <div className="mt-5 grid gap-5 text-sm leading-7 text-white/66">
        {children}
      </div>
    </TacticalCard>
  );
}

function rankBy(players: readonly RankedPlayer[], key: "kills" | "headshots" | "playedTime") {
  return [...players].sort((first, second) => second[key] - first[key]);
}

function sum(players: readonly RankedPlayer[], key: "kills" | "headshots" | "playedTime") {
  return players.reduce((total, player) => total + player[key], 0);
}
