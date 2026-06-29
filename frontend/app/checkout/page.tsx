"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import type { OrderType } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal)();
  const clearCart = useCartStore((s) => s.clearCart);

  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");

  const canPlace = useMemo(() => {
    if (items.length === 0) return false;
    if (!customerName || !customerPhone) return false;
    if (orderType === "dine-in") return tableNumber.length > 0;
    if (orderType === "delivery") return address.length > 0;
    return true;
  }, [items.length, customerName, customerPhone, orderType, tableNumber, address]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canPlace) return;
    setLoading(true);
    setError("");

    try {
      const response = await api.createOrder({
        customer_name: customerName,
        customer_phone: customerPhone,
        order_type: orderType,
        table_number: orderType === "dine-in" ? tableNumber : undefined,
        delivery_address: orderType === "delivery" ? address : undefined,
        delivery_landmark: orderType === "delivery" ? landmark : undefined,
        notes,
        items: items.map((entry) => ({
          menu_item_id: entry.item.id,
          quantity: entry.quantity,
          option_ids: entry.selectedOptions.map((opt) => opt.id)
        }))
      });

      clearCart();
      router.push(`/order/success?order=${response.order_number}&whatsapp=${encodeURIComponent(response.whatsapp_url)}&amount=${response.total_amount}`);
    } catch (err) {
      setError("Unable to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-black text-choco">Checkout</h1>
      <form onSubmit={submit} className="mt-6 grid gap-5 md:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="dessert-card p-4">
            <p className="font-semibold text-choco">Order Type</p>
            <div className="mt-3 flex gap-2">
              {(["dine-in", "takeaway", "delivery"] as OrderType[]).map((type) => (
                <button key={type} type="button" onClick={() => setOrderType(type)} className={`rounded-full px-4 py-2 text-sm ${orderType === type ? "bg-choco text-cream" : "bg-white"}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="dessert-card space-y-3 p-4">
            <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" className="w-full rounded-lg border border-cocoa/20 px-3 py-2" />
            <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Mobile Number" className="w-full rounded-lg border border-cocoa/20 px-3 py-2" />
            {orderType === "dine-in" && <input value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} placeholder="Table Number" className="w-full rounded-lg border border-cocoa/20 px-3 py-2" />}
            {orderType === "delivery" && (
              <>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery Address" className="w-full rounded-lg border border-cocoa/20 px-3 py-2" />
                <input value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Landmark" className="w-full rounded-lg border border-cocoa/20 px-3 py-2" />
                <div className="rounded-xl border border-dashed border-cocoa/40 bg-biscuit/40 p-3 text-xs text-cocoa/80">
                  Map pin integration placeholder: connect Google Maps or Mapbox here for precise delivery coordinates.
                </div>
              </>
            )}
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Special instructions" className="w-full rounded-lg border border-cocoa/20 px-3 py-2" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <aside className="dessert-card h-fit p-4">
          <p className="font-semibold text-choco">Order Summary</p>
          <div className="mt-3 space-y-2 text-sm">
            {items.map((entry) => (
              <div key={`${entry.item.id}-${entry.quantity}`} className="flex justify-between">
                <span>{entry.item.name} x {entry.quantity}</span>
                <span>{formatINR((entry.item.price + entry.selectedOptions.reduce((sum, opt) => sum + opt.price_delta, 0)) * entry.quantity)}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-cocoa/20 pt-3 font-bold">Subtotal: {formatINR(subtotal)}</p>
          <button disabled={!canPlace || loading} className="mt-4 w-full rounded-full bg-caramel px-4 py-3 font-bold text-cream disabled:opacity-60">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </aside>
      </form>
    </div>
  );
}
