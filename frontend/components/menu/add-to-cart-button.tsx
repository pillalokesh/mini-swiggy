"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import type { MenuItem } from "@/types";

type Props = {
  item: MenuItem;
};

export function AddToCartButton({ item }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item, []);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleAdd}
      className={`rounded-full px-4 py-2 text-sm font-semibold text-cream ${added ? "bg-[#25D366]" : "bg-caramel"}`}
    >
      {added ? "Added" : "Add"}
    </motion.button>
  );
}
