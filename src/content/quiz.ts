// "Find your Organikally" — a light 2-step matcher that routes intent to a real order
// path. We only recommend what we actually sell (Yellow Mustard Oil) and, for the
// pantry answer, nudge toward the range. No invented SKUs. All copy stays to the
// approved claims (HOMELY_REFACTOR §5): sensory + culinary facts, never medical.

export type CookingId = 'tadka' | 'achaar' | 'frying' | 'pantry';
export type AudienceId = 'me' | 'family' | 'trade';

export type Option<T extends string> = {
  id: T;
  label: string;
  hint?: string;
};

export const cookingQuestion = 'What are you cooking most?';

export const cookingOptions: Option<CookingId>[] = [
  { id: 'tadka', label: 'Everyday tadka & sabzi', hint: 'Daily tempering and sautéing' },
  { id: 'achaar', label: 'Pickling & achaar', hint: 'Sarson ka achaar and preserves' },
  { id: 'frying', label: 'Deep-frying & festive', hint: 'Pakoras, pooris and feast days' },
  { id: 'pantry', label: 'Baking & the wider pantry', hint: 'Oil plus the rest of the kitchen' },
];

export const audienceQuestion = 'And who are you cooking for?';

export const audienceOptions: Option<AudienceId>[] = [
  { id: 'me', label: 'Just me', hint: 'A bottle to cook with' },
  { id: 'family', label: 'My family', hint: 'The everyday kitchen' },
  { id: 'trade', label: 'A shop or kitchen', hint: 'Bulk & trade' },
];

export type QuizResult = {
  eyebrow: string;
  title: string;
  hindi?: string;
  line: string;
  /** base name of a /public/media triplet */
  image: string;
  /** prefilled WhatsApp order message */
  order: string;
  /** prefilled WhatsApp bulk/trade message, when the answer is a shop or kitchen */
  trade?: string;
  /** surface a nudge toward the wider range */
  rangeNudge?: boolean;
};

// One tailored, sensory/culinary line per cooking answer — no health outcomes.
const cookingLine: Record<CookingId, string> = {
  tadka:
    'For everyday tadka and sabzi, cold-pressed yellow mustard oil brings that warm, familiar aroma to the very first sizzle in the pan.',
  achaar:
    'For pickling and achaar, its natural pungency and deep golden colour are exactly what a good sarson ka achaar wants.',
  frying:
    'For deep-frying and festive cooking, its high smoke point is why it has long been the traditional choice for pakoras, pooris and feast days.',
  pantry:
    'The oil anchors your pantry — and the same press and the same patience now run across our dals, khand and staples too.',
};

export function getResult(cooking: CookingId, audience: AudienceId): QuizResult {
  const result: QuizResult = {
    eyebrow: 'Your match',
    title: 'Yellow Mustard Oil',
    hindi: 'सरसों का तेल',
    line: cookingLine[cooking],
    image: cooking === 'pantry' ? 'pour' : 'bottle-hero',
    order: "Hi Organikally, I'd like to order your cold-pressed Yellow Mustard Oil.",
    rangeNudge: cooking === 'pantry',
  };

  if (audience === 'trade') {
    result.trade =
      "Hi Organikally, I run a shop / kitchen and would like your bulk & trade pricing for cold-pressed Yellow Mustard Oil.";
  }

  return result;
}
