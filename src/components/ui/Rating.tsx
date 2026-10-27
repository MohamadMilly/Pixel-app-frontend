import { Star } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

export function Rating({ rating }: { rating: number }): JSX.Element {
  return (
    <span
      aria-label={`التقييم ${rating} من 5`}
      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary/60 px-2 py-1 text-xs font-medium text-foreground"
    >
      <Star
        aria-hidden="true"
        className="fill-yellow-500 text-yellow-500"
        size={14}
      />
      {rating}
    </span>
  );
}
