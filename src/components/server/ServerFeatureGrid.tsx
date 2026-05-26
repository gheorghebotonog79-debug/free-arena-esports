import {
  CalendarDays,
  Headphones,
  ShieldCheck,
  Trophy,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
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
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-green">
              {label}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase text-white">
              {title}
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ description, key, title: featureTitle }) => {
            const Icon = featureIcons[key];

            return (
              <article key={key} className="premium-card glass-panel h-full rounded-lg p-5">
                <span className="grid size-12 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10">
                  <Icon size={22} className="text-cyan-200" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-black uppercase text-white">
                  {featureTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
