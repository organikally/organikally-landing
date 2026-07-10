'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BadgeCheck, Star } from 'lucide-react';
import RatingStars from './RatingStars';
import { storeApi, ApiError } from '@/lib/store/client';
import { useAuth } from '@/lib/store/auth-context';
import { formatDate } from '@/lib/format';
import type { ReviewsPage, ReviewItem } from '@/lib/store/types';

// PDP reviews — summary, histogram, the list (load-more), and a write-a-review
// form for signed-in customers. New reviews go to moderation; the section is
// honest about that instead of pretending they appear instantly.
export default function ReviewsSection({
  slug,
  initial,
}: {
  slug: string;
  initial: ReviewsPage;
}) {
  const { isAuthed, ready } = useAuth();
  const [items, setItems] = useState<ReviewItem[]>(initial.items);
  const [page, setPage] = useState(initial.page || 1);
  const [loadingMore, setLoadingMore] = useState(false);
  const summary = initial.summary;
  const hasMore = items.length < initial.total;

  // Form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const next = await storeApi.productReviews(slug, page + 1);
      setItems((prev) => [...prev, ...next.items]);
      setPage(next.page);
    } catch {
      /* leave the list as-is */
    } finally {
      setLoadingMore(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (rating < 1) {
      setError('Pick a star rating first.');
      return;
    }
    if (body.trim().length < 10) {
      setError('Tell us a little more — at least 10 characters.');
      return;
    }
    setSubmitting(true);
    try {
      await storeApi.submitReview(slug, {
        rating,
        title: title.trim() || undefined,
        body: body.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const bars = [5, 4, 3, 2, 1].map((star) => {
    const n = summary.histogram?.[String(star)] ?? 0;
    const pct = summary.count > 0 ? Math.round((n / summary.count) * 100) : 0;
    return { star, n, pct };
  });

  return (
    <section id="reviews" className="mt-16 scroll-mt-36 border-t border-line pt-10" aria-label="Customer reviews">
      <h2 className="t-subtitle font-semibold text-ink">Ratings &amp; reviews</h2>

      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14">
        {/* Summary + form */}
        <div>
          {summary.count > 0 ? (
            <div className="rounded-card border border-line bg-surface p-6">
              <div className="flex items-end gap-3">
                <span className="tnum font-display text-5xl leading-none text-ink">
                  {(summary.average ?? 0).toFixed(1)}
                </span>
                <div className="pb-1">
                  <RatingStars value={summary.average ?? 0} size={18} />
                  <p className="mt-1 text-sm text-ink-muted">
                    {summary.count} {summary.count === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-1.5">
                {bars.map(({ star, n, pct }) => (
                  <li key={star} className="flex items-center gap-2 text-sm">
                    <span className="tnum w-3 text-ink-muted">{star}</span>
                    <Star className="h-3.5 w-3.5 fill-yellow text-yellow" />
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                      <span className="block h-full rounded-full bg-yellow" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="tnum w-6 text-right text-xs text-ink-faint">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-card border border-line bg-surface p-6">
              <p className="font-display text-xl text-ink">No reviews yet.</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Cooked with this? Be the first to tell other kitchens how it went.
              </p>
            </div>
          )}

          {/* Write a review */}
          <div className="mt-6">
            {!ready ? null : !isAuthed ? (
              <Link
                href={`/store/login/?next=/store/${slug}/`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-surface"
              >
                Sign in to write a review
              </Link>
            ) : submitted ? (
              <div className="rounded-card border-l-4 border-yellow bg-surface p-5">
                <p className="font-semibold text-ink">Thanks — review received.</p>
                <p className="mt-1 text-sm text-ink-muted">
                  It will appear here once it clears a quick moderation check.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-card border border-line bg-paper p-5">
                <p className="font-semibold text-ink">Write a review</p>
                <div className="mt-3 flex items-center gap-1" role="radiogroup" aria-label="Your rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow text-yellow-deep'
                            : 'fill-transparent text-ink-faint'
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                <label htmlFor="rv-title" className="mt-4 block text-xs font-medium text-ink-faint">
                  Title (optional)
                </label>
                <input
                  id="rv-title"
                  value={title}
                  maxLength={120}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-chip border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-yellow-deep"
                  placeholder="Sums it up in a line"
                />
                <label htmlFor="rv-body" className="mt-3 block text-xs font-medium text-ink-faint">
                  Your review
                </label>
                <textarea
                  id="rv-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  className="mt-1 w-full rounded-chip border border-line bg-paper px-3 py-2 text-sm leading-relaxed text-ink outline-none focus:border-yellow-deep"
                  placeholder="How did you use it? How was the aroma, taste, packaging?"
                />
                {error && <p className="mt-2 text-sm font-medium text-red-700">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-2.5 text-sm font-semibold text-ink transition duration-300 ease-brand hover:bg-yellow-deep disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Submit review'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Review list */}
        <div>
          {items.length === 0 ? (
            <p className="text-ink-muted">
              Once customers review this product, their words appear here — unedited.
            </p>
          ) : (
            <ul className="space-y-7">
              {items.map((r) => (
                <li key={r.id} className="border-b border-line pb-7 last:border-b-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <RatingStars value={r.rating} size={15} />
                    {r.title && <span className="font-semibold text-ink">{r.title}</span>}
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-muted">{r.body}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
                    <span className="font-medium text-ink-muted">{r.customer_name}</span>
                    {r.verified_purchase && (
                      <span className="inline-flex items-center gap-1 text-forest">
                        <BadgeCheck className="h-4 w-4" strokeWidth={1.8} />
                        Verified purchase
                      </span>
                    )}
                    <span>{formatDate(r.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {hasMore && (
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="mt-6 rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-surface disabled:opacity-60"
            >
              {loadingMore ? 'Loading…' : 'Load more reviews'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
