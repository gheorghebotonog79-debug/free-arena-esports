import type { MetadataRoute } from "next";
import { getKeywordLandingLocales, keywordLandingSlugs } from "@/data/keyword-landings";
import { routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";
import { serverSeoSlugs } from "@/lib/serverSeo";

const lastModified = new Date();

type SitemapPage = {
  changeFrequency: "daily" | "monthly" | "weekly";
  path: string;
  priority: number;
};

const serverSeoSitemapPages = serverSeoSlugs.map((slug) => ({
  path: `/server/${slug}`,
  changeFrequency: "weekly" as const,
  priority: 0.85,
}));

const localizedPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/servers", changeFrequency: "daily", priority: 0.9 },
  { path: "/rankings", changeFrequency: "daily", priority: 0.9 },
  { path: "/admin-activity", changeFrequency: "daily", priority: 0.82 },
  { path: "/join-staff", changeFrequency: "monthly", priority: 0.8 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.85 },
  { path: "/teamspeak", changeFrequency: "monthly", priority: 0.8 },
  { path: "/discord", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  ...serverSeoSitemapPages,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const standardPages = routing.locales.flatMap((locale) =>
    localizedPages.map((page) => buildSitemapEntry(locale, page, routing.locales)),
  );

  const keywordPages = keywordLandingSlugs.flatMap((slug) => {
    const availableLocales = getKeywordLandingLocales(slug);
    const page = {
      path: `/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    };

    return availableLocales.map((locale) => buildSitemapEntry(locale, page, availableLocales));
  });

  return [...standardPages, ...keywordPages];
}

function buildSitemapEntry(
  locale: Locale,
  { changeFrequency, path, priority }: SitemapPage,
  availableLocales: readonly Locale[],
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: buildLanguageAlternates(path, availableLocales),
    },
  };
}

function buildLanguageAlternates(path: string, availableLocales: readonly Locale[]) {
  const languages = Object.fromEntries(
    availableLocales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
  );
  const defaultLocale = availableLocales.includes("en") ? "en" : availableLocales[0] ?? routing.defaultLocale;

  languages["x-default"] = `${siteUrl}/${defaultLocale}${path}`;

  return languages;
}
