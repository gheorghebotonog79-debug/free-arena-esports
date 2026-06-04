import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";

type Tone = "cyan" | "red" | "orange" | "green" | "gold" | "discord";

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
          <PremiumGlassCard as="aside" className="relative min-h-64 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,229,255,0.18),transparent_38%),radial-gradient(circle_at_88%_88%,rgba(255,23,68,0.16),transparent_42%)]" aria-hidden="true" />
            <div className="relative">
              <span className="grid size-16 place-items-center rounded-lg border border-cyan-300/24 bg-cyan-300/10 text-cyan-100">
                {Icon ? <Icon size={31} aria-hidden="true" /> : null}
              </span>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                FREE-ARENA.RO
              </p>
              <h2 className="mt-2 font-display text-4xl font-black uppercase text-white">
                {meta ?? "Command Center"}
              </h2>
            </div>
          </PremiumGlassCard>
        )}
      </div>
    </PublicSection>
  );
}
