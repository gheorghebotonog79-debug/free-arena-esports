import Image from "next/image";
import { Gamepad2, RadioTower, Server, ShieldCheck, UsersRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard } from "@/components/ui/motion-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { gameServers } from "@/data/platform";

export function ServerGrid() {
  const t = useTranslations("Servers");

  return (
    <section id="servers" className="cinematic-section bg-[#080909] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          copy={t("heading.copy")}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {gameServers.map((server, index) => (
            <MotionCard
              key={server.key}
              delay={index * 0.06}
              className="premium-card glass-panel h-full rounded-lg p-5"
            >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="animated-border grid size-14 place-items-center rounded-lg border border-white/10 bg-black/30 shadow-[0_0_34px_rgba(56,213,255,0.1)]">
                      <Image
                        src={server.icon}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                      />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-black text-white">
                        {t(`items.${server.key}.name`)}
                      </h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
                        {t(`items.${server.key}.region`)}
                      </p>
                    </div>
                  </div>
                  <span className={`live-badge inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${server.statusKey === "online" ? "live-pulse status-active" : ""} ${server.statusClass}`}>
                    {server.statusKey === "online" ? (
                      <span className="signal-bars mr-2" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : null}
                    {t(`status.${server.statusKey}`)}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="premium-card rounded-lg bg-black/28 p-3">
                    <UsersRound size={18} className="text-arena-cyan" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-black text-white">{server.players}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.players")}
                    </p>
                  </div>
                  <div className="premium-card rounded-lg bg-black/28 p-3">
                    <Gamepad2 size={18} className="text-arena-green" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-black text-white">{server.tickrate}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.tick")}
                    </p>
                  </div>
                  <div className="premium-card rounded-lg bg-black/28 p-3">
                    <RadioTower size={18} className="text-arena-red" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-black text-white">{server.ping}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
                      {t("labels.ping")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {server.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-bold text-white/62 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur"
                    >
                      {t(`tags.${tag}`)}
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
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
