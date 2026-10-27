import type { OrderStatus } from "../types/order.type";

export const statusLabels: Record<OrderStatus, string> = {
  PENDING: "قيد الانتظار , انتظر موافقة المكتبة.",
  ACCEPTED: "مقبول , يرجى الدفع",
  PAID: "مدفوع",
  FULFILLED: "مكتمل",
  CANCELLED: "ملغي",
  REJECTED: "مرفوض",
};

export const statusVariants: Record<
  OrderStatus,
  "default" | "success" | "danger" | "muted"
> = {
  PENDING: "default",
  ACCEPTED: "success",
  PAID: "success",
  FULFILLED: "success",
  CANCELLED: "danger",
  REJECTED: "danger",
};
