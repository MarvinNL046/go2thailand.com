# English Tom Yum Goong owner audit — 2026-07-28

## Outcome

`/food/tom-yum-goong/` is now the premium broad Tom Yum owner. It preserves six existing ranking variants and consolidates the overlapping `/blog/tom-yum-goong-guide/`, which returned no ranking terms or reportable backlink summary signal. The narrower Tom Yum-versus-Tom Kha comparison remains indexable as a separate decision owner.

## Research and content boundary

- DFS cluster: 97 records and 50 competitor domains.
- Primary opportunity: `tom yum soup thailand`, UK volume 9,900, KD 21.
- Ten current UK-English SERPs: 76 organic results, 56 PAA records and 50 unique verbatim questions.
- Full usable source parses: Hot Thai Kitchen clear and creamy Tom Yum guides.
- Primary verification: UNESCO’s 2024 Representative List entry for Tomyum Kung.
- Excluded: movie, restaurant-near-me, delivery, supermarket, fixed-price, universal nutrition or heat, medicinal, ancient-unchanged and unsupported first-person claims.

## Design and commercial behaviour

- Reuses `DishEditorialTemplate` with Tom Yum-specific content instead of Pad Thai-specific copy hidden in the shared template.
- Original rights-safe 1920×1080 WebP hero, generated for the page with the dish on the right and editorial negative space on the left.
- Taste compass, eight ingredient signals, clear-versus-creamy cards, three-step ordering route, home-cooking sequence, ten FAQs and four page-level schemas.
- One central `/go/simple-thai-food-cookbook/` Amazon OneLink route with current-price wording and full Associate disclosure.
- One Klook cooking-class exit with `subid=en-tom-yum-goong-dish-cooking-class`, current-option wording and sponsored attributes.

## Runtime and responsive verification

- New owner: HTTP 200.
- Legacy English blog: HTTP 308 to `/food/tom-yum-goong/`.
- English sitemap: new owner once, legacy owner absent; 1,586 URLs after consolidation.
- Dutch sitemap: 693 URLs and the independent Dutch blog route remains present.
- RSS feed: legacy English blog absent.
- Final layered runtime audit: **1,586/1,586 routes without a hard finding and zero warnings**. Report: `seo/audits/runtime/en-tom-yum-final-v2-2026-07-28.json`.
- Canonical exact; one H1 and one main landmark; Organization, Article, BreadcrumbList, ItemList and FAQPage schema present.
- Desktop 1280×720 and mobile 390×844 visually inspected. Mobile H1 remained within its 343 px content width; document width stayed below the 390 px viewport. Sticky search and bottom navigation remained usable.

## Gates

- TypeScript: pass.
- Targeted ESLint: pass after removing one unused import warning.
- Sitemap, inventory and feed generation: pass.
- Final cannibalisation, affiliate and design-system gates are recorded with the implementation commit.
