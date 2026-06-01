import { ArrowRight, MessageSquare, ShieldCheck, UserPlus } from "lucide-react";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";

const DISCORD_URL = "https://discord.gg/freearena";

const content = {
  ro: {
    apply: "Aplica admin",
    copy:
      "Cautam oameni maturi, activi seara, care pot ajuta jucatorii si pot tine serverele curate.",
    discord: "Discuta pe Discord",
    eyebrow: "Recrutare admini",
    title: "Cautam admini activi",
  },
  en: {
    apply: "Apply admin",
    copy:
      "We are looking for mature people active in the evening who can help players and keep servers clean.",
    discord: "Talk on Discord",
    eyebrow: "Admin recruitment",
    title: "We need active admins",
  },
} as const;

export function StaffRecruitmentSection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section className="neon-section px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <article className="premium-card glass-panel neon-hover animated-border overflow-hidden rounded-lg p-5 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(18rem,0.48fr)] lg:items-center">
            <div>
              <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
                {page.eyebrow}
              </p>
              <h2 className="neon-heading mt-5 max-w-3xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
                {page.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-white/64">
                {page.copy}
              </p>
            </div>

            <div className="grid gap-3">
              <TrackedLink
                className="button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                eventName="click_apply_staff"
                eventPayload={{ location: "homepage_staff_block" }}
                href="/join-staff"
              >
                <UserPlus size={18} aria-hidden="true" />
                {page.apply}
                <ArrowRight size={18} aria-hidden="true" />
              </TrackedLink>
              <TrackedAnchor
                className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-[#98a3ff]/60 hover:bg-[#5865f2]/10"
                eventName="click_join_discord"
                eventPayload={{ location: "homepage_staff_block" }}
                href={DISCORD_URL}
                rel="noreferrer"
                target="_blank"
              >
                <MessageSquare size={18} aria-hidden="true" />
                {page.discord}
              </TrackedAnchor>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[ShieldCheck, UserPlus, MessageSquare].map((Icon, index) => (
              <div key={index} className="server-metric flex items-center gap-3 p-3">
                <Icon size={18} className="text-cyan-200" aria-hidden="true" />
                <span className="text-xs font-black uppercase tracking-[0.13em] text-white/58">
                  {locale === "ro"
                    ? ["Reguli clare", "Aplicare pe forum", "Coordonare pe Discord"][index]
                    : ["Clear rules", "Forum application", "Discord coordination"][index]}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
