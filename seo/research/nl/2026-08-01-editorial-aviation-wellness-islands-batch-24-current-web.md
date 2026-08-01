# NL editorial batch 24 — luchtvaart, wellness, attracties en eilanden

Gecontroleerd: 1 augustus 2026
Scope: exact zeven toegewezen routes; Trat en Koh Kood/Trat zijn niet onderzocht, geopend of gewijzigd.
Methode: actuele openbare webresultaten en vervolgens primaire organisatie-, overheid-, luchtvaart- en parkbronnen waar beschikbaar. De vraagfamilies hieronder zijn geobserveerde formuleringen uit zichtbare zoekresultaten, paginatitels, snippets en officiële navigatie. Ze zijn **geen** DataForSEO-, volume-, ranking- of People Also Ask-data.

## Zoekintentie en ownergrenzen

| Route | Geobserveerde vraagfamilies | Ownergrens | Lifecycle |
|---|---|---|---|
| `exercise-cope-tiger-2026-korat-air-base-thailand` | wat is Cope Tiger; data 2026; Korat Air Base; deelnemers; publiek bezoeken | historisch feitenarchief, geen spottersgids of veiligheidsbelofte | `archived`, `noindex`, elapsed |
| `harbor-island-bangkok-rooftop-waterpark-2026` | juiste vestiging; Bangkapi versus Bangkae; route; kinderen; zones; openingstijd; ticket | branch-, route- en gezinsowner; geen vaste prijs of universele toesteltoegang | `ready`, index |
| `healing-journey-thailand-wellness-campaign-2026` | wat is Healing Journey; 5R framework; bestemmingen; retreat kiezen; medische wellness | campagne-uitleg en keuzegrenzen; geen behandel- of resultaatclaim | `ready`, index |
| `khao-sok-floating-bungalows-cheow-lan-lake-glamping-guide-2026` | floating bungalow kiezen; Cheow Lan versus dorp; wat is inbegrepen; boottransfer; kinderen | overlapt volledig met `/nl/best-hotels/khao-sok/` | `archived`, `noindex`, `superseded`; redirectadvies |
| `koh-kradan-bileh-beach-five-star-rating-thailand-2026` | wat betekent Beach Star; welke stranden; Koh Kradan versus Bileh; toegang; zwemveiligheid | gedateerde awardcontext en reisvorm; geen brede beste-strandenowner | `ready`, index |
| `koh-tao-coral-restoration-eco-diving-rules-2026` | duikregels; koraal aanraken; groepsgrootte; camera bij cursus; herstelproject kiezen | nationale/gebiedsregels en compliance; cursuskeuze blijft bij Koh Tao diving | `ready`, index |
| `middle-east-conflict-thailand-flights-airfare-2026` | is mijn vlucht geraakt; overstap Midden-Oosten; omleiding; ticketvoorwaarden; prijsimpact | individuele route- en boekingscheck; geen geopolitieke analyse of vast prijspercentage | `ready`, index, developing |

## 1. Cope Tiger 2026

Primaire bron:

- Singapore Ministry of Defence: <https://www.mindef.gov.sg/news-and-events/latest-releases/18mar26-nr/>

Bevestigd:

- De 32e editie liep van 15 tot en met 27 maart 2026.
- Genoemde locaties zijn Korat Air Base en Chandy Range.
- Deelnemers waren de luchtmachten van Thailand, Singapore en de Verenigde Staten.
- De bron noemt geen publiek bezoekprogramma of officiële spotterslocatie.

Besluit: verstreken eventarchief, `archived` en `noindex`. Oude claims dat burgerreizen niet werden beperkt, veiligheid “geen issue” was of zicht op vliegtuigen vanzelfsprekend was, zijn verwijderd.

## 2. Harbor Island Bangkapi

Primaire bronnen:

- Vestigingspagina Bangkapi: <https://harborlandgroup.com/harbor-island-the-mall-lifestore-bangkapi/>
- HarborLand branch-overzicht: <https://harborlandgroup.com/branch/>

Bevestigd:

- Bangkapi is het Harbor Island-waterpark op verdieping drie van The Mall Lifestore Bangkapi.
- De officiële pagina beschrijft zeven zones.
- De groep heeft ook Harbor Island Bangkae en meerdere droge HarborLand-producten.
- De branchpagina toont openingstijden, maar die moeten op de bezoekdag opnieuw worden gecontroleerd.

Besluit: `ready`, index. De bestaande gespecialiseerde premium renderer blijft eigenaar; body, profile, frontmatter en component gebruiken dezelfde nieuwe route-eigen hero. Geen nieuwe affiliate: de gespecialiseerde route bevat al een transparante Klook-uitgang na branch- en ticketcheck.

## 3. Healing Journey Thailand

Primaire bronnen:

- TAT-campagne-update: <https://www.tatnews.org/2026/03/tourism-authority-of-thailand-invites-global-travellers-to-rediscover-balance-through-healing-journey-thailand-campaign/>
- TAT-presentatie in Londen: <https://www.tatnews.org/2026/03/tourism-authority-of-thailand-presents-healing-journey-thailand-global-campaign-in-london-advancing-healing-led-tourism-vision/>
- TAT-preview en 5R-kader: <https://www.tatnews.org/2025/12/tat-unveils-healing-journey-thailand-global-campaign-ahead-of-january-2026-launch/>

Bevestigd:

