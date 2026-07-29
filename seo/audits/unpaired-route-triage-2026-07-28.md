# Unpaired locale-route triage

**Measured:** 29 July 2026
**Source:** `seo/inventory/routes.csv` and `seo/inventory/unpaired-routes.json`  
**Scope:** 900 sitemap routes without an exact path-equivalent in the other locale (880 EN-only, 20 NL-only)

An unpaired route is an audit lead, not automatically a missing translation. Go2Thailand uses locale-specific consolidation: Dutch often keeps one strong destination or hotel owner where English still has several programmatic child routes. Creating all missing path-equivalents would therefore add thin duplication and incorrect hreflang rather than useful bilingual coverage.

## Inventory split

| Locale-only side | Routes | Share of unpaired set |
|---|---:|---:|
| English-only | 880 | 97.8% |
| Dutch-only | 20 | 2.2% |
| Total | 900 | 100% |

## English-only families

| Family | Routes | Initial decision |
|---|---:|---|
| Hotel detail | 421 | Keep EN-only until a Dutch hotel-detail family proves unique local value; do not mass-translate |
| Where to stay | 70 | Keep EN-only while Dutch accommodation intent remains consolidated on `/nl/best-hotels/<place>/` |
| Location directory | 54 | Keep EN-only pending Dutch area-level demand and unique localized advice |
| Hotel commercial | 35 | Keep EN-only unless DFS proves a separate Dutch category owner |
| Transport | 68 | Keep EN-only until a researched Dutch route rollout; current sitemap policy is explicit |
| Attraction detail | 68 | Manual intent and quality decision; promote only independently researched Dutch owners |
| Destination detail | 66 | Manual cluster decision; many Dutch intents already consolidate on the destination owner |
| Travel guide | 46 | Manual owner/canonical decision before translation |
| Blog | 40 | Individual freshness, traffic and locale-intent review |
| Destination subpillar | 8 | Six intentional EN-only weather owners plus the independently retained Hua Hin and Khao Sok best-time owners |
| Other | 3 | Manual review |
| Practical | 1 | Manual review |

The first five template-held groups account for **648/880 English-only routes**. They are a localization backlog, not evidence that 648 Dutch pages should be generated. The remaining **232** require page- or cluster-level intent decisions.

## Dutch-only routes

### Priority A — complete

The durable commercial and topical candidates from this tier now have independently researched English owners. No Priority A route remains open.

### Priority B — complete

No Priority B candidate remains open. The earlier seven-item list mixed already implemented owners with routes that were already deliberately consolidated. The corrected status is recorded below.

### Deliberately locale-specific or consolidated

- `/blog/bangkok-in-4-dagen-vanuit-nederland-vluchtig-stedentrip-plan/` targets travellers departing from the Netherlands.
- `/blog/koh-samui-voor-nederlanders-vluchten-via-bangkok-transfers-beste-wijken/` targets Dutch travellers and flight context.
- `/food/khao-soi/` is consolidated out of the English sitemap to protect the stronger English food owner.
- `/blog/where-to-stay-chiang-mai-neighborhoods/` is consolidated out of English in favour of its accommodation owner.
- `/blog/thailand-king-cobra-season/` is consolidated out of English under the current owner policy.
- `/blog/phuket-weer/` remains a Dutch editorial route; English weather and best-time intent is now owned by `/city/phuket/weather/`, so a literal English blog translation would duplicate the researched owner.
- `/blog/thailand-visa-free-stay-cut-60-to-30-days-2026/` remains NL-only until a current-rule and freshness audit proves the premise and durable search value.
- `/blog/beste-streetfood-bangkok-wijken-plekken-proeven/` and `/blog/bangkok-street-food-beginners/` remain separate Dutch editorial routes; their English neighbourhood and beginner intent is consolidated into the independently researched `/blog/best-street-food-markets-bangkok/` owner rather than duplicated literally.

## Working order

1. Audit the 232 manual EN-only routes by cluster, prioritizing existing traffic, commercial intent and natural internal-link gaps.
2. Leave the 648 template-held routes EN-only unless a Dutch cluster owner has enough unique localized value to justify publication.
3. Re-run inventory, hreflang and sitewide audits after every locale-pair batch.

## Completed from Priority A

