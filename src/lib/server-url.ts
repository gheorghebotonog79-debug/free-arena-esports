import type { ServerSeoSlug } from "@/data/servers/seo-pages";
import type { PublicServerSlug } from "@/lib/servers";

export const serverSeoSlugByPublicSlug: Record<PublicServerSlug, ServerSeoSlug> = {
  cs16: "cs16-classic",
  respawn: "respawn",
  cs2: "cs2",
  global: "global",
};

export function getCanonicalServerPath(slug: PublicServerSlug) {
  return `/server/${serverSeoSlugByPublicSlug[slug]}`;
}
