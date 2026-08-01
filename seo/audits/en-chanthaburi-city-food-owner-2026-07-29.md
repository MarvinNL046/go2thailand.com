# English Chanthaburi city-food owner audit

**Route:** `/city/chanthaburi/food/`

**Owner:** `data/city-food/en/chanthaburi.ts`

**Template:** `components/city/CityFoodGuideTemplate.tsx`

## Search ownership

- Owns broad `Chanthaburi food guide`, `what to eat in Chanthaburi`, local-food, market-format and food-route intent.
- Delegates current named restaurants and review comparison to `/city/chanthaburi/top-10-restaurants/`.
- Delegates broad destination planning to `/city/chanthaburi/`, accommodation choice to `/where-to-stay/chanthaburi/` and complete dish questions to linked `/food/.../` owners.
- All three live owners returned zero ranking terms and no reportable backlink summary, so no ranking-bearing copy or backlink target was displaced.

## Information gain and design

- Four meal systems distinguish the working central market, a riverfront walk, a family-style local table and a planned orchard or coast meal.
- Four geographic cards prevent the city, old waterfront, fruit country and Gulf coast from being presented as one walkable circuit.
- Six dish cards link local identity to independent dish owners without turning this page into a shallow recipe list.
- A unique 1536 × 1024 ImageGen hero places Sen Chan noodles, moo chamuang, pepper and seasonal fruit beside the river, with dark negative space for the editorial hero.
- The day route makes the map decision explicit: complete the flexible city circuit before choosing one outer branch.

## Commercial boundaries

- One disclosed Klook current-options exit uses `en-chanthaburi-city-food-owner` placement tracking.
- Two Amazon OneLink products are limited to relevant Thai cooking technique: the approved cookbook and granite mortar.
- Product links open in a new tab, use `noopener noreferrer nofollow sponsored` and ask visitors to check the current price rather than publishing a fake or stale price.
- No unrelated packing product, hotel offer, fixed meal price or fabricated restaurant ranking is inserted.

## Required final gates

- TypeScript, targeted lint, design-system verification, affiliate verification and cannibalisation check.
- Desktop and 375 px mobile rendering, horizontal-overflow, heading, landmark, FAQ contrast and unnamed-control checks.
- Exact canonical, en/nl/x-default hreflang, Article/Breadcrumb/FAQ schema and all internal targets.
- Amazon redirects must return 307 with the approved Associate tag and noindex/nofollow response headers.
- Full English route audit, refreshed design coverage, clean diff and local commit.

## Final verification

- TypeScript passed with `--noEmit --incremental false`; targeted ESLint returned zero errors and only the two expected ignored-data warnings.
- Design-system verification passed with seven primitives and 34 pilot templates; Amazon verification passed with 16 used slugs and 20 registered products; cannibalisation returned zero hard collisions and zero warnings.
- Agent-browser desktop 1280 × 720: meaningful content, no framework overlay, one H1, one main, 1280/1280 document width and no overflow. Visual inspection confirmed the dark river-table hero, legible editorial hierarchy and intact navigation.
- Agent-browser mobile 375 × 812: 375/375 document width, fixed destination search, fixed bottom navigation and no overflow. The opened FAQ answer rendered at `rgb(41, 53, 49)`, 14 px / 28 px and opacity 1.
- Accessibility audit returned zero WCAG A/AA violations. Two incomplete checks were limited to the injected Next.js dev-tools control and elements over gradients whose contrast axe could not calculate; FAQ contrast was verified directly.
- Exact canonical plus en, nl and x-default alternates are present; Organization, Article, BreadcrumbList and FAQPage schemas parse successfully.
- Ten FAQ details, zero unnamed links or buttons, zero duplicate IDs and exactly two Amazon anchors with `_blank` plus `noopener noreferrer nofollow sponsored`.
- Browser QA exposed duplicate React keys because two local dishes intentionally delegate to the same restaurant owner. The shared template now keys dish cards by URL plus title; a clean reload no longer reports that application warning.
- Next emits a development-only ISR-manifest HMR notice. The hero itself has `priority`, no lazy-loading attribute and a generated image preload, so the accompanying development LCP warning does not reflect a missing production preload.
- Both `/go/` routes return HTTP 307 to the approved `go2thailand-20` Amazon tag with `X-Robots-Tag: noindex, nofollow`.
- The owner plus all eight unique linked destination, attraction, restaurant, accommodation and dish routes returned HTTP 200.
- Layered full-site audit reused the verified baseline and refreshed this owner plus its new asset: 1,563/1,563 English sitemap routes have no hard error. The sole warning remains the unrelated pre-existing Rawai hotel-detail page with no incoming main-content link; Chanthaburi has zero errors and zero warnings.
- Refreshed design coverage: 1,562/1,563 premium, one homepage hybrid, zero routes without a redesign signature, 138 exact English owners, 93 routes with 193 contextual Amazon links across 18 slugs.
