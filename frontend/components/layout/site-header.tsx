"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export function SiteHeader() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-choco/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-cream">
        <Link href="/" className="text-xl font-black tracking-wide">
          Waffle Whizz
        </Link>
        <nav className="hidden gap-5 text-sm md:flex">
          <Link href="/menu">Menu</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Find Us</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <Link href="/cart" className="rounded-full bg-caramel px-3 py-1.5 text-sm font-semibold text-cream">
          Cart ({cartCount})
        </Link>
      </div>
    </header>
  );
}
