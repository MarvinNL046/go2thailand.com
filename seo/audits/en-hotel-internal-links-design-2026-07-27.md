# English hotel family — internal links and shared design audit

Date: 2026-07-27

## Scope

- `/best-hotels/{city}/` owner pages
- `/hotel/{hotel}/` detail pages
- 40 destination hotel owners
- 426 English hotel detail records
- Shared current-price and affiliate presentation

## Findings corrected

1. The initial English sitewide audit reported 425 hotel detail URLs without an incoming link from another page's `<main>` content.
2. Hotel owner cards linked only to an external booking provider, even though every owner record had a matching editorial detail page.
3. Eleven `boutique` hotel records were omitted from four owners because the shared category renderer only supported budget, mid-range and luxury.
4. Generated similar-hotel names sometimes contained a copied price and description fragment. Exact matching failed, so no lateral hotel-detail link rendered.
5. Shared hotel cards exposed static room-price ranges and stored review scores even though both can become stale. Mobile hotel CTAs also occupied the same bottom edge as the site navigation.

## Implementation

- Built a server-side name-to-slug index from the existing hotel detail records.
- Added one contextual `Read hotel analysis` link to every English hotel card.
- Added contextual detail-to-detail links to each resolved similar hotel.
- Added `boutique` as a typed, designed fourth category with its own editorial guidance.
- Added a contextual specialist-guide grid to each hotel owner and removed duplicate guide links from the generic related-link block.
- Resolve contaminated similar-hotel labels against the canonical hotel record and display only the clean canonical name.
- Replaced static price badges and stored review-score output with current-price CTAs naming the actual provider.
- Removed stale `priceRange` output from Hotel schema while retaining descriptive Hotel structured data.
- Added explicit affiliate disclosure and clarified that hotels cannot buy ranking positions.
- Moved the mobile current-price CTA above the existing bottom navigation.
- Upgraded both shared owner and detail heroes to the jade, cream, saffron and editorial-serif design system.

## Verification evidence

- Data join: 426 cluster hotel records matched 426 detail records; zero unmatched names.
- Rendered owner crawl: 40/40 owners returned HTTP 200.
- Rendered owner crawl: 426/426 expected `/hotel/{slug}/` links were present; zero missing.
- Similar-hotel data: 1,161/1,161 generated alternatives resolved to a canonical sibling hotel; zero missing.
- Layered incremental sitewide audit: 1,602/1,602 routes without a hard finding.
- Incoming-main warnings fell from 527 in the initial crawl to 34 after the hotel owner refresh.
- Hotel detail orphan warnings: 425 → 0.
- Hotel specialist-guide orphan warnings: 8 → 0.
- Final machine-readable result: `seo/audits/runtime/en-sitewide-hotel-refresh-2026-07-27.json` (local runtime evidence).
- Bangkok owner desktop: 12 internal analysis links, 12 current-price CTAs, no error overlay, no horizontal overflow and no console errors.
- Bangkok owner mobile (390 × 844): 12 internal analysis links, all internal CTA targets at least 44 px high, no error overlay and no horizontal overflow.
- Mandarin Oriental Bangkok detail desktop: three related hotel links, provider-labelled current-price CTAs, no stored review score, no error overlay, no overflow and no console errors.
- Mandarin Oriental Bangkok detail mobile (390 × 844): three related hotel links, no leaked static price in similar-hotel labels, no overflow and the sticky CTA ended 80 px above the viewport bottom to preserve the bottom navigation.

## Content and commercial policy

- Room prices are requested from the booking provider for the visitor's dates instead of presented as evergreen facts.
- Existing price fields remain in the historical source data for later research review but are no longer used as live UI claims or Hotel schema price data.
- Affiliate links retain `noopener noreferrer nofollow sponsored`.
- Editorial analysis remains an internal link and does not carry affiliate attributes.
