import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { CinematicInteractions } from "@/components/ui/cinematic-interactions";
import roMessages from "../../../../messages/ro.json";
import "../../globals.css";

type FiveMLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020711",
};

export default function FiveMLayout({ children }: FiveMLayoutProps) {
  return (
    <html lang="ro">
      <body>
        <NextIntlClientProvider locale="ro" messages={roMessages}>
          <CinematicInteractions />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
