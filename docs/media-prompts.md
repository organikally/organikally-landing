# Organikaly — AI media prompt kit

Generation prompts for the landing-page media. The goal is a **cohesive, earthy-premium,
documentary** look — not stock-photo / CGI "AI slop." The single most important thing is to
paste the **Style spine** into every prompt so the whole set feels like one shoot.

## How to use

1. Prompt = `Subject line` + `Style spine` (+ `Negative prompt` for models that support it).
2. Generate 4–6 variations, pick the most natural/least "rendered."
3. Drop the raw file into `assets/media-work/`, add a row to `scripts/build-media.sh`
   (images → AVIF/WebP/JPG triplet) or encode video like `field-band` (h264, muted, warm grade).
4. Keep colours true-to-life; reject anything neon, plastic, or over-sharpened.

### Style spine (append to EVERY prompt)
> editorial food & farm photography, earthy-premium, documentary-natural. warm natural light —
> golden hour or soft diffused window light. muted warm palette: cream off-white, mustard gold
> and deep amber, forest-green accents, warm charcoal. shot on 50mm/85mm, shallow depth of field,
> gentle contrast, fine 35mm film grain, true-to-life colour. authentic rural North-India / Punjab
> context. photorealistic, high detail, calm and unhurried mood.

### Negative prompt (image models)
> text, words, watermark, logo, label, packaging copy, brand name, fingers deformed, extra limbs,
> plastic, CGI, 3d render, neon, oversaturated, HDR, harsh flash, busy background, cluttered,
> cartoon, illustration, lowres, jpeg artifacts

### Aspect ratios by slot
- Hero / dividers / full-bleed video: `16:9` or `2:1`
- Process steps & range thumbnails: `4:3`
- Recipes / heritage: `3:2`
- Section background textures: `16:9` (wide)
- Mobile hero / story video: also export `9:16`

---

## ⚠️ Do NOT AI-generate these

- **The labelled bottle / the Organikaly label / any on-pack text or claims.** AI garbles text
  and would fabricate regulated claims (FSSAI). Use the real product photo (`product-bottle.webp`).
  If you need the bottle in a lifestyle scene, composite the **real** bottle in, or generate a
  *plain unlabelled amber/glass bottle* for ambience only.
- **Faces for the testimonials.** Inventing customer faces for sample quotes = fake people on fake
  reviews. Keep the initial-avatars (current) or use real customer photos with permission.
- **Anything implying a health outcome** (a person looking "healthier," medical cues, etc.).

---

## IMAGES

### 1 · Mustard field, golden hour — establishing (Sourcing bg / hero alt)
`16:9` (also `2:1`)
> A vast yellow mustard (sarson) field in full bloom at golden hour in rural Punjab, rows of bright
> yellow flowers stretching to a soft treeline, low warm sun flaring gently through the blooms, a
> few seed pods in focus in the foreground, distant haze. + Style spine.

### 2 · Farmer among the mustard — heritage (divider / story)
`3:2`
> An elderly Indian farmer in a simple kurta and turban standing waist-deep in a blooming yellow
> mustard field at dawn, inspecting the crop with weathered hands, soft backlight, candid and
> dignified, shallow focus on his hands and the flowers. + Style spine.

### 3 · Hands with mustard seeds — process step 01 "Grown clean"
`4:3` (also `1:1`)
> Close-up of cupped weathered hands holding a small heap of golden-brown yellow mustard seeds over
> a jute sack, a few seeds spilling between the fingers, warm side light, soft rustic background. + Style spine.

### 4 · Wooden kachi-ghani cold press — process step 02 "Cold-pressed"
`4:3`
> A traditional wooden kachi ghani (cold-press oil mill) at work in a rustic Indian press house,
> dark aged wood, golden mustard oil slowly seeping from the press into a clay/steel vessel, mustard
> seed mash visible, warm low light, gentle steam-free, documentary detail. + Style spine.

### 5 · Golden oil streaming into a bottle — process step 03 "Bottled fresh"
`4:3` (or use VIDEO A)
> A thin ribbon of golden mustard oil pouring into a clear glass bottle on a wooden table, oil
> catching warm light, tiny bubbles, soft splash, plain unlabelled bottle, clean rustic backdrop. + Style spine.

### 6 · Oil in a small bowl — process step 04 "To your kitchen"
`4:3`
> A small ceramic bowl of clear golden yellow mustard oil on a worn wooden kitchen table beside a
> few whole mustard seeds and a sprig of green, warm window light, top-down-ish 45° angle, inviting
> and homely. + Style spine.

### 7 · Mustard seeds macro — Range thumbnail (Yellow Mustard Oil) → `seeds`
`4:3`
> Extreme macro of whole golden-brown and pale-yellow mustard seeds filling the frame, beautiful
> natural texture and tiny highlights, soft directional light, shallow focus falling off at the
> edges. + Style spine.

### 8 · Raw dals & pulses — Range thumbnail (Pulses & Dals) → `dals`
`4:3`
> A rustic flat-lay of several small heaps or bowls of raw uncooked Indian dals and pulses — toor,
> moong, masoor, whole urad — earthy reds, golds and greens, on a warm linen cloth, soft daylight,
> top-down. + Style spine.

