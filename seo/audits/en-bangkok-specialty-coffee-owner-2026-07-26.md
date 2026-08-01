# English Bangkok specialty-coffee owner audit — 26 July 2026

## Owner and intent

- Canonical owner: `/blog/bangkok-specialty-coffee-cafe-guide-2026/`.
- Existing URL and publication date retained.
- Independent English evidence: ranking/backlink snapshots, three DFS clusters, twelve SERPs, three competitor parses and twelve exact PAA questions.
- The English owner is independently structured around three routes, a menu decision tree, Thai-bean labels, tasting discipline and current branch checks.

## Editorial and factual controls

- Seven café anchors use official addresses and current hours where the primary source exposes them; Nana Ari is deliberately a visit-day check.
- Twelve exact English PAA questions appear once in the interface and once in FAQ schema.
- “Best”, “popular”, Thai flavour and brand questions are answered without manufacturing an objective winner.
- No Google score, review count, fixed coffee price, unsupported personal-visit claim or stale branch list is published.
- World of Coffee Bangkok 2026 is marked completed, not promoted as a future event.

## Design and responsive QA

- Reuses three dedicated project assets: coffee hero, tasting table and wide BTS route banner.
- Premium sequence: hero coffee card, three route selectors, detailed dotted stop routes, menu decoder, bean-label grid, dark home-brew bridge, route banner, practical checks, tasting log, hotel base, FAQ, related routes and source method.
- Desktop browser: `scrollWidth === clientWidth` at 1265 px.
- Mobile browser: `scrollWidth === clientWidth` at 375 px; H1 remains inside a 343 px content width.
- Progressive full-page scroll loads all eight rendered page/layout images with positive natural width.
- Twelve native `details`/`summary` FAQ items render with answer colour `rgb(41, 53, 49)`, opacity 1 and weight 500.

## Links, affiliates and schema

- All nine unique internal content destinations return local HTTP 200.
- AeroPress `/go/` route returns HTTP 307 to Amazon with approved `go2thailand-20` tracking.
- One Amazon CTA and one Trip.com CTA use `noopener noreferrer nofollow sponsored` and exact current-price wording.
- Affiliate disclosures explain commission, OneLink or changing current price and editorial independence.
- Article, ItemList, FAQPage, BreadcrumbList and HowTo schema parse; global Organization also remains present.
- Canonical is exact; `en`, `nl` and `x-default` hreflang point to matching owner routes.

## Final owner gates

- English and Dutch URLs return HTTP 200 without internal-server errors.
- TypeScript compilation passed after route and affiliate-registry wiring.
- Affiliate, cannibalisation, design-system and final diff checks are required before commit.
