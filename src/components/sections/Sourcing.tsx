import { Sprout, Wind, Package } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';

const steps = [
  {
    Icon: Sprout,
    title: 'Organically grown seed',
    body: 'Yellow mustard seed grown without synthetic inputs, sorted and cleaned before it ever reaches the press.',
  },
  {
    Icon: Wind,
    title: 'Cold-pressed, kachi ghani',
    body: 'Crushed slowly at low temperature — no heat forced in, no solvents, no bleaching or deodorising afterwards.',
  },
  {
    Icon: Package,
    title: 'Bottled, nothing added',
    body: 'Filled as it comes from the press, so the colour, aroma and goodness of the seed reach your kitchen intact.',
  },
];

export default function Sourcing() {
  return (
    <section id="sourcing" className="grain relative z-10 bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <SectionHeader
          eyebrow="Sourcing & process"
          title="A short, honest line from field to bottle."
          intro="“Organic” here means the whole chain — how it's grown, how it's pressed, and what we choose not to do to it."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-cream-deep/60 p-7 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green">
                  <s.Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-forest">{s.title}</h3>
                <p className="mt-2 text-charcoal-60">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
