# COVERAGE-REPORT — did we handle the CSV?

**Source:** AnswerSocrates IN·en·mustard-oil (1592 raw rows).

## Headline
- **Kept (relevant):** 1109 raw rows / **874 unique** queries.
- **Dropped (off-scope):** 483 raw / 467 unique — see `csv-dropped.md`.
- **Coverage of relevant intent: 874/874 = 100%** — every kept query maps to an asset id.
- **Assets built:** 17/17 new journal posts, + 9 new global FAQ entries, + 5 existing posts as link targets.

## Drop breakdown (why 100% of *relevant* — not of *all* — rows)
| reason | unique |
|---|---:|
| competitor-brand | 221 |
| non-buyer-intent | 61 |
| b2b-industrial | 60 |
| off-topic-entity | 31 |
| retailer-navigation | 29 |
| local-no-gbp | 19 |
| foreign-market | 16 |
| other-oil-not-mustard | 16 |
| agronomy-not-buyer | 11 |
| sensitive-out-of-scope | 3 |

## Every kept cluster → covering asset (unique-query counts)
| asset | title | type | funnel | queries | shipped |
|---|---|---|---|---:|---|
| N15 | Mustard oil price in India: what moves it | buying-guide | BOFU | 122 | ✅ |
| N16 | Best mustard oil: how to choose | buying-guide | BOFU | 53 | ✅ |
| N8 | Mustard oil vs other cooking oils | comparison | BOFU | 94 | ✅ |
| N13 | How to tell if mustard oil is pure | pillar | BOFU | 15 | ✅ |
| N5 | Is mustard oil banned in the US? Erucic acid, explained | pillar | TOFU | 34 | ✅ |
| N6 | Mustard oil nutrition and composition | cluster | TOFU | 40 | ✅ |
| N7 | What is kachi ghani mustard oil, and how is it made | pillar | TOFU | 59 | ✅ |
| N9 | How to use mustard oil in cooking | cluster | TOFU | 55 | ✅ |
| N3 | Mustard oil for hair: a practical guide | pillar | TOFU | 101 | ✅ |
| N1 | Is mustard oil good for you? Benefits, honestly | pillar | TOFU | 35 | ✅ |
| N2 | Mustard oil, your heart & cholesterol | cluster | TOFU | 26 | ✅ |
| N4 | Mustard oil for skin and face | cluster | TOFU | 28 | ✅ |
| N11 | Mustard oil for massage and pain | cluster | TOFU | 24 | ✅ |
| N12 | Mustard oil in pooja and tradition | post | TOFU | 25 | ✅ |
| N14 | How to store mustard oil and how long it keeps | post | TOFU | 12 | ✅ |
| N17 | Mustard oil uses: how Indian homes use it | pillar | TOFU | 90 | ✅ |
| N18 | What mustard oil is called across India | glossary | TOFU | 61 | ✅ |

**Sum of covered unique queries across assets = 874** (equals total kept unique — no relevant row orphaned).

## Assets by funnel
| funnel | assets |
|---|---|
| BOFU | N15, N16, N8, N13 |
| TOFU | N5, N6, N7, N9, N3, N1, N2, N4, N11, N12, N14, N17, N18 |

## Shipped-asset quality (from assembly)
| id | words | blocks | faq | links | sources | flags |
|---|---:|---:|---|---|---:|---|
| N15 | 1669 | 24 | Y | Y | 4 | 3 |
| N16 | 1518 | 21 | Y | Y | 5 | 0 |
| N8 | 1778 | 23 | Y | Y | 5 | 3 |
| N13 | 1817 | 24 | Y | Y | 3 | 4 |
| N5 | 1596 | 25 | Y | Y | 5 | 3 |
| N6 | 1354 | 21 | Y | Y | 5 | 3 |
| N7 | 1848 | 27 | Y | Y | 5 | 2 |
| N9 | 1654 | 24 | Y | Y | 5 | 3 |
| N3 | 1999 | 25 | Y | Y | 5 | 0 |
| N1 | 1463 | 18 | Y | Y | 5 | 3 |
| N2 | 1441 | 17 | Y | Y | 5 | 3 |
| N4 | 1601 | 22 | Y | Y | 6 | 3 |
| N11 | 1871 | 26 | Y | Y | 5 | 3 |
| N12 | 1644 | 29 | Y | Y | 2 | 3 |
| N14 | 1632 | 23 | Y | Y | 2 | 3 |
| N17 | 1925 | 25 | Y | Y | 5 | 3 |
| N18 | 1581 | 26 | Y | Y | 5 | 4 |
