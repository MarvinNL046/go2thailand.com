# Unpaired locale-route triage

**Measured:** 28 July 2026  
**Source:** `seo/inventory/routes.csv` and `seo/inventory/unpaired-routes.json`  
**Scope:** 933 sitemap routes without an exact path-equivalent in the other locale

An unpaired route is an audit lead, not automatically a missing translation. Go2Thailand uses locale-specific consolidation: Dutch often keeps one strong destination or hotel owner where English still has several programmatic child routes. Creating all missing path-equivalents would therefore add thin duplication and incorrect hreflang rather than useful bilingual coverage.

## Inventory split

| Locale-only side | Routes | Share of unpaired set |
|---|---:|---:|
| English-only | 912 | 97.7% |
| Dutch-only | 21 | 2.3% |
| Total | 933 | 100% |

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
| Blog | 41 | Individual freshness, traffic and locale-intent review |
| Destination subpillar | 40 | Manual cluster decision; avoid duplicating stronger Dutch weather/food/attraction owners |
| Other | 3 | Manual review |
| Practical | 1 | Manual review |

The first five template-held groups account for **648/912 English-only routes**. They are a localization backlog, not evidence that 648 Dutch pages should be generated. The remaining **264** require page- or cluster-level intent decisions.

## Dutch-only routes

### Priority A — independently research an English owner

These two remaining routes represent durable, commercially or topically useful intents. They should receive separate English DFS/SERP/competitor/PAA research before an English canonical is indexed:

- `/city/koh-samui/attractions/wat-plai-laem/`
- `/compare/phuket-vs-krabi/`

### Priority B — editorial English-candidate review

These thirteen blog intents can be useful in English, but each needs freshness and SERP validation before translation or rewriting:

- Thailand snorkeling islands
- Bangkok street-food neighbourhoods
- Best time to visit Thailand by region
- Phuket Airport
- Phuket weather
- Bangkok travel tips sourced from community questions
- Bangkok K-pop concerts 2026
- Mango sticky rice season
- Solo female travel safety
- Som tam regional variations
- Pad Thai: street food versus restaurant/home cooking
- Tom yum goong guide
- Cheapest versus most expensive Bangkok hotel comparison

### Deliberately locale-specific or consolidated

- `/blog/bangkok-in-4-dagen-vanuit-nederland-vluchtig-stedentrip-plan/` targets travellers departing from the Netherlands.
- `/blog/koh-samui-voor-nederlanders-vluchten-via-bangkok-transfers-beste-wijken/` targets Dutch travellers and flight context.
- `/food/khao-soi/` is consolidated out of the English sitemap to protect the stronger English food owner.
- `/blog/where-to-stay-chiang-mai-neighborhoods/` is consolidated out of English in favour of its accommodation owner.
- `/blog/thailand-king-cobra-season/` is consolidated out of English under the current owner policy.
- `/blog/thailand-visa-free-stay-cut-60-to-30-days-2026/` remains NL-only until a current-rule and freshness audit proves the premise and durable search value.

## Working order

1. Complete the two remaining Priority A English owners, using independent English research and the existing premium templates/assets only as design infrastructure.
2. Review the thirteen editorial candidates against current English SERPs, GSC/GA4 evidence and freshness risk.
3. Audit the 264 manual EN-only routes by cluster, prioritizing existing traffic, commercial intent and natural internal-link gaps.
4. Leave the 648 template-held routes EN-only unless a Dutch cluster owner has enough unique localized value to justify publication.
5. Re-run inventory, hreflang and sitewide audits after every locale-pair batch.

## Completed from Priority A

- `/best-hotels/koh-tao/` now has an independent English owner based on a 60-keyword DFS cluster, eight current UK-English SERPs, genuine PAA and first-party hotel verification. It entered the English sitemap only after canonical, hreflang, schema, internal-link, affiliate and responsive QA passed.
- `/islands/koh-tao/attractions/` now has an independent English owner based on two DFS clusters, ten current UK-English SERPs, genuine PAA, three complete competitor parses and four primary or local destination parses. It entered the English sitemap only after canonical, hreflang, schema, Klook, internal-link and responsive QA passed.
- `/islands/koh-tao/diving/` now has an independent English owner based on two DFS clusters, eleven current UK-English SERPs, genuine PAA, six complete source parses and route-level ranking/backlink checks. It entered the English sitemap only after the shared template, course/school decision model, canonical, hreflang, schema, internal-link, Klook and responsive QA passed.
- `/islands/koh-tao/snorkeling/` now has an independent English owner based on two spelling-aware DFS clusters, eleven current UK-English SERPs, genuine PAA, six usable full parses and route-level ranking/backlink checks. It entered the English sitemap only after the shared template, condition-led bay model, canonical, hreflang, schema, internal-link, Klook, three contextual Amazon OneLink exits and responsive QA passed.
- `/best-hotels/khao-sok/` now has an independent English owner based on two DFS clusters, twelve current UK-English SERPs, genuine PAA, nine usable full parses and route-level ranking/backlink checks. It entered the English sitemap only after the land-versus-lake decision model, canonical, hreflang, five-schema, internal-link, Trip.com, visual-asset and responsive QA passed.
- `/city/koh-samui/weather/` now has an independent English owner based on two DFS clusters, ten current UK-English SERPs, genuine PAA and six usable full parses, including official Thai Meteorological Department normals. The obsolete `/city/koh-samui/best-time-to-visit/` owner is permanently consolidated into this stronger paired canonical. The new owner entered the English sitemap only after monthly-data, Gulf-season, schema, internal-link, Klook, Trip.com, four contextual Amazon OneLink and responsive QA passed.
