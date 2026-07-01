export function WhatsAppFab() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "7330899142";
  return (
    <a
      href={`https://wa.me/${phone}`}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-2xl ring-4 ring-white/20"
    >
      Order on WhatsApp
    </a>
  );
}
