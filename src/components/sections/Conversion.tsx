import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { whatsapp } from '@/lib/site';

export default function Conversion() {
  return (
    <section id="order" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="overflow-hidden rounded-card border border-paper/10 bg-ink px-6 py-12 shadow-panel md:px-14 md:py-16">
          {/* Asymmetric, not a centered card: the headline carries the left, the
              ask and the actions sit to the right, grounded on the same baseline. */}
          <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-16">
            <Reveal>
              <p className="eyebrow text-yellow">Order direct</p>
              <h2 className="mt-5 font-display text-[clamp(2.3rem,6vw,4.8rem)] leading-[1.04] tracking-[-0.02em] text-paper">
                Order the oil your kitchen deserves.
              </h2>
            </Reveal>
            <Reveal direction="right">
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-paper/70">
                Message us on WhatsApp and we will help you buy directly, for your home or for your
                shop, kitchen or gifting.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Cta href={whatsapp()} variant="primary" whatsapp external>
                  Order on WhatsApp
                </Cta>
                <Cta
                  href={whatsapp('Hi Organikally, I have a bulk or trade enquiry.')}
                  variant="secondaryDark"
                  external
                  arrow
                >
                  Bulk and trade enquiries
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
