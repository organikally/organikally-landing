import type { CSSProperties } from 'react';
import Cta from '@/components/ui/Cta';
import { whatsapp } from '@/lib/site';

export default function Hero() {
  return (
    <div className="flex h-full items-center">
      <div className="mx-auto w-full max-w-container px-5 md:px-10">
        {/* Sparse, floats directly over the video (the crop keeps the bottle to the right,
            leaving this left column open). A soft white glow lifts the dark text off any frame. */}
        <div
          id="hero-content"
          className="hero-enter max-w-lg [text-shadow:0_1px_28px_rgba(255,255,255,0.6)]"
        >
          <p className="eyebrow" style={{ '--i': 0 } as CSSProperties}>
            Cold-pressed organic mustard oil
          </p>
          <h1
            className="mt-4 font-serif text-[clamp(2.9rem,6.4vw,5rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-ink"
            style={{ '--i': 1 } as CSSProperties}
          >
            The oil that smells like <span className="italic">home.</span>
          </h1>
          <p
            className="mt-6 max-w-md text-[1.0625rem] font-medium leading-relaxed text-ink"
            style={{ '--i': 2 } as CSSProperties}
          >
            Pressed cold from organically grown yellow mustard seed. Nothing added, nothing taken
            out. <span className="font-deva">शुद्ध सरसों तेल</span>.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-3 [text-shadow:none]"
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
    </div>
  );
}
