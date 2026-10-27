export function formatDate(date: string | Date, locale: string = "ar-SY") {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dateObj);
}
