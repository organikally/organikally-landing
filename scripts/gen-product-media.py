#!/usr/bin/env python3
"""Per-product photography generator for the Organikaly storefront.

For every catalogue product it renders THREE art-directed stills, so the store
reads like a real shoot instead of sharing category placeholders:

  1. pack       — the product container on a brand surface, with a completely
                  BLANK front label panel. This is the deliberate "label goes
                  here" slot: the founder composites the real product label onto
                  this clean mock-up later. We never fabricate label text.
  2. ingredient — the raw material, macro, hero-lit.
  3. lifestyle  — the food in use in a homely Indian kitchen.

Output: assets/media-work/products/<slug>/{pack,ingredient,lifestyle}.png
Idempotent — existing files are skipped (use --force to redo). Paces requests and
backs off on 429/RESOURCE_EXHAUSTED so a long run stays within Vertex quota.

Backend: Vertex AI (ADC). Defaults to the project that is reachable via ADC on
this machine; override with GOOGLE_CLOUD_PROJECT / GOOGLE_CLOUD_LOCATION.

    ../.venv-imagegen/bin/python scripts/gen-product-media.py --list
    ../.venv-imagegen/bin/python scripts/gen-product-media.py            # missing only
    ../.venv-imagegen/bin/python scripts/gen-product-media.py --only cold-pressed-yellow-mustard-oil-1l
    ../.venv-imagegen/bin/python scripts/gen-product-media.py --force
"""
from __future__ import annotations

import argparse
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "media-work" / "products"

MODEL = "gemini-2.5-flash-image"
DEFAULT_PROJECT = "project-01f969ec-35bf-401a-875"
DEFAULT_LOCATION = "global"

# One art direction for the whole catalogue, so every product reads like the same
# shoot. Forest-green / oil-gold / cream brand world, homely-premium, photoreal.
BRAND = (
    "Organikaly brand world: earthy-premium farm-to-bottle Indian food brand. "
    "Palette of deep forest green, warm oil-gold and soft cream. Warm natural "
    "morning light through a window, gentle soft shadows, shallow depth of field, "
    "photorealistic editorial food photography, tactile and hand-made, calm and "
    "premium — never glossy stock, never neon. Absolutely no text, no lettering, "
    "no numbers, no logos, no watermark anywhere in the frame unless explicitly "
    "requested. Clean composition with breathing room, vertical 4:5 product framing."
)

BLANK_LABEL = (
    "The front of the container carries ONE clean, completely BLANK label panel — a "
    "smooth cream-and-soft-gold empty label with rounded corners and absolutely no "
    "text, no writing, no letters, no numbers, no symbols and no logo of any kind. "
    "The label is intentionally empty, ready for branding to be added later. Keep the "
    "container perfectly upright and centred, studio product lighting on a clean "
    "surface with a softly blurred warm kitchen backdrop."
)

