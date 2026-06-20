import { ShieldCheck, Sprout, Droplets, CircleCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const items = [
  { label: 'FSSAI compliant', Icon: ShieldCheck },
  { label: '100% Organic', Icon: Sprout },
  { label: 'Cold-pressed', Icon: Droplets },
  { label: 'Cholesterol-free', Icon: CircleCheck },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 -mt-6 md:-mt-8">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal>
          <ul className="glass-pill flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full px-7 py-4">
            {items.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
                <Icon className="h-[18px] w-[18px] text-yellow-ink" strokeWidth={1.8} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
