import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { updateMyOrderStatus } from "../fakeapi";

export default async function userOrdersAction({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const orderId = formData.get("orderId");

  if (
    intent !== "cancel" ||
    typeof orderId !== "string" ||
    orderId.length === 0
  ) {
    throw new Response("طلب إلغاء غير صالح.", { status: 400 });
  }

  await updateMyOrderStatus(orderId, "CANCELLED");
  return redirect("/orders");
}
