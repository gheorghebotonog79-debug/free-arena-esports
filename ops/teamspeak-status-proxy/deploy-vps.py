#!/usr/bin/env python3
import datetime
import pathlib
import sys


ROOT = pathlib.Path("/opt/cs16-platform")
COMPOSE_PATH = ROOT / "docker-compose.yml"
NGINX_CONF_PATH = ROOT / "infrastructure/nginx/conf.d/default.conf"
ENV_PATH = ROOT / ".env"
RUNTIME_ENV_PATH = ROOT / "services/teamspeak-status-proxy/.env.runtime"

SERVICE_BLOCK = """  teamspeak-status-proxy:
    build:
      context: ./services/teamspeak-status-proxy
      dockerfile: Dockerfile
    container_name: cs16_teamspeak_status_proxy
    restart: unless-stopped
    env_file:
      - ./services/teamspeak-status-proxy/.env.runtime
    networks: [cs16_net]

"""

NGINX_LOCATION = """    location = /api/teamspeak-status {
        proxy_pass http://teamspeak-status-proxy:8787/teamspeak;
        proxy_http_version 1.1;
        proxy_set_header Authorization $http_authorization;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

"""


def backup(path):
    stamp = datetime.datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    backup_path = path.with_suffix(path.suffix + ".bak-fa-ts-proxy-" + stamp)
    backup_path.write_text(path.read_text())
    return backup_path


def read_env_file(path):
    values = {}

    for line in pathlib.Path(path).read_text().splitlines():
        stripped = line.strip()

        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        values[key.strip()] = value.strip()

    return values


def upsert_env(values):
    existing_lines = ENV_PATH.read_text().splitlines() if ENV_PATH.exists() else []
    handled = set()
    next_lines = []

    for line in existing_lines:
        stripped = line.strip()

        if not stripped or stripped.startswith("#") or "=" not in stripped:
            next_lines.append(line)
            continue

        key = stripped.split("=", 1)[0].strip()

        if key in values:
            next_lines.append("{}={}".format(key, values[key]))
            handled.add(key)
        else:
            next_lines.append(line)

    for key in sorted(values):
        if key not in handled:
            next_lines.append("{}={}".format(key, values[key]))

    ENV_PATH.write_text("\n".join(next_lines) + "\n")


def write_runtime_env(values):
    RUNTIME_ENV_PATH.parent.mkdir(parents=True, exist_ok=True)
    runtime_values = {
        "PORT": "8787",
        "TEAMSPEAK_HOST": values["TEAMSPEAK_HOST"],
        "TEAMSPEAK_VOICE_PORT": values["TEAMSPEAK_VOICE_PORT"],
        "TEAMSPEAK_QUERY_PORT": values["TEAMSPEAK_QUERY_PORT"],
        "TEAMSPEAK_QUERY_USER": values["TEAMSPEAK_QUERY_USER"],
        "TEAMSPEAK_QUERY_PASSWORD": values["TEAMSPEAK_QUERY_PASSWORD"],
        "TEAMSPEAK_VIRTUAL_SERVER_ID": values["TEAMSPEAK_VIRTUAL_SERVER_ID"],
        "STATUS_TOKEN": values["TEAMSPEAK_STATUS_PROXY_TOKEN"],
    }
    RUNTIME_ENV_PATH.write_text("\n".join("{}={}".format(key, value) for key, value in runtime_values.items()) + "\n")
    RUNTIME_ENV_PATH.chmod(0o600)


def ensure_compose_service():
    compose = COMPOSE_PATH.read_text()

    if SERVICE_BLOCK in compose:
        return False

    backup(COMPOSE_PATH)

    start = compose.find("  teamspeak-status-proxy:\n")
    marker = "  nginx:\n"

    if start != -1:
        end = compose.find(marker, start)
        if end == -1:
            raise RuntimeError("Could not find nginx service marker after teamspeak proxy")
        COMPOSE_PATH.write_text(compose[:start] + SERVICE_BLOCK + compose[end:])
    else:
        if marker not in compose:
            raise RuntimeError("Could not find nginx service marker in docker-compose.yml")
        COMPOSE_PATH.write_text(compose.replace(marker, SERVICE_BLOCK + marker, 1))

    return True


def ensure_nginx_location():
    config = NGINX_CONF_PATH.read_text()

    if "/api/teamspeak-status" in config:
        return False

    backup(NGINX_CONF_PATH)

    marker = "    location /api/auth/ {\n"
    if marker not in config:
        raise RuntimeError("Could not find nginx insertion marker")

    NGINX_CONF_PATH.write_text(config.replace(marker, NGINX_LOCATION + marker, 1))
    return True


def main():
    if len(sys.argv) != 2:
        raise SystemExit("Usage: deploy-vps.py /path/to/env-file")

    values = read_env_file(sys.argv[1])
    required = {
        "TEAMSPEAK_HOST",
        "TEAMSPEAK_VOICE_PORT",
        "TEAMSPEAK_QUERY_PORT",
        "TEAMSPEAK_QUERY_USER",
        "TEAMSPEAK_QUERY_PASSWORD",
        "TEAMSPEAK_VIRTUAL_SERVER_ID",
    }
    existing_values = read_env_file(ENV_PATH) if ENV_PATH.exists() else {}

    if "TEAMSPEAK_STATUS_PROXY_TOKEN" not in values and "TEAMSPEAK_STATUS_PROXY_TOKEN" in existing_values:
        values["TEAMSPEAK_STATUS_PROXY_TOKEN"] = existing_values["TEAMSPEAK_STATUS_PROXY_TOKEN"]
    required.add("TEAMSPEAK_STATUS_PROXY_TOKEN")

    missing = sorted(required.difference(values))

    if missing:
        raise RuntimeError("Missing env keys: {}".format(", ".join(missing)))

    upsert_env(values)
    write_runtime_env(values)
    changed_compose = ensure_compose_service()
    changed_nginx = ensure_nginx_location()
    print("teamspeak proxy config ready")
    print("compose_changed={}".format(str(changed_compose).lower()))
    print("nginx_changed={}".format(str(changed_nginx).lower()))


if __name__ == "__main__":
    main()
