# English manual-review family audit — final closure

Date: 2026-08-01
Ledger population: 35 routes
Family decision: **accepted — 35/35 routes closed**

## Changes completed

1. Replaced the old English month rendering for all twelve `/thailand-in/{month}/` routes with `ThailandMonthGuideEn`.
   - One accessible premium owner with an exact `data-month-owner` for every month.
   - Unique H1, title, canonical URL (via the global canonical owner), breadcrumb schema and month-specific Article/FAQ data.
   - Region and coast decisions replace nationwide “perfect weather”, “cheapest prices” and guaranteed-condition claims.
   - Month navigation is keyboard-accessible and horizontally scrollable on narrow screens.
   - Trip.com and Klook appear only after the route decision, use tagged placement IDs, `nofollow sponsored`, live-price wording and a visible disclosure.
   - TMD/TAT source method distinguishes climate from a forecast.
2. Corrected `/grand-palace-tickets/` against the Bureau of the Royal Household on 2026-08-01.
   - Current official foreign admission: 500 THB.
   - Current published visiting hours: 08:30–16:30; ticket sales: 08:30–15:30.
   - Restored official online ticketing as an option.
   - Removed unsupported 14:30 last-entry, 365-day guarantee, side-gate guarantee, cached tour-price bands, child/audio/rental prices and categorical “anyone in uniform is fake” wording.
   - Metadata and Article `dateModified` are evergreen/current rather than an April snapshot.

## Initial 35-route disposition before the closure pass

