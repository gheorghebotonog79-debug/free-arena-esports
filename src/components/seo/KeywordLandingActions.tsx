"use client";

import { useState } from "react";
import type { KeywordLandingAction, KeywordLandingSlug } from "@/data/keyword-landings";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";
import { trackEvent } from "@/lib/analytics";

type KeywordLandingActionsProps = {
  actions: readonly KeywordLandingAction[];
  landing: KeywordLandingSlug;
  location: string;
};

const toneClasses: Record<NonNullable<KeywordLandingAction["tone"]>, string> = {
  cs16: "border-orange-300/24 bg-orange-300/10 text-orange-100 hover:border-orange-200/60 hover:bg-orange-300/18",
  cs2: "border-fuchsia-300/24 bg-fuchsia-300/10 text-fuchsia-100 hover:border-fuchsia-200/60 hover:bg-fuchsia-300/18",
  fivem: "border-emerald-300/28 bg-emerald-300/10 text-emerald-100 hover:border-emerald-200/70 hover:bg-emerald-300/18",
  global: "border-cyan-300/24 bg-cyan-300/10 text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/18",
  respawn: "border-red-300/24 bg-red-300/10 text-red-100 hover:border-red-200/60 hover:bg-red-300/18",
};

const baseClass =
  "button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-center text-sm font-black uppercase tracking-[0.12em] transition";

const glowClass =
  "button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-transparent bg-arena-cyan px-5 py-3 text-center text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white";

export function KeywordLandingActions({ actions, landing, location }: KeywordLandingActionsProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  async function handleCopy(action: KeywordLandingAction) {
    if (!action.copyValue) {
      return;
    }

    trackEvent(action.eventName, {
      ...action.eventPayload,
      landing,
      location,
      value: action.copyValue,
    });

    await copyTextToClipboard(action.copyValue);
    setCopiedValue(action.copyValue);
    window.setTimeout(() => setCopiedValue(null), 1200);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const className = getActionClassName(action);
        const label = action.copyValue && copiedValue === action.copyValue ? "Copied" : action.label;

        if (action.copyValue) {
          return (
            <button
              key={`${action.label}-${action.copyValue}`}
              type="button"
              className={className}
              onClick={() => {
                void handleCopy(action);
              }}
            >
              {label}
            </button>
          );
        }

        if (!action.href) {
          return null;
        }

        const isHttpExternal = action.href.startsWith("http");

        return (
          <a
            key={`${action.label}-${action.href}`}
            href={action.href}
            rel={isHttpExternal ? "noopener noreferrer" : undefined}
            target={isHttpExternal ? "_blank" : undefined}
            className={className}
            onClick={() => {
              trackEvent(action.eventName, {
                ...action.eventPayload,
                landing,
                location,
                target: action.href,
              });
            }}
          >
            {action.label}
          </a>
        );
      })}
    </div>
  );
}

function getActionClassName(action: KeywordLandingAction) {
  if (action.variant === "glow") {
    return glowClass;
  }

  return `${baseClass} ${toneClasses[action.tone ?? "global"]}`;
}
