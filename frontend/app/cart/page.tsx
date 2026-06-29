"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";

const FREE_DELIVERY_THRESHOLD = 299;

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal)();
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h1 className="text-3xl font-black text-choco">Your cart is empty</h1>
        <p className="mt-2 text-cocoa/80">Cravings waiting. Add your first waffle delight.</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-caramel px-6 py-3 font-semibold text-cream">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-black text-choco">Cart</h1>
      <div className="mt-4 space-y-3">
        {items.map((entry) => {
          const optionKey = entry.selectedOptions.map((opt) => opt.id).sort((a, b) => a - b).join("-");
          return (
            <div key={`${entry.item.id}-${optionKey}`} className="dessert-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-choco">{entry.item.name}</p>
                  <p className="text-sm text-cocoa/80">
                    {entry.selectedOptions.length > 0
                      ? entry.selectedOptions.map((opt) => opt.name).join(", ")
                      : "No customizations"}
                  </p>
                </div>
                <button onClick={() => removeItem(entry.item.id, optionKey)} className="text-sm text-red-600">Remove</button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(entry.item.id, optionKey, entry.quantity - 1)} className="rounded bg-choco px-3 py-1 text-cream">-</button>
                  <span>{entry.quantity}</span>
                  <button onClick={() => updateQuantity(entry.item.id, optionKey, entry.quantity + 1)} className="rounded bg-choco px-3 py-1 text-cream">+</button>
                </div>
                <p className="font-bold text-choco">{formatINR((entry.item.price + entry.selectedOptions.reduce((sum, opt) => sum + opt.price_delta, 0)) * entry.quantity)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 shadow-dessert">
        <p className="font-bold text-choco">Subtotal: {formatINR(subtotal)}</p>
        <p className="mt-2 text-sm text-cocoa/80">
          {remainingForFreeDelivery > 0
            ? `Add ${formatINR(remainingForFreeDelivery)} more to unlock free delivery.`
            : "You unlocked free delivery for eligible addresses."}
        </p>
        <Link href="/checkout" className="mt-4 inline-block w-full rounded-full bg-caramel px-6 py-3 text-center font-bold text-cream">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
