import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CinematicInteractions } from "@/components/ui/cinematic-interactions";
import { routing } from "@/i18n/routing";
import {
  getAlternateLocaleCodes,
  getLocalizedAlternates,
  openGraphImageUrl,
  openGraphLocales,
  siteUrl,
} from "@/lib/seo";
import "../../globals.css";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: t("template"),
    },
    description: t("description"),
    applicationName: "FREE-ARENA.RO",
    alternates: getLocalizedAlternates(safeLocale),
    icons: {
      icon: "/assets/game-icons/CS.png",
    },
    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      url: `${siteUrl}/${safeLocale}`,
      siteName: "FREE-ARENA.RO",
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: t("imageAlt"),
        },
      ],
      locale: openGraphLocales[safeLocale],
      alternateLocale: getAlternateLocaleCodes(safeLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      images: [openGraphImageUrl],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020711",
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CinematicInteractions />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
