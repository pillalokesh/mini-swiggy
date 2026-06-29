"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, MenuItem, MenuOption } from "@/types";

type CartState = {
  items: CartItem[];
  addItem: (item: MenuItem, selectedOptions: MenuOption[]) => void;
  removeItem: (itemId: number, optionKey: string) => void;
  updateQuantity: (itemId: number, optionKey: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
};

const getOptionKey = (options: MenuOption[]) =>
  options
    .map((opt) => opt.id)
    .sort((a, b) => a - b)
    .join("-");

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, selectedOptions) => {
        const optionKey = getOptionKey(selectedOptions);
        const existing = get().items.find(
          (entry) => entry.item.id === item.id && getOptionKey(entry.selectedOptions) === optionKey
        );

        if (existing) {
          set({
            items: get().items.map((entry) =>
              entry === existing ? { ...entry, quantity: entry.quantity + 1 } : entry
            )
          });
          return;
        }

        set({
          items: [...get().items, { item, quantity: 1, selectedOptions }]
        });
      },
      removeItem: (itemId, optionKey) => {
        set({
          items: get().items.filter(
            (entry) => !(entry.item.id === itemId && getOptionKey(entry.selectedOptions) === optionKey)
          )
        });
      },
      updateQuantity: (itemId, optionKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId, optionKey);
          return;
        }

        set({
          items: get().items.map((entry) =>
            entry.item.id === itemId && getOptionKey(entry.selectedOptions) === optionKey
              ? { ...entry, quantity }
              : entry
          )
        });
      },
      clearCart: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, entry) => {
          const optionCost = entry.selectedOptions.reduce((acc, opt) => acc + opt.price_delta, 0);
          return sum + (entry.item.price + optionCost) * entry.quantity;
        }, 0)
    }),
    { name: "waffle-whizz-cart" }
  )
);
