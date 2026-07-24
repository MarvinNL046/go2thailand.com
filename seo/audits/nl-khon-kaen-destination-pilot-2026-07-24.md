# NL destination audit — Khon Kaen

**Route:** `/nl/city/khon-kaen/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `khon kaen thailand`: volume 170, KD 10, informationele intentie.
- Cluster: 66 ruwe keywordrecords en 50 competitor domains.
- Vijf live Nederlandse SERP's leverden zes bruikbare locatie-, bezoekwaardigheids-, food-, veiligheids- en klimaat-PAA's op.
- Nul gevonden rankings en nul gevonden backlinks voor zowel de canonieke `/nl/city/khon-kaen/` als de legacy-route `/nl/destinations/khon-kaen/`.
- De legacy-route blijft permanent naar de canonical verwijzen. Google toont haar nog in een Nederlandse SERP; daarom worden URL en redirect niet onnodig gewijzigd.
- Zes concurrenten onderzocht. Plaatsverwarring met Udon Thani, verouderde Hua Lamphong-context, bevroren prijzen/tijden en dierenshowpromotie zijn niet overgenomen.
- Primaire context gecontroleerd bij TAT, Creative Economy Agency, Department of Mineral Resources, MICHELIN, TMD en NederlandWereldwijd.
- Ownergrens: deze route bezit bestemming, verblijfsduur en de keuze tussen stad en provincierichting. Attracties, food, hotels, verblijfzones, vervoer en seizoenen houden hun verdiepende intentie.

## Information gain

1. Khon Kaen wordt gepositioneerd als levend economisch, onderwijs- en creatief Isaan-centrum, niet als generieke “hidden gem”.
2. Bueng Kaen Nakhon/Wat Nong Wang, Sri Chan/centrum, Kangsadan/universiteit en de provincie worden als afzonderlijke reisblokken behandeld.
3. Twee nachten is een transparant redactioneel advies, geen verzonnen PAA of harde regel.
4. Een extra dag splitst bewust: west naar Phu Wiang voor geologie en fossielen óf zuid naar Chonnabot en dorpscultuur voor zijde en erfgoed.
5. De foodlaag combineert Isaan-klassiekers, Thai-Chinees ontbijt en hedendaagse regionale keuken met concrete allergievragen.
6. Trein-, vlieg- en dagtripvervoer wordt als deur-tot-deurketen uitgelegd zonder bevroren dienstregeling.
7. King Cobra Village en slangenshows worden op dierenwelzijnsgronden niet aanbevolen.

## Visueel systeem

Vijf nieuwe WebP-assets zijn met de ingebouwde image-generationroute gemaakt en inhoudelijk gecontroleerd:

- `khon-kaen-destination-hero.webp` — Bueng Kaen Nakhon met het negenlaagse silhouet van Wat Nong Wang, lokaal avondgebruik en kopruimte.
- `khon-kaen-creative-district.webp` — Sri Chan/Kangsadan als geleefde handels-, studenten- en creatieve stadslaag.
- `khon-kaen-food.webp` — herkenbare Isaan-tafel met som tam, larb, kai yang, kleefrijst, kruiden en Thai-Chinees ontbijt.
- `khon-kaen-phu-wiang.webp` — geloofwaardige museum- en fossielcontext zonder fantasy-dinosaurussen.
- `khon-kaen-route-banner.webp` — redactionele vertakking vanuit de stad naar fossielen in het westen en zijde/cultuur in het zuiden; bewust geen schaalkaart.

De beelden zijn als WebP opgeslagen met quality 84 en method 6. De pagina gebruikt het volledige premium destination-template: hero-keuzelaag, quick answer, asymmetrische zones, routebanner, editorial highlights, transparante commerciële CTA's, foodstory, reisplan, praktische onderhelft, echte-PAA-accordion, bronnen en footer.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/khon-kaen/` bij 1280 px desktopviewport.
- 2.684 gerenderde hoofdcontentwoorden.
- Eén H1: `Khon Kaen Thailand`.
- Zes FAQ-items; het standaard geopende antwoord gebruikt `rgb(41, 53, 49)` en is goed leesbaar.
- Zeventien gerenderde afbeeldingen; na lazy-load nul ontbrekende of gebroken beelden.
- Geen contentoverflow op desktop; de documentbreedte blijft binnen de viewport minus scrollbar (`1265/1280`).
- Hero, quick answer, zonekaarten, routebanner, highlights, food, itinerary, praktische onderhelft, FAQ, vervolgkaarten, bronnen en footer zijn afzonderlijk bekeken.
- De browserbinding kon in deze sessie niet fysiek naar 390 px wijzigen. Het ongewijzigde gedeelde destination-template was eerder op 390 px gevalideerd; responsive regels blijven bovendien afgedekt door `design:verify` en TypeScript.

## SEO, schema en affiliates

- Canonical: `https://go2-thailand.com/nl/city/khon-kaen/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Schema gevonden: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- Vijf gesponsorde affiliatelinks; allemaal met `rel=sponsored` en route-eigen `subid` voor hotels, activiteiten of vervoer.
- Geen harde cannibalisatie of waarschuwing in de automatische ownercheck.
- De gerelateerde Nederlandse ownerfamilie geeft lokaal HTTP 200; `/nl/city/khon-kaen/weather/` bestaat bewust niet en wordt daarom nergens als target gebruikt.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:verify:nl-runtime` — groen: 67/67 routes.
- `npm run seo:cannibalization` — groen: 0 hard collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte slugs en 13 geregistreerde producten.
- `git diff --check` — gecontroleerd vóór commit.

## GA4-queue

De aangeleverde GA4-top 25 blijft als beschermde Engelse updatebatch geregistreerd. Alleen de Nederlandse El Niño-route uit die lijst is al volledig met DFS en visuele QA vernieuwd. De Engelse verkeerdragende routes worden pas na de NL-fase en per locale onderzocht, met behoud van URL, ranking- en backlinksignalen.
