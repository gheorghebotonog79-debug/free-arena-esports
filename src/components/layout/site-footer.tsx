import type { ReactNode } from "react";
import { Headphones, Mail, RadioTower, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import { TacticalCardChrome } from "@/components/home/HomeTacticalPrimitives";
import { FooterIpCopyButton } from "@/components/layout/footer-ip-copy-button";
import { officialContactChannels } from "@/lib/contact";
import { forumLinks } from "@/lib/forum-links";
import { routes } from "@/lib/routes";
import { getCanonicalServerPath } from "@/lib/server-url";
import { publicServers, type PublicServerSlug } from "@/lib/servers";

const DISCORD_URL = "https://discord.gg/freearena";
const TEAMSPEAK_ADDRESS = "ts.free-arena.ro";
const TEAMSPEAK_URL = `ts3server://${TEAMSPEAK_ADDRESS}`;
const FOOTER_CONTACT_EMAIL = officialContactChannels.generalEmail;

type FooterTone = "cs16" | "respawn" | "cs2" | "global";

const footerToneClass: Record<FooterTone, string> = {
  cs16: "server-card--cs16",
  respawn: "server-card--respawn",
  cs2: "server-card--cs2",
  global: "server-card--global",
};

const footerServerLabelKeys = {
  cs16: "servers.cs16",
  cs2: "servers.cs2",
  global: "servers.global",
  respawn: "servers.respawn",
} as const satisfies Record<PublicServerSlug, string>;

const footerServerOrder: PublicServerSlug[] = ["cs16", "respawn", "cs2", "global"];

const footerValues = ["fairPlay", "activePlayers", "realCompetition"] as const;

const year = new Date().getFullYear();

const footerLinkClass = "premium-footer-link";
const footerMetaLinkClass = "premium-footer-meta-link";

const footerServerBySlug = Object.fromEntries(
  publicServers.map((serverConfig) => [serverConfig.slug, serverConfig]),
) as Record<PublicServerSlug, (typeof publicServers)[number]>;

const orderedServers = footerServerOrder.map((slug) => footerServerBySlug[slug]);

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer id="footer" className="neon-section site-footer premium-footer border-t border-cyan-300/20 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)]">
          <section
            className="server-tactical-card neon-hover server-card--global server-tactical-card--online premium-footer-brand site-footer__brand-panel min-w-0 p-5 sm:p-7"
            data-occupancy="low"
            data-status="online"
          >
            <TacticalCardChrome />
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2" aria-label={t("brand.badgeGroupLabel")}>
                {footerValues.map((value) => (
                  <span key={value} className="site-footer__badge">
                    {t(`brand.values.${value}`)}
                  </span>
                ))}
              </div>

              <p className="neon-heading site-footer__brand mt-6 break-words font-display text-[clamp(2.55rem,6vw,5.2rem)] font-black uppercase leading-[0.82] text-white">
                FREE-<span className="text-cyan-200">ARENA</span>
              </p>
              <p className="site-footer__brand-subtitle mt-5 max-w-3xl font-display text-sm font-black uppercase leading-6 tracking-[0.18em] text-orange-200 sm:text-base">
                {t("brand.motto")}
              </p>
              <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-white/68 sm:text-base">
                {t("brand.copy")}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <TrackedAnchor
                  eventName="click_teamspeak"
                  eventPayload={{ location: "footer_brand" }}
                  href={TEAMSPEAK_URL}
                  className={footerMetaLinkClass}
                >
                  <Headphones size={18} className="server-card__accent-icon" aria-hidden="true" />
                  <span>{t("meta.teamspeak")}</span>
                  <strong>{TEAMSPEAK_ADDRESS}</strong>
                </TrackedAnchor>
                <TrackedAnchor
                  eventName="click_contact"
                  eventPayload={{ location: "footer_brand", target: "email" }}
                  href={`mailto:${FOOTER_CONTACT_EMAIL}`}
                  className={footerMetaLinkClass}
                >
                  <Mail size={18} className="server-card__accent-icon" aria-hidden="true" />
                  <span>{t("meta.email")}</span>
                  <strong>{FOOTER_CONTACT_EMAIL}</strong>
                </TrackedAnchor>
              </div>
            </div>
          </section>

          <section
            className="server-tactical-card neon-hover server-card--cs2 server-tactical-card--online premium-footer-ip-panel min-w-0 p-5 sm:p-6"
            data-occupancy="low"
            data-status="online"
          >
            <TacticalCardChrome />
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span className="premium-footer-icon grid size-11 shrink-0 place-items-center">
                  <RadioTower size={22} className="server-card__accent-icon" aria-hidden="true" />
                </span>
                <div>
                  <p className="server-card__region text-xs font-black uppercase tracking-[0.18em]">
                    {t("ip.eyebrow")}
                  </p>
                  <h2 className="font-display text-2xl font-black uppercase leading-none text-white">
                    {t("ip.title")}
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid gap-2.5">
                {orderedServers.map((serverConfig) => (
                  <div key={serverConfig.slug} className="premium-footer-ip-row">
                    <TrackedLink
                      eventName="click_server_details"
                      eventPayload={{ location: "footer_ip", server: serverConfig.key }}
                      href={getCanonicalServerPath(serverConfig.key)}
                      className="min-w-0"
                    >
                      <span className="block truncate text-xs font-black uppercase tracking-[0.13em] text-white">
                        {t(footerServerLabelKeys[serverConfig.key])}
                      </span>
                      <span className="mt-1 block truncate font-mono text-xs font-bold text-white/54">
                        {serverConfig.address}
                      </span>
                    </TrackedLink>
                    <FooterIpCopyButton
                      value={serverConfig.address}
                      copyLabel={t("ip.copy")}
                      copiedLabel={t("ip.copied")}
                      ariaLabel={t("ip.copyAria", {
                        address: serverConfig.address,
                        server: t(footerServerLabelKeys[serverConfig.key]),
                      })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FooterColumn title={t("columns.servers")} tone="cs16">
            {footerServerOrder.map((slug) => (
              <TrackedLink
                key={slug}
                eventName="click_server_details"
                eventPayload={{ location: "footer_servers", server: slug }}
                href={getCanonicalServerPath(slug)}
                className={footerLinkClass}
              >
                <Server size={15} aria-hidden="true" />
                {t(footerServerLabelKeys[slug])}
              </TrackedLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("columns.community")} tone="respawn">
            <TrackedAnchor eventName="click_forum" eventPayload={{ location: "footer_community", target: "forum" }} href={forumLinks.home} target="_blank" rel="noreferrer" className={footerLinkClass}>
              {t("community.forum")}
            </TrackedAnchor>
            <TrackedAnchor eventName="click_join_discord" eventPayload={{ location: "footer_community" }} href={DISCORD_URL} target="_blank" rel="noreferrer" className={footerLinkClass}>
              {t("community.discord")}
            </TrackedAnchor>
            <TrackedAnchor eventName="click_teamspeak" eventPayload={{ location: "footer_community" }} href={TEAMSPEAK_URL} className={footerLinkClass}>
              {t("community.teamspeak")}
            </TrackedAnchor>
            <TrackedLink eventName="click_apply_staff" eventPayload={{ location: "footer_community" }} href={routes.joinStaff} className={footerLinkClass}>
              {t("community.staff")}
            </TrackedLink>
          </FooterColumn>

          <FooterColumn title={t("columns.support")} tone="cs2">
            <TrackedAnchor eventName="click_forum" eventPayload={{ location: "footer_support", target: "rules" }} href={forumLinks.rules} target="_blank" rel="noreferrer" className={footerLinkClass}>
              {t("support.rules")}
            </TrackedAnchor>
            <TrackedAnchor eventName="click_apply_staff" eventPayload={{ location: "footer_support", target: "admin_requests" }} href={forumLinks.adminRequests} target="_blank" rel="noreferrer" className={footerLinkClass}>
              {t("support.adminRequests")}
            </TrackedAnchor>
            <TrackedAnchor eventName="click_shop_vip" eventPayload={{ location: "footer_support", target: "vip_requests" }} href={forumLinks.vipRequests} target="_blank" rel="noreferrer" className={footerLinkClass}>
              {t("support.vipRequests")}
            </TrackedAnchor>
            <TrackedLink eventName="click_contact" eventPayload={{ location: "footer_support", target: "contact" }} href={routes.contact} className={footerLinkClass}>
              {t("support.contact")}
            </TrackedLink>
          </FooterColumn>

          <FooterColumn title={t("columns.legal")} tone="global">
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_legal", target: "about" }} href={routes.about} className={footerLinkClass}>
              {t("legal.about")}
            </TrackedLink>
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_legal", target: "terms" }} href={routes.terms} className={footerLinkClass}>
              {t("legal.terms")}
            </TrackedLink>
            <TrackedLink eventName="click_server_details" eventPayload={{ location: "footer_legal", target: "privacy" }} href={routes.privacy} className={footerLinkClass}>
              {t("legal.privacy")}
            </TrackedLink>
          </FooterColumn>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-cyan-300/14 pt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} FREE-ARENA</p>
          <p>{t("bottom")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ children, title, tone }: { children: ReactNode; title: string; tone: FooterTone }) {
  return (
    <div
      className={`server-tactical-card neon-hover ${footerToneClass[tone]} server-tactical-card--online premium-footer-column grid h-full gap-2 p-5 text-sm font-semibold text-white/62`}
      data-occupancy="low"
      data-status="online"
    >
      <TacticalCardChrome />
      <div className="relative z-10 grid h-full content-start gap-2.5">
        <p className="server-card__region mb-2 text-xs font-black uppercase tracking-[0.18em]">{title}</p>
        {children}
      </div>
    </div>
  );
}
