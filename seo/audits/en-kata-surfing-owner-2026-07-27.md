# English Kata surfing owner audit — 27 July 2026

## Route and intent

- Owner: `https://go2-thailand.com/phuket/kata/surfing/`
- Primary intent: practical Phuket surfing guide, with Kata Beach as the lesson and beginner decision owner.
- Secondary intents: Kata Beach surfing, surf lessons, broad season, beginner suitability, safety, rental checks and current accommodation.
- Cannibalisation boundary: the Kata area owner keeps the wider stay decision; Kata Noi keeps its smaller-bay decision; this owner handles surfing, lessons, conditions and surf-specific safety.

## DFS evidence captured

- Existing owner rankings: none returned.
- Existing owner backlink summary: no metrics returned.
- Keyword clusters: 28 records across `kata beach surfing` and `surfing in phuket`.
- Competitor records: 78 across both clusters.
- Live SERPs: 10.
- Organic results captured: 77.
- Genuine PAA questions captured: 52. No replacement questions were invented for the rental SERP, which returned zero PAA.
- Competitor parses: 3; Kata Surf Limited returned 1,348 markdown characters, Time Out returned 18,203, and Phuket Surfing returned no parsed text.

## Editorial decisions

- Removed fixed lesson and board-rental prices, school counts, wave heights, exact season opening/closing dates, claimed lesson outcomes, fixed travel times and beach-safety guarantees from the English output.
- Uses `surfing in Phuket` as the broader discovery intent while retaining a precise Kata Beach owner and breadcrumb.
- Separates a broad monsoon planning band from the live decision made using weather, flags, lifeguards and qualified local instruction.
- Treats surf and recreational swimming as separate safety decisions.
- Uses current-price/current-availability CTAs rather than publishing prices controlled by providers.
- Affiliate paths are contextual: Klook and GetYourGuide for lessons; Trip.com for stays. All external commercial links are labelled sponsored.
- No Amazon placement: this activity owner has stronger transactional fit with lessons, rental and local stays than with an arbitrary product block.

## Design and technical checks

- Dedicated 2:1 Kata surfing hero generated for this owner and stored as PNG plus compressed WebP.
- Reuses the premium editorial hero, section navigation, FAQ, related-guide and source-method primitives.
- English route renders `data-premium-template="kata-surfing-en"`; Dutch route remains on its existing implementation.
- TypeScript: `npx tsc --noEmit --incremental false` passed.
- Runtime: English, Dutch, Kata parent, Kata Noi and Kata hotels returned HTTP 200.
- English SEO output: one canonical, three hreflang links and four JSON-LD blocks.
- Browser check at 1280 px: 700 px hero, no horizontal overflow, correct hero source and no failed above-the-fold image.

## Follow-up boundary

Do not add exact wave, price, class-size, opening, stock or safety claims unless they are rechecked against a current primary/provider source. Recheck the live listing and TMD/FCDO guidance on the next material update.
