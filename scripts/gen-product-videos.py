#!/usr/bin/env python3
"""Short per-product ad clips for the storefront, via Vertex Veo 2 image-to-video.

For each product it animates the generated pack still into a ~6s vertical (9:16)
product commercial — a slow push-in with product-appropriate motion — and saves it
as assets/media-work/products/<slug>/ad.mp4. Idempotent (skips products that
already have ad.mp4). Submits in small concurrent batches and polls the async
operations so a full catalogue run stays inside Veo concurrency/quota.

If a product's still is missing, or Veo fails after retries, the slot is left for
the ffmpeg montage fallback in build-product-media.sh (a Ken-Burns pan over the
three stills) so every product ends up with a clip regardless.

    ../.venv-imagegen/bin/python scripts/gen-product-videos.py            # missing only
    ../.venv-imagegen/bin/python scripts/gen-product-videos.py --only cold-pressed-yellow-mustard-oil-1l
    ../.venv-imagegen/bin/python scripts/gen-product-videos.py --batch 3
"""
from __future__ import annotations

import argparse
import os
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "media-work" / "products"

MODEL = "veo-2.0-generate-001"
DEFAULT_PROJECT = "project-01f969ec-35bf-401a-875"
LOCATION = "us-central1"  # Veo publisher models are regional, not on the global endpoint.

COMMON = (
    "Cinematic premium product commercial, shallow depth of field, a warm homely "
    "Indian kitchen softly blurred in the background, gentle golden morning light. "
    "Smooth, subtle, tasteful motion only. No text, no captions, no logos, no people."
)

# Per-slug camera/motion direction (what should move). Falls back to a generic
# push-in when a slug isn't listed.
MOTION = {
    "cold-pressed-yellow-mustard-oil-1l": "Slow elegant push-in on the bottle; golden mustard oil glows and soft light glints travel across the glass.",
    "cold-pressed-yellow-mustard-oil-5l": "Slow push-in on the large oil can; warm light sweeps across it, a sense of abundance.",
    "cold-pressed-groundnut-mungfali-oil-1l": "Slow push-in on the bottle; mellow golden oil catches soft light, gentle glints.",
    "cold-pressed-sesame-til-oil-1l": "Slow push-in on the bottle; warm amber sesame oil shimmers, delicate light play.",
    "cold-pressed-virgin-coconut-oil-500ml": "Slow push-in on the jar; soft light glides over the pale coconut oil, calm and clean.",
    "organic-toor-arhar-dal-1kg": "Slow push-in on the pouch; a few golden dal grains in the window catch the light.",
    "organic-moong-dal-split-1kg": "Slow push-in on the pouch; pale yellow dal glows softly through the window.",
    "organic-chana-dal-1kg": "Slow push-in on the pouch; nutty golden chana dal glints gently in the window.",
    "organic-urad-dal-whole-black-1kg": "Slow push-in on the pouch; glossy black urad grains catch a soft highlight.",
    "organic-rajma-kidney-beans-1kg": "Slow push-in on the pouch; plump red rajma beans glow warmly in the window.",
    "organic-jaggery-gur-1kg": "Slow push-in on the pouch; deep amber jaggery glows, warm and rich.",
    "desi-khand-raw-cane-sugar-1kg": "Slow push-in on the pouch; golden raw-sugar granules sparkle gently.",
    "a2-desi-cow-ghee-bilona-500ml": "Slow push-in on the jar; grainy golden ghee catches a soft glossy highlight.",
    "raw-forest-honey-500g": "Slow push-in on the jar; amber honey glows, backlit and luminous.",
    "mango-pickle-aam-ka-achaar-500g": "Slow push-in on the jar; glossy oily red mango pickle catches warm light.",
    "lemon-pickle-nimbu-ka-achaar-400g": "Slow push-in on the jar; matured lemon pickle glistens softly.",
    "organic-turmeric-haldi-powder-200g": "Slow push-in on the pack; vivid golden turmeric glows in the window.",
    "organic-red-chilli-lal-mirch-powder-200g": "Slow push-in on the pack; deep-red chilli powder catches warm light.",
    "organic-coriander-dhania-powder-200g": "Slow push-in on the pack; warm tan coriander powder glows softly.",
    "stone-ground-whole-wheat-atta-5kg": "Slow push-in on the flour sack; faint flour dust drifts in a soft light beam.",
}

ORDER = list(MOTION.keys())


