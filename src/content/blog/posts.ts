import type { Post } from './types';

// Seed journal posts. Factually defensible, claim-checked (docs/COMPLIANCE.md):
// composition and process, no medical/curative claims. Byline is the brand journal.

const AUTHOR = 'The Organikally Kitchen';

export const posts: Post[] = [
  {
    slug: 'cold-pressed-vs-refined-mustard-oil',
    title: 'Cold-pressed vs refined mustard oil: what actually changes',
    excerpt:
      'Two bottles can both say “mustard oil” and be almost nothing alike. Here is what the pressing actually does to colour, aroma and what stays in the oil.',
    date: '2026-06-12',
    readingMinutes: 5,
    author: AUTHOR,
    tags: ['mustard oil', 'cold-pressed', 'how it’s made'],
    body: [
      {
        type: 'p',
        text: 'If you grew up in an Indian kitchen, you know mustard oil by its smell before you ever see the bottle. That pungency is not a flavouring — it is the seed itself. Whether it survives to your kitchen depends almost entirely on how the oil was pressed.',
      },
      { type: 'h2', text: 'What “cold-pressed” means' },
      {
        type: 'p',
        text: 'Cold-pressing — kachi ghani in the traditional sense — crushes the seed slowly at low temperature. No external heat is forced in, and no solvents or bleaching are used to clean the oil up afterwards. What you get is closer to the seed: deeper colour, the full aroma, and the natural compounds the seed carries.',
      },
      { type: 'h2', text: 'What refining strips away' },
      {
        type: 'p',
        text: 'Commodity “refined” oils are extracted with heat and often solvents, then degummed, bleached and deodorised so one batch looks and smells like the next. That consistency comes at a cost: the colour is lightened, the aroma is largely removed, and the oil is no longer the living thing it started as.',
      },
      {
        type: 'ul',
        items: [
          'Colour: cold-pressed stays a deep, natural gold; refined is paler and uniform.',
          'Aroma: cold-pressed keeps its characteristic pungency; refined is largely neutral.',
          'Composition: mustard oil is naturally high in monounsaturated fat (MUFA) and contains omega-3 (ALA) — cold-pressing aims to retain what heat and refining tend to diminish.',
        ],
      },
      {
        type: 'quote',
        text: 'You are not paying more for a fancier label. You are paying for the steps a refinery skips.',
      },
      { type: 'h2', text: 'How to taste the difference' },
      {
        type: 'p',
        text: 'Warm a teaspoon in a pan. Cold-pressed mustard oil announces itself — that sharp, clean pungency that mellows as it heats. Refined oil stays quiet. Once you have cooked one tadka with the real thing, the difference is hard to un-know.',
      },
    ],
  },
  {
    slug: 'how-to-spot-genuinely-organic-pantry-staples',
    title: 'How to spot genuinely organic pantry staples',
    excerpt:
      '“Organic” is one of the most over-used words on a label. A few practical checks separate a real claim from a printed one.',
    date: '2026-06-05',
    readingMinutes: 6,
    author: AUTHOR,
    tags: ['organic', 'buying guide', 'pantry'],
    body: [
      {
        type: 'p',
        text: 'Walk down any aisle and half the packs claim to be natural, pure or organic. The word is cheap to print and expensive to actually earn. Here is how to tell which is which — for oil, dals, sugar and the rest of the pantry.',
      },
      { type: 'h2', text: 'Look for certification, not adjectives' },
      {
        type: 'p',
        text: 'In India, genuine organic claims are backed by certification (such as the Jaivik Bharat / NPOP system) and an FSSAI licence. A real brand will show its certification details and licence number rather than relying on the word “organic” alone.',
      },
      { type: 'h2', text: 'Ask how it was made' },
      {
        type: 'p',
        text: 'Organic is about the whole chain, not just the farm. For oil, that means cold-pressing rather than solvent extraction. For dals, it means minimal polishing. A brand that can describe its process plainly usually has nothing to hide.',
      },
      {
        type: 'ul',
        items: [
          'Provenance: can they tell you where the crop comes from?',
          'Process: cold-pressed oil, unpolished dals, slow-cooked khand — named, not vague.',
          'Proof: certification body, certificate number, FSSAI licence visible on pack.',
          'Honesty: real organic food varies a little batch to batch — perfect uniformity is a refinery’s trait, not a farm’s.',
        ],
      },
      {
        type: 'quote',
        text: 'Trust is built by what a brand is willing to show you, not by the size of the word on the front.',
      },
      { type: 'h2', text: 'Use your senses' },
      {
        type: 'p',
        text: 'Real food has character. Mustard oil should smell pungent, jaggery sugar should taste of more than just sweet, and unpolished dals look a little less glossy than machine-polished ones. Those small imperfections are the fingerprint of the real thing.',
      },
    ],
  },
  {
    slug: 'yellow-vs-black-mustard-oil',
    title: 'Yellow vs black mustard oil: which one for your kitchen?',
    excerpt:
      'Same family, different character. A quick guide to choosing between yellow (sarson) and black mustard oil for everyday cooking.',
    date: '2026-05-28',
    readingMinutes: 4,
    author: AUTHOR,
    tags: ['mustard oil', 'yellow mustard', 'cooking'],
    body: [
      {
        type: 'p',
        text: 'Mustard oil is not one thing. The seed it comes from shapes its colour, its sharpness and how you want to cook with it. The two you will meet most often are yellow (sarson) and black mustard.',
      },
      { type: 'h2', text: 'Yellow mustard oil' },
      {
        type: 'p',
        text: 'Pressed from yellow mustard seed, this is the milder, rounder of the two. The oil is a clean golden colour with a pungency that is present but not overpowering — which makes it a comfortable everyday oil for tempering, sautéing and pickling.',
      },
      { type: 'h2', text: 'Black mustard oil' },
      {
        type: 'p',
        text: 'Black mustard seed gives a sharper, more assertive oil. It is prized where a bolder mustard bite is wanted — some regional pickles and fish preparations lean into exactly that intensity.',
      },
      {
        type: 'ul',
        items: [
          'Everyday cooking and a balanced flavour → yellow mustard oil.',
          'Bold, traditional pungency for pickles and certain regional dishes → black.',
          'Both are cold-pressed best, so the seed’s character actually reaches your kitchen.',
        ],
      },
      {
        type: 'p',
        text: 'If you are building a single bottle into your daily cooking, yellow mustard oil is the easy place to start: enough character to taste, gentle enough to use every day.',
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
