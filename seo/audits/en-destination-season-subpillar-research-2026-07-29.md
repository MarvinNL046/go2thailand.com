# English destination season-subpillar family research

**Decision date:** 2026-07-29  
**Locale / market:** English / United Kingdom  
**Inventory scope:** 38 EN-only destination-subpillar routes

## Family finding

The 38 routes are not 38 independent search owners. They contain:

- 32 `/city/<place>/best-time-to-visit/` routes;
- 6 EN-only `/city/<place>/weather/` routes;
- nine best-time routes whose city already has a weather owner (Bangkok, Chiang Mai, Pattaya, Ayutthaya, Krabi, Chiang Rai, Hat Yai, Sukhothai and Surat Thani);
- 23 best-time routes without a separate weather page.

The current best-time template is visually generic and repeats one climate/season structure. It contains useful city data for most places, but indexation should follow measurable intent and SERP format rather than sitemap availability.

## Ranking, backlink and analytics evidence

Fresh DFS checks were run for all 38 candidates plus the three paired weather counterparts that were not already in the EN-only set: **41 exact URLs in total**.

- 41/41 URLs returned zero ranking keywords.
- 41/41 URLs returned no reportable backlink-summary signal.
- No matching best-time or weather route appeared in the current GA4 priority/top-page evidence.

This removes preservation pressure, but it does not by itself prove that every route should be deleted. Current keyword and SERP demand decides the owner.

## Exact UK keyword comparison

One 41-keyword DFS comparison captured all best-time candidates and the nine overlapping weather heads. Reported demand includes:

| Query | Volume | KD |
|---|---:|---:|
| Bangkok weather | 12,100 | 1 |
| Pattaya weather | 5,400 | 0 |
| Krabi weather | 4,400 | 0 |
| Chiang Mai weather | 2,900 | 0 |
| best time to visit Bangkok | 880 | 0 |
| best time to visit Chiang Mai | 390 | 0 |
| best time to visit Krabi | 320 | 0 |
| Chiang Rai weather | 260 | 0 |
| best time to visit Pattaya | 110 | 0 |
| best time to visit Hua Hin | 70 | 0 |
| Hat Yai weather | 70 | 0 |
| Surat Thani weather | 70 | 0 |
| Ayutthaya weather | 40 | — |
| Sukhothai weather | 40 | 47 |
| best time to visit Ayutthaya / Chiang Rai / Hat Yai / Kanchanaburi / Mae Hong Son / Surat Thani / Udon Thani | 10 each | mixed / — |

The weather head is overwhelmingly stronger in every city where both URL formats exist. Those cities need one season owner, not two.

## Related-keyword cluster audit for the 23 best-time-only cities

An independent DFS cluster was run for every one of the 23 cities so that a zero-volume exact phrase was not treated as sufficient deletion evidence.

- Hua Hin produced 114 records and 50 competitor domains. Relevant demand includes “Hua Hin weather by month” (90) and “best time to visit Hua Hin” (70). Unrelated Koh Samui terms in the raw related set are excluded.
- Khao Sok returned two relevant 10-volume variants around the national park.
- Kanchanaburi, Mae Hong Son, Pai and Udon Thani each returned one relevant 10-volume variant.
- The remaining 17 cities returned no reportable relevant UK demand. Trang’s apparent 50-volume result is “Nha Trang” in Vietnam and is excluded as lexical drift.

## Live SERP and genuine PAA review

Six live UK-English SERPs were captured for Hua Hin, Kanchanaburi, Khao Sok, Mae Hong Son, Pai and Udon Thani. They produced 51 organic appearances and 30 genuine PAA appearances in total.

- **Hua Hin:** a stable standalone weather/season format. PAA includes rainiest month, best months and low season.
- **Khao Sok:** a stable specialist “when to visit” format with two Khao Sok operators in the leading results. PAA includes trip length, worth, rain/health context and broader worst-month drift.
- **Kanchanaburi, Mae Hong Son, Pai and Udon Thani:** current SERPs are primarily broad destination, itinerary or loop guides rather than dedicated season owners. Their relevant season answer belongs naturally inside the main city owner.

