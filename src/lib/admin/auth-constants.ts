export const ADMIN_SESSION_COOKIE = "free_arena_admin_session";

export const DEFAULT_ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function getAdminSessionMaxAgeSeconds() {
  const configured = Number(process.env.ADMIN_SESSION_MAX_AGE_SECONDS);

  if (!Number.isInteger(configured) || configured <= 0) {
    return DEFAULT_ADMIN_SESSION_MAX_AGE_SECONDS;
  }

  return configured;
}
