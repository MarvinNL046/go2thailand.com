# NL editorial batch 30 audit

Date: 2026-08-01

## Scope

Seven exact Dutch editorial routes received lifecycle review, a complete body replacement, typed profile and generated route-owned hero. The batch also contains current-web research and explicit owner boundaries.

No central manifest, family-completion, keyword, redirect, ledger, sitemap or Next configuration file was changed.

## Lifecycle result

| Route | Status | Indexing | Redirect recommendation |
|---|---|---|---|
| is Thai food healthy | ready | index | none |
| is Thai food spicy | archived | noindex | `/nl/food/` |
| LISA tourism ambassador | ready | index | none |
| Songkran airline discounts | archived / elapsed | noindex | `/nl/blog/songkran-festival-2026-guide/` |
| first-timer itinerary | archived | noindex | `/nl/thailand-for-first-timers/` |
| oil crisis / flight prices | archived / superseded | noindex | `/nl/blog/middle-east-conflict-thailand-flights-airfare-2026/` |
| 7-million visitor snapshot | archived / superseded | noindex | `/nl/blog/thailand-tourism-2026-middle-east-impact-visitor-numbers/` |

## Risk controls

- Nutrition: no medical advice, therapeutic ingredient claim, cuisine-wide health label, fixed calorie table or “healthiest” ranking.
- Spice: no universal dish scale, comparative danger language or guarantee that a phrase changes the recipe.
- Celebrity: no likeness in generated art, endorsement expansion, popularity metric, visitor-impact claim or implied quality certification.
- Promotion: no expired Songkran fare shown as bookable and no fixed ticket price.
- Itinerary: no second first-timer owner, fixed transfer duration, entrance fee or universal route.
- Crisis: no generalized fare percentage, fuel-availability statement or hotel-price pass-through.
- Statistics: every number has a measurement date; forecasts are separate from results and do not imply local traveler outcomes.
- Demand: no invented DataForSEO, search-volume, ranking or People Also Ask evidence.
- Affiliates: none inserted; no commercial product naturally resolves these health, archive or campaign-verification tasks.

## Verification

- Typed loader: 7/7 parsed; lifecycle/noindex invariant passed (2 ready/index, 5 archived/noindex).
- Runtime: 7/7 returned HTTP 200 with expected H1, canonical, robots behavior, JSON-LD, hreflang and hero path.
- Assets: 7/7 are 1600×900 WebP, 42–135 KB, below 450 KB, matched between frontmatter and profile and hash-unique across `public/images`.
- `tsc --noEmit --incremental false`: passed.
- `npm run design:verify`: passed (7 primitives, 34 pilot templates).
- `npm run affiliate:verify`: passed (17 used slugs, 21 registered products).
- `npm run seo:cannibalization`: passed with 0 hard collisions and 0 warnings.
- Scoped `git diff --check`: passed; new profile and documentation files have no trailing whitespace.
- Exact excluded-scope scan: passed.
- Accepted-only, redirects and ledger integration are intentionally left to the root step.
