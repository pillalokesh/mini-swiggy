"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StoreMap } from "@/components/map/store-map";

const featured = [
  { title: "Triple Chocolate Waffle Puff", price: "55", image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=900&q=80" },
  { title: "Nutella Loaded Brownie", price: "110", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476b?auto=format&fit=crop&w=900&q=80" },
  { title: "Double Ice Cream Waffle", price: "120", image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=900&q=80" }
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Waffle Whizz",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://lokeshwaffle.in",
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9492520198",
    servesCuisine: "Desserts",
    priceRange: "₹₹"
  };

  return (
    <div className="bg-dessert-glow text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gold">Waffle Whizz</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Where Every Bite is a Waffle Wonder...</h1>
            <p className="mt-4 max-w-xl text-cream/85">
              A direct-order dessert storefront for rich waffles, gooey brownies, and impulse craving drops. Built for quick QR ordering.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/menu" className="rounded-full bg-caramel px-6 py-3 text-sm font-bold">Order Now</Link>
              <Link href="/menu" className="rounded-full border border-cream/40 px-6 py-3 text-sm font-bold">Explore Menu</Link>
              <Link href="/contact" className="rounded-full border border-cream/40 px-6 py-3 text-sm font-bold">Find Us</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * idx }} className="overflow-hidden rounded-2xl border border-white/30 bg-white/10">
                <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-gold">Rs {item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="dessert-card p-5 text-choco">
            <p className="font-bold">Why Order Direct?</p>
            <p className="mt-2 text-sm">Better pricing, faster prep, and special offers straight from Waffle Whizz.</p>
          </div>
          <div className="dessert-card p-5 text-choco">
            <p className="font-bold">Takeaway + Delivery</p>
            <p className="mt-2 text-sm">Smart local delivery logic with future free-delivery threshold support.</p>
          </div>
          <div className="dessert-card p-5 text-choco">
            <p className="font-bold">QR Fast Ordering</p>
            <p className="mt-2 text-sm">Scan, add, checkout, WhatsApp confirmation. Built mobile-first.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold">Find Us</h2>
        <p className="mt-2 text-sm text-cream/80">Local dessert joy near you. Open for dine-in, takeaway, and delivery.</p>
        <div className="mt-4">
          <StoreMap compact />
        </div>
      </section>
    </div>
  );
}
