import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/seo/JsonLd';
import FaqAccordion, { type FaqGroup } from './FaqAccordion';
import { faqs } from '@/content/faqs';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description:
    'Honest answers to the questions buyers actually ask about Organikaly, from what cold-pressed mustard oil is to how ordering, delivery and Organikaly Club work.',
  alternates: { canonical: '/faqs/' },
};

// FAQs. The product answers are the shared, claim-checked set from content/faqs.ts
// (reused verbatim). A second group answers store, delivery and membership questions,
// with real links to the pages that own each policy. The FAQPage JSON-LD combines
// both groups so the structured data matches exactly what is on the page. A link
// styled inside an <a> class helper keeps the store answers clickable.
const linkCls = 'font-semibold text-forest underline-offset-2 hover:text-forest-deep hover:underline';

// Store/membership answers: plain-text `a` feeds the JSON-LD, `body` renders on the
// page with live links. Both say the same thing, honestly.
const storeFaqs = [
  {
    q: 'Where do you deliver, and how soon?',
    a: 'We are still expanding the pincodes we serve, so enter yours at checkout or on a product page to see whether we currently deliver to you. Once an order is placed, the dispatch and delivery timeline for your address is shown at checkout and set out in full in our shipping policy.',
    body: (
      <>
        We are still expanding the pincodes we serve, so enter yours at checkout or on a{' '}
        <Link href="/store/" className={linkCls}>
          product page
        </Link>{' '}
        to see whether we currently deliver to you. Once an order is placed, the dispatch and
        delivery timeline for your address is shown at checkout and set out in full in our{' '}
        <Link href="/policies/shipping/" className={linkCls}>
          shipping policy
        </Link>
        .
      </>
    ),
  },
  {
    q: 'What is your return and refund policy?',
    a: 'Because we sell food, we accept returns or replacements only when something is genuinely wrong, such as a damaged, leaking or incorrect item. Write to us within 48 hours of delivery with photos and your order number. Our cancellation and refund policy explains exactly what we do and how fast.',
    body: (
      <>
        Because we sell food, we accept returns or replacements only when something is genuinely
        wrong, such as a damaged, leaking or incorrect item. Write to us within 48 hours of
        delivery with photos and your order number. Our{' '}
        <Link href="/policies/refunds/" className={linkCls}>
          cancellation and refund policy
        </Link>{' '}
        explains exactly what we do and how fast.
      </>
    ),
  },
  {
    q: 'What is Organikaly Club?',
    a: 'Organikaly Club is our annual membership. Members get free delivery on every order, everyday member savings, and Organikaly Coins that earn faster and redeem at full value. The current price and benefits are on the membership page.',
    body: (
      <>
        Organikaly Club is our annual membership. Members get free delivery on every order,
        everyday member savings, and Organikaly Coins that earn faster and redeem at full value.
        The current price and benefits are on the{' '}
        <Link href="/store/membership/" className={linkCls}>
          membership page
        </Link>
        .
      </>
    ),
  },
  {
    q: 'How do I track my order?',
    a: 'Sign in and open your orders to see the current status of anything you have placed. If you cannot find an update, or something looks stuck, contact us with your order number and we will chase it for you.',
    body: (
      <>
        Sign in and open{' '}
        <Link href="/store/orders/" className={linkCls}>
          your orders
        </Link>{' '}
        to see the current status of anything you have placed. If you cannot find an update, or
        something looks stuck,{' '}
        <Link href="/contact/" className={linkCls}>
          contact us
        </Link>{' '}
        with your order number and we will chase it for you.
      </>
    ),
  },
];

const groups: FaqGroup[] = [
  { title: 'About our oil', items: faqs.map((f) => ({ q: f.q, a: f.a })) },
  { title: 'Ordering, delivery and membership', items: storeFaqs.map((f) => ({ q: f.q, a: f.body })) },
];

// FAQPage structured data: reuse the shared faqSchema() for the product set, then
// extend its mainEntity with the store answers so the schema mirrors the full page.
const productFaqSchema = faqSchema();
const faqPageSchema = {
  ...productFaqSchema,
  mainEntity: [
    ...productFaqSchema.mainEntity,
    ...storeFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  ],
};

export default function FaqsPage() {
  return (
    <MarketingShell>
      <JsonLd data={faqPageSchema} />

      <Section className="pb-16 md:pb-24">
        <PageHero
          eyebrow="Good to know"
          title="Frequently asked questions"
          lead="Honest answers to what buyers actually ask us, about the oil itself and about ordering from the store."
        />
      </Section>

      <Section width="measure" className="pb-16 md:pb-24">
        <FaqAccordion groups={groups} />
      </Section>

      {/* Closing CTA: an open door for anything not covered. */}
      <Section tone="forest" className="py-16 md:py-20">
        <Reveal className="text-center">
          <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl">
            Still have a question?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-cream/80">
            If your question is not here, write in. A real person reads every message.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-semibold text-ink transition hover:bg-yellow-deep"
            >
              Contact us
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
