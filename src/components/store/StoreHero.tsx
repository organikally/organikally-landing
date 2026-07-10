import Link from 'next/link';
import StoreImage from './StoreImage';
import Price from './Price';
import StockBadge from './StockBadge';
import AddToCartButton from './AddToCartButton';
import type { StorefrontProduct } from '@/lib/store/types';

// The store's above-the-fold hero (STORE_CONTRACT §5.2). Pairs the brand pitch with a
// live spotlight product so a shopper lands on an actual thing to buy — not a wall of
// text. Server-rendered; only the add-to-cart is a client island. Degrades to a
// copy-only hero when no spotlight product resolves (backend down / none flagged).
export default function StoreHero({ product }: { product: StorefrontProduct | null }) {
  return (
    <section className="relative overflow-hidden rounded-[26px] border border-line bg-surface md:rounded-[32px]">
      {/* warm oil-gold wash bleeding from the product side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgb(var(--yellow)/0.16),transparent_58%)]"
      />
      <div className="relative grid items-center gap-8 p-6 sm:p-9 md:grid-cols-[1fr_1.05fr] md:gap-10 md:p-12 lg:gap-14 lg:p-14">
        {/* Brand pitch */}
        <div className="max-w-xl">
          <p className="eyebrow">The Organikaly store</p>
          <h1 className="t-headline mt-5 font-semibold text-ink">
            The pantry you&apos;d trust for your own family.
          </h1>
          <p className="t-lead mt-4 max-w-md">
            Cold-pressed oil, organic dals and unrefined khand — made from organically grown seed,
            delivered to your door.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {product && product.in_stock ? (
              <AddToCartButton product={product} label="Add to cart" />
            ) : null}
            <Link
              href="#catalog"
              className="group inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-forest transition-colors hover:text-forest-deep"
            >
              Browse the full pantry
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                ↓
              </span>
            </Link>
          </div>
        </div>

        {/* Spotlight product */}
        {product ? (
          <Link
            href={`/store/${product.slug}/`}
            aria-label={product.name}
            className="group relative block overflow-hidden rounded-[22px] border border-line bg-paper shadow-[0_30px_60px_-40px_rgba(28,25,18,0.5)] transition duration-500 ease-brand hover:-translate-y-1 hover:shadow-[0_40px_70px_-42px_rgba(28,25,18,0.55)]"
          >
            <StoreImage
              src={product.primary_image}
              alt={product.name}
              width={900}
              height={760}
              priority
              className="aspect-[9/8] w-full"
              imgClassName="transition-transform duration-[900ms] ease-brand group-hover:scale-[1.04]"
              sizes="(min-width: 768px) 42rem, 100vw"
            />
            {/* legibility scrim for the caption */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
            />
            <span className="absolute left-4 top-4 rounded-chip bg-forest px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-paper">
              Bestseller
            </span>
            {(!product.in_stock || product.low_stock) && (
              <span className="absolute right-4 top-4">
                <StockBadge
                  inStock={product.in_stock}
                  lowStock={product.low_stock}
                  sellableQty={product.sellable_qty}
                />
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="eyebrow eyebrow-bare text-paper/70">{product.category}</p>
              <h2 className="mt-1 font-display text-xl leading-tight text-paper sm:text-2xl">
                {product.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                <Price
                  pricePaise={product.price_paise}
                  compareAtPaise={product.compare_at_price_paise}
                  className="[&_.line-through]:text-paper/60 [&_.rounded-chip]:bg-yellow [&_.rounded-chip]:text-ink [&_.tnum]:text-paper"
                />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-paper/85 transition-colors group-hover:text-yellow">
                  View details
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
