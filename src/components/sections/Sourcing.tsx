import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';

// The journey from seed to kitchen, told as an image-led horizontal process (it sits
// right under the product it explains). Four photographed steps, numbered, in the
// site's editorial language. Copy stays to approved process/sensory claims
// (organically grown, cold-pressed, no heat/solvent).
const steps = [
  {
    media: 'step-grown',
    title: 'Grown clean',
    body: 'Yellow mustard grown organically, without synthetic inputs — then sorted and cleaned.',
  },
  {
    media: 'step-pressed',
    title: 'Cold-pressed',
    body: 'Crushed slow in a kachi ghani, at low temperature. No heat forced in, no solvents.',
  },
  {
    media: 'step-bottled',
    title: 'Bottled fresh',
    body: 'Filled straight from the press and sealed — stamped with the day it was pressed.',
  },
  {
    media: 'step-kitchen',
    title: 'To your kitchen',
    body: 'It reaches you the way it left the field: golden, aromatic and unrefined.',
  },
];

export default function Sourcing() {
  return (
    <section id="sourcing" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">Our process</p>
          <h2 className="t-headline mt-6 max-w-2xl font-semibold text-ink">
            From field to bottle, honestly.
          </h2>
          <p className="t-lead mt-5 max-w-measure">
            No middlemen, no refining, no shortcuts — just four honest steps between the seed and
            your kitchen.
          </p>
        </Reveal>

        {/* Mobile: a compact timeline — small thumbnail beside the step, so four
            steps read at a glance instead of four full-height stacked cards.
            sm+: the photographed cards return in a 2- then 4-up grid. */}
        <ol className="mt-10 grid grid-cols-1 gap-y-7 sm:mt-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-16 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 90} className="flex items-start gap-4 sm:block">
                <Media
                  name={s.media}
                  alt={s.title}
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-28 shrink-0 rounded-media shadow-sm sm:w-full sm:rounded-card"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 30vw"
                />
                <div className="min-w-0 sm:mt-5">
                  <div className="flex items-baseline gap-3">
                    <span className="index-num text-xl text-yellow-deep md:text-2xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold text-ink md:text-xl">{s.title}</h3>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
