import type { OrderWithDetails } from "../../shared/types/order.type";
import { formatDate } from "../../utils/formatDate";
import { PriceDisplay } from "../ui/PriceDisplay";

export function OrderMeta({ order }: { order: OrderWithDetails }) {
  console.log(order);
  return (
    <dl className="mt-5 grid gap-3 border-t border-secondary pt-4 text-sm sm:grid-cols-3">
      <div>
        <dt className="text-muted">تاريخ الطلب</dt>
        <dd className="mt-1 font-medium text-foreground">
          {formatDate(order.sentAt)}
        </dd>
      </div>
      <div>
        <dt className="text-muted">السعر الإجمالي</dt>
        <dd className="mt-1">
          <PriceDisplay amount={order.totalPrice} />
        </dd>
      </div>
      <div>
        <dt className="text-muted">الصفحات</dt>
        <dd className="mt-1 font-medium text-foreground">
          {order.book.pages} صفحة
        </dd>
      </div>
    </dl>
  );
}
