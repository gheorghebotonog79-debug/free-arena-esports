"use client";

import { ArrowRight, LifeBuoy } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { routes } from "@/lib/routes";
import type { PublicServerSlug } from "@/lib/servers";

type ServerContactSupportCardProps = {
  cta: string;
  eyebrow: string;
  location: string;
  serverKey: PublicServerSlug;
  text: string;
  title: string;
};

export function ServerContactSupportCard({
  cta,
  eyebrow,
  location,
  serverKey,
  text,
  title,
}: ServerContactSupportCardProps) {
  return (
    <section className="server-tactical-card neon-hover server-card--global server-tactical-card--online p-5 sm:p-6" data-occupancy="low" data-status="online">
      <span className="server-card__backdrop" aria-hidden="true" />
      <span className="server-card__noise" aria-hidden="true" />
      <span className="server-card__scanline" aria-hidden="true" />
      <span className="server-card__shine" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 gap-4">
          <span className="server-card__icon grid size-14 shrink-0 place-items-center">
            <LifeBuoy size={28} className="server-card__accent-icon" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="server-card__region text-xs font-black uppercase tracking-[0.18em]">
              {eyebrow}
            </p>
            <h2 className="server-card__title mt-2 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-black uppercase leading-none text-white">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/64">
              {text}
            </p>
          </div>
        </div>
        <TrackedLink
          className="server-join-button inline-flex min-h-12 shrink-0 items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition md:min-w-44"
          eventName="click_contact"
          eventPayload={{ location, server: serverKey }}
          href={routes.contact}
        >
          {cta}
          <ArrowRight size={15} aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}
