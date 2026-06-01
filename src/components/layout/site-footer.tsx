import type { ReactNode } from "react";
import { DatabaseBackup, Gauge, Headset, ShieldCheck, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { forumLinks } from "@/lib/forum-links";
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

const forumFooterLabels = {
  en: {
    admin: "Admin requests",
    forum: "Forum",
    rules: "Rules",
    support: "Support",
    vip: "VIP requests",
  },
  ro: {
    admin: "Cereri admin",
    forum: "Forum",
    rules: "Regulament",
    support: "Suport",
    vip: "Cereri VIP",
  },
} as const;

export function SiteFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale() === "en" ? "en" : "ro";
  const forumLabels = forumFooterLabels[locale];

  return (
    <footer className="neon-section site-footer border-t border-cyan-300/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="neon-panel hud-frame grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
          {footerStatus.map(({ key, Icon }) => (
            <div key={key} className="premium-card glass-panel neon-hover animated-border flex items-center gap-3 rounded-lg border border-white/10 bg-black/32 p-3">
              <Icon size={19} className="shrink-0 text-cyan-200" aria-hidden="true" />
              <span className="text-xs font-black uppercase tracking-[0.14em] text-white/72">
                {t(`status.${key}`)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-5 border-t border-cyan-300/14 pt-6 lg:grid-cols-2 xl:grid-cols-[minmax(24rem,1.2fr)_minmax(9rem,0.66fr)_minmax(10rem,0.72fr)_minmax(10rem,0.72fr)_minmax(10rem,0.72fr)]">
          <div className="premium-card glass-panel neon-hover animated-border site-footer__brand-panel min-w-0 lg:col-span-2 xl:col-span-1">
            <div className="site-footer__badge-row" aria-label={t("brand.badgeGroupLabel")}>
              {brandBadges.map((badge) => (
                <span key={badge} className="site-footer__badge">
                  {t(`brand.badges.${badge}`)}
                </span>
              ))}
            </div>

            <p className="neon-heading site-footer__brand mt-5 break-words font-display text-[clamp(2rem,4vw,3.2rem)] font-black uppercase leading-none text-white">
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
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_links", target: "servers" }} href={routes.servers}>{t("links.servers")}</TrackedLink>
            <TrackedLink eventName="click_shop_vip" eventPayload={{ location: "footer_links" }} href={routes.shop}>{t("links.shop")}</TrackedLink>
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_links", target: "community" }} href={routes.community}>{t("links.community")}</TrackedLink>
            <TrackedLink eventName="click_apply_staff" eventPayload={{ location: "footer_links" }} href={routes.joinStaff}>{t("links.staff")}</TrackedLink>
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_links", target: "terms" }} href={routes.terms}>{t("links.terms")}</TrackedLink>
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_links", target: "privacy" }} href={routes.privacy}>{t("links.privacy")}</TrackedLink>
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_links", target: "terms_en" }} href={routes.terms} locale="en">Terms of Use</TrackedLink>
          </FooterColumn>
          <FooterColumn title="Forum">
            <TrackedAnchor eventName="click_forum" eventPayload={{ location: "footer_forum", target: "forum" }} href={forumLinks.home} target="_blank" rel="noreferrer">{forumLabels.forum}</TrackedAnchor>
            <TrackedAnchor eventName="click_apply_staff" eventPayload={{ location: "footer_forum", target: "admin_requests" }} href={forumLinks.adminRequests} target="_blank" rel="noreferrer">{forumLabels.admin}</TrackedAnchor>
            <TrackedAnchor eventName="click_shop_vip" eventPayload={{ location: "footer_forum", target: "vip_requests" }} href={forumLinks.vipRequests} target="_blank" rel="noreferrer">{forumLabels.vip}</TrackedAnchor>
            <TrackedAnchor eventName="click_forum" eventPayload={{ location: "footer_forum", target: "rules" }} href={forumLinks.rules} target="_blank" rel="noreferrer">{forumLabels.rules}</TrackedAnchor>
            <TrackedAnchor eventName="click_forum" eventPayload={{ location: "footer_forum", target: "support" }} href={forumLinks.support} target="_blank" rel="noreferrer">{forumLabels.support}</TrackedAnchor>
          </FooterColumn>
          <FooterColumn title="Social">
            <TrackedAnchor eventName="click_join_discord" eventPayload={{ location: "footer_social" }} href="https://discord.gg/freearena" target="_blank" rel="noreferrer">Discord</TrackedAnchor>
            <TrackedAnchor eventName="click_teamspeak" eventPayload={{ location: "footer_social" }} href="ts3server://ts.free-arena.ro">TeamSpeak</TrackedAnchor>
            <TrackedAnchor eventName="click_forum" eventPayload={{ location: "footer_social" }} href={forumLinks.home} target="_blank" rel="noreferrer">Forum</TrackedAnchor>
            <TrackedAnchor eventName="click_forum" eventPayload={{ location: "footer_social", target: "email" }} href="mailto:contact@free-arena.ro">contact@free-arena.ro</TrackedAnchor>
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
    <div className="premium-card glass-panel neon-hover animated-border grid h-full gap-2 rounded-lg p-4 text-sm font-semibold text-white/56">
      <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{title}</p>
      {children}
    </div>
  );
}
