// FAQ, real buyer questions, concise extractable answers (AEO/FAQPage schema).
// Answers are claim-checked against docs/COMPLIANCE.md and composition — approved
// process, origin, sensory and culinary claims only, never medical/therapeutic ones.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'What does cold-pressed (kachi ghani) mustard oil mean?',
    a: 'Kachi ghani is the traditional cold-pressing method: the seed is crushed slowly at low temperature, without the heat or chemical refining used to make commodity oils. That’s what keeps the oil’s natural golden colour, its characteristic pungent aroma, and the goodness the seed already holds.',
  },
  {
    q: 'Is Organikaly mustard oil really organic?',
    a: 'It’s pressed from organically grown yellow mustard seed, and nothing is added or refined out. Our FSSAI licence and organic certification details are printed on the pack, so it’s purity you can check for yourself, not just a word on a label.',
  },
  {
    q: 'What is the difference between yellow and black mustard oil?',
    a: 'Yellow (sarson) mustard gives a milder, rounder flavour and a clean golden oil, while black mustard is sharper and more biting. Both are traditional to Indian cooking; yellow mustard oil is the easy, everyday choice for tadka, sautéing and pickling.',
  },
  {
    q: 'Why is the oil so golden and so pungent?',
    a: 'That deep golden colour and the sharp, nose-tickling aroma are the signs of a real cold-pressed mustard oil — they come straight from the seed and stay because the oil is unrefined. Refined oils strip both away; we leave them in. The pungency mellows the moment the oil meets a hot kadhai.',
  },
  {
    q: 'What is in cold-pressed mustard oil?',
    a: 'Cold-pressed yellow mustard oil is naturally high in MUFA and Omega-3 and rich in antioxidants, and like all vegetable oils it is cholesterol-free. Because it is unrefined, the good things the seed holds aren’t stripped out in processing.',
  },
  {
    q: 'Can I use it for everyday Indian cooking and deep-frying?',
    a: 'Absolutely. Mustard oil has a high smoke point, which is exactly why Indian kitchens have leaned on it for tempering, sautéing, and shallow- and deep-frying for generations. Heat it until it just shimmers, and cook the way you always have.',
  },
  {
    q: 'What dishes is it good for?',
    a: 'Just about everything the Indian kitchen asks for — the tadka that starts a dal or sabzi, fish and pakoras, aloo and parathas, marinades, and of course achaar. Its flavour becomes part of the dish in a way refined oils simply can’t match.',
  },
  {
    q: 'Is it good for achaar and pickling?',
    a: 'Yes — it’s the classic pickling oil. Mustard oil’s natural pungency is what helps a traditional achaar keep and mature. Warm it, let it cool, and pack your aam ka achaar the way it has always been done.',
  },
  {
    q: 'Is the oil refined or blended with anything?',
    a: 'No. It’s single-source cold-pressed yellow mustard oil — unrefined, unblended, with nothing added and nothing taken out. What’s in the bottle is simply what came out of the press.',
  },
  {
    q: 'How should I store it, and how long does it keep?',
    a: 'Keep it in a cool, dark place away from direct sunlight, with the cap closed. Cold-pressed oil is best enjoyed within a few months of opening, while the aroma is at its freshest — the best-before date is printed on the pack.',
  },
  {
    q: 'What is the press date, and why does it matter?',
    a: 'We print the day the oil was pressed on every bottle, so freshness is something you can see rather than take on trust. The closer to that date, the brighter the aroma — it’s the simplest proof of freshness we can give you.',
  },
  {
    q: 'How do I order, and do you sell wholesale?',
    a: 'Tap any “Order” button to message us on WhatsApp and we’ll help you buy directly. For kirana stores, cloud kitchens and corporate gifting, use the bulk & trade enquiry — we’re glad to share certifications and pricing.',
  },
];
