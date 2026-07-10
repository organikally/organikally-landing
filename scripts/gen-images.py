#!/usr/bin/env python3
"""
Organikaly homely-imagery generator (Gemini "Nano Banana", gemini-2.5-flash-image).

Produces the art-directed source set in assets/media-work/gen-*.png. Then run
scripts/build-media.sh to optimise into the public/media AVIF+WebP+JPG triplet.

Backends (auto-detected, in order):
  1. Gemini Developer API   — needs GEMINI_API_KEY (or GOOGLE_API_KEY). Read from the
     environment or from organikally-landing/.env.local (KEY=VALUE lines).
  2. Vertex AI (ADC)        — needs GOOGLE_CLOUD_PROJECT (+ optional GOOGLE_CLOUD_LOCATION,
     default us-central1) and working Application Default Credentials.

Run with the project venv that has google-genai + pillow:
  ../.venv-imagegen/bin/python scripts/gen-images.py --list
  ../.venv-imagegen/bin/python scripts/gen-images.py            # generate missing only
  ../.venv-imagegen/bin/python scripts/gen-images.py --only compare-refined,compare-coldpressed
  ../.venv-imagegen/bin/python scripts/gen-images.py --force    # regenerate everything
  ../.venv-imagegen/bin/python scripts/gen-images.py --model pro # gemini-3-pro-image-preview
"""
import argparse
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "media-work"
MANIFEST = Path(__file__).resolve().parent / "image-manifest.json"
BRAND_BOTTLE = ROOT / "public" / "brand" / "product-bottle.webp"

MODELS = {"flash": "gemini-2.5-flash-image", "pro": "gemini-3-pro-image-preview"}

# One art direction for the whole set, so the page reads like a single shoot, not a
# stock grab-bag. Appended to every prompt. No text/logos/watermarks; photoreal; warm.
STYLE = (
    "Warm, homely Indian home-kitchen aesthetic. Soft natural morning light through a "
    "window, gentle shadows. Earthy, authentic props: brass and steel vessels, terracotta, "
    "a worn wooden board, cream handloom linen, a few whole yellow mustard seeds. Golden "
    "mustard-oil tones, cream and warm-ink palette, no bright saturated colours. Shallow "
    "depth of field, photorealistic editorial food photography, tactile and hand-made, "
    "calm and premium, never glossy stock. No text, no logos, no watermark, no lettering, "
    "no hands unless specified. Square-friendly composition with breathing room."
)


def load_env_local():
    """Best-effort load of organikally-landing/.env.local into os.environ (no override)."""
    for name in (".env.local", ".env"):
        p = ROOT / name
        if not p.exists():
            continue
        for line in p.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            k, v = k.strip(), v.strip().strip('"').strip("'")
            os.environ.setdefault(k, v)


def make_client():
    from google import genai

    project = os.environ.get("GOOGLE_CLOUD_PROJECT")
    use_vertex = os.environ.get("GOOGLE_GENAI_USE_VERTEXAI", "").lower() in ("1", "true", "yes")
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    # Prefer Vertex whenever a project is provided (or explicitly requested): the project
    # signals Vertex intent even if a stray Developer-API key is also present in the env.
    if project or use_vertex:
        if not project:
            sys.exit("GOOGLE_GENAI_USE_VERTEXAI is set but GOOGLE_CLOUD_PROJECT is missing.")
        loc = os.environ.get("GOOGLE_CLOUD_LOCATION", "global")
        print(f"· backend: Vertex AI (ADC)  project={project} location={loc}")
        return genai.Client(vertexai=True, project=project, location=loc), "vertex"
    if api_key:
        print("· backend: Gemini Developer API (key)")
        return genai.Client(api_key=api_key), "dev"
    sys.exit(
        "No credentials. Set GOOGLE_CLOUD_PROJECT + ADC (Vertex) OR GEMINI_API_KEY in "
        "organikally-landing/.env.local (Developer API). See MANUAL_STEPS.md."
    )


def extract_image(resp):
    """Pull the first inline image blob out of a generate_content response."""
    for cand in getattr(resp, "candidates", None) or []:
        content = getattr(cand, "content", None)
        for part in (getattr(content, "parts", None) or []):
            inline = getattr(part, "inline_data", None)
            if inline and getattr(inline, "data", None):
                return inline.data
    return None


def generate(client, model, item, force):
    from google.genai import types

    out = OUT / f"gen-{item['name']}.png"
    if out.exists() and not force:
        print(f"  = gen-{item['name']} exists (skip; --force to redo)")
        return True

    # Illustration slots override the photo STYLE with their own via item["style"].
    prompt = f"{item['prompt']}\n\n{item.get('style', STYLE)}"
    parts = [prompt]

    # Product-accurate slots edit the real bottle in (text+image-to-image).
    if item.get("use_bottle") and BRAND_BOTTLE.exists():
        from PIL import Image
        import io

        img = Image.open(BRAND_BOTTLE).convert("RGBA")
        bg = Image.new("RGB", img.size, (250, 249, 245))
        bg.paste(img, mask=img.split()[3])
        buf = io.BytesIO()
        bg.save(buf, format="PNG")
        parts = [prompt, types.Part.from_bytes(data=buf.getvalue(), mime_type="image/png")]

    resp = None
    for attempt in range(6):
        try:
            resp = client.models.generate_content(
                model=model,
                contents=parts,
                config=types.GenerateContentConfig(response_modalities=["IMAGE"]),
            )
            break
        except Exception as e:  # noqa: BLE001 — surface any API/quota/perm error verbatim
            msg = str(e)
            if ("429" in msg or "RESOURCE_EXHAUSTED" in msg) and attempt < 5:
                wait = 20 + attempt * 15
                print(f"  … gen-{item['name']} rate-limited, retry in {wait}s ({attempt + 1}/5)")
                time.sleep(wait)
                continue
            print(f"  x gen-{item['name']} FAILED: {e}")
            return False

    data = extract_image(resp)
    if not data:
        print(f"  x gen-{item['name']}: no image in response")
        return False
    out.write_bytes(data)
    print(f"  + gen-{item['name']}.png  ({len(data)//1024} KB)")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated slot names")
    ap.add_argument("--force", action="store_true", help="regenerate even if output exists")
    ap.add_argument("--model", choices=list(MODELS), default="flash")
    ap.add_argument("--delay", type=float, default=12.0, help="seconds between requests (pacing)")
    ap.add_argument("--list", action="store_true", help="list slots and exit")
    args = ap.parse_args()

    items = json.loads(MANIFEST.read_text())["images"]
    if args.only:
        want = {s.strip() for s in args.only.split(",")}
        items = [i for i in items if i["name"] in want]

    if args.list:
        for i in items:
            gap = " [GAP]" if i.get("gap") else ""
            print(f"  {i['name']:22} {i.get('slot',''):10}{gap}  {i['prompt'][:60]}...")
        print(f"\n{len(items)} slots. Build after: bash scripts/build-media.sh")
        return

    load_env_local()
    OUT.mkdir(parents=True, exist_ok=True)
    client, _ = make_client()
    model = MODELS[args.model]
    print(f"· model: {model}   out: {OUT}\n")

    ok = 0
    for idx, item in enumerate(items):
        if idx:
            time.sleep(args.delay)
        ok += generate(client, model, item, args.force)
    print(f"\n✓ {ok}/{len(items)} generated. Next: bash scripts/build-media.sh")


if __name__ == "__main__":
    main()
