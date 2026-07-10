// Central site config. Placeholder values are founder-supplied, see MANUAL_STEPS.md.

export const SITE_URL = 'https://organikaly.com';

// Empty number → a generic wa.me link with a prefilled message. Drop the real
// business number here (digits only, with country code, e.g. '919812345678').
const WHATSAPP_NUMBER = '';

export function whatsapp(message = "Hi Organikaly, I'd like to order cold-pressed mustard oil."): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const site = {
  name: 'Organikaly',
  tagline: 'Pure · Natural · Trusted',
  description:
    'Cold-pressed organic yellow mustard oil, pulses and khand, made from organically grown seed, nothing refined out.',
  url: SITE_URL,
  // Placeholders, see MANUAL_STEPS.md
  fssaiLicence: '[FSSAI Lic. No., to be supplied]',
  // Real per-batch press date, printed on the pack. Kept empty so the "Proof"
  // section shows its honest neutral "Small-batch fresh" stamp rather than a
  // fabricated date; wire the true batch date here before launch (see MANUAL_STEPS).
  pressDate: '',
  email: 'hello@organikaly.com',
  whatsappConfigured: WHATSAPP_NUMBER.length > 0,
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
} as const;

export const nav = [
  { label: 'Why us', href: '/#proof' },
  { label: 'Our story', href: '/#story' },
  { label: 'The range', href: '/#range' },
  { label: 'Shop', href: '/store/' },
  { label: 'Recipes', href: '/recipes/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'FAQ', href: '/#faq' },
] as const;
