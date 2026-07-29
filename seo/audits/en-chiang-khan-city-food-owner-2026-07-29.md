# English Chiang Khan city-food owner audit

**Route:** `/city/chiang-khan/food/`

**Owner:** `data/city-food/en/chiang-khan.ts`

**Template:** `components/city/CityFoodGuideTemplate.tsx`

## Search ownership

- Owns broad `Chiang Khan food guide`, `what to eat in Chiang Khan`, breakfast, Walking Street food-format and local-food-route intent.
- Delegates current named restaurants and review comparison to `/city/chiang-khan/top-10-restaurants/`.
- Delegates broad destination planning to `/city/chiang-khan/`, accommodation choice to `/best-hotels/chiang-khan/` and complete dish questions to linked `/food/.../` owners where one exists.
- All three live owners returned zero ranking terms and no reportable backlink summary, so no ranking-bearing copy or backlink target was displaced.

## Information gain and design

- Four meal systems distinguish early breakfast, confirmed Walking Street grazing, a shared Lao-Isaan table and an outer-river stop.
- Four geographic cards separate the working town, timber evening street, river patios and Kaeng Khut Khu route.
- Six dishes preserve local breakfast and snack identity while delegating existing specialist dish intent.
- A unique 1536 × 1024 ImageGen hero places khao piak sen, pan eggs, grilled sticky rice and fully cooked river shrimp beside the dawn Mekong, with usable negative space for the editorial headline.
- The visual day route follows the destination's actual rhythm from dawn breakfast through river time to the evening street.

## Commercial boundaries

- One disclosed Klook current-options exit uses `en-chiang-khan-city-food-owner` placement tracking.
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
- Agent-browser desktop 1280 × 720: meaningful content, no framework overlay, one H1, one main, 1280/1280 document width and no overflow. Visual inspection confirmed the dawn Mekong breakfast hero, legible headline and intact navigation.
- Agent-browser mobile 375 × 812: 375/375 document width, fixed destination search, fixed bottom navigation and no overflow. The opened FAQ answer rendered at `rgb(41, 53, 49)`, 14 px / 28 px and opacity 1.
- Accessibility audit returned zero WCAG A/AA violations. Two incomplete checks were limited to the injected Next.js dev-tools control and elements over gradients whose contrast axe could not calculate; FAQ contrast was verified directly.
- Exact canonical plus en, nl and x-default alternates are present; Organization, Article, BreadcrumbList and FAQPage schemas parse successfully.
- Ten FAQ details, zero unnamed links or buttons, zero duplicate IDs and exactly two Amazon anchors with `_blank` plus `noopener noreferrer nofollow sponsored`.
- The hero has `priority`, no lazy-loading attribute and a generated image preload. Next still emits its known development-only LCP notice, but the DOM proves the production preload signal exists.
- Both `/go/` routes return HTTP 307 to the approved `go2thailand-20` Amazon tag with `X-Robots-Tag: noindex, nofollow`.
- The owner plus all seven unique linked destination, attraction, restaurant, accommodation and dish routes returned HTTP 200.
- Layered full-site audit reused the verified baseline and refreshed this owner plus its new asset: 1,563/1,563 English sitemap routes have no hard error. The sole warning remains the unrelated pre-existing Rawai hotel-detail page with no incoming main-content link; Chiang Khan has zero errors and zero warnings.
- Refreshed design coverage: 1,562/1,563 premium, one homepage hybrid, zero routes without a redesign signature, 139 exact English owners, 94 routes with 195 contextual Amazon links across 18 slugs.
