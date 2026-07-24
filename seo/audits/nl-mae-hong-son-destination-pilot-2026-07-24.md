# NL destination audit — Mae Hong Son

**Route:** `/nl/city/mae-hong-son/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `mae hong son thailand`: volume 110, KD 0, informationele intentie.
- Cluster: 12 bruikbare keywordrecords en 50 concurrerende domeinen.
- Tien live Nederlandse SERP's voor bestemming, activiteiten, route, beste reistijd, vervoer, verblijfsduur, Loop, vergelijking met Pai, reizen zonder scooter en bezoekwaardigheid.
- Zes directe bestemming-PAA en aanvullende letterlijk aangetroffen Loop- en vervoersvragen; er zijn geen redactionele vragen als PAA verzonnen.
- Nul gevonden rankings en nul gevonden backlinks voor `/nl/city/mae-hong-son/`.
- Zes relevante concurrenten onderzocht: Backpackcentrale, BackpackenInAzië, Reis-Expert, Rondreis.nl, My Travel Secret en Travelvalley.
- Primaire context gecontroleerd bij Tourism Authority of Thailand, Department of Airports Thailand, Thai Meteorological Department, Air4Thai / Pollution Control Department en NederlandWereldwijd.
- De city-route blijft de Nederlandse destination owner. Er bestaat geen overlappende Nederlandse blogroute die consolidatie of redirect nodig heeft.
- `mae hong son loop thailand` is met DFS-volume 880 een zelfstandige supporting-ownerkans. De destinationpagina vat de keuze samen, maar probeert de volledige Loop-intentie niet te bezitten.

## Information gain

1. De pagina maakt vooraan expliciet onderscheid tussen Mae Hong Son-stad, de provincie en de meerdaagse Mae Hong Son Loop.
2. De geografie wordt verdeeld in de compacte stad rond Nong Chong Kham, de nabije west-/stadsrand, de noordroute Ban Rak Thai–Pang Ung en de oostroute Tham Lod–Pai.
3. Twee tot drie nachten is een transparant redactioneel advies: twee voor stad plus nabij, drie voor een volwaardige noordroute.
4. Pai en Mae Hong Son worden niet als simpele rivalen gepresenteerd: Pai is levendiger en toeristischer, Mae Hong Son een rustige provinciehoofdstad; binnen de Loop zijn het verschillende stops.
5. Auto, chauffeur, openbaar vervoer en motor worden als echte vervoerskeuzes vergeleken. De Loop is geen verplichte scooterrit en geen verantwoorde eerste bergtraining.
6. De owner bevriest geen vluchtfrequentie, busuren, ticketprijzen, hotelprijzen of entree. Het officiële luchthavenbord, TMD en Air4Thai blijven actuele controles.
7. Droog weer wordt niet automatisch als helder verkocht: rook en PM2.5 kunnen juist in de late droge tijd een doorslaggevende factor zijn.
8. De cultuurlaag vermijdt exotiserende “longneck”-, “tribe”- en “authentiek dorp”-taal. Toestemming, actieve religieuze ruimtes en community-context worden concreet genoemd.
9. De foodlaag verbindt khao sen, khao som, Yunnanese thee/mantou en tiger-striped peanuts met vissaus-, garnalenpasta-, pinda-, sesam-, soja-, ei- en kruiscontactchecks.

## Visueel systeem

Vijf nieuwe plaatsgebonden WebP-assets zijn met de imagegen-skill gemaakt, visueel gecontroleerd en met quality 86/method 6 geoptimaliseerd:

- `mae-hong-son-hero.webp` — Nong Chong Kham, Shan-tempels, Doi Kong Mu en mistige vallei met lichte kopruimte links; geen Chiang Mai-, strand- of karstcliché.
- `mae-hong-son-lake-temples.webp` — lokale avondwandeling langs het meer met verlichte tempels en gewone hedendaagse kleding.
- `mae-hong-son-north-route.webp` — thee, een bescheiden bewoonde Yunnanese/Chinees-Thaise bergnederzetting en dennenreservoir zonder themepark- of Alpenfantasie.
- `mae-hong-son-tai-yai-food.webp` — marktcontext met khao sen, tomatenrijst, groenten, thee en tiger-striped peanuts zonder gestileerde “tribe”-setting.
- `mae-hong-son-route-banner.webp` — donkere tekstruimte, stad als basis en afzonderlijke bergtakken met de oranje stippelroute; bewust redactioneel en niet op schaal.

De vijf WebP-bestanden wegen samen circa 793 KB. Het onjuiste Chiang Mai-parkbeeld uit de legacy city-data wordt niet meer als gerenderde hoofdcontentafbeelding gebruikt.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/mae-hong-son/` bij 1440 × 900 en 390 × 844 px.
- 2.911 gerenderde hoofdcontentwoorden.
- Eén H1: `Mae Hong Son zonder haast`.
- Alle secties van hero tot bronnen, feedback en nieuwsbrief renderen in het premium destination-template.
- Geen horizontale overflow: desktop documentbreedte 1425/1425 en mobiel 375/375.
- Vijftien gerenderde hoofdcontentbeelden; nul gebroken beelden en nul afbeeldingen zonder alt-attribuut.
- De hero houdt de plaatsgebonden tempels rechts en de leesbare lichte contentlaag links. De sidecard past zonder het tempelbeeld af te dekken.
- De zone-, highlight-, route- en praktische kaarten blijven op desktop in balans en zakken op mobiel zonder clipping naar één kolom.
- De mobiele sticky bestemmingszoeker en bottom-nav zijn aanwezig; de desktopheader is onder de mobiele breakpoint verborgen.
- De geopende FAQ gebruikt `rgb(41, 53, 49)`, 14 px tekst en 28 px regelhoogte en is goed leesbaar.
- Alleen de bekende globale dev/vendorlogs blijven buiten deze owner om relevant: de externe `emrldco.com`-configmelding en Next HMR-waarschuwing horen bij de latere globale technische eindaudit.

