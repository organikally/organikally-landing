// On-demand revalidation (STORE_CONTRACT §2.3). The backend calls this after a
// catalog change (publish/unpublish/archive/price/marketing-flag) to refresh the
// ISR listing + sitemap. The PDP is request-time SSR and needs no revalidation.
//
// Auth: header `x-revalidate-secret` must equal env REVALIDATE_SECRET (else 401).
// Body: { tags?: string[], paths?: string[] }. Default backend payload:
//   { tags:["store-products","store-product:<slug>"], paths:["/store/","/sitemap.xml"] }

import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get('x-revalidate-secret');

  // Deny if not configured or mismatched (no timing-sensitive secret here — it's a
  // shared deploy secret, not user-derived).
  if (!secret || provided !== secret) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
  }

  let body: { tags?: unknown; paths?: unknown } = {};
  try {
    body = (await request.json()) as { tags?: unknown; paths?: unknown };
  } catch {
    // Empty/invalid body → fall back to revalidating the listing tag.
    body = {};
  }

  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === 'string') : [];
  const paths = Array.isArray(body.paths)
    ? body.paths.filter((p): p is string => typeof p === 'string')
    : [];

  // Belt-and-suspenders: if nothing was supplied, refresh the listing tag so the
  // grid + sitemap (both tagged `store-products`, §2.4) regenerate.
  if (tags.length === 0 && paths.length === 0) {
    revalidateTag('store-products');
  } else {
    for (const tag of tags) revalidateTag(tag);
    for (const path of paths) revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
}
