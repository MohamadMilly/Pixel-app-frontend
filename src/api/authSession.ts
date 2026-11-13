import axios from "axios";
import { env } from "../config/env";
import type { RefreshedResponseDto } from "./modules/auth/dtos/refreshDtos";
import type { ApiSuccessResponse } from "./types/response.types";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const AUTH_SESSION_EXPIRED_EVENT = "pixel-app:auth-session-expired";

let refreshRequest: Promise<string> | null = null;

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function expireSession() {
  clearTokens();
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
  if (window.location.pathname !== "/login") {
    const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.location.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
}

export function refreshAccessToken(): Promise<string> {
  if (refreshRequest) return refreshRequest;

  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    return Promise.reject(new Error("No refresh token is available."));
  }

  refreshRequest = axios
    .post<ApiSuccessResponse<RefreshedResponseDto>>(
      `${env.apiBaseUrl}/auth/refresh`,
      { refreshToken },
      { timeout: 10000, headers: { "Content-Type": "application/json" } },
    )
    .then(({ data }) => {
      saveTokens(data.data.accessToken, data.data.refreshToken);
      return data.data.accessToken;
    })
    .finally(() => {
      refreshRequest = null;
    });

  return refreshRequest;
}
