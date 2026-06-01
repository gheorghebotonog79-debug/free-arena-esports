import type { ReactNode } from "react";
import { DatabaseBackup, Gauge, Headset, ShieldCheck, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";

const footerStatus = [
  { key: "antiCheat", Icon: ShieldCheck },
  { key: "vip", Icon: Star },
  { key: "uptime", Icon: Gauge },
  { key: "backup", Icon: DatabaseBackup },
  { key: "support", Icon: Headset },
] as const;

const brandBadges = ["established", "communityFirst", "fairPlay", "antiCheatProtected"] as const;
const brandParagraphs = ["paragraphOne", "paragraphTwo", "paragraphThree"] as const;

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="neon-section site-footer border-t border-cyan-300/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="neon-panel hud-frame grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
          {footerStatus.map(({ key, Icon }) => (
            <div key={key} className="flex items-center gap-3 border border-white/10 bg-black/32 p-3">
              <Icon size={19} className="shrink-0 text-cyan-200" aria-hidden="true" />
              <span className="text-xs font-black uppercase tracking-[0.14em] text-white/72">
                {t(`status.${key}`)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 border-t border-cyan-300/14 pt-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="site-footer__brand-panel">
            <div className="site-footer__badge-row" aria-label={t("brand.badgeGroupLabel")}>
              {brandBadges.map((badge) => (
                <span key={badge} className="site-footer__badge">
                  {t(`brand.badges.${badge}`)}
                </span>
              ))}
            </div>

            <p className="neon-heading site-footer__brand mt-5 whitespace-nowrap font-display text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none text-white">
              <span>FREE-</span><span className="text-cyan-200">ARENA</span><span>.RO</span>
            </p>
            <p className="site-footer__brand-subtitle mt-4 font-display text-sm font-black uppercase tracking-[0.2em] text-orange-200 sm:text-base">
              {t("brand.subtitle")}
            </p>
            <div className="site-footer__brand-copy mt-5 grid max-w-2xl gap-3 text-sm font-semibold leading-7 text-white/66">
              {brandParagraphs.map((paragraph) => (
                <p key={paragraph}>{t(`brand.${paragraph}`)}</p>
              ))}
            </div>
          </div>
          <FooterColumn title="Server IP">
            <span>217.156.22.74:27015</span>
            <span>51.38.97.243:27015</span>
            <span>135.125.208.88:27015</span>
          </FooterColumn>
          <FooterColumn title="Links">
            <Link href={routes.servers}>{t("links.servers")}</Link>
            <Link href={routes.community}>{t("links.community")}</Link>
            <Link href={routes.joinStaff}>{t("links.staff")}</Link>
            <Link href={routes.terms}>{t("links.terms")}</Link>
            <Link href={routes.privacy}>{t("links.privacy")}</Link>
            <Link href={routes.terms} locale="en">Terms of Use</Link>
          </FooterColumn>
          <FooterColumn title="Social">
            <a href="https://discord.gg/freearena" target="_blank" rel="noreferrer">Discord</a>
            <a href="ts3server://ts.free-arena.ro">TeamSpeak</a>
            <a href="https://free-arena.ro" target="_blank" rel="noreferrer">Forum</a>
            <a href="mailto:contact@free-arena.ro">contact@free-arena.ro</a>
          </FooterColumn>
        </div>
        <p className="mt-6 border-t border-cyan-300/14 pt-4 text-xs font-semibold text-white/42">
          &copy; 2026 FREE-ARENA
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="grid gap-2 text-sm font-semibold text-white/56">
      <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{title}</p>
      {children}
    </div>
  );
}
