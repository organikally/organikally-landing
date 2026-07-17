#!/usr/bin/env python3
"""
Organikaly — AnswerSocrates mustard-oil corpus classifier.

Deterministic, re-runnable. Reads the raw CSV, normalises + dedupes, applies
ordered DROP rules (junk / competitor / off-topic / B2B / foreign / sensitive),
then assigns every surviving query to a content asset via first-match-wins rules.
On-topic queries that match no specific cluster fall to the uses/overview hub so
nothing relevant is orphaned. Emits JSON + markdown used by the content build and
the final coverage report.

Usage:  python3 seo-run/classify.py /path/to/AnswerSocrates-*.csv
Outputs (in seo-run/):  clusters.json  csv-dropped.md  coverage.json
"""
import csv, re, sys, json, os
from collections import defaultdict, Counter

CSV = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(
    "~/Downloads/AnswerSocrates-IN-en-mustard-oil-2026-07-17.csv")
OUT = os.path.dirname(os.path.abspath(__file__))

def norm(q):
    q = (q or "").lower().strip()
    q = q.replace("’", "'")
    q = re.sub(r"\s+", " ", q)
    return q

# ── Asset catalogue (id -> (title, content_type, funnel, slug)) ──────────────
ASSETS = {
    # Existing posts (already live) that absorb matching queries
    "E1": ("Cold-pressed vs refined mustard oil", "pillar", "TOFU", "journal/cold-pressed-vs-refined-mustard-oil"),
    "E2": ("How to spot genuinely organic pantry staples", "post", "TOFU", "journal/how-to-spot-genuinely-organic-pantry-staples"),
    "E3": ("Yellow vs black mustard oil", "comparison", "TOFU", "journal/yellow-vs-black-mustard-oil"),
    "E4": ("How to cook with mustard oil", "post", "TOFU", "journal/how-to-cook-with-mustard-oil"),
    "E6": ("Why mustard oil makes achaar keep", "post", "TOFU", "journal/why-mustard-oil-makes-achaar-keep"),
    # New assets
    "N1": ("Is mustard oil good for you? Benefits, honestly", "pillar", "TOFU", "journal/mustard-oil-benefits"),
    "N2": ("Mustard oil, your heart & cholesterol", "cluster", "TOFU", "journal/mustard-oil-heart-cholesterol"),
    "N3": ("Mustard oil for hair: a practical guide", "pillar", "TOFU", "journal/mustard-oil-for-hair"),
    "N4": ("Mustard oil for skin and face", "cluster", "TOFU", "journal/mustard-oil-for-skin"),
    "N5": ("Is mustard oil banned in the US? Erucic acid, explained", "pillar", "TOFU", "journal/is-mustard-oil-banned-in-the-us"),
    "N6": ("Mustard oil nutrition and composition", "cluster", "TOFU", "journal/mustard-oil-nutrition"),
    "N7": ("What is kachi ghani mustard oil, and how is it made", "pillar", "TOFU", "journal/what-is-kachi-ghani-mustard-oil"),
    "N8": ("Mustard oil vs other cooking oils", "comparison", "BOFU", "journal/mustard-oil-vs-other-oils"),
    "N9": ("How to use mustard oil in cooking", "cluster", "TOFU", "journal/how-to-use-mustard-oil-in-cooking"),
    "N11": ("Mustard oil for massage and pain", "cluster", "TOFU", "journal/mustard-oil-for-massage"),
    "N12": ("Mustard oil in pooja and tradition", "post", "TOFU", "journal/mustard-oil-in-pooja"),
    "N13": ("How to tell if mustard oil is pure", "pillar", "BOFU", "journal/how-to-tell-if-mustard-oil-is-pure"),
    "N14": ("How to store mustard oil and how long it keeps", "post", "TOFU", "journal/how-to-store-mustard-oil"),
    "N15": ("Mustard oil price in India: what moves it", "buying-guide", "BOFU", "journal/mustard-oil-price-india"),
    "N16": ("Best mustard oil: how to choose", "buying-guide", "BOFU", "journal/best-mustard-oil-how-to-choose"),
    "N17": ("Mustard oil uses: how Indian homes use it", "pillar", "TOFU", "journal/mustard-oil-uses"),
    "N18": ("What mustard oil is called across India", "glossary", "TOFU", "journal/mustard-oil-names-across-india"),
}

