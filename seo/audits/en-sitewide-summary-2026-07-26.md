# English sitewide audit summary — 2026-07-26

## Result

- Audited 1,602 English sitemap routes, 2,382 unique local link targets and 583 local image sources against `http://localhost:3000`.
- Hard result: 1,602 of 1,602 routes passed; no hard finding remains.
- The previously duplicated TDAC main landmark is fixed.
- The earlier Chiang Mai blog timeout was transient and passed the full rerun.
- Local p95 response time was 5,035 ms while the dev server handled the complete concurrent audit. This is a local stress signal, not a production Core Web Vitals measurement.
- The full machine report was generated and reviewed locally; its 37 MB route/link payload is deliberately not committed to avoid repository bloat. This summary records the actionable counts and decisions.

## Warning families

| Warning | Initial count | Action |
|---|---:|---|
| No main-content incoming link | 466 | Architecture backlog classified below; do not add artificial links merely to silence the audit |
| Possibly unnamed links | 7 routes | Fixed centrally with a hostname fallback for source links |
| Short title | 5 routes | Fixed on the affected hotel owners with descriptive location-and-fit titles |
| Short description | 1 route | Fixed on the Tam Khanun food owner |

## Incoming-link architecture

The 466 warnings are highly concentrated: 425 hotel detail owners, 16 attraction detail owners, 10 food owners, 8 best-hotel category pages, 5 city-related pages and one route each under Thailand index and social. This is not 466 unrelated copy edits.

Next actions:

1. Decide whether all 425 English hotel detail URLs deserve indexable ownership; consolidate or exclude low-value legacy PSEO instead of manufacturing hundreds of weak links.
2. Add useful detail-card routes from the relevant city, hotel and attraction hubs for the owners that remain indexable.
3. Extend the English food hub and regional cuisine paths to the ten remaining dish owners using readable contextual links.
4. Rerun the graph audit after each family decision and keep only links that help a real reader continue their task.

## Verification after warning fixes

- The five affected hotel titles now contain 47–54 rendered characters.
- The Tam Khanun meta description now contains 149 characters.
- The Ayutthaya source component renders readable hostname labels; no empty source link remains in browser DOM.
- Full TypeScript verification passes.
