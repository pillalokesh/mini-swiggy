import type {
  CheckoutPayload,
  MenuCategory,
  MenuItem,
  OrderResponse,
  RestaurantInfo
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getRestaurant: () => fetcher<RestaurantInfo>("/api/public/restaurant"),
  getMenu: () => fetcher<MenuItem[]>("/api/public/menu"),
  getCategories: () => fetcher<MenuCategory[]>("/api/public/menu/categories"),
  getMenuItem: (slug: string) => fetcher<MenuItem>(`/api/public/menu/items/${slug}`),
  createOrder: (payload: CheckoutPayload) =>
    fetcher<OrderResponse>("/api/public/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