# ── Ordered DROP rules (regex on normalised query -> reason) ─────────────────
# First match wins. Applied before cluster assignment.
COMPETITOR = (r"fortune|dhara|engine|emami|patanjali|jivo|kanodia|saloni|rajdhani|"
    r"ganesh|laxmi|kwality|dalda|anveshan|tata|saffola|gemini|mahakosh|nature ?fresh|"
    r"nutrela|freedom|gagan|gokul|good ?life|gopal|gramiyaa|gulab|janmay|jyoti|kings|"
    r"\bktc\b|lal gulab|lal ?kila|lal ?qila|mashal|nakoda|natco|natureland|neeraj|netaji|"
    r"nihar|oreal|p mark|pran|queen|radhuni|raja bhoj|\brani\b|ravindra|\brcm\b|rosier|"
    r"sarfa|scooter|shalimar|\btez\b|two brothers|vatika|vedika|veer|verka|vibhor|vimal|"
    r"vishal mega|zaika|zamindar|zaza|life ok|qutub minar|zoya|aastha|agrola|amul|anupam|"
    r"ashirwad|doctor choice|double engine|double hiran|first crop|indic wisdom|\bjiva\b|"
    r"kunji|manas|sonali|yandilla|indulekha|organic india|organic tattva|tata sampann|"
    r"tattva|nutrela|zamindara|raja|nakoda|agmark|p ?mark|\bq brand\b|\br brand\b|\bv brand\b|"
    r"z strong|double filtered|double hiran|jyoti kiran|natureland organics|vedika organics|"
    r"\bdabur\b|pansari")
RETAILER = (r"amazon|flipkart|jiomart|blinkit|zepto|dmart|d-mart|costco|jewel osco|zehrs|"
    r"\basda\b|tesco|coles|no frills|walmart|vishal mega|jumbo|quality foods|quality food")
FOREIGN = r"\bpakistan\b|bangladesh|\bjapan\b|\bqatar\b|\busa\b|\buk\b|\baustralia\b|jamaica|zimbabwe|zurich|yokohama|zamboanga"
LOCAL_NO_GBP = (r"near me|nearby|near by|\bdealers?\b|\bdistributors?\b|\bsuppliers?\b|"
    r"factory|\bmill\b|plant near|shop near|kolhu near")
AGRONOMY = (r"grow mustard|grow mustard seed|growing state|when mustard is harvested|"
    r"where is mustard grown|soak mustard seed|mustard seed cost|whole mustard seed|"
    r"^mustard without oil$|does mustard have oil|do india import|export from india|"
    r"import mustard|\bharvest")
BIBLE_ENTITY = (r"mustard seed (like|faith|verse|quote|quran|quilt|ranch|restaurant|youth|"
    r"zip|market|insect|hill|zone|similar|reviews|without skin|yellow|zkteco)|"
    r"like faith|bible|\bquran\b|faith bible|mustard seed$|whole mustard seed")
OTHER_OIL_DEF = (r"what is (fish|linseed|palm|sesame|castor|canola) oil|"
    r"what is canola oil made of|cost of (castor|rosemary|used cooking|a barrel|oil per barrel)|"
    r"where can i apply castor oil|alternatives to olive oil|canola oil side effects|"
    r"^what is refined oil$|indulekha")
B2B = (r"machine|expeller|extraction|refinery|grinding|filter machine|making machine|"
    r"\bbusiness\b|distributorship|yield per|seed price|price of mustard seed|oil cake|"
    r"exporter|importing|producing countries|exporting countries|manufacturers in|"
    r"live rate|\bncdex\b|nic code|trademark|\bhsn\b|gst rate|new gst|density|viscosity|"
    r"boiling point|freezing point|reaction class|test for amines|litre to kg|weight per|"
    r"weight per liter|per acre|adulteration test|quality check machine|testing lab|lab machine")
NON_BUYER = (r"\blogo\b|drawing|\bphoto\b|quotes|spelling|website|label design|wallpaper|"
    r"bottle without label|mustard oil waste|waste of mustard oil|waste oil|"
    r"mustard oil like urine|mustard yellow oil paint|yellow beans|yellow heart|"
    r"mustard oil xzimer|x mustard live|oil mustard oil$|^mustard oil$|^is mustard oil$|"
    r"^like mustard oil$|^more mustard oil$|^good mustard oil$|dispenser|spray bottle|pouch|"
    r"empty bottle|\bcane\b|paint|classification|\bnic\b|jhanjh|jhajjar|\bjaipur\b|\bjammu\b|"
    r"kill grass|wasabi|^who is mustard$|separated from water|\bquora\b|keep oil overnight|"
    r"does it matter what oil|does better oil|mustard oil news|news today|"
    r"versus mustard oil$|^mustard oil (bottle|jar|tin|canister|label|weight|quantity|small|"
    r"small pack|seeds|colour|color|drawing|reaction|same|similar)$")
