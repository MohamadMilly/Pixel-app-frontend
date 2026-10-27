import type { Book } from "../../shared/types/book.type";
import type { Library } from "../../shared/types/library.type";
import { SelectLibraryItem } from "./SelectLibraryItem";

type SelectLibraryListProps = {
  libraries: Library[];
  selectedLibraryId: string | null;
  handleSelect: (libraryId: string) => void;
  book: Book;
};

export function SelectLibraryList({
  libraries,
  selectedLibraryId,
  handleSelect,
  book,
}: SelectLibraryListProps) {
  return (
    <ul className="space-y-3 max-w-5xl w-full mx-auto">
      {libraries.map((library: Library) => (
        <SelectLibraryItem
          key={library.id}
          book={book}
          library={library}
          isSelected={library.id === selectedLibraryId}
          handleSelect={handleSelect}
        />
      ))}
    </ul>
  );
}
