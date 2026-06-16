import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const siteUrl = "https://play.free-arena.ro";
export const openGraphImageUrl = "/og-image.png";

export const openGraphLocales: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
};

export function getLocalizedAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const suffix = getLocalizedPathSuffix(path);

  return {
    canonical: `${siteUrl}/${locale}${suffix}`,
    languages: {
      ro: `${siteUrl}/ro${suffix}`,
      en: `${siteUrl}/en${suffix}`,
      "x-default": `${siteUrl}/en${suffix}`,
    },
  };
}

export function getLocalizedUrl(locale: Locale, path = "") {
  return `${siteUrl}/${locale}${getLocalizedPathSuffix(path)}`;
}

export function buildPublicMetadata({
  description,
  imageAlt,
  locale,
  path = "",
  title,
}: {
  description: string;
  imageAlt: string;
  locale: Locale;
  path?: string;
  title: string;
}): Metadata {
  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, path),
      siteName: "FREE-ARENA",
      images: [{ url: openGraphImageUrl, width: 1200, height: 630, alt: imageAlt }],
      locale: openGraphLocales[locale],
      alternateLocale: getAlternateLocaleCodes(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImageUrl],
    },
  };
}

export function getAlternateLocaleCodes(locale: Locale) {
  return routing.locales
    .filter((item) => item !== locale)
    .map((item) => openGraphLocales[item]);
}

function getLocalizedPathSuffix(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return normalizedPath === "/" ? "" : normalizedPath;
}
