import {
  CalendarDays,
  Headphones,
  ShieldCheck,
  Trophy,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalGrid,
  TacticalSection,
} from "@/components/public/PublicPagePrimitives";
import type { Locale } from "@/i18n/routing";
import type { ServerSeoFeatureKey, ServerSeoPageData } from "@/lib/serverSeo";

type ServerFeatureGridProps = {
  label: string;
  locale: Locale;
  page: ServerSeoPageData;
  title: string;
};

const featureIcons: Record<ServerSeoFeatureKey, LucideIcon> = {
  antiCheat: ShieldCheck,
  activeAdmins: UsersRound,
  fastSupport: Headphones,
  events: CalendarDays,
  stableServers: Zap,
  rankings: Trophy,
};

export function ServerFeatureGrid({ label, locale, page, title }: ServerFeatureGridProps) {
  const features = page.features[locale];

  return (
    <TacticalSection
      className="pb-14"
      eyebrow={label}
      title={title}
    >
        <TacticalGrid columns="three">
          {features.map(({ description, key, title: featureTitle }) => {
            const Icon = featureIcons[key];

            return (
              <TacticalCard key={key} tone={key === "antiCheat" ? "respawn" : key === "events" ? "cs16" : "cs2"} className="min-h-72">
                <TacticalCardHeader
                  Icon={Icon}
                  badge={<TacticalBadge>CORE</TacticalBadge>}
                  eyebrow="FREE-ARENA.RO"
                  title={featureTitle}
                />
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {description}
                </p>
              </TacticalCard>
            );
          })}
        </TacticalGrid>
    </TacticalSection>
  );
}
