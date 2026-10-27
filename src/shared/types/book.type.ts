export type Book = {
  id: string;
  title: string;
  pages: number;
  description: string;
  basePrice: number;
  thumbnailUrl: string | null;
  rating: number;
};

export type BookCategory = {
  id: string;
  name: string;
  books: Book[];
};