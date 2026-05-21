import { Sparkles } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-2 rounded-lg border border-arena-green/30 bg-arena-green/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-arena-green shadow-[0_0_32px_rgba(35,209,139,0.12)] backdrop-blur-xl">
        <Sparkles size={15} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-5 break-words font-display text-4xl font-black uppercase leading-[1.02] text-balance text-white [overflow-wrap:anywhere] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-white/62">{copy}</p>
    </div>
  );
}
