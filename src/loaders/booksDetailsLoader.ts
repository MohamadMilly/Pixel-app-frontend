import type { LoaderFunctionArgs } from "react-router";
import type { ApiClient } from "../shared/types/api";

interface BookLoaderArgs extends LoaderFunctionArgs {
  params: {
    bookId?: string;
  };
}
export default function booksDetailsLoader(api: ApiClient) {
  return async function ({ params }: BookLoaderArgs) {
    const book = params.bookId ? await api.getBookById(params.bookId) : null;
    return { book };
  };
}
