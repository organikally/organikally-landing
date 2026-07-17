# INTERNAL-LINKING — the pillar → cluster → product graph

Every new asset ends with a `links` block. BOFU assets route to `/store/`. The graph:

```
PILLARS            →  feed / are fed by
N7  what-is/kachi-ghani  →  E1, N13, N16, /store/
N1  benefits (health)    →  N2, N5, N6, N16, /store/
N3  hair                 →  N17, N4, N16
N13 purity/authenticity  →  N7, N16, /product-authentication/
N17 uses (hub)           →  N3, N4, N9, N11, N12

BOFU               →  commercial target
N15 price      →  N16, N7, /store/
N16 best/buying →  N7, N13, N8, /store/
N8  comparison →  E3, N16, N7, /store/
N13 purity     →  /product-authentication/, /store/
```

## Per-asset outbound links (as briefed; verify block present in each shipped post)

| id | title | links to |
|---|---|---|
| N15 | Mustard oil price in India: what moves it | /journal/best-mustard-oil-how-to-choose/, /journal/what-is-kachi-ghani-mustard-oil/, /store/ |
| N16 | Best mustard oil: how to choose | /journal/what-is-kachi-ghani-mustard-oil/, /journal/how-to-tell-if-mustard-oil-is-pure/, /journal/mustard-oil-vs-other-oils/, /store/ |
| N8 | Mustard oil vs other cooking oils | /journal/yellow-vs-black-mustard-oil/, /journal/best-mustard-oil-how-to-choose/, /journal/what-is-kachi-ghani-mustard-oil/, /store/ |
| N13 | How to tell if mustard oil is pure | /journal/what-is-kachi-ghani-mustard-oil/, /journal/best-mustard-oil-how-to-choose/, /product-authentication/ |
| N5 | Is mustard oil banned in the US? Erucic acid, explained | /journal/mustard-oil-nutrition/, /journal/mustard-oil-benefits/, /journal/how-to-tell-if-mustard-oil-is-pure/ |
| N6 | Mustard oil nutrition and composition | /journal/mustard-oil-benefits/, /journal/mustard-oil-heart-cholesterol/, /journal/is-mustard-oil-banned-in-the-us/ |
| N7 | What is kachi ghani mustard oil, and how is it made | /journal/cold-pressed-vs-refined-mustard-oil/, /journal/how-to-tell-if-mustard-oil-is-pure/, /journal/best-mustard-oil-how-to-choose/, /store/ |
| N9 | How to use mustard oil in cooking | /journal/how-to-cook-with-mustard-oil/, /journal/what-is-kachi-ghani-mustard-oil/, /journal/mustard-oil-uses/ |
| N3 | Mustard oil for hair: a practical guide | /journal/mustard-oil-uses/, /journal/mustard-oil-for-skin/, /journal/best-mustard-oil-how-to-choose/ |
| N1 | Is mustard oil good for you? Benefits, honestly | /journal/mustard-oil-heart-cholesterol/, /journal/is-mustard-oil-banned-in-the-us/, /journal/mustard-oil-nutrition/, /journal/best-mustard-oil-how-to-choose/, /store/ |
| N2 | Mustard oil, your heart & cholesterol | /journal/mustard-oil-benefits/, /journal/mustard-oil-nutrition/, /journal/is-mustard-oil-banned-in-the-us/ |
| N4 | Mustard oil for skin and face | /journal/mustard-oil-for-hair/, /journal/mustard-oil-uses/ |
| N11 | Mustard oil for massage and pain | /journal/mustard-oil-for-hair/, /journal/mustard-oil-uses/ |
| N12 | Mustard oil in pooja and tradition | /journal/mustard-oil-uses/ |
| N14 | How to store mustard oil and how long it keeps | /journal/what-is-kachi-ghani-mustard-oil/, /journal/how-to-use-mustard-oil-in-cooking/ |
| N17 | Mustard oil uses: how Indian homes use it | /journal/mustard-oil-for-hair/, /journal/mustard-oil-for-skin/, /journal/how-to-use-mustard-oil-in-cooking/, /journal/mustard-oil-for-massage/, /journal/mustard-oil-in-pooja/ |
| N18 | What mustard oil is called across India | /journal/what-is-kachi-ghani-mustard-oil/, /journal/mustard-oil-benefits/ |

## Inbound to commerce
- `/store/` is linked from: N15, N16, N8, N7, N1
- `/product-authentication/` is linked from: N13

Existing posts (E1/E3/E4) are linked FROM the new pillars (N7→E1, N8→E3, N9→E4), tying the
new cluster into the live journal. The global footer already links every route site-wide.
