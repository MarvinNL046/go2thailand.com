# English destination shortlist intent refresh

**Captured:** 2026-08-01
**Scope:** 33 `/city/{slug}/top-10-attractions/` owners and 33 `/city/{slug}/top-10-restaurants/` owners.

## Research method

The configured DataForSEO live endpoint returned an HTTP-level failure while its JSON status said `20000 Ok`; no DFS result was saved or represented as evidence. A current public-web SERP fallback was therefore used for representative head terms. This note does not claim DFS metrics or verbatim PAA capture.

Representative queries:

- `best things to do in Bangkok`
- `best restaurants in Bangkok`
- `things to do in Krabi Thailand`
- `best restaurants in Krabi Thailand`

Current result examples inspected:

- Lonely Planet, [The 16 best things to do in Bangkok](https://www.lonelyplanet.com/articles/top-things-to-do-in-bangkok)
- Tripadvisor, [Things to do in Bangkok](https://www.tripadvisor.com/Attractions-g293916-Activities-Bangkok.html)
- Hotels.com Go Guides, [Best things to do in Bangkok](https://www.hotels.com/go/thailand/best-bangkok-things-to-do)
- Eater, [The best restaurants in Bangkok](https://www.eater.com/maps/best-restaurants-bangkok-thailand)
- Time Out Bangkok, [The best restaurants in Bangkok](https://www.timeout.com/bangkok/restaurants/the-50-best-restaurants-in-bangkok)
- We Seek Travel, [Things to do in Krabi](https://www.weseektravel.com/things-to-do-in-krabi/)
- Wanderlog, [Restaurants in Krabi Province](https://wanderlog.com/list/geoCategory/206530/)
- Ao Nang municipality, [local restaurant directory](https://www.aonang.go.th/storage/uploads/177820981331.pdf)

## Intent and information-gain decision

The attraction SERPs reward a scannable shortlist but also expose the weakness of an unexplained numbered ranking. Searchers need help composing a realistic day, understanding geography and checking access, opening hours, weather and dress requirements. The page therefore keeps its exact city-specific shortlist owner while adding planning context and explicit live-detail checks.

Restaurant SERPs are highly volatile and mix editorial publishers, platforms and local lists. A static “real/current prices” promise is not defensible across 221 venue records. The owner remains `best restaurants in {city}`, but the page presents each price field as an indicative note and explicitly asks readers to verify the current menu, opening hours and reservation policy. It does not imply that ranking position, placement or availability is guaranteed.

## Owner boundaries

- `/city/{slug}/top-10-attractions/`: comparative city activity shortlist and day-composition intent.
- `/city/{slug}/attractions/`: broader attraction inventory; where a route exists, it must not duplicate the comparative shortlist framing.
- `/city/{slug}/top-10-restaurants/`: comparative venue shortlist.
- `/city/{slug}/food/`: cuisine, dishes and food-culture intent rather than the same venue ranking.
- `/city/{slug}/`: destination planning hub.

The year was removed from rendered H1 and metadata so owners remain maintainable. A visible review label may still show the actual source-review month.
