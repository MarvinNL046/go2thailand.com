# NL editorial food, planning, tourism and Nan — batch 29 audit

Date: 2026-08-01
Scope: seven routes, 23 files. Trat and Koh Kood excluded.

## Deliverables

- 7 fully rewritten Dutch Markdown bodies.
- 7 typed editorial JSON profiles.
- 7 route-owned 1600×900 WebP heroes.
- This audit and the paired current-web research record.

Lifecycle: six `ready`/indexable routes; FETTA `archived` with `noindex: true`. Redirects: none. Affiliates: none.

## Image generation log

Tool: built-in image generation, no reference images. Each prompt explicitly requested a unique, editorial, text-free 16:9 hero and prohibited logos or fake certification marks where relevant.

1. `visama-explorer-nan-eco-glamping-tented-camp-2026-hero.webp` — photorealistic eco-luxury tented camp in the green Nan mountains near Bo Kluea, warm morning light, real travel-editorial restraint.
2. `does-thai-food-have-msg-hero.webp` — overhead Thai kitchen wok with herbs, sauces, umami ingredients and a small neutral bowl of crystalline seasoning, no health symbolism.
3. `fetta-14-billion-baht-relief-package-thailand-tourism-2026-hero.webp` — sober unresolved Thai tourism-industry roundtable with airport context, no money pile, approval stamp or promotional mood.
4. `halal-food-thailand-guide-hero.webp` — Muslim Thai family ordering at a southern market, visible kitchen interaction, no invented halal logo.
5. `history-of-thai-cuisine-hero.webp` — historically layered Thai food still life linking regional produce, household tools, market vessels and refined tableware without a single-origin cliché.
6. `how-long-spend-thailand-hero.webp` — traveler planning a flexible Thailand route using map and movable day/base cards, no readable text or fixed itinerary.
7. `is-thai-food-gluten-free-hero.webp` — Thai chef and traveler comparing rice noodles, wheat noodles and sauce bottles with separate utensils, no fake gluten-free seal.

Generated PNG masters remain in `C:/Users/M_Smi/.codex/generated_images/019fbb16-f6f3-7930-8689-77bfccc4ab6b/`. Workspace derivatives use Sharp at 1600×900, WebP quality 82.

## Editorial controls

- MSG: separates added MSG, natural glutamate, gluten and sodium; no symptom diagnosis or personal safety guarantee.
- Gluten: no dish whitelist; sauces, processed ingredients and cross-contact are explicit; US sources are not framed as Thai law.
- Halal: separates certification, ownership, partial menu and pork-free claims; correct branch and current validity must be checked.
- History: rejects monocausal origin myths and represents regional, household, women’s, migration, market and court contributions.
- FETTA: amount and date only as historic attributed proposal; no approved-policy, entitlement, discount or application claim.
- Visama and planning: no fixed commercial price, service schedule, transfer duration, weather outcome or safety guarantee.

## QA record

- `npm run seo:cannibalization` — passed: 0 hard collisions, 0 warnings.
- Targeted `requireNlEditorialProfile` load — passed for 7/7 routes; intended clusters, lifecycle and layouts returned.
- `npm run seo:verify:nl-editorial:accepted` — passed: 218/253 accepted, 217 verified article profiles, 14 in-progress ignored.
- `npm run seo:verify:nl-editorial-assets` — passed: 217 accepted heroes local, matched, unique while indexable and no larger than 450 KB.
- Batch hero inspection — passed: seven distinct SHA-256 hashes, 1600×900, 68–253 KB.
- `npx tsx --test tests/editorial-schema.test.tsx tests/editorial-meta.test.tsx tests/pseo-editorial-date.test.ts` — passed: 3/3.
- `npx tsc --noEmit --incremental false` — passed.
- `npm run design:verify` — passed: 7 primitives and 34 pilot templates.
- `npm run affiliate:verify` — passed: 17 used slugs and 21 registered products; batch contains no affiliate block.
- Scoped content-risk grep — no fixed commercial price, schedule, safety-guarantee or superlative pattern matched. FETTA’s amount remains only an attributed historical proposal.
- Scoped `git diff --check` — passed; line-ending notices only.
- Scoped `git status --short` — exactly 23 intended files: 7 bodies, 7 profiles, 7 heroes and 2 documents.
- Full `seo:verify:nl-runtime` was started but did not return a completion line within the batch window; targeted loader plus schema/meta render tests passed and are the scoped runtime evidence.