## Full competitor parsing

Four complete DFS parses were read:

- Villa Finder Hua Hin (~1,990 parsed words): climate, three seasons, month-at-a-glance table, trip-type planning and FAQs.
- V Villas Hua Hin (~242 parsed words): a short hotel-led seasonal overview; useful only as corroborating format evidence.
- KhaoSok.com (~1,530 parsed words): weather, temperature, season consequences, packing and holiday crowd context.
- Khao Sok Travel (~6,241 parsed words): extensive operator content; much of the parse drifts into tour FAQs, but it confirms year-round season/activity framing and Cheow Lan Lake consequences.

## Owner decisions

### Consolidate nine overlaps into weather

Permanently redirect the best-time route to `/city/<place>/weather/` for Bangkok, Chiang Mai, Pattaya, Ayutthaya, Krabi, Chiang Rai, Hat Yai, Sukhothai and Surat Thani. Update internal links directly and keep only the weather canonical in the sitemap.

### Retain and rebuild two standalone owners

- `/city/hua-hin/best-time-to-visit/` — standalone demand and standalone season SERP.
- `/city/khao-sok/best-time-to-visit/` — low volume but clear specialist SERP and materially different rainforest/lake season decisions. The current empty city-data state is not publication quality; the owner must be rebuilt before the family is called complete.

Both owners should use one premium reusable season-decision template with route-specific verified data, visual hierarchy, genuine PAA, sources and contextual affiliate actions. Hua Hin may use Trip.com/12Go where dates and transport are the decision; Khao Sok may use Klook/12Go where current tour operation and transfers matter. Amazon should only appear if a specific weather/packing product solves a real task and passes the same OneLink fit test; it must not be inserted by quota.

### Consolidate 21 best-time-only routes into the destination owner

The current SERP format or absence of demand does not justify a separate owner for Pai, Mae Hong Son, Kanchanaburi, Udon Thani, Lampang, Khon Kaen, Nakhon Ratchasima, Ubon Ratchathani, Lopburi, Phitsanulok, Trat, Rayong, Nakhon Si Thammarat, Trang, Chumphon, Chanthaburi, Chiang Khan, Nong Khai, Bueng Kan, Nakhon Phanom and Mukdahan. Their useful season text should remain available in the independently built destination owner, while the legacy subpage permanently redirects there.

## Expected inventory effect

The implementation retires 30 low-value or duplicate best-time routes: nine into weather and 21 into destination owners. The six EN-only weather routes remain intentional English season owners, while Hua Hin and Khao Sok remain standalone best-time owners. Sitemap volume is expected to move from 1,594 to 1,564 English URLs before any unrelated route decisions.

## Implementation status

Completed on 29 July 2026. The English sitemap now contains 1,564 routes. Hua Hin and Khao Sok use the reusable premium `SeasonDecisionGuideTemplate`; all 30 retired routes return the intended permanent redirect and no rendered English internal link still targets them. Full implementation and QA evidence is recorded in `seo/audits/en-destination-season-subpillar-owner-2026-07-29.md`.

## Evidence files

- Exact URL rankings/backlinks: `seo/research/en/{rankings,backlinks}/2026-07-29-go2-thailand-com-city-*-(best-time-to-visit|weather).*`.
- Keyword comparison: `seo/research/en/2026-07-29-destination-candidate-comparison.*`.
- 23 DFS clusters: `seo/research/en/2026-07-29-best-time-to-visit-*-dfs-cluster.*`.
- Six live SERPs: `seo/research/en/2026-07-29-best-time-to-visit-{hua-hin,kanchanaburi,khao-sok,mae-hong-son,pai,udon-thani}.*`.
- Parsed competitors: the matching 29 July source captures under `seo/research/en/sources/`.