### 9 · Jaggery / khand — Range thumbnail (Khand) → `khand`
`4:3`
> Golden-brown unrefined cane jaggery (gur) — a rough block and a small wooden bowl of granulated
> khand — on a rustic wooden surface, warm crumbs scattered, soft side light, artisanal and
> appetising. + Style spine.

### 10 · Indian pantry — Range thumbnail (Pantry Staples) → `pantry`
`4:3`
> A warm, moody still life of an Indian pantry: a traditional steel masala dabba with assorted
> spices, a few glass jars of grains, dried red chillies and turmeric, low warm light, heritage
> kitchen feel. + Style spine.

### 11 · Tadka sizzling — Recipes (image, or VIDEO E)
`3:2`
> Close-up of a hot tadka: cumin seeds and dried red chilli spluttering in golden mustard oil in a
> small steel kadhai/tempering pan, gentle smoke, warm stovetop light, appetising and authentic. + Style spine.

### 12 · Mango achaar in a martaban — Recipes → `achaar`
`3:2`
> A traditional ceramic martaban jar of mango achaar glistening with golden mustard oil and spices,
> a few fresh raw mango pieces and mustard seeds beside it, warm afternoon light, rustic table. + Style spine.

### 13 · Background texture — mustard flowers & seeds on linen (section bg)
`16:9` wide, airy negative space
> A soft minimal flat-lay texture: a few sprigs of yellow mustard flowers and scattered mustard
> seeds on a cream-coloured linen / handmade-paper surface, lots of empty space, very soft shadows,
> muted and calm — designed as a subtle background. + Style spine.

### 14 · Oil texture macro — divider / CTA background
`16:9` wide
> Abstract macro of golden mustard oil — slow swirling ripples and a single drop's ripple rings,
> warm amber tones with soft caustic light reflections, smooth and luxurious, plenty of room for
> text overlay. + Style spine.

### 15 · Heritage / trust — hands and the bottle (unlabelled)
`3:2`
> Weathered farmer's hands presenting a plain unlabelled amber glass bottle of golden mustard oil
> in a sunlit mustard field, warm backlight, shallow focus, dignified and honest — no text, no
> label. + Style spine.

---

## VIDEOS (5–10s seamless loops, muted, no audio needed)

For all: *slow, minimal camera motion (slow push-in or static), seamless loop, soft natural light,
shallow depth of field, no people speaking, no text/graphics.* Append the Style spine.

### A · Golden oil pour — product moment (hero divider / process 03)
`16:9` + `9:16`
> Slow-motion macro of a thin ribbon of golden mustard oil pouring and swirling into a clear glass
> vessel, light refracting through the amber oil, tiny bubbles rising, soft warm backdrop. + Style spine.

### B · Mustard field in the breeze — full-bleed divider (`field-band`)
`2:1` (crop-friendly)
> A blooming yellow mustard field swaying gently in a soft breeze at golden hour, slow drifting
> camera, sun flaring through the flowers, calm and cinematic. + Style spine.

### C · Farmer at work — divider alternative (`field-band`)
`2:1`
> An Indian farmer working among rows of yellow mustard at dawn — tending or harvesting by hand —
> unhurried movement, warm low light, documentary and authentic, mid-shot keeping the full figure. + Style spine.

### D · Seeds cascading — texture loop
`16:9`
> Slow-motion mustard seeds cascading and bouncing onto a wooden surface, warm side light catching
> each seed, shallow focus, satisfying and tactile. + Style spine.

### E · Tadka sizzling — Recipes loop
`16:9`
> Close-up slow-motion of cumin and dried red chilli spluttering in golden mustard oil in a steel
> kadhai, gentle bubbles and wisps of smoke, warm stovetop glow. + Style spine.

### F · Cold press at work — process loop
`16:9`
> A traditional wooden ghani slowly turning in a dim press house as golden oil drips steadily from
> the press, warm pools of light, slow and meditative, documentary. + Style spine.

### G · Hero ambience (optional) — bottle & light (unlabelled)
`16:9` + `9:16`  ·  *use a plain unlabelled bottle, or composite the real bottle*
> A plain amber glass bottle of golden oil on a stone surface, a slow shaft of warm light sweeping
> across it, dust motes drifting, oil glowing from within, very slow push-in. + Style spine.

---

## Where each one slots on the site

| Media | Section / file |
|---|---|
| #1, B, C | Field divider band (`field-band.mp4` / Sourcing) |
| #3–6, F, A | "From field to bottle" process steps (add a small image per step) |
| #7–10 | Range thumbnails (`seeds`, `dals`, `khand`, `pantry`) |
| #11–12, E | Recipes |
| #13, #14, D | Section backgrounds / dividers / CTA backdrop |
| #2, #15 | Heritage / trust moments |
| A, G | Hero / product moments (real bottle for anything labelled) |

## Integration
- Images: raw → `assets/media-work/<name>.jpg` → add `"<name>|<out>|<aspW>|<aspH>|<width>"` to
  `scripts/build-media.sh`, run it → `public/media/<out>.{avif,webp,jpg}`, then `<Media name="<out>" …/>`.
- Video: encode like the band — `ffmpeg … -c:v libx264 -crf 27 -an -movflags +faststart`, plus a
  poster frame (`.jpg`/`.webp`); serve via `<VideoBand>` (lazy, muted, reduced-motion fallback).
- Keep the warm grade (`eq=saturation=1.05:contrast=1.03:gamma=1.01`) so generated + real media match.
