import type { ReactNode } from "react";
import type { Library } from "../../shared/types/library.type";
import { Rating } from "../ui/Rating";
import { Text } from "../ui/Text";

type LibraryListItemProps = {
  library: Library;
  children: ReactNode;
};

export function LibraryListItem({ library, children }: LibraryListItemProps) {
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-secondary/70 bg-background p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0 space-y-1">
        <Text className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
          {library.title} • <Rating rating={library.rating} />
        </Text>
        <span className="block text-sm text-muted">{library.location}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:justify-end">
        {children}
      </div>
    </li>
  );
}
