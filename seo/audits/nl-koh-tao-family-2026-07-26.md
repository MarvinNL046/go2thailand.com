# Nederlandse Koh Tao-familie — productieacceptatie

**Datum:** 26 juli 2026
**Familie:** eilandowner met activiteiten-, duik- en snorkelspokes
**Omvang:** 4 indexeerbare owners en 6 permanente legacyredirects

## Uitkomst

- De Nederlandse owner `/nl/islands/koh-tao/` en de childowners `/attractions/`, `/diving/` en `/snorkeling/` geven lokaal HTTP 200 op hun exacte canonical URL.
- Iedere route bezit een eigen zoekintentie: de parent beantwoordt de brede eilandkeuze, activiteiten bouwt de dagindeling, duiken helpt cursus en school kiezen en snorkelen vergelijkt baaien, condities en toegang.
- Alle vier pagina's hebben één H1 en één document-`main`. De extra `<main>`-landmarks zijn uit de gedeelde duik- en snorkeltemplates verwijderd.
- Iedere owner linkt natuurlijk naar de drie relevante siblingowners en de afzonderlijk geaccepteerde Koh Tao-hotelowner. De interne linkchecker vindt op de vier pagina's geen HTTP-fouten of verwijzingen naar de oude cityfamilie.
- De eilandowner biedt geen niet-bestaande `/city/koh-tao/food/`-link meer. Het gedeelde destinationtype ondersteunt nu bewust `foodGuideHref: null` voor bestemmingen zonder eigen eetgids.
- Het breadcrumb-schema van het gedeelde destinationtemplate gebruikt voortaan de echte root. Voor Koh Tao is de tweede breadcrumb daardoor `Eilanden` met `/nl/islands/`, in plaats van de cityhub.
- De Koh Tao-parent en activiteitenowner gebruiken nu een aparte hero en lager gelegen contentbeelden. Duik-, snorkel-, verblijf- en bootassets zorgen voor visuele variatie zonder de LCP-afbeelding opnieuw als gewone kaart te renderen.

## DataForSEO en zoekintentie

De vier owners hadden al zelfstandige Nederlandse keywordclusters, live SERPs, concurrentieparses en letterlijke People Also Ask-vragen. Op 26 juli 2026 zijn aanvullend verse ranking- en backlinkcontroles uitgevoerd voor:

- 4 exacte productieowners;
- de oude `/nl/city/koh-tao/`-URL die nog in historische interne content voorkwam;
- 0 gemeten rankingkeywords op alle vijf gecontroleerde URLs;
- 0 gerapporteerde URL-backlinks of verwijzende domeinen op alle vijf gecontroleerde URLs;
- totale aanvullende DFS-kosten: 0,180180.

De ruwe JSON-uitvoer en leesbare Markdown-samenvattingen staan onder `seo/research/nl/rankings/` en `seo/research/nl/backlinks/`, telkens met datum `2026-07-26` en de exacte owner- of legacy-URL in de bestandsnaam.

## Owner-routes

- `/nl/islands/koh-tao/`
- `/nl/islands/koh-tao/attractions/`
- `/nl/islands/koh-tao/diving/`
- `/nl/islands/koh-tao/snorkeling/`

## Permanente consolidatie

- `/nl/city/koh-tao/` → `/nl/islands/koh-tao/`
- `/nl/travel-guides/koh-tao/` → `/nl/islands/koh-tao/`
- `/nl/city/koh-tao/attractions/` → `/nl/islands/koh-tao/attractions/`
- `/nl/city/koh-tao/top-10-attractions/` → `/nl/islands/koh-tao/attractions/`
- `/nl/city/koh-tao/diving/` → `/nl/islands/koh-tao/diving/`
- `/nl/city/koh-tao/snorkeling/` → `/nl/islands/koh-tao/snorkeling/`

Alle zes routes geven lokaal een permanente 308 naar de exacte NL-owner. De Engelse `/en/islands/koh-tao/`-owner blijft HTTP 200 en de Engelse cityvariant blijft inhoudelijk onaangeraakt.

## Affiliatebesluit

- De brede owner gebruikt Klook, Trip.com en 12Go waar respectievelijk ervaringen, verblijf en ferryroutes worden gekozen.
- De activiteiten- en duikowners gebruiken Klook zonder vaste prijzen, reviewclaims of kunstmatige urgentie.
- Alleen de snorkelowner bevat Amazon-OneLink-uitgangen: drybag, waterschoenen en sneldrogende handdoek sluiten direct aan op de paklijstsectie. Alle links hebben disclosure en de vereiste sponsored-relaties.
- Amazon is niet kunstmatig toegevoegd aan de drie andere routes; hun gebruikersbeslissing wordt beter bediend door de bestaande partner of een onafhankelijke bron.

## Verificatiepoort

- `npm run seo:verify:nl-koh-tao` — 4/4 groen; zoekintenties, PAA-bewijs, clusterlinks, zes redirects, interne HTTP-statussen, metadata, landmarks, schema, affiliates, bronnen en visuals gecontroleerd.
- `npm run seo:verify:nl-runtime` — 106/106 Nederlandse routes groen.
- `npm run seo:verify` — 0 harde cannibalisatieconflicten en 0 waarschuwingen; ContentOps staat na deze familie op 90 implemented en 16 implementing.
- `npm run affiliate:verify` — groen; 16 gebruikte slugs en 18 geregistreerde Amazon-producten.
- `npm run design:verify` — groen; 7 designprimitieven en 26 pilottemplates.
- `npx tsc --noEmit --incremental false`, gerichte ESLint en `git diff --check` — groen.
- Browser-QA: eilandowner op 1440 × 1000 en snorkelowner op 390 × 844. De desktopowner toont 14 inhoudssecties, 17 beelden, 5 correcte sponsored uitgangen en geen oude city- of foodlinks. Mobiel zijn de sticky bestemmingzoeker, vaste ondernavigatie, hero, baailogica, paklijst met exact drie relevante OneLink-producten en geopende PAA-FAQ visueel gecontroleerd. Beide routes hebben één H1, één `main`, nul documentoverflow, nul kapotte beelden, nul applicatieoverlays en nul consolefouten of -waarschuwingen.

## Scopegrens

De Koh Tao-hotelowner is al in de afzonderlijke Nederlandse hotel-overviewacceptatie afgerond en wordt hier alleen als clusterdoel gecontroleerd. De Engelse eilandfamilie blijft inhoudelijk onaangeraakt tot haar zelfstandige Engelse DFS-fase.
