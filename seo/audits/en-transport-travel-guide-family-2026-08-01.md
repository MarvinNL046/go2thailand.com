# English transport and travel-guide family audit

Date: 2026-08-01

## Findings and fixes

### Transport — 69 indexable routes

- Removed rendered algorithmic fare ranges and “cheapest” answers.
- Replaced unsupported frequency, direct-flight, operator superiority, refund and support claims with live-check language.
- Kept route durations only as explicit planning estimates.
- Added a visible route-wide freshness notice and an official-source/method section.
- Preserved Travelpayouts/12Go and Trip.com monetisation; direct affiliate anchors use `noopener noreferrer nofollow sponsored` and disclose commission.
- Made English metadata evergreen and stopped runtime-generated `dateModified` values.
- Existing global canonical/hreflang handling and FAQ, Article and Breadcrumb schema remain in place.

### Destination travel guides — 40 routes

- Added Article and Breadcrumb schema to the shared template.
- Added a visible volatility notice before itinerary content.
- Added budget-orientation and affiliate disclosures.
- Added the stored source list through the shared source/method component.
- Removed year tokens from English metadata and H1 at render time.
- Added an explicit premium-template signature while retaining responsive shared layout.

### Topic travel guides — broader 74-route family

- Sampled the directory, generic dynamic template and specialist owner routes.
- Global canonical/hreflang and specialist schemas remain present.
- The generic topic-guide renderer still contains legacy visual primitives and several topic datasets need individual freshness review; this family is improved but not yet independently accepted in full.

## Verification evidence

- TypeScript: `npx tsc --noEmit --pretty false --incremental false`.
- Static hygiene: `git diff --check`.
- Representative runtime checks: Bangkok–Phuket, Krabi–Koh Samui, Krabi travel guide, Nong Khai travel guide and first-time Thailand guide.
- Runtime assertions cover HTTP status, premium signature, canonical, hreflang, JSON-LD, visible live-check copy and sponsored markers.
- Full family runtime sweep: **68/68 template-owned indexable transport routes passed**; the 69th inventory route, Bangkok–Koh Samui, intentionally resolves to its dedicated editorial owner. **40/40 destination travel guides passed** the same HTTP/metadata/schema/premium/freshness-boundary assertions.

## Acceptance decision

- Transport is materially safer at family level, but route-specific factual acceptance still requires live operator validation per route.
- Destination travel guides have a sound shared technical/template layer, but historical cluster copy prevents full page-level content acceptance.
- Do not mark either queue complete solely from this audit.
