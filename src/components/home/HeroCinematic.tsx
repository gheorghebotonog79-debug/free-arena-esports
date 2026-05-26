import Image from "next/image";
import { ArrowRight, Crosshair, Headphones, MessageSquare, RadioTower } from "lucide-react";
import { useTranslations } from "next-intl";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { WarzoneStatus } from "@/components/home/WarzoneStatus";
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
    <section className="neon-hero neon-hero--wow neon-hero--compact relative isolate overflow-hidden border-b border-cyan-300/15 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <ParticlesBackground />
      <div className="neon-hero__target-grid" aria-hidden="true" />
      <div className="neon-hero__cinematic-light neon-hero__cinematic-light--red" aria-hidden="true" />
      <div className="neon-hero__cinematic-light neon-hero__cinematic-light--cyan" aria-hidden="true" />
      <div className="neon-hero__visual" aria-hidden="true" />
      <div className="neon-hero__soldier" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/76 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[29rem] w-full max-w-7xl items-center gap-8 pt-4 sm:min-h-[31rem] lg:min-h-[28rem] lg:grid-cols-[minmax(0,1fr)_24rem] lg:pt-0 xl:min-h-[30rem]">
        <div className="mx-auto w-full min-w-0 max-w-6xl text-center lg:mx-0 lg:text-left">
          <div className="neon-kicker hero-signal-rack mx-auto flex w-full max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.12em] text-white/78 sm:inline-flex sm:w-auto sm:gap-x-3 sm:px-4 sm:text-xs sm:tracking-[0.18em] lg:mx-0 lg:justify-start">
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
            className="neon-heading hero-wow-title glitch-text mt-6 max-w-full break-words font-display text-5xl font-black uppercase leading-[0.82] tracking-[0.02em] text-white sm:text-7xl md:text-8xl lg:text-[7.1rem] xl:text-[8.2rem]"
            data-text={t("title")}
          >
            <span className="hero-wow-title__energy" data-text={t("title")}>{t("title")}</span>
          </h1>
          <p className="mt-5 font-display text-2xl font-black uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">
            <span className="hero-wow-subtitle bg-gradient-to-r from-cyan-200 via-white to-red-200 bg-clip-text text-transparent">
              {t("subtitle")}
            </span>
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-300 sm:text-lg lg:mx-0">
            {t("copy")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <Link
              href={routes.servers}
              className="hero-cta-primary inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] transition"
            >
              <Crosshair size={18} aria-hidden="true" />
              {t("play")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href={routes.servers}
              className="hero-cta-secondary inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] transition"
            >
              <RadioTower size={18} aria-hidden="true" />
              {t("servers")}
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(0,229,255,0.18),transparent_62%)] blur-2xl" aria-hidden="true" />
          <WarzoneStatus />
        </div>
      </div>
    </section>
  );
}
