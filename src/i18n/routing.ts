import { defineRouting } from "next-intl/routing";

export const locales = ["ro", "en"] as const;
export const defaultLocale = "ro";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
  alternateLinks: false,
});

export type Locale = (typeof locales)[number];
