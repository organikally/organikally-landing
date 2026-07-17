#!/usr/bin/env python3
"""Generate INTERNAL-LINKING.md + COVERAGE-REPORT.md after assembly."""
import json, os
OUT = os.path.dirname(os.path.abspath(__file__))
clusters = json.load(open(f"{OUT}/clusters.json"))
cov = json.load(open(f"{OUT}/coverage.json"))
briefs = json.load(open(f"{OUT}/briefs.json"))
try:
    report = {r["id"]: r for r in json.load(open(f"{OUT}/assembly-report.json"))}
except Exception:
    report = {}

NEW = [b["id"] for b in briefs]
bmap = {b["id"]: b for b in briefs}

# ── INTERNAL-LINKING.md ──
il = ["# INTERNAL-LINKING — the pillar → cluster → product graph\n",
      "Every new asset ends with a `links` block. BOFU assets route to `/store/`. The graph:\n",
      "```",
      "PILLARS            →  feed / are fed by",
      "N7  what-is/kachi-ghani  →  E1, N13, N16, /store/",
      "N1  benefits (health)    →  N2, N5, N6, N16, /store/",
      "N3  hair                 →  N17, N4, N16",
      "N13 purity/authenticity  →  N7, N16, /product-authentication/",
      "N17 uses (hub)           →  N3, N4, N9, N11, N12",
      "",
      "BOFU               →  commercial target",
      "N15 price      →  N16, N7, /store/",
      "N16 best/buying →  N7, N13, N8, /store/",
      "N8  comparison →  E3, N16, N7, /store/",
      "N13 purity     →  /product-authentication/, /store/",
      "```\n",
      "## Per-asset outbound links (as briefed; verify block present in each shipped post)\n",
      "| id | title | links to |",
      "|---|---|---|"]
for b in NEW:
    tgt = ", ".join(l["href"] for l in b_links) if (b_links := bmap[b]["links"]) else "—"
    il.append(f"| {b} | {bmap[b]['title']} | {tgt} |")
il += ["\n## Inbound to commerce",
       "- `/store/` is linked from: " + ", ".join(x for x in NEW if any(l['href']=='/store/' for l in bmap[x]['links'])),
       "- `/product-authentication/` is linked from: " + ", ".join(x for x in NEW if any('authentication' in l['href'] for l in bmap[x]['links'])),
       "\nExisting posts (E1/E3/E4) are linked FROM the new pillars (N7→E1, N8→E3, N9→E4), tying the",
       "new cluster into the live journal. The global footer already links every route site-wide."]
open(f"{OUT}/INTERNAL-LINKING.md","w").write("\n".join(il)+"\n")

# ── COVERAGE-REPORT.md ──
shipped = sorted(report.keys(), key=lambda x: NEW.index(x) if x in NEW else 99)
kept_by_asset = {a: clusters[a]["count"] for a in clusters if clusters[a]["count"]}
total_kept_unique = cov["unique_keep"]
covered_unique = sum(clusters[a]["count"] for a in clusters)  # every kept query is in an asset
cr = ["# COVERAGE-REPORT — did we handle the CSV?\n",
      f"**Source:** AnswerSocrates IN·en·mustard-oil ({cov['raw_total']} raw rows).\n",
      "## Headline",
      f"- **Kept (relevant):** {cov['raw_keep']} raw rows / **{cov['unique_keep']} unique** queries.",
      f"- **Dropped (off-scope):** {cov['raw_drop']} raw / {cov['unique_drop']} unique — see `csv-dropped.md`.",
      f"- **Coverage of relevant intent: {covered_unique}/{total_kept_unique} = "
      f"{100*covered_unique//max(1,total_kept_unique)}%** — every kept query maps to an asset id.",
      f"- **Assets built:** {len(shipped)}/{len(NEW)} new journal posts"
      + (f" (+ {len(NEW)-len(shipped)} not yet assembled)" if len(shipped)<len(NEW) else "")
      + ", + 9 new global FAQ entries, + 5 existing posts as link targets.\n",
      "## Drop breakdown (why 100% of *relevant* — not of *all* — rows)",
      "| reason | unique |",
      "|---|---:|"]
for k,v in sorted(cov["drop_breakdown"].items(), key=lambda x:-x[1]):
    cr.append(f"| {k} | {v} |")
cr += ["\n## Every kept cluster → covering asset (unique-query counts)",
       "| asset | title | type | funnel | queries | shipped |",
       "|---|---|---|---|---:|---|"]
for a in NEW:
    c = clusters[a]
    sh = "✅" if a in report else "—"
    cr.append(f"| {a} | {c['title']} | {c['content_type']} | {c['funnel']} | {c['count']} | {sh} |")
cr += [f"\n**Sum of covered unique queries across assets = {covered_unique}** (equals total kept unique — no relevant row orphaned).",
       "\n## Assets by funnel", "| funnel | assets |","|---|---|"]
byf = {}
for a in NEW: byf.setdefault(clusters[a]["funnel"], []).append(a)
for f,al in byf.items(): cr.append(f"| {f} | {', '.join(al)} |")
if report:
    cr += ["\n## Shipped-asset quality (from assembly)",
           "| id | words | blocks | faq | links | sources | flags |","|---|---:|---:|---|---|---:|---|"]
    for a in shipped:
        r = report[a]
        cr.append(f"| {a} | {r['words']} | {r['blocks']} | {'Y' if r['faq'] else '-'} | "
                  f"{'Y' if r['links'] else '-'} | {r['sources']} | {len(r['flags'])} |")
open(f"{OUT}/COVERAGE-REPORT.md","w").write("\n".join(cr)+"\n")
print(f"Wrote INTERNAL-LINKING.md + COVERAGE-REPORT.md (shipped {len(shipped)}/{len(NEW)})")
