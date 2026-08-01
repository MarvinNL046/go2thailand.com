# NL high-risk food review — batch C audit

Date: 2026-08-01.

## Scope

- `pad-thai-street-food-vs-restaurant-homemade`
- `som-tam-regional-variations-thailand`
- `southern-thai-food-fiery-flavors`

Three bodies and three typed profiles were fully rewritten. Existing route-owned heroes were preserved. One research document and this audit complete the eight-file scope.

## Content controls

- Dish/region-specific ingredient maps replace the prior generic template.
- Safety language follows WHO principles without promising that visual observation proves safety.
- Allergens and cross-contact are framed as questions for the concrete recipe and workplace.
- No fixed price, schedule, medical advice or universal suitability claim.
- Pad thai’s unnecessary Amazon block was removed; batch affiliate count is zero.

## QA

- Targeted loader: 3/3 `ready` profiles passed.
- Accepted editorial family: passed, 253/253 accepted and 252 article profiles verified.
- Editorial asset family: passed, 252 accepted heroes local, matched, unique while indexable and no larger than 450 KB.
- Editorial risk audit: all three moved from score 38 to score 4. Bodies contain 574, 563 and 609 words respectively, with three frontmatter sources each; only the neutral `minder-dan-800-woorden` flag remains.
- Schema/meta render tests: 2/2 passed.
- Cannibalisation: 0 hard collisions and 0 warnings.
- Affiliate verification: passed; the batch now contains no affiliate block.
- TypeScript `--noEmit --incremental false`: passed.
- Encoding check: valid UTF-8, no replacement/mojibake patterns in the three bodies.
- Existing hero check: all three local route-owned WebPs remain under 450 KB at 1800×1012 (effectively 16:9); preserved as requested.
- Scoped `git diff --check`: passed with line-ending notices only.
- Design verification reached one pre-existing central condition: `Street-food owner is missing from a locale sitemap`. The sitemap is explicitly out of scope and was not changed.
- Full NL runtime verification was started but did not return a completion line within the review window; targeted loader plus schema/meta rendering passed.
