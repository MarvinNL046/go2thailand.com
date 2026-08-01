# English Thailand etiquette owner audit — 2026-07-26

## Outcome

`/practical-info/etiquette-culture/` is now the premium English owner for Thailand etiquette, dos and don'ts, temple behaviour, wai context, table manners and tipping. The Dutch premium owner remains independently localized.

## SEO and evidence

- Title: `Thailand Etiquette: Do's, Don'ts & Temple Rules`.
- Canonical: `https://go2-thailand.com/practical-info/etiquette-culture/`.
- Runtime hreflang includes English, Dutch and x-default alternates.
- Visible FAQ copy contains the ten selected verbatim English PAA questions and matches FAQPage schema.
- Article, FAQPage, BreadcrumbList, HowTo and ItemList schema are present; the global Organization schema remains intact.
- Official Grand Palace rules are explicitly site-specific. Cultural explainers and current legal advice are visually separated.
- No fixed tip, ticket or product price is frozen into editorial copy.

## Design and responsive QA

- Premium three-image editorial system reused from the localized etiquette family without duplicating image assets.
- Desktop checked at 1280 px: no horizontal overflow and no broken loaded images.
- Mobile checked at 390 × 844: no horizontal overflow, readable hero, sticky search bar and bottom navigation remain usable.
- The FAQ anchor opens at the correct section; the default-open answer has strong contrast and remains readable on mobile.
- Progressive mobile scrolling loaded the temple, dining and footer assets without broken-image state.

## Affiliate and trust QA

- Klook culture-tour links use the central redirect and dynamic `practical-info` SubID; the tested tracker returned HTTP 302.
- Two task-relevant Amazon links only: a quick-dry shirt and a packable day bag. Both use the central `/go/` router, visible `Check current price at Amazon` wording, `noopener noreferrer nofollow sponsored` and an Amazon/OneLink disclosure.
- Both Amazon routes returned HTTP 307 to registered Amazon products with `tag=go2thailand-20`; product, seller, price and availability are explicitly left to the live local store.
- No Amazon products are added merely to increase link count.

## Internal-link QA

The following linked owners returned HTTP 200 locally:

- `/food/`
- `/thailand-for-first-timers/`
- `/is-thailand-safe/`
- `/travel-guides/thai-phrases-language/`
- `/travel-gear/`
- `/practical-info/`

## Technical gates

- Targeted Prettier — passed.
- Targeted ESLint — passed.
- TypeScript `--noEmit --incremental false` — passed.
- Final repository cannibalization, design, affiliate and diff gates are recorded with the commit.

