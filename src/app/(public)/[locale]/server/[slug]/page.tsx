import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServerSeoPage } from "@/components/server/ServerSeoPage";
import { routing, type Locale } from "@/i18n/routing";
import {
  buildServerSeoMetadata,
  buildServerStructuredData,
  getServerSeoPage,
  serverSeoSlugs,
} from "@/lib/serverSeo";
import { getPublicServerConfig } from "@/lib/servers";

type DedicatedServerPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serverSeoSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: DedicatedServerPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const page = getServerSeoPage(slug);

  if (!page) {
    return {};
  }

  return buildServerSeoMetadata(page, safeLocale as Locale);
}

export default async function DedicatedServerPage({ params }: DedicatedServerPageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const page = getServerSeoPage(slug);

  if (!page) {
    notFound();
  }

  const server = getPublicServerConfig(page.publicServerSlug);

  if (!server) {
    notFound();
  }

  setRequestLocale(locale);

  const structuredData = buildServerStructuredData(page, locale, server);

  return (
    <>
      <SiteHeader />
      <ServerSeoPage locale={locale} page={page} server={server} />
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
