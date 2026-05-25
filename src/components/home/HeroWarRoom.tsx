import Image from "next/image";
import { ArrowRight, Crosshair, Headphones, MessageSquare, RadioTower, ShieldCheck } from "lucide-react";
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

export function HeroWarRoom() {
  const t = useTranslations("WarRoom.hero");

  return (
    <section className="cyber-section relative min-h-[calc(100vh-5rem)] overflow-hidden border-b border-cyber-red/30 bg-cyber-black px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <ParticlesBackground />
      <div className="cyber-hero-art hero-float" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.68)_42%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0.78)_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-cyber-red" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_28rem]">
        <div className="max-w-5xl pt-4 lg:pt-10">
          <p className="hud-chip inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyber-cyan">
            <span className="size-2 rounded-full bg-cyber-red shadow-[0_0_18px_rgba(255,42,31,0.95)]" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.55em] text-white/66">
            {t("kicker")}
          </p>
          <h1
            className="cyber-title glitch-text mt-3 max-w-5xl font-display text-[clamp(3.2rem,6.7vw,8rem)] font-black uppercase leading-[0.78] tracking-normal text-white"
            data-text={t("title")}
          >
            FREE-<span className="text-cyber-red">ARENA</span>.RO
          </h1>
          <p className="mt-5 font-display text-[clamp(1.8rem,4vw,4.2rem)] font-black uppercase tracking-[0.14em] text-white">
            {t("subtitle")}
          </p>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/72 sm:text-lg">
            {t("copy")}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {signals.map((signal) => (
              <span
                key={signal.key}
                className="hud-chip inline-flex items-center gap-2 bg-black/46 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/78 shadow-[0_0_28px_rgba(255,42,31,0.08)]"
              >
                {"icon" in signal ? (
                  <Image src={signal.icon} alt="" width={22} height={22} className="size-5 object-contain" />
                ) : (
                  <signal.Icon size={17} className="text-cyber-cyan" aria-hidden="true" />
                )}
                {t(`signals.${signal.key}`)}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={routes.servers}
              className="cyber-red-button pulse-red inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition hover:scale-[1.02]"
            >
              <Crosshair size={18} aria-hidden="true" />
              {t("play")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href={routes.servers}
              className="cyber-outline-button inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition hover:border-cyber-red/70 hover:bg-cyber-red/10 hover:text-white"
            >
              <ShieldCheck size={18} aria-hidden="true" />
              {t("servers")}
            </Link>
          </div>
        </div>

        <div className="lg:pt-16">
          <WarzoneStatus />
        </div>
      </div>
    </section>
  );
}
