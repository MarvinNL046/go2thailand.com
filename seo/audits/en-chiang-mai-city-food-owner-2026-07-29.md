# English Chiang Mai city-food owner — 2026-07-29

## Owner decision

- Canonical owner: `https://go2-thailand.com/city/chiang-mai/food/`
- Primary intent: broad Chiang Mai food orientation and meal/area choice
- Independent owners preserved:
  - `/city/chiang-mai/top-10-restaurants/` for named restaurant/list intent; 2 ranking terms retained
  - `/blog/khao-soi-chiang-mai-guide/` for the single-dish intent; 5 ranking terms retained
- Exact city-food owner signal before rebuild: 0 ranking terms and no reportable backlink summary signal

## Independent research

- 3 UK-English DFS keyword clusters
- 22 reportable keyword records and up to 50 competitor domains
- 5 live UK-English SERPs
- 45 organic results
- 20 genuine PAA appearances
- 4 complete competitor parses
- Exact ranking and backlink checks across all three potentially overlapping owners
- Primary verification from the Tourism Authority of Thailand, TAT Newsroom and WHO

The new owner answers the broad decision without absorbing restaurant-list or Khao Soi detail. It excludes fixed menu and tour prices, permanent vendor rankings, fabricated first-hand experience, guaranteed food safety, universal dietary claims and unsupported etiquette absolutes.

## Implemented experience

- Reusable `CityFoodGuideTemplate` made city-independent through per-owner editorial copy and day-route imagery
- Registry-based English city-food wiring instead of one hard-coded Bangkok route branch
- Chiang Mai-specific hero and route visual
- 4 meal-format decisions
- 4 distinct food-area decisions
- 6 Northern dishes linking to their independent canonical owners
- Visual four-stop food day
- 4 practical food-safety, dietary, live-route and current-offer checks
- 4 bounded ordering phrases
- 10 exact useful PAA questions
- Article, BreadcrumbList and FAQPage schemas plus the site organisation schema
- 3 natural specialist handoffs

## Affiliate implementation

- Klook food-experience CTA uses placement sub-ID `en-chiang-mai-city-food-owner`
- Amazon cookbook CTA: `/go/simple-thai-food-cookbook/`
- Amazon granite-mortar CTA: `/go/thai-granite-mortar-eight-inch/`
- Both product links render with `target="_blank"` and `rel="noopener noreferrer nofollow sponsored"`
- Both redirect routes return HTTP 307 to Amazon with `tag=go2thailand-20`
- Both redirects return `X-Robots-Tag: noindex, nofollow`
- Disclosure explains commission, OneLink localisation and live seller/price/availability/delivery checks

## Verification evidence

- Route and all 8 unique internal specialist targets: HTTP 200
- Homepage after change: HTTP 200
- Desktop: 1440 × 1200, 1425px document width, no horizontal overflow
- Mobile: 375 × 812, 360px document width, no horizontal overflow
- Mobile sticky destination search and bottom navigation present
- One H1 and one main landmark
- Correct self-canonical
- English, Dutch and x-default alternates present
- 10 FAQ details and 4 rendered JSON-LD scripts
- No framework error overlay or console errors
- Accessibility smoke check: 0 missing image alt attributes, 0 unnamed buttons, 0 unnamed links and 0 duplicate IDs
- Focused ESLint: 0 warnings/errors
- TypeScript: passed with `--noEmit --incremental false`
- Design system verifier: 7 primitives and 34 templates passed
- Amazon affiliate registry verifier: 16 used and 20 registered products passed
- SEO cannibalisation: 0 hard collisions and 0 warnings
- Rendered EN audit: 1563/1563 HTTP 200, 1562 premium plus homepage hybrid, 126 exact owners, 81 Amazon routes and 168 rendered Amazon links

## React/Next review

The route stays statically generated through the existing Pages Router path. The shared template remains a pure render component without new effects, global listeners, client data waterfalls or duplicated city-specific component branches. Static data and images stay module-level, `next/image` retains responsive `sizes`, and the registry performs an O(1) owner lookup.
