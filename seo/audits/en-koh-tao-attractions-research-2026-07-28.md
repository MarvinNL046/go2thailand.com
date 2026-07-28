# Things to do in Koh Tao — English research brief

**Proposed owner:** `/islands/koh-tao/attractions/`
**Market:** United Kingdom / English
**Captured:** 28 July 2026

## Evidence collected

- Two independent DFS clusters returned 62 records each. The usable owner cluster contains 62 keyword records and 50 competitor domains; the second seed confirms the same intent but adds no competitor domains.
- Ten current UK-English SERPs returned 88 organic appearances and 29 People Also Ask appearances across 24 case-normalised distinct questions.
- Three complete competitor parses cover Time Travel Turtle (about 3,700 parsed words), Midnight Blue Elephant (about 5,100) and Nikki On Her Way (about 2,300).
- Four first-party or local destination parses cover Tourism Authority of Thailand plus Visit Koh Tao beach, viewpoint and hiking guidance.
- The exact route has zero ranking keywords and no returned backlink or referring-domain signal.

## Search intent

The durable owner is not a directory of every named beach. It must answer which mix of water, land and slow-island activities makes a workable first visit.

DFS supports `things to do in koh tao` (320 UK volume), `koh tao beaches` (260), `what to do in koh tao` (110), `best things to do in koh tao` (30), `places to visit in koh tao` (30) and smaller non-diver, free and weather-dependent variants. Current SERPs consistently combine beaches, viewpoints, diving, snorkelling, Koh Nang Yuan and short practical planning.

## Competitor pattern

Common coverage:

- long lists divided into beaches, viewpoints, in-water and on-water activities;
- Koh Nang Yuan and an around-island boat day;
- John Suwan and other viewpoints;
- diving and snorkelling;
- Sairee, Tanote and Shark Bay;
- short sections about transport, length of stay and safety.

Weaknesses the Go2Thailand owner should solve:

- lists rarely explain what should occupy a full day versus a two-hour window;
- beach and viewpoint choices are ranked without current wind, sea state, heat, access or road consequences;
- a scooter is often treated as the default rather than an optional risk-bearing transport choice;
- wildlife sightings are framed as expected outcomes even though turtles, sharks and visibility are never guaranteed;
- exact fees, opening times and boat prices age quickly;
- diving, snorkelling and the complete island trip are allowed to cannibalise one generic “things to do” article;
- non-divers receive filler activities instead of a coherent land-and-bay plan.

## Information-gain plan

- Build the answer around one water day, one early active land window and one flexible bay day.
- Compare eight activities through duration, traveller fit and explicit trade-off rather than one universal ranking.
- Give boat day, shore snorkelling, diving, viewpoint, coastal walk, east-bay day, sunset paddle and land-session intents separate consequences.
- Add a same-morning conditions rule: choose the exposed coast, paddle or boat only after checking current local advice.
- Make a no-scooter plan viable through walking, hotel/dive transfers, taxi and boat; do not normalise inexperienced riding.
- Publish a three-day route that avoids crossing north, south, east and west repeatedly.
- Keep all entrance fees, schedules, wildlife and sea conditions dynamic; tell readers what to verify rather than copying a number.
- Use Klook only for a current activity check. Amazon remains absent because the activity decision itself does not need a forced product card.

## Selected genuine PAA

- Is there much to do on Koh Tao?
- How many days is enough in Koh Tao?
- Is Koh Tao a party island?
- Is Ko Tao worth visiting?
- When not to visit Koh Tao?
- Where is the best viewpoint on Koh Tao?
- How long does it take to climb John Suwan Viewpoint?
- Where to see turtles in Koh Tao?
- Does Koh Tao have nice beaches?
- How to get to Koh Nang Yuan from Koh Tao?

Global questions such as “Which is the prettiest island in Thailand?” and “What is the most breathtaking viewpoint?” are SERP drift and should not inflate the FAQ.

## Cannibalisation boundaries

- `/islands/koh-tao/` owns the complete island trip, ferries, stay length and broad planning.
- `/islands/koh-tao/attractions/` owns the cross-activity shortlist and a practical three-day activity sequence.
- `/best-hotels/koh-tao/` owns area and named-stay selection.
- Future `/islands/koh-tao/diving/` owns training, operator selection and dive safety.
- Future `/islands/koh-tao/snorkeling/` owns bay-by-bay snorkelling decisions.
- `/transport/` owns the broader ferry and onward-route system.

## Implementation decision

Internationalise the existing premium `AttractionsGuideTemplate` without weakening its Dutch route, then add an independently written English Koh Tao owner. Reuse the existing rights-safe visual set because it already depicts the exact activity contrasts required by the English evidence. Publish only after canonical, hreflang, schema, Klook, internal-link, responsive and layered sitewide verification pass.
