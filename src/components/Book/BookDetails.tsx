import { BookOpenText, Star } from "lucide-react";
import { Image } from "../ui/Image";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { Text } from "../ui/Text";
import { Heading } from "../ui/Heading";
import type { Book } from "../../shared/types/book.type";
import { PriceDisplay } from "../ui/PriceDisplay";

type BookDetailsProps = {
  book: Book;
};

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-secondary bg-background shadow-sm">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div
          style={{
            viewTransitionName: book.id,
          }}
          className="min-h-72 max-h-120 h-full bg-surface-disabled"
        >
          {book.thumbnailUrl ? (
            <Image
              src={book.thumbnailUrl}
              alt={`غلاف كتاب ${book.title}`}
              className="h-full min-h-72 w-full rounded-none border-0 object-contain"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        <div className="flex flex-col gap-6 min-w-0 p-5 sm:p-8 lg:p-10">
          <div className="flex items-start gap-3 text-accent">
            <BookOpenText
              aria-hidden="true"
              className="mt-1 shrink-0"
              size={25}
            />
            <Text className="text-sm font-medium text-accent">
              تفاصيل الكتاب
            </Text>
          </div>

          <div className="w-full min-w-0 space-y-4">
            <Heading className="break-words" level={1}>
              {book.title}
            </Heading>
            <Text className="break-words">{book.description}</Text>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-xl border border-secondary bg-surface-disabled p-4">
              <Text className="mb-2 text-sm">عدد الصفحات</Text>
              <p className="text-lg font-semibold text-foreground">
                {book.pages} صفحة
              </p>
            </div>
            <div className="min-w-0 rounded-xl border border-secondary bg-surface-disabled p-4">
              <Text className="mb-2 text-sm">تقييم القراء</Text>
              <p
                aria-label={`التقييم ${book.rating} من 5`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-foreground"
              >
                <Star
                  aria-hidden="true"
                  className="fill-accent text-accent"
                  size={18}
                />
                {book.rating}{" "}
                <span className="text-sm font-normal text-muted">من 5</span>
              </p>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-secondary pt-5">
            <div>
              <Text className="text-sm">السعر الأساسي</Text>
              <PriceDisplay
                amount={book.basePrice}
                className="mt-1 text-2xl font-bold text-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
