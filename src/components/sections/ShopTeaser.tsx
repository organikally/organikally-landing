'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import Media from '@/components/ui/Media';
import { whatsapp } from '@/lib/site';
import { products, type Category } from '@/content/products';
import { shopFilters, shopMeta } from '@/content/shop';

// The Ojasya "SHOP PURE PRODUCTS" grid, on-brand and honest. A light client-side filter
// (native buttons, useState — no libs) narrows the four range cards by category. Every
// card sends the visitor to a real order path: a gold WhatsApp pill and an outlined-forest
// "View in store" pill. No prices/MRP/%OFF and no fabricated review counts — pricing and
// live stock live in /store/, which the copy points to plainly (CLAUDE.md honesty gate).
export default function ShopTeaser() {
  const [active, setActive] = useState<Category | 'all'>('all');
  const visible = active === 'all' ? products : products.filter((p) => p.category === active);

  return (
    <section id="shop" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <SectionTitle>SHOP PURE PRODUCTS</SectionTitle>

        <Reveal>
          <p className="mx-auto mt-5 max-w-measure text-center leading-relaxed text-ink-muted">
            Order direct on WhatsApp — or open the store for live stock and pricing.
          </p>
        </Reveal>

        {/* Filter tabs — keyboard-operable, aria-pressed marks the active one. */}
        <Reveal>
          <div
            role="group"
            aria-label="Filter products by category"
            className="mt-8 flex flex-wrap justify-center gap-2.5 md:mt-10"
          >
            {shopFilters.map((f) => {
              const isActive = f.key === active;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  aria-pressed={isActive}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold tracking-[-0.01em] transition duration-300 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                    isActive
                      ? 'border-forest bg-forest text-cream shadow-sm'
                      : 'border-forest/20 bg-surface text-forest hover:-translate-y-[1px] hover:border-forest/40 hover:bg-forest/5'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {visible.map((product, i) => {
            const meta = shopMeta[product.slug];
            if (!meta) return null;
            return (
              <Reveal key={product.slug} delay={i * 70} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-card border border-forest/15 bg-surface shadow-sm transition duration-300 ease-brand hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg">
                  <div className="relative overflow-hidden bg-cream">
                    <Media
                      name={meta.media}
                      alt={product.name}
                      width={800}
                      height={800}
                      className="aspect-square w-full"
                      imgClassName="transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-rust">
                      {product.categoryLabel}
                    </p>
                    <h3 className="mt-1.5 font-heading text-lg font-extrabold uppercase leading-tight tracking-[-0.01em] text-forest">
                      {product.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-2 block h-0.5 w-10 rounded-full bg-yellow"
                    />
                    <p className="mt-3 flex items-start gap-1.5 text-sm text-ink-muted">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-forest"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                      {meta.trust}
                    </p>

                    <div className="mt-auto flex flex-col gap-2.5 pt-6">
                      <Cta
                        href={whatsapp(`Hi Organikaly, I'd like to order ${product.name}.`)}
                        variant="primary"
                        whatsapp
                        external
                        className="w-full"
                      >
                        Shop on WhatsApp
                      </Cta>
                      <Link
                        href="/store/"
                        className="group/store inline-flex w-full items-center justify-center gap-2 rounded-full border border-forest/30 px-7 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-forest transition duration-300 ease-brand hover:-translate-y-[2px] hover:border-forest hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                      >
                        View in store
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 ease-brand group-hover/store:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
