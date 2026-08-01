# NL Bueng Kan destination — acceptance audit

**Route:** `/nl/city/bueng-kan/`

**Datum:** 25 juli 2026

**Template:** `DestinationGuideTemplate`
**Status:** groen na desktop-, mobiel-, bron-, affiliate- en runtime-QA

## Onderzoek en ownerkeuze

- Twee DataForSEO-clusters en twaalf geslaagde live Nederlandse SERP-sets onderzocht. De primaire term `bueng kan thailand` heeft Nederlands volume circa 30; DataForSEO rapporteerde geen bruikbare KD, dus er is geen moeilijkheidsgraad verzonnen.
- Zes bruikbare letterlijke owner-PAA behouden: bereikbaarheid, nationale parken, bezoekwaardigheid, veiligheid, Three Whale Rock en de geschiedenis van Naka Cave. Algemene Thailand-, mythologie-, luchthaven- en Mekongruis is uitgesloten.
- Vier zichtbare concurrentpatronen onderzocht: OmniTraveler, Migrationology, Tourism Authority of Thailand en Tripadvisor. Verouderde route-, grens-, prijs- en toegangsclaims zijn niet als actuele instructie overgenomen.
- Feiten en veranderlijke planning gecontroleerd bij TAT, Department of National Parks, Thailand PRD, Department of Airports, Ramsar, TMD en NederlandWereldwijd.
- City-, travel-guide- en where-to-stay-kandidaten: nul gevonden rankingkeywords en geen zichtbaar backlinksamenvattingssignaal.
- `/nl/guides/travel-guide/bueng-kan/` consolideert daarom permanent naar de city-owner; de Engelse equivalenten blijven 200.

## Content en ontwerp

- Unieke title, meta description en exact één H1.
- 3.350 gerenderde woorden in `main`.
- Vier duidelijke reiszones: Bueng Kan-stad en Mekong, Phu Sing en Hin Sam Wan, Wat Phu Tok en Si Wilai, en Bueng Khong Long met Naka Cave.
- Provincie-first information gain: stad, noordelijke rots- en tempeldagen en de zuidelijke tweede basis worden niet als één compacte checklist gepresenteerd.
- De Fifth Thai–Lao Friendship Bridge wordt op basis van officiële bronnen als geopende grensinfrastructuur behandeld; oude informatie dat Bueng Kan geen legale grensovergang heeft is gecorrigeerd zonder veranderlijke uren, tol of shuttles hard te coderen.
- Negen nieuwe, onderling unieke, projectgebonden WebP-assets voor hero, Mekongstad, Wat Phu Tok, Naka Cave, Nong Kut Ting, Hin Sam Wan, route, Friendship Bridge en eten.
- Alle negen assets geven lokaal 200, hebben unieke hashes en zijn geoptimaliseerd tot circa 76–390 kB; de originele imagegen-uitvoer is behouden.

## Browser-QA

- Desktop: 1.280 × 720 viewport, effectieve documentbreedte 1.265/1.265, zonder horizontale overflow.
- Mobiel: echte Chrome-headless-opname op 500 × 900, ruim binnen de mobiele breakpoint; sticky bestemmingzoeker, gestapelde hero-CTA’s en alle vier vaste bottomnavigation-items zijn zichtbaar zonder afsnijding.
- Hero, informatielaag, keuzekaarten, affiliate-CTA, bronnenblok en open FAQ zijn afzonderlijk gecontroleerd. De onderste paginahelft gebruikt hetzelfde reeds mobiel gevalideerde `DestinationGuideTemplate` en behoudt het visuele ritme.
- 17 gerenderde beeldinstanties, nul gebroken bronbestanden en nul ontbrekende altteksten.
- Open FAQ: tekstkleur `rgb(41, 53, 49)`, 14 px en 28 px line-height.
- Geen runtime-erroroverlay. De aanwezige dev-badge is Next-ontwikkelinterface en geen pagina- of componentfout.

## SEO, links en affiliates

- Canonical: `https://go2-thailand.com/nl/city/bueng-kan/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Zes JSON-LD-typen: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Vijf affiliate-uitgangen verdeeld over Trip.com, Klook en 12Go bevatten alle `noopener noreferrer nofollow sponsored` en hebben zichtbare disclosures.
- Owner en alle gecontroleerde interne contentroutes geven 200: homepage, bestemmingen, verblijf, vervoer, bezienswaardigheden, eten, Nong Khai en weer.
- NL duplicate: 308 naar de owner; Engelse city- en travel-guide-routes: 200.
- TypeScript, gerichte ESLint-controle, designcheck (7 primitives/26 templates), cannibalisatie (0/0) en Amazon-affiliatecheck (13/13) groen.

## Bronnen en veranderlijke feiten

De pagina behandelt parkstatus, trailreservering, sluitingen, tempeltoegang, brug- en grensprocedures, bus- en vluchtnetwerk, visa, voertuigdocumenten, verzekeringsdekking, weer en rivierstand als veranderlijke feiten. Bueng Kan heeft geen operationele commerciële passagiersluchthaven of spoorstation; de tekst schrijft daarom geen universele “dichtstbijzijnde luchthaven” voor, maar laat de reiziger actuele vluchten, wegtransfer en totale deur-tot-deurtijd vergelijken.
