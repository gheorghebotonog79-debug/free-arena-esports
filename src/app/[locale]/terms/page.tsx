import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocalizedLegalPage } from "@/components/legal/localized-legal-page";
import { routing } from "@/i18n/routing";
import {
  getAlternateLocaleCodes,
  getLocalizedAlternates,
  openGraphImageUrl,
  openGraphLocales,
  siteUrl,
} from "@/lib/seo";

type LegalPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "Legal.terms.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocalizedAlternates(safeLocale, "/terms"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${safeLocale}/terms`,
      siteName: "FREE-ARENA.RO",
      images: [{ url: openGraphImageUrl, width: 1200, height: 630, alt: t("imageAlt") }],
      locale: openGraphLocales[safeLocale],
      alternateLocale: getAlternateLocaleCodes(safeLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [openGraphImageUrl],
    },
  };
}

export default async function TermsPage({ params }: LegalPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LocalizedLegalPage kind="terms" />;
}
