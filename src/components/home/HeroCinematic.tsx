import Image from "next/image";
import { ArrowRight, Crosshair, Headphones, MessageSquare, RadioTower, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";

const signals = [
  { key: "cs16", icon: "/assets/game-icons/CS.png" },
  { key: "cs2", icon: "/assets/game-icons/CS2.png" },
  { key: "discord", Icon: MessageSquare },
  { key: "ts3", Icon: Headphones },
  { key: "forum", Icon: RadioTower },
] as const;

export function HeroCinematic() {
  const t = useTranslations("WarRoom.hero");

  return (
    <section className="cinematic-portal relative isolate min-h-[calc(100vh-5rem)] overflow-hidden border-b border-white/10 bg-[#050509] px-4 py-16 sm:px-6 lg:px-8">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,9,0.96)_0%,rgba(5,5,9,0.78)_42%,rgba(5,5,9,0.34)_72%,rgba(5,5,9,0.9)_100%)]" aria-hidden="true" />
      <div className="portal-smoke" aria-hidden="true" />
      <div className="portal-city" aria-hidden="true" />
      <div className="portal-soldier" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050509] via-[#050509]/72 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-13rem)] w-full max-w-7xl items-center">
        <div className="w-full min-w-0 max-w-6xl">
          <div className="hud-chip flex w-full max-w-full flex-wrap items-center gap-x-2 gap-y-2 border-cyber-cyan/28 bg-cyber-cyan/8 px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.12em] text-white/78 sm:inline-flex sm:w-auto sm:gap-x-3 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            {signals.map((signal) => (
              <span key={signal.key} className="inline-flex items-center gap-2">
                {"icon" in signal ? (
                  <Image src={signal.icon} alt="" width={20} height={20} className="size-5 object-contain" />
                ) : (
                  <signal.Icon size={15} className="text-cyber-cyan" aria-hidden="true" />
                )}
                {t(`signals.${signal.key}`)}
              </span>
            ))}
          </div>

          <h1
            className="cyber-title glitch-text mt-8 font-display text-[clamp(3.6rem,9.4vw,9rem)] font-black uppercase leading-[0.86] tracking-normal text-white"
            data-text="FREE-ARENA.RO"
          >
            FREE-<span className="text-cyber-red">ARENA</span>.RO
          </h1>
          <p className="mt-6 font-display text-[clamp(1.55rem,3.4vw,3.2rem)] font-black uppercase tracking-[0.16em] text-[#e8f0ff]">
            ENTER THE WARZONE
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={routes.servers}
              className="cyber-red-button inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition hover:scale-[1.02]"
            >
              <Crosshair size={18} aria-hidden="true" />
              {t("play")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href={routes.servers}
              className="cyber-outline-button inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition hover:border-cyber-cyan/70 hover:bg-cyber-cyan/10 hover:text-white"
            >
              <ShieldCheck size={18} aria-hidden="true" />
              {t("servers")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
