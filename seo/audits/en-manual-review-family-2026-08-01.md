# English manual-review family audit

Date: 2026-08-01
Ledger population: 35 routes
Family decision: **in progress — do not mark accepted yet**

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

## Exact 35-route disposition

| Routes                                                                                                      | Count | Current disposition                                                                                                                                                                      |
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

## Technical verification

- Targeted ESLint for `ThailandMonthGuideEn.tsx` and `pages/thailand-in/[month].tsx`: **0 errors** (seven pre-existing warnings remain in the legacy branch of the route file).
- TypeScript: the new month owner has no reported type error. Full `tsc --noEmit --incremental false` currently stops on unrelated concurrent missing imports in `pages/drinks/[slug].tsx`; this audit did not edit that owner.
- Runtime probes for January, September, safety, eSIM and social returned HTTP 500 while that unrelated compile failure was present. No runtime pass is claimed. Re-run after the shared worktree compiles.
- `SEOHead` delegates canonical and hreflang to the global `Hreflang` owner; month schema URLs match the English trailing-slash routes.
- No shared ledger, inventory, sitemap or `tsconfig.tsbuildinfo` file was edited in this workstream.

## Final gates before family acceptance

1. Clear the unrelated compile failure and crawl all 35 routes for HTTP 200, one H1, canonical/hreflang, JSON-LD parseability, image existence and internal targets.
2. Refresh the seven volatile commercial/activity owners listed above from official sources; remove or date-gate every unverified price, schedule, fee, closure and welfare claim.
3. Consolidate `/social/` through the shared redirect/sitemap owner.
4. Give the three `/top-10/` owners explicit selection methods and update policies.
5. Re-run mobile and desktop visual/accessibility sampling for at least January, September, Grand Palace, eSIM, safety, nightlife city and each top-10 owner.
