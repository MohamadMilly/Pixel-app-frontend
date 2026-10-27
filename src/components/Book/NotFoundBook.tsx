import { Link } from "react-router";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";

export function NotFoundBook() {
  return (
    <section className="rounded-2xl border border-dashed border-secondary bg-surface-disabled px-5 py-12 text-center">
      <Heading className="text-2xl" level={1}>
        لم يتم العثور على الكتاب
      </Heading>
      <Text className="mt-3">
        قد يكون الكتاب غير متاح أو أن الرابط غير صحيح.
      </Text>
      <Link
        to="/bookslist"
        className="mt-6 inline-flex min-h-10 items-center rounded-lg bg-accent px-4 py-2 font-medium text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        تصفح قائمة الكتب
      </Link>
    </section>
  );
}
