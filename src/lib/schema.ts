import { SITE_URL, site } from './site';
import { faqs } from '@/content/faqs';
import { heroProduct } from '@/content/products';
import type { Post } from '@/content/blog/types';
import type { StorefrontProductDetail, RecipeDetail } from '@/lib/store/types';

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
    image: abs(`/media/${post.cover}.jpg`),
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

// ── Storefront schema (STORE_CONTRACT §10) — additive; the parameterless
// productSchema()/breadcrumbSchema() above are FROZEN and unchanged. ──────────

/**
 * JSON-LD Product for a storefront PDP. Built from request-time-fresh data so the
 * crawler-visible offer price + availability always match the live page. Backend
 * image URLs are absolute (S3/CDN), so they are NOT prefixed with SITE_URL.
 * `aggregateRating` is intentionally omitted at launch — emitted only when a
 * verified first-party review source exists (no self-serving ratings).
 */
export function storeProductSchema(product: StorefrontProductDetail) {
  const path = product.canonical_path || `/store/${product.slug}/`;
  const images = product.images?.length ? product.images : [product.primary_image];
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    price: (product.price_paise / 100).toFixed(2),
    priceCurrency: product.currency || 'INR',
    availability: product.in_stock
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: product.brand || site.name },
    url: abs(path),
  };

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.seo_description || product.description,
    brand: { '@type': 'Brand', name: product.brand || site.name },
    offers: offer,
  };
  if (product.sku_code) schema.sku = product.sku_code;
  if (product.gtin) schema.gtin = product.gtin;
  if (product.category) schema.category = product.category;
  return schema;
}

/** BreadcrumbList for the storefront (additive; mirrors breadcrumbSchema). */
export function storeBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
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

/**
 * Recipe rich-result schema (RECIPES CONTRACT §4). Times in ISO-8601 durations;
 * ingredients flattened from their display groups; instructions as HowToSteps.
 * Author is the brand kitchen (an Organization), matching the journal's idiom.
 */
export function recipeSchema(recipe: RecipeDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: recipe.og_image || recipe.hero_image,
    description: recipe.seo_description || recipe.description,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: abs('/brand/organikally-logo.jpg') },
    },
    ...(recipe.created_at ? { datePublished: recipe.created_at } : {}),
    prepTime: `PT${recipe.prep_min}M`,
    cookTime: `PT${recipe.cook_min}M`,
    totalTime: `PT${recipe.total_min}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.recipe_type,
    recipeCuisine: 'Indian',
    keywords: recipe.tags.join(', '),
    recipeIngredient: recipe.ingredients.flatMap((g) => g.items),
    recipeInstructions: recipe.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
    mainEntityOfPage: abs(recipe.canonical_path),
    inLanguage: 'en-IN',
  };
}
