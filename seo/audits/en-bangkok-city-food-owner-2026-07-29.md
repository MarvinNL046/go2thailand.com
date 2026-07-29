# English Bangkok city-food owner audit — 2026-07-29

## Owner decision

- Canonical owner: `/city/bangkok/food/`.
- This URL owns the broad decision: what kind of meal to choose, which Bangkok district fits, what dishes to start with and how to build one realistic food day.
- `/city/bangkok/top-10-restaurants/` keeps restaurant and address-list intent. It has six measured ranking keywords and is not consolidated.
- `/blog/best-street-food-markets-bangkok/` keeps market and neighbourhood-comparison intent. It has fifteen measured ranking keywords plus two backlinks from two referring domains and is not consolidated.
- `/thailand-street-food/`, `/travel-guides/thai-cuisine-food-guide/` and the individual `/food/` owners retain countrywide stall, cuisine and dish intent.

## Independent English research

- Three DFS keyword clusters: `bangkok food guide`, `what to eat in bangkok` and `best food in bangkok`.
- Across the clusters: 142 raw keyword records and up to 50 competitor domains.
- Five current UK-English SERPs: `bangkok food guide`, `what to eat in bangkok`, `best food in bangkok`, `bangkok food areas` and `is bangkok good for food`.
- Captured 41 organic results and 23 genuine People Also Ask appearances.
- Three full competitor parses: Hot Thai Kitchen, Eating Thai Food and Migrationology. A current Michelin result returned zero parseable markdown and was recorded without fabricating a replacement.
- Primary-source checks: Tourism Authority of Thailand Bangkok, Chinatown and local-food-format pages plus WHO Five Keys to Safer Food.
- Exact ranking and backlink checks were run for all three Go2Thailand candidate owners before choosing the boundary.

## Information gain and design

- New reusable `CityFoodGuideTemplate` separates copy/data from layout so later city-food owners can receive independent local research without redesigning the page family.
- The Bangkok pilot contains four meal-format decisions, four district routes, six specialist dish handoffs, a dotted four-stop day plan, four practical checks and four bounded ordering phrases.
- Ten FAQ answers use current genuine PAA wording. They avoid universal best-dish, permanent venue, stale price and guaranteed food-safety claims.
- Article, BreadcrumbList and FAQPage schema render on the owner.
- All imagery uses `next/image` with explicit responsive `sizes`; the hero is prioritised and below-fold images remain lazy.

## Affiliate assessment

- Klook appears once as a live food-tour comparison. The CTA tells visitors to check the current district, tastings, group size, dietary handling and cancellation terms.
- Amazon appears only after the editorial bridge from tasting in Bangkok to practising at home: one Thai cookbook and one granite mortar.
- Both links use the central `/go/` registry, open in a new tab, carry `nofollow sponsored` and redirect to Amazon with `tag=go2thailand-20`; OneLink can localise eligible traffic.
- No product or tour price is copied into the page. CTAs explicitly request the current provider price or options.
- Trip.com and unrelated travel gear are omitted because they do not solve this page's food decision.

## Verification

- Local route: HTTP 200 at `http://localhost:3000/city/bangkok/food/`.
- One H1 and one main landmark; premium marker `city-food-guide-en`.
- Canonical: `https://go2-thailand.com/city/bangkok/food/`.
- Hreflang: EN self-reference and NL `/nl/city/bangkok/food/` verified in rendered HTML.
- Mobile: 375/375 document width with no horizontal overflow.
- Desktop and mobile full-page screenshots inspected; section rhythm, hierarchy, cards, timeline, affiliate block, FAQs and footer render coherently.
- Axe WCAG 2 A/AA: zero violations; gradient-backed elements remain untestable rather than failed.
- Ten FAQ accordions and four JSON-LD scripts render.
- Both Amazon routes return 307 with `tag=go2thailand-20` and `X-Robots-Tag: noindex, nofollow`.
- Focused internal-link check found two legacy spelling mismatches; they were corrected to `/food/pad-krapow/` and `/food/hoy-tod/`.
- A subsequent full 1,563-route English audit also exposed two stale links on the adjacent Thailand street-food owner and one stale cross-locale alternate on the Thai-cuisine owner. Khao pad now targets `/food/thai-fried-rice/`, the unsupported Gai Yang detail link was removed, and the English Thai-cuisine guide now alternates to the live Dutch `/nl/food/` owner instead of a consolidated blog URL.
- The upgraded 2,266-route rendered-coverage audit now measures Amazon by locale: EN renders contextual Amazon links on 80/1,563 routes with 166 links across 18 product slugs; NL renders them on 71/703 routes with 168 links across 16 slugs. This proves English Amazon integration is not absent while still exposing distribution differences for later intent-led audits.
