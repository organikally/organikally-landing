import Reveal from '@/components/ui/Reveal';
import WhatsappIcon from '@/components/ui/WhatsappIcon';
import { whatsapp } from '@/lib/site';

export default function Conversion() {
  return (
    <section id="order" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="rounded-[2rem] bg-yellow p-10 text-center shadow-[0_40px_80px_-40px_rgba(206,150,10,0.8)] md:p-16">
          <h2 className="mx-auto max-w-2xl font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.04] text-ink">
            Order the oil your kitchen deserves.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink/80">
            Message us on WhatsApp and we will help you buy directly, for your home or for your
            shop, kitchen or gifting.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition duration-200 ease-brand hover:opacity-90 active:translate-y-px"
            >
              <WhatsappIcon />
              Order on WhatsApp
            </a>
            <a
              href={whatsapp('Hi Organikally, I have a bulk or trade enquiry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-7 py-3.5 font-semibold text-ink transition duration-200 ease-brand hover:border-ink/60 active:translate-y-px"
            >
              Bulk and trade enquiries
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
