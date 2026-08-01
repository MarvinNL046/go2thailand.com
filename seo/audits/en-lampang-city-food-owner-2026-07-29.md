# English Lampang city-food owner audit

Date: 2026-07-29

Route: `/city/lampang/food/`

Owner: `data/city-food/en/lampang.ts`

## Implemented

- Dedicated English owner registered in the reusable `CityFoodGuideTemplate` family.
- Unique 1536 × 1024 WebP hero combining the Wang River, white bridge, rooster ceramics and a plausible Northern food table.
- Four meal-system cards, four route-aware food zones, six dish directions, a realistic city food day, practical checks and useful Thai phrases.
- Ten exact DataForSEO PAA questions with bounded answers.
- Seven source notes separating current regional guidance, historic food reporting and primary safety evidence.
- Natural internal links to the restaurant, destination, accommodation, Kad Kong Ta, travel-guide and specialist dish owners.
- One current-option Klook exit and two contextual Amazon OneLink cooking products with sponsored disclosure and no frozen prices.

## Search-intent separation

- Broad city food, noodle, market-food and dish-discovery intent belongs here.
- Named restaurant, live status, opening-hour and review intent stays on `/city/lampang/top-10-restaurants/`.
- Broad destination and province-routing intent stays on `/city/lampang/`.
- Detailed market-visit intent stays on the dedicated Kad Kong Ta attraction owner.
- Complete dish intent stays on the individual food and consolidated recipe owners.

## Claims deliberately excluded

- Fixed venue or market schedules
- Permanent menus, prices or inventory
- Guaranteed food safety or freshness
- Automatic vegetarian, vegan, halal or allergen-safe status
- Universal recipes or medical/health outcomes
- Fabricated first-person visits, rankings, ratings or product reviews

## Verification

- TypeScript, scoped ESLint, design-system verification, Amazon-affiliate verification and SEO-cannibalisation checks passed. The old `lampang food` secondary keyword was removed from the destination owner, giving the new foodowner exclusive primary ownership.
- Desktop browser QA: one H1, one main landmark, ten FAQ details, 17/17 images loaded, no broken image, overlay, horizontal overflow or duplicate ID.
- Mobile browser QA at 390 × 844: sticky destination search and bottom navigation visible, 17/17 images loaded, no overlay or overflow.
- Canonical is exact; hreflang exposes English, Dutch and x-default alternates; Organization, Article, BreadcrumbList and FAQPage schemas render.
- Both Amazon links use `_blank` and `rel="noopener noreferrer nofollow sponsored"`; their `/go/` routes return 307, add `tag=go2thailand-20` and send `X-Robots-Tag: noindex, nofollow`.
- Axe found only the Next.js development-tools landmark violation, its incomplete devtools ARIA reference and indeterminate gradient/sticky-nav contrast checks. No route-owned accessibility failure was identified.
- Final English runtime audit: 1,563/1,563 routes without hard errors. The only warning remains the unrelated pre-existing missing main-content incoming link for the Selina Serenity Rawai Phuket hotel detail.
- Final design coverage: 1,562 premium signatures, one hybrid, 145 exact owners, 100 routes with 207 Amazon links.
