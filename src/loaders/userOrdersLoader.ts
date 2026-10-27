import type { ApiClient } from "../shared/types/api";

export default function userOrdersLoader(api: ApiClient) {
  return async function () {
    return { orders: await api.getMyOrdersWithDetails() };
  };
}
