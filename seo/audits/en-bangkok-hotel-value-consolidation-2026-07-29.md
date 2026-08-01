# English Bangkok hotel-value consolidation audit

**Date:** 2026-07-29  
**Retained owner:** `/best-hotels/bangkok/`  
**Retired candidate:** `/blog/cheapest-vs-most-expensive-hotel-bangkok/`

## Production decision

The unsupported “we tested both extremes” article is no longer an English publication owner. It now returns a permanent redirect to the ranked premium hotel owner. Its source markdown remains in version control solely for traceability; `getAllPosts('en')` excludes it from the sitemap, RSS feed, blog lists, related-post selection and adjacent-post navigation.

The Dutch route remains HTTP 200 and retains its independent locale status. No English consolidation was inherited into Dutch.

## Internal-link cleanup

Five English source articles were rewritten to link directly and naturally to `/best-hotels/bangkok/`:

- Fairmont Bangkok Sukhumvit;
- Chatuchak Weekend Market food guide;
- Langham Custom House Bangkok;
- Thailand budget versus comfort;
- Prince Akatoki Riverside Bangkok.

The new copy describes the useful decision—area, transport consequence, traveller fit and live booking conditions—instead of repeating “cheapest versus most expensive”. A layered sitewide re-render also confirmed that four previously cached related-post links disappear through the locale-specific consolidation filter.

## Search and commercial integrity

- The retained owner remains the exact ContentOps owner (`best-hotels-bangkok-en`, volume 2,400, KD 12) and already has three ranking variants.
- No second keyword row or indexable canonical was created for the zero-signal candidate.
- Volatile prices are not copied into editorial text. The owner asks readers to compare the same room, occupancy, taxes, breakfast and cancellation conditions for their dates.
- Trip.com remains the contextual live-price exit with sponsored/nofollow disclosure.
- Amazon OneLink was explicitly assessed and deliberately omitted because no physical product improves the hotel-selection task.

## Generated inventories

- English sitemap: 1,594 URLs; retired route absent; retained owner present.
- Dutch sitemap: 703 URLs; Dutch route remains independent.
- Combined sitemap inventory: 2,297 URLs.
- RSS feed: 279 English blog posts; retired route absent.
- `data/all-routes.json`: retired English route removed.
- SEO route inventory regenerated: 1,594 EN and 703 NL URLs.

## Verification

- HTTP: retained owner `200`; retired English candidate `308` to `/best-hotels/bangkok/`; Dutch counterpart `200`.
- TypeScript: `npx tsc --noEmit --incremental false` passed.
- Targeted ESLint: no errors; eight pre-existing unused-destructure warnings remain in the shared blog route.
- SEO verification: zero hard cannibalisation collisions and zero warnings; 120 implemented English owners.
- Amazon verifier: 16 used slugs and 20 registered products passed.
- Design-system verifier: seven primitives and 30 pilot templates passed, including explicit consolidation proof.
- Layered English runtime audit: 1,594/1,594 sitemap routes without hard errors; zero warnings.
- Full rendered design audit: 2,297/2,297 NL+EN routes use either the premium signature or the intentional homepage hybrid; no route lacks a redesign signature.
- The active local development server remained healthy on port 3000 throughout the change.

## Evidence

- Research decision: `seo/audits/en-bangkok-hotel-value-consolidation-research-2026-07-29.md`.
- Runtime audit: `seo/audits/runtime/en-bangkok-hotel-consolidation-final-2026-07-29.json` (gitignored runtime evidence).
- Full DFS evidence: `seo/research/en/2026-07-29-*` plus the matching ranking, backlink and parsed-source captures.
