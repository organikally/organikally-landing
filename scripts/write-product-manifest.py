#!/usr/bin/env python3
"""Emit the per-product media manifest the backend catalogue seed consumes.

Scans public/media/products/<slug>/ (the optimised, committed storefront assets)
and records, per product, which media actually exist — so the seed only ever
points a product at files that are really there (a failed video or still simply
drops out). Written INTO the backend repo (scripts/product_media.json) so the seed
can read it on the EC2 host, where the landing repo isn't checked out.

Paths are storefront-root-relative ("/media/products/<slug>/pack.webp"); the seed
prefixes them with settings.storefront_url.

    ../.venv-imagegen/bin/python scripts/write-product-manifest.py   # (plain python3 works too)
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "public" / "media" / "products"
OUT = ROOT.parent / "organikally-backend" / "scripts" / "product_media.json"

STILL_ORDER = ["pack", "ingredient", "lifestyle"]  # pack is primary + the label slot


def main() -> None:
    manifest: dict[str, dict] = {}
    if not MEDIA.exists():
        print(f"! no media dir at {MEDIA} — nothing to do")
        return

    for slug_dir in sorted(MEDIA.iterdir()):
        if not slug_dir.is_dir():
            continue
        slug = slug_dir.name
        base = f"/media/products/{slug}"
        images = [
            f"{base}/{name}.webp"
            for name in STILL_ORDER
            if (slug_dir / f"{name}.webp").exists()
        ]
        if not images:
            continue
        # og image: prefer a jpg of the pack shot (social scrapers), else the webp.
        og = (
            f"{base}/pack.jpg"
            if (slug_dir / "pack.jpg").exists()
            else images[0]
        )
        video = f"{base}/ad.mp4" if (slug_dir / "ad.mp4").exists() else None
        manifest[slug] = {"images": images, "og": og, "video": video}

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    n_vid = sum(1 for m in manifest.values() if m["video"])
    n_img = sum(len(m["images"]) for m in manifest.values())
    print(f"✓ wrote {OUT}")
    print(f"  {len(manifest)} products · {n_img} stills · {n_vid} videos")


if __name__ == "__main__":
    main()
