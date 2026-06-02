import { db } from "@/lib/db";

const supportedPublicNewsLocales = new Set(["ro", "en"]);

export type PublicNewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | null;
  authorName: string | null;
};

function normalizeNewsLocale(locale: string) {
  return supportedPublicNewsLocales.has(locale) ? locale : "ro";
}

function getPublicAuthorName(username: string | null | undefined) {
  const authorName = username?.trim();

  if (!authorName || authorName.includes("@") || authorName.toLowerCase() === "serveradmiin") {
    return null;
  }

  return authorName;
}

export async function getPublishedNews(locale: string, limit = 3): Promise<PublicNewsPost[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const posts = await db.newsPost.findMany({
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
      take: limit,
      where: {
        locale: normalizeNewsLocale(locale),
        published: true,
        publishedAt: {
          lte: new Date(),
        },
      },
    });

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      authorName: getPublicAuthorName(post.author?.username),
    }));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Public news query failed.", error);
    }

    return [];
  }
}
