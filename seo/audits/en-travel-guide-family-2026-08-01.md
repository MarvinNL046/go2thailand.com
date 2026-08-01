# English travel-guide family audit — 2026-08-01

## Result

- Audited: **74 / 74 routes**
- Accepted in this pass: **74 / 74 routes**
- Still unresolved: **0 / 74 routes**
- Shared ledger, inventory and sitemaps: **not edited**
- Commit: **not created**

## Accepted routes

### City travel-guide owners — 40 / 40

All routes under `/guides/travel-guide/[city]/` now share `CityTravelGuideEn`.

Acceptance evidence:

- premium reusable hero, decision map, itinerary, transport, food, budget, booking and related-owner sections;
- Article and Breadcrumb structured data;
- missing city fields fail closed instead of inventing facts;
- static budget bands are not rendered;
- fares, schedules, access, weather, availability and total prices are explicit live checks;
- natural links use the English owner normalizer;
- Klook, Trip.com and 12Go appear only with a registered city affiliate set and use labelled `nofollow sponsored` links.

### `/travel-guides/*` owners — 22 / 24

Accepted:

- all 21 routes resolved by `pages/travel-guides/[slug].tsx`;
- `/travel-guides/sim-card-thailand/` through its existing dedicated connectivity owner.

The 15 generic dynamic routes now use `TravelGuideEditorialEn`; six existing dedicated English owners remain in place (7-Eleven, dangerous animals, VPN, solo female travel, Thai cuisine and SIM). The generic owner deliberately omits unsupported legacy body copy, tables, calendars and FAQs, while preserving search-intent topic headings and primary-source verification paths.

## Static and top-level owners — 12 / 12

These routes now use `StaticTravelGuideOwnerEn` with route-specific titles, search intent, checks, internal links and source subsets:

1. `/things-to-do-in-thailand/`
2. `/travel-guides/`
3. `/thailand-index/`
4. `/thailand-index/budget/`
5. `/thailand-index/best-time/`
6. `/thailand-index/transport/`
7. `/thailand-index/digital-nomad/`
8. `/thailand-travel-guide/`
9. `/thailand-for-first-timers/`
10. `/thailand-itinerary/`
11. `/travel-guides/thailand-weather/`
12. `/travel-guides/scooter-rental-thailand/`

Closure evidence:

- all twelve return the premium static owner for English while preserving their Dutch render;
- all twelve expose Article schema, current-verification boundaries and natural next-owner links;
- legacy volatile copy is not rendered as English article content;
- only `/things-to-do-in-thailand/` includes an affiliate comparison CTA, labelled as sponsored and placed after the decision framework;
- all twelve returned HTTP 200 locally and exposed `data-premium-template="static-travel-guide-owner-en"`.

## Files changed in this pass

- `components/travel/CityTravelGuideEn.tsx`
- `components/travel/TravelGuideEditorialEn.tsx`
- `components/travel/StaticTravelGuideOwnerEn.tsx`
- `pages/guides/travel-guide/[slug].tsx`
- `pages/travel-guides/[slug].tsx`
- `pages/travel-guides/sim-card-thailand.tsx`
- the twelve static page entry points enumerated above
- `seo/research/en/2026-08-01-travel-guide-family-primary-source-gate.md`
- `seo/audits/en-travel-guide-family-2026-08-01.md`

## Verification

- `npx tsc --noEmit --pretty false --incremental false` — passed.
- Targeted ESLint of the new owners and hook-sensitive index entry points — passed with zero errors (one pre-existing unused-type warning).
- Local runtime sweep — 74/74 routes returned HTTP 200 and exposed a premium owner marker.
- Route count was read from `seo/audits/goal-completion-ledger.json` without modifying it: 74.
- Scoped diff checking and affiliate verification are recorded at hand-off.
