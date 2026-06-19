import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';

export default function Story() {
  return (
    <section id="story" className="grain relative z-10 mt-[14vh] bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <SectionHeader
          eyebrow="Why authentic"
          title="Pressed the slow, cold way — the way it has always been done."
        />
        <div className="mt-10 grid gap-8 text-lg leading-relaxed text-charcoal-60 md:grid-cols-2">
          <Reveal>
            <p>
              Real mustard oil carries the smell of a home kitchen. We press organically grown
              seed without heat or refining, so the colour, the aroma and the goodness the seed
              already holds stay intact — not stripped out and not faked back in.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p>
              That is the whole idea behind Organikally: purity you can see and taste, not a claim
              printed on a label. From the field, to the press, to your kitchen — a short, honest
              line you can actually follow.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
