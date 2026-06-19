import { ChevronDown } from 'lucide-react';
import Cta from '@/components/ui/Cta';
import { whatsapp } from '@/lib/site';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-dvh items-center">
      {/* Scrims: vertical for overall legibility + left/bottom-anchored so the copy column
          stays AA over any frame (the first frames are light). */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/55 via-forest/35 to-forest/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-forest/90 via-forest/45 to-transparent" />

      <div className="relative mx-auto w-full max-w-container px-6 pt-24 md:px-10">
        <p className="eyebrow text-gold-bright [text-shadow:0_1px_8px_rgba(14,59,20,0.45)]">
          Cold-pressed · Organic · Trusted
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.04] text-cream [text-shadow:0_2px_18px_rgba(14,59,20,0.5)]">
          The pantry you&apos;d trust for your own family.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream [text-shadow:0_1px_12px_rgba(14,59,20,0.55)]">
          Cold-pressed organic yellow mustard oil —{' '}
          <span className="font-deva">शुद्ध सरसों तेल</span> — made from organically grown seed.
          Nothing added, nothing refined out.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Cta href={whatsapp()} variant="primary" whatsapp external>
            Buy Yellow Mustard Oil
          </Cta>
          <Cta href="#range" variant="onDark">
            Explore the range
          </Cta>
        </div>
      </div>

      <a
        href="#story"
        aria-label="Scroll to story"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-cream/70 transition hover:text-cream"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