- `/best-hotels/koh-tao/` now has an independent English owner based on a 60-keyword DFS cluster, eight current UK-English SERPs, genuine PAA and first-party hotel verification. It entered the English sitemap only after canonical, hreflang, schema, internal-link, affiliate and responsive QA passed.
- `/islands/koh-tao/attractions/` now has an independent English owner based on two DFS clusters, ten current UK-English SERPs, genuine PAA, three complete competitor parses and four primary or local destination parses. It entered the English sitemap only after canonical, hreflang, schema, Klook, internal-link and responsive QA passed.
- `/islands/koh-tao/diving/` now has an independent English owner based on two DFS clusters, eleven current UK-English SERPs, genuine PAA, six complete source parses and route-level ranking/backlink checks. It entered the English sitemap only after the shared template, course/school decision model, canonical, hreflang, schema, internal-link, Klook and responsive QA passed.
- `/islands/koh-tao/snorkeling/` now has an independent English owner based on two spelling-aware DFS clusters, eleven current UK-English SERPs, genuine PAA, six usable full parses and route-level ranking/backlink checks. It entered the English sitemap only after the shared template, condition-led bay model, canonical, hreflang, schema, internal-link, Klook, three contextual Amazon OneLink exits and responsive QA passed.
- `/best-hotels/khao-sok/` now has an independent English owner based on two DFS clusters, twelve current UK-English SERPs, genuine PAA, nine usable full parses and route-level ranking/backlink checks. It entered the English sitemap only after the land-versus-lake decision model, canonical, hreflang, five-schema, internal-link, Trip.com, visual-asset and responsive QA passed.
- `/city/koh-samui/weather/` now has an independent English owner based on two DFS clusters, ten current UK-English SERPs, genuine PAA and six usable full parses, including official Thai Meteorological Department normals. The obsolete `/city/koh-samui/best-time-to-visit/` owner is permanently consolidated into this stronger paired canonical. The new owner entered the English sitemap only after monthly-data, Gulf-season, schema, internal-link, Klook, Trip.com, four contextual Amazon OneLink and responsive QA passed.
- `/city/koh-samui/attractions/wat-plai-laem/` now has an independent English owner based on a 30-keyword DFS cluster, eight current UK-English SERPs, genuine PAA, six usable full parses and exact-route ranking/backlink checks. It entered the English sitemap only after the Guanyin interpretation, active-temple framing, northeast route, change-aware practical guidance, schema, internal-link, Klook and responsive QA passed.
- `/compare/phuket-vs-krabi/` now has an independent English owner based on a 41-keyword DFS cluster, ten current UK-English SERPs, genuine PAA, eight usable full parses and exact-route ranking/backlink checks. It entered the English sitemap only after the travel-style matrix, combine-the-two route, canonical, hreflang, five-schema, internal-link, Trip.com, Klook, 12Go and responsive QA passed. Amazon was assessed symmetrically for both locales and not forced because a physical product does not improve the destination-choice task.

## Completed from Priority B

- `/blog/best-time-to-visit-thailand/` already owns the independently researched English country-and-region season intent; it was incorrectly left in the open list.
- The English mango sticky rice, som tam, Pad Thai and tom yum editorial variants are already permanently consolidated into `/food/mango-sticky-rice/`, `/food/som-tam/`, `/food/pad-thai/` and `/food/tom-yum-goong/` respectively. The K-pop roundup is already consolidated into the current BTS Bangkok concert owner.
- `/best-hotels/bangkok/` retains the English Bangkok hotel-value intent after three DFS clusters, ten current UK-English SERPs, genuine PAA, three full competitor parses and exact ranking/backlink checks across five overlap candidates. The owner ranks for three 2,400-volume variants; the unsupported `/blog/cheapest-vs-most-expensive-hotel-bangkok/` candidate has zero ranking and backlink-summary signal and permanently consolidates into it. Five affected English articles now link directly to the owner. The premium owner already compares eight verified picks through location consequence, traveller fit, transport friction, room and policy checks, honest trade-offs and a current-price Trip.com exit. Amazon was explicitly assessed and not forced because a physical product does not improve the hotel-selection task.

