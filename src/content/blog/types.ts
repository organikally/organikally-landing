export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO (YYYY-MM-DD)
  readingMinutes: number;
  author: string;
  tags: string[];
  /** base name of the /public/media AVIF·WebP·JPG cover triplet */
  cover: string;
  coverAlt: string;
  body: Block[];
};
