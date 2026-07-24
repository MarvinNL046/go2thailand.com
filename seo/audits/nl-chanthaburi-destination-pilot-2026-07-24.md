# NL destination audit — Chanthaburi

**Route:** `/nl/city/chanthaburi/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `chanthaburi thailand`: volume 90, KD 0, informationele intentie.
- Cluster: 114 ruwe keywordrecords en 50 concurrerende domeinen; algemene Thailand-, Koh Chang-, Kanchanaburi- en voetbalruis is uitgesloten.
- Tien live Nederlandse SERP's voor bestemming, bezienswaardigheden, activiteiten, oude stad, edelstenenmarkt, fruit, strand, beste reistijd, Bangkok-route en verblijfsduur.
- Zeven bruikbare, letterlijk aangetroffen Chanthaburi-PAA's. Generieke vragen zijn niet als lokale PAA herschreven.
- Zes concurrentie-/bronparses, waarvan vijf substantiële pagina's en één minimale officiële TAT-attractieparse; aanvullende primaire informatie is rechtstreeks gecontroleerd.
- Nul gevonden rankingkeywords en geen aangetoonde backlinks voor zowel `/nl/city/chanthaburi/` als de overlappende NL-blogroute.
- De city-route wordt de Nederlandse destination owner. `/nl/blog/chanthaburi-gem-market-old-town-eastern-thailand-guide-2026/` geeft permanent 308 naar de owner en verdwijnt uit NL-bloglijsten.
- De Engelse blogroute blijft HTTP 200 en onaangeroerd tot de zelfstandige Engelse fase.
- Primaire context is gecontroleerd bij Tourism Authority of Thailand, Thailand Tourism Directory, Thai Meteorological Department en NederlandWereldwijd.

## Information gain

1. De pagina maakt direct onderscheid tussen Chanthaburi-stad en de grotere provincie.
2. Vier reiszones voorkomen valse nabijheid: Chanthaboon Waterfront/kathedraal, Gem Road/marktcentrum, fruit/Namtok Phlio en Kung Krabaen/kust.
3. Twee nachten is het minimum voor stad plus één buitenroute; drie nachten scheidt landinwaarts en kust zonder kriskras rijden.
4. De comfortabelere weerperiode en het mei–juli-fruitvenster worden als verschillende prioriteiten behandeld.
5. Boomgaardopening, oogst, marktactiviteit, busuren, entree en prijzen worden niet bevroren; directe controle blijft onderdeel van de planning.
6. De edelstenenmarkt krijgt een concreet koopkader: onafhankelijke laboratoriumdocumentatie, geen visuele waardebepaling en geen aankoop onder tijdsdruk.
7. De owner corrigeert de simplistische kolonisatieclaim: Chanthaburi stond tijdelijk onder Franse bezetting.
8. De kustlaag maakt duidelijk dat een strandfoto geen zwemadvies is en verbindt vlaggen, stroming, onweer en TMD-waarschuwingen.
9. Omdat Chanthaburi een grensprovincie is, verwijst de pagina expliciet naar het actuele NederlandWereldwijd-kaartbeeld en blijft de voorgestelde route buiten rood/oranje grensgebied.
10. De foodlaag verbindt sen chan pad pu, moo chamuang en seizoensfruit met krab-, garnaal-, vissaus-, ei-, pinda-, soja-, bouillon- en kruiscontactchecks.

## Visueel systeem

Vijf nieuwe plaatsgebonden WebP-assets zijn met de imagegen-skill gemaakt, visueel gecontroleerd en met quality 84/method 6 geoptimaliseerd:

- `chanthaburi-hero.webp` — rivier, historische handelshuizen en kathedraal met rustige tekstzone; geen Bangkok- of karstcliché.
- `chanthaburi-mangrove-coast.webp` — geloofwaardige boardwalk, mangrovewortels en getijdenwater voor Kung Krabaen.
- `chanthaburi-gem-market.webp` — documentaire werktafel met kleine robijnen/saffieren en loupe, zonder luxe-showroomfantasie.
- `chanthaburi-fruit-food.webp` — durian, mangosteen, rambutan, salak en sen chan met krab in een levendige marktcontext.
- `chanthaburi-route-banner.webp` — donkere groene tekstruimte, stad, fruit, waterval en kust met de oranje stippelroute; bewust redactioneel en niet op schaal.

De vijf WebP-bestanden wegen samen circa 1,26 MiB. Het foutieve Bangkokbeeld uit de legacy city-data wordt niet meer als hoofdcontentbeeld gebruikt.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/chanthaburi/` bij 1440 × 900 en 390 × 844 px.
- 2.791 gerenderde hoofdcontentwoorden op desktop.
- Eén H1: `Chanthaburi in drie richtingen`.
- Geen horizontale overflow: desktop 1425/1425 en mobiel 375/375 documentbreedte.
- Vijftien gerenderde hoofdcontentbeelden; na volledige lazy-load nul gebroken beelden en nul beelden zonder alt-attribuut.
- De desktophero houdt de rivierstad herkenbaar en laat de statkaart vrij van de hoofdtekst; de CTA's en affiliatevermelding blijven leesbaar.
- De vier zonekaarten gebruiken op desktop één brede ownerkaart en drie gelijkwaardige vervolgkaarten; mobiel stapelen ze zonder clipping.
- De brede routebanner behoudt op beide viewports de donkere tekstzone, oranje route en duidelijke CTA-hiërarchie.
- De mobiele sticky bestemmingszoeker en bottom-nav zijn aanwezig; er is geen desktopheader binnen het mobiele breakpoint.
- De geopende FAQ gebruikt `rgb(41, 53, 49)`, 14 px tekst en 28 px regelhoogte.

## SEO, schema, links en affiliates

- Canonical: `https://go2-thailand.com/nl/city/chanthaburi/`.
- Hreflang: `en`, `nl` en `x-default`; de Engelse destinationinhoud is niet gewijzigd.
- Schema: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- Acht unieke interne vervolgroutes zijn runtime gecontroleerd en geven allemaal HTTP 200: NL-home, destinations, city-owner, verblijf, attracties, food, Koh Chang en beste reistijd.
- Klook, Trip.com en 12Go gebruiken transparante sponsored/nofollow-uitgangen met Chanthaburi-specifieke sub-ID's.
- Amazon is niet als generiek productrek toegevoegd; een latere concrete fruit-/regen-/kustpaklijst kan producten pas na eigen informatiewaarde opnemen.
- De keywordmatrix bevat één nieuwe destination-ownerregel; de aparte food-, weather-, hotel- en attractie-intenties blijven supporting owners.

## GA4-queue

De aangeleverde GA4-top 25 blijft de beschermde uitvoeringsvolgorde voor de Engelse fase. De Nederlandse El Niño-route is al zelfstandig met DFS en premium design afgerond. Geen van de Engelse verkeerstop-URLs is door deze Chanthaburi-consolidatie gewijzigd.

## Gates

- `npx tsc --noEmit` — groen; gegenereerde `tsconfig.tsbuildinfo` is hersteld.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:verify:nl-runtime` — groen: 71/71 Nederlandse ownerroutes.
- `npm run seo:cannibalization` — groen: 0 harde collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte Amazon-slugs en 13 geregistreerde producten.
- `git diff --check` — groen na formattering en whitespacecontrole.
