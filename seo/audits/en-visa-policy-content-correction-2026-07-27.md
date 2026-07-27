# English visa-policy content correction — 27 July 2026

## Trigger

The new English visa overview and visa-exemption owner use the current UK-facing official position: up to 60 days for an ordinary British passport at the 27 July 2026 check, with the London embassy warning that the temporary scheme can change. A sitewide search found older evergreen and news copy presenting a 60-to-30-day proposal as confirmed, imminent or already implemented.

## Consolidation decision

Three evergreen blog routes competed with the researched premium owners:

- `/blog/thailand-visa-guide-2026/`
- `/blog/thailand-visa-changes-2026/`
- `/blog/thailand-visa-free-stay-cut-60-to-30-days-2026/`

Independent DataForSEO checks returned zero ranking keywords and no reportable backlinks for all three URLs. They now permanently redirect to `/visa/` or `/visa/visa-free-entry/`, are excluded from blog listings and the generated RSS feed, and preserve their markdown source for traceability.

## Evergreen corrections

- Replaced internal links to the consolidated guide and proposal article with direct owner links across 45 English blog files.
- Corrected current-rule statements in destination guides, first-timer content, itineraries, event guides, safety content, insurance copy and policy commentary.
- Removed universal “most nationalities get 30 days” wording and replaced it with passport/purpose-specific guidance.
- Removed fixed-price and automatic-extension implications where the live procedure or exchange rate is required.
- Replaced repeated-entry and border-run certainty with checkpoint discretion and a purpose-led visa route.

## News archive treatment

Six historical reports remain accessible as dated journalism. Each now has a 27 July 2026 current-status notice. Three reports whose metadata presented a 30-day implementation as current were retitled and redescribed to distinguish the reported proposal from the official UK-facing rule still in force.

The archive is not silently rewritten: the reported claim remains attributed to its original source, while the top-of-page correction and opening paragraph stop it being used as present travel instruction.

## Data-layer repair

- `data/visas/visa-free-entry.json`: neutral passport-specific title, current-rule description, official TDAC route, discretionary admission/extension language, no fixed insurance estimate, no claimed universal land-entry limit and current metadata.
- `data/visas/visa-extension.json`: removed the predicted 60-to-30 arithmetic and guaranteed border-reset wording.
- `data/visas/tourist-visa.json`: removed “guaranteed entry”, reduction-based sales language and fixed-value recommendation.
- `lib/i18n/visa-index.ts`: replaced the April proposal snippet with a dated, passport-specific live-source reminder.

## Verification evidence

- DataForSEO: three URL-level ranking and backlink pairs completed before consolidation; all three had no ranking/backlink equity returned.
- TypeScript passed with `npx.cmd tsc --noEmit --incremental false`.
- All edited visa JSON files parsed successfully.
- ESLint passed for `lib/blog.js`.
- Consolidated routes returned HTTP 308 to their intended canonical owners.
- A corrected news route returned HTTP 200 and rendered its current-status correction at 390 px with no horizontal overflow (375 px client and scroll widths).
- Regenerated RSS contains zero occurrences of the three consolidated slugs.
- Active English blog scan returned no remaining current 30-day exemption/reduction claim outside the intentionally retained, redirected markdown source files.
- Regenerated English and Dutch sitemaps contain zero occurrences of the three consolidated English slugs.
- Repaired the shared premium comparison, journey, island-hopping and trip-length templates so every affected route exposes exactly one document-level `<main>` landmark.
- Final layered English audit (`seo/audits/runtime/en-visa-policy-final-2026-07-27.json`): **1599/1599 sitemap routes passed**, with **zero hard errors and zero warnings**. It also reused verified checks for 1,962 internal targets and 784 local image assets.
