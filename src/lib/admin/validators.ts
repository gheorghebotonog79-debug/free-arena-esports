type ValidatorResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      errors: string[];
    };

type ValidateOptions = {
  partial?: boolean;
};

type NewsInput = {
  content: string;
  excerpt: string;
  locale: string;
  published: boolean;
  publishedAt: Date | null;
  slug: string;
  title: string;
};

type ServerInput = {
  displayOrder: number;
  featured: boolean;
  game: string;
  host: string;
  maintenance: boolean;
  name: string;
  port: number;
};

type TournamentInput = {
  description: string | null;
  endsAt: Date | null;
  game: string;
  prizePool: string | null;
  slug: string;
  startsAt: Date | null;
  status: string;
  title: string;
};

type VipInput = {
  durationDays: number;
  enabled: boolean;
  name: string;
  perks: unknown;
  price: string;
};

type SettingInput = {
  key: string;
  value: unknown;
};

const tournamentStatuses = new Set(["draft", "scheduled", "live", "completed", "cancelled"]);
const supportedLocales = new Set(["ro", "en"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(
  body: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { max?: number; min?: number; partial?: boolean } = {},
) {
  const value = body[key];

  if (value === undefined && options.partial) {
    return undefined;
  }

  if (typeof value !== "string") {
    errors.push(`${key} must be a string.`);
    return undefined;
  }

  const trimmed = value.trim();
  const min = options.min ?? 1;

  if (trimmed.length < min) {
    errors.push(`${key} must have at least ${min} characters.`);
  }

  if (options.max && trimmed.length > options.max) {
    errors.push(`${key} must have at most ${options.max} characters.`);
  }

  return trimmed;
}

function readOptionalString(
  body: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { max?: number; partial?: boolean } = {},
) {
  const value = body[key];

  if (value === undefined || value === null || value === "") {
    return value === undefined && options.partial ? undefined : null;
  }

  if (typeof value !== "string") {
    errors.push(`${key} must be a string or null.`);
    return undefined;
  }

  const trimmed = value.trim();

  if (options.max && trimmed.length > options.max) {
    errors.push(`${key} must have at most ${options.max} characters.`);
  }

  return trimmed || null;
}

function readBoolean(
  body: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { defaultValue?: boolean; partial?: boolean } = {},
) {
  const value = body[key];

  if (value === undefined) {
    return options.partial ? undefined : options.defaultValue ?? false;
  }

  if (typeof value !== "boolean") {
    errors.push(`${key} must be a boolean.`);
    return undefined;
  }

  return value;
}

function readInteger(
  body: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { defaultValue?: number; max?: number; min?: number; partial?: boolean } = {},
) {
  const value = body[key];

  if (value === undefined) {
    return options.partial ? undefined : options.defaultValue ?? 0;
  }

  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isInteger(parsed)) {
    errors.push(`${key} must be an integer.`);
    return undefined;
  }

  if (options.min !== undefined && parsed < options.min) {
    errors.push(`${key} must be at least ${options.min}.`);
  }

  if (options.max !== undefined && parsed > options.max) {
    errors.push(`${key} must be at most ${options.max}.`);
  }

  return parsed;
}

function readDate(
  body: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { partial?: boolean } = {},
) {
  const value = body[key];

  if (value === undefined) {
    return options.partial ? undefined : null;
  }

  if (value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    errors.push(`${key} must be an ISO date string or null.`);
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    errors.push(`${key} must be a valid ISO date string.`);
    return undefined;
  }

  return date;
}

function readJsonValue(
  body: Record<string, unknown>,
  key: string,
  errors: string[],
  options: { defaultValue?: unknown; partial?: boolean } = {},
) {
  const value = body[key];

  if (value === undefined) {
    if (options.partial) {
      return undefined;
    }

    return options.defaultValue ?? {};
  }

  if (typeof value === "function" || typeof value === "symbol" || value === undefined) {
    errors.push(`${key} must be JSON serializable.`);
    return undefined;
  }

  return value;
}

function validateSlug(value: string | undefined, key: string, errors: string[]) {
  if (!value) {
    return;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    errors.push(`${key} must use lowercase letters, numbers, and hyphens.`);
  }
}

function validateHost(value: string | undefined, errors: string[]) {
  if (!value) {
    return;
  }

  if (value.includes("://") || value.includes("/") || value.includes(" ")) {
    errors.push("host must be a clean hostname or IP without protocol, path, or spaces.");
  }
}

function result<T>(errors: string[], data: T): ValidatorResult<T> {
  if (errors.length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    data,
  };
}

function removeUndefined<T extends Record<string, unknown>>(data: T) {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) as {
    [K in keyof T]?: Exclude<T[K], undefined>;
  };
}

