import { ShieldCheck, Sprout, Droplets, CircleCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const items = [
  { label: 'FSSAI compliant', Icon: ShieldCheck },
  { label: '100% Organic', Icon: Sprout },
  { label: 'Cold-Pressed', Icon: Droplets },
  { label: 'Cholesterol-Free', Icon: CircleCheck },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 -mt-4">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-line/70 bg-cream/85 px-6 py-4 shadow-md backdrop-blur-md">
            {items.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-charcoal">
                <Icon className="h-[18px] w-[18px] text-gold-ink" strokeWidth={1.6} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
