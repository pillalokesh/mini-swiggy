export type OrderType = "dine-in" | "takeaway" | "delivery";

export type MenuCategory = {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
};

export type MenuOption = {
  id: number;
  name: string;
  option_type: string;
  price_delta: number;
  is_required: boolean;
};

export type MenuItem = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  price: number;
  image_url: string;
  image_prompt?: string;
  is_veg: boolean;
  is_bestseller: boolean;
  is_available: boolean;
  badge_text?: string;
  options?: MenuOption[];
};

export type RestaurantInfo = {
  name: string;
  slug: string;
  tagline: string;
  phone: string;
  whatsapp_number: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
};

export type CartItem = {
  item: MenuItem;
  quantity: number;
  selectedOptions: MenuOption[];
  note?: string;
};

export type CheckoutPayload = {
  customer_name: string;
  customer_phone: string;
  order_type: OrderType;
  table_number?: string;
  delivery_address?: string;
  delivery_landmark?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  items: Array<{
    menu_item_id: number;
    quantity: number;
    option_ids: number[];
  }>;
};

export type OrderResponse = {
  order_number: string;
  whatsapp_url: string;
  total_amount: number;
};
