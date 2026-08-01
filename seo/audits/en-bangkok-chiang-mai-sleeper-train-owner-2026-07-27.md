# English Bangkok–Chiang Mai sleeper-train owner audit

Date: 2026-07-27
Owner: `/blog/bangkok-chiang-mai-sleeper-train-guide-2026/`
Broader corridor: `/transport/bangkok-to-chiang-mai/`

## Ownership decision

- Retain the blog URL as the specialist owner for sleeper-train, night-train, berth, first-class, second-class, booking, luggage and worth-it intent.
- Retain the transport URL as the broader flight-versus-train-versus-bus corridor owner.
- Do not redirect either route: DFS found two ranking terms for the sleeper owner and seven for the corridor owner; the corridor also has one referring domain.
- Link both owners contextually and keep their title, H1 and decision framework distinct.

## Live research evidence

- Ranking and backlink checks: both owner candidates.
- Keyword clusters: 138 DFS records and 94 competitor-domain records.
- SERPs: ten UK-English result pages, 79 organic results and 37 genuine PAA questions.
- Primary verification: State Railway of Thailand Northern Line 9/10 page, D-Ticket, Krung Thep Aphiwat terminal information and current luggage guidance.
- The unsuccessful DFS parse of the query-string-heavy SRT page is retained as a transparent zero-character source result; claims were verified against the accessible primary page instead.

## Content corrections

- Removed fixed legacy fares and exact timetable claims from persistent copy.
- Removed the universal three-to-six-month booking rule.
- Removed guaranteed arrival and sleep-quality language.
- Reframed first class, lower berth, upper berth and seated service by traveller fit and trade-off.
- Clarified that the live ticket controls the station, train number, class, berth and terms.
- Avoided Amazon products: transport tickets and Chiang Mai accommodation are the natural commercial next steps on this owner.

## Design and monetisation

- Premium reusable `TransportJourneyTemplate` owner with editorial hero, sticky section navigation, berth decision cards, comparison matrix, travel-night flow, packing/resilience cards, live inventory cards, genuine FAQ, related routes and source method.
- New generated rail hero with left-side live-copy safety and no baked-in text.
- 12Go ticket CTA and Trip.com accommodation CTA use placement sub-IDs and `nofollow sponsored`.
- Official SRT booking remains a non-affiliate alternative beside the commercial comparison.

## Verification

- TypeScript: `npx tsc --noEmit --incremental false` passed.
- `git diff --check` passed.
- Local response: HTTP 200.
- Canonical: one; hreflang: `en`, `nl`, `x-default`.
- Premium template marker: one; H1: one; FAQ details: ten.
- Broken rendered images: zero; horizontal overflow at 1280 px: zero.
- Legacy fare and booking-window patterns in serialized HTML: zero.
