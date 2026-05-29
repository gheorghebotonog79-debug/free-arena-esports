import type { Metadata } from "next";
import {
  serverSeoPages,
  serverSeoSlugs,
  type ServerSeoFeatureKey,
  type ServerSeoPageData,
  type ServerSeoSlug,
} from "@/data/servers/seo-pages";
import type { Locale } from "@/i18n/routing";
import { buildPublicMetadata, getLocalizedUrl, siteUrl } from "@/lib/seo";
import type { PublicServerConfig } from "@/lib/servers";

export { serverSeoSlugs };
export type { ServerSeoFeatureKey, ServerSeoPageData, ServerSeoSlug };

export function getServerSeoPage(slug: string) {
  return isServerSeoSlug(slug) ? serverSeoPages[slug] : null;
}

export function getServerSeoPath(page: ServerSeoPageData) {
  return `/server/${page.slug}`;
}

export function buildServerSeoMetadata(page: ServerSeoPageData, locale: Locale): Metadata {
  const seo = page.seo[locale];

  return buildPublicMetadata({
    description: seo.description,
    imageAlt: seo.imageAlt,
    locale,
    path: getServerSeoPath(page),
    title: seo.title,
  });
}

export function buildServerStructuredData(
  page: ServerSeoPageData,
  locale: Locale,
  server: PublicServerConfig,
) {
  const url = getLocalizedUrl(locale, getServerSeoPath(page));
  const seo = page.seo[locale];
  const hero = page.hero[locale];
  const faq = page.faq[locale];
  const breadcrumbLabels = locale === "ro"
    ? { home: "Acasa", servers: "Servere", server: `FREE-ARENA ${hero.name}` }
    : { home: "Home", servers: "Servers", server: `FREE-ARENA ${hero.name}` };
  const organization = {
    "@type": "Organization",
    name: "FREE-ARENA",
    url: siteUrl,
    sameAs: ["https://free-arena.ro"],
  };
  const videoGameId = `${url}#videogame`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "@id": videoGameId,
      name: page.gameName,
      description: seo.description,
      url,
      genre: page.genres,
      gamePlatform: page.platforms,
      publisher: organization,
    },
    {
      "@context": "https://schema.org",
      "@type": "GameServer",
      "@id": `${url}#gameserver`,
      name: `FREE-ARENA ${hero.name}`,
      description: hero.description,
      url,
      game: { "@id": videoGameId },
      identifier: server.address,
      provider: organization,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: breadcrumbLabels.home,
          item: getLocalizedUrl(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: breadcrumbLabels.servers,
          item: getLocalizedUrl(locale, "/servers"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: breadcrumbLabels.server,
          item: url,
        },
      ],
    },
  ];
}

function isServerSeoSlug(slug: string): slug is ServerSeoSlug {
  return serverSeoSlugs.includes(slug as ServerSeoSlug);
}
