# EN destination-owner production audit — 2026-07-27

Owners:

- `/city/bangkok/`
- `/city/chiang-mai/`
- `/city/chiang-rai/`
- `/city/hua-hin/`

## Research evidence

- Four independent DataForSEO keyword clusters contain 1,007 records in total.
- Forty current English SERP/PAA sets cover entity, things-to-do, duration, area, itinerary, weather and transport decisions in the United Kingdom market.
- Exact owner ranking and backlink snapshots were already captured. Chiang Mai's existing entity footprint—including `chiang mai`, `chiang mai city` and `chiang mai thailand`—was preserved in one canonical owner.
- Competitor and authority content was parsed through DataForSEO to identify information gaps, never copied as page text.
- Every FAQ is based on a returned PAA that belongs to broad destination intent; no fabricated replacement questions were introduced.

## Implementation

- Four independent English `DestinationGuideData` files were added and wired through the reusable `DestinationGuideTemplate`.
- Bangkok explains that the capital is not one compact centre and organises a first trip around Old Town/river, Chinatown, Siam, Silom/Sathorn and lower Sukhumvit.
- Chiang Mai uses a city-and-mountain method, compares Old City, Nimman, Santitham and riverside, and treats live air quality as a planning input.
- Chiang Rai separates the walkable city, contemporary-art circuits and one chosen northern-province route. White Temple, Blue Temple and Baan Dam are labelled accurately.
- Hua Hin compares the centre, central beach, Nong Kae and Khao Takiab before recommending a separate full Sam Roi Yot day.
- All owners use project-owned image assets and destination-specific art direction. No referenced asset is missing.
- Hotel and activity prompts use current-price/current-availability wording. No fixed affiliate price or unverified rating was added.
- Amazon remains off broad destination owners. Contextual OneLink products remain reserved for food, recipe, cooking-class, packing and genuine equipment pages.

## SEO, safety and link controls

- Unique titles, descriptions, canonicals, coordinates, tourist types and modified dates are present.
- Canonical, hreflang and JSON-LD render server-side on all four owner URLs.
- Every editorial internal link resolves with HTTP 200; specialist attraction, food, stay, weather, transport and comparison owners receive natural handoffs.
- No fixed schedule, fare, entrance fee, market calendar, sea condition, air-quality guarantee, app availability or universal transfer time is frozen into copy.
- Temple etiquette, animal welfare, macaques, road safety, air quality, sea conditions and national-park access receive qualified practical guidance.

## Verification

- `npx tsc --noEmit --incremental false`: pass.
- `git diff --check`: pass apart from the repository's existing CRLF conversion warning.
- Local SSR: all four owners return HTTP 200 with canonical, hreflang, JSON-LD and premium owner content.
- Editorial link check: all referenced local targets return HTTP 200.
- Asset check: 38 unique referenced images, zero missing.
- Mobile browser QA at 390×844: all four owners have the correct title/H1, meaningful rendered content, no framework overlay, no horizontal overflow and no captured console errors.
- Desktop browser QA at 1280×900 on Bangkok: premium hero, navigation, current-price CTA, decision panel and anchor navigation render without overflow or overlay.
- Browser viewport reset and all test tabs finalised.
- Layered English production audit: 1,602/1,602 sitemap routes without hard errors, zero route warnings, 1,862 healthy non-sitemap targets reused and 782 local assets checked/reused. Runtime evidence: `seo/audits/runtime/en-destination-owners-bangkok-chiang-mai-chiang-rai-hua-hin-2026-07-27.json`.
