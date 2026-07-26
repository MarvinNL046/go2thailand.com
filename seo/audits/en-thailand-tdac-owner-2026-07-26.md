# English Thailand TDAC owner audit — 2026-07-26

## Outcome

`/visa/digital-arrival-card/` is now the sole English owner for `Thailand digital arrival card`, `TDAC Thailand`, the official form, timing, required details, families, transit and corrections. The low-engagement legacy blog permanently redirects to this route.

## Search and consolidation

- Three DFS clusters produced 225 raw records, with 14,800 UK volume for the head term.
- Ten current English SERPs and their verbatim PAA were captured.
- Exact owner and legacy ranking/backlink checks were completed separately.
- Legacy blog: no ranking keywords, no backlink signal, GA4 traffic but declining/low engagement and contradicted official timing.
- Runtime legacy response: HTTP 308 to `/visa/digital-arrival-card/`.
- Twenty-nine English Markdown files were changed from legacy links to the canonical owner.
- The retired URL is absent from both sitemaps, RSS feed and generated SEO route inventory, and removed from `data/all-routes.json`.

## Design and interaction QA

- Premium official-first hero, glass domain card and reused TDAC editorial assets.
- Short-answer fact cards, official-domain strip, three-day calculator, five-step form route, interactive preparation checklist, family/transit scenarios, correction path, final checkpoint, exact-PAA FAQ, related guides and source method.
- Desktop checked at 1280 px with no overflow or broken loaded image.
- Mobile checked at 390 × 844: hero, sticky search, bottom navigation and open FAQ remain readable with no horizontal overflow.
- Checklist control updates `aria-pressed`, ready count and progress percentage.
- Date input is labelled and calculator logic uses the Thai arrival date minus two calendar days, matching the official arrival-day-inclusive rule.
- All five page-content and related-guide images loaded after the mobile FAQ route was reached.

## Metadata and schema

- Title: `Thailand Digital Arrival Card: Official TDAC Guide`.
- Canonical: `https://go2-thailand.com/visa/digital-arrival-card/`.
- Runtime alternates include English, Dutch and x-default.
- WebPage, FAQPage, BreadcrumbList, HowTo and ItemList schema match visible content; global Organization schema remains present.
- Ten visible exact PAA questions match FAQPage schema.

## Sources and claims

- Thailand Immigration Bureau user guide and FAQ are the primary rule sources and were checked against application version 2026.07.00.
- GOV.UK is used only for current UK-facing entry context.
- The page distinguishes TDAC from a visa and does not reproduce stale blog claims, invented penalties, a paid application service or fixed commercial prices.

## Affiliate and link QA

- Official TDAC links are unsponsored direct links to the Immigration Bureau domain and resolve to HTTP 200.
- Trip.com and 12Go links are secondary, use `nofollow sponsored noopener noreferrer`, dynamic `visa` SubIDs and visible disclosure; tested trackers returned HTTP 302.
- Internal routes `/visa/`, `/visa/tourist-visa/`, `/travel-gear/` and `/thailand-for-first-timers/` returned HTTP 200.
- Amazon/OneLink is intentionally absent because it would not solve the arrival-form task.

## Gates

- Targeted ESLint — passed.
- TypeScript `--noEmit --incremental false` — passed.
- Cannibalisation, design, affiliate and diff gates are run before the owner commit.
