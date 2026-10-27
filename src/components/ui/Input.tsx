import type { ComponentPropsWithRef } from "react";
import { cn } from "../../lib/cn";

type InputProps = ComponentPropsWithRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border border-secondary bg-background px-3 py-2 text-foreground placeholder:text-placeholder focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:opacity-70",
        className,
      )}
    />
  );
}
