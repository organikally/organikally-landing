import type { ReactNode } from 'react';
import Ornament from './Ornament';
import Reveal from './Reveal';

// The Ojasya-style section header: a heavy uppercase forest-green title flanked by
// ornamental flourishes (centered), or a left-aligned variant. Replaces bare <h2> across
// the after-hero sections. Uses Poppins via `font-heading`.
export default function SectionTitle({
  children,
  eyebrow,
  align = 'center',
  className = '',
}: {
  children: ReactNode;
  eyebrow?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  const title = (
    <h2 className="font-heading text-[clamp(1.7rem,3.6vw,2.9rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-forest">
      {children}
    </h2>
  );
  const eb = eyebrow ? (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-rust">{eyebrow}</p>
  ) : null;

  if (align === 'left') {
    return (
      <Reveal className={className}>
        {eb}
        {title}
      </Reveal>
    );
  }
  return (
    <Reveal className={`text-center ${className}`}>
      {eb}
      <div className="flex items-center justify-center gap-4 md:gap-6">
        <Ornament className="hidden h-4 w-20 shrink-0 text-forest/70 sm:block md:w-32" />
        {title}
        <Ornament flip className="hidden h-4 w-20 shrink-0 text-forest/70 sm:block md:w-32" />
      </div>
    </Reveal>
  );
}