def make_client():
    from google import genai

    project = os.environ.get("GOOGLE_CLOUD_PROJECT", DEFAULT_PROJECT)
    print(f"· backend: Vertex AI Veo (ADC)  project={project}  location={LOCATION}  model={MODEL}")
    return genai.Client(vertexai=True, project=project, location=LOCATION)


def submit(client, slug: str):
    from google.genai import types

    still = OUT / slug / "pack.png"
    if not still.exists():
        # fall back to the lifestyle shot if the pack still isn't there yet
        still = OUT / slug / "lifestyle.png"
    if not still.exists():
        print(f"  ! {slug}: no still to animate — leaving for montage fallback")
        return None
    prompt = f"{MOTION.get(slug, 'Slow elegant push-in on the product.')} {COMMON}"
    img = types.Image(image_bytes=still.read_bytes(), mime_type="image/png")
    op = client.models.generate_videos(
        model=MODEL, image=img, prompt=prompt,
        config=types.GenerateVideosConfig(number_of_videos=1, duration_seconds=6, aspect_ratio="9:16"),
    )
    print(f"  → {slug}: submitted {op.name.split('/')[-1]}")
    return op


def save(op, slug: str) -> bool:
    resp = getattr(op, "response", None) or getattr(op, "result", None)
    gv = getattr(resp, "generated_videos", None) if resp else None
    if not gv:
        print(f"  x {slug}: no video in completed op ({getattr(op,'error',None)})")
        return False
    data = getattr(gv[0].video, "video_bytes", None)
    if not data:
        print(f"  x {slug}: op done but no bytes (uri={getattr(gv[0].video,'uri',None)})")
        return False
    out = OUT / slug / "ad.mp4"
    out.write_bytes(data)
    print(f"  + {slug}/ad.mp4  ({len(data)//1024} KB)")
    return True


def run_batch(client, slugs: list[str], poll_timeout: int) -> tuple[int, list[str]]:
    """Submit all slugs in this batch, then poll every operation to completion."""
    ops: dict[str, object] = {}
    for slug in slugs:
        try:
            op = submit(client, slug)
            if op is not None:
                ops[slug] = op
        except Exception as e:  # noqa: BLE001
            print(f"  x {slug}: submit failed: {str(e)[:160]}")
    ok = 0
    failed: list[str] = []
    t0 = time.time()
    pending = dict(ops)
    while pending:
        if time.time() - t0 > poll_timeout:
            print(f"  … timeout; {len(pending)} still pending: {', '.join(pending)}")
            failed.extend(pending)
            break
        time.sleep(12)
        for slug, op in list(pending.items()):
            try:
                op = client.operations.get(op)
            except Exception as e:  # noqa: BLE001
                print(f"  … {slug}: poll error {str(e)[:100]}")
                continue
            pending[slug] = op
            if op.done:
                del pending[slug]
                if save(op, slug):
                    ok += 1
                else:
                    failed.append(slug)
        if pending:
            print(f"  … waiting on {len(pending)}: {', '.join(pending)} ({int(time.time()-t0)}s)")
    return ok, failed


def main() -> None:
    from google import genai  # noqa: F401 — import early so a missing dep fails fast

    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated slugs")
    ap.add_argument("--batch", type=int, default=3, help="concurrent Veo ops per batch")
    ap.add_argument("--force", action="store_true", help="regenerate even if ad.mp4 exists")
    ap.add_argument("--poll-timeout", type=int, default=420, help="seconds to wait per batch")
    args = ap.parse_args()

    slugs = ORDER
    if args.only:
        want = {s.strip() for s in args.only.split(",")}
        slugs = [s for s in slugs if s in want]
    if not args.force:
        slugs = [s for s in slugs if not (OUT / s / "ad.mp4").exists()]

    if not slugs:
        print("Nothing to do — every product already has ad.mp4.")
        return

    client = make_client()
    print(f"· {len(slugs)} clips to generate, batch size {args.batch}\n")

    total_ok = 0
    all_failed: list[str] = []
    for i in range(0, len(slugs), args.batch):
        batch = slugs[i : i + args.batch]
        print(f"■ batch {i // args.batch + 1}: {', '.join(batch)}")
        ok, failed = run_batch(client, batch, args.poll_timeout)
        total_ok += ok
        all_failed.extend(failed)

    print(f"\n✓ videos done — {total_ok} generated, {len(all_failed)} failed.")
    if all_failed:
        print("  Failed (ffmpeg montage will cover these):", ", ".join(all_failed))


if __name__ == "__main__":
    main()