# Per-product art direction. Keyed by SKU code; name kept only for logging. `slug`
# is derived with the SAME rule as the backend seed so the two never drift.
#   container  — what the pack shot shows (blank-label mock-up)
#   ingredient — the raw-material hero
#   lifestyle  — the in-use / cooked context
PRODUCTS: list[dict] = [
    dict(code="OIL-MUST-1L", name="Yellow Mustard Oil 1L",
         container="a tall slim clear PET bottle with a glossy red screw cap, filled with bright golden-yellow mustard oil",
         ingredient="a close-up mound of whole yellow mustard seeds spilling from a brass bowl onto a worn wooden board, a few loose seeds scattered",
         lifestyle="golden mustard oil being poured in a thin stream from a small steel spoon into a hot black iron kadhai, faint shimmer of heat, Indian home stove"),
    dict(code="OIL-MUST-5L", name="Yellow Mustard Oil 5L",
         container="a large 5-litre clear food-grade rectangular jerry-can with a moulded side handle and a red cap, filled with golden-yellow mustard oil",
         ingredient="a generous heap of glossy yellow mustard seeds in jute sacking, soft directional light raking across the grains",
         lifestyle="a busy warm Indian family kitchen counter with the big oil can beside steel vessels and fresh vegetables ready to cook"),
    dict(code="OIL-GNUT-1L", name="Groundnut (Mungfali) Oil 1L",
         container="a tall clear glass bottle with a matte deep-green cap, filled with clear mellow golden groundnut oil",
         ingredient="raw groundnuts in their beige shells piled beside shelled peanuts on cream handloom linen, rustic and warm",
         lifestyle="crisp pakoras deep-frying and bubbling in golden groundnut oil in a steel kadhai, appetising steam"),
    dict(code="OIL-SESA-1L", name="Sesame (Til) Oil 1L",
         container="a slim clear glass bottle with a bronze cap, filled with warm amber sesame oil",
         ingredient="a rustic wooden scoop of pale sesame seeds with a scattering of black sesame, macro texture on terracotta",
         lifestyle="aromatic amber sesame oil being drizzled from a spoon over a bowl of homestyle Indian pickle"),
    dict(code="OIL-COCO-500", name="Virgin Coconut Oil 500ml",
         container="a wide short clear glass jar with a brushed metal lid, filled with pale, softly set white virgin coconut oil",
         ingredient="a fresh coconut split in two showing bright white flesh, with coconut pieces and a few drops of oil on a wooden board",
         lifestyle="virgin coconut oil melting golden-clear in a warm steel pan for a Kerala-style tempering with curry leaves"),
    dict(code="DAL-TOOR-1K", name="Toor (Arhar) Dal 1kg",
         container="a premium kraft-paper stand-up pouch with a clear oval window showing golden-yellow toor dal grains inside",
         ingredient="a heap of split golden toor dal in a shallow brass plate, individual grains crisp and glowing in soft light",
         lifestyle="a steaming bowl of cooked yellow toor dal finished with a ghee-and-cumin tadka, fresh coriander on top"),
    dict(code="DAL-MOONG-1K", name="Moong Dal (Split) 1kg",
         container="a premium kraft-paper stand-up pouch with a clear oval window showing pale yellow split moong dal inside",
         ingredient="a small mound of skinned yellow split moong dal on cream linen, delicate and clean, macro texture",
         lifestyle="a comforting bowl of soft moong dal khichdi with a spoon of ghee melting on top, homely Indian meal"),
    dict(code="DAL-CHANA-1K", name="Chana Dal 1kg",
         container="a premium kraft-paper stand-up pouch with a clear oval window showing nutty golden chana dal inside",
         ingredient="firm split Bengal-gram chana dal grains piled in a terracotta bowl, warm side light",
         lifestyle="a rustic chana dal sabzi simmering in a steel pan with onions and spices, homestyle"),
    dict(code="DAL-URAD-1K", name="Urad Dal (Whole Black) 1kg",
         container="a premium kraft-paper stand-up pouch with a clear oval window showing whole black urad grains inside",
         ingredient="glossy whole black urad grains in a brass bowl, deep and earthy, a few grains on the wooden board",
         lifestyle="a slow-cooked creamy dal makhani in a black karahi, glossy and rich, garnished with a swirl of cream"),
    dict(code="DAL-RAJMA-1K", name="Rajma (Kidney Beans) 1kg",
         container="a premium kraft-paper stand-up pouch with a clear oval window showing plump red rajma kidney beans inside",
         ingredient="plump dark-red rajma kidney beans spilling from a cloth sack onto a rustic wooden surface",
         lifestyle="a homely bowl of rajma curry beside steamed rice, rich tomato-onion gravy, comforting"),
    dict(code="SWT-GUR-1K", name="Jaggery (Gur) 1kg",
         container="a premium kraft-paper stand-up pouch with a clear oval window showing deep-golden jaggery blocks inside",
         ingredient="rustic hand-shaped blocks of deep amber-gold jaggery stacked on jute, warm crumbly texture",
         lifestyle="a piece of jaggery dissolving into a glass of hot masala chai on a wooden table, cosy morning light"),
    dict(code="SWT-KHAND-1K", name="Desi Khand (Raw Cane Sugar) 1kg",
         container="a premium kraft-paper stand-up pouch with a clear oval window showing pale-golden raw cane sugar granules inside",
         ingredient="coarse golden raw-cane-sugar granules mounded in a small steel katori, glinting in soft light",
         lifestyle="a spoonful of golden khand being stirred into a cup of tea, warm homely kitchen scene"),
    dict(code="GHEE-A2-500", name="A2 Desi Cow Ghee 500ml",
         container="a short wide clear glass jar with a gold metal lid, filled with grainy, softly set golden A2 cow ghee",
         ingredient="a close-up of grainy golden ghee with a brass spoon lifting a scoop, rich hand-churned texture",
         lifestyle="a spoon of golden ghee melting over a stack of hot phulka rotis, homely warm light"),
    dict(code="HNY-RAW-500", name="Raw Forest Honey 500g",
         container="a clear hexagonal glass jar with a warm wooden lid, filled with glowing amber raw honey",
         ingredient="a wooden honey dipper lifting thick amber honey beside a piece of natural honeycomb, backlit and glowing",
         lifestyle="raw amber honey drizzling over a warm breakfast bowl of curd and fruit, soft morning light"),
    dict(code="PKL-MANGO-500", name="Mango Pickle (Aam ka Achaar) 500g",
         container="a clear glass jar with a metal lid, packed with chunky raw-mango pickle in glistening mustard-oil masala",
         ingredient="raw green mango wedges tossed with red chilli, fenugreek and whole spices on a terracotta plate",
         lifestyle="a spoon of oily red mango achaar served beside a flaky paratha on a steel thali, homely"),
    dict(code="PKL-LEMON-400", name="Lemon Pickle (Nimbu ka Achaar) 400g",
         container="a clear glass jar with a metal lid, packed with soft matured lemon pickle wedges in spiced masala",
         ingredient="whole lemons with coarse salt and warm spices on a rustic board, bright and fresh",
         lifestyle="tangy lemon pickle served alongside a simple dal-rice meal on a banana leaf, homestyle"),
    dict(code="SPC-HALDI-200", name="Turmeric (Haldi) Powder 200g",
         container="a small kraft-paper pouch with a clear window showing vivid deep-yellow turmeric powder inside",
         ingredient="fresh turmeric roots beside a small mound of vivid golden-yellow haldi powder on a wooden board, a brass spoon",
         lifestyle="a pinch of golden turmeric being added to a simmering pot of curry, warm homely kitchen"),
    dict(code="SPC-MIRCH-200", name="Red Chilli (Lal Mirch) Powder 200g",
         container="a small kraft-paper pouch with a clear window showing deep-red chilli powder inside",
         ingredient="dried whole red chillies beside a mound of deep-red chilli powder in a steel katori, rich colour",
         lifestyle="red chilli powder blooming into hot oil for a sizzling tadka in a steel pan"),
    dict(code="SPC-DHANIA-200", name="Coriander (Dhania) Powder 200g",
         container="a small kraft-paper pouch with a clear window showing warm tan coriander powder inside",
         ingredient="whole coriander seeds beside freshly milled tan coriander powder on cream linen, macro texture",
         lifestyle="warm coriander powder being spooned into a fragrant onion-tomato masala base in a kadhai"),
    dict(code="GRN-ATTA-5K", name="Whole Wheat Atta 5kg",
         container="a large premium kraft-paper sack pouch with a clear window showing fine wholewheat atta flour inside",
         ingredient="golden wheat grains and a soft mound of stone-ground wholewheat flour on a wooden board, dusting of flour",
         lifestyle="a stack of soft fresh phulka rotis with one puffing over an open flame, homely Indian kitchen"),
]


