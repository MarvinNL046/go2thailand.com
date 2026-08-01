# English Kamala area owner audit — 27 July 2026

## Scope and ownership

- Owner: `https://go2-thailand.com/phuket/kamala/`.
- Intent: Kamala area fit, north/central/south micro-zones, family fit, Kamala vs Patong/Kata, broad season planning and daily water safety.
- Hotels remain owned by `/phuket/kamala/hotels/`; island-wide attractions by `/city/phuket/attractions/`.
- English-only template swap; the Dutch implementation remains intact.

## DataForSEO evidence and limitations

- Owner ranking check returned no keywords; backlink check returned no totals.
- Two clusters returned 321 records. DFS returned no usable volume/KD values or competitor-domain rows for this batch; none were inferred.
- Ten live English SERPs returned 79 organic results and 57 genuine PAA questions.
- Phuket101 returned a complete 21,301-character parse; Jamie’s Phuket Blog returned a 658-character partial parse.
- Hotels.com, Thailand Magazine and TUI returned empty/blocked parses. These captures are retained as evidence rather than described as fully analysed pages.

## Editorial and commercial decisions

- Removed fixed prices, distances, journey times, percentages, hotel-facility claims, religious generalisations and guaranteed swimming/safety statements.
- Current hotel and activity CTAs use Trip.com/Klook sub IDs with sponsored/nofollow treatment.
- Phuket Smart Bus remains an editorial operator link.
- Primary sources: TAT, TMD, Phuket Smart Bus and UK FCDO.

## Verification

- TypeScript passed with `npx.cmd tsc --noEmit --incremental false`.
- EN and NL owners returned HTTP 200; Kamala hotels and comparison owners also returned 200.
- EN owner: one canonical, three hreflang links, five JSON-LD blocks and seven sponsored disclosures/attributes.
- Browser QA at 1280×720: no overflow, broken images or console errors.
- Dedicated hero retained as PNG source and 1920×960 WebP.

