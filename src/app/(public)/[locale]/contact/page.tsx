import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactCommandCenter } from "@/components/contact/ContactCommandCenter";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { contactCommandCenterContent } from "@/data/contact-command-center";
import { routing } from "@/i18n/routing";
import { buildPublicMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const page = contactCommandCenterContent[safeLocale];

  return buildPublicMetadata({
    description: page.metadata.description,
    imageAlt: "FREE-ARENA Contact",
    locale: safeLocale,
    path: "/contact",
    title: page.metadata.title,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <ContactCommandCenter locale={locale} />
      <SiteFooter />
    </>
  );
}
