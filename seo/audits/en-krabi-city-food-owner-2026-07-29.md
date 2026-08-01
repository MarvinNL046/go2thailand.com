# English Krabi city-food owner - 2026-07-29

## Owner decision

- Canonical owner: `https://go2-thailand.com/city/krabi/food/`
- Primary intent: broad Krabi food orientation, meal format, geographic food zone and Southern Thai dish discovery
- Independent owner preserved: `/city/krabi/top-10-restaurants/` for named restaurant and commercial-list intent
- Independent owner preserved: `/city/krabi/attractions/krabi-town-night-market/` for venue, schedule and attraction intent
- The restaurant owner retained two DataForSEO ranking terms: `best krabi restaurants` at position 50 and `best restaurants in krabi` at position 54, both with reported volume 210
- The broad food and night-market owners returned zero ranking terms; none of the three returned a reportable backlink summary

## Independent research

- 3 UK-English DataForSEO keyword clusters
- 12 reportable keyword records
- 10 live UK-English SERPs
- 80 organic results
- 46 genuine People Also Ask appearances
- 5 complete competitor parses
- Exact ranking and backlink checks across broad food, restaurant-list and night-market owners
- Primary verification from the Tourism Authority of Thailand, World Health Organization and Food Standards Agency

The owner answers food geography and meal choice without absorbing the ranked restaurant owner or venue-specific night-market owner. It excludes fixed prices, permanent venue rankings or schedules, fabricated first-hand experience, guaranteed food safety, automatic province-wide halal claims and a universal best-dish claim.

## Implemented experience

- Registry-based reusable `CityFoodGuideTemplate` owner
- New route-specific ImageGen estuary-table hero, converted to a 241 KB WebP project asset
- 4 meal-format decisions
- 4 geographic food zones spanning Krabi Town and Pak Nam, Ao Nang and Nopparat Thara, Railay, and Ko Klang river communities
- 6 specialist dish paths
- Visual food-day sequence from breakfast through evening market choices
- 4 practical food-safety, dietary, geography and current-offer checks
- 4 bounded ordering phrases
- 10 genuine useful PAA questions
- Article, BreadcrumbList and FAQPage schemas plus the site organisation schema
- 3 natural specialist handoffs

## Affiliate implementation

- Klook food-experience CTA uses placement sub-ID `en-krabi-city-food-owner`
- Amazon cookbook CTA: `/go/simple-thai-food-cookbook/`
- Amazon granite-mortar CTA: `/go/thai-granite-mortar-eight-inch/`
- Both product links render with `target="_blank"` and `rel="noopener noreferrer nofollow sponsored"`
- Both redirect routes return HTTP 307 to Amazon with `tag=go2thailand-20`
- Both redirects return `X-Robots-Tag: noindex, nofollow`
- Disclosure explains commission, OneLink localisation and live seller, price, availability and delivery checks

## Verification evidence

- Route and all 12 unique internal specialist targets: HTTP 200
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
- Rendered EN audit: 1563/1563 HTTP 200, 1562 premium plus homepage hybrid, 130 exact owners, 85 Amazon routes and 176 rendered Amazon links

## React and Next.js review

The route remains statically generated through the existing Pages Router path. The shared template is a pure render component without new effects, global listeners, client data waterfalls or city-specific component duplication. Static data and images remain at module scope, `next/image` keeps responsive `sizes`, and the registry performs an O(1) owner lookup.

## Image-generation record

- Built-in ImageGen mode
- Saved project asset: `public/images/redesign/krabi-food-estuary-table.webp`
- Final dimensions and size: 1536 x 1024, 241,058 bytes
- Prompt intent: a photorealistic Southern Thai table with khanom jeen, sour curry, grilled fish and prawns, vegetables, roti and fruit against a Krabi estuary, mangrove and limestone-karst twilight; food weighted right and low with left-side copy space; no pork, alcohol, logos, text, watermarks, fantasy scenery or malformed food
