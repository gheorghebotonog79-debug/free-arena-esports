"use client";

import { useEffect } from "react";

const finePointerQuery = "(hover: hover) and (pointer: fine)";

export function CinematicInteractions() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia(finePointerQuery);

    if (motionQuery.matches || !pointerQuery.matches) {
      return undefined;
    }

    let frame = 0;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    const root = document.documentElement;

    const commitCursor = () => {
      root.style.setProperty("--cursor-x", `${cursorX}px`);
      root.style.setProperty("--cursor-y", `${cursorY}px`);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(commitCursor);
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const card = target.closest<HTMLElement>(".premium-card, .server-tactical-card");
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

      card.style.setProperty("--mx", `${Math.round(x * 100)}%`);
      card.style.setProperty("--my", `${Math.round(y * 100)}%`);
      card.style.setProperty("--tilt-x", `${((0.5 - y) * 4.2).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${((x - 0.5) * 5.6).toFixed(2)}deg`);
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const card = target.closest<HTMLElement>(".premium-card, .server-tactical-card");
      const nextTarget = event.relatedTarget;

      if (!card || (nextTarget instanceof Node && card.contains(nextTarget))) {
        return;
      }

      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return <div className="cursor-ambient" aria-hidden="true" />;
}
