import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { posts } from '@/content/blog/posts';
import { getSitemapEntries, getRecipeSitemapEntries } from '@/lib/store/api';

// ISR with a 1h floor; the fetches below are tagged (`store-products`, `recipes`)
// so a catalog or recipe publish revalidates this sitemap on-demand
// (STORE_CONTRACT §2.4 / §10, RECIPES CONTRACT §4).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = '2026-07-11';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/journal/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    // Storefront listing. Cart/checkout/account are intentionally excluded (noindex).
    { url: `${SITE_URL}/store/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/recipes/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/journal/${p.slug}/`,
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  // Every published product + recipe, slug-based with the trailing slash
  // (trailingSlash:true). Resilient: an unreachable backend yields no URLs
  // rather than a build error.
  const [products, recipes] = await Promise.all([
    getSitemapEntries(),
    getRecipeSitemapEntries(),
  ]);
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/store/${p.slug}/`,
    lastModified: p.updated_at,
    changeFrequency: 'daily',
    priority: 0.8,
  }));
  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((r) => ({
    url: `${SITE_URL}/recipes/${r.slug}/`,
    lastModified: r.updated_at,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...productRoutes, ...recipeRoutes];
}
