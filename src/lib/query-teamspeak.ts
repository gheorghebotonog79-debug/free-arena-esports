import net from "node:net";
import type { TeamSpeakStatusResponse } from "@/lib/teamspeak-status";

const DEFAULT_TEAMSPEAK_HOST = "ts.free-arena.ro";
const DEFAULT_VOICE_PORT = 9987;
const DEFAULT_QUERY_PORT = 10011;
const QUERY_TIMEOUT_MS = 6_000;
const PROXY_TIMEOUT_MS = 5_000;
const CHANNEL_PREVIEW_LIMIT = 8;

type TeamSpeakConfig = {
  host: string;
  voicePort: number;
  queryPort: number;
  queryUser: string;
  queryPassword: string;
  virtualServerId?: string;
};

type ParsedQueryItem = Record<string, string>;

type TeamSpeakProxyConfig = {
  url: string;
  token?: string;
};

function readPort(value: string | undefined, fallback: number) {
  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    return fallback;
  }

  return port;
}

function getTeamSpeakConfig(): TeamSpeakConfig | null {
  const queryUser = process.env.TEAMSPEAK_QUERY_USER;
  const queryPassword = process.env.TEAMSPEAK_QUERY_PASSWORD;

  if (!queryUser || !queryPassword) {
    return null;
  }

  return {
    host: process.env.TEAMSPEAK_HOST || DEFAULT_TEAMSPEAK_HOST,
    voicePort: readPort(process.env.TEAMSPEAK_VOICE_PORT, DEFAULT_VOICE_PORT),
    queryPort: readPort(process.env.TEAMSPEAK_QUERY_PORT, DEFAULT_QUERY_PORT),
    queryUser,
    queryPassword,
    virtualServerId: process.env.TEAMSPEAK_VIRTUAL_SERVER_ID,
  };
}

function getTeamSpeakProxyConfig(): TeamSpeakProxyConfig | null {
  const url = process.env.TEAMSPEAK_STATUS_URL;

  if (!url) {
    return null;
  }

  return {
    url,
    token: process.env.TEAMSPEAK_STATUS_TOKEN,
  };
}

function createFallbackStatus(
  reason: TeamSpeakStatusResponse["message"],
  host = process.env.TEAMSPEAK_HOST || DEFAULT_TEAMSPEAK_HOST,
  voicePort = readPort(process.env.TEAMSPEAK_VOICE_PORT, DEFAULT_VOICE_PORT),
): TeamSpeakStatusResponse {
  return {
    status: "offline",
    online: false,
    serverName: "FREE-ARENA.RO TeamSpeak",
    address: `${host}:${voicePort}`,
    users: 0,
    maxUsers: 0,
    channelCount: 0,
    channels: [],
    checkedAt: new Date().toISOString(),
    message: reason,
  };
}

function escapeQueryValue(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("/", "\\/")
    .replaceAll(" ", "\\s")
    .replaceAll("|", "\\p")
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "\\r")
    .replaceAll("\t", "\\t");
}

function unescapeQueryValue(value: string) {
  let output = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if (character !== "\\" || index === value.length - 1) {
      output += character;
      continue;
    }

    index += 1;
    const next = value[index];

    switch (next) {
      case "s":
        output += " ";
        break;
      case "p":
        output += "|";
        break;
      case "/":
        output += "/";
        break;
      case "\\":
        output += "\\";
        break;
      case "n":
        output += "\n";
        break;
      case "r":
        output += "\r";
        break;
      case "t":
        output += "\t";
        break;
      default:
        output += next;
        break;
    }
  }

  return output;
}

function parseQueryItem(item: string): ParsedQueryItem {
  return Object.fromEntries(
    item
      .split(" ")
      .filter(Boolean)
      .map((part) => {
        const [key, ...valueParts] = part.split("=");
        return [key, unescapeQueryValue(valueParts.join("=") || "")];
      }),
  );
}

function parseQueryRows(lines: string[]) {
  return lines
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("error ") && line !== "TS3" && !line.startsWith("Welcome"))
    .flatMap((line) => line.split("|"))
    .filter(Boolean)
    .map(parseQueryItem);
}

function readNumber(value: string | undefined, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function readPayloadNumber(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function readPayloadString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeProxyStatus(payload: unknown): TeamSpeakStatusResponse | null {
  if (!isRecord(payload) || typeof payload.online !== "boolean") {
    return null;
  }

  const usersPayload = isRecord(payload.users) ? payload.users : null;
  const users = usersPayload ? usersPayload.online : payload.users;
  const maxUsers = usersPayload ? usersPayload.max : payload.maxUsers;
  const channels = Array.isArray(payload.channels)
    ? payload.channels.filter((channel): channel is string => typeof channel === "string")
    : [];

  return {
    status: payload.online ? "online" : "offline",
    online: payload.online,
    serverName: readPayloadString(payload.serverName, "FREE-ARENA.RO TeamSpeak"),
    address: readPayloadString(
      payload.address,
      `${process.env.TEAMSPEAK_HOST || DEFAULT_TEAMSPEAK_HOST}:${readPort(
        process.env.TEAMSPEAK_VOICE_PORT,
        DEFAULT_VOICE_PORT,
      )}`,
    ),
    users: readPayloadNumber(users),
    maxUsers: readPayloadNumber(maxUsers),
    channelCount: readPayloadNumber(payload.channelCount, channels.length),
    channels: channels.slice(0, CHANNEL_PREVIEW_LIMIT),
    checkedAt: readPayloadString(payload.checkedAt, new Date().toISOString()),
    message:
      payload.message === "missing_config" ||
      payload.message === "query_failed" ||
      payload.message === "proxy_failed"
        ? payload.message
        : undefined,
  };
}

async function queryProxyTeamSpeakStatus(config: TeamSpeakProxyConfig) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);

  try {
    const response = await fetch(config.url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("TeamSpeak proxy request failed");
    }

    const status = normalizeProxyStatus(await response.json());

    if (!status) {
      throw new Error("TeamSpeak proxy returned invalid payload");
    }

    return status;
  } finally {
    clearTimeout(timeout);
  }
}

