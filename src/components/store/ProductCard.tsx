import Link from 'next/link';
import StoreImage from './StoreImage';
import Price from './Price';
import StockBadge from './StockBadge';
import AddToCartButton from './AddToCartButton';
import BackInStockForm from './BackInStockForm';
import type { StorefrontProduct } from '@/lib/store/types';

// Responsive product card. Server-rendered inside the ISR listing; the add-to-cart
// and back-in-stock pieces are client islands.
export default function ProductCard({ product }: { product: StorefrontProduct }) {
  const href = `/store/${product.slug}/`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-paper shadow-sm transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-md">
      <Link href={href} className="relative block" aria-label={product.name}>
        <StoreImage
          src={product.primary_image}
          alt={product.name}
          width={600}
          height={600}
          className="aspect-square w-full"
          imgClassName="transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
        />
        {product.badges?.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="rounded-chip bg-paper/90 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-muted backdrop-blur"
              >
                {b}
              </span>
            ))}
          </div>
        )}
        {(!product.in_stock || product.low_stock) && (
          <div className="absolute right-3 top-3">
            <StockBadge
              inStock={product.in_stock}
              lowStock={product.low_stock}
              sellableQty={product.sellable_qty}
            />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="eyebrow eyebrow-bare text-ink-faint">{product.category}</p>
        <h3 className="mt-1.5 font-display text-lg leading-snug text-ink">
          <Link href={href} className="transition-colors hover:text-yellow-ink">
            {product.name}
          </Link>
        </h3>
        {product.subtitle && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {product.subtitle}
          </p>
        )}

        <div className="mt-auto pt-4">
          <Price pricePaise={product.price_paise} compareAtPaise={product.compare_at_price_paise} />
          <div className="mt-3">
            {product.in_stock ? (
              <AddToCartButton product={product} variant="compact" className="w-full" />
            ) : (
              <BackInStockForm productId={product.id} compact />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
