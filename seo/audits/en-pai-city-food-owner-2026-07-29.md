# English Pai city-food owner audit

## Result

- Exact owner: `/city/pai/food/`
- Premium reusable `CityFoodGuideTemplate` rendered.
- Unique imagegen hero: `/images/redesign/pai-food-walking-street-table.webp` (1536 × 1024 WebP).
- One H1, one main, ten FAQ details, canonical exact, EN/NL/x-default hreflang.
- Schema: Organization, Article, BreadcrumbList and FAQPage.
- Desktop has no horizontal overflow or duplicate IDs. Mobile exposes sticky destination search and bottom quick navigation.
- Two Amazon links use `_blank` plus `noopener noreferrer nofollow sponsored` and resolve through `/go/` with a 307, `tag=go2thailand-20`, and `X-Robots-Tag: noindex, nofollow`.
- All requested image files resolve; 14 of 17 were loaded after vertical lazy-loading and the remaining three were pending in the off-screen horizontal related-guide rail, with no failed image.

## Automated gates

- TypeScript: passed.
- Scoped ESLint: zero errors; data files are intentionally ignored by the project configuration.
- Design verification: passed.
- Amazon affiliate verification: passed.
- SEO cannibalisation: zero hard collisions and zero warnings.

## Intent boundary

Broad food, dish and dietary-navigation intent belongs here. Named restaurant and live listing intent remains on the restaurant owner; Walking Street visit logistics stay on the attraction owner; the ranking-bearing `where is Pai` query stays on the broad destination owner.
