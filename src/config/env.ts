const configuredApiUrl = import.meta.env.VITE_BASE_URL?.replace(/\/+$/, "") ?? "";

export const env = {
  apiBaseUrl: configuredApiUrl.endsWith("/api/v1")
    ? configuredApiUrl
    : `${configuredApiUrl}/api/v1`,
} as const;
