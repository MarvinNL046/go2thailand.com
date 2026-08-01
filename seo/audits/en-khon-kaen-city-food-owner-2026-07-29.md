# English Khon Kaen city-food owner audit

**Route:** `/city/khon-kaen/food/`

**Owner:** `data/city-food/en/khon-kaen.ts`

**Template:** `components/city/CityFoodGuideTemplate.tsx`

## Search ownership

- Owns broad `Khon Kaen food guide`, what-to-eat, breakfast, market, vegetarian-navigation and food-zone intent.
- Delegates current named restaurants and review comparison to `/city/khon-kaen/top-10-restaurants/`.
- Delegates broad destination and province routing to `/city/khon-kaen/`, accommodation to `/best-hotels/khon-kaen/`, attractions to `/city/khon-kaen/attractions/` and complete som tam, larb and pla pao questions to independent dish owners.
- All three live Khon Kaen owners returned zero ranking terms and no reportable backlink summary, so no ranking-bearing copy or backlink target was displaced.

## Information gain and design

- Four meal systems distinguish Thai-Vietnamese breakfast, a working-market lunch, the shared Isaan table and contemporary regional cooking.
- Four geographic cards separate Sri Chan/centre, Bueng Kaen Nakhon, Kangsadan/university and a current evening-market circuit.
- Six dish directions preserve breakfast and Isaan identity while delegating existing specialist dish intent.
- A unique 1536 x 1024 ImageGen hero places fully cooked grilled chicken and pork, som tam, sticky rice, vegetables and hot soup beside Bueng Kaen Nakhon at blue hour with usable headline space.
- The visual day route moves from early breakfast through the centre and creative-city layer to a shared lake-side dinner.

## Commercial boundaries

- One disclosed Klook current-options exit uses `en-khon-kaen-city-food-owner` placement tracking.
- Two Amazon OneLink products are limited to relevant Thai cooking technique: the approved cookbook and granite mortar.
- Product links open in a new tab, use `noopener noreferrer nofollow sponsored` and ask visitors to check the current price instead of publishing a fake or stale price.
- No unrelated packing product, hotel offer, fixed meal price, permanent market schedule or fabricated restaurant ranking is inserted.

## Required final gates

- TypeScript, targeted lint, design-system verification, affiliate verification and cannibalisation check.
- Desktop and 375 px mobile rendering, horizontal-overflow, heading, landmark, FAQ contrast and unnamed-control checks.
- Exact canonical, en/nl/x-default hreflang, Article/Breadcrumb/FAQ schema and all internal targets.
- Amazon redirects must return 307 with the approved Associate tag and noindex/nofollow response headers.
- Full English route audit, refreshed design coverage, clean diff and local commit.

## Final verification

- TypeScript passed with `--noEmit --incremental false`; targeted ESLint returned zero errors and only the two expected ignored-data warnings.
- Design-system verification passed with seven primitives and 34 pilot templates; Amazon verification passed with 16 used slugs and 20 registered products; the initial cannibalisation gate correctly identified the destination's old secondary `khon kaen food` claim, which was transferred to this dedicated owner. The final gate returned zero hard collisions and zero warnings.
- Agent-browser desktop 1280 x 720: meaningful content, no framework overlay, one H1, one main, 1280/1280 document width and no overflow. Visual inspection confirmed the lake-side Isaan table, legible headline and intact navigation.
- Agent-browser mobile 375 x 812: 375/375 document width, fixed destination search, fixed bottom navigation and no overflow. The opened FAQ answer rendered at `rgb(41, 53, 49)`, 14 px / 28 px and opacity 1.
- Accessibility audit returned zero WCAG A/AA violations. Two incomplete checks were limited to the injected Next.js dev-tools control and elements over gradients or partially obscured by fixed mobile navigation whose contrast axe could not calculate; FAQ contrast was verified directly.
- Exact canonical plus en, nl and x-default alternates are present; Organization, Article, BreadcrumbList and FAQPage schemas parse successfully.
- Ten FAQ details, zero unnamed links or buttons, zero duplicate IDs and exactly two Amazon anchors with `_blank` plus `noopener noreferrer nofollow sponsored`.
- The hero has no lazy-loading attribute and two image preloads are present. Next still emits its known development-only LCP notice, but the DOM proves the production preload signal exists.
- Both `/go/` routes return HTTP 307 to the approved `go2thailand-20` Amazon tag with `X-Robots-Tag: noindex, nofollow`.
- The owner plus all seven unique linked destination, attraction, restaurant, accommodation and dish routes returned HTTP 200.
- Layered full-site audit reused the verified baseline and refreshed this owner plus its new asset: 1,563/1,563 English sitemap routes have no hard error. The sole warning remains the unrelated pre-existing Rawai hotel-detail page with no incoming main-content link; Khon Kaen has zero errors and zero warnings.
- Refreshed design coverage: 1,562/1,563 premium, one homepage hybrid, zero routes without a redesign signature, 141 exact English owners, 96 routes with 199 contextual Amazon links across 18 slugs.
