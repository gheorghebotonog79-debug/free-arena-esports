import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  CTAButton,
  PublicPageHero,
  PublicPageShell,
  TacticalActions,
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalInfoBlock,
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
            <TacticalCard as="aside" tone="cs2" className="min-h-80">
              <TacticalCardHeader
                Icon={Icon}
                badge={<TacticalBadge dot>FREE-ARENA</TacticalBadge>}
                eyebrow="COMMUNITY CHANNEL"
                title="Command Link"
              />
              <div className="mt-6 grid gap-3">
                {highlights.map((highlight, index) => (
                  <TacticalInfoBlock
                    key={highlight}
                    label={`0${index + 1}`}
                    value={highlight}
                  />
                ))}
              </div>
              <TacticalActions className="sm:grid-cols-1">
                <CTAButton
                  external={action.external}
                  href={action.href}
                  variant="glow"
                  className="server-join-button rounded-none"
                >
                  {action.label}
                  <ArrowRight size={17} aria-hidden="true" />
                </CTAButton>
              </TacticalActions>
            </TacticalCard>
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
