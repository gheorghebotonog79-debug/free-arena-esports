import { DatabaseBackup, Gauge, Headset, ShieldCheck, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const footerStatus = [
  { key: "antiCheat", Icon: ShieldCheck },
  { key: "vip", Icon: Star },
  { key: "uptime", Icon: Gauge },
  { key: "backup", Icon: DatabaseBackup },
  { key: "support", Icon: Headset },
] as const;

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="cyber-section border-t border-cyber-red/35 bg-black px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="cyber-panel hud-frame grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
          {footerStatus.map(({ key, Icon }) => (
            <div key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/32 p-3">
              <Icon size={19} className="shrink-0 text-cyber-red" aria-hidden="true" />
              <span className="text-xs font-black uppercase tracking-[0.14em] text-white/72">
                {t(`status.${key}`)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl font-black uppercase tracking-[0.08em] text-white">
            FREE-<span className="text-cyber-red">ARENA</span>.RO
          </p>
          <p className="max-w-2xl text-sm leading-6 text-white/54">{t("copy")}</p>
        </div>
      </div>
    </footer>
  );
}
