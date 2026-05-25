import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServerDetailPage } from "@/components/server/ServerDetailPage";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAlternateLocaleCodes,
  getLocalizedAlternates,
  openGraphImageUrl,
  openGraphLocales,
  siteUrl,
} from "@/lib/seo";
import { getPublicServerConfig, publicServerSlugs } from "@/lib/servers";

type ServerPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => (
    publicServerSlugs.map((slug) => ({ locale, slug }))
  ));
}
export async function generateMetadata({ params }: ServerPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const server = getPublicServerConfig(slug);

  if (!server) {
    return {};
  }

  const serverT = await getTranslations({ locale: safeLocale, namespace: "Servers" });
  const detailT = await getTranslations({ locale: safeLocale, namespace: "ServerDetail" });
  const name = serverT(`items.${server.key}.name`);
  const description = detailT(`items.${server.key}.description`);
  const path = `/servers/${server.slug}`;

  return {
    title: detailT("metadata.title", { server: name }),
    description,
    alternates: getLocalizedAlternates(safeLocale as Locale, path),
    openGraph: {
      title: detailT("metadata.title", { server: name }),
      description,
      url: `${siteUrl}/${safeLocale}${path}`,
      siteName: "FREE-ARENA.RO",
      images: [{ url: openGraphImageUrl, width: 1200, height: 630, alt: detailT("metadata.imageAlt", { server: name }) }],
      locale: openGraphLocales[safeLocale as Locale],
      alternateLocale: getAlternateLocaleCodes(safeLocale as Locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: detailT("metadata.title", { server: name }),
      description,
      images: [openGraphImageUrl],
    },
  };
}

export default async function ServerPage({ params }: ServerPageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const server = getPublicServerConfig(slug);

  if (!server) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <ServerDetailPage server={server} />
      <SiteFooter />
    </>
  );
}
