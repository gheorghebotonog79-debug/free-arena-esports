type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

function cleanupExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs;
    buckets.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: Math.max(options.limit - 1, 0),
      retryAfterSeconds: 0,
      resetAt,
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  buckets.set(key, existing);

  return {
    allowed: true,
    remaining: Math.max(options.limit - existing.count, 0),
    retryAfterSeconds: 0,
    resetAt: existing.resetAt,
  };
}

export function clearRateLimit(key: string) {
  buckets.delete(key);
}

export function checkAdminLoginRateLimit(key: string) {
  return checkRateLimit(`admin-login:${key}`, {
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
}

export function clearAdminLoginRateLimit(key: string) {
  clearRateLimit(`admin-login:${key}`);
}
