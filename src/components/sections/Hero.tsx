import Cta from '@/components/ui/Cta';
import { whatsapp } from '@/lib/site';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-end pb-16 pt-28 md:items-center md:pb-0">
      <div className="mx-auto w-full max-w-container px-5 md:px-10">
        <div className="glass-strong max-w-xl rounded-[2rem] p-8 md:p-11">
          <p className="eyebrow">Cold-pressed organic mustard oil</p>
          <h1 className="mt-4 font-serif text-[clamp(2.7rem,6vw,4.6rem)] font-semibold leading-[1.03]">
            The oil that smells like <span className="italic">home.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
            Pressed cold from organically grown yellow mustard seed. Nothing added, nothing taken
            out. <span className="font-deva text-ink">शुद्ध सरसों तेल</span>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Cta href={whatsapp()} variant="primary" whatsapp external>
              Buy mustard oil
            </Cta>
            <Cta href="#range" variant="secondary" arrow>
              See the range
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
