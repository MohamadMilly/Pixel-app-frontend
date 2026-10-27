import { Form } from "react-router";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { TextLink } from "../ui/TextLink";
import type { OrderWithDetails } from "../../shared/types/order.type";
import {
  statusLabels,
  statusVariants,
} from "../../shared/constants/order.constants";
import { OrderMeta } from "./OrderMeta";

type OrderItemProps = {
  order: OrderWithDetails;
};

export function OrderItem({ order }: OrderItemProps) {
  return (
    <article className="rounded-2xl border border-secondary bg-background p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Heading level={2} className="text-xl sm:text-2xl">
            {order.book.title}
          </Heading>
          <Text>
            من {order.library.title} · {order.library.location}
          </Text>
        </div>
        <Badge variant={statusVariants[order.status]}>
          {statusLabels[order.status]}
        </Badge>
      </div>
      <OrderMeta order={order} />
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <TextLink to={`/bookslist/${order.book.id}/details`} className="px-0">
          عرض تفاصيل الكتاب
        </TextLink>
        {order.status === "PENDING" && (
          <Form method="post">
            <input type="hidden" name="intent" value="cancel" />
            <input type="hidden" name="orderId" value={order.id} />
            <Button type="submit" variant="danger">
              إلغاء الطلب
            </Button>
          </Form>
        )}
      </div>
    </article>
  );
}
