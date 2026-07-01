import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "7330899142";

export function SiteFooter() {
  return (
    <footer className="mt-16 choco-section text-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-black">Waffle Whizz</p>
          <p className="mt-2 text-sm text-cream/80">Where Every Bite is a Waffle Wonder...</p>
          <p className="mt-3 text-xs text-cream/70">Direct dessert commerce, built for quick QR cravings.</p>
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-cream/90">
            <Link href="/menu">Menu</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">Brand Story</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Order Direct</p>
          <a href={`https://wa.me/${phone}`} className="mt-2 inline-block rounded-full bg-gold px-4 py-2 text-sm font-semibold text-choco shadow-lg">
            WhatsApp: {phone}
          </a>
          <p className="mt-2 text-xs text-cream/70">Open daily: 11 AM - 11:30 PM</p>
        </div>
      </div>
    </footer>
  );
}
