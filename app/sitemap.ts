import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { posts } from '@/content/blog/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = '2026-06-20';
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/journal/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/journal/${p.slug}/`,
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));
  return [...staticRoutes, ...postRoutes];
}
