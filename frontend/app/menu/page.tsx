"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/format";
import { AddToCartButton } from "@/components/menu/add-to-cart-button";
import { MobileCartBar } from "@/components/cart/mobile-cart-bar";
import type { MenuCategory, MenuItem } from "@/types";

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selected, setSelected] = useState<string>("all");

  useEffect(() => {
    Promise.all([api.getCategories(), api.getMenu()]).then(([catData, menuData]) => {
      setCategories(catData);
      setItems(menuData);
    });
  }, []);

  const visibleItems = useMemo(() => {
    if (selected === "all") return items;
    const cat = categories.find((c) => c.slug === selected);
    return cat ? items.filter((item) => item.category_id === cat.id) : items;
  }, [selected, categories, items]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6">
      <h1 className="text-3xl font-black text-choco">Dessert Menu</h1>
      <p className="mt-2 text-sm text-cocoa/80">Waffle Puff, Waffle Stick, Brownies, Specials and more.</p>

      <div className="sticky top-16 z-30 mt-4 flex gap-2 overflow-x-auto bg-cream py-3">
        <button onClick={() => setSelected("all")} className={`rounded-full px-4 py-2 text-xs font-semibold ${selected === "all" ? "bg-choco text-cream" : "bg-white"}`}>
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelected(category.slug)}
            className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap ${selected === category.slug ? "bg-choco text-cream" : "bg-white"}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-64 animate-pulse rounded-2xl bg-biscuit/50" />
          ))}
        </div>
      )}

      {items.length > 0 && visibleItems.length === 0 && (
        <div className="mt-8 rounded-2xl bg-white p-8 text-center">
          <p className="text-lg font-bold text-choco">No items in this category right now</p>
          <p className="mt-2 text-sm text-cocoa/80">Try another category or check back soon for fresh dessert drops.</p>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <article key={item.id} className="dessert-card overflow-hidden">
            <img src={item.image_url} alt={item.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link href={`/menu/${item.slug}`} className="text-lg font-bold text-choco hover:text-caramel">
                    {item.name}
                  </Link>
                  <p className="text-sm text-cocoa/80">{item.short_description}</p>
                </div>
                {item.is_bestseller && <span className="rounded-full bg-gold px-2 py-1 text-[10px] font-bold text-choco">Bestseller</span>}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-lg font-bold text-choco">{formatINR(item.price)}</p>
                <AddToCartButton item={item} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <MobileCartBar />
    </div>
  );
}