- TAT lanceerde de campagne in januari 2026 en presenteerde haar in maart in Londen.
- De 5R’s zijn Retreats, Rituals, Reels, Rhythms en Relations.
- De campagne gebruikt meerdere regio’s en creator-routes; zij is geen retreatkeurmerk.

Besluit: `ready`, index als nuchtere campagne- en planningsowner. Geen affiliate, medische claim, genezingsbelofte of vaste retreatprijs.

## 4. Khao Sok floating bungalows

Bronnen:

- Tourism Authority of Thailand, Ratchaprapha-context: <https://www.tourismthailand.org/Articles/rainy-season-5-place-en>
- Tourism Authority of Thailand, Surat Thani/raft-context: <https://www.tourismthailand.org/Articles/a-different-side-of-surat-thani-no-sea-required>
- Bestaande interne owner: `/nl/best-hotels/khao-sok/`

Overlapbesluit:

- De bestaande hotelowner bezit al `khao sok floating bungalows`, `khao sok slapen op het water` en `raft house khao sok` als geverifieerde vraagfamilie.
- De route behandelt dezelfde keuze, pakketcheck, kinderen, voorzieningen en jungle-versus-meerlogica.

Besluit: `archived`, `noindex`, `newsStatus: superseded`, met prominente verwijzing naar `/nl/best-hotels/khao-sok/`. Permanente redirect aanbevolen. Niet geïmplementeerd omdat `next.config.js` en andere centrale redirectbestanden expliciet buiten scope vallen.

## 5. Koh Kradan en Bileh Beach

Bronnen:

- Primaire PCD-resultatentabel: <https://epo16.pcd.go.th/th/view/?file=oJM3MRkjoF5aBKD2nGq4ZaN4oGq3AHjjoGqaBUD1nGq4ZKN5oGO3ARjloGIaZaDjnGW4YKNloGS3Zxj5oGIaA3D1nGO4A3N4oGI3A0jkoGyaZUD0nGW4AKNloGO3ZxjgoJIaoUEcnJM4Y3OyoJk3nHkzoF9aqKEcnGI4ZaNloF93MRkuoJ9aoUEjnKI4YjWewEb3QWewEb3Q&n=%E0%B8%9C%E0%B8%A5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B4%E0%B8%99%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%94%E0%B8%B2%E0%B8%A7+%E0%B8%9B%E0%B8%B5+68+22092025&t=GTMgq2qxqS9cMUug>
- Engelstalige context: <https://www.nationthailand.com/news/tourism/40064030>

Bevestigd:

- Bileh Beach kreeg 98,57 en Koh Kradan 96,33 in de 2025-ronde; beide zijn vijf sterren.
- Historische PCD-publicaties tonen dat vijfsterrenstranden geen absolute primeur voor Thailand waren.
- De score is geen actuele zwemwaarschuwing, druktemeting of hotelclassificatie.

Besluit: `ready`, index als awardcontext plus reisvormvergelijking. Geen affiliate, vaste parkprijs, bootduur, rust-, water- of veiligheidsgarantie.

## 6. Koh Tao koraalregels

Primaire bronnen:

- Juridische DMCR-publicatie: <https://www.dmcr.go.th/detailAll/73648/nws/>
- Praktische DMCR-uitleg: <https://www.dmcr.go.th/detailAll/79430/nws/>
- Gebiedsorder Koh Tao/Koh Phangan/Koh Samui: <https://newweb.dmcr.go.th/detailAll/29229/nws/>

Bevestigd:

- Niet aanraken, voeren of afval achterlaten; sea walking is verboden.
- DMCR noemt bij begeleide scuba één toezichthouder per maximaal vier duikers.
- De publieksuitleg verbiedt cameragebruik tijdens opleidingsduiken.
- De gebiedsorder verbiedt ankeren in rifgebied en lozing in zee.

Besluit: `ready`, index als effectieve policy-/complianceowner. De ongefundeerde claim van meer dan honderdduizend geplante koralen en specifieke overlevingspercentages is verwijderd. Geen affiliate: regels en operatorcontrole gaan vóór verkoop.

## 7. Thailand-vluchten via het Midden-Oosten

Primaire en Nederlandse bronnen:

- CAAT-update: <https://www.caat.or.th/caat-media/199637/>
- KLM actuele travel alerts: <https://www.klm.nl/en/information/travel-alerts>
- NederlandWereldwijd crisisvragen: <https://www.nederlandwereldwijd.nl/crisis/midden-oosten>

Bevestigd:

- CAAT benadrukte dat de impact per route verschilt en dat reizigers hun heen- en terugvlucht bij de maatschappij moeten controleren.
- KLM publiceert dynamische aanpassingen voor de regio; concrete data mogen niet statisch worden doorgetrokken.
- NederlandWereldwijd verwijst transitpassagiers naar airline, reisorganisatie en verzekeraar.

Besluit: `ready`, index, `newsStatus: developing`. Geen algemene uitspraak over veiligheid in Thailand, geen conflictprognose, geen vast prijspercentage en geen boekingsaffiliate in een dynamische verstoringscontext.

## Redirectadvies

Alleen `khao-sok-floating-bungalows-cheow-lan-lake-glamping-guide-2026` is inhoudelijk superseded. Aanbevolen permanente bestemming: `/nl/best-hotels/khao-sok/`. De overige zes routes houden een eigen historische of actuele beslisintentie; Cope Tiger blijft een self-canonical noindex-archief.
