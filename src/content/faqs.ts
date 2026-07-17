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
  {
    q: 'Is mustard oil banned?',
    a: 'Not in India. Mustard oil is a permitted, everyday edible oil here, regulated by the FSSAI, and it has been central to Indian cooking for generations. The confusion comes from the United States, where — because of its natural erucic acid — mustard oil isn’t approved as a cooking oil and is sold labelled “for external use only”. In an Indian kitchen it’s simply a traditional staple.',
  },
  {
    q: 'What is the smoke point of mustard oil?',
    a: 'Mustard oil has a high smoke point (around 250°C), which is exactly why Indian kitchens rely on it for tempering, sautéing and deep-frying. Heat it until it just shimmers and the raw edge softens, bring the flame down, and cook the way you always have.',
  },
  {
    q: 'How is cold-pressed mustard oil different from refined mustard oil?',
    a: 'Cold-pressed (kachi ghani) oil is crushed slowly at low temperature and left unrefined, so it keeps its deep golden colour, its pungent aroma and the natural goodness of the seed. Refined oil is extracted with heat and often solvents, then bleached and deodorised — cleaner-looking and near-odourless, but stripped of the character cold-pressing keeps.',
  },
  {
    q: 'How do I know the mustard oil is pure and not adulterated?',
    a: 'Look for a genuine FSSAI licence and organic certification on the pack, a true deep-golden colour, and the characteristic pungency — real cold-pressed oil is honestly aromatic. We print our sourcing and press details so purity is something you can check; our product authentication page walks through how to verify a genuine pack.',
  },
  {
    q: 'Is mustard oil cholesterol-free?',
    a: 'Yes. Like all plant oils, mustard oil contains no cholesterol. It is also naturally high in monounsaturated fat (MUFA) and carries omega-3 (ALA) — and because it is unrefined, those natural qualities of the seed aren’t processed out.',
  },
  {
    q: 'Does mustard oil contain omega-3?',
    a: 'Yes — mustard oil naturally contains omega-3 as alpha-linolenic acid (ALA), alongside monounsaturated fat and omega-6. Cold-pressing aims to retain what heat and refining tend to reduce. As with any oil, use it as part of a varied, balanced diet.',
  },
  {
    q: 'Can I use mustard oil for a baby’s massage?',
    a: 'Mustard oil massage is a long-standing tradition in many Indian homes. That said, some guidance advises caution with mustard oil on very young or newborn skin, so please check with your paediatrician before using it on a baby, and always do a small patch test first. This is general information, not medical advice.',
  },
  {
    q: 'Do you deliver across India, and where can I buy?',
    a: 'You can buy directly from our online store, and we’re expanding delivery across India — enter your pincode at checkout to confirm serviceability in your area. For kirana stores, cloud kitchens and bulk or corporate orders, use our wholesale & trade enquiry.',
  },
  {
    q: 'Why does the price of mustard oil change?',
    a: 'Mustard oil is an agricultural product, so its price moves with the mustard (sarson) crop, the season and demand — it isn’t a fixed number. For the current price and pack sizes, check the product page in our store; that is always the live figure.',
  },
];
