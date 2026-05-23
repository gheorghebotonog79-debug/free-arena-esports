import { CalendarClock, Medal, Shield, Swords, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { CommunityLivePanel } from "@/components/chat/community-live-panel";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PublicTournament } from "@/lib/public-tournaments";

type TournamentSectionProps = {
  locale: string;
  tournaments: PublicTournament[];
};

const fallbackCards = ["registration", "brackets", "rewards"] as const;

function formatTournamentDate(value: Date | null, locale: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function TournamentSection({ locale, tournaments }: TournamentSectionProps) {
  const t = useTranslations("Tournaments");
  const featuredTournament = tournaments[0];
  const secondaryTournaments = tournaments.slice(1);
  const hasTournaments = Boolean(featuredTournament);
  const featuredStart = featuredTournament
    ? formatTournamentDate(featuredTournament.startsAt, locale)
    : null;
  const featuredEnd = featuredTournament
    ? formatTournamentDate(featuredTournament.endsAt, locale)
    : null;

  return (
    <section id="events" className="cinematic-section border-y border-white/10 bg-arena-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          copy={t("heading.copy")}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <MotionReveal>
            <div className="premium-card glass-panel animated-border h-full rounded-lg p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-arena-red">
                    {t("featured.eyebrow")}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-black text-white">
                    {featuredTournament?.title ?? t("featured.emptyTitle")}
                  </h3>
                  {featuredTournament?.description ? (
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/62">
                      {featuredTournament.description}
                    </p>
                  ) : !hasTournaments ? (
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/62">
                      {t("featured.emptyCopy")}
                    </p>
                  ) : null}
                </div>
                <Trophy size={42} className="text-arena-gold" aria-hidden="true" />
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3">
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <CalendarClock size={16} aria-hidden="true" />
                    {t("featured.stats.window.label")}
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">
                    {featuredStart
                      ? featuredEnd
                        ? `${featuredStart} - ${featuredEnd}`
                        : featuredStart
                      : t("featured.stats.window.emptyValue")}
                  </dd>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Swords size={16} aria-hidden="true" />
                    {t("featured.stats.format.label")}
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">
                    {featuredTournament?.game ?? t("featured.stats.format.emptyValue")}
                  </dd>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Medal size={16} aria-hidden="true" />
                    {t("featured.stats.prize.label")}
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">
                    {featuredTournament?.prizePool ?? t("featured.stats.prize.emptyValue")}
                  </dd>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Shield size={16} aria-hidden="true" />
                    {t("featured.stats.ruleset.label")}
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">
                    {featuredTournament
                      ? t(`status.${featuredTournament.status}`)
                      : t("featured.stats.ruleset.emptyValue")}
                  </dd>
                </div>
              </dl>
            </div>
          </MotionReveal>

          <div className="grid gap-4">
            {secondaryTournaments.length > 0 ? secondaryTournaments.map((tournament, index) => (
              <MotionCard
                key={tournament.id}
                delay={index * 0.08}
                className="premium-card glass-panel rounded-lg p-5"
              >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/42">
                        {tournament.game}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-black text-white">
                        {tournament.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/62">
                        {tournament.description ?? t("cards.liveFallback.copy")}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-2 sm:w-56">
                      <div className="premium-card rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          {t("labels.status")}
                        </p>
                        <p className="mt-2 font-bold text-arena-green">
                          {t(`status.${tournament.status}`)}
                        </p>
                      </div>
                      <div className="premium-card rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          {t("labels.starts")}
                        </p>
                        <p className="mt-2 font-bold text-white">
                          {formatTournamentDate(tournament.startsAt, locale) ?? t("labels.unscheduled")}
                        </p>
                      </div>
                    </div>
                  </div>
              </MotionCard>
            )) : fallbackCards.map((card, index) => (
              <MotionCard
                key={card}
                delay={index * 0.08}
                className="premium-card glass-panel rounded-lg p-5"
              >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/42">
                        {t(`cards.${card}.label`)}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-black text-white">
                        {t(`cards.${card}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/62">
                        {t(`cards.${card}.copy`)}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-2 sm:w-56">
                      <div className="premium-card rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          {t("labels.status")}
                        </p>
                        <p className="mt-2 font-bold text-arena-green">
                          {t("status.ready")}
                        </p>
                      </div>
                      <div className="premium-card rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          {t("labels.source")}
                        </p>
                        <p className="mt-2 font-bold text-white">{t("labels.admin")}</p>
                      </div>
                    </div>
                  </div>
              </MotionCard>
            ))}
          </div>
        </div>

        <MotionReveal delay={0.16}>
          <CommunityLivePanel />
        </MotionReveal>
      </div>
    </section>
  );
}
