# English Ayutthaya city-food owner - 2026-07-29

## Owner decision

- Canonical owner: `https://go2-thailand.com/city/ayutthaya/food/`
- Primary intent: broad Ayutthaya food orientation, meal format, food zone and Thai dish discovery
- Independent owner preserved: `/city/ayutthaya/top-10-restaurants/` for named restaurant and commercial-list intent
- Independent owner preserved: `/food/roti-sai-mai/` for single-dessert history, ingredients and preparation intent
- All three checked owners returned zero ranking terms and no reportable backlink summary signal

## Independent research

- 3 UK-English DataForSEO keyword clusters
- 3 reportable keyword records
- 10 live UK-English SERPs
- 76 organic results
- 52 genuine People Also Ask appearances
- 3 complete competitor parses plus 4 zero-content captures
- Exact ranking and backlink checks across broad food, restaurant-list and Roti Sai Mai owners
- Primary verification from the Tourism Authority of Thailand, World Health Organization and Food Standards Agency

The owner answers food geography and meal choice without absorbing the restaurant or single-dessert owners. It excludes fixed meal prices, permanent venue rankings or schedules, fabricated first-hand experience, guaranteed food safety, automatic dietary claims and a universal best-dish claim.

## Implemented experience

- Registry-based reusable `CityFoodGuideTemplate` owner
- New route-specific ImageGen riverside-table hero, converted to a 235 KB WebP project asset
- 4 meal-format decisions
- 4 geographic food zones spanning the historical island, Chao Phraya and Pa Sak riverside, Hua Ro and Chao Phrom, and U Thong Road Roti Sai Mai stops
- 6 specialist dish paths
- Visual four-stop temple-to-river food day
- 4 practical food-safety, dietary, geography and current-offer checks
- 4 bounded ordering phrases
- 10 exact useful PAA questions; dress-code and generic attraction questions were deliberately excluded
- Article, BreadcrumbList and FAQPage schemas plus the site organisation schema
- 3 natural specialist handoffs

## Affiliate implementation

- Klook food-experience CTA uses placement sub-ID `en-ayutthaya-city-food-owner`
- Amazon cookbook CTA: `/go/simple-thai-food-cookbook/`
- Amazon granite-mortar CTA: `/go/thai-granite-mortar-eight-inch/`
- Both product links render with `target="_blank"` and `rel="noopener noreferrer nofollow sponsored"`
- Both redirect routes return HTTP 307 to Amazon with `tag=go2thailand-20`
- Both redirects return `X-Robots-Tag: noindex, nofollow`
- Disclosure explains commission, OneLink localisation and live seller, price, availability and delivery checks

## Verification evidence

- Route and all 11 unique internal specialist targets: HTTP 200
- Desktop: 1280 x 720 override, 1265px document width, no horizontal overflow
- Mobile: 375 x 812 override, 360px document width, no horizontal overflow
- Mobile sticky destination search and bottom navigation visibly present
- One H1 and one main landmark
- Correct self-canonical
- English, Dutch and x-default alternates present
- 10 FAQ details and 4 rendered JSON-LD scripts
- Open FAQ body renders at `rgb(41, 53, 49)`, 14px/28px and opacity 1
- No framework error overlay or browser console errors
- Accessibility smoke check: 0 missing visible names on links, 0 unnamed buttons and 0 duplicate IDs
- Focused ESLint: passed
- TypeScript: passed with `--noEmit --incremental false`
- Design system verifier: passed
- Amazon affiliate registry verifier: passed
- SEO cannibalisation: 0 hard collisions and 0 warnings
- Rendered EN audit: 1563/1563 HTTP 200, 1562 premium plus homepage hybrid, 129 exact owners, 84 Amazon routes and 174 rendered Amazon links

## React and Next.js review

The route remains statically generated through the existing Pages Router path. The shared template is a pure render component without new effects, global listeners, client data waterfalls or city-specific component duplication. Static data and images remain at module scope, `next/image` keeps responsive `sizes`, and the registry performs an O(1) owner lookup.

## Image-generation record

- Built-in ImageGen mode
- Saved project asset: `public/images/redesign/ayutthaya-food-riverside-table.webp`
- Final dimensions and size: 1536 x 1024, 235,642 bytes
- Prompt intent: a photorealistic Ayutthaya riverside table with grilled freshwater prawns, boat noodles, Roti Sai Mai and temple-prang silhouettes; food weighted right and low with left-side copy space; no people in focus, logos, text, watermarks, fantasy skyline or malformed food
