"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Check,
  Crown,
  Gem,
  Headphones,
  Mail,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Star,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { forumLinks } from "@/lib/forum-links";
import {
  vipPackageOrder,
  vipShopContact,
  vipShopContent,
  type VipPackage,
  type VipPackageTone,
  type VipTierKey,
} from "@/data/vip-shop";

const DISCORD_TICKET_URL = "https://discord.gg/freearena";
const PRIMARY_SERVER_CONNECT_URL = "steam://connect/217.156.22.74:27015";

const tierIcons: Record<VipTierKey, LucideIcon> = {
  queen: Crown,
  gold: Star,
  diamond: Gem,
};

const toneClasses: Record<
  VipPackageTone,
  {
    accent: string;
    badge: string;
    border: string;
    glow: string;
    icon: string;
    price: string;
  }
> = {
  queen: {
    accent: "from-fuchsia-500/24 via-pink-500/10 to-transparent",
    badge: "border-fuchsia-300/35 bg-fuchsia-400/12 text-fuchsia-100",
    border: "border-fuchsia-300/24 hover:border-fuchsia-200/55",
    glow: "shadow-[0_0_42px_rgba(217,70,239,0.18)]",
    icon: "border-fuchsia-300/35 bg-fuchsia-400/14 text-fuchsia-100",
    price: "text-fuchsia-100",
  },
  gold: {
    accent: "from-orange-500/28 via-yellow-400/12 to-transparent",
    badge: "border-orange-300/45 bg-orange-400/16 text-orange-100",
    border: "border-orange-300/30 hover:border-orange-200/65",
    glow: "shadow-[0_0_48px_rgba(251,146,60,0.22)]",
    icon: "border-orange-300/40 bg-orange-400/16 text-orange-100",
    price: "text-orange-100",
  },
  diamond: {
    accent: "from-cyan-400/26 via-sky-500/12 to-transparent",
    badge: "border-cyan-200/45 bg-cyan-300/14 text-cyan-100",
    border: "border-cyan-200/32 hover:border-cyan-100/70",
    glow: "shadow-[0_0_52px_rgba(34,211,238,0.2)]",
    icon: "border-cyan-200/42 bg-cyan-300/14 text-cyan-100",
    price: "text-cyan-100",
  },
};

const packageMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    transition: { delay: index * 0.08, duration: 0.45 },
    y: 0,
  }),
};

const sectionMotion = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.08 },
    y: 0,
  },
};

const panelMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: (index = 0) => ({
    opacity: 1,
    transition: { delay: index * 0.07, duration: 0.42 },
    y: 0,
  }),
};

