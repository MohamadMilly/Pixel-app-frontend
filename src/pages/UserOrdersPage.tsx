import { ShoppingCartMinus } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { PageTitle } from "../components/layout/PageTitle";
import { OrdersList } from "../components/orders/OrdersList";
import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { TextLink } from "../components/ui/TextLink";
import type { OrderWithDetails } from "../shared/types/order.type";
import { useLoaderData } from "react-router";

export function UserOrdersPage() {
  const { orders } = useLoaderData<{ orders: OrderWithDetails[] }>();

  return (
    <PageContainer>
      <header className="mb-8 space-y-2">
        <PageTitle Icon={ShoppingCartMinus} title="طلباتي" />
        <Text>تابع حالة طلبات الكتب وتفاصيلها من هنا.</Text>
      </header>

      {orders.length > 0 ? (
        <OrdersList orders={orders} />
      ) : (
        <section className="rounded-2xl border border-dashed border-secondary bg-surface-disabled px-4 py-10 text-center sm:py-14">
          <Heading level={2} className="text-2xl sm:text-3xl">
            لا توجد طلبات حتى الآن
          </Heading>
          <Text className="mt-2">
            تصفح الكتب واختر المكتبة المناسبة لبدء طلبك.
          </Text>
          <TextLink to="/bookslist" className="mt-4">
            <Button type="button">تصفح الكتب</Button>
          </TextLink>
        </section>
      )}
    </PageContainer>
  );
}
