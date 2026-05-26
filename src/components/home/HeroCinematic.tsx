import Image from "next/image";
import { ArrowRight, Crosshair, Headphones, MessageSquare, RadioTower, Trophy } from "lucide-react";
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
    <section className="neon-hero relative isolate overflow-hidden border-b border-cyan-300/15 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <ParticlesBackground />
      <div className="neon-hero__visual" aria-hidden="true" />
      <div className="neon-hero__soldier" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050816] via-[#050816]/72 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-7xl items-start gap-10 pt-12 lg:min-h-[calc(100vh-13rem)] lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:pt-0">
        <div className="w-full min-w-0 max-w-6xl">
          <div className="neon-kicker flex w-full max-w-full flex-wrap items-center gap-x-2 gap-y-2 px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.12em] text-white/78 sm:inline-flex sm:w-auto sm:gap-x-3 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
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
            className="neon-heading glitch-text mt-8 max-w-full break-words font-display text-[clamp(3rem,17vw,5.8rem)] font-black uppercase leading-[0.82] tracking-normal text-white sm:text-[clamp(3.8rem,10vw,9.4rem)]"
            data-text={t("title")}
          >
            {t("title")}
          </h1>
          <p className="mt-5 font-display text-[clamp(1.7rem,4vw,4rem)] font-black uppercase tracking-[0.08em] text-white">
            <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
              {t("subtitle")}
            </span>
          </p>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-7 text-slate-300 sm:text-lg">
            {t("copy")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={routes.servers}
              className="neon-button inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition"
            >
              <Crosshair size={18} aria-hidden="true" />
              {t("play")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href="https://discord.gg/freearena"
              target="_blank"
              rel="noreferrer"
              className="neon-button-secondary inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition"
            >
              <MessageSquare size={18} aria-hidden="true" />
              {t("discord")}
            </a>
            <Link
              href={routes.rankings}
              className="neon-button-secondary inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition"
            >
              <Trophy size={18} aria-hidden="true" />
              {t("topPlayers")}
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
