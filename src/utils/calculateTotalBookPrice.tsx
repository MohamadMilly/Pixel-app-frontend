import type { Book } from "../shared/types/book.type";
import type { Library } from "../shared/types/library.type";

export const calculateBookPrice = (book: Book, library: Library): number => {
  return book.basePrice + library.pagePrice * book.pages + library.extraFees;
};
