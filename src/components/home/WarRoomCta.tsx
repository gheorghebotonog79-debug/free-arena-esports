import { ArrowRight, Flame, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";

export function WarRoomCta() {
  const t = useTranslations("WarRoom.cta");

  return (
    <section id="shop" className="cyber-section scroll-mt-32 bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div id="about" className="cyber-panel hud-frame hud-red scroll-mt-32 overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,42,31,0.36),transparent_34%),linear-gradient(110deg,rgba(255,42,31,0.14),transparent_44%,rgba(0,230,255,0.12))]" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(255,176,0,0.24),transparent_62%)] blur-xl" aria-hidden="true" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-cyber-amber">
                <Flame size={17} aria-hidden="true" />
                PLAY.FREE-ARENA.RO
              </p>
              <h2 className="glitch-text cyber-title mt-3 font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.82] text-white" data-text={t("title")}>
                {t("title")}
              </h2>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/68">
                {t("copy")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={routes.servers}
                className="cyber-red-button pulse-red inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition hover:scale-[1.02]"
              >
                <ShieldCheck size={18} aria-hidden="true" />
                {t("play")}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href={routes.servers}
                className="cyber-outline-button inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition hover:border-cyber-red/70 hover:bg-cyber-red/10"
              >
                {t("servers")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
