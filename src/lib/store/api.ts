// Server-side storefront API client (STORE_CONTRACT §2.4 wiring).
// Used by server components / route handlers ONLY — reads the server-only API_BASE.
// Every call is resilient: on a network/backend failure it returns a safe fallback
// so the marketing build and ISR/SSR pages never crash when the backend is down.
//
// Server-only by convention: reads the server-only `API_BASE` and is imported solely
// from server components / route handlers (never from a `'use client'` module).

import type {
  Paginated,
  StorefrontProduct,
  StorefrontProductDetail,
  StoreCategory,
  StoreConfig,
  SitemapEntry,
  RecipeCard,
  RecipeDetail,
  RecipeType,
} from './types';

// Server-only base (e.g. https://api.organikaly.com/api/v1). Falls back to the
// public base, then to a local dev default, so a build without env still succeeds.
export const API_BASE =
  process.env.API_BASE ?? process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api/v1';

const PRODUCTS_TAG = 'store-products';

type FetchOpts = RequestInit & { next?: { tags?: string[]; revalidate?: number } };

async function getJson<T>(path: string, opts: FetchOpts, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, opts);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    // Backend unreachable (e.g. during a build with no API). Degrade gracefully.
    return fallback;
  }
}

export type ProductQuery = {
  category?: string;
  min_price?: number;
  max_price?: number;
  availability?: 'in_stock' | 'all';
  q?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'featured';
  page?: number;
  page_size?: number;
};

function productSearchParams(query: ProductQuery): string {
  const sp = new URLSearchParams();
  if (query.category) sp.set('category', query.category);
  if (query.min_price != null) sp.set('min_price', String(query.min_price));
  if (query.max_price != null) sp.set('max_price', String(query.max_price));
  if (query.availability) sp.set('availability', query.availability);
  if (query.q) sp.set('q', query.q);
  if (query.sort) sp.set('sort', query.sort);
  if (query.page) sp.set('page', String(query.page));
  if (query.page_size) sp.set('page_size', String(query.page_size));
  const s = sp.toString();
  return s ? `?${s}` : '';
}

const EMPTY_PAGE: Paginated<StorefrontProduct> = { items: [], total: 0, page: 1, page_size: 0 };

/** §5.2 listing — ISR + on-demand (tagged `store-products`). */
export function getProducts(query: ProductQuery = {}): Promise<Paginated<StorefrontProduct>> {
  return getJson(
    `/store/products${productSearchParams(query)}`,
    { next: { tags: [PRODUCTS_TAG], revalidate: 300 } },
    EMPTY_PAGE,
  );
}

/** §5.2 PDP — request-time SSR; product fetch is `no-store` so stock/price are fresh. */
export async function getProduct(slug: string): Promise<StorefrontProductDetail | null> {
  return getJson<StorefrontProductDetail | null>(
    `/store/products/${encodeURIComponent(slug)}`,
    { cache: 'no-store' },
    null,
  );
}

export async function getRelated(slug: string): Promise<StorefrontProduct[]> {
  const data = await getJson<{ items: StorefrontProduct[] }>(
    `/store/products/${encodeURIComponent(slug)}/related`,
    { next: { tags: [PRODUCTS_TAG], revalidate: 300 } },
    { items: [] },
  );
  return data.items ?? [];
}

export async function getFeatured(): Promise<StorefrontProduct[]> {
  const data = await getJson<{ items: StorefrontProduct[] }>(
    `/store/products/featured`,
    { next: { tags: [PRODUCTS_TAG], revalidate: 300 } },
    { items: [] },
  );
  return data.items ?? [];
}

/** §5.2 hero — the single spotlight product (is_hero), or null if none is set. */
export async function getHero(): Promise<StorefrontProduct | null> {
  return getJson<StorefrontProduct | null>(
    `/store/products/hero`,
    { next: { tags: [PRODUCTS_TAG], revalidate: 300 } },
    null,
  );
}

export async function getCategories(): Promise<StoreCategory[]> {
  const data = await getJson<{ items: StoreCategory[] }>(
    `/store/categories`,
    { next: { tags: [PRODUCTS_TAG], revalidate: 300 } },
    { items: [] },
  );
  return data.items ?? [];
}

export async function getStoreConfig(): Promise<StoreConfig | null> {
  return getJson<StoreConfig | null>(
    `/store/config`,
    { next: { tags: [PRODUCTS_TAG], revalidate: 300 } },
    null,
  );
}

/** §2.4 / §10 — sitemap source; tagged `store-products` so publish revalidates it. */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const data = await getJson<{ items: SitemapEntry[] }>(
    `/store/sitemap`,
    { next: { tags: [PRODUCTS_TAG], revalidate: 3600 } },
    { items: [] },
  );
  return data.items ?? [];
}

// ---------------------------------------------------------------------------
// Recipes (RECIPES CONTRACT §2) — tagged `recipes`; an admin publish hits the
// /api/revalidate hook with that tag so pages refresh on demand.
const RECIPES_TAG = 'recipes';

export type RecipeQuery = {
  type?: string;
  q?: string;
  page?: number;
  page_size?: number;
};

export function getRecipes(query: RecipeQuery = {}): Promise<Paginated<RecipeCard>> {
  const sp = new URLSearchParams();
  if (query.type) sp.set('type', query.type);
  if (query.q) sp.set('q', query.q);
  if (query.page) sp.set('page', String(query.page));
  if (query.page_size) sp.set('page_size', String(query.page_size));
  const s = sp.toString();
  return getJson(
    `/store/recipes${s ? `?${s}` : ''}`,
    { next: { tags: [RECIPES_TAG], revalidate: 300 } },
    { items: [], total: 0, page: 1, page_size: 0 },
  );
}

export async function getRecipeTypes(): Promise<RecipeType[]> {
  const data = await getJson<{ items: RecipeType[] }>(
    `/store/recipes/types`,
    { next: { tags: [RECIPES_TAG], revalidate: 300 } },
    { items: [] },
  );
  return data.items ?? [];
}

export function getRecipe(slug: string): Promise<RecipeDetail | null> {
  return getJson<RecipeDetail | null>(
    `/store/recipes/${encodeURIComponent(slug)}`,
    { next: { tags: [RECIPES_TAG], revalidate: 300 } },
    null,
  );
}

export async function getRecipeSitemapEntries(): Promise<SitemapEntry[]> {
  const data = await getJson<{ items: SitemapEntry[] }>(
    `/store/recipes/sitemap`,
    { next: { tags: [RECIPES_TAG], revalidate: 3600 } },
    { items: [] },
  );
  return data.items ?? [];
}
