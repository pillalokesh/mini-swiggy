"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";

export function MobileCartBar() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal)();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/20 bg-choco/95 px-4 py-3 backdrop-blur md:hidden">
      <Link href="/cart" className="flex items-center justify-between rounded-full bg-gradient-to-r from-caramel to-cocoa px-4 py-3 text-sm font-bold text-cream shadow-lg">
        <span>{items.length} items in cart</span>
        <span>{formatINR(subtotal)}</span>
      </Link>
    </div>
  );
}
