export type TeamSpeakStatusKind = "online" | "offline";

export type TeamSpeakStatusResponse = {
  status: TeamSpeakStatusKind;
  online: boolean;
  serverName: string;
  address: string;
  users: number;
  maxUsers: number;
  channelCount: number;
  channels: string[];
  checkedAt: string;
  message?: "missing_config" | "query_failed";
};
