# English Pattaya city-food owner - 2026-07-29

## Owner decision

- Canonical owner: `https://go2-thailand.com/city/pattaya/food/`
- Primary intent: broad Pattaya food orientation, meal format, area choice and Thai dish discovery
- Independent owner preserved: `/city/pattaya/top-10-restaurants/` for named restaurant and commercial list intent; 5 ranking terms retained
- Exact city-food owner signal before rebuild: 0 ranking terms and no reportable backlink summary signal

## Independent research

- 3 UK-English DFS keyword clusters
- 21 reportable keyword records
- 10 live UK-English SERPs
- 79 organic results
- 50 genuine PAA appearances
- 3 complete competitor parses plus 1 zero-content capture
- Exact ranking and backlink checks across the broad food and named restaurant owners
- Primary verification from the Tourism Authority of Thailand, WHO and the Food Standards Agency

The new owner answers broad coast-city food decisions without absorbing the established restaurant-list owner. It excludes fixed meal prices, permanent venue rankings or schedules, fabricated first-hand experience, guaranteed food safety, automatic dietary claims and a universal best-fish claim.

## Implemented experience

- Registry-based reusable `CityFoodGuideTemplate` owner
- New route-specific ImageGen coast-table hero, converted to a 219 KB WebP project asset
- 4 meal-format decisions
- 4 distinct food-area decisions spanning Naklua, central Pattaya, Jomtien and Pratumnak
- 6 Thai dish cards linking to independent canonical owners
- Visual four-stop hotel-zone-to-coast food day
- 4 practical food-safety, dietary, transport and current-offer checks
- 4 bounded ordering phrases
- 8 exact useful PAA questions; irrelevant adult-entertainment and generic trip questions were deliberately excluded
- Article, BreadcrumbList and FAQPage schemas plus the site organisation schema
- 3 natural specialist handoffs

## Affiliate implementation

- Klook food-experience CTA uses placement sub-ID `en-pattaya-city-food-owner`
- Amazon cookbook CTA: `/go/simple-thai-food-cookbook/`
- Amazon granite-mortar CTA: `/go/thai-granite-mortar-eight-inch/`
- Both product links render with `target="_blank"` and `rel="noopener noreferrer nofollow sponsored"`
- Both redirect routes return HTTP 307 to Amazon with `tag=go2thailand-20`
- Both redirects return `X-Robots-Tag: noindex, nofollow`
- Disclosure explains commission, OneLink localisation and live seller, price, availability and delivery checks

## Verification evidence

- Route and all 13 unique internal specialist targets: HTTP 200
- Desktop: 1280 x 720, 1265px document width, no horizontal overflow
- Mobile: 375 x 812, 360px document width, no horizontal overflow
- Mobile sticky destination search and bottom navigation visibly present
- One H1 and one main landmark
- Correct self-canonical
- English, Dutch and x-default alternates present
- 8 FAQ details and 4 rendered JSON-LD scripts
- Open FAQ body renders at `rgb(41, 53, 49)` and remains readable
- No framework error overlay or console errors
- Accessibility smoke check: 0 missing image alt attributes, 0 unnamed buttons, 0 unnamed links and 0 duplicate IDs
- Focused ESLint: 0 errors; the two data files are intentionally ignored by the project ESLint pattern
- TypeScript: passed with `--noEmit --incremental false`
- Design system verifier: 7 primitives and 34 templates passed
- Amazon affiliate registry verifier: 16 used and 20 registered products passed
- SEO cannibalisation: 0 hard collisions and 0 warnings
- Rendered EN audit: 1563/1563 HTTP 200, 1562 premium plus homepage hybrid, 128 exact owners, 83 Amazon routes and 172 rendered Amazon links

## React/Next review

The route remains statically generated through the existing Pages Router path. The shared template is a pure render component without new effects, global listeners, client data waterfalls or duplicated city-specific component branches. Static data and images remain module-level, `next/image` keeps responsive `sizes`, and the registry performs an O(1) owner lookup.

## Image-generation record

- Built-in ImageGen mode
- Saved project asset: `public/images/redesign/pattaya-food-coast-table.webp`
- Prompt intent: a photorealistic Pattaya or Jomtien coast table at dusk with grilled fish, prawns, som tam, grilled chicken, herbs and rice; food weighted to the right and lower third with dark negative space for hero copy; no logos, readable text, watermarks, fantasy landmarks or malformed food
