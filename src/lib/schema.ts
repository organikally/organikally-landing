import { SITE_URL, site } from './site';
import { faqs } from '@/content/faqs';
import { heroProduct } from '@/content/products';
import type { Post } from '@/content/blog/types';

const abs = (path: string) => `${SITE_URL}${path}`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: SITE_URL,
    logo: abs('/brand/organikally-logo.jpg'),
    description: site.description,
    slogan: site.tagline,
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: SITE_URL,
    inLanguage: 'en-IN',
  };
}

// Product schema kept to defensible, verifiable fields only (docs/COMPLIANCE.md):
// no unsubstantiated nutrition/health properties; offers added once a real price/URL exists.
export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: heroProduct.name,
    image: abs(heroProduct.image ?? '/hero/poster.jpg'),
    description:
      'Cold-pressed organic yellow mustard oil, pressed from organically grown seed, nothing added, nothing refined out.',
    brand: { '@type': 'Brand', name: site.name },
    category: 'Mustard oil',
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: abs('/brand/organikally-logo.jpg') },
    },
    mainEntityOfPage: abs(`/journal/${post.slug}/`),
    inLanguage: 'en-IN',
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
