// PLACEHOLDER testimonials — flagged until the founder supplies real reviews
// (MANUAL_STEPS.md). The UI labels these as samples so they never read as real.

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  placeholder: boolean;
};

export const testimonialsArePlaceholder = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      'The aroma is exactly like the mustard oil my mother used to cook with. You can tell it hasn’t been stripped of anything.',
    name: 'Sample review',
    location: 'to be replaced with a real customer',
    placeholder: true,
  },
  {
    quote:
      'I switched our whole kitchen over. Clean colour, honest pungency, and I trust where it comes from.',
    name: 'Sample review',
    location: 'to be replaced with a real customer',
    placeholder: true,
  },
  {
    quote:
      'Ordering on WhatsApp was simple and the bottle arrived well packed. This is what organic should feel like.',
    name: 'Sample review',
    location: 'to be replaced with a real customer',
    placeholder: true,
  },
];