export function VipShopLanding({ locale }: { locale: Locale }) {
  const page = vipShopContent[locale];

  return (
    <main className="neon-page-shell cyber-root overflow-hidden bg-arena-black text-white">
      <section className="relative isolate border-b border-cyan-300/14 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,45,117,0.22),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(0,229,255,0.2),transparent_30%),linear-gradient(140deg,rgba(255,122,0,0.14),transparent_42%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070d] to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.62fr)] lg:items-center">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.hero.eyebrow}
            </p>
            <h1 className="neon-heading neon-title neon-text-pulse mt-6 max-w-5xl font-display text-[clamp(3rem,9vw,7rem)] font-black uppercase leading-[0.84] text-white">
              {page.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              {page.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#vip-packages"
                className="button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-cyan-200"
              >
                <ArrowDown size={18} aria-hidden="true" />
                {page.hero.packages}
              </a>
              <TrackedAnchor
                href={DISCORD_TICKET_URL}
                target="_blank"
                rel="noreferrer"
                eventName="click_join_discord"
                eventPayload={{ location: "shop_hero_ticket" }}
                className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-200/24 bg-cyan-300/8 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan-100/70 hover:bg-cyan-300/14"
              >
                <MessageSquare size={18} aria-hidden="true" />
                {page.hero.ticket}
              </TrackedAnchor>
            </div>
          </div>

          <motion.aside
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="premium-card glass-panel neon-hover relative rounded-lg border border-cyan-200/22 p-5"
            data-motion-card="true"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_20%_18%,rgba(255,45,117,0.22),transparent_36%),radial-gradient(circle_at_84%_82%,rgba(0,229,255,0.2),transparent_38%)]" aria-hidden="true" />
            <div className="relative">
              <span className="grid size-16 place-items-center rounded-lg border border-orange-300/30 bg-orange-400/12 text-orange-100">
                <Sparkles size={30} aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                Gold / Diamond
              </p>
              <h2 className="mt-2 font-display text-4xl font-black uppercase text-white">
                VIP Boost
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
                {locale === "ro"
                  ? "Alegi pachetul, ne contactezi pe forum sau Discord, iar activarea se face dupa confirmare."
                  : "Choose a package, contact us on forum or Discord, and activation is handled after confirmation."}
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <motion.section
        className="neon-section px-4 py-16 sm:px-6 lg:px-8"
        initial="hidden"
        variants={sectionMotion}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <motion.article
            className="premium-card glass-panel neon-hover animated-border relative overflow-hidden rounded-lg border border-arena-green/24 p-5 sm:p-6"
            data-motion-card="true"
            variants={panelMotion}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(57,255,136,0.16),transparent_34%),radial-gradient(circle_at_88%_75%,rgba(0,229,255,0.14),transparent_38%)]" aria-hidden="true" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-green">
                {page.trial.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase text-white sm:text-5xl">
                {page.trial.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-white/64">
                {page.trial.copy}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="rounded-lg border border-arena-green/24 bg-arena-green/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-arena-green">
                    {page.trial.commandTitle}
                  </p>
                  <p className="mt-3 font-display text-4xl font-black text-white">
                    {page.trial.command}
                  </p>
                  <TrackedAnchor
                    className="button-glow mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-arena-green px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-cyan-100"
                    eventName="click_play_now"
                    eventPayload={{ location: "shop_testvip", server: "cs16-classic" }}
                    href={PRIMARY_SERVER_CONNECT_URL}
                  >
                    {page.trial.cta}
                  </TrackedAnchor>
                </div>

                <ul className="grid gap-3">
                  {page.trial.items.map((item) => (
                    <li key={item} className="server-metric flex gap-3 p-3 text-sm font-semibold leading-6 text-white/68">
                      <Check size={17} className="mt-1 shrink-0 text-arena-green" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 rounded-lg border border-white/10 bg-black/24 p-3 text-xs font-semibold leading-6 text-white/50">
                {page.trial.note}
              </p>
            </div>
          </motion.article>

          <motion.article
            className="premium-card glass-panel neon-hover animated-border rounded-lg border border-cyan-200/24 p-5 sm:p-6"
            custom={1}
            data-motion-card="true"
            variants={panelMotion}
          >
            <span className="grid size-14 place-items-center rounded-lg border border-cyan-200/34 bg-cyan-300/12 text-cyan-100">
              <Headphones size={26} aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-4xl font-black uppercase text-white">
              {page.trial.vipTsTitle}
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
              {page.trial.vipTsCopy}
            </p>
            <ul className="mt-6 grid gap-3">
              {page.trial.vipTsBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm font-semibold leading-6 text-white/68">
                  <Check size={17} className="mt-1 shrink-0 text-cyan-200" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <TrackedAnchor
              className="button-ghost mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-cyan-200/18 bg-cyan-300/8 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan-100/70 hover:bg-cyan-300/14"
              eventName="click_play_now"
              eventPayload={{ location: "shop_vipts" }}
              href={PRIMARY_SERVER_CONNECT_URL}
            >
              {page.trial.vipTsCta}
            </TrackedAnchor>
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        className="neon-section scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8"
        id="vip-packages"
        initial="hidden"
        variants={sectionMotion}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-3">
          {vipPackageOrder.map((tier, index) => {
            const vipPackage = page.packages[tier];
            return (
              <VipPackageCard
                key={tier}
                index={index}
                tier={tier}
                vipPackage={vipPackage}
                locale={locale}
              />
            );
          })}
        </div>
      </motion.section>

      <motion.section
        className="neon-section px-4 pb-16 sm:px-6 lg:px-8"
        initial="hidden"
        variants={sectionMotion}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <motion.article className="premium-card glass-panel neon-hover animated-border rounded-lg border border-cyan-200/22 p-5 sm:p-6" data-motion-card="true" variants={panelMotion}>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              FREE-ARENA VIP
            </p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase text-white">
              {page.activation.title}
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
              {page.activation.copy}
            </p>
            <ol className="mt-6 grid gap-3">
              {page.activation.steps.map((step, index) => (
                <li key={step} className="server-metric flex items-center gap-3 p-3 text-sm font-semibold leading-6 text-white/68">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-cyan-300/22 bg-cyan-300/10 font-display text-sm font-black text-cyan-200">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </motion.article>

          <motion.article className="premium-card glass-panel neon-hover animated-border rounded-lg border border-fuchsia-300/22 p-5 sm:p-6" custom={1} data-motion-card="true" variants={panelMotion}>
            <span className="grid size-14 place-items-center rounded-lg border border-fuchsia-300/35 bg-fuchsia-400/14 text-fuchsia-100">
              <Sparkles size={26} aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-4xl font-black uppercase text-white">
              {page.activation.customTitle}
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
              {page.activation.customCopy}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <TrackedAnchor
                className="button-glow inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                eventName="click_shop_vip"
                eventPayload={{ location: "shop_custom_contact", channel: "discord" }}
                href={DISCORD_TICKET_URL}
                rel="noreferrer"
                target="_blank"
              >
                {page.activation.customCta}
              </TrackedAnchor>
              <TrackedAnchor
                className="button-ghost inline-flex min-h-12 items-center justify-center rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan-100/70 hover:bg-cyan-300/12"
                eventName="click_forum"
                eventPayload={{ location: "shop_custom_contact" }}
                href={forumLinks.vipRequests}
                rel="noreferrer"
                target="_blank"
              >
                {page.activation.forumCta}
              </TrackedAnchor>
            </div>
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        className="neon-section px-4 pb-16 sm:px-6 lg:px-8"
        initial="hidden"
        variants={sectionMotion}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <motion.article className="premium-card glass-panel neon-hover animated-border rounded-lg border border-orange-300/20 p-5 sm:p-6" custom={0} data-motion-card="true" variants={panelMotion}>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-lg border border-orange-300/30 bg-orange-400/12 text-orange-100">
                <ShieldAlert size={22} aria-hidden="true" />
              </span>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                {page.importantNotes.title}
              </h2>
            </div>
            <ul className="mt-6 grid gap-3">
              {page.importantNotes.items.map((note) => (
                <li key={note} className="flex gap-3 text-sm font-semibold leading-6 text-white/66">
                  <Zap size={16} className="mt-1 shrink-0 text-orange-200" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article className="premium-card glass-panel neon-hover animated-border rounded-lg border border-cyan-200/24 p-5 sm:p-6" custom={1} data-motion-card="true" variants={panelMotion}>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              FREE-ARENA
            </p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase text-white">
              {page.cta.title}
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
              {locale === "ro"
                ? "Nu există checkout automat încă. Cumpărarea se face prin ticket pe Discord, cu confirmare manuală și activare pe server."
                : "There is no automatic checkout yet. Purchase is handled through a Discord ticket with manual confirmation and server activation."}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <TrackedAnchor className="button-glow inline-flex min-h-12 items-center justify-center rounded-lg bg-orange-400 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-orange-200" eventName="click_shop_vip" eventPayload={{ location: "shop_cta", package: "gold" }} href={DISCORD_TICKET_URL} rel="noreferrer" target="_blank">
                {page.cta.gold}
              </TrackedAnchor>
              <TrackedAnchor className="button-glow inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-cyan-100" eventName="click_shop_vip" eventPayload={{ location: "shop_cta", package: "diamond" }} href={DISCORD_TICKET_URL} rel="noreferrer" target="_blank">
                {page.cta.diamond}
              </TrackedAnchor>
              <TrackedAnchor className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan-100/70 hover:bg-cyan-300/12" eventName="click_join_discord" eventPayload={{ location: "shop_cta" }} href={DISCORD_TICKET_URL} rel="noreferrer" target="_blank">
                <MessageSquare size={16} aria-hidden="true" />
                {page.cta.discord}
              </TrackedAnchor>
            </div>
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        className="neon-section px-4 pb-20 sm:px-6 lg:px-8"
        initial="hidden"
        variants={sectionMotion}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.article className="premium-card glass-panel neon-hover animated-border overflow-hidden rounded-lg border border-cyan-200/24 p-5 sm:p-6 lg:p-8" data-motion-card="true" variants={panelMotion}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                  FREE-ARENA SUPPORT
                </p>
                <h2 className="mt-3 font-display text-4xl font-black uppercase text-white sm:text-5xl">
                  {page.support.title}
                </h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
                  {page.support.copy}
                </p>
                <ul className="mt-6 grid gap-3">
                  {page.support.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-white/68">
                      <Check size={17} className="mt-1 shrink-0 text-arena-green" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <SupportCard
                  Icon={Headphones}
                  copy={page.support.teamSpeakCopy}
                  cta={page.support.teamSpeakCta}
                  href={vipShopContact.teamSpeakHref}
                  index={0}
                  label={vipShopContact.teamSpeakAddress}
                  title={page.support.teamSpeakTitle}
                />
                <SupportCard
                  Icon={Mail}
                  copy={page.support.emailCopy}
                  cta={page.support.emailCta}
                  href={vipShopContact.emailHref}
                  index={1}
                  label={vipShopContact.email}
                  title={page.support.emailTitle}
                />
              </div>
            </div>
          </motion.article>
        </div>
      </motion.section>
    </main>
  );
}

function VipPackageCard({
  index,
  locale,
  tier,
  vipPackage,
}: {
  index: number;
  locale: Locale;
  tier: VipTierKey;
  vipPackage: VipPackage;
}) {
  const Icon = tierIcons[tier];
  const tone = toneClasses[vipPackage.tone];

  return (
    <motion.article
      className={`premium-card glass-panel neon-hover relative flex min-h-full flex-col overflow-hidden rounded-lg border p-5 ${tone.border} ${tone.glow}`}
      custom={index}
      data-motion-card="true"
      initial="hidden"
      viewport={{ once: true, amount: 0.25 }}
      variants={packageMotion}
      whileInView="visible"
      whileHover={{ y: -6 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${tone.accent}`} aria-hidden="true" />
      <div className="relative flex min-h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className={`grid size-14 place-items-center rounded-lg border ${tone.icon}`}>
            <Icon size={26} aria-hidden="true" />
          </span>
          {vipPackage.badge ? (
            <span className={`rounded-lg border px-3 py-1 text-[0.64rem] font-black uppercase tracking-[0.14em] ${tone.badge}`}>
              {vipPackage.badge}
            </span>
          ) : null}
        </div>

        <h2 className="mt-5 font-display text-4xl font-black uppercase text-white">
          {vipPackage.name}
        </h2>
        <p className={`mt-2 font-display text-3xl font-black uppercase ${tone.price}`}>
          {vipPackage.price}
        </p>
        <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
          {vipPackage.purpose}
        </p>

        <ul className="mt-6 grid gap-3">
          {vipPackage.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-sm font-semibold leading-6 text-white/70">
              <Check size={17} className="mt-1 shrink-0 text-arena-green" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {vipPackage.limitations ? (
          <div className="mt-6 rounded-lg border border-white/10 bg-black/26 p-4">
            <ul className="grid gap-2">
              {vipPackage.limitations.map((limitation) => (
                <li key={limitation} className="flex gap-2 text-xs font-semibold leading-5 text-white/46">
                  <X size={14} className="mt-0.5 shrink-0 text-arena-red" aria-hidden="true" />
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-auto grid gap-2 pt-6">
          <TrackedAnchor
            className="button-ghost inline-flex min-h-12 items-center justify-center rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan-100/70 hover:bg-cyan-300/12"
            eventName="click_shop_vip"
            eventPayload={{ location: "shop_package_card", package: tier }}
            href={DISCORD_TICKET_URL}
            rel="noreferrer"
            target="_blank"
          >
            {vipPackage.cta}
          </TrackedAnchor>
          <TrackedAnchor
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-cyan-200/14 bg-cyan-300/8 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-cyan-100 transition hover:border-cyan-100/70 hover:bg-cyan-300/14"
            eventName="click_forum"
            eventPayload={{ location: "shop_package_card_secondary", package: tier }}
            href={forumLinks.vipRequests}
            rel="noreferrer"
            target="_blank"
          >
            {locale === "ro" ? "Intreaba pe forum" : "Ask on forum"}
          </TrackedAnchor>
        </div>
      </div>
    </motion.article>
  );
}

function SupportCard({
  copy,
  cta,
  href,
  Icon,
  index,
  label,
  title,
}: {
  copy: string;
  cta: string;
  href: string;
  Icon: LucideIcon;
  index: number;
  label: string;
  title: string;
}) {
  return (
    <motion.div
      className="premium-card glass-panel neon-hover animated-border rounded-lg border border-white/10 bg-black/30 p-4"
      custom={index}
      data-motion-card="true"
      variants={panelMotion}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan-200/30 bg-cyan-300/10 text-cyan-100">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-black uppercase text-white">
            {title}
          </h3>
          <p className="mt-2 break-words text-sm font-black text-cyan-100">
            {label}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
        {copy}
      </p>
      <TrackedAnchor
        className="button-ghost mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/14 bg-white/[0.055] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan-100/70 hover:bg-cyan-300/12"
        eventName={href.startsWith("ts3server") ? "click_teamspeak" : "click_shop_vip"}
        eventPayload={{ location: "shop_support", title }}
        href={href}
      >
        {cta}
      </TrackedAnchor>
    </motion.div>
  );
}
