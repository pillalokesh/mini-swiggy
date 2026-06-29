import { StoreMap } from "@/components/map/store-map";

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9492520198";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-black text-choco">Find Waffle Whizz</h1>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="dessert-card p-5">
          <p className="font-bold text-choco">Contact</p>
          <p className="mt-2 text-cocoa/90">Phone / WhatsApp: {phone}</p>
          <p className="mt-2 text-cocoa/90">Open daily: 11:00 AM - 11:30 PM</p>
          <a href={`https://wa.me/${phone}`} className="mt-4 inline-block rounded-full bg-caramel px-5 py-2 font-semibold text-cream">Chat on WhatsApp</a>
          <div className="mt-5 rounded-xl bg-biscuit/50 p-4 text-sm text-cocoa/90">
            Franchise inquiries and catering support coming soon.
          </div>
        </div>
        <StoreMap />
      </div>
    </div>
  );
}
