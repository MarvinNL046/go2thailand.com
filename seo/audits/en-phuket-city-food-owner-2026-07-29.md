# English Phuket city-food owner - 2026-07-29

## Owner decision

- Canonical owner: `https://go2-thailand.com/city/phuket/food/`
- Primary intent: broad Phuket food orientation, meal format, area choice and local dish discovery
- Independent owners preserved:
  - `/city/phuket/top-10-restaurants/` for named restaurant and commercial list intent; 5 ranking terms retained
  - `/phuket/old-town/night-market/` for market schedule, route and vendor-navigation intent; 5 ranking terms retained
- Exact city-food owner signal before rebuild: 0 ranking terms and no reportable backlink summary signal

## Independent research

- 3 UK-English DFS keyword clusters
- 35 reportable keyword records
- 5 live UK-English SERPs
- 43 organic results
- 27 genuine PAA appearances
- 3 complete competitor parses plus 1 shallow capture
- Exact ranking and backlink checks across all three potentially overlapping owners
- Primary verification from UNESCO, the Tourism Authority of Thailand and WHO

The new owner answers the broad island-food decision without absorbing restaurant-list or Sunday-market detail. It excludes fixed meal prices, permanent venue rankings or schedules, fabricated first-hand experience, guaranteed food safety and automatic dietary claims.

## Implemented experience

- Registry-based reusable `CityFoodGuideTemplate` owner
- Phuket-specific kopitiam hero and island-route visual
- 4 meal-format decisions
- 4 distinct food-area decisions spanning Old Town, the south, Patong and the north-west
- 6 Phuket or Southern dish cards linking to independent canonical owners
- Visual four-stop Old-Town-to-coast food day
- 4 practical food-safety, dietary, transport and current-offer checks
- 4 bounded ordering phrases
- 10 exact useful PAA questions
- Article, BreadcrumbList and FAQPage schemas plus the site organisation schema
- 3 natural specialist handoffs

## Affiliate implementation

- Klook food-experience CTA uses placement sub-ID `en-phuket-city-food-owner`
- Amazon cookbook CTA: `/go/simple-thai-food-cookbook/`
- Amazon granite-mortar CTA: `/go/thai-granite-mortar-eight-inch/`
- Both product links render with `target="_blank"` and `rel="noopener noreferrer nofollow sponsored"`
- Both redirect routes return HTTP 307 to Amazon with `tag=go2thailand-20`
- Disclosure explains commission, OneLink localisation and live seller, price, availability and delivery checks

## Verification evidence

- Route and all 9 unique internal specialist targets: HTTP 200
- Desktop: 1280 x 720, 1265px document width, no horizontal overflow
- Mobile: 412 x 915, 397px document width, no horizontal overflow
- Mobile sticky destination search and bottom navigation present
- One H1 and one main landmark
- Correct self-canonical
- English, Dutch and x-default alternates present
- 10 FAQ details and 4 rendered JSON-LD scripts
- No framework error overlay or console errors
- Accessibility smoke check: 0 missing image alt attributes, 0 unnamed buttons, 0 unnamed links and 0 duplicate IDs
- Focused ESLint: 0 errors; the two data files are intentionally ignored by the project ESLint pattern
- TypeScript: passed with `--noEmit --incremental false`
- Design system verifier: 7 primitives and 34 templates passed
- Amazon affiliate registry verifier: 16 used and 20 registered products passed
- SEO cannibalisation: 0 hard collisions and 0 warnings
- Rendered EN audit: 1563/1563 HTTP 200, 1562 premium plus homepage hybrid, 127 exact owners, 82 Amazon routes and 170 rendered Amazon links

## React/Next review

The route remains statically generated through the existing Pages Router path. The shared template is a pure render component without new effects, global listeners, client data waterfalls or duplicated city-specific component branches. Static data and images stay module-level, `next/image` keeps responsive `sizes`, and the registry performs an O(1) owner lookup.
