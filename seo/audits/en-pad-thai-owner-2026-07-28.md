# English Pad Thai owner audit

**Owner:** `/food/pad-thai/`

**Consolidated route:** `/blog/pad-thai-street-food-vs-restaurant-homemade/` → HTTP 308 to `/food/pad-thai/`

**Status:** production-ready after independent English research, design, desktop/mobile QA and layered runtime audit

## Research and owner decision

- Three DataForSEO clusters: 435 raw keyword records.
- Ten UK-English SERPs: 76 organic results, 58 People Also Ask records and 43 unique genuine questions.
- Three usable full competitor parses, one primary TAT capture, and exact ranking/backlink checks for both candidate owners.
- Primary query: `what is pad thai` — UK volume 2,400, KD 26.
- Neither candidate URL returned rankings or a reportable backlink summary signal. The broad `/food/pad-thai/` route therefore retains dish intent; the overlapping, outdated blog consolidates into it.
- The retired English blog is absent from the English sitemap and RSS feed. The independent Dutch blog remains in the Dutch sitemap and is not silently consolidated.

## Experience and visual QA

- New reusable `dish-editorial` template with a unique, project-owned ImageGen hero.
- Taste compass, eight ingredient-role cards, allergy and vegetarian boundaries, street/restaurant/home decision cards, three-step ordering route, home-cooking sequence, cooking-class context, ten PAA answers, related guides and a visible method section.
- Desktop QA at 1280 × 720 and mobile QA at 390 × 844 passed with no horizontal overflow, clipped H1, hidden mobile navigation or unreadable FAQ answer.
- The hero and all three related-card images return HTTP 200. Browser console: zero errors and zero warnings.

## SEO, linking and monetisation

- Exactly one H1 and one `<main>`.
- Canonical: `https://go2-thailand.com/food/pad-thai/`.
- Structured data: `Article`, `BreadcrumbList`, `ItemList`, `FAQPage` and sitewide `Organization`.
- One Klook cooking-class exit and one Amazon OneLink cookbook exit use current-option/current-price language, visible disclosures and `noopener noreferrer nofollow sponsored`.
- Sixteen English source articles now link directly to `/food/pad-thai/`; misleading “street always wins” anchor copy and one incorrect pad-krapow target were corrected.
- Consolidated posts are filtered from blog indexes, featured lists, category/tag lists, related recommendations and adjacent-post navigation.

## Verification

- `npx tsc --noEmit --incremental false`: passed.
- Targeted ESLint for the two new dish components: passed with zero findings.
- `npm run seo:cannibalization`: 0 hard collisions, 0 warnings.
- `npm run affiliate:verify`: passed; 16 used Amazon slugs and 20 registered products remain valid.
- `npm run design:verify`: passed; 7 primitives and 26 pilot templates.
- Generated inventory: 2,280 URLs — 1,587 English and 693 Dutch.
- Layered runtime report: `seo/audits/runtime/en-pad-thai-final-v3-2026-07-28.json`.
- Runtime result: **1,587/1,587 English sitemap routes without hard errors and zero warnings**; all 1,921 non-sitemap targets and 791 local image sources have a current passing result.
