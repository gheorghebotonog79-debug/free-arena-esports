import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";

type Tone = "cyan" | "red" | "orange" | "green" | "gold" | "discord";
export type TacticalTone = "cs16" | "respawn" | "cs2" | "fivem" | "global";
export type TacticalStatus = "loading" | "offline" | "online" | "pending";

function classes(...values: Array<false | null | string | undefined>) {
  return values.filter(Boolean).join(" ");
}

const toneClasses: Record<Tone, string> = {
  cyan: "border-cyan-200/24 bg-cyan-300/10 text-cyan-100 hover:border-cyan-100/70 hover:bg-cyan-300/16",
  discord: "border-[#98a3ff]/35 bg-[#5865f2]/12 text-white hover:border-[#98a3ff]/70 hover:bg-[#5865f2]/20",
  gold: "border-arena-gold/30 bg-arena-gold/12 text-arena-gold hover:border-arena-gold/65 hover:bg-arena-gold/18",
  green: "border-arena-green/32 bg-arena-green/12 text-arena-green hover:border-arena-green/70 hover:bg-arena-green/18",
  orange: "border-orange-300/30 bg-orange-400/12 text-orange-100 hover:border-orange-200/70 hover:bg-orange-400/18",
  red: "border-arena-red/34 bg-arena-red/12 text-arena-red hover:border-arena-red/70 hover:bg-arena-red/18",
};

const tacticalToneClasses: Record<TacticalTone, string> = {
  cs16: "server-card--cs16",
  cs2: "server-card--cs2",
  fivem: "server-card--fivem",
  global: "server-card--global",
  respawn: "server-card--respawn",
};

export function PublicPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={classes("neon-page-shell cyber-root fa-dark-flame-bg overflow-hidden bg-arena-black text-white", className)}>
      <NeonAtmosphere />
      {children}
    </main>
  );
}

export function PublicSection({
  as = "section",
  children,
  className,
  contained = true,
  id,
}: {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
  contained?: boolean;
  id?: string;
}) {
  const Component = as;

  return (
    <Component
      id={id}
      className={classes("neon-section px-4 py-14 sm:px-6 lg:px-8 lg:py-16", className)}
    >
      {contained ? <div className="mx-auto w-full max-w-7xl">{children}</div> : children}
    </Component>
  );
}

export function PremiumGlassCard({
  as = "div",
  children,
  className,
}: {
  as?: "article" | "aside" | "div" | "section";
  children: ReactNode;
  className?: string;
}) {
  const Component = as;

  return (
    <Component className={classes("premium-card glass-panel neon-hover animated-border rounded-lg p-5 sm:p-6", className)}>
      {children}
    </Component>
  );
}

export function TacticalCardChrome() {
  return (
    <>
      <span className="server-card__backdrop" aria-hidden="true" />
      <span className="server-card__noise" aria-hidden="true" />
      <span className="server-card__scanline" aria-hidden="true" />
      <span className="server-card__shine" aria-hidden="true" />
    </>
  );
}

