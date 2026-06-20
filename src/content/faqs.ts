// FAQ, real buyer questions, concise extractable answers (AEO/FAQPage schema).
// Answers are claim-checked against docs/COMPLIANCE.md, composition, not medical claims.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'What does cold-pressed (kachi ghani) mustard oil mean?',
    a: 'The seed is crushed slowly at low temperature, without the heat or chemical refining used for commodity oils. That keeps the oil’s natural colour, its characteristic pungent aroma, and the nutrients the seed already holds.',
  },
  {
    q: 'Is Organikally mustard oil really organic?',
    a: 'It is pressed from organically grown mustard seed and nothing is added or refined out. Our organic certification details and FSSAI licence are shown on the pack and in the footer, purity you can verify, not just a label.',
  },
  {
    q: 'What is the difference between yellow and black mustard oil?',
    a: 'Yellow (sarson) mustard seed gives a milder, rounder flavour and a clean golden oil, while black mustard is sharper and more pungent. Both are traditional to Indian cooking; yellow mustard oil suits everyday tempering, sautéing and pickling.',
  },
  {
    q: 'Can I use it for everyday Indian cooking and frying?',
    a: 'Yes. Mustard oil has a high smoke point, which is why it has long been the everyday oil for tempering (tadka), sautéing, pickling and deep-frying across Indian kitchens.',
  },
  {
    q: 'How should I store it and how long does it keep?',
    a: 'Store in a cool, dark place away from direct sunlight and keep the cap closed. Cold-pressed oil is best used within a few months of opening, while the aroma is at its freshest. The best-before date is printed on the pack.',
  },
  {
    q: 'How do I order, and do you sell wholesale?',
    a: 'Tap any “Order” button to message us on WhatsApp and we’ll help you buy directly. For kirana stores, cloud kitchens and corporate gifting, use the bulk & trade enquiry, we’re glad to share certifications and pricing.',
  },
];
