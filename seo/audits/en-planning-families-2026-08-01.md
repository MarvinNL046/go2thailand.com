# English planning families audit — 1 August 2026

## Scope

- 15 itinerary routes (`/itineraries/` plus 14 route owners)
- 14 island routes (directory, ten island owners and three Koh Tao subpillars)
- 5 region routes (directory plus four region owners)
- 5 practical-information routes (directory plus four detail owners)

This pass intentionally excludes editorial Markdown, hotel routes and visa owners.

## Findings and fixes

- Global canonical and `hreflang` ownership remains centralised in `Hreflang`/`SEOHead`; family pages do not emit competing canonicals.
- The itinerary directory and practical hub now use evergreen, intent-led metadata rather than making the calendar year part of the promise.
- Legacy itinerary detail data contained example budgets and activity/transport costs. These values were removed from the server-provided English route model, the generated cost FAQ was replaced by a current-price decision workflow, and `HowTo.estimatedCost` was removed. Commercial links already use `nofollow sponsored` and advise checking the provider's current total and terms.
- Region owners now emit `TouristDestination` and `BreadcrumbList` structured data. The region directory emits `CollectionPage`, `ItemList` and breadcrumb schemas and its legacy `<img>` cards now use responsive `next/image` output.
- English region and practical metadata is evergreen and avoids unsupported “best” or completeness claims.
- The English health route now has an explicit medical-limitations notice plus direct TravelHealthPro and UK government health links. Users are told to recheck current guidance and speak to a qualified travel-health professional.
- Existing island owner pages already expose `TouristDestination`, FAQ and breadcrumb schemas, responsive hero imagery, internal links to route/comparison owners and broad-season caveats. The island-planning owner and seven-day route owner already provide natural 12Go, Trip.com, Klook and Amazon disclosures with live-price language.

## Source policy

- Volatile health guidance: TravelHealthPro Thailand country page and UK government Thailand health advice.
- Destination context: Tourism Authority of Thailand destination pages already linked visibly from island pages.
- Ferry, room, activity and product inventory is deliberately not hard-coded. Affiliate CTAs instruct readers to check current operators, piers, luggage, totals, sellers and cancellation terms.

## Remaining editorial risk

- The general English itinerary template is structurally safe after price scrubbing, but its legacy body copy is less visually refined than the bespoke seven-day island-hopping owner. It should be migrated route-by-route to the premium editorial itinerary template when each route receives independent search research.
- General English region and practical detail templates are responsive and functional, but bespoke owner-level research should precede any new factual claims or prescriptive season, health, entry or safety advice.
- Thailand entry and visa rules are outside this family pass. They must remain owned by the visa family and be checked against official Thai e-Visa, immigration, TDAC and government travel-advice sources before release.

## Verification gates

- TypeScript: `npx tsc --noEmit --pretty false --incremental false`
- Whitespace: `git diff --check`
- Route coverage derived from `public/sitemap.xml`.
