"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StoreMap } from "@/components/map/store-map";

const featured = [
  { title: "Triple Chocolate Waffle Puff", price: "55", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { title: "Nutella Loaded Brownie", price: "110", image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { title: "Brownie Blast Milkshake", price: "120", image: "https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=900" }
];

const categories = [
  { name: "Waffle Puff", image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Waffle Stick", image: "https://images.pexels.com/photos/3776948/pexels-photo-3776948.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Ice Cream Waffles", image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Brownies", image: "https://images.pexels.com/photos/45202/chocolate-brownies-cake-dessert-45202.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Milkshakes", image: "https://images.pexels.com/photos/5946974/pexels-photo-5946974.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Specials", image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800" }
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Waffle Whizz",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://lokeshwaffle.in",
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "7330899142",
    servesCuisine: "Desserts",
    priceRange: "₹₹"
  };

  return (
    <div className="text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="choco-section soft-grid relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gold">lokeshwaffle.in</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Where Every Bite is a Waffle Wonder...</h1>
            <p className="mt-4 max-w-xl text-cream/85">
              Craving-led, chocolate-rich, direct ordering for waffles, brownies, and milkshakes. Scan QR, order in seconds, and skip aggregator markups.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/menu" className="rounded-full bg-caramel px-6 py-3 text-sm font-bold shadow-lg">Order Now</Link>
              <Link href="/menu" className="rounded-full border border-cream/40 px-6 py-3 text-sm font-bold">Explore Menu</Link>
              <Link href="/contact" className="rounded-full border border-cream/40 px-6 py-3 text-sm font-bold">Find Us</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * idx }} className="gloss-panel overflow-hidden rounded-2xl">
                <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-gold">Rs {item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-black text-choco">Explore by Category</h2>
        <p className="mt-2 text-sm text-cocoa/80">From waffle puffs to thick milkshakes, choose your mood in one tap.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link href="/menu" key={category.name} className="dessert-card overflow-hidden transition-transform hover:-translate-y-1">
              <img src={category.image} alt={category.name} className="h-36 w-full object-cover" />
              <div className="p-4">
                <p className="text-lg font-bold text-choco">{category.name}</p>
                <p className="text-xs text-cocoa/70">Curated premium treats</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="dessert-card p-5 text-choco">
            <p className="font-bold">Why Order Direct?</p>
            <p className="mt-2 text-sm">Better pricing, faster prep, and exclusive signature combos only at Waffle Whizz.</p>
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

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-2xl font-black text-choco">Dessert Gallery</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800"
          ].map((image, idx) => (
            <img key={idx} src={image} alt="Waffle Whizz dessert gallery" className="h-36 w-full rounded-2xl object-cover shadow-md" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold text-choco">Find Us</h2>
        <p className="mt-2 text-sm text-cocoa/80">Local dessert joy near you. Open for dine-in, takeaway, and delivery.</p>
        <div className="mt-4">
          <StoreMap compact />
        </div>
      </section>
    </div>
  );
}
