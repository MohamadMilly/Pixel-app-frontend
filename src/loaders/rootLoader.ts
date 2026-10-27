import type { ApiClient } from "../shared/types/api";

export function rootLoader(api: ApiClient) {
  return async () => {
    const ordersCount = await api.getOrdersCount();
    return { ordersCount };
  };
}
