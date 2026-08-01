# English Harbor Island Bangkapi owner audit — 2026-07-26

## Scope

- Route: `/blog/harbor-island-bangkok-rooftop-waterpark-2026/`
- Premium owner: `components/attractions/HarborIslandBangkapiGuideEn.tsx`
- Research: four DFS clusters, 12 current English SERPs, three competitor parses, ranking snapshot, backlink snapshot and 12 exact PAA questions.

## Implemented

- Branch-first hero and navigation distinguish Bangkapi, Bangkae and HarborLand indoor.
- Seven-zone visual timeline, family-safety checks, four-step Yellow Line route, weather banner, current-ticket checklist and packing section.
- Existing venue-neutral imagery is reused with accurate alt text; it is not labelled as documentary venue photography.
- Article, TouristAttraction, FAQPage, BreadcrumbList, HowTo and ItemList structured data are generated alongside the global Organization schema.
- Canonical and hreflang are provided by the shared SEO layer; the English route has a dedicated owner while the Dutch equivalent remains intact.
- Natural internal links connect Bangkok transport, weather, attractions and family planning without forcing exact-match anchors.
- Amazon OneLink and generic Klook placements are contextual, disclosed and use current-price wording.

## Editorial constraints

- No old fixed ticket prices, euro conversions, unverified inclusions or timeless largest-in-Thailand/Asia claims.
- Venue-wide age positioning is not rewritten as ride eligibility or safety assurance.
- Mall opening and attraction operation are explicitly treated as different facts.
- Bangkapi-specific claims are not mixed with the newer Bangkae branch.

## Verification checklist

- TypeScript, targeted ESLint and SEO gates must pass before commit.
- Desktop and mobile browser checks must confirm HTTP 200, loaded images, readable FAQ answers, exact PAA duplication in DOM/schema, canonical/hreflang and affiliate rel attributes.
- Internal links and `/go/` redirects must be checked from the running local server.
