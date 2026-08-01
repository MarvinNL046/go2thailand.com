# English retirement-visa owner audit — 2026-07-26

## Owner and intent

- Canonical owner: `/visa/retirement-visa/`.
- Preserved translation pair: `/nl/visa/retirement-visa/`.
- Independent UK DataForSEO cluster: 50 keyword records; primary variants each show volume 1,300 and KD 10–28.
- Four independent English SERPs cover the broad, requirements, cost and Non-O intents.
- Eleven displayed FAQs are verbatim questions captured in those English SERPs; no Dutch PAA was translated into the English set.
- Exact production-URL ranking and backlink checks were completed before editing; neither returned signals requiring a URL change.

## Competitors and evidence

- DFS Content Parsing captured the two leading commercial guides from ThaiEmbassy.com and Siam Legal at 2,388 and 2,736 measured words.
- The official Royal Thai Embassy London page was inspected live and measured at about 1,199 words after DFS returned no markdown.
- Top-three average: about 2,108 words; target range: about 1,685–2,530.
- Production owner: 2,203 visible main-content words.
- Commercial competitor claims were used only for coverage analysis. Visa, pension and healthcare facts were checked against the Royal Thai Embassy, Thai e-Visa, Immigration Bureau or GOV.UK.

## Information gain

- Route selector separates Non-O, O-A and O-X by duration, UK fee and evidence burden.
- Four-clock model separates visa validity, permission to stay, 90-day reporting and re-entry.
- Three-calculation model separates visa eligibility, sustainable living costs and UK State Pension treatment.
- Official UK guidance supports the two UK-specific planning cautions: no reciprocal UK–Thailand healthcare agreement and no annual State Pension increase under the published country list.
- The 31 August 2025 Non-Immigrant category consolidation is explained without falsely presenting it as a new retirement-visa eligibility rule.
- Document control-date workflow avoids a fabricated single expiry rule across medical, police and residence evidence.

## Runtime and responsive QA

- English route: HTTP 200, 120,765 response bytes, no Internal Server Error.
- Dutch pair: HTTP 200 and unchanged Dutch owner.
- Homepage: HTTP 200 after implementation.
- Desktop viewport: 1,440 CSS px content width on a 1,440 px viewport.
- Mobile viewport: 390 CSS px content width on a 390 px viewport.
- One visible H1: `Retire in Thailand. Which route fits?`.
- O-A route button changed `aria-pressed` and the live result heading correctly.
- Below-fold document visual was scrolled into view and rendered correctly.
- Browser console: zero errors.
- Cookie banner can overlay a screenshot until consent is chosen; it does not cause layout overflow.

## SEO, schema and links

- Title: 47 characters; meta description: 148 characters.
- Canonical: `https://go2-thailand.com/visa/retirement-visa/`.
- Alternates: `en`, `nl` and `x-default` point to the correct language pair.
- Schema: `WebPage` with `inLanguage: en`, `FAQPage` with 11 questions and `BreadcrumbList`.
- Exactly one `<h1>` and one `<main>`.
- All six discovered internal main-page destinations returned HTTP 200.
- Related links keep the broad retirement owner separate from the LTR and TDAC siblings.

## Affiliate integrity

- Only two contextual affiliate links are present: flexible first accommodation through Trip.com and arrival connectivity through Saily.
- Both use `nofollow sponsored`, locale-specific placement IDs and explicit disclosure.
- CTAs use the current-price strategy: `Check current stay price` and `Check current eSIM price`.
- Neither affiliate service is presented as affecting visa eligibility or approval.
- No Amazon product block was forced onto this YMYL page because there is no sufficiently natural product intent in the owner query.

## Gates

- [x] TypeScript without incremental cache.
- [x] English and Dutch runtime routes.
- [x] Desktop and mobile browser QA.
- [x] Interactive route selector.
- [x] Canonical, hreflang, schema, H1 and main checks.
- [x] Internal-link status checks.
- [x] Repository affiliate verifier: 16 used slugs, 18 registered products.
- [x] Repository cannibalisation verifier: 0 hard collisions, 0 warnings.
- [x] Repository design-system verifier: 7 primitives and 26 pilot templates.
- [x] Final diff integrity check.
