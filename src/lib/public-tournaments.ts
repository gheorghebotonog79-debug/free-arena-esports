import { db } from "@/lib/db";

const publicTournamentStatuses = ["scheduled", "live"] as const;

export type PublicTournament = {
  id: string;
  title: string;
  slug: string;
  game: string;
  status: string;
  startsAt: Date | null;
  endsAt: Date | null;
  prizePool: string | null;
  description: string | null;
};

export async function getPublicTournaments(limit = 4): Promise<PublicTournament[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    return await db.tournament.findMany({
      orderBy: [{ startsAt: "asc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        game: true,
        status: true,
        startsAt: true,
        endsAt: true,
        prizePool: true,
        description: true,
      },
      take: limit,
      where: {
        status: {
          in: [...publicTournamentStatuses],
        },
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Public tournaments query failed.", error);
    }

    return [];
  }
}
