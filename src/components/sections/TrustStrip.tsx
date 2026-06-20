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
    <section className="relative z-10 pt-14 md:pt-20">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal>
          <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full border border-line bg-white px-7 py-4 shadow-[0_18px_40px_-28px_rgba(28,25,18,0.4)]">
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
