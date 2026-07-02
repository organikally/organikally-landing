import { Check } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { whatsapp } from '@/lib/site';
import { heroProduct } from '@/content/products';

const benefits = [
  'High in MUFA and Omega-3',
  'Rich in antioxidants',
  'Cold-pressed, and cholesterol-free like all vegetable oils',
  'Made from organically grown seed',
];

export default function Product() {
  return (
    <section id="product" className="relative z-10 bg-cream pt-16 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-[0.92fr_1.08fr] md:gap-16">
          {/* Bottle on the left, copy on the right — an asymmetric product spread. */}
          <Reveal direction="left" className="md:order-1">
            <div className="relative flex items-center justify-center">
              {/* Soft warm halo behind the bottle — a homely golden glow, not a hard frame. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[86%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    'radial-gradient(closest-side, rgb(var(--yellow) / 0.18), rgb(var(--yellow) / 0) 72%)',
                }}
              />
              <span className="absolute right-0 top-2 z-10 rounded-full border border-forest/25 bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest">
                Organically grown
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroProduct.image}
                alt={`Organikally ${heroProduct.name} bottle, cold-pressed organic`}
                width={424}
                height={1479}
                className="relative max-h-[420px] w-auto drop-shadow-[0_26px_50px_rgba(28,25,18,0.22)] md:max-h-[600px]"
              />
            </div>
          </Reveal>

          <div className="md:order-2">
            <SectionTitle align="left" eyebrow="Cold-pressed kachi ghani">
              Yellow Mustard Oil
            </SectionTitle>
            <Reveal>
              <p className="mt-2 font-deva text-xl text-yellow-ink">{heroProduct.hindi}</p>
              <p className="t-lead mt-6 max-w-md">
                Golden, just-pressed, and gently warm — yellow mustard oil cold-pressed so the seed
                reaches your kitchen the way it left the field.
              </p>
              <ul className="mt-9 max-w-md divide-y divide-forest/12">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 py-3.5 text-[1.0625rem] text-ink">
                    <Check
                      className="h-[18px] w-[18px] shrink-0 text-forest"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <Cta href={whatsapp()} variant="primary" whatsapp external className="mt-9">
                Order on WhatsApp
              </Cta>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
