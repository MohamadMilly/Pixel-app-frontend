import type { ComponentPropsWithRef } from "react";
import { cn } from "../../lib/cn";

type BadgeVariant = "default" | "success" | "danger" | "muted";

type BadgeProps = ComponentPropsWithRef<"span"> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-secondary text-accent",
  success: "bg-success-surface text-success border-success",
  danger: "bg-danger-surface text-danger border-danger",
  muted: "bg-neutral-surface text-muted",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex w-fit border items-center rounded-full px-3 py-1 text-sm font-medium",
        variantStyles[variant],
        className,
      )}
    />
  );
}
