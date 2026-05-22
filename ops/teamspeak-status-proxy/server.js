import http from "node:http";
import net from "node:net";

const DEFAULT_HOST = "ts.free-arena.ro";
const DEFAULT_VOICE_PORT = 9987;
const DEFAULT_QUERY_PORT = 10011;
const QUERY_TIMEOUT_MS = 6000;
const CHANNEL_PREVIEW_LIMIT = 8;

function readPort(value, fallback) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 && port <= 65535 ? port : fallback;
}

function getConfig() {
  return {
    host: process.env.TEAMSPEAK_HOST || DEFAULT_HOST,
    voicePort: readPort(process.env.TEAMSPEAK_VOICE_PORT, DEFAULT_VOICE_PORT),
    queryPort: readPort(process.env.TEAMSPEAK_QUERY_PORT, DEFAULT_QUERY_PORT),
    queryUser: process.env.TEAMSPEAK_QUERY_USER,
    queryPassword: process.env.TEAMSPEAK_QUERY_PASSWORD,
    virtualServerId: process.env.TEAMSPEAK_VIRTUAL_SERVER_ID,
    token: process.env.STATUS_TOKEN,
  };
}

function fallbackStatus(reason, config = getConfig()) {
  return {
    status: "offline",
    online: false,
    serverName: "FREE-ARENA.RO TeamSpeak",
    address: `${config.host}:${config.voicePort}`,
    users: 0,
    maxUsers: 0,
    channelCount: 0,
    channels: [],
    checkedAt: new Date().toISOString(),
    message: reason,
  };
}

function escapeQueryValue(value) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("/", "\\/")
    .replaceAll(" ", "\\s")
    .replaceAll("|", "\\p")
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "\\r")
    .replaceAll("\t", "\\t");
}

function unescapeQueryValue(value) {
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

function parseQueryItem(item) {
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

function parseQueryRows(lines) {
  return lines
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("error ") && line !== "TS3" && !line.startsWith("Welcome"))
    .flatMap((line) => line.split("|"))
    .filter(Boolean)
    .map(parseQueryItem);
}

function readNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function waitUntil(readValue, timeoutMs) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
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

class TeamSpeakQueryConnection {
  constructor(config) {
    this.config = config;
    this.buffer = "";
    this.socket = net.createConnection({
      host: config.host,
      port: config.queryPort,
      timeout: QUERY_TIMEOUT_MS,
    });
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk) => {
      this.buffer += chunk;
    });
  }

  async connect() {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("TeamSpeak query connection timed out")), QUERY_TIMEOUT_MS);

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

  async command(command) {
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

  async waitForGreeting() {
    await waitUntil(() => this.buffer.includes("Welcome"), QUERY_TIMEOUT_MS);
    this.buffer = "";
  }

  async readCommandResponse() {
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

async function queryTeamSpeak() {
  const config = getConfig();

  if (!config.queryUser || !config.queryPassword) {
    return fallbackStatus("missing_config", config);
  }

  const connection = new TeamSpeakQueryConnection(config);

  try {
    await connection.connect();
    await connection.command(
      `login client_login_name=${escapeQueryValue(config.queryUser)} client_login_password=${escapeQueryValue(
        config.queryPassword,
      )}`,
    );
    await connection.command(
      config.virtualServerId
        ? `use sid=${escapeQueryValue(config.virtualServerId)}`
        : `use port=${config.voicePort}`,
    );

    const serverInfoRows = parseQueryRows(await connection.command("serverinfo"));
    const channelRows = parseQueryRows(await connection.command("channellist"));
    const serverInfo = serverInfoRows[0] || {};
    const queryClients = readNumber(serverInfo.virtualserver_queryclientsonline);
    const usersOnline = Math.max(0, readNumber(serverInfo.virtualserver_clientsonline) - queryClients);
    const channels = channelRows
      .map((channel) => channel.channel_name)
      .filter((name) => Boolean(name && name.trim()))
      .map((name) => name.trim())
      .filter((name) => !name.toLowerCase().startsWith("[*spacer"))
      .slice(0, CHANNEL_PREVIEW_LIMIT);

    return {
      status: "online",
      online: true,
      serverName: (serverInfo.virtualserver_name || "FREE-ARENA.RO TeamSpeak").trim(),
      address: `${config.host}:${config.voicePort}`,
      users: usersOnline,
      maxUsers: readNumber(serverInfo.virtualserver_maxclients),
      channelCount: channelRows.length || readNumber(serverInfo.virtualserver_channelsonline),
      channels,
      checkedAt: new Date().toISOString(),
    };
  } catch {
    return fallbackStatus("query_failed", config);
  } finally {
    connection.close();
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store, max-age=0",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function isAuthorized(request) {
  const token = process.env.STATUS_TOKEN;

  if (!token) {
    return true;
  }

  return request.headers.authorization === `Bearer ${token}`;
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", "http://localhost");

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "method_not_allowed" });
    return;
  }

  if (url.pathname === "/health") {
    sendJson(response, 200, { status: "ok", service: "teamspeak-status-proxy" });
    return;
  }

  if (url.pathname !== "/teamspeak") {
    sendJson(response, 404, { error: "not_found" });
    return;
  }

  if (!isAuthorized(request)) {
    sendJson(response, 401, { error: "unauthorized" });
    return;
  }

  sendJson(response, 200, await queryTeamSpeak());
});

server.listen(readPort(process.env.PORT, 8787), "0.0.0.0");
