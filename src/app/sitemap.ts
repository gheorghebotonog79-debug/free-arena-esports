import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";

const languages = {
  ro: `${siteUrl}/ro`,
  en: `${siteUrl}/en`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/terms", "/privacy"] as const;

  return routing.locales.flatMap((locale) =>
    pages.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: path ? "monthly" : "weekly",
      priority: path ? 0.6 : 1,
      alternates: {
        languages: {
          ro: `${siteUrl}/ro${path}`,
          en: `${siteUrl}/en${path}`,
          "x-default": `${siteUrl}/ro${path}`,
          ...(!path ? languages : {}),
        },
      },
    })),
  );
}
