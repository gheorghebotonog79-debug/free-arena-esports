import Image from "next/image";
import { Headphones, MessageSquare, RadioTower } from "lucide-react";
import { useTranslations } from "next-intl";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { WarzoneStatus } from "@/components/home/WarzoneStatus";

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
    <section className="neon-hero neon-hero--wow neon-hero--compact relative isolate overflow-hidden border-b border-cyan-300/15 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <ParticlesBackground />
      <div className="neon-hero__flames" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="neon-hero__cinematic-light neon-hero__cinematic-light--red" aria-hidden="true" />
      <div className="neon-hero__cinematic-light neon-hero__cinematic-light--cyan" aria-hidden="true" />
      <div className="neon-hero__visual" aria-hidden="true" />
      <div className="neon-hero__soldier" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#080202] via-[#120304]/78 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[23rem] w-full max-w-7xl items-center gap-8 pt-2 sm:min-h-[30rem] lg:min-h-[28rem] lg:grid-cols-[minmax(0,1fr)_24rem] lg:pt-0 xl:min-h-[30rem]">
        <div className="mx-auto w-full min-w-0 max-w-6xl text-center lg:mx-0 lg:text-left">
          <div className="neon-kicker hero-signal-rack mx-auto flex w-full max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-2 overflow-hidden px-3 py-2 text-[0.58rem] font-black uppercase tracking-[0.1em] text-white/78 sm:inline-flex sm:w-auto sm:gap-x-3 sm:px-4 sm:text-xs sm:tracking-[0.18em] lg:mx-0 lg:justify-start">
            {signals.map((signal) => (
              <span key={signal.key} className="inline-flex items-center gap-2">
                {"icon" in signal ? (
                  <Image src={signal.icon} alt={t(`signals.${signal.key}`)} width={20} height={20} className="size-4 object-contain sm:size-5" />
                ) : (
                  <signal.Icon size={15} className="size-3.5 text-cyber-cyan sm:size-4" aria-hidden="true" />
                )}
                {t(`signals.${signal.key}`)}
              </span>
            ))}
          </div>

          <h1
            className="neon-heading neon-title neon-text-pulse hero-wow-title glitch-text mx-auto mt-6 max-w-[21rem] break-words font-display text-[clamp(1.95rem,7.8vw,2.9rem)] font-black uppercase leading-[0.82] tracking-normal text-white sm:max-w-full sm:text-7xl md:text-8xl lg:mx-0 lg:text-[7.1rem] xl:text-[8.2rem]"
            data-text={t("title")}
          >
            <span className="hero-wow-title__energy" data-text={t("title")}>{t("title")}</span>
          </h1>
          <p className="mt-5 font-display text-2xl font-black uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">
            <span className="hero-wow-subtitle bg-gradient-to-r from-cyan-200 via-white to-red-200 bg-clip-text text-transparent">
              {t("subtitle")}
            </span>
          </p>
          <p className="mx-auto mt-5 max-w-[20rem] text-base font-semibold leading-6 text-white/85 sm:max-w-3xl sm:text-xl sm:leading-7 lg:mx-0">
            {t("copy")}
          </p>

        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(0,229,255,0.18),transparent_62%)] blur-2xl" aria-hidden="true" />
          <WarzoneStatus />
        </div>
      </div>
    </section>
  );
}
