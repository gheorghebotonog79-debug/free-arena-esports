import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";
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
      address: "Adresa",
      checking: "Se verifica...",
      copied: "Copiat",
      copyIp: "Copiaza IP",
      discord: "Discord",
      joinServer: "Joaca acum",
      map: "Harta",
      monitored: "Monitorizat",
      players: "Jucatori",
      server: "Server",
      staff: "Aplica staff",
      status: "Status",
      teamspeak: "TeamSpeak",
    },
    info: {
      currentMap: "Harta curenta",
      ip: "IP",
      latency: "Latenta",
      players: "Jucatori",
      port: "Port",
      status: "Status",
      title: "Server info",
    },
    contentLabel: "Despre server",
    features: {
      label: "Foundation",
      title: "De ce FREE-ARENA",
    },
    faq: {
      label: "FAQ",
      title: "Intrebari frecvente",
    },
    links: {
      discord: "Discord",
      hub: "Actiuni rapide",
      related: "Alte servere FREE-ARENA",
      servers: "Toate serverele",
      staff: "Aplica staff",
      teamspeak: "TeamSpeak",
    },
  },
  en: {
    hero: {
      address: "Address",
      checking: "Checking...",
      copied: "Copied",
      copyIp: "Copy IP",
      discord: "Discord",
      joinServer: "Play now",
      map: "Map",
      monitored: "Monitored",
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
      <main className="neon-page-shell cyber-root bg-arena-black text-white">
        <NeonAtmosphere />
        <ServerSeoHero labels={copy.hero} locale={locale} page={page} server={server} />
        <ServerInfoSection labels={copy.info} locale={locale} page={page} server={server} />
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
      </main>
      <LiveChatLauncher />
    </>
  );
}