export function TacticalSection({
  actions,
  children,
  className,
  description,
  eyebrow,
  headingClassName,
  id,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: ReactNode;
  headingClassName?: string;
  id?: string;
  title?: ReactNode;
}) {
  return (
    <section id={id} className={classes("neon-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20", className)}>
      <div className="mx-auto w-full max-w-[92rem]">
        {eyebrow || title || description || actions ? (
          <div className={classes("mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", headingClassName)}>
            <div className="max-w-4xl">
              {eyebrow ? (
                <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="neon-heading mt-5 font-display text-[clamp(2.35rem,5vw,5.2rem)] font-black uppercase leading-[0.88] text-white">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/64">
                  {description}
                </p>
              ) : null}
            </div>
            {actions ? <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function TacticalGrid({
  children,
  className,
  columns = "auto",
}: {
  children: ReactNode;
  className?: string;
  columns?: "auto" | "four" | "three" | "two";
}) {
  const columnClass = {
    auto: "grid gap-5 md:grid-cols-2 2xl:grid-cols-4",
    four: "grid gap-5 md:grid-cols-2 2xl:grid-cols-4",
    three: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
    two: "grid gap-5 lg:grid-cols-2",
  }[columns];

  return <div className={classes(columnClass, className)}>{children}</div>;
}

export function TacticalCard({
  as = "article",
  children,
  className,
  contentClassName,
  occupancy = "low",
  status = "online",
  tone = "cs2",
}: {
  as?: "article" | "aside" | "div" | "section";
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  occupancy?: "high" | "idle" | "low" | "medium";
  status?: TacticalStatus;
  tone?: TacticalTone;
}) {
  const Component = as;

  return (
    <Component
      className={classes(
        "server-tactical-card neon-hover group flex h-full min-w-0 flex-col overflow-hidden p-5 sm:p-6",
        tacticalToneClasses[tone],
        `server-tactical-card--${status}`,
        className,
      )}
      data-occupancy={occupancy}
      data-status={status}
    >
      <TacticalCardChrome />
      <div className={classes("relative z-10 flex h-full min-w-0 flex-col", contentClassName)}>
        {children}
      </div>
    </Component>
  );
}

export function TacticalBadge({
  children,
  className,
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={classes("server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]", className)}>
      {dot ? <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export function TacticalInfoBlock({
  children,
  className,
  Icon,
  label,
  value,
}: {
  children?: ReactNode;
  className?: string;
  Icon?: LucideIcon;
  label: ReactNode;
  value?: ReactNode;
}) {
  return (
    <div className={classes("server-metric min-w-0 p-3", className)}>
      <p className="flex items-center gap-2 text-[0.64rem] font-black uppercase tracking-[0.14em] text-white/34">
        {Icon ? <Icon size={15} className="server-card__accent-icon shrink-0" aria-hidden="true" /> : null}
        {label}
      </p>
      {value ? <div className="mt-2 break-words text-sm font-black uppercase text-white">{value}</div> : children}
    </div>
  );
}

export function TacticalCardHeader({
  badge,
  children,
  className,
  eyebrow,
  Icon,
  title,
}: {
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
  Icon?: LucideIcon;
  title: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-4">
        {Icon ? (
          <span className="server-card__icon grid size-16 shrink-0 place-items-center">
            <Icon size={32} className="server-card__accent-icon" aria-hidden="true" />
          </span>
        ) : null}
        {badge}
      </div>
      {eyebrow ? (
        <p className="server-card__region mt-7 text-xs font-black uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="server-card__title mt-2 font-display text-[clamp(1.75rem,3vw,2.8rem)] font-black uppercase leading-none text-white">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function TacticalActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={classes("mt-auto grid gap-2 pt-6 sm:grid-cols-2", className)}>{children}</div>;
}

export function TacticalStatusBadge({ label }: { label: string }) {
  return <TacticalBadge dot>{label}</TacticalBadge>;
}

export function TacticalTag({ label }: { label: string }) {
  return (
    <span className="server-tag px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
      {label}
    </span>
  );
}

export function CTAButton({
  children,
  className,
  external,
  href,
  tone = "cyan",
  variant = "ghost",
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  external?: boolean;
  tone?: Tone;
  variant?: "glow" | "ghost";
}) {
  const isExternal = external || href?.startsWith("http");

  return (
    <a
      {...props}
      href={href}
      rel={isExternal ? "noopener noreferrer" : props.rel}
      target={isExternal ? "_blank" : props.target}
      className={classes(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition",
        variant === "glow"
          ? "button-glow border border-transparent bg-arena-cyan text-black hover:bg-white"
          : classes("button-ghost border", toneClasses[tone]),
        className,
      )}
    >
      {children}
    </a>
  );
}

export function PublicPageHero({
  actions,
  aside,
  description,
  eyebrow,
  Icon,
  meta,
  title,
}: {
  actions?: ReactNode;
  aside?: ReactNode;
  description: string;
  eyebrow: string;
  Icon?: LucideIcon;
  meta?: string;
  title: string;
}) {
  return (
    <PublicSection className="relative overflow-hidden pb-12 pt-16 sm:pt-20 lg:pb-16 lg:pt-24">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_22%_20%,rgba(0,229,255,0.16),transparent_52%),radial-gradient(circle_at_78%_0%,rgba(255,23,68,0.12),transparent_48%)]" aria-hidden="true" />
      <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.62fr)] lg:items-stretch">
        <div className="min-w-0">
          <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
            {eyebrow}
          </p>
          <h1 className="neon-heading neon-title neon-text-pulse mt-6 max-w-5xl break-words font-display text-[clamp(2.7rem,7.4vw,6.7rem)] font-black uppercase leading-[0.86] text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
            {description}
          </p>
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
        </div>

        {aside ?? (
          <TacticalCard as="aside" tone="cs2" className="min-h-80">
            <TacticalCardHeader
              Icon={Icon}
              badge={<TacticalBadge>FREE-ARENA</TacticalBadge>}
              eyebrow="FREE-ARENA.RO"
              title={meta ?? "Command Center"}
            />
          </TacticalCard>
        )}
      </div>
    </PublicSection>
  );
}
