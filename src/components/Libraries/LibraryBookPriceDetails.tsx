import { PriceDisplay } from "../ui/PriceDisplay";

type LibraryBookPriceDetailsProps = {
  basePrice: number;
  pagePrice: number;
  pages: number;
  extraFees: number;
  totalPrice: number;
};

export function LibraryBookPriceDetails({
  basePrice,
  pagePrice,
  pages,
  extraFees,
  totalPrice,
}: LibraryBookPriceDetailsProps) {
  const printingPrice = pagePrice * pages;

  return (
    <dl className="space-y-2 text-sm">
      <div className="flex items-center justify-between gap-4">
        <dt className="text-muted">السعر الأساسي للكتاب</dt>
        <dd className="shrink-0">
          <PriceDisplay amount={basePrice} />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-muted">
          تكلفة الصفحات ({pages} ×{" "}
          <PriceDisplay amount={pagePrice} className="text-muted" /> للصفحة)
        </dt>
        <dd className="shrink-0">
          <PriceDisplay amount={printingPrice} />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-muted">رسوم إضافية</dt>
        <dd className="shrink-0">
          <PriceDisplay amount={extraFees} />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-secondary pt-2 font-semibold">
        <dt>الإجمالي</dt>
        <dd className="shrink-0">
          <PriceDisplay amount={totalPrice} />
        </dd>
      </div>
    </dl>
  );
}
