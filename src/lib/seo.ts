import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const siteUrl = "https://play.free-arena.ro";
export const openGraphImageUrl = "/og-image.png";

export const openGraphLocales: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
};

export function getLocalizedAlternates(
  locale: Locale,
  path = "",
  availableLocales: readonly Locale[] = routing.locales,
): Metadata["alternates"] {
  const suffix = getLocalizedPathSuffix(path);
  const languages = Object.fromEntries(
    availableLocales.map((availableLocale) => [availableLocale, `${siteUrl}/${availableLocale}${suffix}`]),
  );
  const defaultLocale = availableLocales.includes("en") ? "en" : availableLocales[0] ?? routing.defaultLocale;

  languages["x-default"] = `${siteUrl}/${defaultLocale}${suffix}`;

  return {
    canonical: `${siteUrl}/${locale}${suffix}`,
    languages,
  };
}

export function getLocalizedUrl(locale: Locale, path = "") {
  return `${siteUrl}/${locale}${getLocalizedPathSuffix(path)}`;
}

export function buildPublicMetadata({
  availableLocales,
  description,
  imageAlt,
  locale,
  path = "",
  title,
}: {
  availableLocales?: readonly Locale[];
  description: string;
  imageAlt: string;
  locale: Locale;
  path?: string;
  title: string;
}): Metadata {
  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, path, availableLocales),
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, path),
      siteName: "FREE-ARENA",
      images: [{ url: openGraphImageUrl, width: 1200, height: 630, alt: imageAlt }],
      locale: openGraphLocales[locale],
      alternateLocale: getAlternateLocaleCodes(locale, availableLocales),
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

export function getAlternateLocaleCodes(locale: Locale, availableLocales: readonly Locale[] = routing.locales) {
  return availableLocales
    .filter((item) => item !== locale)
    .map((item) => openGraphLocales[item]);
}

function getLocalizedPathSuffix(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return normalizedPath === "/" ? "" : normalizedPath;
}
