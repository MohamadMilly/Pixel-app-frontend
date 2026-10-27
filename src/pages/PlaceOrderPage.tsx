import { Form, useLoaderData, useNavigate } from "react-router";
import { PageContainer } from "../components/layout/PageContainer";
import { Text } from "../components/ui/Text";
import type { Book } from "../shared/types/book.type";
import type { Library } from "../shared/types/library.type";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { SelectLibraryList } from "../components/Libraries/SelectLibraryList";
import { LibrariesMap } from "../components/Libraries/LibrariesMap";
import { PageTitle } from "../components/layout/PageTitle";
import { Library as LibraryIcon } from "lucide-react";

export function PlaceOrderPage() {
  const { book, libraries } = useLoaderData<{
    book: Book;
    libraries: Library[];
  }>();
  const navigate = useNavigate();
  const [selectedLibraryId, setSelectedLibraryId] = useState<null | string>(
    null,
  );
  const handleSelect = (libraryId: string): void => {
    setSelectedLibraryId(libraryId);
  };
  return (
    <PageContainer>
      <header className="mb-8 space-y-2">
        <PageTitle Icon={LibraryIcon} title="اختر المكتبة" />
        <Text>
          الكتاب الذي تم اختياره:{" "}
          <span className="font-medium text-foreground">{book.title}</span>
        </Text>
      </header>
      <section aria-label="مواقع المكتبات" className="mb-8">
        <LibrariesMap
          handleSelect={handleSelect}
          selectedId={selectedLibraryId}
          libraries={libraries}
        />
      </section>
      <section aria-label="المكتبات المتاحة">
        <Form method="post" className="space-y-6">
          <SelectLibraryList
            book={book}
            libraries={libraries}
            selectedLibraryId={selectedLibraryId}
            handleSelect={handleSelect}
          />
          <div className="flex flex-col gap-3 border-t border-secondary pt-5 sm:flex-row">
            <Button
              disabled={selectedLibraryId === null}
              type="submit"
              className="w-full sm:w-auto"
            >
              تأكيد الطلب
            </Button>
            <Button
              className="w-full border border-secondary bg-background text-foreground hover:bg-secondary/50 sm:w-auto"
              onClick={() => navigate(-1)}
            >
              إلغاء
            </Button>
          </div>
        </Form>
      </section>
    </PageContainer>
  );
}
