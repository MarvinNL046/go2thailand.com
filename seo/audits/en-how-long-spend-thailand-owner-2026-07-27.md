# English trip-length owner audit — 27 July 2026

## Owner and intent

- Canonical owner: `/blog/how-long-spend-thailand/`
- Primary intent: decide how many days to spend in Thailand before choosing a detailed itinerary.
- Child owners retain concrete schedules: seven-day routes, ten-day itinerary, two-week itinerary and the broader ultimate itinerary.
- The page does not absorb visa-duration, month-by-month weather or detailed budget intent; it links those decisions to their specialist owners.

## Evidence captured

- DataForSEO ranking check: 0 ranking keywords for the existing URL.
- DataForSEO backlink summary: no page-level backlink signal returned.
- Four English keyword clusters: 37 relevant keyword records and 50 competitor-domain records.
- Ten live UK-English SERPs captured with 87 organic results and 54 genuine People Also Ask questions for the main duration question and 7-, 10- and 14-day variants.
- Three full competitor pages parsed through DataForSEO Content Parsing.
- Real People Also Ask questions are used only where the page can answer the intent directly.
- GA4 previously flagged this URL at 7% engaged sessions and 0 seconds average engagement on 14 sessions.

## Content and design changes

- Replaced the generic markdown wall with the reusable premium `TripLengthPlannerTemplate`.
- Added a unique 2:1 editorial trip-planning hero and optimised WebP derivative.
- Added the nights-to-bases rule, 5/7/10/14/21-day comparison, three route shapes, six-part transfer-cost model, travel-style adjustment and live booking sequence.
- Removed broken encoding, frozen daily budgets, fixed flight prices, unsupported universal recommendations and outdated visa-exemption shortcuts from rendered and serialized owner content.
- Added natural internal links to the concrete itinerary owners, weather and visa specialists.
- Added sponsored live-current-price CTAs for 12Go, Trip.com and Klook. Amazon was assessed but intentionally not forced because no physical product solves trip-length selection.

## Technical checks

- Article, BreadcrumbList, ItemList and FAQPage schema are emitted by the owner template.
- Canonical and en/nl/x-default hreflang remain global through the application layer.
- The English-only early return preserves the existing Dutch route unchanged.
- TypeScript without incremental cache: passed.
- Git whitespace validation: passed.
- Local owner response: HTTP 200; legacy budget, visa and mojibake patterns absent from serialized HTML.
- Canonical: one correct English owner URL. Hreflang: `en`, `nl` and `x-default`.
- Structured data: Organization, Article, BreadcrumbList, ItemList and FAQPage all parse in the rendered DOM.
- Desktop 1280 × 720: seven owner sections, cream hero copy, no horizontal overflow and clean console.
- Mobile 390 × 844: sticky search and bottom navigation present, no overflow or cards outside the viewport, all lazy images loaded and no broken image.
- Open FAQ answer renders in dark charcoal at readable contrast.
- Eight deliberately linked internal planning owners returned HTTP 200 locally.
