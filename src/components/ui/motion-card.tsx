"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionCardProps = {
  as?: "article" | "div";
  children: ReactNode;
  className?: string;
  delay?: number;
  initialVisible?: boolean;
};

export function MotionCard({
  as = "article",
  children,
  className,
  delay = 0,
  initialVisible = false,
}: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion
    ? false
    : { opacity: initialVisible ? 1 : 0, y: 22 };
  const whileInView = { opacity: 1, y: 0 };
  const whileHover = shouldReduceMotion ? undefined : { y: -7, scale: 1.012 };
  const viewport = { once: true, margin: "-72px" };
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.54,
    ease: [0.16, 1, 0.3, 1] as const,
    delay: shouldReduceMotion ? 0 : delay,
  };

  if (as === "div") {
    return (
      <motion.div
        className={className}
        data-motion-card="true"
        initial={initial}
        whileInView={whileInView}
        whileHover={whileHover}
        viewport={viewport}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.article
      className={className}
      data-motion-card="true"
      initial={initial}
      whileInView={whileInView}
      whileHover={whileHover}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.article>
  );
}
