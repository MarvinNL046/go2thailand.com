# Acceptance audit — English Thai drinks owner

**Route:** `/drinks/`

**Date:** 26 July 2026

**Status:** implemented and verified locally

## Search intent and content

- Canonical owner retained at the GA4 and DFS-ranking route `/drinks/`; no redirect or slug migration.
- Independent English research includes four DFS clusters, twelve SERP/PAA sets, eight existing rankings, backlinks and three competitor parses.
- The six visible FAQ questions are exact English PAA questions and each occurs twice in SSR HTML: once in page content and once in `FAQPage` schema.
- One H1. The page presents a flavour compass, six first drinks, cha-yen decision support, a four-stop tasting route, all 25 details, ordering phrases, water and ice guidance, current alcohol rules, related guides and sources.
- Detail owners keep individual recipe/drink intent; the hub does not inflate them into repeated mini-articles.

## Fact checks

- TAT Newsroom confirms that general alcohol sales hours are 11:00–24:00 from 29 May 2026, the legal age is 20, and venue, place, licence, election or religious-day restrictions can still apply.
- MWA states that its treated Bangkok-area water follows WHO drinking-water parameters. The page does not convert that treatment claim into a guarantee about every building’s plumbing.
- CDC’s 2026 Yellow Book supports the conservative traveller rule used here: avoid tap water and ice unless reasonably certain of a safe source; use unopened factory-sealed or adequately treated water when uncertain.
- ChaTraMue is used only for its own tea-blend history, never for a health or national-popularity claim.
- Fixed prices, unsupported rankings, health promises and timeless alcohol percentages are absent.

## Design and images

- Reuses three locale-neutral, text-free drinks assets already created specifically for this owner family: hero, cha-yen preparation and hydration route.
- Desktop visual review confirms a premium editorial hero, clear hierarchy, readable decision cards and a composed commercial lower section rather than a generic card catalogue.
- At 390 × 844 the document stays within the viewport, the mobile quick navigation is visible and the H1 remains intact.
- After a progressive full-page scroll, all 14 page and layout images complete with non-zero natural width; no broken or hanging images.

## Internal linking and routing

- All six featured drink routes return HTTP 200 locally.
- Bangkok coffee, health preparation, Thai curry and 7-Eleven related routes return HTTP 200.
- The complete collection links all 25 existing drink details through four scan-friendly families.
- Canonical is exactly `https://go2-thailand.com/drinks/`; alternates are English, Dutch and x-default with the correct `/nl/drinks/` counterpart.

## Affiliate control

- Klook appears only after the core decision and safety information and uses a dynamic placement sub-ID, current-listing language and a visible disclosure.
- Amazon contains only two relevant routes: an insulated reusable bottle and Original Thai Tea mix. It is not a generic gadget carousel.
- Both Amazon links use `noopener noreferrer nofollow sponsored` and “Check current Amazon offer”; no fixed price is shown.
- The tea route returns HTTP 307 to Amazon with `tag=go2thailand-20`; the existing OneLink strategy and country-specific availability disclosure remain visible.
- Sitewide Amazon verification passes: 18 used slugs and 20 registered products.

## Structured data and gates

- JSON-LD present for `Article`, `FAQPage`, `BreadcrumbList` and `ItemList`; global `Organization` remains present.
- TypeScript, targeted ESLint and Prettier are clean.
- Cannibalisation gate: 0 hard collisions and 0 warnings.
- Design-system verification passes with 7 primitives and 26 pilot templates.
- NL `/nl/drinks/` remains HTTP 200 and continues rendering its existing premium NL owner.
