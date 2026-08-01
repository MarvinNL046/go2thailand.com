# English editorial family closure — 2026-08-01

## Decision

**Accepted: 275/275 English editorial routes** (the `/blog/` hub plus 274 article routes).

The final pass ran after the concurrent English source/lifecycle work completed. The content-risk audit was regenerated from the latest shared state immediately before closure.

## Content and metadata hard gates

| Gate across 274 Markdown articles | Pass | Fail |
| --- | ---: | ---: |
| Markdown parses with `gray-matter` | 274 | 0 |
| Title present | 274 | 0 |
| Description present | 274 | 0 |
| Published date present | 274 | 0 |
| `lastUpdated` present | 274 | 0 |
| Category present | 274 | 0 |
| Author present | 274 | 0 |
| Non-empty tags | 274 | 0 |
| Image metadata present | 274 | 0 |
| Render-resolved image exists or is a valid external URL | 274 | 0 |
| At least two cited sources | 274 | 0 |
| Non-empty article body | 274 | 0 |
| Personal-experience claim | 0 | 274 clear |
| Legacy `data-widget`/Travelpayouts embed HTML | 0 | 274 clear |
| Unsafe `<script>`, `onclick=`, or `onerror=` in Markdown | 0 | 274 clear |

The body-level link check found natural internal links in 271 articles. The other three routes are not orphaned: `/blog/bangkok-travel-tips-reddit/` and `/blog/phuket-airport/` use registered exact owners with internal navigation, while `/blog/best-kayaking-paddleboarding-spots-thailand-2026/` receives related, category, tag and site-navigation links from the shared article renderer. The Markdown archive contains 304 affiliate-link occurrences; the renderer normalises recognised affiliate anchors to `nofollow sponsored`, and every rendered route exposes an affiliate disclosure.

## Rendering, SEO and current-information safeguards

- The shared article renderer provides the premium editorial shell, exactly one page H1, source panel, last-updated signal, related content, canonical internal-link normalisation, contextual commercial UI and a visible disclosure.
- Registered exact owners retain their own premium layouts and source/current-status boundaries.
- `SEOHead` plus the global `Hreflang` owner provide title/description, canonical, locale-safe alternates and `x-default`.
- The hub supplies `Blog`/`BlogPosting` structured data. Article routes supply their appropriate `Article`, `WebPage`, `FAQPage`, `BreadcrumbList`, `ItemList`, or specialist-owner schema rather than being forced into one schema type.
- Volatile Markdown articles with a detected price or schedule render the visible **Check before you travel** boundary. It tells readers to verify current totals, timetables and conditions with the cited official source/provider before paying.
- Exact owners with time-sensitive facts expose equivalent dated-source and recheck language in their own interface.

## Advisory disposition

The refreshed 274-article risk audit reports **0 hard blockers**. Remaining pattern flags are editorial advisories, not closure failures:

| Advisory | Routes |
| --- | ---: |
| Fixed-price wording | 204 |
| Hours/schedule wording | 73 |
| Absolute/superlative wording | 180 |
| Fewer than 800 words | 121 |
| Fewer than 500 words | 49 |
| Time-sensitive event/update | 100 |
| Future-language review | 8 |

All eight future-language routes describe events or openings still scheduled after the 2026-08-01 audit date. Each has at least two cited sources; six contain an explicit source/recheck boundary in the article and the remaining two trigger the shared visible price/schedule safeguard. Short news/status pages remain concise when extra prose would not add decision value.

## Complete runtime verification

An HTTP render audit checked all **275/275** routes on `http://localhost:3000`:

| Runtime assertion | Pass | Fail |
| --- | ---: | ---: |
| HTTP 200 | 275 | 0 |
| Non-blank response | 275 | 0 |
| Exactly one H1 | 275 | 0 |
| Canonical link | 275 | 0 |
| At least two hreflang links | 275 | 0 |
| At least one applicable JSON-LD graph | 275 | 0 |
| Visible affiliate disclosure | 275 | 0 |

Desktop browser checks covered the hub, a shared volatile article, a registered editorial owner and the airport owner. All loaded without a framework overlay or console error, had one H1, correct canonical/hreflang, applicable schema and no horizontal overflow. Mobile checks at 390×844 covered a shared article and a registered premium owner: both had meaningful content, one H1, visible imagery/navigation, no overlay and no horizontal overflow.

## Verification commands

- `npx tsx scripts/audit-en-editorial-content-risk.ts`
- Full 274-file `gray-matter`/metadata/source/content/link/image audit
- Full 275-route local HTTP render audit
- Browser verification at desktop and 390×844 mobile viewport
- `npm run data:verify`
- `npx tsc --noEmit --pretty false --incremental false`
- `git diff --check`

No shared ledger, inventory or sitemap was edited, and this workstream did not commit.
