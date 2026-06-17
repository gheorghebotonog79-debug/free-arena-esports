import type { Metadata } from "next";
import { KeywordLandingPage } from "@/components/seo/KeywordLandingPage";
import {
  buildKeywordLandingStructuredData,
  generateKeywordLandingMetadata,
  generateKeywordLandingStaticParams,
  getKeywordLandingRouteData,
  type KeywordPageProps,
} from "@/lib/keywordLandingRoute";

const slug = "cs-1-6-servers-brazil";

export function generateStaticParams() {
  return generateKeywordLandingStaticParams(slug);
}

export function generateMetadata(props: KeywordPageProps): Promise<Metadata> {
  return generateKeywordLandingMetadata(slug, props);
}

export default async function Cs16ServersBrazilPage(props: KeywordPageProps) {
  const { content, locale } = await getKeywordLandingRouteData(slug, props);

  return (
    <>
      <KeywordLandingPage content={content} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildKeywordLandingStructuredData(content, locale)) }}
      />
    </>
  );
}
