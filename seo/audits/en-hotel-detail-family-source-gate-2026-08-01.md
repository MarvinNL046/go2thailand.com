# English hotel-detail family source gate — 2026-08-01

## Inventory

- 426 JSON hotel-detail records inspected in `data/pseo/hotels`.
- 416 records contain at least one `hotel.sources[].sourceUrl`.
- 10 records contain no source URL; all ten belong to Satun and are enumerated in the companion research note.
- The English sitemap currently exposes 425 hotel-detail routes; this audit changes the rendering policy, not the shared sitemap or inventory files.

## Architecture changes

`pages/hotel/[slug].tsx` now computes a source-readiness gate from the record itself.

For a source-backed record, the existing full hotel analysis remains available. Its structured-data graph now also includes:

- a canonical `WebPage` entity with `inLanguage: en`;
- a `BreadcrumbList` matching the visible hierarchy;
- a `Hotel.url` pointing to the canonical editorial page rather than an affiliate booking URL;
- `Hotel.sameAs` values derived only from registered source URLs.

For a record without a source URL, the route now:

- returns a premium, responsive verification page rather than generated hotel claims;
- includes `noindex, follow`;
- omits `Hotel` and `FAQPage` schema;
- omits fixed prices, ratings, distances, facilities, review language and urgency claims;
- retains canonical, `WebPage` and breadcrumb schema;
- provides four concrete booking checks and a route into the wider destination/stay guide;
- uses “Check live availability” rather than claiming a price;
- marks every booking exit `noopener noreferrer nofollow sponsored` and displays an adjacent affiliate disclosure.

## SEO and quality rationale

The gate prevents unsupported AI-generated facts from becoming indexable search content or structured data while retaining a helpful path for users and internal-link equity. It also establishes a reusable family invariant: a hotel-detail record cannot silently publish a full factual review without an auditable source URL.

## Validation

- Targeted ESLint: `npx eslint --no-cache "pages/hotel/[slug].tsx"` — passed with zero errors or warnings.
- TypeScript: `npx tsc --noEmit --pretty false --incremental false` — passed.
- Data inventory script confirms 426 total / 416 source-backed / 10 source-less records.
- Rendered HTTP checks on port 3000: all ten gated routes returned 200, included their exact canonical plus `noindex, follow`, rendered the safe comparison state, omitted Hotel schema and exposed exactly one `nofollow sponsored` exit.
- Rendered control check: `/hotel/mandarin-oriental-bangkok/` returned 200, remained indexable, retained the full analysis and included Hotel schema.
- Browser QA at desktop and 390 × 844 mobile: meaningful content, no framework error overlay and no horizontal overflow. Hero hierarchy, CTA/disclosure and destination fallback render coherently at both sizes.
- `git diff --check` — passed.
