# EN destination-owner production audit — 2026-07-27

Owners:

- `/city/ayutthaya/`
- `/city/kanchanaburi/`
- `/city/pai/`
- `/city/surat-thani/`

## Research evidence

- Four independent DataForSEO keyword clusters were already complete: 625 usable keyword records in total.
- Rankings and backlink snapshots exist for the owner and support URLs; existing owner footprints were preserved where DFS returned them.
- Forty purpose-selected English SERPs cover entity, trip-length, route, stay, transport, weather and practical decision intents in the United Kingdom market.
- Exact returned People Also Ask questions were used selectively. No replacement questions or answers were invented where DFS returned no usable result.
- Competitor and authority pages were parsed through DataForSEO and used to identify information gaps, not as copy sources.
- Individual briefs document intent ownership, query evidence, PAA boundaries, competitor gaps, design direction and monetisation limits.

## Implementation

- Four independent English `DestinationGuideData` files were added and wired through `getEnDestinationGuide`.
- Every owner uses the reusable premium `DestinationGuideTemplate`, with destination-specific hero art direction, decision cards, zones, route planning, food, stays, weather, transport, FAQ and related-guide content.
- Ayutthaya resolves a focused day trip versus an overnight heritage stay and groups temples into a manageable central cluster plus one outer loop.
- Kanchanaburi separates remembrance, railway landscape and Erawan into respectful, realistic chapters instead of compressing them into one rushed day.
- Pai makes a no-scooter itinerary a first-class option and separates town, southern valley and northern/cultural routes.
- Surat Thani distinguishes the city, airport, Phun Phin station and Don Sak, then makes the island, Khao Sok and Chaiya handovers explicit.
- Existing custom project assets were reused only where they match the owner. Every referenced local image exists.
- Current-price hotel and transport prompts are inherited from the template. No static affiliate price or unverified rating was introduced.
- Amazon remains off these broad destination owners. Contextual OneLink products stay reserved for food, recipe, cooking-class, packing and genuine equipment pages.

## SEO and safety controls

- Unique title, meta description, canonical URL, coordinates, tourist types and modified date per owner.
- Server-rendered canonical, hreflang and JSON-LD confirmed on all four routes.
- FAQ content answers only verified DFS questions that match each owner's intent.
- No live timetable, fare, entrance price, app availability, weather guarantee or universal transfer duration is frozen into copy.
- Safety-sensitive advice around temples, railway history, waterfalls, canyon ridges, scooters and water transport is deliberately qualified.
- Natural contextual links connect the owner to attraction, weather, stay, food, transport and adjacent-destination pages without repetitive exact-match anchors.

## Verification

- `npx tsc --noEmit --incremental false`: pass during implementation.
- Targeted ESLint: zero errors.
- Local SSR: all four owners return HTTP 200.
- Every rendered editorial target resolves on localhost.
- Asset check: zero missing referenced images.
- Mobile browser QA on all four owners: correct title and H1, meaningful rendered copy, no framework overlay, no horizontal overflow and no captured console errors.
- Desktop browser QA on Kanchanaburi: premium hero and navigation render without overflow or error overlay.
- Viewport override reset and browser tabs finalised after verification.
- Layered English production audit: 1,602/1,602 sitemap routes without hard errors, zero route warnings, 1,862 healthy non-sitemap targets reused and 783 local assets checked/reused. Runtime evidence: `seo/audits/runtime/en-destination-owners-ayutthaya-kanchanaburi-pai-surat-thani-2026-07-27.json`.
