import type { CSSProperties } from 'react';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { products, type Product } from '@/content/products';

// Product-in-scene illustrations for the collectible stamp cards. The slots live in
// scripts/image-manifest.json; while a shot is mid-generation we fall back to the
// product's existing media triplet so the section always renders a real image (never a
// missing name) — see OJASYA_REPLICATION.md §7.
const STAMP_BY_SLUG: Record<string, string> = {
  'yellow-mustard-oil': 'stamp-oil',
  'pulses-dals': 'stamp-dals',
  khand: 'stamp-khand',
  'pantry-staples': 'stamp-pantry',
};

const MEDIA_DIR = join(process.cwd(), 'public', 'media');

function stampFor(p: Product): string {
  const preferred = STAMP_BY_SLUG[p.slug];
  const fallback = p.media ?? 'seeds';
  if (!preferred) return fallback;
  try {
    return existsSync(join(MEDIA_DIR, `${preferred}.jpg`)) ? preferred : fallback;
  } catch {
    return fallback;
  }
}

// The scalloped/perforated postage-stamp silhouette, cut cleanly with a CSS mask (vector,
// crisp at any size — no raster stamp image). Four radial-gradient layers punch half-circle
// perforations along each edge; `mask-composite: intersect` keeps the interior solid so the
// forest frame and its image window stay intact. `drop-shadow` follows the cut silhouette.
const R = 5; // perforation radius (px)
const G = 14; // perforation pitch (px)
const CUT = '#0000 94%, #000 96%';
const MASK = [
  `radial-gradient(circle ${R}px at 50% 0, ${CUT})`,
  `radial-gradient(circle ${R}px at 50% 100%, ${CUT})`,
  `radial-gradient(circle ${R}px at 0 50%, ${CUT})`,
  `radial-gradient(circle ${R}px at 100% 50%, ${CUT})`,
].join(', ');

const stampMask: CSSProperties = {
  WebkitMaskImage: MASK,
  maskImage: MASK,
  WebkitMaskSize: `${G}px 100%, ${G}px 100%, 100% ${G}px, 100% ${G}px`,
  maskSize: `${G}px 100%, ${G}px 100%, 100% ${G}px, 100% ${G}px`,
  WebkitMaskRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
  maskRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
  WebkitMaskPosition: '50% 0, 50% 100%, 0 50%, 100% 50%',
  maskPosition: '50% 0, 50% 100%, 0 50%, 100% 50%',
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect',
  filter: 'drop-shadow(0 16px 26px rgb(18 51 30 / 0.2))',
};

export default function Range() {
  return (
    <section id="range" className="relative bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <SectionTitle eyebrow="The full range">PRODUCT RANGE</SectionTitle>
        <Reveal>
          <p className="mx-auto mt-5 max-w-measure text-center text-ink-muted">
            Beyond the bottle — the same organic care and slow press, carried across the rest
            of the kitchen.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => {
            const stamp = stampFor(p);
            const eyebrow = p.category === 'oil' ? '100% Cold-Pressed' : 'Organically Grown';
            return (
              <Reveal key={p.slug} delay={i * 70}>
                <Link
                  href="/store/"
                  aria-label={`${p.name} — view in the store`}
                  className="group block rounded-sm text-center"
                >
                  {/* The stamp: a forest-green perforated frame with a cream image window. */}
                  <div
                    style={stampMask}
                    className="bg-forest p-2.5 transition-transform duration-300 ease-brand group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5"
                  >
                    <div className="relative bg-cream p-1.5">
                      <Media
                        name={stamp}
                        alt={`${p.name} illustration`}
                        width={800}
                        height={1000}
                        className="aspect-[4/5] w-full"
                        sizes="(min-width: 1024px) 16rem, (min-width: 768px) 40vw, 88vw"
                      />
                    </div>
                  </div>

                  {/* Below the frame: rust eyebrow · forest name · short gold underline. */}
                  <p className="mt-6 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-rust">
                    {eyebrow}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-extrabold uppercase leading-tight tracking-[-0.01em] text-forest">
                    {p.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-3 block h-[3px] w-10 rounded-full bg-yellow transition-[width] duration-300 ease-brand group-hover:w-14"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
