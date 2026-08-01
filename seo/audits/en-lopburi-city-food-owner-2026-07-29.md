# English Lopburi city-food owner audit

## Intended result

- Exact owner: `/city/lopburi/food/`.
- Premium reusable `CityFoodGuideTemplate` with a unique 1536 x 1024 WebP hero.
- One H1, one main, ten exact useful FAQ questions, exact canonical and EN/NL/x-default hreflang.
- Schema targets: Organization, Article, BreadcrumbList and FAQPage.
- Two contextual Amazon OneLink products use current-price wording and the shared sponsored disclosure.
- Broad food intent is separated from named restaurant, destination, attraction, macaque and province-road intent.

## Evidence captured before implementation

- DataForSEO: five keyword records across three independent clusters and no reportable competitor-domain table.
- Current SERPs: 98 organic appearances, 58 PAA appearances and 36 unique exact questions across eleven UK-English queries.
- Source corpus: three complete DFS parses, three zero-content captures and current Michelin, Travelfish, TAT, university, WHO and FSA evidence.
- Exact ranking and backlink checks for food, restaurant and destination owners returned zero ranking terms and no backlink-summary signal.

## Verification result

- TypeScript completed without diagnostics; scoped ESLint returned zero errors and only the project-configured data-file ignores.
- Design-system and Amazon affiliate verification passed.
- SEO cannibalisation passed with zero hard collisions and zero warnings after `lopburi food` was assigned exclusively to this owner.
- Browser QA found one H1, one main, ten FAQ details, meaningful content and no framework error overlay or console errors.
- Canonical and EN/NL/x-default hreflang are exact; Organization, Article, BreadcrumbList and FAQPage schemas parse.
- Desktop and 375 px mobile have no horizontal overflow or duplicate IDs; mobile search, bottom navigation and menu render.
- FAQ text renders at 14px / 28px in dark `rgb(41, 53, 49)` with opacity 1.
- All seventeen images loaded after vertical lazy-loading and none failed.
- Both Amazon exits use `_blank` plus `noopener noreferrer nofollow sponsored` and current-price wording.
- Both shared `/go/` routes return 307 to Amazon with `tag=go2thailand-20`, `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow`.
- Reused sitewide audit: 1,563/1,563 English routes without hard errors; the sole warning remains the unrelated existing Rawai incoming-link warning.
- Design coverage: 1,562 premium routes, one homepage hybrid, 151 exact owners, 106 Amazon routes and 219 rendered Amazon links.
