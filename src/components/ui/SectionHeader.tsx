import Reveal from './Reveal';

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  dark = false,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: 'left' | 'center';
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <p className={`eyebrow ${dark ? 'text-gold-bright' : ''}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-serif text-4xl font-semibold md:text-5xl ${dark ? 'text-cream' : ''}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-cream/80' : 'text-charcoal-60'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
