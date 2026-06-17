import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getKeywordLandingContent,
  getKeywordLandingLocales,
  keywordLandingPages,
  type KeywordLandingPageContent,
  type KeywordLandingSlug,
} from "@/data/keyword-landings";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata, getLocalizedUrl } from "@/lib/seo";

export type KeywordPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateKeywordLandingMetadata(
  slug: KeywordLandingSlug,
  { params }: KeywordPageProps,
): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const content = getKeywordLandingContent(slug, locale);

  if (!content) {
    notFound();
  }

  return buildPublicMetadata({
    ...content.metadata,
    availableLocales: getKeywordLandingLocales(slug),
    locale,
    path: `/${slug}`,
  });
}

export async function getKeywordLandingRouteData(slug: KeywordLandingSlug, { params }: KeywordPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const content = getKeywordLandingContent(slug, locale);

  if (!content) {
    notFound();
  }

  setRequestLocale(locale);

  return {
    content,
    locale,
  };
}

export function generateKeywordLandingStaticParams(slug: KeywordLandingSlug) {
  return getKeywordLandingLocales(slug).map((locale) => ({ locale }));
}

export function buildKeywordLandingStructuredData(content: KeywordLandingPageContent, locale: Locale) {
  const url = getLocalizedUrl(locale, `/${content.slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: content.metadata.title,
      description: content.metadata.description,
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: content.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function hasKeywordLanding(slug: KeywordLandingSlug, locale: Locale) {
  return Boolean(keywordLandingPages[slug][locale]);
}
