import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-[220px_1fr]">
      <aside className="dessert-card h-fit p-4">
        <p className="font-bold text-choco">Admin Panel</p>
        <nav className="mt-3 flex flex-col gap-2 text-sm">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/menu">Menu Management</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/settings">Settings</Link>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
