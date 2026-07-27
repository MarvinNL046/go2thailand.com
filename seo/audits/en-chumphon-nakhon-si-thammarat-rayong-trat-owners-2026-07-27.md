# EN destination-owner production audit — 2026-07-27

Owners:

- `/city/chumphon/`
- `/city/nakhon-si-thammarat/`
- `/city/rayong/`
- `/city/trat/`

## Research evidence

- Four independent DataForSEO clusters contain 282 keyword records in total.
- Forty current English SERP/PAA sets cover entity, worth, duration, transport, stay area, food, weather, beaches and island handovers in the United Kingdom market.
- Exact owner ranking/backlink snapshots and twelve usable competitor or authority parses were already captured.
- Exact returned PAA questions were used only where they belong to broad destination intent; no synthetic replacement questions were added.

## Implementation and information gain

- Four independent English `DestinationGuideData` files were added and wired through the reusable premium template.
- Chumphon separates town, Thung Wua Laen, Sairee/Pak Nam and Mu Ko Chumphon, and explicitly distinguishes a returning marine trip from an onward Koh Tao stay.
- Nakhon Si Thammarat stays city-first: Wat Phra Mahathat, old town, living shadow-puppet craft and southern food precede one edited Kiriwong or waterfall extension.
- Rayong establishes city, mainland beach, Ban Phe and eastern coast value before handing Koh Samet to its specialist island owner.
- Trat gives town and Ban Nam Chiao their own purpose, then separates airport, town, pier and the distinct Koh Chang/Koh Mak/Koh Kood stays.
- Twenty-three referenced project-owned assets exist locally. The rejected legacy Chumphon city image is not used.
- Affiliate prompts remain secondary, disclosed and based on checking current price, availability or route. No static price or unverified rating was added.
- Amazon remains off these broad owners; contextual OneLink products remain reserved for genuine food, recipe, cooking-class, packing and equipment tasks.

## SEO and safety controls

- Unique title, description, canonical, coordinates, tourist types and modified date per owner.
- Canonical, hreflang and JSON-LD render server-side on all four URLs.
- Every rendered editorial link resolves with HTTP 200, including healthy specialist island handoffs.
- No fixed fare, timetable, ferry, pier, market calendar, harvest, sea condition, park access or universal safety promise is stored.
- Ferry connections explicitly name operator/pier/pickup/baggage dependencies; temple, community, wildlife, swimming, river, road and weather guidance remains qualified.

## Verification

- `npx tsc --noEmit --incremental false`: pass.
- `git diff --check`: pass apart from the repository's existing CRLF conversion warning.
- Local SSR: all four owners HTTP 200 with canonical, hreflang and JSON-LD.
- Editorial links: all targets HTTP 200. Assets: 23 unique references, zero missing.
- Mobile browser QA at 390×844: meaningful rendered content, correct owner titles, no framework overlay, no horizontal overflow and no captured console errors.
- Desktop QA on Nakhon Si Thammarat at 1280×900: long H1, hero, decision panel, current-price CTA and anchor navigation render without overflow or overlay.
- Viewport reset and browser tabs finalised.
- Layered English production audit: 1,602/1,602 sitemap routes without hard errors, zero route warnings, 1,857 healthy non-sitemap targets reused and 783 local assets checked/reused. Runtime evidence: `seo/audits/runtime/en-destination-owners-chumphon-nakhon-si-thammarat-rayong-trat-2026-07-27.json`.
