import Link from "next/link";
import { Disc3, Home, Server } from "lucide-react";
import { routes } from "@/lib/routes";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold text-white">FREE-ARENA.RO</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/58">
            Esports infrastructure prepared for rankings, accounts, match data, store modules,
            and community operations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={routes.servers}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Server size={17} aria-hidden="true" />
            Servers
          </Link>
          <Link
            href={routes.community}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Disc3 size={17} aria-hidden="true" />
            Community
          </Link>
          <Link
            href={routes.home}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-arena-green/50 hover:text-white"
          >
            <Home size={17} aria-hidden="true" />
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