export function validateServerInput(
  body: Record<string, unknown>,
  options: ValidateOptions = {},
): ValidatorResult<Partial<ServerInput>> {
  const errors: string[] = [];
  const name = readString(body, "name", errors, { max: 80, min: 2, partial: options.partial });
  const game = readString(body, "game", errors, { max: 80, min: 2, partial: options.partial });
  const host = readString(body, "host", errors, { max: 255, min: 3, partial: options.partial });
  const port = readInteger(body, "port", errors, {
    max: 65535,
    min: 1,
    partial: options.partial,
  });
  const featured = readBoolean(body, "featured", errors, {
    defaultValue: false,
    partial: options.partial,
  });
  const maintenance = readBoolean(body, "maintenance", errors, {
    defaultValue: false,
    partial: options.partial,
  });
  const displayOrder = readInteger(body, "displayOrder", errors, {
    defaultValue: 0,
    partial: options.partial,
  });

  validateHost(host, errors);

  return result(
    errors,
    removeUndefined({ displayOrder, featured, game, host, maintenance, name, port }),
  );
}

export function validateNewsInput(
  body: Record<string, unknown>,
  options: ValidateOptions = {},
): ValidatorResult<Partial<NewsInput>> {
  const errors: string[] = [];
  const slug = readString(body, "slug", errors, { max: 140, min: 2, partial: options.partial });
  const locale = readString(body, "locale", errors, { max: 8, min: 2, partial: options.partial });
  const title = readString(body, "title", errors, { max: 180, min: 3, partial: options.partial });
  const excerpt = readString(body, "excerpt", errors, {
    max: 320,
    min: 5,
    partial: options.partial,
  });
  const content = readString(body, "content", errors, {
    max: 20000,
    min: 1,
    partial: options.partial,
  });
  const published = readBoolean(body, "published", errors, {
    defaultValue: false,
    partial: options.partial,
  });
  const publishedAt = readDate(body, "publishedAt", errors, { partial: options.partial });

  validateSlug(slug, "slug", errors);

  if (locale && !supportedLocales.has(locale)) {
    errors.push("locale must be ro or en.");
  }

  return result(
    errors,
    removeUndefined({ content, excerpt, locale, published, publishedAt, slug, title }),
  );
}

export function validateTournamentInput(
  body: Record<string, unknown>,
  options: ValidateOptions = {},
): ValidatorResult<Partial<TournamentInput>> {
  const errors: string[] = [];
  const title = readString(body, "title", errors, { max: 180, min: 3, partial: options.partial });
  const slug = readString(body, "slug", errors, { max: 140, min: 2, partial: options.partial });
  const game = readString(body, "game", errors, { max: 80, min: 2, partial: options.partial });
  const status = readString(body, "status", errors, {
    max: 40,
    min: 4,
    partial: options.partial,
  });
  const startsAt = readDate(body, "startsAt", errors, { partial: options.partial });
  const endsAt = readDate(body, "endsAt", errors, { partial: options.partial });
  const prizePool = readOptionalString(body, "prizePool", errors, {
    max: 120,
    partial: options.partial,
  });
  const description = readOptionalString(body, "description", errors, {
    max: 2000,
    partial: options.partial,
  });

  validateSlug(slug, "slug", errors);

  if (status && !tournamentStatuses.has(status)) {
    errors.push("status must be draft, scheduled, live, completed, or cancelled.");
  }

  return result(
    errors,
    removeUndefined({ description, endsAt, game, prizePool, slug, startsAt, status, title }),
  );
}

export function validateVipInput(
  body: Record<string, unknown>,
  options: ValidateOptions = {},
): ValidatorResult<Partial<VipInput>> {
  const errors: string[] = [];
  const name = readString(body, "name", errors, { max: 120, min: 2, partial: options.partial });
  const durationDays = readInteger(body, "durationDays", errors, {
    min: 1,
    partial: options.partial,
  });
  const priceValue = body.price;
  const enabled = readBoolean(body, "enabled", errors, {
    defaultValue: true,
    partial: options.partial,
  });
  const perks = readJsonValue(body, "perks", errors, {
    defaultValue: {},
    partial: options.partial,
  });

  let price: string | undefined;

  if (priceValue === undefined && options.partial) {
    price = undefined;
  } else if (typeof priceValue === "number" || typeof priceValue === "string") {
    const normalizedPrice = String(priceValue).trim();

    if (!/^\d+(?:\.\d{1,2})?$/.test(normalizedPrice)) {
      errors.push("price must be a positive decimal with up to 2 decimals.");
    }

    price = normalizedPrice;
  } else {
    errors.push("price must be a number or decimal string.");
  }

  return result(errors, removeUndefined({ durationDays, enabled, name, perks, price }));
}

export function validateSettingInput(
  body: Record<string, unknown>,
  options: ValidateOptions = {},
): ValidatorResult<Partial<SettingInput>> {
  const errors: string[] = [];
  const key = readString(body, "key", errors, { max: 160, min: 3, partial: options.partial });
  const value = readJsonValue(body, "value", errors, { partial: options.partial });

  if (key && !/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(key)) {
    errors.push("key must use lowercase letters, numbers, dots, underscores, or hyphens.");
  }

  if (value === null) {
    errors.push("value cannot be null.");
  }

  if (value !== undefined && !isRecord(value) && !Array.isArray(value) && typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    errors.push("value must be JSON serializable.");
  }

  return result(errors, removeUndefined({ key, value }));
}
