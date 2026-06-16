import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { PublicPageShell } from "@/components/public/PublicPagePrimitives";
import { ServerContactSupportCard } from "@/components/server/ServerContactSupportCard";
import { ServerFaq } from "@/components/server/ServerFaq";
import { ServerFeatureGrid } from "@/components/server/ServerFeatureGrid";
import { ServerInfoSection } from "@/components/server/ServerInfoSection";
import { ServerInternalLinks } from "@/components/server/ServerInternalLinks";
import { ServerLandingExpansion } from "@/components/server/ServerLandingExpansion";
import { ServerSeoContent } from "@/components/server/ServerSeoContent";
import { ServerSeoHero } from "@/components/server/ServerSeoHero";
import type { Locale } from "@/i18n/routing";
import type { ServerSeoPageData } from "@/lib/serverSeo";
import type { PublicServerConfig } from "@/lib/servers";

type ServerSeoPageProps = {
  locale: Locale;
  page: ServerSeoPageData;
  server: PublicServerConfig;
};

const labels = {
  ro: {
    hero: {
      address: "Adresă",
      checking: "Se verifică...",
      copied: "Copiat",
      copyIp: "Copiază IP",
      dnsPending: "DNS nepornit încă",
      discord: "Discord",
      joinServer: "Joacă acum",
      map: "Hartă",
      monitored: "Monitorizat",
      plannedLaunch: "Pregătit pentru lansare",
      players: "Jucători",
      server: "Server",
      staff: "Aplică staff",
      status: "Status",
      teamspeak: "TeamSpeak",
    },
    info: {
      currentMap: "Hartă curentă",
      ip: "IP",
      latency: "Latență",
      players: "Jucători",
      port: "Port",
      status: "Status",
      title: "Server info",
    },
    support: {
      cta: "Contactează-ne",
      eyebrow: "Suport conectare",
      text: "Contactează echipa FREE-ARENA.",
      title: "Probleme de conectare?",
    },
    contentLabel: "Despre server",
    features: {
      label: "Foundation",
      title: "De ce FREE-ARENA",
    },
    faq: {
      label: "FAQ",
      title: "Întrebări frecvente",
    },
    links: {
      discord: "Discord",
      hub: "Acțiuni rapide",
      related: "Alte servere FREE-ARENA",
      servers: "Toate serverele",
      staff: "Aplică staff",
      teamspeak: "TeamSpeak",
    },
  },
  en: {
    hero: {
      address: "Address",
      checking: "Checking...",
      copied: "Copied",
      copyIp: "Copy IP",
      dnsPending: "DNS not live yet",
      discord: "Discord",
      joinServer: "Play now",
      map: "Map",
      monitored: "Monitored",
      plannedLaunch: "Ready for launch",
      players: "Players",
      server: "Server",
      staff: "Join staff",
      status: "Status",
      teamspeak: "TeamSpeak",
    },
    info: {
      currentMap: "Current map",
      ip: "IP",
      latency: "Latency",
      players: "Players",
      port: "Port",
      status: "Status",
      title: "Server info",
    },
    support: {
      cta: "Contact Us",
      eyebrow: "Connection support",
      text: "Contact the FREE-ARENA team.",
      title: "Need help connecting?",
    },
    contentLabel: "About server",
    features: {
      label: "Foundation",
      title: "Why FREE-ARENA",
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked questions",
    },
    links: {
      discord: "Discord",
      hub: "Quick actions",
      related: "Other FREE-ARENA servers",
      servers: "All servers",
      staff: "Join staff",
      teamspeak: "TeamSpeak",
    },
  },
} as const;

export function ServerSeoPage({ locale, page, server }: ServerSeoPageProps) {
  const copy = labels[locale];

  return (
    <>
      <PublicPageShell>
        <ServerSeoHero labels={copy.hero} locale={locale} page={page} server={server} />
        <ServerInfoSection labels={copy.info} locale={locale} page={page} server={server} />
        <section className="neon-section px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <ServerContactSupportCard
              cta={copy.support.cta}
              eyebrow={copy.support.eyebrow}
              location="server_seo_support"
              serverKey={server.key}
              text={copy.support.text}
              title={copy.support.title}
            />
          </div>
        </section>
        <ServerLandingExpansion locale={locale} page={page} />
        <ServerFeatureGrid
          label={copy.features.label}
          locale={locale}
          page={page}
          title={copy.features.title}
        />
        <ServerFaq label={copy.faq.label} locale={locale} page={page} title={copy.faq.title} />
        <ServerInternalLinks labels={copy.links} locale={locale} page={page} />
        <ServerSeoContent label={copy.contentLabel} locale={locale} page={page} />
      </PublicPageShell>
      <LiveChatLauncher />
    </>
  );
}
