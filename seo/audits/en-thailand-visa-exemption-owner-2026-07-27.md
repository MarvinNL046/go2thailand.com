# English Thailand visa-exemption owner audit — 27 July 2026

## Owner and intent

- Canonical owner: `https://go2-thailand.com/visa/visa-free-entry/`
- Primary intent: British traveller deciding whether visa exemption fits a Thailand trip.
- Secondary intents: current duration, evidence at entry, onward travel, TDAC, extension, land-border entry, repeated arrivals, work limits and exemption versus Tourist Visa.
- The route is decision-first: passport + purpose + itinerary precede affiliate or application links.

## DataForSEO evidence

- 153 keyword records across the visa-exemption cluster.
- 10 live UK SERPs.
- 84 organic results captured.
- 56 verbatim People Also Ask questions captured.
- Existing owner: no exact ranking and no reportable backlinks in the completed checks.
- Research artifacts are stored under `seo/research/en/`, including cluster, SERP, rankings and backlinks outputs dated 2026-07-27.

## Primary-source fact check

- GOV.UK and the Royal Thai Embassy in London both stated up to 60 days for an ordinary/full British citizen passport at the source check.
- The London embassy describes the arrangement as temporary and advises checking again shortly before travel.
- Confirmed onward travel within 60 days is stated by the London embassy.
- TDAC is a separate, free arrival registration for foreign arrivals by air, land and sea.
- Admission and the stay granted remain decisions at the checkpoint; the passport stamp controls the practical leave-by date.
- General employment and study are not presented as ordinary tourist exemption. The copy distinguishes limited activities described by GOV.UK from general permission to work.
- Old claims about a confirmed 60-to-30-day reduction, fixed annual land-entry limits, guaranteed extensions, prices for insurance and a universal list of 93 countries were removed from the rendered owner.

## Information architecture and conversion

- Interactive route selector: short holiday, longer/repeated tourism, remote work/soft power, employment/study.
- Evidence section: passport, onward journey, TDAC, first address, credible purpose/means.
- Four independent clocks: TDAC window, admitted-until stamp, onward journey and extension decision.
- Exemption-versus-Tourist-Visa comparison with internal bridges to TDAC, Tourist Visa, DTV and Visa Extension.
- Affiliate links appear only after the route decision and use `nofollow sponsored` plus current-option language for Trip.com and 12Go.
- No Amazon placement: no natural product intent exists on this owner.

## SEO and structured data

- Unique title and meta description target UK visa-exemption intent without repeating an obsolete change claim.
- Canonical: `https://go2-thailand.com/visa/visa-free-entry/`.
- English and x-default alternates emitted; no Dutch alternate is emitted because the Dutch legacy slug currently redirects to the Dutch visa overview.
- JSON-LD: Organization, WebPage, BreadcrumbList and FAQPage.
- FAQ answers are based on measured UK PAA themes and dated primary-source checks.

## Verification

- TypeScript: `npx.cmd tsc --noEmit --incremental false` passed.
- Runtime: owner returned HTTP 200 from `http://localhost:3000/visa/visa-free-entry/`.
- Desktop viewport: 1265 px client width and 1265 px scroll width; no horizontal overflow.
- Mobile viewport: 375 px client width and 375 px scroll width; hero and all four route buttons fit.
- Interactive route selector changed the rendered recommendation and details.
- Lazy evidence image loaded successfully (`naturalWidth` 665 in the verification viewport).
- FAQ opened on mobile with readable computed text colour `rgb(41, 53, 49)`.
- Canonical, alternates and four schema blocks were present in the rendered document.