class TeamSpeakQueryConnection {
  private buffer = "";

  private socket: net.Socket;

  constructor(private readonly config: TeamSpeakConfig) {
    this.socket = net.createConnection({
      host: config.host,
      port: config.queryPort,
      timeout: QUERY_TIMEOUT_MS,
    });
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk: string) => {
      this.buffer += chunk;
    });
  }

  async connect() {
    await new Promise<void>((resolve, reject) => {
      const timeout = windowlessTimeout(() => reject(new Error("TeamSpeak query connection timed out")));

      this.socket.once("connect", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.socket.once("error", reject);
      this.socket.once("timeout", () => reject(new Error("TeamSpeak query socket timed out")));
    });

    await this.waitForGreeting();
  }

  close() {
    this.socket.end();
    this.socket.destroy();
  }

  async command(command: string) {
    this.socket.write(`${command}\n`);

    const lines = await this.readCommandResponse();
    const error = lines.find((line) => line.startsWith("error "));

    if (!error) {
      throw new Error("TeamSpeak query returned no error line");
    }

    const parsedError = parseQueryItem(error);

    if (parsedError.id !== "0") {
      throw new Error(parsedError.msg || "TeamSpeak query command failed");
    }

    return lines;
  }

  private async waitForGreeting() {
    await waitUntil(() => this.buffer.includes("Welcome"), QUERY_TIMEOUT_MS);
    this.buffer = "";
  }

  private async readCommandResponse() {
    return waitUntil(() => {
      const lines = this.buffer.split(/\r?\n/).map((line) => line.trim());
      const errorIndex = lines.findIndex((line) => line.startsWith("error "));

      if (errorIndex === -1) {
        return null;
      }

      const responseLines = lines.slice(0, errorIndex + 1).filter(Boolean);
      this.buffer = lines.slice(errorIndex + 1).join("\n");
      return responseLines;
    }, QUERY_TIMEOUT_MS);
  }
}

function windowlessTimeout(callback: () => void) {
  return setTimeout(callback, QUERY_TIMEOUT_MS);
}

function waitUntil<T>(readValue: () => T | null | false, timeoutMs: number) {
  const startedAt = Date.now();

  return new Promise<T>((resolve, reject) => {
    const interval = setInterval(() => {
      const value = readValue();

      if (value) {
        clearInterval(interval);
        resolve(value);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        clearInterval(interval);
        reject(new Error("TeamSpeak query response timed out"));
      }
    }, 25);
  });
}

export async function queryTeamSpeakStatus(): Promise<TeamSpeakStatusResponse> {
  const proxyConfig = getTeamSpeakProxyConfig();

  if (proxyConfig) {
    try {
      return await queryProxyTeamSpeakStatus(proxyConfig);
    } catch {
      if (!getTeamSpeakConfig()) {
        return createFallbackStatus("proxy_failed");
      }
    }
  }

  const config = getTeamSpeakConfig();

  if (!config) {
    return createFallbackStatus("missing_config");
  }

  const connection = new TeamSpeakQueryConnection(config);

  try {
    await connection.connect();
    await connection.command(
      `login client_login_name=${escapeQueryValue(config.queryUser)} client_login_password=${escapeQueryValue(config.queryPassword)}`,
    );
    await connection.command(
      config.virtualServerId
        ? `use sid=${escapeQueryValue(config.virtualServerId)}`
        : `use port=${config.voicePort}`,
    );

    const serverInfoRows = parseQueryRows(await connection.command("serverinfo"));
    const channelRows = parseQueryRows(await connection.command("channellist"));
    const serverInfo = serverInfoRows[0] ?? {};
    const queryClients = readNumber(serverInfo.virtualserver_queryclientsonline);
    const usersOnline = Math.max(0, readNumber(serverInfo.virtualserver_clientsonline) - queryClients);
    const channels = channelRows
      .map((channel) => channel.channel_name)
      .filter((name): name is string => Boolean(name?.trim()))
      .map((name) => name.trim())
      .filter((name) => !name.toLowerCase().startsWith("[*spacer"))
      .slice(0, CHANNEL_PREVIEW_LIMIT);

    return {
      status: "online",
      online: true,
      serverName: serverInfo.virtualserver_name?.trim() || "FREE-ARENA.RO TeamSpeak",
      address: `${config.host}:${config.voicePort}`,
      users: usersOnline,
      maxUsers: readNumber(serverInfo.virtualserver_maxclients),
      channelCount: channelRows.length || readNumber(serverInfo.virtualserver_channelsonline),
      channels,
      checkedAt: new Date().toISOString(),
    };
  } catch {
    return createFallbackStatus("query_failed", config.host, config.voicePort);
  } finally {
    connection.close();
  }
}
