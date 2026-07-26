# Best SIM/eSIM blog consolidation audit

**Source owner candidate:** `/blog/best-sim-card-esim-thailand-tourist-guide-2026/`

**English destination:** `/travel-guides/sim-card-thailand/`

**Dutch destination:** `/nl/travel-guides/sim-card-thailand/`

**Decision date:** 26 July 2026

**Decision:** permanent locale-specific consolidation

## Why redesigning the blog would be harmful

The blog targets the same broad decision as the premium connectivity owner: travel eSIM versus physical Thai SIM, airport purchase, carriers, data use and setup. A third premium page would divide internal links and topical signals between:

1. `/travel-guides/sim-card-thailand/` — broad connection-choice owner;
2. `/esim/` — commercial Airalo/Yesim/Saily provider-comparison owner;
3. the old blog — a shorter duplicate of both.

The useful outcome is therefore a stronger two-owner cluster, not another visually polished duplicate.

## Evidence

- DFS ranking export for the exact English blog URL: **0 ranking keywords**.
- DFS backlink export: **no backlink or referring-domain signal returned**.
- GA4 priority window: 31 views, 21 active users, 1.48 views per active user and 11 seconds average engagement.
- Earlier GA4 weeks repeatedly reported roughly 12–23% engagement and 0.1–5 seconds average engagement, with only a modest recent improvement.
- The old article is four minutes long, uses volatile sample-price ranges, contains blanket network claims and says eSIMs are generally data-only—an increasingly inaccurate simplification.
- Existing independent NL research and the new English provider/connection research already support the destination owner architecture.

## Implementation

- Added an English permanent redirect to `/travel-guides/sim-card-thailand/`.
- Added a Dutch permanent redirect to `/nl/travel-guides/sim-card-thailand/`.
- Kept both source Markdown files in version control for editorial traceability; the blog loader filters consolidated posts from listings and feeds.
- Replaced 48 internal blog-source links with the direct locale-correct destination instead of leaving internal redirect hops.
- Regenerated English and Dutch sitemaps, route inventory and RSS feed.
- Removed the retired route from `data/all-routes.json`.

## Runtime and indexation QA

- English source: HTTP **308 Permanent Redirect** to `/travel-guides/sim-card-thailand/`.
- Dutch source: HTTP **308 Permanent Redirect** to `/nl/travel-guides/sim-card-thailand/`.
- Both destination owners: HTTP 200.
- Retired slug absent from `public/sitemap.xml`.
- Retired slug absent from `public/sitemap-nl.xml`.
- Retired slug absent from `public/feed.xml`.
- Retired slug absent from `seo/inventory/routes.csv`.
- Retired slug absent from `data/all-routes.json`.
- No remaining internal Markdown href points at the retired blog route.

## Link-equity and user-experience rationale

The destination preserves the source intent more closely than `/esim/`: a reader clicking “SIM card or eSIM?” still receives the complete connection-type decision before commercial provider selection. The premium broad guide then links naturally to `/esim/` for travellers who decide on a travel eSIM. This sequence is clearer for readers and creates an intentional parent-to-commercial-owner path.
