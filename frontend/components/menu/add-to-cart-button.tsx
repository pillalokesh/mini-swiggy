"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import type { MenuItem } from "@/types";

type Props = {
  item: MenuItem;
};

export function AddToCartButton({ item }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => addItem(item, [])}
      className="rounded-full bg-caramel px-4 py-2 text-sm font-semibold text-cream"
    >
      Add to Cart
    </motion.button>
  );
}
