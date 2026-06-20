import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';

export default function Story() {
  return (
    <section id="story" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong rounded-[2rem] p-9 md:p-14">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,4.1rem)] font-semibold leading-[1.0] tracking-[-0.022em]">
                Real mustard oil announces itself.
              </h2>
              <div className="mt-8 max-w-prose space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
                <p>
                  Cold-pressing crushes organically grown seed slowly, at low temperature. No heat
                  is forced in, and nothing is bleached or refined out afterwards.
                </p>
                <p>
                  What reaches your kitchen is the deep colour, the honest pungency and the goodness
                  the seed already holds. Purity you can smell, not a word printed on a label.
                </p>
              </div>
            </div>
            <Reveal direction="right">
              <Media
                name="seeds"
                alt="Whole yellow and brown mustard seeds, the single ingredient pressed into the oil"
                width={1100}
                height={1376}
                className="aspect-[4/5] rounded-[1.5rem] shadow-[0_36px_70px_-44px_rgba(28,25,18,0.6)]"
              />
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
