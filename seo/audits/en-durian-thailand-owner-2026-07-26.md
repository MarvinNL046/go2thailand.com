# English durian Thailand owner audit — 26 July 2026

## Owner and search intent

- Canonical owner: `/blog/durian-season-thailand-2026-where-to-eat-buy-guide/`
- Preserved URL and 2026 query intent because the live English SERP showed this URL at organic position 4 for `durian season thailand 2026`, despite the URL-level DFS ranking snapshot returning no rows.
- Independent research set: 92 DFS keyword records, 12+ English SERPs, 3 competitor parses, backlink snapshot and 13 verbatim PAA questions.
- The page answers the regional season question early and separates nationwide advice from the current 2026 eastern Thailand calendar.

## Editorial and evidence controls

- Current season facts return to Thailand.go.th, the Department of Agriculture and TAT sources.
- Cultivar guidance returns to a Royal Thai Embassy guide and is written as a taste spectrum, not an objective ranking.
- BTS restrictions return to the operator's current regulations; hotel and airline policies are presented as operator-specific checks.
- Old source prices, unconfirmed future festivals, medical promises and universal season claims were excluded.
- Thirteen exact English PAA questions appear in the interface and FAQ schema.

## Affiliate controls

- One restrained Amazon cross-sell: Kooky freeze-dried Monthong durian, routed through `/go/kooky-freeze-dried-monthong-durian/` and the central OneLink registry.
- The page states that freeze-dried durian is not the same experience as fresh fruit and asks readers to check ingredients, pack size, seller and local availability.
- Amazon CTA: `Check current price at Amazon`; Trip.com CTA: `Check current hotel price at Trip.com`.
- Both links use `nofollow sponsored`, contain changing-price disclosures and show no hard affiliate price.
- Runtime redirect verified as HTTP 307 to the canonical Amazon product URL with the approved `go2thailand-20` tag.

## Design and runtime QA

- English and Dutch owner URLs return HTTP 200; the existing Dutch owner remains unchanged.
- English page contains one H1, one Amazon CTA and one Trip.com CTA.
- Desktop viewport: `scrollWidth === clientWidth` (1265 px).
- Mobile viewport: `scrollWidth === clientWidth` (375 px).
- Desktop and 390 px mobile browser checks found no horizontal overflow or internal-server error.
- Hero, season calendar, cultivar cards, ripeness ladder, buying checks, tasting guidance, orchard route, rules, FAQ, related guides and sources share the premium editorial system.

## Schema and technical gates

- Article, FAQPage, BreadcrumbList, ItemList and HowTo structured data are emitted from the owner component.
- Canonical, English/Dutch hreflang and metadata remain on the existing route.
- TypeScript, affiliate verification, cannibalization and design verification are required final gates for this owner commit.