SENSITIVE = r"lubricant|trying to conceive|kill sperm|conceive"
HYPERLOCAL = (r"in punjab|in west bengal|in delhi|in bihar|in haryana|in assam|in odisha|"
    r"in rajasthan|manufacturers in|bharatpur")

DROP_RULES = [
    ("sensitive-out-of-scope", SENSITIVE),
    ("off-topic-entity", BIBLE_ENTITY),
    ("other-oil-not-mustard", OTHER_OIL_DEF),
    ("competitor-brand", COMPETITOR),
    ("retailer-navigation", RETAILER),
    ("foreign-market", FOREIGN),
    ("local-no-gbp", LOCAL_NO_GBP),
    ("agronomy-not-buyer", AGRONOMY),
    ("b2b-industrial", B2B),
    ("non-buyer-intent", NON_BUYER),
]

# ── Ordered CLUSTER rules (first match wins) ────────────────────────────────
CLUSTER_RULES = [
    ("N5",  r"banned|\bban\b|erucic|why is mustard oil bad|why mustard oil is bad|is mustard oil bad|"
            r"cause cancer|is it safe|how much.*safe|why.*not used for cooking|is mustard oil safe|"
            r"toxicity|countries where"),
    ("N13", r"adulterat|argemone|is.*pure|which is pure|pure mustard oil|quality parameter|"
            r"quality of|grade 1|grade 2|grade|agmark|how.*check|purity|first crop|original mustard oil|"
            r"real mustard oil|asli|edible mustard oil|is mustard oil edible"),
    ("N3",  r"\bhair\b|dandruff|eyebrow|scalp|low porosity|hair fall|hair growth|regrow|"
            r"grow hair|onion and methi|fenugreek|aloe vera for hair|curd for hair|castor oil for hair|"
            r"coconut oil for hair|lemon for hair|methi"),
    ("N4",  r"\bskin\b|\bface\b|moistur|sunscreen|darken|stretch mark|navel|belly button|nabhi|"
            r"fungal|complexion|turmeric for skin"),
    ("N2",  r"cholesterol|\bheart\b|fatty liver|uric acid|weight loss|weight gain|belly fat|"
            r"inflammation|acidity|keto|swelling|diabet"),
    ("N11", r"massage|\bpain\b|knee|joint|muscle|feet|garlic for|ayurveda|taseer|hot or cold|"
            r"heat or cold|is mustard oil hot|deepam|camphor benefits|ajwain benefits|kalonji"),
    ("N12", r"pooja|\bdiya\b|\blamp\b|shani|hanuman|shivling|navratri|\bfast\b|\bvrat\b|"
            r"donating|offered to|eaten in fast|saturday|tuesday"),
    ("N12b_flight", r"flight"),  # tiny travel intent -> folded into N17 later
    ("N6",  r"nutrition|calorie|omega|\bmufa\b|saturated|unsaturated|vitamin|smoke point|"
            r"glycemic|has cholesterol|have cholesterol|zero cholesterol|without cholesterol|"
            r"type of fat|linoleic|linolenic|fatty acid|nutrients|nutritional|contains|"
            r"content|what does mustard oil (have|contain)|what is in|what mustard oil contains|"
            r"ingredients|sulphur|tbhq|preservative|antifungal|allergy"),
    ("N18", r"in hindi|in tamil|in telugu|in kannada|in marathi|in bengali|in gujarati|"
            r"in malayalam|in odia|in urdu|meaning|\bname\b|sarson|sarso|kya hota|kya hai|"
            r"ka matlab|ka hindi|kise kahate|kaun sa|yani kya|kaisa hota|hindi of|ki taseer|"
            r"different name|\bspelling\b|kahate hain|means"),
    ("N8",  r"\bvs\b|versus|difference between|which is better|or .* which is better|"
            r"alternative|substitute|similar to|compare|instead of|canola|equivalent|"
            r"better than|\bghee\b|olive|coconut|sunflower|groundnut|sesame|gingelly|"
            r"rice bran|soybean|palm oil|butter|the same|same as|is .* similar|"
            r"\bor refined\b|and refined oil|mustard oil or refined|refined oil vs|refined oil$"),
    ("N9",  r"cook|deep fr|frying|\btadka\b|smoke.*before|heat mustard oil|heated before|"
            r"when to use|daily cooking|turns green|\bfoam\b|burn eyes|for cooking|for frying|"
            r"for indian cooking|for curry"),
    ("N14", r"\bstore\b|storage|expire|expiry|shelf life|refrigerat|freeze|how long.*last|"
            r"\blast\b|keep it|press date|after expiry"),
    ("N15", r"\bprice\b|\brate\b|\bcost\b|cheap|cheapest|wholesale|per kg|per litre|per liter|"
            r"tin price|today|\bgst\b|\bhsn\b|litre price|1 litre|5 litre|15 ?kg|15 litre|"
            r"half litre|small bottle|import|export from india|increase|rising|under ₹|"
            r"low price|lowest price|offers|quick delivery|jumbo|no 1 in india"),
    ("N16", r"\bbest\b|\btop\b|which is best|which brand|no 1|no\.1|recommended|which mustard oil is good|"
            r"which oil is best|which is the best|buy mustard oil|where to buy|where can i (buy|find)|"
            r"buy online|online shopping|which oil is good|good for consumption|top 10|ranking"),
    ("N7",  r"what is (mustard oil|kachi ghani|cold pressed|wood pressed)|kachi ghani|cold pressed|"
            r"wood pressed|how is mustard oil|how mustard oil is (made|prepared|extracted|refined)|"
            r"how to make mustard oil|make mustard oil|how make|how to mustard oil|how.*extracted|"
            r"how.*prepared|made of|made from|come from|does mustard have oil|"
            r"where does mustard|where is mustard oil (made|from|found)|what does mustard oil come from|"
            r"kaise banta|why.*golden|why.*pungent|how does mustard oil (smell|taste|look)|"
            r"what is cold pressed|\bkolhu\b|bail kolhu|types of mustard oil|what is mustard oil|"
            r"virgin mustard oil|unrefined|refined or not|is mustard oil cold pressed|"
            r"^black mustard oil$|^yellow mustard oil$|^mustard oil yellow$|yellow or black|"
            r"which mustard oil is better|^which is mustard oil$|refined mustard oil|without refined|"
            r"is mustard oil a seed oil|seed oil|vegetable oil|is mustard oil refined"),
    ("N12", r"\bpooja\b|\bdiya\b"),  # safety net
    ("N1",  r"benefit|good for you|good or bad|is mustard oil good|are mustard oil good|"
            r"is mustard oil healthy|are mustard oil healthy|good for health|healthy or not|"
            r"advantage|disadvantage|side effect|good for cooking|is mustard good|why.*good for health|"
            r"during pregnancy|is it good|is mustard oil good for health|about mustard oil|"
            r"eating benefits|health benefit|can i eat|can we (eat|consume)|can you drink|"
            r"can i cook with|can we cook|can you cook|is mustard oil good for cooking"),
    ("N17", r"\buses\b|used for|use of|what can i use|how to use|apply|oil pulling|ear wax|"
            r"\bear\b|\bnose\b|teeth|mosquito|as (a )?(moistur|sunscreen|preservative|lubricant|body)|"
            r"can i (apply|use|put|carry|take)|can mustard oil be (applied|used|put)|"
            r"can we use|good for|what mustard oil does|works on|for body|for massage|"
            r"can i carry|in flight|deepam|for pooja|remove ear|remove dandruff"),
]

