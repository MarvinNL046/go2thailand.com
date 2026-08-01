# NL Chiang Khan destination — acceptance audit

**Route:** `/nl/city/chiang-khan/`
**Datum:** 25 juli 2026
**Template:** `DestinationGuideTemplate`
**Status:** groen na desktop-, mobiel-, bron- en runtime-QA

## Onderzoek en ownerkeuze

- Vergelijkende DFS-run voor de vijf resterende NL-destinationowners uitgevoerd.
- Chiang Khan gekozen op 79 clusterrecords, 50 concurrentdomeinen en een hoofdterm met circa volume 140 en KD 0.
- Tien live Nederlandse SERP-sets en twee exacte owner-PAA onderzocht; generieke Thailand-, Chiang Mai-, Mount Fuji-, kaart- en Wat Phu Tok-ruis uitgesloten.
- Travelvalley, Azie.nl, PANGEA Travel en ThailandIsaan als zichtbare concurrenten onderzocht; primaire feiten gecontroleerd bij TAT, Thailand.go.th, DASTA, TMD, Department of Airports en NederlandWereldwijd.
- City-, travel-guide- en where-to-stay-kandidaten: nul gevonden rankingkeywords en geen zichtbaar backlinksamenvattingssignaal.
- `/nl/guides/travel-guide/chiang-khan/` consolideert daarom permanent naar de city-owner; de Engelse equivalent blijft 200.

## Content en ontwerp

- Unieke title, meta description en één H1.
- 2.496 gerenderde woorden in `main`.
- Vier heldere zones: Chai Khong/Walking Street, Mekongpromenade, Phu Thok en Kaeng Khut Khu/buitenroute.
- Geografische information gain: Phu Thok, Wat Phu Tok en de Chiang Khan Skywalk worden expliciet als verschillende locaties behandeld.
- Acht nieuwe projectgebonden WebP-assets; alle bron-PNG's individueel bekeken en geografisch plausibel bevonden.
- Herbruikbare FAQ-intro sitebreed aangescherpt: echte PAA-vragen worden niet meer verward met aanvullende planningsvragen.

## Browser-QA

- Desktop: 1440 × 1000, geen horizontale overflow.
- Mobiel: 390 × 844, geen horizontale overflow; sticky bestemmingzoeker en vaste bottomnavigation aanwezig.
- Hero, quick-answer, food, praktische kaarten en FAQ visueel gecontroleerd.
- 17 gerenderde afbeeldingen, 11 unieke bronnen, nul gebroken afbeeldingen en nul ontbrekende altteksten.
- Logo en hero hebben een image-preload; de hero-srcset verwijst naar `chiang-khan-hero.webp`.
- Open FAQ: tekstkleur `rgb(41, 53, 49)`, 14 px op desktop, 28 px line-height en 343 px bruikbare tekstbreedte op mobiel.
- Geen paginagebonden console-error. Alleen een bekende Next-development-HMR-waarschuwing na de configuratieherstart verscheen.

## SEO, links en affiliates

- Canonical: `https://go2-thailand.com/nl/city/chiang-khan/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Zes JSON-LD-typen: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Affiliate-uitgangen naar Trip.com, Klook en 12Go bevatten `noopener noreferrer nofollow sponsored` plus vijf zichtbare disclosures.
- Alle door de owner gebruikte interne contentroutes gecontroleerd: 200.
- De gereserveerde Chiang Khan-weersubpillar geeft momenteel 404 door ontbrekende data; de owner verwijst daarom bewust naar de werkende `/nl/weather/`-hub. De subpillar blijft open familiewerk en wordt niet als afgerond voorgesteld.
- NL duplicate: 308; Engelse travel-guide: 200.
- TypeScript, designcheck (7 primitives/26 templates), cannibalisatie (0/0) en Amazon affiliatecheck (13/13) groen.

## Bronnen en veranderlijke feiten

Openingstijden, tarieven, vluchtfrequenties, lokale transfers, mist en waterstand worden niet als onveranderlijke feiten gepresenteerd. De owner verwijst voor actuele weers-, luchthaven-, verkeers- en veiligheidsinformatie naar primaire of publieke instanties en geeft bij buitenstops steeds een concreet controlemoment.
