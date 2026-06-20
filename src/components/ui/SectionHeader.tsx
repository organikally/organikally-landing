import Reveal from './Reveal';

export default function SectionHeader({
  kicker,
  title,
  intro,
  align = 'left',
  className = '',
}: {
  kicker?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const alignment = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl';
  return (
    <Reveal className={`${alignment} ${className}`}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 className={`font-serif text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.06] ${kicker ? 'mt-3' : ''}`}>
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>}
    </Reveal>
  );
}
