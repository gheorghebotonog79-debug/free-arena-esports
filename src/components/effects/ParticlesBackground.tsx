import type { CSSProperties } from "react";

const embers = [
  { left: "6%", delay: "0s", duration: "7.4s", size: "3px", drift: "28px" },
  { left: "14%", delay: "1.2s", duration: "8.6s", size: "4px", drift: "-24px" },
  { left: "23%", delay: "2.1s", duration: "6.9s", size: "2px", drift: "42px" },
  { left: "37%", delay: "0.7s", duration: "9.2s", size: "5px", drift: "-38px" },
  { left: "51%", delay: "1.7s", duration: "8.1s", size: "3px", drift: "48px" },
  { left: "63%", delay: "0.4s", duration: "7.8s", size: "2px", drift: "-28px" },
  { left: "74%", delay: "2.8s", duration: "9.5s", size: "4px", drift: "34px" },
  { left: "86%", delay: "1s", duration: "7.1s", size: "3px", drift: "-44px" },
  { left: "94%", delay: "3.1s", duration: "8.8s", size: "2px", drift: "22px" },
] as const;

export function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,0,51,0.28),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(255,106,0,0.18),transparent_30%),radial-gradient(ellipse_at_50%_100%,rgba(255,42,31,0.28),transparent_58%),linear-gradient(180deg,transparent,rgba(0,0,0,0.78))]" />
      <div className="absolute inset-x-[-10%] top-[8%] h-1/2 bg-[radial-gradient(ellipse_at_18%_48%,rgba(0,0,0,0.62),transparent_68%),radial-gradient(ellipse_at_82%_36%,rgba(0,0,0,0.5),transparent_70%)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,106,0,0.26),transparent_58%)] blur-2xl" />
      {embers.map((ember) => (
        <span
          className="ember"
          key={`${ember.left}-${ember.delay}`}
          style={{
            "--ember-left": ember.left,
            "--ember-delay": ember.delay,
            "--ember-duration": ember.duration,
            "--ember-size": ember.size,
            "--ember-drift": ember.drift,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
