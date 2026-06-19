import { Check } from 'lucide-react';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { whatsapp } from '@/lib/site';
import { heroProduct } from '@/content/products';

const benefits = [
  'High in MUFA & Omega-3',
  'Rich in antioxidants',
  'Cold-pressed · cholesterol-free',
  'Made from organically grown seed',
];

export default function Product() {
  return (
    <section id="product" className="grain relative z-10 bg-cream-deep py-28 md:py-36">
      <div className="mx-auto grid max-w-container items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <p className="eyebrow">The hero product</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            {heroProduct.name}
          </h2>
          <p className="mt-2 font-deva text-xl text-green">{heroProduct.hindi}</p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-60">
            Pressed cold from organically grown yellow mustard seed — a clean golden oil with the
            honest pungency a real kitchen knows.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-lg text-charcoal">
                <Check className="h-5 w-5 shrink-0 text-green" strokeWidth={2} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <Cta href={whatsapp()} variant="primary" whatsapp external className="mt-9">
            Order on WhatsApp
          </Cta>
        </Reveal>

        <Reveal delay={80} className="flex justify-center">
          <div className="relative rounded-[2rem] border border-line bg-white p-6 shadow-lg">
            <span className="absolute right-5 top-5 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green">
              100% Organic
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroProduct.image}
              alt={`Organikally ${heroProduct.name} bottle — cold-pressed organic`}
              width={520}
              height={680}
              className="mx-auto max-h-[560px] w-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
