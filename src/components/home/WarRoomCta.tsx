import { Flame } from "lucide-react";
import { useTranslations } from "next-intl";

export function WarRoomCta() {
  const t = useTranslations("WarRoom.cta");

  return (
    <section id="shop" className="neon-section scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div id="about" className="neon-panel neon-border neon-scanline hud-frame scroll-mt-32 overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,229,255,0.18),transparent_40%,rgba(139,92,246,0.2)),radial-gradient(circle_at_18%_30%,rgba(255,0,51,0.18),transparent_34%)]" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.22),transparent_62%)] blur-xl" aria-hidden="true" />
          <div className="relative z-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                <Flame size={17} aria-hidden="true" />
                PLAY.FREE-ARENA.RO
              </p>
              <h2 className="glitch-text neon-heading neon-title neon-text-pulse mt-3 font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.82] text-white" data-text={t("title")}>
                {t("title")}
              </h2>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/68">
                {t("copy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
