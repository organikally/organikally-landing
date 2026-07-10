'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import Media from '@/components/ui/Media';
import SectionTitle from '@/components/ui/SectionTitle';
import GoldStrip from '@/components/ui/GoldStrip';
import { whatsapp } from '@/lib/site';
import {
  audienceOptions,
  audienceQuestion,
  cookingOptions,
  cookingQuestion,
  getResult,
  type AudienceId,
  type CookingId,
  type Option,
} from '@/content/quiz';

// A light, homely two-step matcher, restyled to Ojasya's split card. State is two
// answers only (useState, no libs); keyboard-operable native buttons; it always ends
// in a real order path. Q1 routes the tailored line + image, Q2 surfaces the bulk/trade
// line for shops and kitchens. Left = a festive photo panel (swaps to the matched
// product on the result); right = a cream/surface card with rust question labels and
// large stacked answer buttons.
export default function Quiz() {
  const [cooking, setCooking] = useState<CookingId | null>(null);
  const [audience, setAudience] = useState<AudienceId | null>(null);

  const step = cooking === null ? 1 : audience === null ? 2 : 3;
  const result = cooking && audience ? getResult(cooking, audience) : null;

  return (
    <section id="match" className="relative z-10 py-16 md:py-24">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <SectionTitle eyebrow="Find your Organikaly">Which oil is best for you?</SectionTitle>

        <Reveal className="mx-auto mt-5 max-w-measure text-center">
          <p className="t-lead">
            Two quick questions, and we’ll point you to the right bottle — and the shortest way to
            get it to your kitchen.
          </p>
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-card border border-forest/15 bg-surface shadow-lg">
            <div className="grid md:grid-cols-2">
              {/* Left — festive photo panel; swaps to the matched product on the result. */}
              <Media
                name={result ? result.image : 'quiz-portrait'}
                alt={
                  result
                    ? `Organikaly ${result.title}`
                    : 'A home kitchen laid out with Organikaly cold-pressed yellow mustard oil'
                }
                width={1000}
                height={1200}
                className="h-60 w-full sm:h-72 md:h-auto"
                imgClassName="object-center"
                sizes="(min-width: 768px) 50vw, 100vw"
              />

              {/* Right — the question / result card. */}
              <div className="p-6 sm:p-8 md:p-10">
                {step === 1 && (
                  <QuestionBlock<CookingId>
                    step={1}
                    question={cookingQuestion}
                    options={cookingOptions}
                    onPick={setCooking}
                  />
                )}

                {step === 2 && (
                  <>
                    <QuestionBlock<AudienceId>
                      step={2}
                      question={audienceQuestion}
                      options={audienceOptions}
                      onPick={setAudience}
                    />
                    <button
                      type="button"
                      onClick={() => setCooking(null)}
                      className="mt-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink-faint transition-colors duration-300 hover:text-forest"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                    </button>
                  </>
                )}

                {result && (
                  <div aria-live="polite">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-rust">
                      {result.eyebrow}
                    </p>
                    <h3 className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-forest">
                      {result.title}
                    </h3>
                    {result.hindi && (
                      <p className="mt-1.5 font-deva text-xl text-yellow-ink">{result.hindi}</p>
                    )}
                    <div aria-hidden="true" className="mt-4 h-[3px] w-14 rounded-full bg-yellow" />
                    <p className="mt-5 leading-relaxed text-ink-muted">{result.line}</p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Cta href={whatsapp(result.order)} variant="primary" whatsapp external>
                        Order on WhatsApp
                      </Cta>
                      {result.rangeNudge && (
                        <Cta href="#range" variant="secondary" arrow>
                          See the range
                        </Cta>
                      )}
                    </div>

                    {result.trade && (
                      <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                        Buying for a shop or kitchen?{' '}
                        <a
                          href={whatsapp(result.trade)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-yellow-ink underline decoration-yellow decoration-2 underline-offset-4 transition-colors hover:text-forest"
                        >
                          Ask about bulk &amp; trade pricing
                        </a>
                        .
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setCooking(null);
                        setAudience(null);
                      }}
                      className="mt-8 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink-faint transition-colors duration-300 hover:text-forest"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Ojasya gold section-foot accent. */}
            <GoldStrip />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuestionBlock<T extends string>({
  step,
  question,
  options,
  onPick,
}: {
  step: number;
  question: string;
  options: readonly Option<T>[];
  onPick: (id: T) => void;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-rust">
        Question <span className="tnum">0{step}</span>{' '}
        <span className="text-rust/40">/ 02</span>
      </p>
      <h3 className="mt-4 font-heading text-[clamp(1.3rem,2.2vw,1.9rem)] font-extrabold uppercase leading-[1.12] tracking-[-0.01em] text-forest">
        {question}
      </h3>
      <div role="group" aria-label={question} className="mt-6 flex flex-col gap-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className="group/opt flex w-full cursor-pointer items-center justify-between gap-4 rounded-chip border border-forest/20 bg-paper px-5 py-4 text-left transition duration-300 ease-brand hover:-translate-y-[2px] hover:border-forest/50 hover:bg-forest/5 hover:shadow-md"
          >
            <span className="min-w-0">
              <span className="block font-semibold text-forest">{o.label}</span>
              {o.hint && <span className="mt-0.5 block text-sm text-ink-muted">{o.hint}</span>}
            </span>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-forest/45 transition-all duration-300 ease-brand group-hover/opt:translate-x-1 group-hover/opt:text-forest"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
