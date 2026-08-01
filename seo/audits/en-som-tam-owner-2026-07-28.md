# English Som Tam owner audit — 2026-07-28

## Outcome

`/food/som-tam/` is now the premium broad Som Tam owner. It treats Som Tam as a pounded-salad family rather than one fixed papaya recipe and consolidates the overlapping `/blog/som-tam-regional-variations-thailand/`. Neither candidate returned ranking terms or a reportable backlink summary signal.

## Research and content boundary

- DFS cluster: 63 records and 50 competitor domains.
- Primary opportunity: `som tam`, UK volume 1,900, KD 9.
- Ten current UK-English SERPs: 71 organic results, 56 PAA records and 44 unique verbatim questions.
- Full usable source parses: Hot Thai Kitchen Som Tum Thai and Tourism Authority of Thailand Buriram food context.
- Current Michelin search captures support the variation taxonomy; both full DFS parses failed and are labelled accordingly.
- Excluded: celebrity salad, supermarket, delivery, fixed price, calories, daily-consumption, weight-loss, universal health, one-authentic-version, Thai-versus-Lao value judgements and unsupported first-person claims.

## Design and commercial behaviour

- Original rights-safe 1920×1080 WebP hero with a bright Isan market counter, salad and mortar on the right and jade negative space on the left.
- Taste compass, eight ingredient signals, three materially different version cards, three-step ordering route, mortar sequence, ten FAQs and four page-level schemas.
- The shared dish template now supports a restrained one-or-more product selection instead of embedding one Pad Thai-specific product block.
- Som Tam receives two contextually justified products: the Thai cookbook and eight-inch granite mortar. Both use central `/go/` OneLink routes, current-price wording and one complete Associate disclosure.
- One Klook cooking-class exit with `subid=en-som-tam-dish-cooking-class`, current-option wording and sponsored attributes.

## Runtime and responsive verification

- New owner: HTTP 200.
- Legacy English blog: HTTP 308 to `/food/som-tam/`.
- English sitemap: new owner once, legacy owner absent; 1,585 URLs after consolidation.
- Dutch sitemap: 693 URLs and the independent Dutch legacy blog remains present.
- RSS feed: legacy English blog absent.
- Final layered runtime audit: **1,585/1,585 routes without a hard finding and zero warnings**. Report: `seo/audits/runtime/en-som-tam-final-v2-2026-07-28.json`.
- Canonical exact; one H1 and one main landmark; Organization, Article, BreadcrumbList, ItemList and FAQPage schema present.
- Desktop 1280×720 and mobile 390×844 visually inspected. Mobile document width remained 375 px; the H1 stayed inside its 343 px content width. Both Amazon CTAs rendered 277×68 px without overflow.

## Gates

- TypeScript: pass before runtime QA.
- Targeted ESLint: pass.
- Sitemap, inventory and feed generation: pass.
- Final cannibalisation, affiliate, design-system and source-hygiene gates are recorded with the implementation commit.
