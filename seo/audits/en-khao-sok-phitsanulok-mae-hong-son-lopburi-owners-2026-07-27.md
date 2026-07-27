# EN destination-owner production audit — 2026-07-27

Owners:

- `/city/khao-sok/`
- `/city/phitsanulok/`
- `/city/mae-hong-son/`
- `/city/lopburi/`

## Research evidence

- Four independent DataForSEO keyword clusters completed: 221 usable records in total.
- Rankings and backlink snapshots completed for 12 owner/support URLs.
- 48 purpose-selected English SERPs completed in the United Kingdom market.
- Each SERP file preserves exact organic results and returned People Also Ask questions; no replacement questions were invented where DFS returned none.
- Twenty competitor/authority pages submitted to DFS Content Parsing. Seventeen returned readable content; three blocked or returned zero body text and were not used as copy sources.
- Individual briefs document intent allocation, recurring PAA, competitor opportunity, source boundaries and design direction.

## Implementation

- Four independent English `DestinationGuideData` files added and wired through `getEnDestinationGuide`.
- Existing language-neutral image assets reused because they were already custom-produced for the matching Dutch owners; every referenced asset exists locally.
- All owners use the reusable `DestinationGuideTemplate` but receive destination-specific hero positioning, zones, editorial route, food, weather, transport, FAQ and related-guide content.
- Current-price hotel CTAs are inherited from the template. No static affiliate prices or unverified ratings were added.
- No Amazon block appears on broad destination owners; contextual Amazon OneLink remains reserved for high-fit food, recipe, cooking-class and packing owners.
- Two legacy Khao Sok support URLs currently return 404. The new owner deliberately links to healthy `/top-10/hotels/` and `/city/surat-thani/` owners until those dedicated English support pages are rebuilt.

## SEO and safety controls

- Unique title, meta description, canonical URL, coordinates, tourist types and modified date per owner.
- Server-rendered canonical, hreflang and JSON-LD confirmed on all four routes.
- FAQ answers are based only on returned DFS questions that match the owner’s intent.
- No live entry price, timetable, market schedule, flower date, animal count or guaranteed wildlife claim is frozen into copy.
- Medical, wildlife, road-safety, cave, swimming and park-access answers explicitly defer to qualified or live primary guidance where appropriate.
- Natural contextual links connect owner, attractions, weather, stay, food and adjacent-route pages without keyword-stuffed anchors.

## Verification

- `npx tsc --noEmit --incremental false`: pass.
- Targeted ESLint: zero errors.
- Local SSR: all four owners HTTP 200.
- Link check after Khao Sok correction: every rendered editorial target resolves on localhost.
- Asset check: zero missing referenced images.
- Browser QA at a mobile override: all four pages contain meaningful copy, correct H1/title, no framework overlay, no horizontal overflow and no captured console errors.
- Browser QA at desktop width on Lopburi: hero, navigation, decision card and anchor navigation render without overflow or overlay.
- Viewport override reset and browser tabs finalised after verification.
- Layered English production audit: 1,602/1,602 sitemap routes without hard errors, zero route warnings, 1,862 reused healthy non-sitemap targets and 783 local assets checked/reused. Runtime evidence: `seo/audits/runtime/en-destination-owners-khao-sok-phitsanulok-mae-hong-son-lopburi-2026-07-27.json`.
