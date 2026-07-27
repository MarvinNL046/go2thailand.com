# English Bangkok–Koh Samui journey owner audit — 27 July 2026

## Owner and consolidation

- Canonical owner retained: `https://go2-thailand.com/blog/bangkok-to-koh-samui-guide/`.
- GA4 evidence: 26 views, 16 sessions and 0.4 seconds average engagement in the latest 28-day report.
- Duplicate checked: `https://go2-thailand.com/transport/bangkok-to-koh-samui/`.
- Both URLs returned zero DFS ranking keywords and no backlink metrics.
- The blog URL keeps the known traffic history and many existing contextual internal links.
- English `/transport/bangkok-to-koh-samui/` now permanently redirects to the blog owner.
- Dutch `/nl/transport/bangkok-to-koh-samui/` preserves its existing permanent hand-off to `/nl/transport/bangkok-to-surat-thani/`.
- English internal normalization and sitemap exclusion already point away from the duplicate transport URL.

## Independent English research

- Three DFS clusters: `bangkok to koh samui`, `bangkok to koh samui flight` and `bangkok to koh samui train ferry`.
- Keyword records: 272.
- Competitor-domain records: 100.
- Live UK English SERPs: 10.
- Organic results: 87.
- Genuine PAA questions: 53.
- DFS content parses: four; Pelago returned 11,466 markdown characters, Bangkok Airways 1,615, while 12Go and Thailand Trains blocked or returned no parsed text.
- Primary-source verification: Bangkok Airways route/check-in information and State Railway of Thailand D-Ticket.
- Dominant intent: compare the whole Bangkok-to-Samui chain, with direct-flight transactional demand as the largest spoke and train/bus/ferry as supporting decisions.

## Editorial boundary

- Removed legacy fixed USD/THB prices, fixed journey times, schedules, booking-window claims, taxi zones, ferry-company rankings, “near-monopoly” language and generic safety guarantees.
- The page distinguishes direct Samui arrival from mainland routes that require land transfer plus ferry.
- It treats BKK, DMK, Krung Thep Aphiwat, Surat Thani station/airport and the mainland piers as distinct handoffs.
- It does not declare a permanent cheapest route. Current total, luggage, transfer responsibility, operator and cancellation terms decide.
- Genuine PAA wording is used for the visible FAQ and FAQ schema; no PAA replacements were invented.
- This owner handles the cross-modal Bangkok–Samui decision. The Koh Samui destination and hotel owners handle island and stay choice.

## Affiliate and design

- New reusable `TransportJourneyTemplate` provides the premium transport-owner system for future route migrations.
- Dedicated project-owned 2:1 hero shows the ferry arrival stage rather than a generic beach.
- 12Go is the contextual live multimodal CTA; Bangkok Airways is linked as the primary direct-flight source; Trip.com is used only for the post-arrival hotel hand-off.
- Commercial links are labelled `nofollow sponsored` with visible disclosure and current-price/current-availability wording.
- No Amazon placement: route tickets and destination accommodation are the natural commercial handoffs for this owner.

## Technical verification

- TypeScript: `npx tsc --noEmit --incremental false` passed.
- Owner: HTTP 200, one canonical, three hreflang links, five JSON-LD blocks and one H1.
- English duplicate: HTTP 308 to the owner.
- Dutch duplicate: HTTP 308 to the preserved NL Surat Thani route.
- Koh Samui destination and hotel routes: HTTP 200.
- Rendered HTML contains no legacy dollar-price or monopoly claim, including serialized Next data.
- In-app browser at 1280 px: 770 px hero, no horizontal overflow, all six images load after a full-page scroll, seven owner sections and ten FAQ accordions.

## Update rule

Recheck primary provider inventory before adding any specific fare, departure, timetable, luggage allowance, pier, connection time or disruption remedy. The evergreen owner should continue explaining how to compare the live chain rather than caching a schedule.
