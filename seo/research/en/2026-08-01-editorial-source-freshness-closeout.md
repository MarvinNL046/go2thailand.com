# English editorial source and freshness closeout — 2026-08-01

## Scope

This pass covered the six English articles previously flagged with fewer than two sources, the single encoding-corruption result, and future-language that had genuinely expired by 2026-08-01.

## Primary evidence added for the MICHELIN article

- [MICHELIN Guide Thailand 2026 selection](https://guide.michelin.com/en/article/michelin-guide-ceremony/michelin-guide-thailand-2026)
- [MICHELIN Guide Thailand 2026 full list](https://guide.michelin.com/ph/en/article/michelin-guide-ceremony/full-list-michelin-stars-michelin-guide-thailand-2026)
- [Tourism Authority of Thailand: 2026 MICHELIN Guide seminar](https://www.tatnews.org/2026/04/tat-hosts-michelin-guide-seminar-advancing-thai-culinary-tourism/)

The official MICHELIN material supports the 468-venue selection and identifies Sühring as Thailand's second three-star restaurant alongside Sorn. Copy incorrectly naming Le Du as Thailand's first three-star restaurant was corrected. A brittle fixed-price example and an unsupported venue-status claim were replaced with a live-verification boundary.

## Event lifecycle decision

- TTM+ 2026 and Bun Bang Fai 2026 had ended by the audit date and were converted from advance language to retrospective copy.
- The eight remaining detector hits concern events or openings scheduled later in 2026. They deliberately retain future language and require their normal event-date review rather than being rewritten as past events.
- Bun Bang Fai's exact dates can vary by edition. The revised copy avoids asserting an unverified exact date and directs readers to TAT before booking.

## Encoding finding

The apparent corruption in the first-time visitor guide was a false positive. Its legitimate French name “Relais & Châteaux” contains lowercase `â`; the audit regex used case-insensitive matching, causing the uppercase mojibake marker `Â` to match `â`. The detector is now case-sensitive and still detects its intended mojibake sequences.
