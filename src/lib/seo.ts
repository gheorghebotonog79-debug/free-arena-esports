import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const siteUrl = "https://play.free-arena.ro";
export const openGraphImageUrl = "/og/free-arena-play-og.png";

export const openGraphLocales: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
};

export function getLocalizedAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const suffix = normalizedPath === "/" ? "" : normalizedPath;

  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      ro: `/ro${suffix}`,
      en: `/en${suffix}`,
      "x-default": `/ro${suffix}`,
    },
  };
}

export function getAlternateLocaleCodes(locale: Locale) {
  return routing.locales
    .filter((item) => item !== locale)
    .map((item) => openGraphLocales[item]);
}
