import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { posts } from '@/content/blog/posts';
import { getSitemapEntries } from '@/lib/store/api';

// ISR with a 1h floor; the fetch below is tagged `store-products` so a catalog
// publish/unpublish revalidates this sitemap on-demand (STORE_CONTRACT §2.4 / §10).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = '2026-06-29';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/journal/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    // Storefront listing. Cart/checkout/account are intentionally excluded (noindex).
    { url: `${SITE_URL}/store/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/journal/${p.slug}/`,
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  // Every published product, slug-based with the trailing slash (trailingSlash:true).
  // Resilient: an unreachable backend yields no product URLs rather than a build error.
  const products = await getSitemapEntries();
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/store/${p.slug}/`,
    lastModified: p.updated_at,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...productRoutes];
}