def load():
    rows = []
    with open(CSV, encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            rows.append({k: (v or "").strip() for k, v in r.items()})
    return rows

def drop_reason(q):
    for reason, pat in DROP_RULES:
        if re.search(pat, q):
            return reason
    return None

def cluster_of(q):
    for aid, pat in CLUSTER_RULES:
        if re.search(pat, q):
            return "N17" if aid == "N12b_flight" else aid
    return "N17"  # on-topic catch-all -> uses/overview hub

def main():
    rows = load()
    # map raw rows -> outcome, and track unique normalised queries
    assign = defaultdict(list)      # asset id -> [normalised queries]
    dropped = defaultdict(list)     # reason -> [normalised queries]
    row_outcome = []                # per raw row
    seen_asset = {}                 # norm q -> asset (dedupe display)
    seen_drop = {}
    for r in rows:
        q = norm(r["question"])
        if not q:
            row_outcome.append((r, "EMPTY", None)); continue
        reason = drop_reason(q)
        if reason:
            row_outcome.append((r, "DROP", reason))
            if q not in seen_drop:
                seen_drop[q] = reason; dropped[reason].append(q)
        else:
            aid = cluster_of(q)
            row_outcome.append((r, "KEEP", aid))
            if q not in seen_asset:
                seen_asset[q] = aid; assign[aid].append(q)

    raw_total = len(rows)
    raw_keep = sum(1 for _, s, _ in row_outcome if s == "KEEP")
    raw_drop = sum(1 for _, s, _ in row_outcome if s == "DROP")
    uniq_keep = len(seen_asset)
    uniq_drop = len(seen_drop)

    # ── clusters.json ──
    clusters = {}
    for aid, meta in ASSETS.items():
        qs = sorted(assign.get(aid, []))
        clusters[aid] = {
            "title": meta[0], "content_type": meta[1], "funnel": meta[2],
            "slug": meta[3], "count": len(qs), "queries": qs,
        }
    with open(f"{OUT}/clusters.json", "w") as f:
        json.dump(clusters, f, indent=2, ensure_ascii=False)

    # ── coverage.json ──
    cov = {
        "raw_total": raw_total, "raw_keep": raw_keep, "raw_drop": raw_drop,
        "unique_keep": uniq_keep, "unique_drop": uniq_drop,
        "drop_breakdown": {k: len(v) for k, v in sorted(dropped.items(), key=lambda x: -len(x[1]))},
        "asset_counts": {aid: len(assign.get(aid, [])) for aid in ASSETS},
    }
    with open(f"{OUT}/coverage.json", "w") as f:
        json.dump(cov, f, indent=2, ensure_ascii=False)

    # ── csv-dropped.md ──
    with open(f"{OUT}/csv-dropped.md", "w") as f:
        f.write("# Dropped rows — every drop, with reason\n\n")
        f.write(f"Raw rows: **{raw_total}** · kept: **{raw_keep}** · dropped: **{raw_drop}** "
                f"(unique dropped queries: {uniq_drop}).\n\n")
        f.write("Nothing disappears silently. Each dropped query below is off the relevant "
                "mustard-oil buyer/consumer intent for a India-based D2C brand.\n\n")
        f.write("| Reason | Count | Why dropped |\n|---|---|---|\n")
        why = {
            "competitor-brand": "Navigational query for a rival brand (Fortune, Dhara, Patanjali, etc.) — we don't write competitor pages.",
            "retailer-navigation": "Marketplace/retailer lookup (Amazon, Zepto, Costco, Walmart…) — not our content to own.",
            "off-topic-entity": "'Mustard seed' as biblical/place/other entity — different topic entirely.",
            "other-oil-not-mustard": "About a different oil (fish/linseed/palm/castor) or generic barrel/oil cost.",
            "foreign-market": "Foreign market/retail (Pakistan, Bangladesh, Australia, US retail) — India D2C scope.",
            "b2b-industrial": "B2B/industrial: pressing machines, extraction, distributorship, NCDEX, yield, lab tests.",
            "non-buyer-intent": "Design/branding/misc noise (logo, drawing, spelling, empty bottle, gibberish).",
            "sensitive-out-of-scope": "Sensitive medical/fertility claim a food brand should not advise on.",
        }
        for reason, cnt in sorted(cov["drop_breakdown"].items(), key=lambda x: -x[1]):
            f.write(f"| `{reason}` | {cnt} | {why.get(reason,'')} |\n")
        f.write("\n---\n\n")
        for reason in sorted(dropped, key=lambda r: -len(dropped[r])):
            f.write(f"\n### `{reason}` ({len(dropped[reason])})\n\n")
            for q in sorted(dropped[reason]):
                f.write(f"- {q}\n")

    # console summary
    print(f"RAW {raw_total} | KEEP {raw_keep} ({100*raw_keep/raw_total:.0f}%) | DROP {raw_drop}")
    print(f"UNIQUE keep {uniq_keep} | drop {uniq_drop}")
    print("\nDROP breakdown:")
    for k, v in sorted(cov["drop_breakdown"].items(), key=lambda x: -x[1]):
        print(f"  {v:4d}  {k}")
    print("\nASSET assignment (unique queries):")
    for aid in ASSETS:
        print(f"  {aid:4s} {len(assign.get(aid,[])):4d}  {ASSETS[aid][0]}")

if __name__ == "__main__":
    main()
