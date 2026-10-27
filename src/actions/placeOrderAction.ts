import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { createOrder } from "../fakeapi";

export default async function placeOrderAction({
  params,
  request,
}: ActionFunctionArgs) {
  const bookId = params.bookId;
  if (!bookId) {
    throw new Response("معرّف الكتاب مطلوب لإنشاء الطلب.", { status: 400 });
  }

  const formData = await request.formData();
  const libraryId = formData.get("libraryId");
  if (typeof libraryId !== "string" || libraryId.length === 0) {
    throw new Response("يرجى اختيار مكتبة قبل تأكيد الطلب.", { status: 400 });
  }

  await createOrder(bookId, libraryId);
  return redirect("/orders");
}
