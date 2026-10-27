import type { ComponentPropsWithRef } from "react";
import { cn } from "../../lib/cn";

type ImageProps = ComponentPropsWithRef<"img">;

export function Image({ className, ...props }: ImageProps) {
  return (
    <img
      {...props}
      className={cn(
        "h-auto max-w-full rounded-xl border border-secondary object-cover",
        className,
      )}
    />
  );
}
