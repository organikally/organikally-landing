import { Check } from 'lucide-react';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { whatsapp } from '@/lib/site';
import { heroProduct } from '@/content/products';

const benefits = [
  'High in MUFA and Omega-3',
  'Rich in antioxidants',
  'Cold-pressed and cholesterol-free',
  'Made from organically grown seed',
];

export default function Product() {
  return (
    <section id="product" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong grid items-center gap-8 rounded-[2.25rem] p-8 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:p-14">
          <div>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.04]">
              Yellow Mustard <span className="italic">Oil</span>
            </h2>
            <p className="mt-2 font-deva text-xl text-yellow-ink">{heroProduct.hindi}</p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
              A clean golden oil with the pungency a real kitchen knows. Pressed cold, so the seed
              reaches you intact.
            </p>
            <ul className="mt-8 space-y-3.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-lg text-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow/25">
                    <Check className="h-3.5 w-3.5 text-yellow-deep" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Cta href={whatsapp()} variant="primary" whatsapp external className="mt-9">
              Order on WhatsApp
            </Cta>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="absolute right-2 top-2 z-10 rounded-full border border-yellow/30 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-ink backdrop-blur">
              100% Organic
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroProduct.image}
              alt={`Organikally ${heroProduct.name} bottle, cold-pressed organic`}
              width={520}
              height={680}
              className="max-h-[540px] w-auto mix-blend-multiply"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
