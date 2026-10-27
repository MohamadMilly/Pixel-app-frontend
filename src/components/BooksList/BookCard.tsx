import { Image } from "../ui/Image";
import { Text } from "../ui/Text";
import type { Book } from "../../shared/types/book.type";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { Heading } from "../ui/Heading";
import { TextLink } from "../ui/TextLink";
import { Rating } from "../ui/Rating";
import { PriceDisplay } from "../ui/PriceDisplay";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="flex h-full w-80 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div
        style={{
          viewTransitionName: book.id,
        }}
        className="h-40 w-full shrink-0 overflow-hidden bg-surface-disabled"
      >
        {book.thumbnailUrl ? (
          <Image
            src={book.thumbnailUrl}
            alt={`غلاف كتاب ${book.title}`}
            className="h-full w-full rounded-none border-0 object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div className="flex flex-col grow  gap-2.5 p-3.5" dir="rtl">
        <div className="flex grow items-start justify-between gap-3">
          <Heading
            className="line-clamp-2 text-right text-lg leading-6 sm:text-xl"
            level={3}
          >
            {book.title}
          </Heading>
          <Rating rating={book.rating} />
        </div>

        <Text className="line-clamp-2 shrink-0 text-right text-sm leading-5">
          {book.description}
        </Text>
        <TextLink
          viewTransition
          className="w-fit px-0 py-0.5"
          to={`${book.id}/details`}
        >
          عرض التفاصيل ←
        </TextLink>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-sm text-muted">
          <span>{book.pages} صفحة</span>
          <span className="font-semibold text-accent">
            السعر الأساسي: <PriceDisplay amount={book.basePrice} />
          </span>
        </div>
      </div>
    </article>
  );
}
