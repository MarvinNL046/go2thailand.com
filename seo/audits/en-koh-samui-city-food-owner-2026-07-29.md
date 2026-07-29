# English Koh Samui city-food owner audit

**Route:** `/city/koh-samui/food/`

**Date:** 2026-07-29

**Status:** complete

## Independent research

- Three UK-English DFS clusters: `koh samui food`, `koh samui restaurants`, `koh samui street food`.
- 296 raw keyword records and up to 50 competitor domains.
- Eleven live UK-English SERPs: 93 organic appearances and 57 genuine People Also Ask appearances.
- Three complete competitor parses and three zero-content captures preserved rather than inferred.
- Exact rankings and backlinks checked for food, restaurant and destination owners.
- Food and destination owners returned zero ranking terms; the restaurant owner retained three ranking terms at positions 60, 62 and 65.
- Current TAT, MICHELIN, WHO and FSA evidence checked separately from competitor copy.

## Intent and cannibalisation boundary

- Primary owner: broad Koh Samui food-guide intent.
- Included: local food, street food, market food, seafood navigation, breakfast, vegetarian navigation, Southern dishes and food zones.
- Excluded: named venue rankings and live hours; broad destination planning; accommodation; attractions; exact dish owners.
- No redirect is required because the canonical broad food URL had no ranking or backlink signal and already exists as the intended route.

## Premium implementation

- Reusable `CityFoodGuideTemplate` with a Koh Samui-specific data owner.
- Unique inspected ImageGen hero: fully cooked Southern island table with left-side headline space.
- Four meal-format decisions, four island food zones, six dish directions and one four-stop food day.
- Four practical checks, four ordering phrases and ten genuine PAA answers.
- Article, BreadcrumbList and FAQPage schema.
- Natural links to the restaurant, destination, hotel and specialist dish owners.
- One disclosed Klook current-options exit.
- Exactly two contextual Amazon OneLink products: a Thai cookbook and granite mortar, both with current-price language.
- No Amazon insertion into accommodation or unrelated island decisions.

## Verification evidence

- TypeScript: passed with `--incremental false`.
- Focused ESLint: zero errors; two expected data-file ignore warnings.
- Design-system verifier: passed for 7 primitives and 34 pilot templates.
- Affiliate verifier: passed; 16 used and 20 registered product slugs.
- Cannibalisation verifier: zero hard collisions and zero warnings.
- Desktop 1280×720 and mobile 375×812 browser QA passed with no error overlay or horizontal overflow.
- One `h1`, one `main`, ten FAQ details, dark readable open-answer text and no duplicate IDs.
- Canonical is exact; `en`, `nl` and `x-default` hreflang are present.
- Organization, Article, BreadcrumbList and FAQPage schema parse correctly.
- Hero is preloaded and not lazy-loaded; the development-only Next LCP warning is a false positive against the confirmed preload.
- Axe WCAG 2 A/AA and 2.1 A/AA scan: zero violations. Two known incomplete checks remain: Next devtools `aria-controls`, and text over image gradients whose background axe cannot determine.
- All owner-linked internal targets return HTTP 200; the first cold destination request timed out while compiling and returned 200 on immediate retry.
- Both `/go/` routes return HTTP 307, the `go2thailand-20` tag and `X-Robots-Tag: noindex, nofollow`.
- Layered English runtime audit: 1,563/1,563 routes without hard errors. The sole warning remains the unrelated Rawai hotel-detail route without an incoming main-content link.
- Layered English design coverage: 1,562 premium routes plus one homepage hybrid, 142 exact owners, 97 Amazon routes and 201 rendered Amazon links across 18 registered product slugs.