def _slugify(name: str) -> str:
    return (
        name.lower()
        .replace("(", "").replace(")", "")
        .replace("&", "and").replace("/", "-")
        .replace(",", "").replace(".", "").replace("'", "")
        .replace("—", "-").replace("·", "-")
        .replace("  ", " ").strip().replace(" ", "-")
    )


# The backend seeds slugs from the FULL product name; mirror those exactly so the
# generated folder for each product matches its store slug.
FULL_NAMES = {
    "OIL-MUST-1L": "Cold-Pressed Yellow Mustard Oil 1L",
    "OIL-MUST-5L": "Cold-Pressed Yellow Mustard Oil 5L",
    "OIL-GNUT-1L": "Cold-Pressed Groundnut (Mungfali) Oil 1L",
    "OIL-SESA-1L": "Cold-Pressed Sesame (Til) Oil 1L",
    "OIL-COCO-500": "Cold-Pressed Virgin Coconut Oil 500ml",
    "DAL-TOOR-1K": "Organic Toor (Arhar) Dal 1kg",
    "DAL-MOONG-1K": "Organic Moong Dal (Split) 1kg",
    "DAL-CHANA-1K": "Organic Chana Dal 1kg",
    "DAL-URAD-1K": "Organic Urad Dal (Whole Black) 1kg",
    "DAL-RAJMA-1K": "Organic Rajma (Kidney Beans) 1kg",
    "SWT-GUR-1K": "Organic Jaggery (Gur) 1kg",
    "SWT-KHAND-1K": "Desi Khand (Raw Cane Sugar) 1kg",
    "GHEE-A2-500": "A2 Desi Cow Ghee (Bilona) 500ml",
    "HNY-RAW-500": "Raw Forest Honey 500g",
    "PKL-MANGO-500": "Mango Pickle (Aam ka Achaar) 500g",
    "PKL-LEMON-400": "Lemon Pickle (Nimbu ka Achaar) 400g",
    "SPC-HALDI-200": "Organic Turmeric (Haldi) Powder 200g",
    "SPC-MIRCH-200": "Organic Red Chilli (Lal Mirch) Powder 200g",
    "SPC-DHANIA-200": "Organic Coriander (Dhania) Powder 200g",
    "GRN-ATTA-5K": "Stone-Ground Whole Wheat Atta 5kg",
}


