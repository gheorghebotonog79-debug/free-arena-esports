import Image from "next/image";
import {
  Activity,
  ArrowRight,
  CalendarClock,
  Crown,
  ShieldCheck,
  Swords,
  Trophy,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ForumDerbyPanel } from "@/components/sections/forum-derby-panel";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Link } from "@/i18n/navigation";
import { platformStats, spotlightMatch } from "@/data/platform";
import { routes } from "@/lib/routes";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="cinematic-section relative overflow-hidden border-b border-white/10 bg-arena-black">
      <div className="ambient-lighting" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true" />
      <div className="hero-bloom" aria-hidden="true" />
      <div className="absolute inset-0 bg-arena-grid bg-[size:42px_42px] opacity-35" aria-hidden="true" />
      <div className="absolute inset-0 bg-scan-lines opacity-20" aria-hidden="true" />
      <div className="depth-vignette" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="min-w-0 w-full max-w-[22.5rem] sm:max-w-none">
          <MotionReveal>
            <div className="live-pulse inline-flex items-center gap-2 rounded-lg border border-arena-green/30 bg-arena-green/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-arena-green shadow-[0_0_36px_rgba(35,209,139,0.14)] backdrop-blur-xl">
              <Activity size={15} aria-hidden="true" />
              {t("eyebrow")}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <h1 className="headline-cinematic mt-6 max-w-4xl break-words font-display text-3xl font-black uppercase leading-[1.16] text-balance text-white [overflow-wrap:anywhere] sm:text-6xl sm:leading-[0.92] lg:text-7xl">
              {t("title")}
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.16}>
            <p className="mt-6 max-w-full text-base leading-8 text-white/68 sm:max-w-2xl sm:text-lg">
              {t("copy")}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={routes.servers}
                className="button-glow inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white sm:w-auto"
              >
                {t("cta.servers")}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href={routes.events}
                className="button-ghost inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-xl transition hover:border-arena-red/60 hover:bg-arena-red/15 sm:w-auto"
              >
                <CalendarClock size={18} aria-hidden="true" />
                {t("cta.events")}
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.32}>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {platformStats.map((stat) => (
                <div
                  key={stat.key}
                  className="premium-card glass-panel rounded-lg p-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
                    {t(`stats.${stat.key}`)}
                  </dt>
                  <dd className="stat-value mt-2 font-display text-3xl font-black text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </MotionReveal>
        </div>

        <MotionCard as="div" delay={0.18} initialVisible className="lg:justify-self-end">
          <div className="hero-float clip-corner premium-card glass-panel animated-border relative overflow-hidden p-4">
            <div className="grid gap-4">
              <div className="premium-card rounded-lg border border-white/10 bg-black/45 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.42)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-arena-gold">
                      {t("spotlight.eyebrow")}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-black text-white">
                      {t(`spotlight.${spotlightMatch.titleKey}`)}
                    </h2>
                  </div>
                  <Trophy className="text-arena-gold" size={34} aria-hidden="true" />
                </div>

                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  {spotlightMatch.teams.map((team) => (
                    <div
                      key={team.key}
                      className="premium-card rounded-lg border border-white/10 bg-white/[0.06] p-3 text-center"
                    >
                      <Image
                        src={team.icon}
                        alt=""
                        width={74}
                        height={74}
                        className="mx-auto h-[74px] w-[74px] object-contain"
                      />
                      <p className="mt-3 text-sm font-bold text-white">
                        {t(`spotlight.teams.${team.key}.name`)}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/42">
                        {t(`spotlight.teams.${team.key}.record`)}
                      </p>
                    </div>
                  ))}
                  <div className="flex size-12 items-center justify-center rounded-lg border border-arena-red/40 bg-arena-red/15 font-display text-lg font-black text-arena-red">
                    {t("spotlight.versus")}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.055] px-3 py-2 text-sm text-white/72">
                    <Swords size={17} className="text-arena-red" aria-hidden="true" />
                    {t(`spotlight.${spotlightMatch.modeKey}`)}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.055] px-3 py-2 text-sm text-white/72">
                    <UsersRound size={17} className="text-arena-cyan" aria-hidden="true" />
                    {t(`spotlight.${spotlightMatch.slotsKey}`)}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.055] px-3 py-2 text-sm text-white/72">
                    <ShieldCheck size={17} className="text-arena-green" aria-hidden="true" />
                    {t(`spotlight.${spotlightMatch.statusKey}`)}
                  </div>
                </div>

                <ForumDerbyPanel />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {["CS2", "VAL", "LOL"].map((icon) => (
                  <div
                    key={icon}
                    className="premium-card grid aspect-square place-items-center rounded-lg border border-white/10 bg-white/[0.045]"
                  >
                    <Image
                      src={`/assets/game-icons/${icon}.png`}
                      alt={t(`gameIconAlt.${icon}`)}
                      width={90}
                      height={90}
                      className="h-[72px] w-[72px] object-contain sm:h-[90px] sm:w-[90px]"
                    />
                  </div>
                ))}
              </div>

              <div className="premium-card flex items-center justify-between gap-4 rounded-lg border border-arena-green/25 bg-arena-green/10 px-4 py-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-arena-green">
                    {t("season.eyebrow")}
                  </p>
                  <p className="mt-1 text-sm text-white/64">{t("season.copy")}</p>
                </div>
                <Crown className="shrink-0 text-arena-gold" size={28} aria-hidden="true" />
              </div>
            </div>
          </div>
        </MotionCard>
      </div>
    </section>
  );
}
