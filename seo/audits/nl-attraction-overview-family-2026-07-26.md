# Nederlandse attractie-overviewfamilie — productieacceptatie

**Datum:** 26 juli 2026  
**Familie:** `/nl/city/<bestemming>/attractions/`  
**Omvang:** 6 indexeerbare attractie-overviewowners

## Uitkomst

- De zes Nederlandse overzichtspagina's voor Bangkok, Chiang Mai, Khao Sok, Koh Samui, Krabi en Phuket geven lokaal HTTP 200 op hun bestaande canonical URL.
- De vijf gedeelde pagina's gebruiken `AttractionsGuideTemplate`; Krabi behoudt zijn uitgebreidere, eigen premium layout op dezelfde ranking-URL.
- Het geneste `<main>`-landmark is in beide templates verwijderd. De globale applicatielayout levert nu per route het enige document-`main`; iedere owner heeft daarnaast exact één H1.
- De pagina's bevatten minimaal tien inhoudssecties, een inhoudelijke onderste laag, een FAQ, bron-/redactiemethodiek, beschrijvende interne links en een natuurlijke teruglink naar de bijbehorende destination-owner.
- Canonical, `nl`, `en` en `x-default` hreflang, `Organization`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage` JSON-LD zijn familiebreed gecontroleerd.
- Klook-links behouden de juiste commerciële context, disclosure en `noopener noreferrer nofollow sponsored`-relaties.
- Alle gerenderde beelden hebben alt-tekst en alle lokale beeldbestanden bestaan. De familie gebruikt per owner minimaal tien visuele instanties.

## DataForSEO en zoekintentie

Iedere owner had vóór deze acceptatie zelfstandig Nederlands keyword-, SERP-, concurrent- en letterlijk PAA-onderzoek. Op 26 juli 2026 zijn aanvullend voor alle zes exacte productie-URLs verse DFS-ranking- en backlinkcontroles uitgevoerd:

- 6 rankingchecks: geen actuele URL-rankings gevonden;
- 6 backlinkchecks: geen gerapporteerde URL-links of verwijzende domeinen gevonden;
- totale aanvullende DFS-kosten: 0,216216;
- de bestaande URLs blijven behouden, omdat zij de correcte zoekintentie bezitten en alle oudere varianten er permanent naartoe consolideren.

De ruwe JSON-uitvoer en leesbare Markdown-samenvattingen staan onder `seo/research/nl/rankings/` en `seo/research/nl/backlinks/`, telkens met datum `2026-07-26` en de exacte owner-URL in de bestandsnaam.

## Gecontroleerde owner-routes

- `/nl/city/bangkok/attractions/`
- `/nl/city/chiang-mai/attractions/`
- `/nl/city/khao-sok/attractions/`
- `/nl/city/koh-samui/attractions/`
- `/nl/city/krabi/attractions/`
- `/nl/city/phuket/attractions/`

Voor iedere owner is ook `/nl/city/<bestemming>/top-10-attractions/` gecontroleerd: deze oude route geeft een permanente 308-redirect naar de overeenkomstige `/attractions/`-owner.

## Affiliatebesluit

Klook is voor deze excursie- en bezienswaardigheidsintentie de relevante commerciële partner. Amazon-producten zijn niet kunstmatig in deze overzichtsfamilie geplaatst: fysieke reisproducten passen beter op weer-, paklijst- en praktische gidsen, waar OneLink contextueel kan converteren zonder de leesroute te verstoren.

## Verificatiepoort

- `npm run seo:verify:nl-attraction-overviews` — 6/6 groen.
- `npm run seo:verify:nl-runtime` — 106/106 Nederlandse routes groen.
- `npm run seo:verify` — 0 harde cannibalisatieconflicten en 0 waarschuwingen.
- `npm run affiliate:verify` — groen; 16 gebruikte slugs en 18 geregistreerde Amazon-producten.
- `npm run design:verify` — groen; 7 designprimitieven en 26 pilottemplates.
- `npx tsc --noEmit --incremental false`, gerichte ESLint en `git diff --check` — groen.
- Browser-QA: Bangkok op 1440 × 1000 en Krabi op 390 × 844. Beide hebben één H1 en één `main`, geen kapotte beelden, geen documentoverflow en geen applicatiefoutoverlay. De mobiele FAQ is geopend en heeft leesbaar donker tekstcontrast. Alleen de bekende Next.js-dev-HMR-waarschuwing rond `isrManifest` verscheen op desktop; dit is geen applicatiefout en verscheen niet op mobiel.

## Scopegrens

Deze acceptatie rondt alleen de Nederlandse attractie-overviewowners af. Losse attractiedetailpagina's, hotels, weer, eilanden en andere contentclusters behouden hun eigen research en acceptatiepoort. De Engelse varianten blijven inhoudelijk onaangeraakt tot de zelfstandige Engelse DFS-fase.
