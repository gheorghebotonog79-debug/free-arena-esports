export type ForumStatusKind = "online" | "degraded" | "offline" | "missing_config";

export type ForumTopic = {
  id: string;
  title: string;
  url: string;
  authorName?: string;
  replies?: number;
  views?: number;
  lastPostAt?: string;
};

export type ForumStatusResponse = {
  status: ForumStatusKind;
  ok: boolean;
  forumUrl: string;
  membersTotal?: number;
  topicsTotal?: number;
  postsTotal?: number;
  latestTopics: ForumTopic[];
  checkedAt: string;
  message?: "missing_config" | "api_failed" | "permission_denied" | "rate_limited";
};
