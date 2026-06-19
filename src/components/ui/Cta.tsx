import type { ReactNode } from 'react';
import WhatsappIcon from './WhatsappIcon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition duration-200 ease-brand focus-visible:outline-2';

const variants: Record<Variant, string> = {
  primary: 'bg-green text-cream shadow-md hover:-translate-y-0.5 hover:bg-green-700',
  secondary: 'border-[1.5px] border-forest text-forest hover:bg-cream-deep',
  ghost: 'text-gold-ink underline decoration-gold-bright decoration-2 underline-offset-4 hover:text-forest',
  onDark: 'border-[1.5px] border-cream/70 text-cream hover:bg-cream/10',
};

export default function Cta({
  href,
  children,
  variant = 'primary',
  whatsapp = false,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  whatsapp?: boolean;
  external?: boolean;
  className?: string;
}) {
  const rel = external ? 'noopener noreferrer' : undefined;
  const target = external ? '_blank' : undefined;
  return (
    <a href={href} target={target} rel={rel} className={`${base} ${variants[variant]} ${className}`}>
      {whatsapp && <WhatsappIcon />}
      {children}
    </a>
  );
}