| Routes                                                                                                      | Count | First-pass finding                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | ----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/thailand-in/january/` through `/thailand-in/december/`                                                    |    12 | Rebuilt; source-gated owner ready for runtime recheck.                                                                                                                                   |
| `/weather/`                                                                                                 |     1 | Premium English hub exists; intent distinct from the month owners. Existing component already warns that regional patterns differ.                                                       |
| `/is-thailand-safe/`                                                                                        |     1 | Strong exact owner with live-advice boundary, schema, sources, internal links and restrained affiliate disclosure. Preserve as a live-advice gateway, not a safety score.                |
| `/best-cooking-classes-in-thailand/`                                                                        |     1 | Strong exact owner with DFS/PAA evidence, official sources, no static operator price claims and natural affiliate disclosure.                                                            |
| `/thailand-street-food/`                                                                                    |     1 | Exact English owner exists. Keep separate from cooking-class intent; audit volatile vendor/pricing snippets before final acceptance.                                                     |
| `/travel-gear/`                                                                                             |     1 | Shared packing template with English data and contextual Amazon/OneLink products. Keep product selection subordinate to trip need; verify no static price/review claims.                 |
| `/esim/`                                                                                                    |     1 | Comparison intent is valid; provider snapshots are explicitly dated and non-guaranteed. Requires a freshness refresh before final sign-off because the current check date is 2026-03-25. |
| `/grand-palace-tickets/`                                                                                    |     1 | Official price/hours correction completed; still needs rendered runtime check after the concurrent server failure is cleared.                                                            |
| `/best-beaches-in-thailand/`                                                                                |     1 | Distinct planning shortlist with official source panel; retain. Park access and visitor-management claims remain live-check items.                                                       |
| `/best-muay-thai-in-thailand/`                                                                              |     1 | Valid stadium/training intent, but fixed gym schedules/prices and UNESCO-submission wording require official-source refresh. Not accepted.                                               |
| `/best-elephant-sanctuaries-in-thailand/`                                                                   |     1 | Valid welfare-choice intent, but current operator practices, capacities, prices and population ranges require named primary evidence. Not accepted.                                      |
| `/best-diving-snorkeling-in-thailand/`                                                                      |     1 | Valid coast/activity intent, but annual park dates, fees, course prices, sunscreen rules and wildlife-distance claims require current DNP/DMCR evidence. Not accepted.                   |
| `/phi-phi-island-tour/`                                                                                     |     1 | Valid transactional intent, but cached price bands, visitor totals/caps, park fee and closure rules are volatile. Move to live checks and current DNP evidence before acceptance.        |
| `/chiang-mai-elephant-sanctuary/`                                                                           |     1 | Valid city transactional intent, but operator ethics cannot be guaranteed from brand wording. Refresh every named operator/practice and remove cached price bands before acceptance.     |
| `/best-places-to-visit-thailand/`                                                                           |     1 | Valid national inspiration intent; requires an explicit selection method and evergreen metadata rather than a generic 2026 superlative.                                                  |
| `/nightlife/`, `/nightlife/bangkok/`, `/nightlife/chiang-mai/`, `/nightlife/pattaya/`, `/nightlife/phuket/` |     5 | Hub exact owner is strong and current; city owner still renders price guidance from mutable data. Recheck each city and eliminate unsupported “most affordable/priciest” claims.         |
| `/top-10/`, `/top-10/restaurants/`, `/top-10/attractions/`                                                  |     3 | Useful directory intent only if selection criteria and freshness are explicit. Current owners need an evidence-led methodology pass; do not treat list length as quality proof.          |
| `/social/`                                                                                                  |     1 | Consolidation candidate: sample posts and fabricated engagement make the current owner unsuitable for indexing. Redirect/remove from sitemap in the shared routing pass.                 |

Total: 35.

## First-pass technical verification

- Targeted ESLint for `ThailandMonthGuideEn.tsx` and `pages/thailand-in/[month].tsx`: **0 errors** (seven pre-existing warnings remain in the legacy branch of the route file).
- TypeScript: the new month owner has no reported type error. Full `tsc --noEmit --incremental false` currently stops on unrelated concurrent missing imports in `pages/drinks/[slug].tsx`; this audit did not edit that owner.
- Runtime probes for January, September, safety, eSIM and social returned HTTP 500 while that unrelated compile failure was present. No runtime pass is claimed. Re-run after the shared worktree compiles.
- `SEOHead` delegates canonical and hreflang to the global `Hreflang` owner; month schema URLs match the English trailing-slash routes.
- No shared ledger, inventory, sitemap or `tsconfig.tsbuildinfo` file was edited in this workstream.

## Closure pass: remaining 22 routes

| Accepted owner(s) | Count | Closure evidence |
|---|---:|---|
| Street food, eSIM, weather, travel gear, beaches, cooking classes, diving/snorkelling, safety and nightlife hub | 9 | Existing exact premium owners were inspected for source method, non-guarantee language, contextual internal links and affiliate disclosure. Runtime: 200, one H1, canonical, hreflang and 3–5 JSON-LD blocks. Beaches now treats the 2022 Maya Bay announcement as history rather than proof of a current cap or fee. |
| Muay Thai, national elephant facilities, Chiang Mai elephant facilities and Phi Phi tours | 4 | Replaced English output with the `ManualDecisionGuideEn` exact owner. Each has distinct decision content, current primary/specialist sources, Article/Breadcrumb/FAQ schema, responsive cards, accessible CTAs and live-price/welfare/access gates. Runtime: 200, one H1, canonical, 2–3 hreflang links and four JSON-LD blocks. |
| Best places directory | 1 | Removed the year-based superlative metadata, added a visible method boundary and exact premium signature. Runtime: 200 with one H1, canonical, hreflang and ItemList schema. |
| Nightlife city owners: Bangkok, Chiang Mai, Pattaya, Phuket | 4 | English data is now sanitised before rendering: no cached price table, venue price, fixed closing time, “personally verified” or affordability superlative. Pattaya retains its separately researched premium owner. All four runtime routes: 200, one H1, canonical/hreflang and 3–6 JSON-LD blocks. |
| Top-10 hub, restaurants hub, attractions hub | 3 | Retained as city-guide directories, not nationwide rankings. The root gained explicit CollectionPage/ItemList schema and premium owner signature; child hubs already expose method/source context and CollectionPage/ItemList schema. Runtime: 200, one H1 and canonical/hreflang. |
| Social | 1 | Permanently consolidated to `/blog/`; removes the sample feed and fabricated engagement counters from the English indexable surface. Runtime returns 308. Shared sitemap removal is delegated to the normal sitemap regeneration and was not edited in this workstream. |

Accepted in closure pass: **22/22**. Previously accepted month and Grand Palace routes: **13/13**. Manual-review family remaining: **0**.

## Final targeted verification

- Runtime probe, 2026-08-01: 21 retained routes returned HTTP 200; `/social/` returned permanent 308.
- Every retained route rendered exactly one H1, a canonical, at least two hreflang links and JSON-LD. All 21 matched the premium design signature.
- Four new decision owners each rendered 200, one H1, four JSON-LD blocks and an explicit `data-manual-owner`.
- Targeted ESLint across all edited owners: **0 errors**; two pre-existing warnings remain in the legacy data loader of `best-places-to-visit-thailand.tsx`.
- Full `tsc --noEmit --pretty false --incremental false`: **pass** in 117 seconds. A production build remains a parent/global gate.
- No shared ledger, route inventory, sitemap or `tsconfig.tsbuildinfo` was intentionally edited by this workstream.
