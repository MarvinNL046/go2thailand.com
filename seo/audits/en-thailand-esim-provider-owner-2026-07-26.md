# English Thailand eSIM provider owner audit

**Route:** `/esim/`

**Audit date:** 26 July 2026

**Result:** PASS for the redesigned English owner

## Design and responsive QA

- Premium reusable editorial components: `EditorialHero`, `PageSectionNav`, `SectionHeading`, `FaqSplitSection`, `RelatedGuidesSection`, `SourceMethodSection` and `AffiliateDisclosure`.
- Unique generated hero asset: `/images/redesign/thailand-esim-provider-hero.webp` (2,200 × 1,238 WebP).
- Desktop browser: `scrollWidth === clientWidth` at 1,265 px.
- Mobile browser: `scrollWidth === clientWidth` at a 390 × 844 test viewport (375 px CSS client width after browser chrome).
- Progressive full-page scroll loaded every image; broken/lazy image list was empty on desktop and mobile.
- Mobile section navigation intentionally scrolls horizontally; it does not widen the document.
- Open FAQ answer computed to `rgb(41, 53, 49)`, providing readable dark copy.

## SEO ownership and content

- Dominant intent: independent comparison of Airalo, Yesim and Saily Thailand eSIM products.
- Separate broad intent owner is linked prominently: `/travel-guides/sim-card-thailand/`.
- Primary keyword and provider entities appear naturally in title, H1, provider cards, table and FAQ copy.
- Ten verbatim English PAA questions are visible and repeated exactly in FAQ schema.
- SSR check found the first exact PAA question twice: once in HTML content and once in JSON-LD.
- No stale sample prices remain on the English route.
- No universal provider winner, invented review score, unverified speed claim or generic network ranking is used.

## Metadata and schema

- Title: `Best eSIM for Thailand: Airalo vs Yesim vs Saily (2026)`.
- Canonical: `https://go2-thailand.com/esim/`.
- Hreflang: English, Dutch and x-default alternates emitted.
- JSON-LD types: `Article`, `BreadcrumbList`, `FAQPage` and `ItemList`.
- `dateModified`: 26 July 2026.
- Dedicated Open Graph hero asset is configured.

## Affiliate and trust QA

- Six rendered provider CTA instances across cards and final comparison panel.
- Airalo, Yesim and Saily all use placement SubIDs.
- Every commercial link uses `noopener noreferrer nofollow sponsored`.
- CTA pattern is `Check current price at [provider]`; no editorial price is presented as current.
- Disclosure sits immediately below the first provider CTA group.
- Direct HEAD checks returned HTTP 302 for all three affiliate tracking destinations, proving the trackers are live.
- No Amazon products were added because the provider owner is already strongly commercial; contextual phone accessories remain on the broader connectivity guide.

## Link and runtime QA

- `/esim/`: HTTP 200, unique new hero present, SSR HTML length 117,252 bytes during QA.
- `/travel-guides/sim-card-thailand/`: HTTP 200.
- `/travel-guides/7-eleven-thailand/`: HTTP 200.
- `/thailand-for-first-timers/`: HTTP 200.
- `/travel-guides/`: HTTP 200.
- Local server remains listening on port 3000.

## Engineering gates

- Prettier: PASS.
- TypeScript `tsc --noEmit --incremental false`: PASS.
- Targeted ESLint and repository SEO/design checks are recorded in the final command log before commit.

## Follow-up boundary

The Dutch `/nl/esim/` currently retains its legacy implementation. Its broad Dutch SIM/eSIM owner is already premium at `/nl/travel-guides/sim-card-thailand/`; the final Dutch audit must decide whether `/nl/esim/` receives its own independently researched provider-comparison owner or is consolidated to avoid cannibalisation. This English owner does not silently overwrite that decision.
