# English editorial personal-experience remediation — 2026-08-01

## Scope

- Source: `seo/audits/runtime/en-editorial-content-risk.json` immediately before remediation.
- English editorial routes reviewed: 49 routes carrying `personal-experience-claim`.
- Shared ledgers, inventories, sitemaps, `package.json`, `lib/blog.js`, and `pages/blog/[slug].tsx` were outside this change.

## Remediation

- Removed unverifiable first-person residence, visit, testimonial, and personal-trust language instead of presenting it as editorial fact.
- Preserved useful adjacent travel guidance, citations, disclosures, and natural internal links.
- Rephrased only where the remaining statement was neutral and supportable; otherwise the sentence was removed.
- Removed 292 legacy `data-widget` blocks from 46 of the 49 scoped articles. No replacement widget markup was added because the shared article owner already supplies the current commercial UI.
- No new affiliate link was forced into these articles.

## Exact before/after evidence

| Check | Before | After |
| --- | ---: | ---: |
| Scoped routes flagged `personal-experience-claim` | 49 | 0 |
| Scoped routes containing legacy widget HTML | 46 | 0 |
| Legacy widget blocks in scoped routes | 292 | 0 |
| Scoped routes containing unsafe inline scripts or event-handler HTML | 0 | 0 |

The regenerated runtime audit covers 274 English editorial articles and reports no `personal-experience-claim` flag. Its remaining legacy-widget count belongs to routes outside this bounded 49-route remediation.

## Validation

- Parsed all 49 Markdown files with `gray-matter`.
- Confirmed valid `<div>` balance after removing nested widget markup.
- Confirmed no scoped file contains `data-widget`, `data-widget-fallback`, `tpembd.com/content`, `<script>`, `onclick=`, or `onerror=`.
- Confirmed no scoped file contains the audit's first-person trigger vocabulary.
- Minimum remaining scoped article body: 529 words; no article was reduced below the audit's 500-word floor.
- Regenerated with `npx tsx scripts/audit-en-editorial-content-risk.ts`.
