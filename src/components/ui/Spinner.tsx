import { Loader } from "lucide-react";
import { Text } from "./Text";
import { cn } from "../../lib/cn";

export function Spinner({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 justify-center items-center", className)}>
      <Loader size={24} className="animate-spin text-accent" />
      <Text>{label}</Text>
    </div>
  );
}
