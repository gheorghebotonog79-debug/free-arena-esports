"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

type CopyToastProps = {
  message: string | null;
};

export function CopyToast({ message }: CopyToastProps) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          aria-live="polite"
          className="pointer-events-none fixed inset-x-4 bottom-5 z-[60] flex justify-center sm:bottom-7"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="premium-card glass-panel inline-flex max-w-[min(92vw,520px)] items-center gap-3 rounded-lg border border-arena-cyan/25 bg-black/70 px-4 py-3 text-sm font-bold text-white shadow-[0_24px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-arena-green/30 bg-arena-green/14 text-arena-green">
              <Check size={17} aria-hidden="true" />
            </span>
            <span className="truncate">{message}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
