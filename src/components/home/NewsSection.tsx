import { NewsPanel } from "@/components/home/NewsPanel";
import type { PublicNewsPost } from "@/lib/public-news";

type NewsSectionProps = {
  locale: string;
  posts: PublicNewsPost[];
};

export function NewsSection({ locale, posts }: NewsSectionProps) {
  return <NewsPanel locale={locale} posts={posts} />;
}
