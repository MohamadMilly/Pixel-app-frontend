export function formatCurrency(
  locale: string = "ar-sy",
  currency: string,
  amount: number,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
