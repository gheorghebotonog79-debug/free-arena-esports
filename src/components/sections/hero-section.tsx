import Image from "next/image";
import Link from "next/link";
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
import { MotionReveal } from "@/components/ui/motion-reveal";
import { platformStats, spotlightMatch } from "@/data/platform";
import { routes } from "@/lib/routes";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-arena-black">
      <div className="absolute inset-0 bg-arena-grid bg-[size:42px_42px] opacity-35" aria-hidden="true" />
      <div className="absolute inset-0 bg-scan-lines opacity-20" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="min-w-0 w-full max-w-[22.5rem] sm:max-w-none">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 rounded-lg border border-arena-green/30 bg-arena-green/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-arena-green">
              <Activity size={15} aria-hidden="true" />
              Competitive hub online
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl break-words font-display text-3xl font-black uppercase leading-[0.95] text-balance text-white [overflow-wrap:anywhere] sm:text-6xl lg:text-7xl">
              FREE-ARENA.RO esports platform
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.16}>
            <p className="mt-6 max-w-full text-base leading-8 text-white/68 sm:max-w-2xl sm:text-lg">
              A scalable arena for live servers, tournaments, squads, player identity, and future
              backend integrations across the FREE-ARENA.RO network.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={routes.servers}
                className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white sm:w-auto"
              >
                View servers
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href={routes.events}
                className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.04] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-red/60 hover:bg-arena-red/15 sm:w-auto"
              >
                <CalendarClock size={18} aria-hidden="true" />
                Event schedule
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.32}>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {platformStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-panel"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-black text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.18} className="lg:justify-self-end">
          <div className="clip-corner relative overflow-hidden border border-white/10 bg-white/[0.045] p-4 shadow-panel">
            <div className="grid gap-4">
              <div className="rounded-lg border border-white/10 bg-black/45 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-arena-gold">
                      Spotlight match
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-black text-white">
                      {spotlightMatch.title}
                    </h2>
                  </div>
                  <Trophy className="text-arena-gold" size={34} aria-hidden="true" />
                </div>

                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  {spotlightMatch.teams.map((team) => (
                    <div
                      key={team.name}
                      className="rounded-lg border border-white/10 bg-white/[0.045] p-3 text-center"
                    >
                      <Image
                        src={team.icon}
                        alt=""
                        width={74}
                        height={74}
                        className="mx-auto h-[74px] w-[74px] object-contain"
                      />
                      <p className="mt-3 text-sm font-bold text-white">{team.name}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/42">
                        {team.record}
                      </p>
                    </div>
                  ))}
                  <div className="flex size-12 items-center justify-center rounded-lg border border-arena-red/40 bg-arena-red/15 font-display text-lg font-black text-arena-red">
                    VS
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.055] px-3 py-2 text-sm text-white/72">
                    <Swords size={17} className="text-arena-red" aria-hidden="true" />
                    {spotlightMatch.mode}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.055] px-3 py-2 text-sm text-white/72">
                    <UsersRound size={17} className="text-arena-cyan" aria-hidden="true" />
                    {spotlightMatch.slots}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.055] px-3 py-2 text-sm text-white/72">
                    <ShieldCheck size={17} className="text-arena-green" aria-hidden="true" />
                    {spotlightMatch.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {["CS2", "VAL", "LOL"].map((icon) => (
                  <div
                    key={icon}
                    className="grid aspect-square place-items-center rounded-lg border border-white/10 bg-white/[0.035]"
                  >
                    <Image
                      src={`/assets/game-icons/${icon}.png`}
                      alt={`${icon} arena`}
                      width={90}
                      height={90}
                      className="h-[72px] w-[72px] object-contain sm:h-[90px] sm:w-[90px]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg border border-arena-green/25 bg-arena-green/10 px-4 py-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-arena-green">
                    Season Alpha
                  </p>
                  <p className="mt-1 text-sm text-white/64">Ranked ladders and cups ready for API data.</p>
                </div>
                <Crown className="shrink-0 text-arena-gold" size={28} aria-hidden="true" />
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
