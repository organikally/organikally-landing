#!/usr/bin/env python3
"""Emit seo-run/briefs.json — compact, curated briefs for the content workflow."""
import json, os
OUT = os.path.dirname(os.path.abspath(__file__))
clusters = json.load(open(f"{OUT}/clusters.json"))

COVER = {
    "N1":"oil-swirl","N2":"benefit-2","N3":"benefit-3","N4":"benefit-4","N5":"seed-macro",
    "N6":"seeds","N7":"step-pressed","N8":"compare-coldpressed","N9":"blog-cooking",
    "N11":"benefit-1","N12":"heritage-hands","N13":"proof-date","N14":"bottle-hero",
    "N15":"pour","N16":"products","N17":"tadka","N18":"shop-oil",
}
COVER_ALT = {
    "N1":"A glass of deep golden cold-pressed mustard oil beside fresh yellow mustard seeds",
    "N2":"A bottle of golden mustard oil next to a bowl of salad, on a bright kitchen counter",
    "N3":"A person massaging golden mustard oil into their scalp and hair",
    "N4":"A drop of golden mustard oil on skin, warm natural light",
    "N5":"Macro close-up of yellow mustard seeds, showing their texture and colour",
    "N6":"Yellow mustard seeds spilling from a wooden scoop beside a jar of oil",
    "N7":"A traditional wooden ghani pressing golden mustard oil from the seed",
    "N8":"Several cooking oils in glass bottles lined up for comparison, mustard oil in front",
    "N9":"Golden mustard oil heating in a steel kadhai with mustard seeds crackling",
    "N11":"Warm golden mustard oil being poured into a palm for a massage",
    "N12":"A brass diya with a mustard-oil flame during an Indian prayer ritual",
    "N13":"Hands holding a plain bottle of mustard oil up to the light to check its colour",
    "N14":"A capped bottle of mustard oil stored in a cool, dark kitchen shelf",
    "N15":"A tin and a bottle of mustard oil on a market shelf",
    "N16":"Several bottles of mustard oil on a shelf, one being chosen",
    "N17":"A kitchen shelf with mustard oil among everyday Indian pantry staples",
    "N18":"A bottle of yellow mustard oil labelled sarson ka tel",
}
LINK_LABEL = {
    "store": ("Shop Organikaly cold-pressed mustard oil", "/store/"),
    "product-authentication": ("How to authenticate your pack", "/product-authentication/"),
    "E1": ("Cold-pressed vs refined mustard oil", "/journal/cold-pressed-vs-refined-mustard-oil/"),
    "E3": ("Yellow vs black mustard oil", "/journal/yellow-vs-black-mustard-oil/"),
    "E4": ("How to cook with mustard oil", "/journal/how-to-cook-with-mustard-oil/"),
    "N1": ("Is mustard oil good for you?", "/journal/mustard-oil-benefits/"),
    "N2": ("Mustard oil, your heart & cholesterol", "/journal/mustard-oil-heart-cholesterol/"),
    "N3": ("Mustard oil for hair", "/journal/mustard-oil-for-hair/"),
    "N4": ("Mustard oil for skin and face", "/journal/mustard-oil-for-skin/"),
    "N5": ("Is mustard oil banned in the US?", "/journal/is-mustard-oil-banned-in-the-us/"),
    "N6": ("Mustard oil nutrition and composition", "/journal/mustard-oil-nutrition/"),
    "N7": ("What is kachi ghani mustard oil?", "/journal/what-is-kachi-ghani-mustard-oil/"),
    "N8": ("Mustard oil vs other cooking oils", "/journal/mustard-oil-vs-other-oils/"),
    "N9": ("How to use mustard oil in cooking", "/journal/how-to-use-mustard-oil-in-cooking/"),
    "N11": ("Mustard oil for massage and pain", "/journal/mustard-oil-for-massage/"),
    "N12": ("Mustard oil in pooja and tradition", "/journal/mustard-oil-in-pooja/"),
    "N13": ("How to tell if mustard oil is pure", "/journal/how-to-tell-if-mustard-oil-is-pure/"),
    "N16": ("Best mustard oil: how to choose", "/journal/best-mustard-oil-how-to-choose/"),
    "N17": ("Mustard oil uses", "/journal/mustard-oil-uses/"),
}
LINKS = {
    "N1":["N2","N5","N6","N16","store"], "N2":["N1","N6","N5"], "N3":["N17","N4","N16"],
    "N4":["N3","N17"], "N5":["N6","N1","N13"], "N6":["N1","N2","N5"],
    "N7":["E1","N13","N16","store"], "N8":["E3","N16","N7","store"], "N9":["E4","N7","N17"],
    "N11":["N3","N17"], "N12":["N17"], "N13":["N7","N16","product-authentication"],
    "N14":["N7","N9"], "N15":["N16","N7","store"], "N16":["N7","N13","N8","store"],
    "N17":["N3","N4","N9","N11","N12"], "N18":["N7","N1"],
}
PRIMARY = json.load(open(f"{OUT}/coverage.json"))  # not used; placeholder to keep imports honest
PRIM = {
    "N1":"mustard oil benefits","N2":"is mustard oil good for cholesterol","N3":"mustard oil for hair",
    "N4":"mustard oil for skin","N5":"is mustard oil banned in the us","N6":"mustard oil nutrition",
    "N7":"what is kachi ghani mustard oil","N8":"mustard oil vs refined oil",
    "N9":"how to use mustard oil for cooking","N11":"mustard oil for massage","N12":"mustard oil for pooja",
    "N13":"how to check mustard oil purity","N14":"how to store mustard oil","N15":"mustard oil price in india",
    "N16":"best mustard oil in india","N17":"uses of mustard oil","N18":"mustard oil in hindi",
}
NEW = [f"N{n}" for n in [15,16,8,13,5,6,7,9,3,1,2,4,11,12,14,17,18]]  # BOFU->LongTail->TOFU order

def sample(qs, n=26):
    qs = sorted(qs, key=lambda q:(len(q.split()), q))
    step = max(1, len(qs)//n)
    out = qs[::step][:n]
    # ensure the shortest (head terms) are present
    for q in qs[:6]:
        if q not in out: out.append(q)
    return sorted(set(out))

briefs = []
for a in NEW:
    c = clusters[a]
    briefs.append({
        "id": a, "slug": c["slug"], "title": c["title"], "type": c["content_type"],
        "funnel": c["funnel"], "primary": PRIM[a], "cover": COVER[a], "coverAlt": COVER_ALT[a],
        "query_count": c["count"], "sample_queries": sample(c["queries"]),
        "links": [{"label": LINK_LABEL[t][0], "href": LINK_LABEL[t][1]} for t in LINKS[a]],
    })

json.dump(briefs, open(f"{OUT}/briefs.json","w"), indent=1, ensure_ascii=False)
print(f"briefs.json: {len(briefs)} assets")
print("order:", " ".join(b["id"] for b in briefs))
