# English Mae Hong Son city-food owner audit

## Result

- Exact owner: `/city/mae-hong-son/food/`.
- Premium reusable `CityFoodGuideTemplate` rendered with a unique 1536 × 1024 WebP hero.
- One H1, one main, ten FAQ details, exact canonical and EN/NL/x-default hreflang.
- Schema: Organization, Article, BreadcrumbList and FAQPage.
- Desktop and mobile have no horizontal overflow, duplicate IDs or app error overlay; mobile search and bottom navigation render.
- FAQ body is 14px / 28px, dark `rgb(41, 53, 49)` and opacity 1.
- Two Amazon links use `_blank` and `noopener noreferrer nofollow sponsored`.
- Both `/go/` routes return 307 to Amazon with `tag=go2thailand-20` and `X-Robots-Tag: noindex, nofollow`.
- Fourteen of seventeen images loaded after vertical lazy-loading; the three pending images sit in the off-screen horizontal related-guide rail and no image failed.

## Automated gates

- TypeScript completed without reported diagnostics.
- Scoped ESLint: zero errors; project-configured data ignores only.
- Design verification: passed.
- Amazon affiliate verification: passed.
- SEO cannibalisation: zero hard collisions and zero warnings.
- Reused sitewide audit: 1,563/1,563 routes without hard errors; the sole warning remains the unrelated existing Rawai hotel-detail incoming-link warning.
- Design coverage: 1,562 premium routes, one homepage hybrid, 147 exact owners, 102 Amazon routes and 211 Amazon links.

## Development-only signals

The browser console contains the known Next.js 15.5 HMR `isrManifest` development warning and its derived hot-reloader exception. The rendered page itself has content, no error overlay and correct metadata. `EditorialHero` already sends the hero image with `priority`; the development console nevertheless emitted one LCP recommendation during HMR.
