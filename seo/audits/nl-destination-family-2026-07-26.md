# Nederlandse destination-family — productieacceptatie

**Datum:** 26 juli 2026
**Familie:** `/nl/city/<bestemming>/`
**Omvang:** 34 indexeerbare destination-pillars

## Uitkomst

- Alle 34 actuele Nederlandse city-pillars geven lokaal HTTP 200 zonder onverwachte redirect.
- De familie gebruikt voor 33 routes het herbruikbare premium `DestinationGuideTemplate`; Krabi behoudt zijn eerder opgebouwde, uitgebreidere destination-layout op dezelfde ranking-URL.
- Een gedeeld dubbel `<main>`-landmark is centraal uit het template verwijderd. Iedere route heeft nu exact één H1 en één document-`main`.
- De volledige onderkant is per route programmatisch gecontroleerd op FAQ, bron-/redactiemethodiek, gerelateerde gidsen en voldoende inhoudssecties.
- Alle gerenderde afbeeldingen hebben een `alt`-attribuut. Twee verouderde Khao Sok-verwijzingen zijn vervangen door bestaande, inhoudelijk passende paklijst- en weerassets.
- Krabi's oudere affiliatecomponenten gebruiken nu eveneens `noopener noreferrer nofollow sponsored`; de disclosures blijven direct bij de commerciële plaatsingen staan.
- Canonical, `nl`, `en`, `x-default`, geldige JSON-LD en zelfverwijzende `WebPage`- en `TouristDestination`-URLs zijn op alle 34 routes geverifieerd.
- Per route zijn minstens twee eigen spokes/clusterlinks, minstens acht beschrijvende interne links, minstens twee onafhankelijke bronhosts en minstens acht visuele instanties gecontroleerd.

## DataForSEO en behoudsbesluit

De familiebrede live audit van 26 juli 2026 omvatte:

- 170 actuele destination-, attractie-, food- en weer-URLs rond 34 steden;
- 204 Nederlandse zoekwoordseeds;
- 41 bestaande rankingkeywords op 7 exacte destination-URLs;
- rankings voor onder meer Krabi, Ayutthaya, Phuket, Bangkok, Chiang Mai, Pattaya en Lopburi;
- nul gevonden paginabacklinks in de bulkcheck;
- totale DFS-kosten: 0,09612.

De bestaande owner-URLs blijven behouden. De audit bewijst dat familiebreed vervangen, verplaatsen of redirecten bestaande signalen zou riskeren. Individuele PAA-, concurrent- en intentiebesluiten blijven in de eerdere ownerbriefs en ruwe DFS-bestanden staan.

## Gecontroleerde owner-routes

- `/nl/city/ayutthaya/`
- `/nl/city/ban-krut/`
- `/nl/city/bangkok/`
- `/nl/city/bueng-kan/`
- `/nl/city/chanthaburi/`
- `/nl/city/chiang-khan/`
- `/nl/city/chiang-mai/`
- `/nl/city/chiang-rai/`
- `/nl/city/chumphon/`
- `/nl/city/hat-yai/`
- `/nl/city/hua-hin/`
- `/nl/city/kanchanaburi/`
- `/nl/city/khao-sok/`
- `/nl/city/khon-kaen/`
- `/nl/city/krabi/`
- `/nl/city/lampang/`
- `/nl/city/lopburi/`
- `/nl/city/mae-hong-son/`
- `/nl/city/mukdahan/`
- `/nl/city/nakhon-phanom/`
- `/nl/city/nakhon-ratchasima/`
- `/nl/city/nakhon-si-thammarat/`
- `/nl/city/nong-khai/`
- `/nl/city/pai/`
- `/nl/city/pattaya/`
- `/nl/city/phitsanulok/`
- `/nl/city/phuket/`
- `/nl/city/rayong/`
- `/nl/city/sukhothai/`
- `/nl/city/surat-thani/`
- `/nl/city/trang/`
- `/nl/city/trat/`
- `/nl/city/ubon-ratchathani/`
- `/nl/city/udon-thani/`

## Verificatie

- `npm run seo:verify:nl-destinations` — 34/34 groen.
- `npm run seo:verify:nl-runtime` — wordt na de ContentOps-statuswijziging opnieuw familiebreed uitgevoerd.
- `npm run seo:verify` — nul cannibalisatieconflicten vereist.
- `npm run affiliate:verify` — Amazon-registry en OneLinkroutes blijven een afzonderlijke releasepoort.
- TypeScript, gerichte ESLint, browser-QA en mobiele overflowcontrole worden vóór de commit opnieuw uitgevoerd.

## Scopegrens

Deze acceptatie rondt de Nederlandse city-overviewowners af. Attractie-, weer-, hotel-, eiland- en andere spokes behouden hun eigen onderzoek, template en acceptatiepoort. De Engelse city-pages blijven inhoudelijk onaangeraakt tot hun zelfstandige Engelse DFS-fase.
