import { useMemo } from "react";
import type { Book } from "../../shared/types/book.type";
import type { Library } from "../../shared/types/library.type";
import { calculateBookPrice } from "../../utils/calculateTotalBookPrice";
import { Button } from "../ui/Button";
import { Collapsible } from "../ui/Collapsible";
import { PriceDisplay } from "../ui/PriceDisplay";
import { LibraryBookPriceDetails } from "./LibraryBookPriceDetails";
import { LibraryListItem } from "./LibraryListItem";

type SelectLibraryItemProps = {
  book: Book;
  library: Library;
  isSelected: boolean;
  handleSelect: (libraryId: string) => void;
};

export function SelectLibraryItem({
  book,
  library,
  isSelected,
  handleSelect,
}: SelectLibraryItemProps) {
  const totalPrice = useMemo(
    () => calculateBookPrice(book, library),
    [book, library],
  );

  return (
    <LibraryListItem library={library}>
      <Button
        aria-pressed={isSelected}
        className={
          isSelected
            ? "min-w-28"
            : "min-w-28 border border-secondary bg-background text-foreground hover:bg-secondary/50"
        }
        onClick={() => handleSelect(library.id)}
      >
        {isSelected ? "تم اختياره" : "اختيار"}
      </Button>
      <input
        name="libraryId"
        value={library.id}
        checked={isSelected}
        type="radio"
        hidden
        readOnly
      />
      <Collapsible
        className="w-full sm:min-w-72"
        contentClassName="space-y-3"
        label={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="text-muted">تفاصيل السعر</span>
            <PriceDisplay amount={totalPrice} className="text-foreground" />
          </span>
        }
      >
        <LibraryBookPriceDetails
          basePrice={book.basePrice}
          pagePrice={library.pagePrice}
          pages={book.pages}
          extraFees={library.extraFees}
          totalPrice={totalPrice}
        />
      </Collapsible>
    </LibraryListItem>
  );
}
