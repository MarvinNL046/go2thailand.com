# English Thailand island-hopping owner audit

Date: 2026-07-27
Owner: `/blog/thailand-island-hopping-guide/`

## Ownership decision

- `/blog/thailand-island-hopping-guide/` owns strategic route-planning intent: coast choice, route shape, pace, ferry handoffs and live booking.
- `/islands/` remains the island catalogue and keeps its 20 detected ranking keywords.
- `/itineraries/7-days-island-hopping/` remains a concrete seven-day schedule and must not be broadened into the same strategic owner.
- Ranking/backlink checks found no current rankings or referring domains for the blog or seven-day itinerary, so their differentiation is based on clean intent architecture rather than redirecting an established asset.

## Research evidence

- Three DFS keyword clusters: 169 keyword records and 100 competitor-domain records.
- Ten live UK-English SERPs: 84 organic results and 34 genuine PAA questions.
- Primary context: Tourism Authority of Thailand, Department of National Parks, and Department of Marine and Coastal Resources.
- Commercial live inventory is treated as volatile and is never used as a permanent timetable or price source.

## Content corrections

- Removed the unsupported fixed count of Thai islands.
- Removed fixed ferry prices, daily budgets, trip totals and transfer durations.
- Removed universal best-month ranges and one-size-fits-all advance-booking advice.
- Replaced the rushed two-coast sample with pacing frameworks for one week, ten-to-fourteen nights and three weeks or more.
- Clarified that cross-coast travel requires a mainland road, rail or air transfer rather than one continuous ferry network.
- Added natural contextual links to island, comparison and transport owners.

## Design and monetisation

- New reusable `IslandHoppingPlannerTemplate` with editorial hero, sticky section navigation, coast panels, pacing cards, accessible comparison table, handoff flow, product kit, booking cards, FAQ and source method.
- New generated ferry-arrival hero with text-safe negative space and no baked-in typography.
- 12Go and Trip.com use placement-specific sponsored links and current-price language.
- Amazon products are limited to a drybag, packable daypack and quick-dry towel through the central `/go/` router and OneLink.
- Affiliate disclosure explains commissions, OneLink localisation and variable seller, fit, price and availability.

## Verification

- TypeScript: `npx tsc --noEmit --incremental false` passed.
- `git diff --check` passed before staging.
- Local response: HTTP 200.
- Canonical: one; hreflang: `en`, `nl`, `x-default`.
- Premium template marker: one; H1: one; FAQ details: ten.
- Eight required section anchors present.
- Six images loaded after full-page scroll; broken images: zero.
- Horizontal overflow at 1280 px: zero.
- Central Amazon redirect returns 307 with `noindex, nofollow` and the configured associate tag.
- Old fixed-price, budget and booking-window patterns in owner HTML: zero.
