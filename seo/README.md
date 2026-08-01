# Go2Thailand ContentOps

This directory is the project-specific SEO control layer. The methodology comes
from the local Obsidian ContentOps vault; the implementation pattern follows the
working setup in `theyogasensei`.

## Two languages, two SERPs

English and Dutch are researched independently. They may share verified facts,
sources, images and a `translation_key`, but never inherit keywords, PAA questions
or SERP intent by translation alone.

| Locale | Default market | Keyword backlog | Published keyword log |
|---|---|---|---|
| `nl` | Netherlands | `keywords-nl.csv` | `used-keywords-nl.md` |
| `en` | United Kingdom | `keywords-en.csv` | `used-keywords-en.md` |

The English market is deliberately configurable through
`SEO_EN_LOCATION_NAME`. Confirm the final target market before paid bulk research.

## Commands

- `npm run seo:inventory` — rebuild a read-only inventory from `public/sitemap.xml`.
- `npm run seo:status` — show backlog, cluster and research coverage per language.
- `npm run seo:cannibalization` — fail on duplicate/overlapping primaries inside a locale.
- `npm run seo:research -- serp nl "krabi vakantie"` — save live SERP/PAA research.
- `npm run seo:research -- overview nl` — print DataForSEO volume, KD and intent.
- `npm run seo:research -- update nl` — write verified volume/KD/intent into the NL CSV.
- `npm run seo:research -- quickwins nl go2-thailand.com` — find positions 11–20.
- `npm run seo:verify` — run the non-paid ContentOps checks.

DataForSEO commands use credentials from `.env.local`. Every live call can cost
money. The inventory, status and cannibalisation commands are local and free.

## Required workflow per page

1. Check the route inventory and both the candidate and published keyword logs.
2. Run the cannibalisation checker for the page's locale.
3. Capture the locale-specific SERP, top competitors, PAA and related searches.
4. Research the answers as well as the questions; cite primary/official sources.
5. Record shared top-three topics, gaps, intended format and length target.
6. Draft or refresh the page without changing the other locale automatically.
7. Verify headings, metadata, canonical/hreflang, schema, internal links, images,
   affiliate disclosure, mobile rendering and prerendered HTML.
8. Add the primary keyword to the locale's used-keywords log only when published.

Research notes live in `research/nl/` and `research/en/`. Raw responses live next
to their Markdown summaries so later audits can distinguish evidence from prose.

The inventory also generates `inventory/unpaired-routes.json`. The global
`Hreflang` component uses this compact registry to avoid advertising a translated
alternate that is absent from the locale sitemaps. Sitemap generation refreshes
the registry before every production build.
