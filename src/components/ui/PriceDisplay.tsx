import { cn } from "../../lib/cn";
import { formatCurrency } from "../../utils/formatCurrency";

type PriceDisplayProps = {
  currency?: string;
  locale?: string;
  amount: number;
  className?: string;
};

export function PriceDisplay({
  currency = "SYP",
  locale = "ar-sy",
  amount,
  className,
}: PriceDisplayProps) {
  const formattedAmount = formatCurrency(locale, currency, amount);
  return (
    <span className={cn("font-semibold text-gray-900", className)}>
      {formattedAmount}
    </span>
  );
}
