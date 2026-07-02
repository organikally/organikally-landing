// The range. Architected so adding a product needs no redesign, append here.
// `icon` is a Lucide icon name; `image` is used when a real product shot exists.

export type Category = 'oil' | 'pulses' | 'sweetener' | 'pantry';

export type Product = {
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  blurb: string;
  icon: string;
  image?: string;
  /** base name of a /public/media AVIF·WebP·JPG triplet, used as the range thumbnail */
  media?: string;
  hindi?: string;
  available: boolean;
  hero?: boolean;
};

export const products: Product[] = [
  {
    slug: 'yellow-mustard-oil',
    name: 'Yellow Mustard Oil',
    category: 'oil',
    categoryLabel: 'Cold-pressed oil',
    blurb: 'Cold-pressed from organically grown yellow mustard seed. Kachi ghani, nothing refined out.',
    icon: 'droplet',
    image: '/brand/product-bottle.webp',
    media: 'seeds',
    hindi: 'सरसों का तेल',
    available: true,
    hero: true,
  },
  {
    slug: 'pulses-dals',
    name: 'Pulses & Dals',
    category: 'pulses',
    categoryLabel: 'Everyday staples',
    blurb: 'A growing range of organically grown dals, unpolished, sorted, and honestly graded.',
    icon: 'wheat',
    media: 'dals',
    available: true,
  },
  {
    slug: 'khand',
    name: 'Khand',
    category: 'sweetener',
    categoryLabel: 'Unrefined sugar',
    blurb: 'Organically grown, unrefined khand, the warm, golden sweetness of slow-cooked cane with its natural colour and aroma kept in.',
    icon: 'candy',
    media: 'khand',
    available: true,
  },
  {
    slug: 'pantry-staples',
    name: 'Pantry Staples',
    category: 'pantry',
    categoryLabel: 'The wider kitchen',
    blurb: 'Organic kitchen essentials, added with the same care as the oil, more arriving soon.',
    icon: 'basket',
    media: 'pantry',
    available: true,
  },
];

export const heroProduct = products.find((p) => p.hero)!;
