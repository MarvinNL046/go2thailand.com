# English owner audit — Thai massage in Thailand

**Route:** `http://localhost:3000/blog/thai-massage-guide-types-prices/`
**Audit date:** 2026-07-26
**Result:** pass

## Ownership and research

- Preserved the existing English URL and replaced its generic rendering with an independent premium owner.
- DataForSEO rankings: zero detected ranking keywords; no established keyword position was displaced.
- DataForSEO backlink snapshot captured with no measurable summary signal.
- Independent English research includes a 126-keyword DFS cluster, twelve SERPs, exact PAA and three competitor parses.
- Parsed competitors: TagThai (1,090 words), Andamanda Phuket (1,245) and Learn Thai From A White Guy (1,506).
- Thirteen interface FAQ questions are verbatim English PAA captured in the research. No question wording was invented.
- Country-level massage selection remains separate from location/provider intent such as “near me”, Bangkok salons or Phuket salons.

## Content and information gain

- Rendered output contains more than 3,000 English word tokens including shared chrome, materially exceeding the practical task coverage of the parsed competitors.
- The owner provides four massage-format choices, an experience-axis model, cultural context, a dated official price anchor, before/during/after planning, consent phrases, health stop signals, venue checks, etiquette and a booking decision boundary.
- UNESCO heritage language remains cultural; it is not converted into a modern medical mechanism.
- Wat Pho pricing is clearly dated and labelled as one official venue example, never a national average.
- NCCIH provides the safety boundary: low general risk does not mean no risk, rare serious effects exist, and massage must not delay medical care.
- No diagnosis, pregnancy recommendation, hernia advice, cure, detox or recovery claim is made.

## Design and responsive QA

- Premium editorial hero, glass departure card, horizontal section navigation, four decision cards, choice visual, heritage panel, price card, three-step route, consent visual, safety split, venue signals, etiquette panel, FAQ and related cards use shared design-system primitives.
- In-app Browser desktop QA: correct English H1, English breadcrumb, readable first open FAQ and no horizontal overflow (`scrollWidth === clientWidth`, 1265 px).
- In-app Browser mobile QA at 390 × 844: mobile search and bottom navigation are present, section navigation remains scrollable, and the page has no horizontal overflow (`scrollWidth === clientWidth`, 375 px content viewport).
- Contextual English image alt text and responsive Next Image sizing are present.

## SEO and schema

- Canonical: `https://go2-thailand.com/blog/thai-massage-guide-types-prices/`.
- Hreflang output: `en`, `nl`, `x-default`.
- Rendered JSON-LD types: `Organization`, `Article`, `FAQPage`, `BreadcrumbList`, `ItemList`, `HowTo`.
- Thirteen FAQ interface questions match FAQ schema verbatim.
- All 19 detected non-affiliate internal paths in rendered output returned HTTP 200 locally.
- English and Dutch routes both return HTTP 200, and the Dutch route retains its Dutch premium owner.

## Affiliate decision

- One Klook CTA says `Check current massage price at Klook` and uses `rel="noopener noreferrer nofollow sponsored"`.
- Disclosure explains commission and instructs visitors to recheck provider, service, current price, conditions and suitability.
- Amazon is intentionally absent. Recovery devices or self-massage products are not necessary to complete a health-adjacent service-selection task and could blur the page’s medical boundary.

## Verification evidence

- TypeScript: `npx tsc --noEmit --incremental false` — pass.
- English route: HTTP 200; Dutch counterpart: HTTP 200.
- Rendered Klook current-price CTA: 1; rendered Amazon `/go/` links: 0.
- Mobile and desktop browser snapshots confirm English content and shared navigation behaviour.
- Internal rendered-link check: all detected non-affiliate local paths returned HTTP 200.

