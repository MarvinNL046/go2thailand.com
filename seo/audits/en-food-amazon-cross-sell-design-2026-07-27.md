# English food Amazon cross-sell design audit — 2026-07-27

## Outcome

The shared English dish-page affiliate block now uses the premium Go2Thailand visual system instead of the legacy blue CTA. One component update improves every English dish owner rendered by `pages/food/[slug].tsx` while preserving the separately designed Dutch dish experience.

## Editorial and commercial rules

- Products appear only after the dish's substantive recipe, ingredient, cultural and safety content.
- The selector returns one to three products from the approved central registry; it does not create broad or unrelated product grids.
- Every dish receives the researched Thai cookbook as the general technique reference.
- Curry, paste, som tam, salad, larb, spice and sauce intent may add the granite mortar.
- Rice, khao, sticky-rice and mango intent may add the rice cooker.
- All retail CTAs say `Check current price at Amazon`; no fixed price, rating, seller or availability claim is stored.
- Klook and GetYourGuide CTAs say to check current classes or tours and remain secondary to the editorial page.
- The disclosure explains Amazon Associate commission, OneLink routing and country-level product, price, seller and delivery variation.

## Design and accessibility

- Premium jade/cream composition with a restrained dot texture, dotted route cue, editorial display typography and low-noise product cards.
- Desktop: the teaching decision and provider choices form a balanced split; product cards align below without horizontal overflow.
- Mobile 390 × 844: provider cards and product cards stack vertically, remain keyboard links and produce no horizontal overflow.
- Semantic `section`, labelled heading, descriptive link text and visible focus rings are present.
- React review: hooks are unconditional, props are destructured, configuration is static, keys are stable and no client state or effect was added.

## Verified product decisions

- Green Curry: cookbook + granite mortar.
- Mango Sticky Rice: cookbook + rice cooker.
- Pad Thai: cookbook only.
- All product and provider anchors render `noopener noreferrer nofollow sponsored`.
- The three `/go/` product routes return HTTP 307 to `www.amazon.com` with the approved `go2thailand-20` Associate tag. OneLink may localise eligible traffic after Amazon receives the tagged URL.

## Gates

- TypeScript: pass with `npx tsc --noEmit --incremental false`.
- Targeted ESLint: pass for `components/FoodAffiliateCTA.tsx`.
- Design-system verification: pass, seven primitives and 26 pilot templates.
- SEO cannibalisation: zero hard collisions and zero warnings.
- Amazon registry: pass, 18 used slugs and 20 registered products.
- `git diff --check`: pass.
