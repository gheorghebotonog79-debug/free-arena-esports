import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CinematicInteractions } from "@/components/ui/cinematic-interactions";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const siteUrl = "https://play.free-arena.ro";

const openGraphLocales: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
};

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
    alternates: {
      canonical: `/${safeLocale}`,
      languages: {
        ro: "/ro",
        en: "/en",
        "x-default": "/ro",
      },
    },
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
          url: "/assets/brand/free-arena-icons-preview.png",
          width: 1600,
          height: 900,
          alt: t("imageAlt"),
        },
      ],
      locale: openGraphLocales[safeLocale],
      alternateLocale: routing.locales
        .filter((item) => item !== safeLocale)
        .map((item) => openGraphLocales[item]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      images: ["/assets/brand/free-arena-icons-preview.png"],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
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
