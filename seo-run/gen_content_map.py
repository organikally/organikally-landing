#!/usr/bin/env python3
"""Generate content-map.md (master manifest) from clusters.json + coverage.json."""
import json, os, re
from collections import Counter
OUT = os.path.dirname(os.path.abspath(__file__))
clusters = json.load(open(f"{OUT}/clusters.json"))
cov = json.load(open(f"{OUT}/coverage.json"))

# Curated primary keyword + funnel notes per asset (editorial decisions).
PRIMARY = {
    "N1": "mustard oil benefits", "N2": "is mustard oil good for cholesterol",
    "N3": "mustard oil for hair", "N4": "mustard oil for skin",
    "N5": "is mustard oil banned in the us", "N6": "mustard oil nutrition",
    "N7": "what is kachi ghani mustard oil", "N8": "mustard oil vs refined oil",
    "N9": "how to use mustard oil for cooking", "N11": "mustard oil for massage",
    "N12": "mustard oil for pooja", "N13": "how to check mustard oil purity",
    "N14": "how to store mustard oil", "N15": "mustard oil price in india",
    "N16": "best mustard oil in india", "N17": "uses of mustard oil",
    "N18": "mustard oil in hindi",
    "E1": "cold pressed vs refined mustard oil", "E2": "genuinely organic staples",
    "E3": "yellow vs black mustard oil", "E4": "how to cook with mustard oil",
    "E6": "why mustard oil in achaar",
}
# What each asset internally links to (link graph, editorial).
LINKS = {
    "N1": ["N2","N5","N6","N16","store"], "N2": ["N1","N6","N5"],
    "N3": ["N17","N4","N16"], "N4": ["N3","N17"], "N5": ["N6","N1","N13"],
    "N6": ["N1","N2","N5"], "N7": ["E1","N13","N16","store"],
    "N8": ["E3","N16","N7","store"], "N9": ["E4","N7","N17"],
    "N11": ["N3","N17"], "N12": ["N17"], "N13": ["N7","N16","product-authentication"],
    "N14": ["N7","N9"], "N15": ["N16","N7","store"], "N16": ["N7","N13","N8","store"],
    "N17": ["N3","N4","N9","N11","N12"], "N18": ["N7","N1"],
}
NEW = [f"N{n}" for n in [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18]]

def supporting(qs, primary, k=10):
    """Pick representative supporting keywords (longer, distinct queries)."""
    pool = [q for q in qs if q != primary and 2 <= len(q.split()) <= 9]
    pool.sort(key=lambda q: (-len(q.split()), q))
    seen, out = set(), []
    for q in pool:
        sig = tuple(sorted(set(q.split())))
        if sig in seen: continue
        seen.add(sig); out.append(q)
        if len(out) >= k: break
    return out

kept_rows = cov["raw_keep"]
new_asset_rows = sum(clusters[a]["count"] for a in NEW)

lines = []
lines.append("# Content map — master manifest (source of truth)\n")
lines.append(f"**Coverage counter:** {cov['unique_keep']} unique relevant queries "
             f"({cov['raw_keep']} raw CSV rows) mapped to **{len(NEW)} new assets** "
             f"+ 5 existing posts. Dropped: {cov['unique_drop']} unique "
             f"({cov['raw_drop']} raw rows) — see `csv-dropped.md`.\n")
lines.append("Status legend: `pending` → `drafting` → `done`. Update per asset as it ships.\n")
lines.append("\n## Manifest\n")
lines.append("| id | content_type | funnel | primary_keyword | target_url_slug | #queries | status |")
lines.append("|---|---|---|---|---|---:|---|")
STATUS = {a: "pending" for a in clusters}
for a in NEW:
    c = clusters[a]
    lines.append(f"| {a} | {c['content_type']} | {c['funnel']} | {PRIMARY.get(a,'')} | "
                 f"/{c['slug']}/ | {c['count']} | {STATUS[a]} |")
lines.append("\n### Existing posts (live) — link targets, lightly augmented with FAQ blocks\n")
lines.append("| id | primary_keyword | target_url_slug |")
lines.append("|---|---|---|")
for a in ["E1","E2","E3","E4","E6"]:
    lines.append(f"| {a} | {PRIMARY.get(a,'')} | /{clusters[a]['slug']}/ |")

lines.append("\n## Per-asset briefs (primary + supporting keywords + link graph + covered queries)\n")
for a in NEW:
    c = clusters[a]
    prim = PRIMARY.get(a, "")
    sup = supporting(c["queries"], prim)
    lg = ", ".join(LINKS.get(a, []))
    lines.append(f"\n### {a} · `{c['title']}`")
    lines.append(f"- **type / funnel:** {c['content_type']} / {c['funnel']}")
    lines.append(f"- **slug:** `/{c['slug']}/`")
    lines.append(f"- **primary keyword:** {prim}")
    lines.append(f"- **supporting keywords:** {'; '.join(sup)}")
    lines.append(f"- **internal links →:** {lg}")
    lines.append(f"- **covers {c['count']} queries:**")
    lines.append("  <details><summary>show</summary>\n")
    for q in c["queries"]:
        lines.append(f"  - {q}")
    lines.append("  </details>")

open(f"{OUT}/content-map.md", "w").write("\n".join(lines) + "\n")
print(f"content-map.md written: {len(NEW)} new assets, {new_asset_rows} queries in new assets, "
      f"{cov['unique_keep']} total kept")
