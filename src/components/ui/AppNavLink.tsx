import { NavLink, type NavLinkProps } from "react-router";
import { cn } from "../../lib/cn";

export function AppNavLink({ className, ...props }: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={(navState) =>
        cn(
          "inline-flex min-h-10 items-center justify-center rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-disabled hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:px-4 sm:text-base",
          navState.isActive && "text-white font-semibold bg-accent",
          navState.isPending && "animate-pulse bg-accent/50",
          typeof className === "function" ? className(navState) : className,
        )
      }
    />
  );
}
