import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl = "https://free-arena.ro";
const languages = {
  ro: `${siteUrl}/ro`,
  en: `${siteUrl}/en`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date("2026-05-20"),
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages,
    },
  }));
}
