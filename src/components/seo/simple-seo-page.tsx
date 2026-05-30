import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { NeonAtmosphere } from "@/components/effects/NeonAtmosphere";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

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
      <main className="neon-page-shell cyber-root">
        <NeonAtmosphere />
        <section className="neon-section px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="neon-kicker section-badge-label px-4 py-2">
                {eyebrow}
              </p>
              <h1 className="neon-heading neon-title neon-text-pulse mt-5 max-w-4xl font-display text-[clamp(2.6rem,7vw,6rem)] font-black uppercase leading-[0.88] text-white">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/62">
                {description}
              </p>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                className="button-glow mt-8 inline-flex items-center gap-2 rounded-lg border border-transparent bg-arena-cyan px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                {action.label}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>

            <div className="neon-panel neon-border neon-scanline hud-frame p-5">
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
                    className="border border-white/10 bg-black/26 p-4 text-sm font-semibold leading-6 text-white/66"
                    key={highlight}
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}
