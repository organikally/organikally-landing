import Reveal from '@/components/ui/Reveal';

// Editorial masthead row, not a checkout pill. Small-caps marks split by hairlines,
// bounded by a faint rule top and bottom. Claims kept to verifiable process/origin
// terms (no self-asserted "FSSAI compliant", no absolute "100% Organic", no bare
// nutrient claim) — the FSSAI licence number lives in the footer where it belongs.
const marks = ['Cold-pressed', 'Kachi Ghani', 'Organically grown', 'Unrefined'];

export default function TrustStrip() {
  return (
    <section className="relative z-10 pt-12 md:pt-16">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal>
          <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-line py-4 md:gap-x-9">
            {marks.map((label) => (
              <li
                key={label}
                className="flex items-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted before:mr-6 before:hidden before:h-3 before:w-px before:bg-line first:before:mr-0 md:before:block md:first:before:hidden"
              >
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
