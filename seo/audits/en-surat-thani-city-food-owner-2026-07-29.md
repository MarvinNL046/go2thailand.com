# English Surat Thani city-food owner audit — 2026-07-29

## Scope

- Route: `/city/surat-thani/food/`
- Primary owner: broad city-food, local-dish, breakfast, market, street-food, seafood and vegetarian-navigation intent
- Excluded owners: current restaurant ranking, destination overview, accommodation, transport and dish-specific recipe intent

## Research proof

- Three independent UK-English DFS clusters
- Eleven live UK-English SERPs
- 94 organic result appearances
- 58 verbatim People Also Ask appearances
- One complete 6,772-character competitor parse; three zero-content attempts recorded
- Exact food, restaurant and destination ranking/backlink checks
- Current TAT, MICHELIN, WHO and FSA verification

## Product and design proof

- Reusable `CityFoodGuideTemplate`
- Unique inspected 1536×1024 WebP hero: `surat-thani-food-river-market-table.webp`
- Town-versus-province route separation
- Four food formats, four geography-aware zones, six dish directions and one realistic day sequence
- Ten genuine PAA questions and seven disclosed sources
- One current-option Klook exit
- Two contextual Amazon OneLink products with “Check current price at Amazon”, `target="_blank"`, and `rel="noopener noreferrer nofollow sponsored"`
- No fake prices, review scores, offers or permanent availability claims

## Release-gate results

- TypeScript passed; targeted ESLint returned zero errors and the expected ignored-data-file warning only.
- Design-system, affiliate-registry and cannibalisation verification passed with zero hard findings.
- Desktop 1280×720 and mobile 375×812 rendering were inspected after incremental lazy-image loading. Both have one H1, one main landmark, ten FAQs, no horizontal overflow, no missing images and no framework error overlay.
- Canonical is exact; `en`, `nl` and `x-default` hreflang links are present; Organization, Article, BreadcrumbList and FAQPage schemas parse successfully; there are no duplicate IDs, unnamed buttons or images without alt attributes.
- The open FAQ answer renders at `rgb(41, 53, 49)`, 14px, 28px line-height and opacity 1.
- Both Amazon routes render “Check current price at Amazon”, open in a new tab and include `noopener noreferrer nofollow sponsored`. Their `/go/` endpoints return 307 with the `go2thailand-20` tag and `X-Robots-Tag: noindex, nofollow`.
- Axe exposed and prompted fixes for two genuine shared-shell issues: inactive mobile bottom-nav labels now have stronger contrast, and the push-notification banner is a named region. The remaining development-only landmark violation belongs to the injected Next.js devtool panel and is absent from production output; incomplete results are the known devtool `aria-controls` and gradient-image contrast checks.
- All nine linked internal route targets return HTTP 200.
- Layered English runtime audit: 1,563/1,563 routes without hard errors; the sole pre-existing warning remains the unrelated Rawai hotel-detail incoming-link case.
- Design coverage: 1,562 premium signatures plus one homepage hybrid, 143 exact owners, 98 Amazon routes and 203 Amazon links.
