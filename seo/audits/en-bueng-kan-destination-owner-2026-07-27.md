# English Bueng Kan destination-owner audit

Date: 2026-07-27
Route: `/city/bueng-kan/`

## Implemented

- Independent English metadata, copy and exact-PAA answers.
- Four geography-led zone cards: town and Mekong, Phu Sing and Hin Sam Wan, Wat Phu Tok and Si Wilai, Bueng Khong Long and Naka Cave.
- All nine project-owned Bueng Kan images used with route-specific alt text.
- Three decision highlights, a north–south feature banner and a realistic 3–4-night itinerary.
- Current bridge, park and proposed-airport status presented without fixed fares or stale schedules.
- Natural internal links to attractions, hotels, food, weather, transport and Nong Khai.
- Broad destination owner intentionally contains no Amazon product cross-sell.

## SEO controls

- Canonical: `https://go2-thailand.com/city/bueng-kan/`.
- Primary cluster: `bueng kan thailand` and province/travel-guide variants.
- Ten live English PAA questions are answered in the visible FAQ and FAQ schema; the page emits six valid schema blocks in total.
- Existing city, travel-guide and hotel ranking/backlink checks returned no signal to preserve.
- Destination, hotel, attraction and food intent remain separated across specialist routes.
- No invented prices, ratings, schedules, access guarantees or operational-airport claim.

## Affiliate controls

- Destination template exposes five disclosed Klook, Trip.com and 12Go current-check exits.
- Amazon is excluded here because broad destination intent does not justify cookware.
- Food and recipe pages use the reusable food CTA, which selects a cookbook and at most two intent-matched OneLink products with `nofollow sponsored` and current-price wording.

## Verification checklist

- [x] TypeScript typecheck.
- [x] Targeted lint (no errors; destination data files are intentionally ignored by the ESLint pattern).
- [x] Desktop browser QA at 1280 × 900.
- [x] Mobile browser QA at 390 × 844.
- [x] Canonical, hreflang and six JSON-LD blocks checked in the rendered document.
- [x] Linked routes present in the local route manifest; English owner and Dutch counterpart rendered successfully.
- [x] Design-system, cannibalisation and affiliate verification gates.
