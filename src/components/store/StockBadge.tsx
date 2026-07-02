// Stock signal pill (STORE_CONTRACT §5.2 live stock). Out-of-stock and low-stock
// states are surfaced on cards + PDP; add-to-cart is disabled when out of stock.
export default function StockBadge({
  inStock,
  lowStock,
  sellableQty,
  className = '',
}: {
  inStock: boolean;
  lowStock: boolean;
  sellableQty?: number;
  className?: string;
}) {
  if (!inStock) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-chip bg-ink/8 px-2.5 py-1 text-xs font-semibold text-ink-muted ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" aria-hidden="true" />
        Out of stock
      </span>
    );
  }
  if (lowStock) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-chip bg-yellow/15 px-2.5 py-1 text-xs font-semibold text-yellow-ink ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-deep" aria-hidden="true" />
        {sellableQty != null && sellableQty > 0 ? `Only ${sellableQty} left` : 'Low stock'}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-chip bg-[#1B5E20]/10 px-2.5 py-1 text-xs font-semibold text-[#1B5E20] ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#1B5E20]" aria-hidden="true" />
      In stock
    </span>
  );
}
