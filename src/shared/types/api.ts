import type { Book, BookCategory } from "./book.type";
import type { Library } from "./library.type";
import type { OrderWithDetails } from "./order.type";

export type ApiClient = {
  getOrdersCount: () => Promise<number>;
  getBookById: (bookId: string) => Promise<Book | null>;
  getLibraries: () => Promise<Library[]>;
  getBooks: () => Promise<BookCategory[]>;
  getMyOrdersWithDetails: () => Promise<OrderWithDetails[]>;
};
