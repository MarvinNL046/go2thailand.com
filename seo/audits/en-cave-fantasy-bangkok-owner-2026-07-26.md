# English Cave Fantasy Bangkok owner audit — 26 July 2026

## Owner and intent

- Canonical owner: `/blog/cave-fantasy-mbk-center-bangkok-immersive-art-2026/`.
- Existing URL and publication date retained.
- Independent English evidence: ranking and backlink snapshots, three DFS clusters, twelve live SERPs, three competitor parses and ten exact PAA questions.
- The former low-engagement article is replaced by a practical decision owner for Fantasy Space, Flight Theater and the combo.

## Editorial and factual controls

- Official MBK confirms floor 4, Zone A, unit 4K-103 and a photo-led 3D immersive-entertainment format.
- MBK's broad 10:00–22:00 entertainment hours are not presented as identical to Klook's current, shorter ticket-product hours.
- The current Klook combo lists eight Fantasy Space zones plus Flight Theater as a separate inclusion; the page does not turn promotional counting into a false room guarantee.
- Current height thresholds, recommended duration, re-entry, motion/health warnings, mobility guidance, photography and house rules carry a visible checked date and visit-day recheck.
- BACC is fact-checked through its official visit page and used as a format contrast, not described as the same product.
- No hard ticket price, dynamic review count, changing rating, unsupported superlative or claimed personal visit appears.
- Ten exact English PAA questions appear once in the interface and once in FAQ schema.

## Design and responsive QA

- Reuses three dedicated owner assets shared with the Dutch translation: immersive hero, interactive projection image and wide rain-route banner.
- Premium sequence: glass hero visit card, three dominant ticket choices, immersive image split, format comparison, photo etiquette, family/sensory decision grid, dotted BTS route, rain banner, six booking checks, current-ticket bridge, three day shapes, FAQ, related guides and source method.
- Desktop browser at 1265 px: one H1, fourteen sections and `scrollWidth === clientWidth`.
- Mobile browser at 375 px: `scrollWidth === clientWidth`; H1 stays inside a 343 px content width and the sticky search/bottom navigation remains intact.
- Progressive page scroll loads all eight rendered page/layout images with positive natural width.
- Open FAQ answer renders at `rgb(41, 53, 49)`, opacity 1 and font weight 500.

## Links, affiliate and schema

- All five unique internal content destinations return local HTTP 200.
- One Klook CTA uses its own placement sub-ID, exact current-ticket wording and `noopener noreferrer nofollow sponsored`.
- Disclosure explains possible commission at no extra cost and requires readers to verify exact product, date, included zones, height criteria, warnings and conditions.
- Amazon is deliberately absent because no physical product materially improves this attraction visit.
- Article, TouristAttraction, FAQPage, BreadcrumbList and HowTo schema parse; global Organization is also present.
- Canonical is exact; `en`, `nl` and `x-default` hreflang point to the matching owner routes.

## Final owner gates

- English and Dutch owner URLs return local HTTP 200.
- TypeScript compilation passes with incremental state disabled.
- Targeted ESLint passes for the new component and route owner.
- Affiliate verification passes with 18 used slugs and 20 registered products.
- Cannibalisation verification passes with zero hard collisions and zero warnings.
- Design-system verification passes with seven primitives and 26 pilot templates.
- Final diff and staged-file checks remain required immediately before commit.
