"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const navItems = [
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Find Us" },
    { href: "/admin", label: "Admin" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-choco/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-cream">
        <Link href="/" className="leading-tight">
          <p className="text-xl font-black tracking-wide">Waffle Whizz</p>
          <p className="text-[10px] text-cream/70">Where Every Bite is a Waffle Wonder...</p>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${pathname?.startsWith(item.href) ? "bg-cream text-choco" : "text-cream/80 hover:text-cream"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setOpen((prev) => !prev)} className="rounded-full border border-cream/40 px-3 py-1.5 text-xs md:hidden">
            Menu
          </button>
          <Link href="/cart" className="relative rounded-full bg-caramel px-4 py-1.5 text-sm font-semibold text-cream">
            Cart
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-2 -top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-choco"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-choco px-4 pb-4 pt-2 md:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl bg-white/10 px-3 py-2 text-sm">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
