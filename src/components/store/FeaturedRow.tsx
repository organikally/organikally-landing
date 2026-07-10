import ProductCard from './ProductCard';
import type { StorefrontProduct } from '@/lib/store/types';

// Featured strip shown between the hero and the full grid (STORE_CONTRACT §5.2).
// A CSS scroll-snap carousel — no JS. Cards show ~1.3 on phones (the peek signals
// "swipe"), settling into a 4-up row on desktop. Server-rendered.
export default function FeaturedRow({ products }: { products: StorefrontProduct[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-12 md:mt-16" aria-labelledby="featured-heading">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">Handpicked</p>
          <h2 id="featured-heading" className="mt-3 font-display text-2xl text-ink md:text-3xl">
            Featured this season
          </h2>
        </div>
      </div>
      <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:thin] md:mx-0 md:px-0">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[74%] shrink-0 snap-start sm:w-[46%] md:w-[30%] lg:w-[23.5%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
