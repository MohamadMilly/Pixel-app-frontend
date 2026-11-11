import axios from "axios";
import type { UnifiedError } from "../../shared/types/error.types";

export function formatAxiosError(error: unknown): UnifiedError {
  const fullback = "An unexpected error occurred.";

  if (!error) {
    return { message: fullback };
  }

  // All Axios-specific checking lives safely inside this formatter
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data;
    if (errorData && typeof errorData === "object") {
      const apiError = errorData.error;
      return {
        message: apiError?.message || fullback,
        code: apiError?.code,
        raw: errorData,
      };
    }
    if (error.response?.data) {
      return error.response.data;
    }

    if (error.request) {
      return {
        message: "Network error. Please check your internet connection.",
        code: "NETWORK_ERROR",
        raw: error,
      };
    }
  }

  // 3. Handle Generic JavaScript Errors
  if (error instanceof Error) {
    return { message: error.message, raw: error };
  }

  return { message: fullback, raw: error };
}
