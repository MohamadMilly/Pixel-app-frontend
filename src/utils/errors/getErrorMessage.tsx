import { isRouteErrorResponse } from "react-router";

export function getErrorMessage(error: unknown) {
  let title = "حدث خطأ غير معروف";
  let content: string | null = null;
  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    content =
      typeof error.data === "string" ? error.data : JSON.stringify(error.data);
  } else if (error instanceof Error) {
    title = "حدث خطأ غير متوقع";
    content = error.message;
  }

  return { title, content };
}
