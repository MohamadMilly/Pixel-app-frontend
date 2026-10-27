import type { ComponentPropsWithRef } from "react";
import { cn } from "../../lib/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingProps = ComponentPropsWithRef<"h1"> & {
  level?: HeadingLevel;
};

const headingSizes: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-5xl",
  2: "text-3xl sm:text-4xl",
  3: "text-2xl sm:text-3xl",
  4: "text-xl sm:text-2xl",
  5: "text-lg sm:text-xl",
  6: "text-base sm:text-lg",
};

export function Heading({ level = 1, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      {...props}
      className={cn(
        "font-semibold tracking-tight text-foreground",
        headingSizes[level],
        className,
      )}
    />
  );
}
