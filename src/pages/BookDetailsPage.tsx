import { useLoaderData, useNavigate } from "react-router";
import { PageContainer } from "../components/layout/PageContainer";

import type { Book } from "../shared/types/book.type";
import { ArrowRight } from "lucide-react";

import { TextLink } from "../components/ui/TextLink";
import { BookDetails } from "../components/Book/BookDetails";
import { NotFoundBook } from "../components/Book/NotFoundBook";
import { Button } from "../components/ui/Button";

export function BookDetailsPage() {
  const { book } = useLoaderData<{ book: Book | null }>();
  const navigate = useNavigate();
  if (!book) {
    return <NotFoundBook />;
  }
  return (
    <PageContainer>
      <TextLink to="/bookslist" className="mb-6">
        <ArrowRight aria-hidden="true" size={18} />
        العودة إلى قائمة الكتب
      </TextLink>

      <BookDetails book={book} />
      <div className="flex justify-center my-6">
        <Button
          className="w-1/2 py-2.5"
          onClick={() =>
            navigate(`/bookslist/${book.id}/order`, { viewTransition: true })
          }
        >
          طلب من المكتبة
        </Button>
      </div>
    </PageContainer>
  );
}
