# NL editorial foundation and pilot acceptance

Date: 2026-07-31
Family: `nl:editorial`

## Accepted in this checkpoint

- `/nl/blog/`
- `/nl/blog/phuket-airport/`
- `/nl/blog/khao-yai-national-park-day-trip-guide-2026/`
- `/nl/blog/best-wellness-retreats-thailand-2026/`

## Foundation

- Exact manifest: 253 unique family routes, containing one index and 252 article routes.
- Typed, Zod-validated JSON profile per upgraded article.
- Pages Router-safe build-time loader with manifest/profile route and cluster cross-checks.
- One shared premium renderer with seven layout treatments, visible freshness, safe legacy prose, contextual modules and structured data.
- Central special-owner registry keeps all existing bespoke NL and EN owners ahead of the generic editorial renderer.
- Dutch missing-content requests never fall back to an English body.

## Pilot decisions

- **Phuket Airport:** practical arrival and onward-transport owner, using current Airports of Thailand information and a current-options 12Go block.
- **Khao Yai:** attraction visit-planning owner, leading with daytrip-versus-overnight and transport constraints from the official park page.
- **Wellness retreats:** commercial investigation owner, replacing an unsupported “best” ranking with a selection framework, health-claim caution and live-stay CTA.

## QA

- TypeScript strict project check: pass.
- Runtime HTTP 200 and exactly one H1: all three pilots.
- Regression HTTP 200: a bespoke NL owner, the corresponding EN owner and an ordinary unprofiled NL article.
- Affiliate links: external new-tab treatment with `noopener noreferrer nofollow sponsored` in the shared affiliate component.
- No change to any English profile, prose or owner decision in this checkpoint.

## Remaining

The family stays **in progress**. The remaining 249 routes need an explicit update, consolidation or retirement decision with independent evidence before family closure.
