import type { Book } from "./book.type";
import type { Library } from "./library.type";

export type OrderStatus =
  "PENDING" | "ACCEPTED" | "PAID" | "FULFILLED" | "CANCELLED" | "REJECTED";

export type Order = {
  id: string;
  bookId: string;
  libraryId: string;
  sentAt: string | Date;
  senderId: number;
  paymentId: number | null;
  status: OrderStatus;
};

export type OrderWithDetails = Order & {
  book: Book;
  library: Library;
  totalPrice: number;
};