def slot_prompts(p: dict) -> dict[str, str]:
    return {
        "pack": (
            f"A premium studio product photograph of {p['container']}. {BLANK_LABEL} {BRAND}"
        ),
        "ingredient": (
            f"A premium close-up photograph of {p['ingredient']}. {BRAND}"
        ),
        "lifestyle": (
            f"A warm homely lifestyle photograph: {p['lifestyle']}. {BRAND}"
        ),
    }


def make_client():
    from google import genai

    project = os.environ.get("GOOGLE_CLOUD_PROJECT", DEFAULT_PROJECT)
    location = os.environ.get("GOOGLE_CLOUD_LOCATION", DEFAULT_LOCATION)
    print(f"· backend: Vertex AI (ADC)  project={project}  location={location}")
    return genai.Client(vertexai=True, project=project, location=location)


def extract_image(resp):
    for cand in getattr(resp, "candidates", None) or []:
        content = getattr(cand, "content", None)
        for part in (getattr(content, "parts", None) or []):
            inline = getattr(part, "inline_data", None)
            if inline and getattr(inline, "data", None):
                return inline.data
    return None


def generate_one(client, prompt: str, out: Path, delay: float) -> str:
    from google.genai import types

    if out.exists() and out.stat().st_size > 0:
        return "skip"
    for attempt in range(7):
        try:
            resp = client.models.generate_content(
                model=MODEL,
                contents=[prompt],
                config=types.GenerateContentConfig(response_modalities=["IMAGE"]),
            )
            data = extract_image(resp)
            if not data:
                print(f"    x {out.name}: no image in response")
                return "fail"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(data)
            print(f"    + {out.parent.name}/{out.name}  ({len(data)//1024} KB)")
            time.sleep(delay)
            return "ok"
        except Exception as e:  # noqa: BLE001
            msg = str(e)
            if ("429" in msg or "RESOURCE_EXHAUSTED" in msg or "503" in msg or "500" in msg) and attempt < 6:
                wait = 15 + attempt * 15
                print(f"    … {out.parent.name}/{out.name} throttled, retry in {wait}s ({attempt + 1}/6)")
                time.sleep(wait)
                continue
            print(f"    x {out.parent.name}/{out.name} FAILED: {msg[:160]}")
            return "fail"
    return "fail"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated slugs")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--delay", type=float, default=7.0, help="seconds between requests")
    ap.add_argument("--list", action="store_true")
    args = ap.parse_args()

    items = []
    for p in PRODUCTS:
        slug = _slugify(FULL_NAMES[p["code"]])
        items.append((slug, p))
    if args.only:
        want = {s.strip() for s in args.only.split(",")}
        items = [(s, p) for s, p in items if s in want]

    if args.list:
        for slug, p in items:
            print(f"  {slug:44} {p['code']}")
        print(f"\n{len(items)} products × 3 stills = {len(items) * 3} images")
        return

    client = make_client()
    print(f"· model: {MODEL}   out: {OUT}\n")

    ok = skip = fail = 0
    for slug, p in items:
        print(f"■ {slug}")
        for slot, prompt in slot_prompts(p).items():
            out = OUT / slug / f"{slot}.png"
            if args.force and out.exists():
                out.unlink()
            r = generate_one(client, prompt, out, args.delay)
            ok += r == "ok"; skip += r == "skip"; fail += r == "fail"
    print(f"\n✓ done — {ok} generated, {skip} skipped, {fail} failed. Total slots: {len(items) * 3}")
    if fail:
        print("  Re-run to retry failed slots (idempotent).")
        sys.exit(1)


if __name__ == "__main__":
    main()
