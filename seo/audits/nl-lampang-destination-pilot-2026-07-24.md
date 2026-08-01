# NL Lampang destination-owner — acceptatie

**Route:** `/nl/city/lampang/`  
**Status:** premium owner geïmplementeerd en alle acceptatiepoorten groen.

## Research en intentie

- [x] Zelfstandig DFS-cluster voor `lampang thailand`: exact volume 480, KD 0, informational; 30 ruwe keywordrecords en 50 competitor domains.
- [x] Drie live Nederlandse intentchecks: `lampang thailand`, `wat te doen in lampang` en `lampang bezienswaardigheden`.
- [x] Vier exacte, locatiegerichte PAA-vragen; generieke Thailand-, festival- en Chiang Mai-vragen uitgesloten.
- [x] Rankings- en backlinkcheck: geen huidige ownerrankings en geen gevonden backlinks.
- [x] Backpackblog, Rondreis.nl, Local Hero Travel en Backpacken in Zuidoost-Azië volledig via DFS geparseerd; dynamische Expedia-owner aantoonbaar inhoudelijk leeg in de parser.
- [x] Officiële TAT-, SRT-, Thai Elephant Conservation Center-, TMD- en NederlandWereldwijd-bronnen onderzocht; actuele dierenwelzijnscriteria aangevuld met World Animal Protection 2026.

## Information gain en ownergrenzen

- [x] Stad, Ko Kha, Chae Hom en Chae Son als afzonderlijke reisblokken uitgelegd in plaats van één checklist.
- [x] Wang-rivier/Kad Kong Ta en Tha Ma O bezitten het stadsverhaal; Ko Kha de Lanna-halve dag; Chae Hom óf Chae Son een afzonderlijke provinciedag.
- [x] Twee nachten minimum, drie voor stad plus Ko Kha; vierde nacht alleen wanneer een verre provincierichting de route echt bepaalt.
- [x] Paardenkoetsen niet automatisch aanbevolen; welzijnscheck en loop/fiets/wegvervoeralternatieven benoemd.
- [x] Olifantencentrum transparant als instelling met zorg- én toeristische functies beschreven; advies is observation-only en geen rijden, baden, voeren zonder barrière of shows.
- [x] Restaurant-, hotel-, attractie- en weerintentie samengevat en naar eigen owners doorgelinkt.

## Design en content

- [x] Herbruikbare `DestinationGuideTemplate` geregistreerd voor Lampang.
- [x] Vijf nieuwe plaatsgebonden WebP-assets: Wang-rivierhero, Kad Kong Ta, Wat Phra That Lampang Luang, Chae Hom-bergpagodes en food/keramiek.
- [x] Gerenderde hoofdcontent: 2.320 woorden, binnen het briefdoel van circa 2.000–2.500.
- [x] Desktop-QA op 1440×1000 per viewportsegment: hero, quick answer, zones, bergbanner, highlights, foodstory, route, planning, dierenwelzijn, FAQ, gerelateerde routes en bronnen gecontroleerd.
- [x] Mobiele QA op 390×844: sticky zoekbalk, hero, lange koppen, zonekaarten, bergbanner, foodstory, bottom navigation en open FAQ gecontroleerd.
- [x] Geen pagina-overflow: desktop 1.425 px documentbreedte binnen 1.440 px; mobiel 375 px binnen 390 px.
- [x] Alle beelden laden met geldige natuurlijke afmetingen; nul kapotte images.

## Metadata, schema en links

- [x] Eén H1: `Lampang Thailand`.
- [x] Unieke title: `Lampang Thailand: route, tips & wat te doen (2026)`.
- [x] Zelfverwijzende NL-canonical plus `nl`, `en` en `x-default` hreflang.
- [x] Geldige `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage` schema’s.
- [x] Vijf zichtbare affiliateverwijzingen met `noopener noreferrer nofollow sponsored` en subid per bestemming/intentie.
- [x] Bronlinks openen veilig met `noopener noreferrer`.
- [x] Interne owner-, attractie-, hotel-, transport- en weerlinks geven lokaal HTTP 200.
- [x] Open FAQ-antwoord gebruikt donker charcoal (`rgb(41, 53, 49)`) op lichte achtergrond.

## Poorten

- [x] TypeScript.
- [x] Design-systemverificatie: 7 primitives en 26 pilottemplates.
- [x] SEO-cannibalisatie: 0 harde conflicten en 0 waarschuwingen.
- [x] Amazon-affiliatecontrole: 13/13 repositorychecks.
- [x] NL owner-runtimecontrole: 63/63 routes.
- [x] `git diff --check` zonder whitespacefouten.
