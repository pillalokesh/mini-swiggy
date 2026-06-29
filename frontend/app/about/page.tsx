export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black text-choco">Our Story</h1>
      <p className="mt-4 text-cocoa/90">
        Waffle Whizz was born from one craving: rich chocolate joy that reaches your hands fast, fresh, and indulgent.
        From puff waffles to loaded brownies, every item is crafted with a dessert-first obsession.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="dessert-card p-4"><p className="font-bold text-choco">Crafted Daily</p><p className="text-sm text-cocoa/80 mt-2">Fresh prep with premium toppings and signature drizzles.</p></div>
        <div className="dessert-card p-4"><p className="font-bold text-choco">Direct Pricing</p><p className="text-sm text-cocoa/80 mt-2">No aggregator markup. Better value for loyal customers.</p></div>
        <div className="dessert-card p-4"><p className="font-bold text-choco">Local Love</p><p className="text-sm text-cocoa/80 mt-2">Built for neighborhood cravings and repeat delight.</p></div>
      </div>
    </div>
  );
}
