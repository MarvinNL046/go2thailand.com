# English Kata area owner audit — 27 July 2026

## Owner and intent

- Canonical owner: `https://go2-thailand.com/phuket/kata/`
- Primary intent: decide whether Kata Beach is the right Phuket base.
- Supporting intents: Kata vs Karon, Kata vs Patong, family fit, beach access, Kata/Kata Noi context, seasonal surf and daily swimming safety.
- Hotel inventory remains owned by `/phuket/kata/hotels/`.
- Surf detail remains owned by `/phuket/kata/surfing/`.
- Island-wide attractions remain owned by `/city/phuket/attractions/`.
- The Dutch route keeps its existing implementation and content.

## DataForSEO evidence

- Owner ranking check: no returned ranking keywords.
- Owner backlink check: no returned backlink totals.
- `kata phuket` cluster: 279 keyword records and 50 competitor-domain records.
- `kata beach` cluster: 248 keyword records and 50 competitor-domain records.
- Ten live English SERPs: 80 organic results and 56 captured People Also Ask questions.
- Three competitor pages parsed: Phuket101, Four Around the World and Novotel/Accor.
- Stored evidence: `seo/research/en/2026-07-27-*kata*`, plus ranking, backlink and source subdirectories.

## Content decisions

- Replaced unsupported fixed hotel and taxi prices, journey times, percentages, beach dimensions, wave heights and monthly guarantees.
- Separates calm-beach planning, seasonal surf context and day-specific water safety.
- Uses north, central and south/Kata Noi edge as decision-oriented micro-zones without claiming fixed walking times.
- Answers genuine PAA questions without reproducing competitor copy.
- Keeps current-price hotel, activity and surf CTAs instead of displaying stale prices.
- Phuket Smart Bus remains an editorial operator link; Trip.com and Klook placements are sponsored.

## Design and assets

- Reuses `PhuketAreaGuideTemplate` with an independent Kata hierarchy, sections, copy and imagery.
- Dedicated generated hero: `/images/redesign/kata-area-hero-v2.webp`; PNG source retained.
- Desktop browser QA at 1280×720: no horizontal overflow, no broken images and no console errors.
- Mobile behavior inherits the same already-verified responsive template; Kata adds typed content data rather than new layout markup.

## Technical verification

- `npx.cmd tsc --noEmit --incremental false`: passed.
- English owner: HTTP 200, one canonical, three hreflang links and five JSON-LD blocks.
- Dutch owner: HTTP 200 after the English-only route swap.
- English render includes sponsored/nofollow handling for five outbound affiliate CTAs and visible provider disclosure from the template.
- All tested internal destinations returned HTTP 200: Kata hotels, Kata surfing, Karon, Patong, Kamala, Phuket destination, Phuket accommodation and Phuket attractions.

## Primary sources

- Tourism Authority of Thailand — Phuket destination context and beach-flag reminder.
- Thai Meteorological Department — current Phuket forecast and outlook.
- Phuket Smart Bus — current route and timetable operator information.
- UK FCDO — current Thailand beach, road and personal-safety guidance.

