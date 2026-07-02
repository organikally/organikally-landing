import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { benefits, type Benefit } from '@/content/benefits';

// "THE COLD-PRESSED WAY" — a benefit constellation (the Ojasya "Ayurvedic way of life"
// layout, adapted & kept FSSAI-compliant). The product sits at the centre inside a soft
// golden glow; four organic-blob-masked photos orbit it, 2-left / 2-right on desktop,
// each linked back to the centre by a dashed forest curve (a decorative SVG overlay,
// hidden on mobile). On mobile the product leads and the four blobs stack in a 2-col grid.
// Copy is approved-claims only — no medical / health-outcome language (spec §4.3, §5).

// The product at the heart of the constellation: the transparent bottle over a warm
// golden radial glow. Plain <img> (transparent brand asset lives outside /public/media).
function ProductCentre() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:w-[340px] lg:w-[380px]"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--yellow) / 0.4) 0%, rgb(var(--yellow) / 0.14) 42%, transparent 72%)',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/product-bottle.webp"
        alt="Organikally cold-pressed yellow mustard oil bottle"
        width={424}
        height={1479}
        loading="lazy"
        decoding="async"
        className="relative h-64 w-auto drop-shadow-[0_24px_44px_rgba(28,25,18,0.3)] sm:h-72 lg:h-[340px]"
      />
    </div>
  );
}

// One orbiting blob: an organic-masked circular photo in a forest ring, a heavy uppercase
// forest heading, and one compliant sentence.
function BenefitBlob({
  b,
  delay,
  direction = 'up',
}: {
  b: Benefit;
  delay: number;
  direction?: 'up' | 'left' | 'right';
}) {
  return (
    <Reveal delay={delay} direction={direction} className="flex flex-col items-center text-center">
      <div
        className="relative h-32 w-32 overflow-hidden shadow-[0_22px_46px_-22px_rgba(28,25,18,0.5)] ring-1 ring-forest/20 sm:h-36 sm:w-36"
        style={{ borderRadius: b.blob }}
      >
        <Media
          name={b.media}
          alt={b.alt}
          width={700}
          height={700}
          className="h-full w-full"
          sizes="(min-width: 640px) 144px, 128px"
        />
      </div>
      <h3 className="mt-5 font-heading text-base font-extrabold uppercase leading-tight tracking-[-0.01em] text-forest sm:text-lg">
        {b.title}
      </h3>
      <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-ink-muted">{b.body}</p>
    </Reveal>
  );
}

export default function Benefits() {
  return (
    <section id="benefits" className="relative z-10 overflow-hidden bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <SectionTitle eyebrow="100% Cold-Pressed">The Cold-Pressed Way</SectionTitle>
        <Reveal>
          <p className="mx-auto mt-5 max-w-measure text-center text-ink-muted">
            Nothing added, nothing refined out — so what the mustard seed already holds is what
            reaches your kitchen.
          </p>
        </Reveal>

        {/* Mobile / tablet: the product leads, the four blobs stack in a 2-col grid. */}
        <div className="mt-12 lg:hidden">
          <ProductCentre />
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12">
            {benefits.map((b, i) => (
              <li key={b.media}>
                <BenefitBlob b={b} delay={i * 90} />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: the constellation — product centred, 2 blobs each side, dashed forest
            curves linking each blob back to the centre. */}
        <div className="relative mt-14 hidden lg:grid lg:grid-cols-[1fr_minmax(220px,auto)_1fr] lg:gap-x-6">
          {/* Decorative connectors. viewBox is a 0–100 field stretched to the grid (paths
              use percentage-like coords that track the blob/product positions); the stroke
              stays a constant hairline via non-scaling-stroke. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          >
            {/* Slick, evenly-dashed hairline curves (pathLength normalises the dash count
                so they stay even across the stretched viewport). Each runs from just behind
                its blob photo to just behind the bottle's edge, so both ends read connected. */}
            <g
              className="stroke-forest/55"
              fill="none"
              strokeWidth={0.85}
              strokeLinecap="round"
              strokeDasharray="2 5"
              vectorEffect="non-scaling-stroke"
            >
              <path pathLength={100} d="M20 20 C 30 26 40 33 49 40" />
              <path pathLength={100} d="M20 70 C 31 67 41 61 49 56" />
              <path pathLength={100} d="M80 20 C 70 26 60 33 51 40" />
              <path pathLength={100} d="M80 70 C 69 67 59 61 51 56" />
            </g>
          </svg>

          {/* Left orbit */}
          <div className="relative z-10 flex flex-col justify-center gap-16 py-4">
            <BenefitBlob b={benefits[0]!} delay={0} direction="left" />
            <BenefitBlob b={benefits[1]!} delay={120} direction="left" />
          </div>

          {/* Centre */}
          <div className="relative z-10 flex items-center justify-center">
            <ProductCentre />
          </div>

          {/* Right orbit */}
          <div className="relative z-10 flex flex-col justify-center gap-16 py-4">
            <BenefitBlob b={benefits[2]!} delay={60} direction="right" />
            <BenefitBlob b={benefits[3]!} delay={180} direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
