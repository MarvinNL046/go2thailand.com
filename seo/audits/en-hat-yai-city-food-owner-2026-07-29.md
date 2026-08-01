# English Hat Yai city-food owner - 2026-07-29

## Owner decision

- Canonical owner: `https://go2-thailand.com/city/hat-yai/food/`
- Primary intent: broad meal-format, food-zone, Southern/border-city dish and dietary orientation
- Independent owner preserved: `/city/hat-yai/top-10-restaurants/` for named restaurant and commercial-list intent
- Independent owner preserved: `/city/hat-yai/attractions/kim-yong-market/` for venue, schedule, shopping and attraction intent
- All three owners returned zero DataForSEO ranking terms and no reportable backlink summary

## Independent research

- 3 UK-English DataForSEO keyword clusters
- 3 reportable keyword records
- 10 live UK-English SERPs
- 78 organic results
- 44 genuine People Also Ask appearances
- 3 complete competitor parses, one partial capture and one zero-content capture
- Exact ranking and backlink checks across broad food, restaurant-list and Kim Yong owners
- Primary verification from the Tourism Authority of Thailand, World Health Organization and Food Standards Agency

The owner answers format, geography, dish choice and bounded halal checks without absorbing restaurant-list or venue-specific market intent. It excludes fixed prices, permanent venue rankings or schedules, fabricated first-hand experience, guaranteed food safety, automatic halal claims and a universal signature-dish claim.

## Implemented experience

- Registry-based reusable `CityFoodGuideTemplate` owner
- New route-specific ImageGen border-city market hero, converted to a 190 KB WebP asset
- 4 meal-format decisions
- 4 food zones spanning Kim Yong/Santisuk/station, Lee Garden central evenings, Khlong Hae and Songkhla Old Town
- 6 independently owned specialist dish paths
- Visual four-stop arrival-to-evening food day
- 4 practical food-safety, halal, geography and current-offer checks
- 4 bounded ordering phrases
- 10 genuine useful PAA questions
- Article, BreadcrumbList and FAQPage schemas plus the site organisation schema
- 3 natural specialist handoffs

## Affiliate implementation

- Klook experience CTA uses placement sub-ID `en-hat-yai-city-food-owner`
- Amazon cookbook CTA: `/go/simple-thai-food-cookbook/`
- Amazon granite-mortar CTA: `/go/thai-granite-mortar-eight-inch/`
- Both render with `target="_blank"` and `rel="noopener noreferrer nofollow sponsored"`
- Both redirect routes return HTTP 307 to Amazon with `tag=go2thailand-20`
- Both redirects return `X-Robots-Tag: noindex, nofollow`
- Disclosure explains commission, OneLink localisation and live seller, price, availability and delivery checks

## Verification evidence

- Route and all 12 unique internal specialist targets: HTTP 200
- Desktop: 1280 x 720 viewport, 1265px document width, no horizontal overflow
- Mobile: 375 x 812 viewport, 360px document width, no horizontal overflow
- Mobile sticky destination search and bottom navigation visibly present
- Market hero and Kim Yong district card reviewed visually at desktop and mobile sizes
- One H1 and one main landmark
- Correct self-canonical
- English, Dutch and x-default alternates present
- 10 FAQ details and 4 rendered JSON-LD scripts
- Open FAQ body renders at `rgb(41, 53, 49)`, 14px/28px and opacity 1
- No browser console errors
- Accessibility smoke check: 0 unnamed links, 0 unnamed buttons and 0 duplicate IDs
- TypeScript: passed with `--noEmit --incremental false`
- Focused ESLint: 0 errors; data files are intentionally ignored by the current configuration
- Design system verifier: passed
- Amazon affiliate registry verifier: passed
- SEO cannibalisation: 0 hard collisions and 0 warnings
- Rendered EN audit: 1563/1563 HTTP 200, 1562 premium plus homepage hybrid, 132 exact owners, 87 Amazon routes and 181 rendered Amazon links

## React and Next.js review

The route remains statically generated through the existing Pages Router path. The shared template stays a pure render component without new effects, global listeners, client data waterfalls or city-specific component duplication. Static data and images remain at module scope, `next/image` keeps responsive sizes and hero preload, and the registry performs an O(1) owner lookup.

## Image-generation record

- Built-in ImageGen mode via the imagegen skill
- Default output: `C:/Users/M_Smi/.codex/generated_images/019f830b-181c-7c51-94c0-e3435914c076/exec-ba277646-2426-42d2-8b1a-88641eadb439.png`
- Saved project asset: `public/images/redesign/hat-yai-food-market-table.webp`
- Final dimensions and size: 1536 x 1024, 189,536 bytes
- Prompt intent: premium natural travel-editorial photography of a Hat Yai market table with fried chicken, dim sum, Southern curry, roti, seafood, fruit and Thai tea; warm market and restrained red-lantern detail against a modern deep-jade city evening; food weighted right and low with calm left copy space; no Bangkok skyline, Chiang Mai temple, beach, floating-market boat, branding, readable text, alcohol or malformed food
