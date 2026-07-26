# English homepage owner audit — 2026-07-26

## Outcome

`/` remains the premium visual discovery owner for broad English Thailand travel intent. It now has independently researched English metadata, a cleaner schema contract, honest affiliate messaging and direct hand-offs to specialist owners.

## Research and ownership

- Protected GA4 route: 69 views, 61 active users and only 3 seconds average engagement in the supplied period.
- DFS broad cluster: `thailand travel` volume 1600, KD 15, informational intent.
- Separate guide cluster: main `thailand travel guide` variants volume 390; this intent remains assigned to `/thailand-travel-guide/`.
- Ten current English SERP/PAA captures, two DFS keyword clusters, exact owner ranking/backlink checks and three full competitor parses support the owner decision.
- DFS returned zero exact URL rankings. The domain backlink summary returned 910 live backlinks from 21 referring domains.

## Design and content changes

- Premium homepage sections and custom visual assets are preserved.
- The first editorial card now hands first-time visitors to the complete Thailand travel-guide owner.
- English duration, image-alt, newsletter and social accessibility copy are fully localised.
- Static example prices were replaced by provider-specific availability/current-price CTAs.
- Unsupported review totals, ratings and “thousands of travellers” trust claims were removed. The trustbar now communicates independent curation and transparent partner links.
- The broad homepage intentionally does not duplicate specialist FAQ content about safety, budget, visa, weather or duration.

## Metadata and schema

- Title: `Thailand Travel: Places, Things to Do & Trip Ideas`.
- Description: `Explore Thailand travel by style: compare destinations, build an itinerary, find things to do and check current hotel availability.`
- Canonical: `https://go2-thailand.com/`.
- EN, NL and x-default alternates resolve to the expected routes.
- One H1 plus global Organization and page WebSite schema.
- Removed the invalid WebSite SearchAction that pointed to a nonexistent `/search` route.

## Affiliate architecture

- Hero hotel CTA: unique `home-hero-hotels` Trip.com SubID.
- Four experience cards: city-specific Klook deep links plus distinct placement SubIDs.
- Three stay cards: distinct Trip.com placement SubIDs.
- Every commercial link uses `nofollow sponsored noopener noreferrer`.
- CTAs make the external provider and live-check action explicit; no fixed price is stored.
- Amazon is intentionally absent because the homepage has no product-specific decision context.

## Runtime and responsive QA

- Desktop DOM check: correct title, description, canonical, three hreflang entries, one H1, valid schema types and zero horizontal document overflow.
- Eight sponsored exits expose the expected provider and unique placement tracking.
- No invalid SearchAction remains in rendered HTML.
- English footer heading and Instagram label are no longer leaked from Dutch.
- Mobile at 390 × 844: premium hero, sticky destination search, fixed bottom navigation, footer and affiliate cards remain readable with zero document overflow and no broken loaded image.
- Desktop at 1265 px: glass navigation, hero search and CTA hierarchy render correctly with zero overflow and no broken loaded image.
- Lazy carousel images remain deferred until their horizontal card enters view; this is expected behaviour rather than a broken-image signal.

## Gates

- Targeted ESLint — passed.
- TypeScript `--noEmit --incremental false` — passed.
- `git diff --check` — passed before documentation was added.
