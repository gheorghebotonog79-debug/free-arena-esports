import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { keywordLandingPages } from "@/data/keyword-landings";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata, getLocalizedUrl } from "@/lib/seo";
import { KeywordLandingPage } from "@/components/seo/KeywordLandingPage";

type KeywordPageProps = {
  params: Promise<{ locale: string }>;
};

const slug = "cs-1-6-servers";

export async function generateMetadata({ params }: KeywordPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const content = keywordLandingPages[slug][safeLocale];

  return buildPublicMetadata({
    ...content.metadata,
    locale: safeLocale,
    path: `/${slug}`,
  });
}

export default async function Cs16ServersPage({ params }: KeywordPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const content = keywordLandingPages[slug][locale];

  return (
    <>
      <KeywordLandingPage content={content} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(content, locale)) }}
      />
    </>
  );
}

function buildStructuredData(content: (typeof keywordLandingPages)[typeof slug][Locale], locale: Locale) {
  const url = getLocalizedUrl(locale, `/${slug}`);

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
