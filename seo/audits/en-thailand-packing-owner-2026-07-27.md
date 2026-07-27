# English Thailand packing owner audit — 27 July 2026

## Research and ownership

- Canonical owner: `/travel-gear/`.
- Five DataForSEO clusters produced 141 raw records and 126 unique keyword strings.
- Ten current UK-English SERPs produced 77 organic results, 50 PAA records and 37 unique questions before filtering.
- Exact rankings and backlink checks for `/travel-gear/` and `/practical-info/packing-list/` returned no equity.
- Five DFS competitor/source parses plus current CDC, GOV.UK, Thai Customs, IATA and TAT controls were retained.
- `/practical-info/packing-list/` now permanently consolidates to `/travel-gear/`; the Dutch legacy route resolves directly to `/nl/travel-gear/`. Both retired routes were removed from their locale sitemap and every detected editorial link was migrated.

## Premium implementation

- The accepted packing design is now a genuinely reusable bilingual template; the existing Dutch data remains independent and the English owner receives its own DFS-led data layer.
- Decision-first hero, backpack-versus-suitcase cards, a 36-item interactive checklist, cabin-versus-checked split, three route capsules, bring/buy/leave visual, exact PAA, related-owner bridge and source method form one coherent planning sequence.
- Existing project-owned hero, cabin-bag and route-capsule visuals are reused because they were already created specifically for this owner family.
- The former English product catalogue and its remote marketplace images, frozen prices, ratings, review counts and unsupported product claims are no longer rendered.

## Affiliate and factual controls

- Amazon is limited to three task-matched OneLink routes: grounded travel adapter, modest power bank and dry bag.
- Every CTA says `Check current option`, carries `noopener noreferrer nofollow sponsored`, and is preceded by visible Amazon disclosure.
- All three `/go/` routes resolve to a registered Amazon product with the approved `go2thailand-20` tag; the sitewide affiliate verifier passes all 16 used slugs against 20 registered products.
- No fixed product price, availability, saving, rating or review count appears.
- Airline, security, medicines, customs and socket compatibility are explicitly delegated to the current operating airline or official authority. The page does not prescribe medicines or claim an adapter converts voltage.

## SEO, links and interaction

- One H1, one document main, exact self-canonical and reciprocal `en`, `nl` and `x-default` hreflang.
- BreadcrumbList, FAQPage, ItemList and WebPage page schemas match visible content; Organization remains global.
- Natural links hand off weather, etiquette, health/customs context and first-arrival shopping rather than duplicating those owners.
- The checklist exposes 36 native checkboxes, updates an `aria-live` progress count and stores nothing outside the current visit.
- Every related guide and Amazon redirect tested successfully; both locale owners return HTTP 200.

## Production gates

- Focused ESLint passed without errors.
- `tsc --noEmit --incremental false` passed.
- Desktop QA: correct title, meaningful content, 36 controls, one H1/main, no framework overlay or horizontal overflow.
- Mobile QA at 390 × 844: sticky search, fixed bottom navigation and hero actions remain readable; no document overflow.
- Progressive full-page scroll loaded all eight images without a broken or pending asset.
- Layered English audit after content-cache refresh: 1,598/1,598 sitemap routes without hard findings or warnings, 1,959 healthy non-sitemap targets reused and 793 local assets checked/reused. Runtime evidence: `seo/audits/runtime/en-thailand-packing-final-v2-2026-07-27.json`.

