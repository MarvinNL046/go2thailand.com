# NL editorial batch 27 audit

Date: 2026-08-01

## Scope

Seven Dutch blog routes received a Dutch body rewrite, typed editorial profile, route-owned generated hero and explicit lifecycle decision. Central manifest, ledger, keyword, sitemap, family-completion and Next configuration files were not edited.

## Outcomes

| Route | Status | Indexing | Target owner / note |
|---|---|---|---|
| longevity retreats | ready | index | Distinct due-diligence intent; health claims constrained. |
| Mekong seven provinces | archived | noindex + redirect | Centrale ownercheck vond dezelfde route-intentie al op `/nl/itineraries/mekong-river-adventure/`; de studiecontext wordt daar geconsolideerd. |
| Michelin / Sühring | ready | index | Corrected Sorn-first fact; stars only. |
| Sophon Zaram | archived | noindex | No traveler task; no redirect target. Institutional facts retained only as archive. |
| rainy season tips | archived | noindex | Superseded by `/nl/weather/`. |
| rising costs crisis | archived | noindex | Superseded by `/nl/thailand-index/budget/`; flight issue delegated to its own route. |
| solo travel | ready | index | General solo planning; female-safety route remains separate. |

De centrale integratie heeft de Mekongroute na de batchhandoff aangescherpt van `ready` naar `archived`: het primaire keyword en de praktische routeopbouw overlapten de bestaande, eerder onderzochte Mekong-itinerary. De blogroute redirect daarom permanent naar die owner in plaats van een tweede routeplanner te indexeren.

## Risk controls

- Health: no treatment recommendation, outcome promise, detox endorsement, clinic ranking, fixed price or insurance promise.
- Politics: no claim about stability, protest likelihood, visa continuity or tourism effects.
- Weather: no regional forecast generalized nationwide and no guaranteed shower pattern.
- Crisis and costs: no fixed inflation percentage, airfare movement or universal daily budget.
- Food: no fixed menu price, current availability promise or misidentification of Thailand’s first three-star restaurant.
- Solo safety: no safest-destination claim or universal safety guarantee.
- Demand data: no fabricated DataForSEO, keyword-volume or People Also Ask claims.

## Image QA target

All seven heroes are route-owned 1600×900 WebP assets under `public/images/redesign/editorial/`. Each has distinct visual subject matter and alt text. Final file uniqueness and metadata checks are recorded by the scoped QA commands.

## Verification

- Typed loader: 7/7 profiles parsed; lifecycle/noindex invariant passed (4 ready/index, 3 archived/noindex).
- Runtime on localhost: 7/7 returned HTTP 200 with expected H1, canonical, robots behavior, JSON-LD, hreflang and hero path.
- Assets: 7/7 are 1600×900 WebP, 83–148 KB, below 450 KB, frontmatter/profile matched and hash-unique across `public/images`.
- `tsc --noEmit --incremental false`: passed.
- `npm run design:verify`: passed (7 primitives, 34 pilot templates).
- `npm run affiliate:verify`: passed (17 used slugs, 21 registered products).
- `npm run seo:cannibalization`: passed with 0 hard collisions and 0 warnings.
- Scoped `git diff --check`: passed; new JSON and audit/research files have no trailing whitespace.
- Accepted-only, redirects and completion-ledger updates are intentionally left to the root integration step; no central files were changed in this batch.
