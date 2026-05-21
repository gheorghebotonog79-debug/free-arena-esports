import Image from "next/image";
import { Gamepad2, RadioTower, Server, ShieldCheck, UsersRound } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { gameServers } from "@/data/platform";

export function ServerGrid() {
  return (
    <section id="servers" className="bg-[#0a0a0a] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Live network"
          title="Server stack prepared for real player data"
          copy="Structured server cards are ready to connect to backend status, population, queue, and map APIs."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {gameServers.map((server, index) => (
            <MotionReveal key={server.name} delay={index * 0.06}>
              <article className="h-full rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel transition hover:border-arena-green/35">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-14 place-items-center rounded-lg border border-white/10 bg-black/30">
                      <Image
                        src={server.icon}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                      />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-black text-white">{server.name}</h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
                        {server.region}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${server.statusClass}`}>
                    {server.status}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-black/28 p-3">
                    <UsersRound size={18} className="text-arena-cyan" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-black text-white">{server.players}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      Players
                    </p>
                  </div>
                  <div className="rounded-lg bg-black/28 p-3">
                    <Gamepad2 size={18} className="text-arena-green" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-black text-white">{server.tickrate}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      Tick
                    </p>
                  </div>
                  <div className="rounded-lg bg-black/28 p-3">
                    <RadioTower size={18} className="text-arena-red" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-black text-white">{server.ping}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      Ping
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {server.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs font-bold text-white/62"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white/64">
                    <Server size={17} className="text-white/42" aria-hidden="true" />
                    {server.address}
                  </div>
                  <ShieldCheck size={20} className="shrink-0 text-arena-green" aria-hidden="true" />
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
