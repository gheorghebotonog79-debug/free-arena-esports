import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { VipShopLanding } from "@/components/shop/VipShopLanding";
import { vipShopContent } from "@/data/vip-shop";
import { routing } from "@/i18n/routing";
import { buildPublicMetadata } from "@/lib/seo";

type ShopPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const page = vipShopContent[safeLocale];

  return buildPublicMetadata({
    description: page.metadata.description,
    imageAlt: "FREE-ARENA VIP Shop",
    locale: safeLocale,
    path: "/shop",
    title: page.metadata.title,
  });
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <VipShopLanding locale={locale} />
      <SiteFooter />
    </>
  );
}
