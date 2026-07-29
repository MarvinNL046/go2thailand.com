# English Udon Thani city-food owner audit

## Intended result

- Exact owner: `/city/udon-thani/food/`.
- Premium reusable `CityFoodGuideTemplate` with a unique 1536 x 1024 WebP hero.
- One H1, one main, ten exact useful FAQ questions, exact canonical and EN/NL/x-default hreflang.
- Schema targets: Organization, Article, BreadcrumbList and FAQPage.
- Two contextual Amazon OneLink products use current-price wording and the shared sponsored disclosure.
- Broad food intent is separated from named restaurant, attraction and outer-province itinerary intent.

## Evidence captured before implementation

- DataForSEO: fourteen keyword records across three independent clusters and no reportable competitor-domain table.
- Current SERPs: 101 organic appearances, 58 PAA appearances and 35 unique exact questions across eleven UK-English queries.
- Source corpus: five complete DFS parses plus current TAT, WHO and FSA evidence.
- Exact ranking and backlink checks for food, restaurant and destination owners returned zero ranking terms and no backlink summary signal.

## Verification result

- TypeScript completed without diagnostics; scoped ESLint returned zero errors and only the project-configured data-file ignores.
- Design-system and Amazon affiliate verification passed.
- SEO cannibalisation passed with zero hard collisions and zero warnings after `udon thani food` was assigned exclusively to this owner.
- Browser QA found one H1, one main, ten FAQ details, meaningful content and no framework error overlay.
- Canonical and EN/NL/x-default hreflang are exact; Organization, Article, BreadcrumbList and FAQPage schemas parse.
- Desktop and 390 px mobile have no horizontal overflow or duplicate IDs; mobile search, bottom navigation and menu render.
- FAQ text renders at 14px / 28px in dark `rgb(41, 53, 49)` with opacity 1.
- All seventeen images loaded after vertical lazy-loading and none failed.
- Both Amazon exits use `_blank` plus `noopener noreferrer nofollow sponsored`.
- Both `/go/` routes return 307 to Amazon with `tag=go2thailand-20`, `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow`.
- Reused sitewide audit: 1,563/1,563 English routes without hard errors; the sole warning remains the unrelated existing Rawai incoming-link warning.
- Design coverage: 1,562 premium routes, one homepage hybrid, 148 exact owners, 103 Amazon routes and 213 rendered Amazon links.
