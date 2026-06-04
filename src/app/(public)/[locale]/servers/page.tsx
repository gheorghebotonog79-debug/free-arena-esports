import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicPageShell } from "@/components/public/PublicPagePrimitives";
import { ServerGrid } from "@/components/sections/server-grid";
import {
  RomanianServersSeoHub,
  romanianServersHubFaq,
} from "@/components/servers/RomanianServersSeoHub";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata, getLocalizedUrl, siteUrl } from "@/lib/seo";

export const revalidate = 60;

type ServersPageProps = {
  params: Promise<{ locale: string }>;
};

const seo: Record<Locale, { description: string; imageAlt: string; title: string }> = {
  ro: {
    title: "Servere CS Romania FREE-ARENA | CS 1.6 si CS2",
    description:
      "Descopera hubul FREE-ARENA cu servere CS 1.6 Classic, Respawn si CS2, rankings, Discord, TeamSpeak si pagini canonice pentru fiecare server.",
    imageAlt: "Servere CS Romania FREE-ARENA",
  },
  en: {
    title: "FREE-ARENA Game Servers | CS 1.6 and CS2",
    description:
      "Browse FREE-ARENA CS 1.6, Respawn and CS2 servers with live status, connection IPs, TeamSpeak voice, and community support.",
    imageAlt: "FREE-ARENA CS 1.6 and CS2 servers",
  },
};

export async function generateMetadata({ params }: ServersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  return buildPublicMetadata({
    locale: safeLocale,
    path: "/servers",
    ...seo[safeLocale],
  });
}

export default async function ServersPage({ params }: ServersPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const structuredData = buildServersStructuredData(locale);

  return (
    <>
      <SiteHeader />
      <PublicPageShell>
        <ServerGrid />
        {locale === "ro" ? <RomanianServersSeoHub /> : null}
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

function buildServersStructuredData(locale: Locale) {
  const url = getLocalizedUrl(locale, "/servers");
  const content = seo[locale];
  const breadcrumbLabels = locale === "ro"
    ? { home: "Acasa", servers: "Servere" }
    : { home: "Home", servers: "Servers" };

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: content.title,
      description: content.description,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: "FREE-ARENA",
        url: siteUrl,
      },
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
          item: url,
        },
      ],
    },
    ...(locale === "ro"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: romanianServersHubFaq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];
}
