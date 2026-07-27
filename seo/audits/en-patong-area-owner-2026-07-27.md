# English Patong area owner — 27 July 2026

## Route and locale ownership

- Owner: `https://go2-thailand.com/phuket/patong/`
- English owner now uses `PhuketAreaGuideTemplate` plus independent Patong data.
- Dutch sibling `/nl/phuket/patong/` remains on its existing Dutch implementation and returns 200.
- Canonical verified: `https://go2-thailand.com/phuket/patong/`.
- English and Dutch hreflang tags are both present.

## DataForSEO evidence

- Existing owner: no returned ranking keywords and no returned backlinks.
- `patong phuket` cluster: 255 keyword records and 50 competitor domains.
- `patong beach` cluster: 304 keyword records and 50 competitor domains.
- Relevant UK-market signals include:
  - `patong beach`: volume 9,900, KD 0.
  - `patong beach phuket`: volume 9,900, KD 0.
  - `patong phuket thailand`: volume 1,600, KD 1.
  - `patong in phuket`: volume 1,600, KD 0.
- Ten live English SERPs captured 82 organic results and 55 People Also Ask questions.
- Three competitor pages parsed through DataForSEO Content Parsing:
  - Phuket 101 Patong Beach.
  - Nerd Nomads Patong Beach Phuket.
  - Are We There Yet Kids Patong with kids.
- Excluded from the owner: Google Maps/tool intent, hotel inventory terms owned by the hotel spoke, generic weather tools, unrelated Phuket-wide intent and explicit sex-tourism queries.

## Cannibalisation map

- `/phuket/patong/`: base selection, micro-zones, beach reality, seasons and route fit.
- `/phuket/patong/hotels/`: detailed hotel selection.
- `/phuket/patong/restaurants/`: restaurant and market selection.
- `/phuket/patong/nightlife/`: Bangla Road and nightlife detail.
- `/city/phuket/attractions/`: island-wide attractions.
- The area owner introduces each spoke but does not repeat its detailed shortlist.

## Editorial corrections

- Removed unsupported fixed taxi, tuk-tuk, bar, hotel and food prices from the English owner.
- Removed unsupported opening hours, hotel counts, road-time promises, “safest” claims and first-hand language.
- Replaced a binary “good/bad Patong” verdict with conditional route fit.
- Added micro-location checks for north, centre and hillside/south contexts.
- Added time-of-day information gain: the same area behaves differently in the morning, at sunset and after dark.
- Replaced monthly weather certainty with broad Andaman planning bands plus current TMD, marine-warning and beach-flag checks.
- Safety copy is derived from current official guidance and avoids a blanket guarantee.

## Affiliate and internal-link QA

- Hotel CTA uses the existing Patong Trip.com partner URL and a placement sub ID.
- Activity CTA uses the central Klook affiliate URL and placement sub IDs.
- Commercial links use `noopener noreferrer nofollow sponsored`.
- Phuket Smart Bus is an editorial operator link and is not marked sponsored.
- Patong hotel, food and nightlife spokes return 200.
- Kata, Karon and Kamala comparison routes return 200.
- Phuket destination and accommodation routes return 200.
- Corrected the attractions link to `/city/phuket/attractions/` after QA found the obsolete `/attractions/phuket/` route returned 404.
- Amazon products were intentionally not forced into this broad destination owner.

## Schema and runtime QA

- English runtime: 200.
- Dutch runtime: 200.
- Premium-template marker: 1.
- JSON-LD: Article, BreadcrumbList, ItemList and FAQPage plus global site schema.
- Sponsored occurrences: 4.
- TypeScript: `npx tsc --noEmit --incremental false` passed.
- Desktop browser QA: 1280 × 720, no document overflow, no broken visible images.
- Mobile browser QA: 390 × 844, no unexpected wide elements outside the intentionally scrollable page navigation.
- Hero, zone cards, season stack, source area and footer were visually inspected.

## Reusable design system contribution

- Added `components/phuket/PhuketAreaGuideTemplate.tsx`.
- The template supports independent area data for:
  - hero and conditional verdict;
  - micro-zones;
  - time-of-day rhythm;
  - beach reality and official safety prompts;
  - season bands;
  - internal spoke ownership;
  - neighbour comparisons;
  - current affiliate options;
  - genuine PAA FAQ and source method.
- This is the base for Kata, Karon, Kamala, Bang Tao, Surin, Nai Harn and Rawai, but every sibling still requires its own research, copy and visual asset.

## New visual asset

- Source PNG: `public/images/redesign/patong-area-hero-v2.png`.
- Optimised WebP: `public/images/redesign/patong-area-hero-v2.webp`.
- WebP: 1920 × 960, 217,410 bytes.
- Generation mode: built-in image generation tool.
- Final prompt:

> Use case: photorealistic-natural. Asset type: premium editorial website hero for a Patong Beach, Phuket area guide. Create a cinematic, truthful overview of Patong at blue hour, showing the broad crescent of Patong Beach, warm reflections on the Andaman Sea, a few long-tail boats and swimmers near shore, and the compact resort town beginning to glow behind the palms. Communicate beach convenience and urban energy together without presenting nightlife as the whole destination. Use an elevated but believable west-coast viewpoint over Patong Bay with green headlands, tropical density, a walkable beachfront and soft evening clouds. High-end natural editorial travel photography with realistic geography and scale. Wide 2:1 landscape; strongest bay, town lights and human detail on the right two-thirds; calm darker sea and headland negative space on the left for copy; level horizon. Late golden hour moving into blue hour, warm lights against deep jade and teal. No brands, text, logo, watermark, fireworks, giant signage, exaggerated neon, duplicated people or boats, red-light imagery, impossible cliffs or fantasy architecture.

## Primary sources

- Tourism Authority of Thailand — official Phuket destination context and red-flag reminder.
- Thai Meteorological Department — current Phuket weather and seven-day forecast.
- Phuket Smart Bus — operator routes, timetable, tracking and payment information.
- UK FCDO — current Thailand safety, beach, nightlife and road guidance.
