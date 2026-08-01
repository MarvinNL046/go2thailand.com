# English Nakhon Si Thammarat city-food owner audit

Date: 2026-07-29

Route: `/city/nakhon-si-thammarat/food/`

Owner: `data/city-food/en/nakhon-si-thammarat.ts`

## Implemented

- Dedicated English owner registered in the reusable `CityFoodGuideTemplate` family.
- Unique 1536 × 1024 WebP hero showing an old-town khanom-jeen and Southern-curry table.
- Four meal-system cards, four route-aware food zones, six specialist dish links, a realistic day plan, practical checks and useful Thai phrases.
- Ten exact DataForSEO PAA questions with bounded answers.
- Seven source notes separating current primary guidance, historic context and independent competitor evidence.
- Natural internal links to the restaurant, destination, accommodation, market-attraction, travel-guide and six dish owners.
- One current-option Klook exit and two contextual Amazon OneLink cooking products with sponsored disclosure and no frozen prices.

## Search-intent separation

- Broad city food and dish-discovery intent belongs here.
- Named restaurant, live status, opening-hour and review intent stays on `/city/nakhon-si-thammarat/top-10-restaurants/`.
- Broad destination and province-routing intent stays on `/city/nakhon-si-thammarat/`.
- Complete dish intent stays on the individual `/food/` owners.

## Claims deliberately excluded

- Fixed venue or market schedules
- Permanent menus, prices or inventory
- Guaranteed food safety or freshness
- Automatic vegetarian, vegan, halal or allergen-safe status
- Universal recipes or medical/health outcomes
- Fabricated first-person visits, rankings, ratings or product reviews

## Verification

- TypeScript, scoped ESLint, design-system verification, Amazon-affiliate verification and SEO-cannibalisation checks passed. ESLint reported only the repository's expected ignored-data warnings and no errors.
- Desktop browser QA: one H1, one main landmark, ten FAQ details, 17/17 images loaded, no broken image, overlay, horizontal overflow or duplicate ID.
- Mobile browser QA at 390 × 844: sticky destination search and bottom navigation visible, 17/17 images loaded, no overlay or overflow.
- Canonical is exact; hreflang exposes English, Dutch and x-default alternates; Organization, Article, BreadcrumbList and FAQPage schemas render.
- Both Amazon links use `_blank` and `rel="noopener noreferrer nofollow sponsored"`; their `/go/` routes return 307, add `tag=go2thailand-20` and send `X-Robots-Tag: noindex, nofollow`.
- Axe found only the Next.js development-tools landmark violation, its incomplete devtools ARIA reference and indeterminate gradient/sticky-nav contrast checks. No route-owned accessibility failure was identified.
- Final English runtime audit: 1,563/1,563 routes without hard errors. The only warning remains the unrelated pre-existing missing main-content incoming link for the Selina Serenity Rawai Phuket hotel detail.
- Final design coverage: 1,562 premium signatures, one hybrid, 144 exact owners, 99 routes with 205 Amazon links.
