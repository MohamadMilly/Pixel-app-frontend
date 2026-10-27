import type { OrderWithDetails } from "../../shared/types/order.type";
import { OrderItem } from "./OrderItem";

type OrdersListProps = {
  orders: OrderWithDetails[];
};

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderItem order={order} />
        </li>
      ))}
    </ul>
  );
}
