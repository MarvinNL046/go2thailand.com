# English owner brief — Bangkok street food markets

**Decision date:** 2026-07-29  
**Market:** English / United Kingdom  
**Canonical owner:** `/blog/best-street-food-markets-bangkok/`

## Owner decision

Keep the existing market URL as the single English decision owner for **Bangkok street food, areas, neighbourhoods and food markets**.

- DFS returns 15 ranking keywords for this URL, including six `food market Bangkok` variants at volume 170, three `street food market Bangkok` variants at volume 90 and six `best food market Bangkok` variants at volume 70.
- The URL has two backlinks from two referring domains and appears in historical GSC and GA4 reports.
- `/blog/bangkok-street-food-beginners/` has no DFS rankings or backlinks. Its live SERP substantially overlaps the owner: Migrationology, Travelfish and Live Less Ordinary also recur for the market and neighbourhood queries.
- Consolidate `/blog/bangkok-street-food-beginners/` into the canonical owner. The owner must absorb first-timer ordering and evidence-based food-safety intent instead of leaving a thin duplicate.
- Keep `/city/bangkok/food/` as the broad city-food hub. It should introduce Bangkok food planning and link naturally to this specialist owner.
- Keep `/blog/thai-street-food-guide-2026/` as the Thailand-wide street-food owner. It should not duplicate the Bangkok neighbourhood selector.
- Keep specialist venue owners such as Chatuchak, Jodd Fairs and Lumpini; link to them only where they answer a narrower follow-up task.

## Independent DFS evidence

### Keyword demand

The existing UK-English DFS cluster (`2026-07-26-bangkok-street-food-dfs-cluster`) contains:

- `bangkok street food` and close variants: volume 390, KD 0–3;
- `best street food in bangkok` and close variants: volume 170, KD 0–3;
- market variants: volume 90;
- night-market and food-tour variants: volume 70;
- Chinatown variants: volume 40;
- area variants from the supplementary cluster: volume 10.

The low-volume neighbourhood vocabulary is a useful subtopic, not a separate owner. It helps the page answer the decision behind the larger street-food and market terms.

### Live SERP and genuine PAA sample

Ten independent UK-English SERPs produced **83 organic results, 51 PAA appearances and 31 unique PAA questions**. Most frequent domains were Reddit and Migrationology (9 appearances each), Tripadvisor and Travelfish (7 each), Live Less Ordinary (7), Feastography (6), Johnny Africa (5) and Eating Thai Food (3).

The two most repeated exact URLs were:

1. Travelfish, *Bangkok's top 50 street food stalls* — 7 SERPs.
2. Migrationology, *Top 16 Bangkok Street Food Sanctuaries* — 7 SERPs.

Repeated PAA intent groups:

- **Place:** What area has the best street food? Which part has the best food? What is the famous street or market?
- **Choice:** What must I eat? Which street food is Michelin rated?
- **Safety:** Is it okay to eat street food? How can a traveller reduce food-poisoning risk?
- **Planning:** What time should I visit Yaowarat? Where should I stay near street food?
- **Commercial bridge:** Is a Bangkok food tour worth it?

Research artifacts live in `seo/research/en/2026-07-28-*.json`, `seo/research/en/rankings/`, `seo/research/en/backlinks/` and `seo/research/en/sources/`.

## Content boundary

The owner must solve a route and selection problem, not publish a brittle permanent vendor ranking.

### Required sections

1. Hero with a clear promise: choose a Bangkok food area by mood, time and transport.
2. Fast selector for **iconic evening**, **old-Bangkok daytime**, **market + shopping**, **local neighbourhood** and **guided first taste**.
3. Honest distinction between a street-food area, fresh market, managed hawker venue and night market.
4. Neighbourhood cards for Yaowarat, Bang Rak/Charoen Krung, Victory Monument/Rang Nam, Nang Loeng/old Bangkok, Talat Phlu and Chatuchak/Or Tor Kor.
5. A three-route planner with a visual dotted line: first evening, daytime market and quieter local route.
6. Dish compass that links to existing specialist dish owners instead of duplicating recipes.
7. Same-day check panel: operating day, rain, vendor relocation, payment, transport and dietary communication.
8. Evidence-based food-safety section using WHO/CDC principles without declaring any vendor or market “safe”.
9. Food-tour decision: when guidance earns its cost and when self-guided is sufficient.
10. Contextual Amazon OneLink block with no fixed price or fake score.
11. Genuine PAA FAQ, related Bangkok owners and transparent source/method section.

### Claims to remove from the legacy article

- fabricated first-person or multi-year local experience;
- permanent vendor, price, opening-time and distance claims presented as current facts;
- claims that markets or stalls are categorically safe;
- “locals eat here”, “authentic”, “hidden gem” or “best” as unsupported proof;
- currency conversions and fixed meal budgets;
- ranking individual vendors when their presence and operating pattern cannot be checked live.

## Source hierarchy

Primary or authoritative sources take precedence for factual claims:

- Tourism Authority of Thailand: Chinatown/Yaowarat identity and broad visitor context;
- Thailand government: broad Bangkok street-food area context;
- WHO Five Keys to Safer Food: clean handling, separation, thorough cooking, temperature and safe water/material principles;
- CDC Thailand / Yellow Book: travel-health boundary and cautious risk wording;
- current transport or venue owner pages for any exact access fact included later.

Competitor parses are used only to understand search coverage and information architecture. Their lists, anecdotes, prices and recommendations are not copied as facts.

## Affiliate fit

- **Klook:** a guided Bangkok/Chinatown food-tour CTA is a natural commercial next step. Copy must ask the reader to check the current route, inclusions, cancellation terms, meeting point and live price.
- **Amazon OneLink:** include at most three products and only where they solve a recognisable task. Suitable candidates are a packable daypack, reusable water bottle and Thai cookbook as a “take the flavours home” reference. Use central `/go/` routes, `target="_blank"`, `rel="noopener noreferrer nofollow sponsored"` and full disclosure.
- Do not add hotel or transport widgets merely to increase affiliate density. Related planning routes can handle those decisions.

## Design direction

Build a bespoke English food-route editorial while reusing the established design primitives:

- luminous Yaowarat hero with dark jade glass navigation treatment;
- cream editorial canvas, serif display typography and orange micro-labels;
- asymmetric selector and neighbourhood cards rather than a repetitive card grid;
- illustrated Bangkok food-route line kept inside its own planning column;
- one unique market-kit visual for the Amazon block;
- responsive section navigation, keyboard-accessible FAQ and visible focus states;
- no decorative asset may carry essential text.

## Acceptance gates

- one H1 and one main landmark;
- canonical points to the retained owner and the beginners route returns a permanent redirect;
- English self-hreflang plus valid NL/x-default treatment according to the current locale-pairing system;
- Article, BreadcrumbList, FAQPage and ItemList schema where supported by visible content;
- no horizontal overflow at 390 px and no broken images;
- no internal links to consolidated routes;
- Amazon links resolve through the tagged OneLink-compatible registry;
- targeted lint, TypeScript, design, SEO and affiliate verifiers pass.
