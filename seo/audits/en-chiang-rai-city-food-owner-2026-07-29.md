# English Chiang Rai city-food owner - 2026-07-29

## Owner decision

- Canonical owner: `https://go2-thailand.com/city/chiang-rai/food/`
- Primary intent: broad Chiang Rai meal-format, food-zone, Northern-dish and highland-coffee orientation
- Independent owner preserved: `/city/chiang-rai/top-10-restaurants/` for named restaurant and commercial-list intent
- Independent owner preserved: `/city/chiang-rai/attractions/chiang-rai-night-bazaar/` for venue, schedule and attraction intent
- Restaurant owner retained `restaurants chiang rai` at position 52 with volume 70 and `best restaurants chiang rai` at position 59 with volume 40
- Broad food and Night Bazaar owners returned zero ranking terms; none of the three returned a reportable backlink summary

## Independent research

- 3 UK-English DataForSEO keyword clusters
- 3 reportable keyword records
- 10 live UK-English SERPs
- 83 organic results
- 51 genuine People Also Ask appearances
- 5 complete competitor parses
- Exact ranking and backlink checks across broad food, restaurant-list and Night Bazaar owners
- Primary verification from the Tourism Authority of Thailand, Mae Fah Luang Foundation, World Health Organization and Food Standards Agency

The broad owner answers format, geography, dish choice and coffee context without absorbing ranked restaurant or venue-specific market intent. It excludes fixed prices, permanent venue rankings or schedules, fabricated first-hand experience, guaranteed food safety, automatic dietary claims, a universal signature-dish claim and a current Michelin distinction claim.

## Implemented experience

- Registry-based reusable `CityFoodGuideTemplate` owner
- New route-specific ImageGen clock-tower food-and-coffee hero, converted to a 194 KB WebP asset
- 4 meal-format decisions
- 4 food zones spanning the clock-tower centre, Night Bazaar, Ban Du and north-city corridor, and planned highland coffee routes
- 6 independently owned specialist dish paths
- Visual four-stop city-to-coffee food day
- 4 practical food-safety, dietary, geography and current-offer checks
- 4 bounded ordering phrases
- 10 genuine useful PAA questions
- Article, BreadcrumbList and FAQPage schemas plus the site organisation schema
- 3 natural specialist handoffs

## Affiliate implementation

- Klook experience CTA uses placement sub-ID `en-chiang-rai-city-food-owner`
- Amazon cookbook CTA: `/go/simple-thai-food-cookbook/`
- Amazon granite-mortar CTA: `/go/thai-granite-mortar-eight-inch/`
- Amazon compact coffee-maker CTA: `/go/aeropress-go-travel-coffee-maker/`
- All three render with `target="_blank"` and `rel="noopener noreferrer nofollow sponsored"`
- All redirect routes return HTTP 307 to Amazon with `tag=go2thailand-20`
- All redirects return `X-Robots-Tag: noindex, nofollow`
- Disclosure explains commission, OneLink localisation and live seller, price, availability and delivery checks

## Verification evidence

- Route and all 12 unique internal specialist targets: HTTP 200
- Desktop: 1280 x 720 viewport, 1265px document width, no horizontal overflow
- Mobile: 375 x 812 viewport, 360px document width, no horizontal overflow
- Mobile sticky destination search and bottom navigation visibly present
- Clock-tower hero and district card reviewed visually at desktop and mobile sizes
- One H1 and one main landmark
- Correct self-canonical
- English, Dutch and x-default alternates present
- 10 FAQ details and 4 rendered JSON-LD scripts
- Open FAQ body renders at `rgb(41, 53, 49)`, 14px/28px and opacity 1
- Accessibility smoke check: 0 unnamed links, 0 unnamed buttons and 0 duplicate IDs
- Hero WebP is preloaded through the shared priority `EditorialHero`; the duplicate-src dev warning does not reflect a missing preload
- TypeScript: passed with `--noEmit --incremental false`
- Focused ESLint: 0 errors; data files are intentionally ignored by the current configuration
- Design system verifier: passed
- Amazon affiliate registry verifier: passed
- SEO cannibalisation: 0 hard collisions and 0 warnings
- Rendered EN audit: 1563/1563 HTTP 200, 1562 premium plus homepage hybrid, 131 exact owners, 86 Amazon routes and 179 rendered Amazon links

## React and Next.js review

The route remains statically generated through the existing Pages Router path. The shared template stays a pure render component without new effects, global listeners, client data waterfalls or city-specific component duplication. Static data and images remain at module scope, `next/image` keeps responsive sizes and hero preload, and the registry performs an O(1) owner lookup.

## Image-generation record

- Built-in ImageGen mode via the imagegen skill
- Default output: `C:/Users/M_Smi/.codex/generated_images/019f830b-181c-7c51-94c0-e3435914c076/exec-741d3782-15a5-4931-9343-9bb8f3b10690.png`
- Saved project asset: `public/images/redesign/chiang-rai-food-clocktower-table.webp`
- Final dimensions and size: 1536 x 1024, 194,212 bytes
- Prompt intent: premium natural travel-editorial photography with a realistic Northern Thai table, highland pour-over coffee, Chiang Rai clock-tower glow and mountain silhouettes; food weighted right and low with calm left copy space; no Chiang Mai landmarks, beach or karst scenery, people in focus, commercial branding, text, alcohol, fantasy architecture or malformed food
