"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/copy-to-clipboard";

const COPIED_RESET_MS = 1800;

type FooterIpCopyButtonProps = {
  ariaLabel: string;
  copiedLabel: string;
  copyLabel: string;
  value: string;
};

export function FooterIpCopyButton({
  ariaLabel,
  copiedLabel,
  copyLabel,
  value,
}: FooterIpCopyButtonProps) {
  const timeoutRef = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => (
    () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    }
  ), []);

  async function handleCopy() {
    try {
      await copyTextToClipboard(value);
      trackEvent("click_copy_ip", { location: "footer_ip", value });
      setCopied(true);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, COPIED_RESET_MS);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => void handleCopy()}
      className="footer-ip-copy-button server-copy-button inline-flex shrink-0 items-center justify-center gap-2 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] transition"
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
