import { formatPaise } from '@/lib/format';

// Displays the price from integer paise (STORE_CONTRACT §0.1), with an optional
// strike-through compare-at (MRP) reference. Display-only — never a money source.
export default function Price({
  pricePaise,
  compareAtPaise,
  className = '',
  size = 'md',
}: {
  pricePaise: number;
  compareAtPaise?: number | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const hasCompare = compareAtPaise != null && compareAtPaise > pricePaise;
  const priceClass =
    size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-xl';
  return (
    <span className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 ${className}`}>
      <span className={`tnum font-semibold text-ink ${priceClass}`}>{formatPaise(pricePaise)}</span>
      {hasCompare && (
        <>
          <span className="tnum text-sm text-ink-faint line-through">
            {formatPaise(compareAtPaise)}
          </span>
          <span className="rounded-chip bg-yellow/15 px-1.5 py-0.5 text-xs font-semibold text-yellow-ink">
            {Math.round(((compareAtPaise - pricePaise) / compareAtPaise) * 100)}% off
          </span>
        </>
      )}
    </span>
  );
}
