import { CalendarClock, Medal, Shield, Swords, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { tournamentCards } from "@/data/platform";

export function TournamentSection() {
  const t = useTranslations("Tournaments");

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
                    {t("featured.title")}
                  </h3>
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
                    {t("featured.stats.window.value")}
                  </dd>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Swords size={16} aria-hidden="true" />
                    {t("featured.stats.format.label")}
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">
                    {t("featured.stats.format.value")}
                  </dd>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Medal size={16} aria-hidden="true" />
                    {t("featured.stats.prize.label")}
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">
                    {t("featured.stats.prize.value")}
                  </dd>
                </div>
                <div className="premium-card rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Shield size={16} aria-hidden="true" />
                    {t("featured.stats.ruleset.label")}
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">
                    {t("featured.stats.ruleset.value")}
                  </dd>
                </div>
              </dl>
            </div>
          </MotionReveal>

          <div className="grid gap-4">
            {tournamentCards.map((card, index) => (
              <MotionCard
                key={card.key}
                delay={index * 0.08}
                className="premium-card glass-panel rounded-lg p-5"
              >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/42">
                        {t(`cards.${card.key}.label`)}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-black text-white">
                        {t(`cards.${card.key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/62">
                        {t(`cards.${card.key}.copy`)}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-2 sm:w-56">
                      <div className="premium-card rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          {t("labels.status")}
                        </p>
                        <p className="mt-2 font-bold text-arena-green">
                          {t(`status.${card.statusKey}`)}
                        </p>
                      </div>
                      <div className="premium-card rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          {t("labels.slots")}
                        </p>
                        <p className="mt-2 font-bold text-white">{card.slots}</p>
                      </div>
                    </div>
                  </div>
              </MotionCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
