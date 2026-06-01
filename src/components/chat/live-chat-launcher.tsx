"use client";

import { useEffect, useState } from "react";
import {
  ExternalLink,
  Headphones,
  MessageCircle,
  MessagesSquare,
  Radio,
  ShieldCheck,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";

const DISCORD_URL = "https://discord.gg/freearena";
const FORUM_URL = "https://free-arena.ro";
const TEAMSPEAK_URL = "ts3server://ts.free-arena.ro";

export function LiveChatLauncher() {
  const t = useTranslations("LiveChat");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? t("launcher.close") : t("launcher.open")}
        onClick={() => setIsOpen((current) => !current)}
        className="button-glow fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-lg border border-arena-cyan/40 bg-arena-cyan text-black shadow-[0_0_42px_rgba(0,216,255,0.36)] transition hover:scale-[1.04] hover:bg-white active:scale-95"
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <MessageCircle size={23} aria-hidden="true" />}
      </button>

      {isOpen ? (
        <div className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-md sm:inset-x-auto sm:right-5 sm:mx-0">
          <div className="premium-card glass-panel animated-border overflow-hidden rounded-lg border border-arena-cyan/25 bg-black/78 shadow-[0_28px_90px_rgba(0,0,0,0.62)] backdrop-blur-2xl">
            <div className="border-b border-white/10 bg-arena-cyan/[0.07] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-arena-cyan">
                    {t("panel.eyebrow")}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-black uppercase text-white">
                    {t("panel.title")}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-lg border border-arena-green/30 bg-arena-green/12 px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-arena-green">
                  <span className="live-pulse" aria-hidden="true">
                    <Radio size={14} />
                  </span>
                  {t("panel.status")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/62">
                {t("panel.copy")}
              </p>
            </div>

            <div className="grid gap-2 p-4">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3 transition hover:border-[#98a3ff]/45 hover:bg-[#5865f2]/12"
                onClick={() => trackEvent("click_join_discord", { location: "live_chat_launcher" })}
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg border border-[#98a3ff]/30 bg-[#5865f2]/14 text-[#98a3ff]">
                    <MessagesSquare size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-white">{t("actions.discord.title")}</span>
                    <span className="block text-xs font-semibold text-white/42">{t("actions.discord.copy")}</span>
                  </span>
                </span>
                <ExternalLink size={17} className="text-white/34 transition group-hover:text-white" aria-hidden="true" />
              </a>

              <a
                href={TEAMSPEAK_URL}
                className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3 transition hover:border-arena-cyan/45 hover:bg-arena-cyan/10"
                onClick={() => trackEvent("click_teamspeak", { location: "live_chat_launcher" })}
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg border border-arena-cyan/30 bg-arena-cyan/12 text-arena-cyan">
                    <Headphones size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-white">{t("actions.teamspeak.title")}</span>
                    <span className="block text-xs font-semibold text-white/42">{t("actions.teamspeak.copy")}</span>
                  </span>
                </span>
                <ExternalLink size={17} className="text-white/34 transition group-hover:text-white" aria-hidden="true" />
              </a>

              <a
                href={FORUM_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3 transition hover:border-arena-green/45 hover:bg-arena-green/10"
                onClick={() => trackEvent("click_forum", { location: "live_chat_launcher" })}
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg border border-arena-green/30 bg-arena-green/12 text-arena-green">
                    <ShieldCheck size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-white">{t("actions.forum.title")}</span>
                    <span className="block text-xs font-semibold text-white/42">{t("actions.forum.copy")}</span>
                  </span>
                </span>
                <ExternalLink size={17} className="text-white/34 transition group-hover:text-white" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
