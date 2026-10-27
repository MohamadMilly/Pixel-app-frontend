import { useLoaderData } from "react-router";
import type { BookCategory } from "../shared/types/book.type";
import { BookCategorySection } from "../components/BooksList/BookCategorySection";
import { Text } from "../components/ui/Text";
import { BookOpen } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { PageTitle } from "../components/layout/PageTitle";

export function BooksListPage() {
  const { categoriesWithBooks } = useLoaderData<{
    categoriesWithBooks: BookCategory[];
  }>();

  return (
    <PageContainer>
      <header className="mb-8 space-y-2">
        <PageTitle Icon={BookOpen} title="قائمة الكتب" />
        <Text>استكشف مجموعتنا المتنوعة من الكتب، واكتشف عناوين جديدة تلهمك وتثري قراءتك.</Text>
      </header>
      {categoriesWithBooks.length > 0 ? (
        <div className="space-y-5 sm:space-y-6">
          {categoriesWithBooks.map((category) => (
            <BookCategorySection key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <Text
          className="rounded-2xl border border-dashed border-secondary bg-background px-4 py-10 text-center text-muted sm:py-12"
          dir="rtl"
        >
          لا توجد تصنيفات أو كتب متاحة حاليًا.
        </Text>
      )}
    </PageContainer>
  );
}
