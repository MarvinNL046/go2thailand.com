# English Surat Thani destination owner audit — 2026-07-27

## Outcome

The English Surat Thani owner is rebuilt as a premium river-city and onward-route planner. It gives the city, food and canal landscape their own value before separating airport, Phun Phin station, Don Sak, islands, Khao Sok and Chaiya into coherent decisions. The Dutch locale remains on its existing route and template.

## Research and ownership

- DFS cluster: 113 records and 50 competitor domains; `surat thani thailand` has UK volume 480 and KD 6.
- Ten current English SERP/PAA sets and three usable competitor or primary-source parses were captured.
- The exact owner returned zero ranking terms and no backlink summary signal at capture time.
- Koh Samui, Koh Tao, Koh Phangan, Khao Sok, attraction, hotel, food, weather and transport owners remain naturally linked rather than duplicated.

## Design and visual verification

- Five project-owned Surat Thani assets were visually inspected before implementation; no new asset was required for this owner.
- Premium sequence: direct-answer hero, four trip shapes, old-town split, southern-food layer, visual handover route, three next-chapter cards, Bang Bai Mai canal system, realistic itinerary, practical handover cards, exact-PAA accordion and disclosed booking planner.
- Desktop 1440 × 1000: one H1, no broken image, no framework overlay and no horizontal overflow. Mid-page and lower-page compositions retain the same editorial depth as the hero.
- Mobile 390 × 844: sticky destination search and bottom navigation render, cards stack cleanly and horizontal overflow is zero.
- Both directly served assets and Next.js-optimised old-town and food variants return HTTP 200. The browser's delayed lazy-image completion was confirmed as a dev-session loading artefact rather than a missing or invalid asset.
- The open FAQ answer renders in high-contrast charcoal text and remains visibly readable against the card background.

## SEO, schema and affiliate verification

- Metadata title: `Surat Thani Thailand Guide: Old Town, Food & Islands` (52 characters).
- Metadata description: 149 characters.
- Canonical: `https://go2-thailand.com/city/surat-thani/`.
- Hreflang: English, Dutch and x-default point to their correct owners.
- Schema types: `Organization`, `TouristDestination`, `FAQPage`, `WebPage` and `BreadcrumbList`.
- Ten verbatim researched PAA questions are visible and included in FAQ schema.
- Nine affiliate exits use `noopener noreferrer nofollow sponsored`; all price-, schedule- and availability-sensitive choices use current-check wording.
- No fixed fare, price or rating is stored.
- Amazon is deliberately absent because the broad destination owner contains no physical-product task; contextual cookware remains reserved for food, recipe and cooking-class owners.

## Technical and regression verification

- TypeScript: pass with `npx tsc --noEmit --incremental false`.
- Targeted ESLint: zero errors; 17 route-level warnings pre-date the Surat Thani component. The new component has zero warnings.
- SEO cannibalisation gate: zero hard collisions and zero warnings.
- Amazon affiliate registry gate: pass with 18 used slugs and 20 registered products.
- English route and linked Chaiya, Bang Bai Mai, Koh Samui and Khao Sok routes return HTTP 200.
- Dutch `/nl/city/surat-thani/`: Dutch owner preserved, canonical correct, no English PAA or English owner leakage and no horizontal overflow.
- English homepage: HTTP 200, one H1, no broken image and no horizontal overflow in the responsive regression check.
