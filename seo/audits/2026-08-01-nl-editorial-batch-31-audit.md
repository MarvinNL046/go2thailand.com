# NL editorial batch 31 audit

Date: 2026-08-01

Exact scope: seven bodies, seven typed profiles, seven route-owned heroes, one research note and this audit. Central completion, keyword, manifest, sitemap, Next config and ledger files were not edited.

## Outcomes

| Route | Cluster | Lifecycle | Primary keyword | Redirect recommendation |
|---|---|---|---|---|
| `thailand-travel-fair-2026-qsncc-bangkok` | events | archived/noindex/elapsed | Thailand Travel Fair 2026 archief | central TTF 2026 visitor guide |
| `thailand-travel-packages-guide` | planning | ready/index | Thailand pakketreis | none |
| `travel-insurance-thailand-guide` | planning | ready/index | reisverzekering Thailand | none |
| `ultimate-thailand-itinerary-2026` | planning | archived/noindex/superseded | Thailand reisroute verzamelpagina archief | `/nl/itineraries/` |
| `vegan-thai-food-guide` | food | archived/noindex/superseded | vegan eten Thailand archief | `/nl/travel-guides/vegetarian-vegan-thailand/` |
| `what-is-thai-food-cuisine-guide` | food | archived/noindex/superseded | Thaise keuken brede gids archief | `/nl/food/` |
| `what-makes-thai-food-spicy` | food | ready/index | wat maakt Thais eten pittig | none |

## Editorial and safety controls

- Removed expired event CTAs, fixed prices, universal route claims and guaranteed vegan dish lists.
- Package guide compares total scope and legal form without claiming individual rights automatically apply.
- Insurance guide provides a policy checklist, not coverage, medical or insurer advice.
- Spiciness guide avoids universal Scoville numbers, health promises and pronunciation guarantees.
- No affiliate blocks: current terms and personal fit outweigh a commercial exit for these routes.
- Internal links point to accepted owners and specialist routes.

## Design and assets

Each route has differentiated blocks and a unique imagegen hero. Final assets are 1600 × 900 WebP, quality 84 and below 450 KB.

## QA

- Targeted typed-profile loader: pass, 7/7.
- Image metadata: pass, 7/7 at exactly 1600 × 900 and below 450 KB.
- `npm run seo:verify:nl-editorial-assets`: pass; 245 accepted heroes local, matched and unique while indexable.
- `npx tsc --noEmit`: pass, exit 0.
- `npm run design:verify`: pass; 7 primitives and 34 pilot templates.
- `npm run affiliate:verify`: pass; 17 used slugs and 21 registered products.
- `npm run seo:cannibalization`: pass; 0 hard collisions and 0 warnings.
- Encoding scan: pass; no mojibake markers in owned text files.
- Scoped diff/whitespace: pass for exact 23 owned files; no trailing whitespace.
- Forbidden central-file status: clean.
