import type { ComponentPropsWithRef } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "default" | "danger";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-accent text-on-accent hover:bg-accent-hover",
  danger: "bg-danger text-on-accent hover:bg-danger-hover",
};

export function Button({
  className,
  type = "button",
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        className,
      )}
    />
  );
}
