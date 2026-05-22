import type { Metadata, Viewport } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: {
    default: "FREE-ARENA.RO Admin",
    template: "%s | FREE-ARENA.RO Admin",
  },
  description: "Protected FREE-ARENA.RO operations dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020711",
};

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
