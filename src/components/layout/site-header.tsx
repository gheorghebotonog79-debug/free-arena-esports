import Image from "next/image";
import Link from "next/link";
import { RadioTower, ShieldCheck } from "lucide-react";
import { routes } from "@/lib/routes";

const navigation = [
  { href: routes.servers, label: "Servers" },
  { href: routes.events, label: "Events" },
  { href: routes.community, label: "Community" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-arena-black/84 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.06]">
            <Image
              src="/assets/game-icons/CS.png"
              alt=""
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-bold leading-none">
              FREE-ARENA.RO
            </span>
            <span className="mt-1 hidden text-xs font-semibold uppercase tracking-[0.18em] text-white/45 sm:block">
              Esports Network
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white/68 transition hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-lg border border-arena-green/30 bg-arena-green/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-arena-green sm:inline-flex">
            <RadioTower size={15} aria-hidden="true" />
            Live
          </span>
          <Link
            href={routes.community}
            className="hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-black transition hover:bg-arena-green sm:inline-flex"
          >
            <ShieldCheck size={17} aria-hidden="true" />
            Join
          </Link>
        </div>
      </div>
    </header>
  );
}
