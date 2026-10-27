import { Link, type LinkProps } from "react-router";
import { cn } from "../../lib/cn";

export function TextLink({ to, children, ...props }: LinkProps) {
  return (
    <Link
      viewTransition
      {...props}
      className={cn(
        "inline-flex py-1.5 items-center gap-2 rounded-lg px-3 text-sm font-medium text-accent transition-colors hover:bg-surface-disabled hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        props.className,
      )}
      to={to}
    >
      {children}
    </Link>
  );
}
