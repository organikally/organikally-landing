// SAMPLE testimonials — names supplied by the founder, quote text is illustrative
// placeholder copy until their real words are collected (see MANUAL_STEPS.md).
// Quotes are sensory / cooking / heritage only — no health or competitor claims.
// The first entry is the featured voice.

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'The aroma hits you the moment you open the bottle — that sharp, proper sarson smell I grew up with. My tadka finally smells like my mother’s kitchen again.',
    name: 'Priyanshu',
    location: 'Delhi',
    placeholder: true,
  },
  {
    quote:
      'The colour and the pungency feel real. It’s the first mustard oil in a long time I actually look forward to cooking with.',
    name: 'Prashant',
    location: 'Lucknow',
    placeholder: true,
  },
  {
    quote: 'Made my achaar with it this season and it tastes the way it’s meant to — sharp and alive.',
    name: 'Aryan',
    location: 'Jaipur',
    placeholder: true,
  },
  {
    quote:
      'You can smell the difference the second it heats up. Clean mustard, nothing harsh — frying in it is a different thing altogether.',
    name: 'Saurabh',
    location: 'Pune',
    placeholder: true,
  },
  {
    quote:
      'Ordered on WhatsApp, here in two days. The press date stamped on the bottle is a small touch that earns a lot of trust.',
    name: 'Akshat',
    location: 'Gurugram',
    placeholder: true,
  },
  {
    quote: 'My grandmother approved on the first whiff — and she’s impossible to please about sarson oil.',
    name: 'Lakshay',
    location: 'Chandigarh',
    placeholder: true,
  },
  {
    quote: 'Light, golden and clean on the tongue. It’s quietly become the only oil in our kitchen.',
    name: 'Hardik',
    location: 'Ahmedabad',
    placeholder: true,
  },
  {
    quote: 'As a Bengali, mustard oil isn’t negotiable. This one has the jhal I’d been missing.',
    name: 'Sarthak',
    location: 'Kolkata',
    placeholder: true,
  },
  {
    quote: 'Didn’t expect to taste much of a difference. I was wrong — the first shorshe maach said it all.',
    name: 'Sidharth',
    location: 'Bhopal',
    placeholder: true,
  },
];
