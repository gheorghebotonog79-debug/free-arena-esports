import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Disc3, MessageSquare, WalletCards } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { communityPillars } from "@/data/platform";
import { routes } from "@/lib/routes";

export function CommunitySection() {
  return (
    <section id="community" className="bg-[#080808] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow="Community layer"
            title="Ready for accounts, VIP, and operations"
            copy="The interface is organized around reusable data modules that can receive authenticated player state when the backend arrives."
          />

          <MotionReveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={routes.community}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-arena-green"
              >
                <Disc3 size={18} aria-hidden="true" />
                Community hub
              </Link>
              <Link
                href={routes.servers}
                className="inline-flex items-center gap-2 rounded-lg border border-white/14 bg-white/[0.04] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-green/60 hover:bg-arena-green/10"
              >
                Server stack
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </MotionReveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {communityPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <MotionReveal key={pillar.title} delay={index * 0.07}>
                <article className="h-full rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`grid size-12 place-items-center rounded-lg ${pillar.iconClass}`}>
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <BadgeCheck size={20} className="text-arena-green" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-black text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">{pillar.copy}</p>
                </article>
              </MotionReveal>
            );
          })}

          <MotionReveal delay={0.28} className="sm:col-span-2">
            <article className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <Image
                src="/assets/brand/free-arena-icons-preview.png"
                alt="FREE-ARENA.RO generated game icons"
                width={150}
                height={84}
                className="h-24 w-full rounded-lg object-cover sm:h-20 sm:w-36"
              />
              <div>
                <h3 className="font-display text-2xl font-black text-white">Generated asset pack installed</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Game icons are available locally under public assets for pages, dashboards,
                  rankings, and server identity.
                </p>
              </div>
              <div className="flex gap-2 sm:flex-col">
                <span className="inline-flex items-center gap-2 rounded-lg bg-black/28 px-3 py-2 text-sm font-bold text-white/70">
                  <MessageSquare size={17} className="text-arena-cyan" aria-hidden="true" />
                  Chat
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-black/28 px-3 py-2 text-sm font-bold text-white/70">
                  <WalletCards size={17} className="text-arena-gold" aria-hidden="true" />
                  Store
                </span>
              </div>
            </article>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
