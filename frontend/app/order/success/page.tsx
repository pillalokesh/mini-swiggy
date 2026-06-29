"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const order = params.get("order") || "WW-PENDING";
  const whatsapp = params.get("whatsapp") || `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9492520198"}`;
  const amount = params.get("amount") || "0";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <div className="dessert-card p-8">
        <p className="text-5xl">🎉</p>
        <h1 className="mt-3 text-3xl font-black text-choco">Order Confirmed</h1>
        <p className="mt-2 text-cocoa/80">Thanks for ordering from Waffle Whizz.</p>
        <div className="mt-6 rounded-xl bg-biscuit/50 p-4 text-left">
          <p><span className="font-semibold">Order ID:</span> {order}</p>
          <p><span className="font-semibold">Amount:</span> Rs {amount}</p>
          <p className="mt-2 text-sm text-cocoa/80">WhatsApp message is ready. Tap below to notify store instantly.</p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={decodeURIComponent(whatsapp)} className="rounded-full bg-[#25D366] px-5 py-3 font-bold text-white">Send on WhatsApp</a>
          <Link href="/menu" className="rounded-full bg-caramel px-5 py-3 font-bold text-cream">Continue Browsing</Link>
        </div>
      </div>
    </div>
  );
}
