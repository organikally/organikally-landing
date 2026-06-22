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
    cover: 'blog-cold-pressed',
    coverAlt: 'A ribbon of deep golden cold-pressed mustard oil pouring from a wooden ghani into a glass jar',
    body: [
      {
        type: 'p',
        text: 'If you grew up in an Indian kitchen, you know mustard oil by its smell before you ever see the bottle. That pungency is not a flavouring, it is the seed itself. Whether it survives to your kitchen depends almost entirely on how the oil was pressed.',
      },
      { type: 'h2', text: 'What “cold-pressed” means' },
      {
        type: 'p',
        text: 'Cold-pressing, kachi ghani in the traditional sense, crushes the seed slowly at low temperature. No external heat is forced in, and no solvents or bleaching are used to clean the oil up afterwards. What you get is closer to the seed: deeper colour, the full aroma, and the natural compounds the seed carries.',
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
          'Composition: mustard oil is naturally high in monounsaturated fat (MUFA) and contains omega-3 (ALA), cold-pressing aims to retain what heat and refining tend to diminish.',
        ],
      },
      {
        type: 'quote',
        text: 'You are not paying more for a fancier label. You are paying for the steps a refinery skips.',
      },
      { type: 'h2', text: 'How to taste the difference' },
      {
        type: 'p',
        text: 'Warm a teaspoon in a pan. Cold-pressed mustard oil announces itself, that sharp, clean pungency that mellows as it heats. Refined oil stays quiet. Once you have cooked one tadka with the real thing, the difference is hard to un-know.',
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
    cover: 'blog-organic-pantry',
    coverAlt: 'Hands holding a plain glass bottle of golden mustard oil up to the window light to check its colour',
    body: [
      {
        type: 'p',
        text: 'Walk down any aisle and half the packs claim to be natural, pure or organic. The word is cheap to print and expensive to actually earn. Here is how to tell which is which, for oil, dals, sugar and the rest of the pantry.',
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
          'Process: cold-pressed oil, unpolished dals, slow-cooked khand, named, not vague.',
          'Proof: certification body, certificate number, FSSAI licence visible on pack.',
          'Honesty: real organic food varies a little batch to batch, perfect uniformity is a refinery’s trait, not a farm’s.',
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
    cover: 'blog-yellow-black',
    coverAlt: 'Two rustic bowls side by side, one of pale yellow mustard seeds and one of dark black mustard seeds',
    body: [
      {
        type: 'p',
        text: 'Mustard oil is not one thing. The seed it comes from shapes its colour, its sharpness and how you want to cook with it. The two you will meet most often are yellow (sarson) and black mustard.',
      },
      { type: 'h2', text: 'Yellow mustard oil' },
      {
        type: 'p',
        text: 'Pressed from yellow mustard seed, this is the milder, rounder of the two. The oil is a clean golden colour with a pungency that is present but not overpowering, which makes it a comfortable everyday oil for tempering, sautéing and pickling.',
      },
      { type: 'h2', text: 'Black mustard oil' },
      {
        type: 'p',
        text: 'Black mustard seed gives a sharper, more assertive oil. It is prized where a bolder mustard bite is wanted, some regional pickles and fish preparations lean into exactly that intensity.',
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
  {
    slug: 'how-to-cook-with-mustard-oil',
    title: 'How to cook with mustard oil (and why you heat it first)',
    excerpt:
      'Raw mustard oil is sharp on purpose. One simple step before you cook turns that bite into the warm, rounded flavour a good tadka is built on.',
    date: '2026-06-19',
    readingMinutes: 4,
    author: AUTHOR,
    tags: ['mustard oil', 'cooking', 'technique'],
    cover: 'blog-cooking',
    coverAlt: 'Golden mustard oil heating in a steel kadhai on the stove, just reaching smoking point',
    body: [
      {
        type: 'p',
        text: 'Cold-pressed mustard oil arrives with its full pungency intact, that is the point of pressing it gently. Used straight from the bottle in a cold dish it can taste sharp, which is why generations of Indian cooks heat it first.',
      },
      { type: 'h2', text: 'Heat it to smoking, then ease off' },
      {
        type: 'p',
        text: 'Warm the oil in a pan until it just begins to smoke and the sharp edge softens, then bring the heat down before you add anything. This short step mellows the raw bite and leaves the warm, nutty character you actually want to cook in.',
      },
      { type: 'h2', text: 'Then build your tadka' },
      {
        type: 'p',
        text: 'Once the oil is ready, drop in mustard seeds, hing and curry leaves and let them crackle. That sizzle is the base of dal, sabzi and chutney across the country, and the oil carries every one of those flavours.',
      },
      {
        type: 'ul',
        items: [
          'Heat to smoking point, then lower the flame before adding aromatics.',
          'Use it for tempering, sautéing, shallow-frying and pickling.',
          'A clean golden oil with real pungency does more work than a neutral, refined one.',
        ],
      },
      {
        type: 'quote',
        text: 'The smell that fills the kitchen when the oil hits the pan is half the cooking.',
      },
      {
        type: 'p',
        text: 'Treat the oil as an ingredient, not just a medium, and a plain weeknight sabzi starts tasting like something made with intent.',
      },
    ],
  },
  {
    slug: 'what-unrefined-khand-keeps',
    title: 'Khand: what unrefined sugar keeps that white sugar loses',
    excerpt:
      'White sugar is stripped down to pure sweetness. Khand is cane sugar that stops earlier, keeping the colour, aroma and minerals refining takes out.',
    date: '2026-06-16',
    readingMinutes: 4,
    author: AUTHOR,
    tags: ['khand', 'unrefined sugar', 'pantry'],
    cover: 'blog-khand',
    coverAlt: 'A broken block of golden-brown unrefined khand jaggery beside a scoop of granulated khand',
    body: [
      {
        type: 'p',
        text: 'Most sugar on the shelf has been refined to a single thing: clean, white, uniform sweetness. Khand takes the same cane juice and stops well before that point, which is exactly why it tastes of more.',
      },
      { type: 'h2', text: 'What refining removes' },
      {
        type: 'p',
        text: 'To make white sugar, cane juice is clarified, crystallised and spun in a centrifuge to throw off the molasses, then often bleached. Each step lightens the colour and strips the flavour until what is left is sweetness and very little else.',
      },
      { type: 'h2', text: 'What khand keeps' },
      {
        type: 'p',
        text: 'Khand is slow-cooked and left partly unrefined, so it holds on to some of the molasses, its natural warm colour and the minerals that come with it. The result is a softer, golden sugar with a faint caramel, almost toffee, character.',
      },
      {
        type: 'ul',
        items: [
          'Colour: a natural warm gold, not bleached white.',
          'Flavour: a gentle molasses note instead of flat sweetness.',
          'Process: slow-cooked and partly unrefined, not centrifuged and bleached.',
        ],
      },
      {
        type: 'p',
        text: 'Use it anywhere you would use sugar, in chai, in kheer, in baking, and it quietly adds a depth that plain white sugar cannot.',
      },
    ],
  },
  {
    slug: 'why-mustard-oil-makes-achaar-keep',
    title: 'Why mustard oil makes aam ka achaar keep',
    excerpt:
      'A good pickle has to survive a year on the shelf. Mustard oil is the traditional reason it can, and the reason it tastes the way it does.',
    date: '2026-06-08',
    readingMinutes: 5,
    author: AUTHOR,
    tags: ['mustard oil', 'achaar', 'tradition'],
    cover: 'blog-achaar',
    coverAlt: 'A glass jar of golden mango achaar maturing on a sunlit windowsill',
    body: [
      {
        type: 'p',
        text: 'Across India, achaar is made in summer and eaten all year. The oil it is packed in is not incidental, it is what lets a jar of mango and spice sit in the pantry for months and only get better.',
      },
      { type: 'h2', text: 'The oil does real work' },
      {
        type: 'p',
        text: 'Packed over the cut fruit and spices, mustard oil seals the achaar from air and keeps it submerged, while its pungency runs through every piece. A pickle left to mature in the sun draws all of that flavour in slowly, over weeks.',
      },
      { type: 'h2', text: 'Why cold-pressed matters here' },
      {
        type: 'p',
        text: 'A refined, deodorised oil brings none of this character to the jar. Cold-pressed mustard oil keeps the sharp, warming pungency that defines a traditional aam ka achaar, the taste people remember from a grandmother’s kitchen.',
      },
      {
        type: 'ul',
        items: [
          'Pack the fruit and spices so the oil covers them completely.',
          'Let the jar mature in the sun, giving it a stir every few days.',
          'Use a cold-pressed oil with real bite, the pickle takes its character from it.',
        ],
      },
      {
        type: 'quote',
        text: 'A jar of achaar is mustard oil with patience added.',
      },
    ],
  },
  {
    slug: 'unpolished-dals-what-polishing-removes',
    title: 'Unpolished dals: what polishing takes off',
    excerpt:
      'Glossy, uniform dal looks appealing on the shelf. That shine is added, and the pulse gives up a little of itself to get there.',
    date: '2026-05-22',
    readingMinutes: 4,
    author: AUTHOR,
    tags: ['dals', 'organic', 'pantry'],
    cover: 'blog-dals',
    coverAlt: 'Close-up of unpolished split pulses showing their natural matte surface and colour variation',
    body: [
      {
        type: 'p',
        text: 'Two bags of the same dal can look very different, one bright and glossy, the other a little duller and more varied. The difference is usually polishing, and the duller bag is often the more honest one.',
      },
      { type: 'h2', text: 'What polishing is' },
      {
        type: 'p',
        text: 'After milling, many dals are buffed for shine, sometimes with water and oil, sometimes with agents added only for looks, so the pulse appears uniform and appealing. It is cosmetic: it changes how the dal looks, not how it cooks or tastes.',
      },
      { type: 'h2', text: 'Why we leave them unpolished' },
      {
        type: 'p',
        text: 'Unpolished dals keep their natural matte surface and a little batch-to-batch variation. They soak and cook just as well, and you are buying the pulse itself rather than a finish applied to sell it.',
      },
      {
        type: 'ul',
        items: [
          'Look: a natural matte surface, not a manufactured shine.',
          'Variation: real pulses differ slightly, perfect uniformity is a processing trait.',
          'Honesty: nothing added for appearance, just the dal, sorted and graded.',
        ],
      },
      {
        type: 'p',
        text: 'Cook them the way you always have, the only thing missing is the polish that was never doing you any favours.',
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
