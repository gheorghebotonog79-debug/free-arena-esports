import type { ReactNode } from "react";

type GlowFrameProps = {
  children: ReactNode;
  className?: string;
  red?: boolean;
};

export function GlowFrame({ children, className = "", red = false }: GlowFrameProps) {
  return (
    <div className={`cyber-panel hud-frame ${red ? "hud-red" : ""} ${className}`}>
      {children}
    </div>
  );
}
