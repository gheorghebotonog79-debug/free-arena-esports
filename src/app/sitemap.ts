import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";
import { serverSeoSlugs } from "@/lib/serverSeo";

const lastModified = new Date("2026-05-30");

const serverSeoSitemapPages = serverSeoSlugs.map((slug) => ({
  path: `/server/${slug}`,
  changeFrequency: "weekly" as const,
  priority: 0.85,
}));

const localizedPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/servers", changeFrequency: "daily", priority: 0.9 },
  { path: "/rankings", changeFrequency: "daily", priority: 0.9 },
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
  return routing.locales.flatMap((locale) =>
    localizedPages.map(({ changeFrequency, path, priority }) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ro: `${siteUrl}/ro${path}`,
          en: `${siteUrl}/en${path}`,
          "x-default": `${siteUrl}/ro${path}`,
        },
      },
    })),
  );
}
