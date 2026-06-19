import HeroScrub from '@/components/hero/HeroScrub';

// Placeholder until the founder supplies the business WhatsApp number (MANUAL_STEPS.md).
const WHATSAPP = 'https://wa.me/?text=Hi%20Organikally%2C%20I%27d%20like%20to%20order%20mustard%20oil';

const TRUST = ['FSSAI', '100% Organic', 'Cold-Pressed', 'Cholesterol-Free'];

export default function Home() {
  return (
    <>
      <HeroScrub />

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-container items-center justify-between px-6 py-5 md:px-10">
          <span className="font-serif text-2xl font-semibold tracking-tight text-cream drop-shadow">
            Organikally
          </span>
          <nav className="hidden items-center gap-8 text-sm font-medium text-cream/90 md:flex">
            <a href="#story" className="transition hover:text-cream">Our story</a>
            <a href="#product" className="transition hover:text-cream">Mustard oil</a>
            <a href="#range" className="transition hover:text-cream">The range</a>
          </nav>
          <a
            href={WHATSAPP}
            className="rounded-xl bg-cream/95 px-4 py-2 text-sm font-semibold text-forest shadow-sm transition hover:bg-cream"
          >
            Order
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO — floats on the scrubbing video over a forest scrim */}
        <section className="relative flex min-h-dvh items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/30 to-forest/75" />
          <div className="relative mx-auto w-full max-w-container px-6 md:px-10">
            <p className="eyebrow text-gold-bright">Cold-pressed · Organic · Trusted</p>
            <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.04] text-cream">
              The pantry you&apos;d trust for your own family.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
              Cold-pressed organic yellow mustard oil —{' '}
              <span className="font-deva">शुद्ध सरसों तेल</span> — made from organically grown seed.
              Nothing added, nothing refined out.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP}
                className="rounded-xl bg-green px-6 py-3.5 font-semibold text-cream shadow-md transition duration-200 ease-brand hover:-translate-y-0.5 hover:bg-green-700"
              >
                Buy Yellow Mustard Oil
              </a>
              <a
                href="#range"
                className="rounded-xl border-[1.5px] border-cream/70 px-6 py-3.5 font-semibold text-cream transition hover:bg-cream/10"
              >
                Explore the range
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-cream/70">
            Scroll
          </div>
        </section>

        {/* TRUST STRIP — frosted bar over the video */}
        <section className="relative z-10">
          <div className="mx-auto max-w-container px-6 md:px-10">
            <ul className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-line/60 bg-cream/80 px-6 py-4 shadow-md backdrop-blur-md md:gap-6">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium text-charcoal">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* STORY — opaque cream panel scrolls over the video */}
        <section id="story" className="relative z-10 mt-[16vh] bg-cream py-28 md:py-36">
          <div className="mx-auto max-w-container px-6 md:px-10">
            <p className="eyebrow">Why authentic</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold md:text-5xl">
              Pressed the slow, cold way — the way it has always been done.
            </h2>
            <div className="mt-8 grid gap-8 text-lg leading-relaxed text-charcoal-60 md:grid-cols-2">
              <p>
                Real mustard oil carries the smell of a home kitchen. We press organically grown
                seed without heat or refining, so the colour, the aroma and the goodness the seed
                already holds stay intact.
              </p>
              <p>
                That is the whole idea behind Organikally: purity you can see and taste, not a claim
                printed on a label. From the field, to the press, to your kitchen.
              </p>
            </div>
          </div>
        </section>

        {/* REVEAL — transparent interstitial: the video shows fully */}
        <section className="relative z-10 flex min-h-[80vh] items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/15 to-forest/60" />
          <div className="relative mx-auto max-w-container px-6 text-center md:px-10">
            <p className="mx-auto max-w-2xl font-serif text-3xl font-medium leading-snug text-cream md:text-4xl">
              From the seed, slowly. The oil the way your grandmother would recognise it.
            </p>
          </div>
        </section>

        {/* PRODUCT — opaque panel */}
        <section id="product" className="relative z-10 bg-cream-deep py-28 md:py-36">
          <div className="mx-auto grid max-w-container items-center gap-12 px-6 md:grid-cols-2 md:px-10">
            <div>
              <p className="eyebrow">The hero product</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Yellow Mustard Oil</h2>
              <ul className="mt-8 space-y-3 text-lg text-charcoal">
                <li>High in MUFA &amp; Omega-3</li>
                <li>Rich in antioxidants</li>
                <li>Cold-pressed · cholesterol-free</li>
              </ul>
              <a
                href={WHATSAPP}
                className="mt-9 inline-block rounded-xl bg-green px-6 py-3.5 font-semibold text-cream shadow-md transition hover:-translate-y-0.5 hover:bg-green-700"
              >
                Order on WhatsApp
              </a>
            </div>
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/product-bottle.png"
                alt="Organikally cold-pressed yellow mustard oil bottle"
                className="max-h-[560px] w-auto drop-shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* RANGE placeholder + footer (full sections land in Phase 4) */}
        <section id="range" className="relative z-10 bg-forest py-28 text-cream md:py-36">
          <div className="mx-auto max-w-container px-6 md:px-10">
            <p className="eyebrow text-gold-bright">The full range</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-cream md:text-5xl">
              Mustard oil, pulses, khand &amp; pantry staples.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-cream/80">
              A growing range of organic kitchen essentials — built to expand without losing the
              trust the oil earns.
            </p>
          </div>
        </section>

        <footer className="relative z-10 bg-forest pb-12 pt-10 text-cream">
          <div className="mx-auto max-w-container border-t border-cream/15 px-6 pt-8 md:px-10">
            <div className="font-serif text-2xl font-semibold">Organikally</div>
            <div className="eyebrow mt-1 text-gold-bright">Pure · Natural · Trusted</div>
            <p className="mt-4 text-sm text-cream/60">
              FSSAI Lic. No. [founder-supplied] · Cold-pressed organic mustard oil, pulses &amp; khand
              · © 2026 Organikally
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
