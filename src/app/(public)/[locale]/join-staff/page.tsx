import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JoinStaffLanding } from "@/components/staff/JoinStaffLanding";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { routing, type Locale } from "@/i18n/routing";
import { buildPublicMetadata } from "@/lib/seo";

type JoinStaffPageProps = {
  params: Promise<{ locale: string }>;
};

const metadataContent: Record<Locale, { description: string; title: string }> = {
  ro: {
    title: "Aplicare admin FREE-ARENA | Recrutare staff CS",
    description:
      "Aplica pentru staff FREE-ARENA daca esti activ seara, matur, prezent pe Discord si vrei sa ajuti comunitatea CS 1.6 si CS2.",
  },
  en: {
    title: "Join FREE-ARENA Staff | CS admin recruitment",
    description:
      "Apply for FREE-ARENA staff if you are active in the evening, mature, present on Discord, and want to help the CS 1.6 and CS2 community.",
  },
};

export async function generateMetadata({ params }: JoinStaffPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const page = metadataContent[safeLocale];

  return buildPublicMetadata({
    description: page.description,
    imageAlt: "FREE-ARENA staff recruitment",
    locale: safeLocale,
    path: "/join-staff",
    title: page.title,
  });
}

export default async function JoinStaffPage({ params }: JoinStaffPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <JoinStaffLanding locale={locale} />
      <SiteFooter />
    </>
  );
}
