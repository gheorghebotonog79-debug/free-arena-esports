import { Sparkles } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, copy, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="neon-kicker section-badge-label px-3 py-2">
        <Sparkles size={15} aria-hidden="true" />
        {eyebrow}
      </p>
      <Heading className="neon-title neon-text-pulse mt-5 break-words font-display text-4xl font-black uppercase leading-[1.02] text-balance text-white [overflow-wrap:anywhere] sm:text-5xl">
        {title}
      </Heading>
      <p className="mt-4 text-base leading-7 text-white/62">{copy}</p>
    </div>
  );
}
