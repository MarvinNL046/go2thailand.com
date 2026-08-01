# English Thailand street-food owner audit — 2026-07-29

## Decision

- Canonical owner: `/thailand-street-food/`.
- Permanent EN consolidation: `/blog/thai-street-food-guide-2026/` → `/thailand-street-food/`.
- The independently researched NL owner decision already identified `/nl/thailand-street-food/`; its duplicate blog now also consolidates to that owner. This milestone replaces only the English presentation and copy. The Dutch owner remains a separate editorial/design audit rather than inheriting English text.
- Both former English candidates returned zero ranking keywords and no backlink-summary signal, so no external signal dictated the owner. The evergreen URL wins on durability, existing links from newer premium pages and clean bilingual pairing.

## Independent English research

- DFS keyword cluster: 3 street-food-guide variants; `thai street food guide` and `guide to thai street food` each recorded UK volume 10.
- Current UK-English SERPs: `thai street food`, `is street food safe in thailand`, `what street food to eat in thailand`, and `thai night market food`.
- Captured across those result pages: 33 organic results and 19 genuine People Also Ask appearances.
- Six competitor pages parsed in full: Beyond the Bucket List, Bacon is Magic, Wandering Everywhere, Johnny Africa, Feastography and Earth to Editorial.
- Primary or authoritative checks: WHO Five Keys to Safer Food, WHO South-East Asia safe street-food consultation, Tourism Authority of Thailand regional cuisine context and UNESCO's Tom Yum Kung record.
- One additional low-value query returned a transient DFS internal search-engine error; it was not substituted with invented data and was unnecessary after the four successful SERPs.

## Intent boundaries

- This owner answers countrywide stall choice, dish-route, city-handoff, observable food-handling, night-market pacing and basic ordering intent.
- `/travel-guides/thai-cuisine-food-guide/` owns broader cuisine, regional traditions and meal composition.
- `/blog/best-street-food-markets-bangkok/` owns Bangkok neighbourhood and market comparison.
- Individual `/food/` routes own dish ingredients, variations and specialist decisions.
- City food pages own local destination context; cooking-class and dietary pages retain their own commercial or safety intent.

## Content and design proof

- Bespoke premium component: `components/food/ThailandStreetFoodGuideEn.tsx`.
- Shared primitives: `EditorialHero`, `PageSectionNav`, `SectionHeading`, `FaqSplitSection`, `SourceMethodSection`, `RelatedGuidesSection` and `AffiliateDisclosure`.
- Unique decision modules: four venue formats, three visual dish routes, three city handoffs, four WHO-aligned handling checks, a dotted four-stop evening sequence and four bounded ordering phrases.
- Ten FAQ answers use genuine current PAA wording and avoid universal safety or stale countrywide price claims.
- Article, BreadcrumbList and FAQPage schema are rendered from the owner.

## Affiliate assessment

- Klook appears once as a current-options food-experience exit with a placement sub-ID and full sponsored disclosure.
- Amazon appears only where the page naturally switches from eating on the street to practising technique at home: a Thai cookbook and granite mortar.
- Both links use the central `/go/` registry, open in a new tab, carry `nofollow sponsored`, and redirect with `tag=go2thailand-20`; Amazon OneLink can localise the storefront.
- No product price is copied into editorial content. The CTA asks visitors to check the current Amazon price.
- Trip.com, Saily and unrelated travel gear are deliberately omitted because they do not solve the page's primary street-food decision.

## Verification

- Desktop: 1440/1440 document width, one H1, one main landmark and premium marker `thai-street-food-guide-en`.
- Mobile: 375/375 document width with no horizontal overflow.
- Axe WCAG A/AA: zero violations after increasing small-text contrast; only gradient/dev-toolbar cases remain untestable, not failures.
- Canonical: `https://go2-thailand.com/thailand-street-food/`.
- Hreflang: EN self-reference and NL `/nl/thailand-street-food/` verified in rendered HTML.
- Old EN and NL blog routes return permanent 308 redirects to their locale owner.
- Both Amazon routes return 307 to Amazon with `tag=go2thailand-20`.
- Sitemap: both locale owners present; both obsolete blog URLs absent.
