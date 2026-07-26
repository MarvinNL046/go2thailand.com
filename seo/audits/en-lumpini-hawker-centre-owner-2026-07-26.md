# English Lumpini Hawker Centre owner audit — 26 July 2026

## Owner and intent

- Canonical owner: `/blog/bangkok-lumpini-hawker-centre-street-food-2026/`.
- Existing route retained; no redirect or publication-date reset.
- Independent English evidence: ranking and backlink snapshots, 263 support-cluster records plus the exact seed, twelve SERPs, three competitor/source parses and eleven exact PAA questions.
- English content is independently structured around Gate 5, two operating clocks, food selection, payment, park routing and setting comparison; it is not a literal Dutch translation.

## Editorial and factual controls

- Eleven exact PAA questions appear once in the interface and once in FAQ schema.
- Venue claims use dated April 2026 reporting; park hours, admission, restrictions and transport context return to the current official BMA page.
- No fixed “best vendor”, hard food price, universal payment claim or permanent stall count is published.
- QR support is separated from international-app compatibility; cash is a backup rather than a false cash-only rule.
- Park wildlife is handled as observation guidance without sensationalising or guaranteeing a sighting.

## Design and responsive QA

- Reuses three dedicated project assets created for this owner family: hero, food-choice scene and park-route banner.
- Premium editorial sequence: hero departure card, four visit plans, dotted Gate 5 route, food-choice split, payment cards, two-clock banner, comparison table, functional kit, FAQ, related routes and methodology.
- Desktop browser: `scrollWidth === clientWidth` at 1265 px.
- Mobile browser: `scrollWidth === clientWidth` at 375 px; H1 stays within a 343 px content width.
- Progressive full-page scroll loaded all eight rendered page/layout images with positive natural width.
- Eleven accessible `details`/`summary` FAQ items render; answer text is opaque, 500 weight and `rgb(41, 53, 49)`.

## Links, affiliates and schema

- All four unique internal content destinations return local HTTP 200.
- Three Amazon `/go/` routes return HTTP 307 with approved `go2thailand-20` tracking.
- Product links use `noopener noreferrer nofollow sponsored`; CTA text is `Check current price at Amazon` and the disclosure explains OneLink, changing price and availability.
- No Klook or Trip.com placement was added where the page has no direct booking task.
- Article, FoodEstablishment, FAQPage, BreadcrumbList and HowTo schema are present and parseable.
- Canonical is exact; `en`, `nl` and `x-default` hreflang all point to the matching owner routes.

## Final owner gates

- English and Dutch URLs return HTTP 200 with no internal-server error.
- TypeScript compilation passed after route wiring.
- Affiliate verification, cannibalisation, design-system verification and final diff checks are required before commit.