## SEO, schema, links en affiliates

- Canonical: `https://go2-thailand.com/nl/city/mae-hong-son/`.
- Hreflang: minimaal `nl` en `x-default`; de gekoppelde Engelse route blijft ongewijzigd tot de eigen EN-fase.
- De template levert `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage` naast de globale organisatieschema's.
- Alleen bestaande interne vervolgowners worden gelinkt: attracties, food, beste reistijd, verblijf, Pai en vervoer. De niet-bestaande `/nl/city/mae-hong-son/weather/` wordt bewust niet gelinkt.
- Klook, Trip.com en 12Go blijven transparante gesponsorde uitgangen met route-eigen sub-ID's. Amazon wordt alleen toegevoegd wanneer een concrete supporting paklijst de productkeuze inhoudelijk uitlegt.
- De owner krijgt een eigen keywordregel; de grotere Loop-intentie blijft een afzonderlijk toekomstig cluster en veroorzaakt geen harde ownercollision.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:verify:nl-runtime` — groen: 70/70 Nederlandse ownerroutes.
- `npm run seo:cannibalization` — groen: 0 harde collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte Amazon-slugs en 13 geregistreerde producten.
- Acht unieke interne vervolgroutes — allemaal HTTP 200.
- `git diff --check` — groen; alleen verwachte Windows LF/CRLF-informatiewaarschuwingen.

## GA4-queue

De aangeleverde GA4-top 25 staat volledig in `seo/analytics/ga4-top-pages-2026-06-25--2026-07-21.csv` en de uitvoeringsmatrix. De enige Nederlandse top-25-route, El Niño, is al inhoudelijk en visueel vernieuwd. De grotendeels Engelse verkeersroutes blijven beschermd en krijgen later zelfstandige Engelse DFS-, concurrent-, PAA- en visuele research.
