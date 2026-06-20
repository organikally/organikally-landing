import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import WhatsappIcon from './WhatsappIcon';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'group/cta inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold tracking-[-0.01em] transition duration-300 ease-brand focus-visible:outline-2 active:translate-y-0 active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-yellow text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_12px_28px_-12px_rgba(206,150,10,0.85)] hover:-translate-y-[3px] hover:bg-yellow-deep hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_20px_40px_-14px_rgba(206,150,10,0.92)]',
  secondary:
    'border border-ink/25 bg-white/35 text-ink backdrop-blur-sm hover:-translate-y-[3px] hover:border-ink/50 hover:bg-white/55',
  ghost:
    'text-yellow-ink underline decoration-yellow decoration-2 underline-offset-4 hover:text-ink',
};

export default function Cta({
  href,
  children,
  variant = 'primary',
  whatsapp = false,
  arrow = false,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  whatsapp?: boolean;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const rel = external ? 'noopener noreferrer' : undefined;
  const target = external ? '_blank' : undefined;
  return (
    <a href={href} target={target} rel={rel} className={`${base} ${variants[variant]} ${className}`}>
      {whatsapp && <WhatsappIcon className="h-[1.05em] w-[1.05em]" />}
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-brand group-hover/cta:translate-x-1"
          aria-hidden="true"
        />
      )}
    </a>
  );
}
