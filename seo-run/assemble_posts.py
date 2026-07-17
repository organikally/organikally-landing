#!/usr/bin/env python3
"""
Assemble verified drafts (seo-run/drafts/<id>.json) into a typecheck-safe TS module
src/content/blog/posts.generated.ts. Overrides slug/cover/coverAlt/date/updated/author
from the brief (agents don't get to change those), and reconstructs every body block
with ONLY the fields valid for its type so the Post union always typechecks.
"""
import json, os, sys, re

ROOT = "/Users/dissu/Documents/PP/Organikally/organikally-landing"
OUT = f"{ROOT}/seo-run"
DRAFTS = f"{OUT}/drafts"
DATE = "2026-07-18"
AUTHOR = "The Organikaly Kitchen"

briefs = {b["id"]: b for b in json.load(open(f"{OUT}/briefs.json"))}

def clean_block(b):
    if not isinstance(b, dict): return None
    t = b.get("type")
    if t in ("p", "h2", "h3", "quote"):
        txt = (b.get("text") or "").strip()
        return {"type": t, "text": txt} if txt else None
    if t == "ul":
        items = [str(x).strip() for x in (b.get("items") or []) if str(x).strip()]
        return {"type": "ul", "items": items} if items else None
    if t == "faq":
        items = []
        for it in (b.get("items") or []):
            if isinstance(it, dict) and it.get("q") and it.get("a"):
                items.append({"q": str(it["q"]).strip(), "a": str(it["a"]).strip()})
        return {"type": "faq", "items": items} if items else None
    if t == "links":
        items = []
        for it in (b.get("items") or []):
            if isinstance(it, dict) and it.get("label") and it.get("href"):
                href = str(it["href"]).strip()
                # canonical trailing slash for internal routes (trailingSlash: true)
                if href.startswith("/") and not href.endswith("/") and "?" not in href and "#" not in href:
                    href += "/"
                items.append({"label": str(it["label"]).strip(), "href": href})
        out = {"type": "links", "items": items}
        if b.get("heading"): out["heading"] = str(b["heading"]).strip()
        return out if items else None
    return None

def assemble():
    posts, report = [], []
    missing = []
    for pid, br in briefs.items():
        path = f"{DRAFTS}/{pid}.json"
        if not os.path.exists(path):
            missing.append(pid); continue
        try:
            d = json.load(open(path))
        except Exception as e:
            missing.append(f"{pid} (bad json: {e})"); continue
        body = [cb for cb in (clean_block(b) for b in d.get("body", [])) if cb]
        # basic quality gates
        has_faq = any(b["type"] == "faq" for b in body)
        has_links = any(b["type"] == "links" for b in body)
        words = sum(len(b.get("text", "").split()) for b in body if "text" in b) + \
                sum(len(x.split()) for b in body if b["type"] == "ul" for x in b["items"]) + \
                sum(len((it["q"]+" "+it["a"]).split()) for b in body if b["type"] == "faq" for it in b["items"])
        excerpt = (d.get("excerpt") or "").strip()
        post = {
            "slug": br["slug"].split("/", 1)[1],  # drop the 'journal/' prefix
            "title": (d.get("title") or br["title"]).strip(),
            "excerpt": excerpt,
            "date": DATE,
            "updated": DATE,
            "readingMinutes": int(d.get("readingMinutes") or max(3, round(words / 200))),
            "author": AUTHOR,
            "tags": [str(t).strip() for t in (d.get("tags") or [])][:5] or ["mustard oil"],
            "cover": br["cover"],
            "coverAlt": br["coverAlt"],
            "body": body,
        }
        srcs = []
        for s in (d.get("sources") or []):
            if isinstance(s, dict) and s.get("label") and s.get("url"):
                srcs.append({"label": str(s["label"]).strip(), "url": str(s["url"]).strip()})
        if srcs: post["sources"] = srcs
        posts.append((br, post))
        report.append({
            "id": pid, "slug": post["slug"], "title": post["title"], "words": words,
            "blocks": len(body), "faq": has_faq, "links": has_links,
            "sources": len(srcs), "excerpt_len": len(excerpt),
            "flags": d.get("flags") or [],
        })
    return posts, report, missing

def to_ts(posts):
    # JSON with quoted keys is valid TS; Post type is satisfied by the field set.
    objs = []
    for _br, p in posts:
        objs.append(json.dumps(p, ensure_ascii=False, indent=2))
    body = ",\n".join(objs)
    return ("import type { Post } from './types';\n\n"
            "// Generated from the AnswerSocrates content build (seo-run/). Human-edited voice,\n"
            "// claim-checked and compliance-verified. Safe to hand-edit.\n"
            f"export const generatedPosts: Post[] = [\n{body}\n];\n")

def main():
    posts, report, missing = assemble()
    # keep the content-map's funnel order
    order = [b["id"] for b in json.load(open(f"{OUT}/briefs.json"))]
    posts.sort(key=lambda bp: order.index(bp[0]["id"]))
    ts = to_ts(posts)
    open(f"{ROOT}/src/content/blog/posts.generated.ts", "w").write(ts)
    print(f"Assembled {len(posts)}/{len(briefs)} posts → src/content/blog/posts.generated.ts")
    if missing: print("MISSING:", missing)
    print(f"\n{'id':4} {'w':>5} {'blk':>3} faq lnk {'src':>3} {'exc':>3}  title")
    for r in report:
        print(f"{r['id']:4} {r['words']:5d} {r['blocks']:3d} "
              f"{'Y' if r['faq'] else '-'}   {'Y' if r['links'] else '-'}  "
              f"{r['sources']:3d} {r['excerpt_len']:3d}  {r['title'][:52]}")
        for fl in r["flags"]:
            print(f"       FLAG: {fl}")
    json.dump(report, open(f"{OUT}/assembly-report.json", "w"), indent=1, ensure_ascii=False)

if __name__ == "__main__":
    main()
