import Reveal from '@/components/ui/Reveal';

export default function Story() {
  return (
    <section id="story" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong rounded-[2rem] p-9 md:p-16">
          <div className="max-w-4xl">
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.1rem)] font-semibold leading-[1.0] tracking-[-0.022em]">
              Real mustard oil announces itself.
            </h2>
            <div className="mt-9 grid max-w-3xl gap-8 text-[1.0625rem] leading-relaxed text-ink-muted md:grid-cols-2 md:gap-12">
              <p>
                Cold-pressing crushes organically grown seed slowly, at low temperature. No heat is
                forced in, and nothing is bleached or refined out afterwards.
              </p>
              <p>
                What reaches your kitchen is the deep colour, the honest pungency and the goodness
                the seed already holds. Purity you can smell, not a word printed on a label.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
