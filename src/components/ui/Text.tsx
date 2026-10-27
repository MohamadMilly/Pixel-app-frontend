import type { ComponentPropsWithRef } from "react";
import { cn } from "../../lib/cn";

type TextProps = ComponentPropsWithRef<"p">;

export function Text({ className, ...props }: TextProps) {
  return (
    <p
      {...props}
      className={cn("text-base leading-7 text-muted", className)}
    />
  );
}
