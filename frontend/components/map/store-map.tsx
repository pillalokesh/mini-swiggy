type StoreMapProps = {
  compact?: boolean;
};

export function StoreMap({ compact }: StoreMapProps) {
  const lat = Number(process.env.NEXT_PUBLIC_STORE_LATITUDE || "17.3850");
  const lng = Number(process.env.NEXT_PUBLIC_STORE_LONGITUDE || "78.4867");

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/40 ${compact ? "h-48" : "h-72"}`}>
      <iframe
        title="Waffle Whizz Store Location"
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        className="h-full w-full"
        loading="lazy"
      />
    </div>
  );
}
