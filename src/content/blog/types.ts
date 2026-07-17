export type FaqItem = { q: string; a: string };

export type LinkItem = { label: string; href: string };

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }
  /** People-Also-Ask block: visible Q&A, also emits a per-post FAQPage. */
  | { type: 'faq'; items: FaqItem[] }
  /** Internal-link module (cluster → pillar → product), rendered as a card. */
  | { type: 'links'; heading?: string; items: LinkItem[] };

/** E-E-A-T citation for a claim in the post. */
export type Source = { label: string; url: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO (YYYY-MM-DD)
  /** ISO (YYYY-MM-DD). When set, drives schema `dateModified` (freshness signal). */
  updated?: string;
  readingMinutes: number;
  author: string;
  tags: string[];
  /** base name of the /public/media AVIF·WebP·JPG cover triplet */
  cover: string;
  coverAlt: string;
  body: Block[];
  /** Sources for health/nutrition/regulatory claims, rendered as a References list. */
  sources?: Source[];
};
