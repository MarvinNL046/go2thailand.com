# English El Niño Thailand 2026 owner audit — 2026-07-26

## Outcome

The existing English traffic URL now renders the premium locale-aware climate update template with independent English research, exact PAA and current WMO/TMD/WHO evidence.

## Verified implementation

- English and Dutch routes both return 200.
- Canonical and reciprocal `en`, `nl` and `x-default` hreflang are correct.
- Schema types: `Organization`, `Article`, `FAQPage`, `BreadcrumbList` and `WebPage`.
- Each of the six exact English PAA questions occurs twice in SSR HTML: visible FAQ plus FAQ JSON-LD.
- English UI contains no Dutch template labels; the NL route contains no English template labels after the shared refactor.
- Desktop has no horizontal overflow (`1265` document width within a `1280` viewport).
- Mobile has no horizontal overflow (`375` rendered width within a `390` viewport).
- All eight images load after full-page scrolling; the open FAQ answer computes to readable dark text.
- All rendered internal destinations used by this owner return 200.
- Four Amazon CTAs include `noopener noreferrer nofollow sponsored`, use current-offer wording and redirect with HTTP 307 to tagged Amazon URLs (`go2thailand-20`).
- TypeScript, affiliate, design-system and cannibalisation gates pass; targeted ESLint returns no errors.

## Design and information gain

- Dedicated generated assets are reused for the weather hero and hot/wet day kit.
- The page leads with a dated source-status answer, then explains probability versus forecast before moving to regional decisions.
- A dotted Plan A–C path turns weather uncertainty into an actionable same-day switch instead of generic travel tips.
- The lower half combines the visual pack section, contextual Amazon products, a high-contrast WHO emergency block, exact-PAA accordion, related planning routes and source method.
