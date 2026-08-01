# English editorial source and freshness audit — 2026-08-01

## Exact before and after

| Metric | Before | After | Result |
| --- | ---: | ---: | --- |
| Audited English articles | 274 | 274 | Full set retained |
| Fewer than two sources | 6 | 0 | Closed |
| Encoding corruption | 1 | 0 | Closed; initial result was a detector false positive |
| Possibly expired future language | 10 | 8 | Two genuinely past events corrected |

The audit was rerun with `npm run seo:audit:en-editorial-risk`; the machine-readable result is `seo/audits/runtime/en-editorial-content-risk.json`.

## Six source-gated routes

| Route | Sources after |
| --- | ---: |
| `/blog/thailand-imf-world-bank-annual-meetings-bangkok-2026/` | 2 |
| `/blog/thailand-ttm-plus-2026-pattaya-business-tourism/` | 2 |
| `/blog/thailand-oil-crisis-flight-prices-energy-march-2026/` | 2 |
| `/blog/thailand-michelin-guide-2026-new-stars-suhring/` | 3 |
| `/blog/thailand-three-airport-high-speed-rail-2026-update/` | 2 |
| `/blog/thailand-anutin-reelected-prime-minister-march-2026/` | 2 |

## Retained future-language results

The remaining eight hits are not expired on 2026-08-01: BTS World Tour Bangkok (December), Tomorrowland Pattaya (December), Global Wellness Summit Phuket (November), Kahavadi Chiang Rai, IMF–World Bank Annual Meetings Bangkok (October), The Langham Customs House Bangkok, Toyota Thailand Open, and Fairmont Bangkok Sukhumvit. These are detector advisories for scheduled later-2026 content, not correction failures.

## Verification

- All six formerly source-gated routes now expose at least two frontmatter sources.
- Bun Bang Fai no longer contains the expired `is scheduled` statement.
- TTM+ no longer carries the future-language flag.
- The English first-time visitor guide no longer produces a false encoding flag.
- Targeted `git diff --check` passed; line-ending notices are informational.