- `/travel-guides/solo-female-travel-thailand/` now owns the English solo-female travel and safety-planning intent after three independent DFS clusters, eleven current UK-English SERPs, 50 genuine PAA appearances, four complete competitor parses, current FCDO and Tourist Police verification and exact ranking/backlink checks for four candidates. The established travel-guide URL was retained and the old English blog remains permanently consolidated. The bespoke owner uses two unique editorial visuals, a six-moment chain, four destination formats, accommodation-access matrix, transport switchboard, social-anchor board, nightlife return plan, incident-help route, ten PAA answers, Trip.com, Klook, 12Go, Saily and one deliberately bounded Amazon OneLink power bank. The broad country-safety, scams, destination, hotel, nightlife, itinerary and transport owners remain independent; six older incoming articles now use bounded, descriptive link context instead of blanket safety claims.
- `/blog/bangkok-travel-tips-reddit/` now owns the English first-arrival and first-three-days planning intent after two independent DFS clusters, eleven current UK-English SERPs, 40 genuine PAA appearances, five usable competitor or official-source parses and exact ranking/backlink checks for four candidate owners. The paired owner uses a first-90-minutes route, four base corridors, four transport modes, three geography-led day plans, six friction checks, ten PAA answers, current official-source boundaries, natural incoming links, Klook, Trip.com, 12Go, Saily and three contextual Amazon OneLink products. Broad destination, alternative-sights, Thailand-wide first-time, accommodation and detailed transit intents remain delegated to their specialist owners.
- `/blog/best-street-food-markets-bangkok/` now owns the English Bangkok street-food neighbourhood, market and beginner intent after independent DFS clusters, ten current UK-English SERPs, 51 genuine PAA appearances, competitor/source parsing and exact ranking/backlink checks. The ranking owner was retained and rebuilt with five trip formats, six area decisions, three bounded routes, six dish spokes, WHO/CDC-aligned safety guidance, ten PAA answers, Klook and three contextual Amazon OneLink products. The zero-ranking, zero-backlink `/blog/bangkok-street-food-beginners/` duplicate permanently consolidates into it; 48 affected English content links now point directly to the owner.
- `/best-diving-snorkeling-in-thailand/` now owns the English Thailand-wide snorkelling intent after independent spelling-aware DFS clusters, ten current UK-English SERPs, 58 genuine PAA appearances, five usable source parses and exact overlap ranking/backlink checks. The existing ranking owner was retained and rebuilt with a unique hero, coast-and-month switch, same-morning condition checks, six destination profiles, shore-versus-boat decision, beginner and reef-conduct guidance, a clear diving boundary, ten PAA answers, Klook, 12Go and three contextual Amazon OneLink products. `/blog/best-snorkeling-spots-thailand-water-clarity/` now permanently consolidates into it; the English sitemap and all affected internal links resolve directly to the owner.
- `/city/phuket/weather/` now has an independent English owner based on two DFS clusters with 353 records, ten current UK-English SERPs, 53 genuine PAA appearances, six usable parses and exact weather/legacy ranking and backlink checks. The duplicate `/city/phuket/best-time-to-visit/` route permanently consolidates into it. The paired owner uses official TMD normals, ten English PAA answers, natural weather links, Klook, Trip.com and four contextual Amazon OneLink exits.
- The 32-route English destination best-time family is now resolved through one independent DFS/ranking/backlink comparison, 23 city clusters, six current UK SERPs, 30 genuine PAA records and four competitor parses. Hua Hin and Khao Sok remain premium standalone owners; nine overlaps permanently consolidate into weather owners and 21 unsupported routes consolidate into their destination owner. The reusable season template uses honest travel windows, flexible plans, route-specific visuals, FAQs, sources and affiliate-fit decisions. Khao Sok carries three contextual OneLink packing products; Hua Hin records the deliberate Amazon omission. All 30 retired owners are absent from the sitemap and rendered internal-link graph.
- `/blog/phuket-airport/` now has an independent English owner based on 363 DFS keyword records across airport and transfer clusters, ten current UK-English SERPs, 55 genuine PAA appearances, six usable full parses, official AOT verification and exact candidate/overlap ranking and backlink checks. The reusable premium arrival template owns the terminal flow, four transfer modes, six hotel zones, late-arrival and connectivity decisions, ten PAA answers, current-check language and contextual Klook, 12Go, Trip.com and Saily exits. The broader three-airport article now links naturally to the specialist and no longer duplicates stale Phuket fares; Amazon was assessed but not forced.
- `/travel-guides/thai-cuisine-food-guide/` now owns broad English Thai-food, beginner choice, regional orientation and basic ordering intent after three DFS clusters, ten current UK-English SERPs, 38 genuine PAA appearances, five complete parses and exact ranking/backlink checks across four overlap candidates. The decision-led owner replaces encoding corruption, stale prices and a false UNESCO claim with flavour starting points, bounded regional context, specialist dish paths, venue and ordering decisions, dietary boundaries, ten PAA answers, five sources, Klook and three contextual Amazon OneLink products. The zero-signal `/blog/what-is-thai-food-cuisine-guide/` permanently consolidates into it; `/food/` remains the dish directory and countrywide street-food, history, health, spice, dietary and cooking-class intents remain separate.
