import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://free-arena.ro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FREE-ARENA.RO | Esports Platform",
    template: "%s | FREE-ARENA.RO",
  },
  description:
    "FREE-ARENA.RO esports hub for competitive servers, tournaments, rankings, and community events.",
  applicationName: "FREE-ARENA.RO",
  icons: {
    icon: "/assets/game-icons/CS.png",
  },
  openGraph: {
    title: "FREE-ARENA.RO Esports Platform",
    description:
      "Competitive server network, tournaments, rankings, and community tools for FREE-ARENA.RO.",
    url: siteUrl,
    siteName: "FREE-ARENA.RO",
    images: [
      {
        url: "/assets/brand/free-arena-icons-preview.png",
        width: 1600,
        height: 900,
        alt: "FREE-ARENA.RO esports icon pack preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FREE-ARENA.RO Esports Platform",
    description:
      "Competitive server network, tournaments, rankings, and community tools for FREE-ARENA.RO.",
    images: ["/assets/brand/free-arena-icons-preview.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
