import { CalendarClock, Medal, Shield, Swords, Trophy } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { tournamentCards } from "@/data/platform";

export function TournamentSection() {
  return (
    <section id="events" className="border-y border-white/10 bg-arena-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Competition ops"
          title="Tournament modules with clean data boundaries"
          copy="Schedules, brackets, prize pools, team entry, and match states are separated for future backend integration."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <MotionReveal>
            <div className="h-full rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-panel">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-arena-red">
                    Featured cup
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-black text-white">
                    Arena Masters
                  </h3>
                </div>
                <Trophy size={42} className="text-arena-gold" aria-hidden="true" />
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <CalendarClock size={16} aria-hidden="true" />
                    Window
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">Fri - Sun</dd>
                </div>
                <div className="rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Swords size={16} aria-hidden="true" />
                    Format
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">5v5 Swiss</dd>
                </div>
                <div className="rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Medal size={16} aria-hidden="true" />
                    Prize
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">VIP + Credits</dd>
                </div>
                <div className="rounded-lg bg-black/28 p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    <Shield size={16} aria-hidden="true" />
                    Ruleset
                  </dt>
                  <dd className="mt-3 text-lg font-bold text-white">Admin verified</dd>
                </div>
              </dl>
            </div>
          </MotionReveal>

          <div className="grid gap-4">
            {tournamentCards.map((card, index) => (
              <MotionReveal key={card.title} delay={index * 0.08}>
                <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/42">
                        {card.label}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-black text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/62">{card.copy}</p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-2 sm:w-56">
                      <div className="rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          Status
                        </p>
                        <p className="mt-2 font-bold text-arena-green">{card.status}</p>
                      </div>
                      <div className="rounded-lg bg-black/30 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                          Slots
                        </p>
                        <p className="mt-2 font-bold text-white">{card.slots}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
