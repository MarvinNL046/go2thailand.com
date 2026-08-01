# Nederlandse hotel-overviewfamilie — productieacceptatie

**Datum:** 26 juli 2026
**Familie:** `/nl/best-hotels/<bestemming>/`
**Omvang:** 7 indexeerbare hotelowners en 21 permanente legacyredirects

## Uitkomst

- De Nederlandse hotelowners voor Bangkok, Chiang Mai, Khao Sok, Koh Samui, Koh Tao, Krabi en Phuket geven lokaal HTTP 200 op hun canonical URL.
- Alle zeven pagina's gebruiken één herbruikbaar premium `HotelGuideTemplate`, gevoed door zelfstandige destinationdata. De globale applicatielayout levert het enige document-`main`; iedere owner heeft daarnaast exact één H1.
- Elke pagina helpt eerst een passend gebied kiezen en koppelt dat daarna aan redactionele hotelvoorbeelden, praktische trade-offs, split-staylogica, een FAQ, bronnen en natuurlijke vervolgstappen.
- Canonical, `nl`, `en` en `x-default` hreflang, `Organization`, `FAQPage`, `BreadcrumbList`, `WebPage` en `ItemList` JSON-LD zijn familiebreed gecontroleerd. `dateModified` staat op 26 juli 2026.
- De Koh Tao-pagina linkt rechtstreeks naar de bestaande Koh Samui-destinationowner in plaats van naar een niet-bestaande eilandroute.
- Alle gerenderde afbeeldingen hebben alt-tekst en alle lokale assets bestaan.

## DataForSEO en behoudsbesluit

Iedere owner had al zelfstandig Nederlands keyword-, SERP-, concurrent- en letterlijk PAA-onderzoek. Op 26 juli 2026 zijn aanvullend verse ranking- en backlinkcontroles uitgevoerd voor:

- de 7 exacte `/nl/best-hotels/`-owner-URLs;
- de 3 destijds nog indexeerbare `/nl/where-to-stay/`-legacy-URLs voor Bangkok, Chiang Mai en Koh Samui;
- 0 gemeten rankingkeywords op alle tien gecontroleerde URLs;
- 0 gerapporteerde URL-backlinks of verwijzende domeinen op alle tien gecontroleerde URLs;
- totale aanvullende DFS-kosten: 0,360360.

De ownerkeuze blijft daarmee ongewijzigd: `/nl/best-hotels/<bestemming>/` bezit zowel gebiedskeuze als algemene hotelkeuze. Alle oude Nederlandse alternatieven worden permanent geconsolideerd, zodat interne autoriteit en toekomstige signalen niet over meerdere bijna-gelijke pagina's worden verdeeld.

De ruwe JSON-uitvoer en leesbare Markdown-samenvattingen staan onder `seo/research/nl/rankings/` en `seo/research/nl/backlinks/`, telkens met datum `2026-07-26` en de exacte owner- of legacy-URL in de bestandsnaam.

## Owner-routes

- `/nl/best-hotels/bangkok/`
- `/nl/best-hotels/chiang-mai/`
- `/nl/best-hotels/khao-sok/`
- `/nl/best-hotels/koh-samui/`
- `/nl/best-hotels/koh-tao/`
- `/nl/best-hotels/krabi/`
- `/nl/best-hotels/phuket/`

## Permanente consolidatie

Voor iedere bestemming zijn de volgende drie oude routepatronen permanent naar de owner geconsolideerd:

- `/nl/where-to-stay/<bestemming>/`
- `/nl/city/<bestemming>/hotels/`
- `/nl/city/<bestemming>/top-10-hotels/`

Alle 21 routes geven lokaal een permanente 308 naar de exacte owner. De geteste Engelse `/en/where-to-stay/`-routes voor Bangkok, Chiang Mai en Koh Samui blijven HTTP 200 en zijn inhoudelijk onaangeraakt.

## Affiliatebesluit

Trip.com is bij gebieds- en hotelkeuze de relevante commerciële partner. Iedere owner bevat minimaal vijf duidelijk gemarkeerde Trip.com-uitgangen met `nofollow sponsored noopener noreferrer` en een leesbare affiliate-uitleg.

Amazon-producten zijn bewust niet in deze hotel-overviewfamilie geforceerd. OneLink blijft gereserveerd voor paklijsten, weer, vervoer en praktische reisgidsen waar een fysiek product de concrete gebruikersvraag ondersteunt.

## Verificatiepoort

- `npm run seo:verify:nl-hotel-overviews` — 7/7 groen; inhoud, PAA-bewijs, gebieden, hotelkeuzes, 21 redirects, metadata, landmarks, schema, Trip.com, bronnen, beelden en natuurlijke interne links gecontroleerd.
- `npm run seo:verify:nl-runtime` — 106/106 Nederlandse routes groen.
- `npm run seo:verify` — 0 harde cannibalisatieconflicten en 0 waarschuwingen; ContentOps staat na deze familie op 86 implemented en 20 implementing.
- `npm run affiliate:verify` — groen; 16 gebruikte slugs en 18 geregistreerde Amazon-producten.
- `npm run design:verify` — groen; 7 designprimitieven en 26 pilottemplates.
- `npx tsc --noEmit --incremental false`, gerichte ESLint en `git diff --check` — groen.
- Browser-QA: Bangkok op 1440 × 1000 en Koh Tao op 390 × 844. Beide hebben één H1, één `main`, nul documentoverflow, nul kapotte beelden en nul applicatieoverlays. De desktopowner toont 12 inhoudssecties, 12 beelden en 9 correcte Trip.com-uitgangen. Mobiel zijn de sticky bestemmingzoeker, vaste ondernavigatie, gebiedskeuzes, verticale routeverbinding en geopende PAA-FAQ visueel gecontroleerd. Een dubbele inzet van de Koh Tao-hero in een lagere gebiedskaart is vervangen door een eigen kustbeeld; de hercontrole geeft nul consolefouten of -waarschuwingen.

## Scopegrens

Deze acceptatie rondt de zeven onderzochte Nederlandse hotel-overviewowners af. Specifieke hotel- en luxe-pagina's behouden hun eigen intentie en krijgen een afzonderlijke acceptatie. De Engelse hotelpagina's blijven inhoudelijk onaangeraakt tot hun zelfstandige Engelse DFS-fase.
