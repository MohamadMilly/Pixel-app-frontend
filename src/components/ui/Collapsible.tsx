import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

type CollapsibleProps = {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
};

export function Collapsible({
  label,
  children,
  defaultOpen = false,
  className,
  contentClassName,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-secondary bg-background",
        className,
      )}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-start font-semibold text-foreground transition-colors hover:bg-surface-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          {label}
          <ChevronDown
            aria-hidden="true"
            size={20}
            className={cn(
              "shrink-0 text-muted transition-transform duration-300 ease-in-out motion-reduce:transition-none",
              isOpen && "rotate-180 text-accent",
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "border-t border-secondary px-4 py-4 text-foreground",
              contentClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
