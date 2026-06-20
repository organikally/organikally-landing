import type { ReactNode } from 'react';
import WhatsappIcon from './WhatsappIcon';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition duration-200 ease-brand focus-visible:outline-2 active:translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-yellow text-ink shadow-[0_10px_30px_-12px_rgba(206,150,10,0.8)] hover:bg-yellow-deep',
  secondary: 'border border-ink/25 text-ink hover:border-ink/50 hover:bg-ink/[0.04]',
  ghost: 'text-yellow-ink underline decoration-yellow decoration-2 underline-offset-4 hover:text-ink',
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
