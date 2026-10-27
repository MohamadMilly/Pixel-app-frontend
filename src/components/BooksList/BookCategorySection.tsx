import { BookCard } from "./BookCard";
import type { BookCategory } from "../../shared/types/book.type";
import { Heading } from "../ui/Heading";

import { TextLink } from "../ui/TextLink";

type BookCategorySectionProps = {
  category: BookCategory;
};

export function BookCategorySection({ category }: BookCategorySectionProps) {
  const headingId = `category-${category.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      dir="rtl"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
        <Heading id={headingId} level={2}>
          {category.name}
        </Heading>

        <TextLink to={category.name}>عرض الكل ←</TextLink>
      </div>

      {category.books.length > 0 ? (
        <div className="flex h-95 w-full snap-x snap-mandatory scroll-smooth flex-row flex-nowrap items-start gap-3 overflow-x-auto pb-2">
          {category.books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-secondary bg-surface-disabled px-4 py-8 text-center text-sm text-muted sm:py-10">
          لا توجد كتب في هذا التصنيف حاليًا.
        </p>
      )}
    </section>
  );
}
