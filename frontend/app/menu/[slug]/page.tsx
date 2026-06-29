"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import type { MenuItem, MenuOption } from "@/types";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<MenuOption[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!params.slug) return;
    api.getMenuItem(params.slug).then(setItem);
    api.getMenu().then(setAllItems);
  }, [params.slug]);

  const total = useMemo(() => {
    if (!item) return 0;
    const delta = selectedOptions.reduce((sum, option) => sum + option.price_delta, 0);
    return item.price + delta;
  }, [item, selectedOptions]);

  if (!item) return <div className="mx-auto max-w-4xl px-4 py-10">Loading...</div>;

  const related = allItems.filter((entry) => entry.category_id === item.category_id && entry.id !== item.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        <img src={item.image_url} alt={item.name} className="h-72 w-full rounded-2xl object-cover" />
        <div>
          <h1 className="text-3xl font-black text-choco">{item.name}</h1>
          <p className="mt-2 text-cocoa/80">{item.full_description || item.short_description}</p>
          <p className="mt-4 text-2xl font-bold text-choco">{formatINR(total)}</p>

          {item.options && item.options.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="font-semibold">Customizations</p>
              {item.options.map((option) => {
                const active = selectedOptions.some((entry) => entry.id === option.id);
                return (
                  <label key={option.id} className="flex items-center justify-between rounded-xl border border-cocoa/20 bg-white p-3 text-sm">
                    <span>{option.name}</span>
                    <span className="flex items-center gap-2">
                      <span>{option.price_delta > 0 ? `+${formatINR(option.price_delta)}` : "Included"}</span>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={(ev) => {
                          if (ev.target.checked) setSelectedOptions([...selectedOptions, option]);
                          else setSelectedOptions(selectedOptions.filter((entry) => entry.id !== option.id));
                        }}
                      />
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          <button onClick={() => addItem(item, selectedOptions)} className="mt-6 w-full rounded-full bg-caramel px-6 py-3 font-bold text-cream">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-choco">You may also love</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {related.map((rel) => (
            <Link key={rel.id} href={`/menu/${rel.slug}`} className="dessert-card p-3">
              <p className="font-semibold">{rel.name}</p>
              <p className="text-sm text-cocoa/80">{formatINR(rel.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
