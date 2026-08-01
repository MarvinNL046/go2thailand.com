# NL editorial batch 32 audit

Date: 2026-08-01.

## Scope and lifecycle

- Ready/indexable: Blue Elephant cooking school; Thailand island hopping.
- Archived/noindex fallback plus permanent redirect recommended: two Bangkok street-food routes, Bangkok night markets, generic best time to visit.
- No central redirect, sitemap, keyword, ledger or completion file changed.

## Imagegen log

Built-in image generation, separate prompt per route, no references. Blue Elephant prompt: candid premium Bangkok cooking class in a heritage interior. Island-hopping prompt: traveler route-planning on a pier with Andaman/Gulf contrast, explicitly no Trat/Koh Kood landmark. Archive prompts: covered Bangkok food market; beginner ordering at a clean street-food workstation; mixed food-and-clothing Bangkok night market; seamless regional-weather contrast. All prohibit text/logos. PNG masters remain in `C:/Users/M_Smi/.codex/generated_images/019fbb16-f6f3-7930-8689-77bfccc4ab6b/`; six workspace heroes are route-owned 1600×900 WebP derivatives under 450 KB.

## QA

- Cannibalisation: passed, 0 hard collisions and 0 warnings.
- Targeted profile loader: 2/2 ready routes passed.
- Accepted editorial family: passed, 240/253 accepted and 239 verified article profiles.
- Editorial assets: passed; all accepted heroes local, matched, unique while indexable and no larger than 450 KB.
- Schema/meta render tests: 2/2 passed.
- TypeScript `--noEmit --incremental false`: passed.
- Design verification and affiliate verification: passed; this batch adds no affiliate.
- UTF-8 replacement-character check: passed.
- Scoped `git diff --check`: passed with line-ending notices only.
- Final changed scope: 20 files — 6 bodies, 6 profiles, 6 heroes and 2 documents.
- Final targeted loader: 6/6 passed; two `ready`/indexable and four `archived` with `noindex: true`.
- Final accepted-family check: passed, 240/253 accepted and 239 verified article profiles; archived fallbacks are intentionally outside the accepted/indexable count.
- Final schema/meta render: 2/2 tests passed.
- Direct six-asset inspection: all 1600×900, 124–249 KB and six distinct SHA-256 hashes.
