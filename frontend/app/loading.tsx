export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-10 w-72 animate-pulse rounded-lg bg-biscuit/60" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-60 animate-pulse rounded-2xl bg-biscuit/50" />
        ))}
      </div>
    </div>
  );
}
