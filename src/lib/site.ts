// Central site config. Placeholder values are founder-supplied — see MANUAL_STEPS.md.

export const SITE_URL = 'https://organikally.com';

// Empty number → a generic wa.me link with a prefilled message. Drop the real
// business number here (digits only, with country code, e.g. '919812345678').
const WHATSAPP_NUMBER = '';

export function whatsapp(message = "Hi Organikally, I'd like to order cold-pressed mustard oil."): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const site = {
  name: 'Organikally',
  tagline: 'Pure · Natural · Trusted',
  description:
    'Cold-pressed organic yellow mustard oil, pulses and khand — made from organically grown seed, nothing refined out.',
  url: SITE_URL,
  // Placeholders — see MANUAL_STEPS.md
  fssaiLicence: '[FSSAI Lic. No. — to be supplied]',
  email: 'hello@organikally.com',
  whatsappConfigured: WHATSAPP_NUMBER.length > 0,
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
} as const;

export const nav = [
  { label: 'Our story', href: '/#story' },
  { label: 'Mustard oil', href: '/#product' },
  { label: 'The range', href: '/#range' },
  { label: 'Journal', href: '/#journal' },
  { label: 'FAQ', href: '/#faq' },
] as const;
