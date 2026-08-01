# English manual-review family — primary-source gate

Date: 2026-08-01
Scope: the 35 English sitemap routes classified as `en:manual-review` in the goal-completion ledger.

## Method

- Enumerated the family from `seo/audits/goal-completion-ledger.json`; no route was inferred from filenames.
- Separated durable search intent from facts that require a live check: weather and marine conditions, royal-site schedules, admission, regional warnings, alcohol rules, event dates, operator prices, park access and animal-welfare practice.
- Used primary or government sources for volatile decisions. Search-result questions are not labelled People Also Ask unless a captured DFS artefact proves that origin.
- Affiliate listings are discovery/availability tools, not factual sources. Static provider prices, review scores, queue times and “skip-the-line” promises are not accepted as current facts.

## Authoritative source set

| Decision                                    | Source                                                                                                                                                                                           | What it supports                                                                                                                          | Editorial boundary                                                                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Thailand seasons and live weather           | Thai Meteorological Department, [official site](https://www.tmd.go.th/en) and [monthly summaries](https://www.tmd.go.th/en/climate/summarymonthly)                                               | Official climate context, forecasts and warnings                                                                                          | A long-term month pattern is not a forecast for a traveller’s dates.                                                                                                     |
| Visitor-facing season overview              | Tourism Authority of Thailand, [weather](https://www.tourismthailand.org/Plan-Your-Trip/Weather)                                                                                                 | Monsoon-influenced national overview and indicative 18–38°C national range                                                                | TAT’s national overview cannot erase differences between the Andaman coast, lower Gulf, north and central plain.                                                         |
| Safety and regional warnings                | UK FCDO, [Thailand travel advice](https://www.gov.uk/foreign-travel-advice/thailand) and [safety](https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security)                         | Live warning map, transport, crime, political, alcohol and regional-risk context                                                          | The site must not describe Thailand or a specific route as guaranteed safe. Advice is nationality-specific and can change.                                               |
| Emergency contacts                          | UK FCDO, [getting help](https://www.gov.uk/foreign-travel-advice/thailand/getting-help)                                                                                                          | Police 191, ambulance 1669, fire 199 and Tourist Police 1155                                                                              | Recheck before publication and avoid presenting the site as an emergency service.                                                                                        |
| Grand Palace price, hours, access and dress | Bureau of the Royal Household, [practical information](https://www.royalgrandpalace.th/en/visit/practical-information) and [official ticket page](https://www.royalgrandpalace.th/en/buy-ticket) | 500 THB foreign admission; current visiting hours 08:30–16:30; ticket sales 08:30–15:30; official online sale; published dress exclusions | Royal schedules can change. Do not claim 365-day access, a 14:30 last entry, guaranteed side-gate access or current rental/audio-guide prices without official evidence. |
| Tomyum Kung heritage                        | UNESCO ICH, [Tomyum Kung](https://ich.unesco.org/en/RL/tomyum-kung-01879)                                                                                                                        | Inscription and cultural context                                                                                                          | Does not prove vendor prices, Michelin status or food-safety performance.                                                                                                |
| Food safety                                 | WHO, [Five Keys to Safer Food](https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food)                                                                               | General handling principles                                                                                                               | Cannot certify an individual stall. Avoid “generally safe” guarantees based on popularity alone.                                                                         |

## Search-intent decisions

- `/weather/` is the national comparison hub; `/thailand-in/{month}/` answers a route-planning decision for one month. The owners are complementary, not duplicates.
- `/best-places-to-visit-thailand/`, `/top-10/`, `/top-10/attractions/` and `/best-beaches-in-thailand/` require distinct selection methods. “Top” and “best” cannot be interchangeable thin lists.
- `/grand-palace-tickets/`, `/phi-phi-island-tour/` and `/chiang-mai-elephant-sanctuary/` have transactional intent but must point to live operator totals and official rules; cached “2026 prices” are not durable.
- `/social/` has no defensible organic intent in its current sample-feed form. Its fabricated engagement counters and placeholder “live” feed should not remain an indexable owner. Recommended lifecycle: permanent consolidation to `/blog/` once the shared sitemap/redirect owner is available.
- Nightlife hub and four city owners are distinct only when each page answers area choice, transport home, current rules and city-specific planning. A shared generic venue list is insufficient.

## Research outcome

The month cluster was rebuilt around the official climate boundary and the Grand Palace owner was corrected against the current official site. A second closure pass replaced the four highest-risk transactional owners with decision-first source-gated rendering, consolidated the unsupported social feed, removed mutable city-nightlife pricing from English output and verified the remaining evidence-led owners at runtime.

## Closure-pass primary evidence

| Topic | Primary/specialist source | Applied boundary |
|---|---|---|
| Elephant facilities | Thailand ACFS, [TAS 6413-2021 good animal practices](https://agristandards.acfs.go.th/en/%E0%B8%9B%E0%B8%B2%E0%B8%87%E0%B8%8A%E0%B9%89%E0%B8%B2%E0%B8%87/) | Welfare is assessed across health, records, environment, staff, safety and freedom to express normal behaviour; a “sanctuary” label is not evidence. |
| Elephant-tourism welfare | World Animal Protection, [2026 Thailand assessment](https://www.worldanimalprotection.org/latest/news/captive-elephants-thailand-tourism-welfare-report-2026/) | Observation-only is a stronger starting signal but not a guarantee; tourist bathing and constant contact are not treated as welfare positives. |
| Coral-safe diving and snorkelling | Thailand DMCR, [2025 coral-protection measures](https://www.dmcr.go.th/detailAll/73648/nws/) and [operational summary](https://www.dmcr.go.th/detailAll/76917/nws/257) | No touching, feeding, anchoring on reef or invented wildlife guarantee; current ratios/rules come from the official Thai source. |
| Whale-shark encounters | Thailand DMCR, [interaction guidance](https://www.dmcr.go.th/detailAll/22588/nws/11) | Sightings are never promised and operators must not crowd, touch or block animals. |
| Phi Phi destination context | Tourism Authority of Thailand, [Ko Phi Phi](https://www.tourismthailand.org/Destinations/Provinces/Ko-Phi-Phi/359) | Supports destination context only; current park access, fees, stops and marine conditions remain live checks. |
| Muay Thai visitor context | Tourism Authority of Thailand, [Muay Thai](https://www.tourismthailand.org/Articles/muay-thai) | Supports cultural/activity intent; a current stadium card, gym timetable, trainer and price must come from the live official/operator page. |

No operator is certified by Go2Thailand. Klook is used only after the editorial decision and every resulting link is disclosed and marked `nofollow sponsored`.
