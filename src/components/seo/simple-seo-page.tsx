import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  CTAButton,
  PremiumGlassCard,
  PublicPageHero,
  PublicPageShell,
} from "@/components/public/PublicPagePrimitives";

type SimpleSeoPageProps = {
  action: {
    external?: boolean;
    href: string;
    label: string;
  };
  description: string;
  eyebrow: string;
  highlights: readonly string[];
  Icon: LucideIcon;
  title: string;
};

export function SimpleSeoPage({
  action,
  description,
  eyebrow,
  highlights,
  Icon,
  title,
}: SimpleSeoPageProps) {
  return (
    <>
      <SiteHeader />
      <PublicPageShell>
        <PublicPageHero
          Icon={Icon}
          actions={(
            <CTAButton
              external={action.external}
              href={action.href}
              variant="glow"
            >
              {action.label}
              <ArrowRight size={17} aria-hidden="true" />
            </CTAButton>
          )}
          aside={(
            <PremiumGlassCard as="aside" className="relative overflow-hidden p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,229,255,0.17),transparent_40%),radial-gradient(circle_at_88%_86%,rgba(255,23,68,0.14),transparent_42%)]" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-4 border-b border-cyan-300/14 pb-5">
                  <span className="neon-icon-cell grid size-16 place-items-center">
                    <Icon size={34} className="text-cyan-200" aria-hidden="true" />
                  </span>
                  <p className="font-display text-2xl font-black uppercase text-white">
                    FREE-ARENA
                  </p>
                </div>
                <ul className="mt-5 grid gap-3">
                  {highlights.map((highlight) => (
                    <li
                      className="rounded-lg border border-white/10 bg-black/26 p-4 text-sm font-semibold leading-6 text-white/66"
                      key={highlight}
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </PremiumGlassCard>
          )}
          description={description}
          eyebrow={eyebrow}
          title={title}
        />
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
