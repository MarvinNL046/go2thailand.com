# Nederlandse weatherfamilie — productieacceptatie

**Datum:** 26 juli 2026  
**Owners:** `/nl/weather/` en vijf `/nl/city/<bestemming>/weather/`-routes  
**Omvang:** 6 indexeerbare weatherowners en 8 permanente legacyredirects

## Uitkomst

- De landelijke weerhub en de cityowners voor Bangkok, Chiang Mai, Koh Samui, Krabi en Phuket geven lokaal HTTP 200 op hun bestaande canonical URLs.
- De vijf cityowners gebruiken één herbruikbaar premium `WeatherGuideTemplate`; de interactieve landelijke hub heeft een eigen, uitgebreidere weather-layout.
- De geneste `<main>`-landmarks zijn uit beide templates verwijderd. Iedere owner heeft nu exact één document-`main` en één H1.
- De landelijke maandvergelijker toont nu vijf TMD-stations en vergelijkt daadwerkelijk zowel de Andamankust als de Golfkust. Koh Samui is toegevoegd naast Bangkok, Chiang Mai, Krabi en Phuket.
- De hub heeft een `Dataset`-schema gekregen. Alle zes owners leveren `Organization`, `FAQPage`, `BreadcrumbList`, `WebPage` en `Dataset` JSON-LD met `dateModified` 26 juli 2026.
- Iedere cityowner heeft twaalf maandspokes, een visuele paklijst, minstens drie contextuele Amazon-OneLink-producten, Klook- en Trip.com-plaatsingen, disclosures, actuele TMD-links en meerdere officiële bronhosts.
- De landelijke hub linkt rechtstreeks naar alle vijf lokale weatherowners en twaalf maandgidsen. De visuele plan-B-sectie gebruikt drie relevante Amazon-producten zonder de informatieroute te onderbreken.
- Directe Nederlandse interne links vanuit de Krabi-secties en de verrijkte Bangkok- en Chiang Mai-data wijzen nu naar de weatherowner in plaats van via een redirect.

## DataForSEO en behoudsbesluit

Het oorspronkelijke Nederlandse onderzoek per owner bevat onafhankelijke keywordsets, actuele SERPs, concurrentieparses en letterlijke People Also Ask-vragen. Op 26 juli 2026 zijn aanvullend verse rankings en backlinks gecontroleerd voor:

- 6 exacte weatherowner-URLs;
- 5 exacte legacy `/best-time-to-visit/`-URLs;
- 29 gemeten rankingkeywords op de bestaande landelijke `/nl/weather/`-owner;
- 0 gemeten rankingkeywords op de vijf cityowners;
- 0 gemeten rankingkeywords op de vijf legacy-URLs;
- 0 gerapporteerde URL-backlinks of verwijzende domeinen op alle elf gecontroleerde URLs;
- totale aanvullende DFS-kosten: 0,399876.

Het SEO-besluit is daarom duidelijk: `/nl/weather/` blijft de brede landelijke owner en iedere `/nl/city/<bestemming>/weather/`-route bezit zowel lokaal weer-, klimaat- als beste-reistijdintentie. De vijf signaalloze dubbele cityroutes worden permanent geconsolideerd.

De ruwe JSON-uitvoer en leesbare Markdown-samenvattingen staan onder `seo/research/nl/rankings/` en `seo/research/nl/backlinks/`, telkens met datum `2026-07-26` en de exacte productie- of legacy-URL in de bestandsnaam.

## Owner-routes

- `/nl/weather/`
- `/nl/city/bangkok/weather/`
- `/nl/city/chiang-mai/weather/`
- `/nl/city/koh-samui/weather/`
- `/nl/city/krabi/weather/`
- `/nl/city/phuket/weather/`

## Permanente consolidatie

Landelijke legacyroutes:

- `/nl/travel-guides/thailand-weather/` → `/nl/weather/`
- `/nl/thailand-index/best-time/` → `/nl/weather/`
- `/nl/best-time-to-visit/` → `/nl/weather/`

City-legacyroutes:

- `/nl/city/bangkok/best-time-to-visit/` → `/nl/city/bangkok/weather/`
- `/nl/city/chiang-mai/best-time-to-visit/` → `/nl/city/chiang-mai/weather/`
- `/nl/city/koh-samui/best-time-to-visit/` → `/nl/city/koh-samui/weather/`
- `/nl/city/krabi/best-time-to-visit/` → `/nl/city/krabi/weather/`
- `/nl/city/phuket/best-time-to-visit/` → `/nl/city/phuket/weather/`

Alle acht routes geven lokaal een permanente 308 en de Engelse varianten blijven onaangeroerd.

## Verificatiepoort

- `npm run seo:verify:nl-weather` — 6/6 groen.
- De verifier controleert PAA-bewijs, TMD-data, 12 maandspokes, kustkeuze, alle 8 redirects, metadata, canonical/hreflang, landmarks, schema, Amazon OneLink, overige affiliate-rels, officiële bronnen, beelden en natuurlijke interne links.
- `npm run seo:verify:nl-runtime` — 106/106 Nederlandse routes groen.
- `npm run seo:verify` — 0 harde cannibalisatieconflicten en 0 waarschuwingen; ContentOps staat na deze familie op 79 implemented en 27 implementing.
- `npm run affiliate:verify` — groen; 16 gebruikte slugs en 18 geregistreerde Amazon-producten.
- `npm run design:verify` — groen; 7 designprimitieven en 26 pilottemplates.
- `npx tsc --noEmit --incremental false`, gerichte ESLint en `git diff --check` — groen.
- Browser-QA: `/nl/weather/` op 1440 × 1000 en `/nl/city/koh-samui/weather/` op 390 × 844. De hubmaandselector is naar augustus geschakeld en toont alle vijf regio's; de mobiele owner toont twaalf maandlinks, vijf Amazon-OneLink-producten, de visuele paklijst, stippelroute, leesbare FAQ en volledige onderkant. Beide hebben één H1, één `main`, nul documentoverflow, nul kapotte beelden, nul applicatieoverlays en nul consolefouten of -waarschuwingen.

## Scopegrens

Deze acceptatie rondt de zes onderzochte Nederlandse weatherowners af. Generieke weer- en beste-reistijdpagina's van andere steden en maanddetailpagina's blijven onderdeel van de latere sitewide route- en linkaudit. De Engelse weatherpages blijven inhoudelijk onaangeraakt tot hun zelfstandige Engelse DFS-fase.
