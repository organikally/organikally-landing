import ProductCard from './ProductCard';
import type { StorefrontProduct } from '@/lib/store/types';

export default function RelatedProducts({ items }: { items: StorefrontProduct[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-20 border-t border-line pt-12">
      <h2 className="t-title font-semibold text-ink">You might also like</h2>
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {items.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
