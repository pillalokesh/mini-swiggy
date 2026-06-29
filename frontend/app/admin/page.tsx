export default function AdminPage() {
  return (
    <div className="dessert-card p-6">
      <h1 className="text-2xl font-black text-choco">Owner Dashboard</h1>
      <p className="mt-2 text-cocoa/80">Future-ready control center for menu, orders, settings, offers, and content blocks.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-biscuit/40 p-4">Menu editable blocks</div>
        <div className="rounded-xl bg-biscuit/40 p-4">Order pipeline snapshot</div>
        <div className="rounded-xl bg-biscuit/40 p-4">Store settings + WhatsApp number</div>
      </div>
    </div>
  );
}
