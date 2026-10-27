import type { ApiClient } from "../shared/types/api";

export default function booksListLoader(api: ApiClient) {
  return async () => {
    const categoriesWithBooks = await api.getBooks();
    return { categoriesWithBooks };
  };
}


