import {
  Activity,
  ArrowRight,
  CalendarClock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ForumDerbyPanel } from "@/components/sections/forum-derby-panel";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Link } from "@/i18n/navigation";
import { platformStats } from "@/data/platform";
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
            <ForumDerbyPanel />
          </div>
        </MotionCard>
      </div>
    </section>
  );
}
