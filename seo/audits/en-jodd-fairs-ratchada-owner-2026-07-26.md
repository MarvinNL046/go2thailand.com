# English Jodd Fairs Ratchada owner audit

Date: 2026-07-26  
Owner: `https://go2-thailand.com/blog/jodd-fairs-bangkok-night-market-guide/`

## Outcome

The existing English URL now renders a dedicated premium Jodd Fairs Ratchada owner instead of the generic blog template. It preserves the current ranking route, fixes Rama 9/Ratchada location confusion above the fold and remains independent from the Dutch owner.

The shared design primitives were also made safer for bilingual reuse:

- `EditorialHero` now accepts a localised breadcrumb aria-label.
- `PageSectionNav` already accepts a localised label and English owners now supply it.
- `RelatedGuidesSection` now accepts a localised card CTA label.
- The English curry and Jodd Fairs owners no longer expose Dutch breadcrumb, section-nav or card labels.

## Research and ranking evidence

- DataForSEO rankings: `jodd fair ratchada` and `jodd fairs ratchada`, both at position 33 with volume 260.
- Ten separate English SERPs cover the main entity, current location, hours, MRT, food, payment, Rama 9 closure and worth-it intent.
- English DFS cluster retained 13 keyword records.
- Backlink summary captured independently for the English URL.
- The rendered FAQ uses 13 exact English PAA questions from the saved DataForSEO runs; no PAA wording was invented.
- Three parseable English competitors measured about 1,952, 1,476 and 1,235 extracted words. Their mean is about 1,554.
- Browser verification measured 2,226 visible body words. The additional depth is information gain rather than duplicated recipes or stall-list padding.
- Brief: `seo/research/en/2026-07-26-jodd-fairs-ratchada-owner-brief.md`.

## Current-fact control

- Jodd Fairs Ratchada address, daily 17:00–01:00 hours and Thailand Cultural Centre Exit 4 are sourced to the official Jodd Fairs announcement and TAT Japan listing.
- Rama 9 closure at the end of June 2025 is explicit above the fold.
- Train Night Market Ratchada’s 27 March 2026 reopening is sourced separately and never merged with Jodd Fairs.
- Stall mix, seating, crowd level, payment acceptance and temporary changes remain qualified.
- The page tells readers to check the official social channel on the visit day.

## Information gain and design

- July 2026 location-correction card appears directly below the section navigation.
- Ninety-minute scan/share/return plan replaces a brittle viral-stall list.
- MRT route uses Exit 4 as the stable anchor.
- Published hours, suggested arrival windows and live crowd levels are clearly separated.
- Food choice uses visible preparation, clear price, shareability and ingredient questions.
- Separate visit rhythms cover solo travellers, pairs, groups and limited-energy/family visits.
- Honest worth-it matrix explains who should choose another market.
- Market comparison distinguishes Jodd Fairs, the newly reopened Train Night Market, Srinakarin and Chatuchak.

## Affiliate and price decision

- Two contextual Klook links use `Check current tour price at Klook`.
- Both use sponsored/nofollow attributes and explain that the link covers broader Bangkok food tours, not entry to Jodd Fairs.
- No hard tour price is published.
- No Amazon links appear. The page explicitly records that generic ponchos, bags and power banks do not answer the location/route intent; those products remain on dedicated packing/product owners. This is an intentional relevance decision after OneLink review.

## Technical SEO and route integrity

- English and Dutch owner routes return HTTP 200.
- Exactly one H1 and one main landmark.
- Canonical points to the existing English owner URL.
- Hreflang includes correct `en`, `nl` and `x-default` URLs.
- Schema types: Organization, Article, TouristAttraction, FAQPage, BreadcrumbList and ItemList.
- Article language is `en`; FAQPage contains 13 questions; TouristAttraction includes the published opening window.
- All nine rendered non-affiliate internal links returned HTTP 200.
- No Dutch owner-copy or hidden shared-navigation label leaked into the English page.

## Responsive browser QA

- Desktop: 1280 × 720, no horizontal overflow, no framework error overlay.
- Mobile: 390 × 844, no horizontal overflow, one visible H1 and no console errors.
- Hero, current-location card, 90-minute plan and affiliate decision block were visually inspected.
- The current-price CTA and disclosure remain legible above the mobile FAQ section.

## Gates

- `npm run affiliate:verify`: passed, 16 used slugs / 18 registered products.
- `npm run seo:cannibalization`: passed, 0 hard collisions / 0 warnings.
- `npm run design:verify`: passed, 7 primitives / 26 pilot templates.
- `npx tsc --noEmit --incremental false`: passed.
- Local dev server remains active on port 3000.
