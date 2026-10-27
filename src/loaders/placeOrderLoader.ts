import type { LoaderFunctionArgs } from "react-router";
import type { ApiClient } from "../shared/types/api";

interface PlaceOrderLoaderArgs extends LoaderFunctionArgs {
  params: {
    bookId?: string;
  };
}

export default function placeOrderPageLoader(api: ApiClient) {
  return async function ({ params }: PlaceOrderLoaderArgs) {
    const book = params.bookId ? await api.getBookById(params.bookId) : null;
    if (!book) {
      throw new Response("الكتاب المطلوب غير موجود.", { status: 404 });
    }
    const libraries = await api.getLibraries();

    return { book, libraries };
  };
}
