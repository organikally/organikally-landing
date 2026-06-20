import type { CSSProperties } from 'react';
import Cta from '@/components/ui/Cta';
import { whatsapp } from '@/lib/site';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-end pb-16 pt-28 md:items-center md:pb-0">
      <div className="mx-auto w-full max-w-container px-5 md:px-10">
        <div className="hero-enter glass-strong max-w-xl rounded-[2rem] p-8 md:p-12">
          <p className="eyebrow" style={{ '--i': 0 } as CSSProperties}>
            Cold-pressed organic mustard oil
          </p>
          <h1
            className="mt-5 font-serif text-[clamp(2.9rem,6.4vw,4.9rem)] font-semibold leading-[1.0] tracking-[-0.02em]"
            style={{ '--i': 1 } as CSSProperties}
          >
            The oil that smells like <span className="italic">home.</span>
          </h1>
          <p
            className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted"
            style={{ '--i': 2 } as CSSProperties}
          >
            Pressed cold from organically grown yellow mustard seed. Nothing added, nothing taken
            out. <span className="font-deva text-ink">शुद्ध सरसों तेल</span>.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            style={{ '--i': 3 } as CSSProperties}
          >
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
