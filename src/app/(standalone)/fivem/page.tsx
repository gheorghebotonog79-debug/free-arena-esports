import type { Metadata } from "next";
import { FiveMPortalPage, fiveMFaqItems } from "@/components/fivem/FiveMPortalPage";
import { openGraphImageUrl, siteUrl } from "@/lib/seo";

const pageUrl = `${siteUrl}/fivem`;

export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FREE-ARENA FiveM | GTA V Roleplay Romania",
  description:
    "Pagina oficiala FREE-ARENA FiveM pentru GTA V Roleplay Romania: status, whitelist, reguli, Discord, staff si update-uri.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "x-default": pageUrl,
    },
  },
  applicationName: "FREE-ARENA",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "FREE-ARENA FiveM",
    description:
      "Server FiveM / GTA V Roleplay in pregatire pentru comunitatea FREE-ARENA. Whitelist, reguli, Discord si update-uri.",
    url: pageUrl,
    siteName: "FREE-ARENA",
    images: [{ url: openGraphImageUrl, width: 1200, height: 630, alt: "FREE-ARENA FiveM GTA V Roleplay" }],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FREE-ARENA FiveM",
    description: "Pagina oficiala FREE-ARENA FiveM pentru GTA V Roleplay Romania.",
    images: [openGraphImageUrl],
  },
};

export default function FiveMPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      name: "FREE-ARENA FiveM",
      description:
        "Pagina oficiala FREE-ARENA FiveM pentru GTA V Roleplay Romania: status, whitelist, reguli, Discord, staff si update-uri.",
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: fiveMFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <FiveMPortalPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
