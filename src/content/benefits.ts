// The four blobs of "THE COLD-PRESSED WAY" constellation (Benefits.tsx). Copy is limited
// to the approved composition / process claims (CLAUDE.md + OJASYA_REPLICATION §4.3, §5):
// no medical or health-outcome language. Each blob carries an organic-blob-masked photo
// (`media` → /public/media benefit-1..4), a `title` shown uppercase via `font-heading`,
// one compliant sentence, and `blob` — an inline CSS border-radius for the organic mask.

export type Benefit = {
  /** base media name in /public/media (benefit-1..4) */
  media: string;
  /** describes the photo subject, for the image alt */
  alt: string;
  /** heading — rendered uppercase in Benefits.tsx */
  title: string;
  /** one approved, compliant sentence */
  body: string;
  /** inline border-radius for the organic blob mask */
  blob: string;
};

export const benefits: Benefit[] = [
  {
    media: 'benefit-1',
    alt: 'Yellow mustard seeds beside fresh cold-pressed oil',
    title: 'High in MUFA & Omega-3',
    body: 'Naturally high in MUFA, it carries Omega-3 into your everyday cooking.',
    blob: '42% 58% 63% 37% / 41% 44% 56% 59%',
  },
  {
    media: 'benefit-2',
    alt: 'Cold-pressed mustard oil poured beside fresh greens',
    title: 'Rich in antioxidants',
    body: 'Unrefined, so the antioxidants the seed holds stay right here in the bottle.',
    blob: '63% 37% 44% 56% / 49% 61% 39% 51%',
  },
  {
    media: 'benefit-3',
    alt: 'Mustard seed being crushed in a kachi ghani press',
    title: 'Cold-pressed & unrefined',
    body: 'Kachi ghani — no added heat, no solvents; golden and whole.',
    blob: '38% 62% 57% 43% / 57% 43% 57% 43%',
  },
  {
    media: 'benefit-4',
    alt: 'Mustard flowers in bloom above a handful of seed',
    title: 'Organically grown',
    body: 'Pressed from mustard grown organically, from a single trusted source.',
    blob: '57% 43% 39% 61% / 43% 57% 43% 57%',
  },
];
