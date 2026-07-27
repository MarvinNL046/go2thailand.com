# English Thailand budget owner audit

## Outcome

`/thailand-index/budget/` is now the single evergreen English owner for Thailand travel cost, daily budget, two-week cost, spending money, backpacking budget and “is Thailand expensive” intent. The old English index table and its fixed USD destination prices were replaced by an independent premium UK-English planning experience.

## Research and ownership

- Six DataForSEO clusters: 192 raw records, 160 unique keywords.
- Ten current UK-English SERPs: 85 organic results, 54 PAA records, 29 unique questions.
- Five full competitor parses.
- Exact ranking and backlink checks for eight Go2Thailand candidates: no ranking keyword or reportable backlink signal at capture time.
- Historic GA4 low-engagement evidence was considered for three former blog owners.
- `/budget-travel/` and five broad English blog duplicates permanently redirect to the owner.
- The dated rising-cost crisis article retains its event-specific news intent.
- Both locale packing-list routes remain excluded from generated sitemaps after the sitemap generator was hardened against reintroducing the retired owner.

## Premium implementation

- Dedicated English component: `components/budget/ThailandBudgetGuideEn.tsx`.
- Shared premium primitives: editorial hero, section navigation, headings, FAQ split, related guides, source method and affiliate disclosure.
- Interactive controls for 7, 10, 14 or 21 days; one to four travellers; three travel styles; and three route shapes.
- Transparent category model for accommodation, food, local transport, experiences, intercity travel and a 10% buffer.
- Route-cost landscape, hidden-cost editorial story and cash/card safeguards give the lower half equal visual depth.
- UK-English labels, breadcrumb label, section-navigation label and related-guide CTA are explicitly localized.
- Existing project-owned budget visuals are reused; all referenced assets load locally.

## Commercial and freshness controls

- No fixed provider, hotel, train, activity, airfare, ATM or exchange-rate promise.
- Trip.com, 12Go and Klook CTAs say “check current prices”.
- All three commercial exits include `nofollow sponsored`, placement sub-IDs and adjacent disclosure.
- No Amazon block: physical products are not a natural requirement for this planning intent.
- Bank of Thailand, UK FCDO, Thai Customs and State Railway of Thailand are the primary current-control sources.

## SEO and accessibility verification

- One visible H1 and one main landmark.
- Self-canonical: `https://go2-thailand.com/thailand-index/budget/`.
- English, Dutch and x-default alternates are present.
- Organization, FAQPage, WebPage and BreadcrumbList JSON-LD parse correctly.
- Nine useful exact PAA questions are answered without duplicating currency variants.
- Fieldsets, legends, native buttons and `aria-pressed` expose calculator state to keyboard and assistive-technology users.
- Desktop visual QA at the normal app viewport: premium hero, side answer card and navigation are composed without overlay.
- Mobile QA at 390 × 844: sticky search, hero, full-width actions and bottom navigation remain readable; document width equals viewport width.
- Calculator interaction verified after switching to seven days and the lean style.

## Automated evidence

- TypeScript: `npx tsc --noEmit --incremental false` — passed.
- Final layered English audit: `seo/audits/runtime/en-thailand-budget-final-v4-2026-07-27.json` — **1593/1593 sitemap routes passed, zero hard errors, zero warnings**. All 288 English blog routes were freshly rendered after the UTF-8-safe internal-link migration.
- Inventory after consolidation: 2,286 sitemap URLs — 1,593 EN and 693 NL.
- Local development server remains active on port 3000.
