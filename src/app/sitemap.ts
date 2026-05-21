import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://free-arena.ro",
      lastModified: new Date("2026-05-20"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
