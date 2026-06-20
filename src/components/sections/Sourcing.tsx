import { Sprout, Wind, Package } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';

const steps = [
  {
    Icon: Sprout,
    title: 'Grown without synthetic inputs',
    body: 'Yellow mustard seed grown organically, then sorted and cleaned before it ever reaches the press.',
  },
  {
    Icon: Wind,
    title: 'Pressed cold, kachi ghani',
    body: 'Crushed slowly at low temperature. No heat forced in, no solvents, no deodorising afterwards.',
  },
  {
    Icon: Package,
    title: 'Bottled as it comes',
    body: 'Filled straight from the press, so the colour, aroma and goodness reach your kitchen intact.',
  },
];

export default function Sourcing() {
  return (
    <section id="sourcing" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong overflow-hidden rounded-[2rem] p-9 md:p-14">
          <div className="grid gap-10 md:grid-cols-[0.85fr_1fr] md:items-stretch md:gap-14">
            <Reveal direction="left" className="md:order-1">
              <Media
                name="field"
                alt="A mustard field in bloom in Punjab, the source of the cold-pressed oil"
                width={1200}
                height={1500}
                className="h-full min-h-[280px] rounded-[1.5rem] shadow-[0_36px_70px_-44px_rgba(28,25,18,0.6)]"
              />
            </Reveal>
            <div className="md:order-2">
              <h2 className="max-w-xl font-serif text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
                From field to bottle, honestly.
              </h2>
              <div className="mt-8 divide-y divide-line/80">
                {steps.map((s, i) => (
                  <Reveal key={s.title} delay={i * 80} direction="right">
                    <div className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow/15 text-yellow-deep">
                        <s.Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-ink">{s.title}</h3>
                        <p className="mt-1.5 max-w-xl text-ink-muted">{s.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
