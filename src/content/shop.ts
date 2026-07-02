// Presentation layer for the Ojasya-style Shop teaser. The card facts (name, category,
// categoryLabel) come from products.ts — this only adds the styled shop shot and one
// short, FSSAI-safe trust line per product, plus the filter-tab set.
//
// HONESTY (CLAUDE.md food-claims gate): approved claims only — no medical/therapeutic
// language, no fabricated review counts or star ratings, no invented prices/MRP/%OFF.

import type { Category } from './products';

export type ShopMeta = {
  /** base name of the /public/media AVIF·WebP·JPG triplet for the styled shop shot */
  media: string;
  /** short, approved-claim trust line (sensory/process facts only) */
  trust: string;
};

// Keyed by product slug so the wiring stays honest if a product is reordered.
export const shopMeta: Record<string, ShopMeta> = {
  'yellow-mustard-oil': { media: 'shop-oil', trust: 'Cold-pressed · Press-dated fresh' },
  'pulses-dals': { media: 'shop-dals', trust: 'Organically grown · Unpolished' },
  khand: { media: 'shop-khand', trust: 'Organic · Unrefined' },
  'pantry-staples': { media: 'shop-pantry', trust: 'Organically grown · Small-batch' },
};

export type ShopFilter = { key: Category | 'all'; label: string };

// Tab labels the visitor reads, mapped to the product `category` they filter to.
export const shopFilters: ShopFilter[] = [
  { key: 'all', label: 'All Products' },
  { key: 'oil', label: 'Mustard Oil' },
  { key: 'pulses', label: 'Dals' },
  { key: 'sweetener', label: 'Khand' },
  { key: 'pantry', label: 'Pantry' },
];
