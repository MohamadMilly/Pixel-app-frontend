import { BookOpen } from "lucide-react";

export function ImagePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full items-center justify-center bg-secondary/80 text-accent"
    >
      <BookOpen size={40} strokeWidth={1.5} />
    </div>
  );
}
