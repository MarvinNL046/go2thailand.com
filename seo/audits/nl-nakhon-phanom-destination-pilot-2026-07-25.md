# NL Nakhon Phanom destination — acceptance audit

**Route:** `/nl/city/nakhon-phanom/`

**Datum:** 25 juli 2026

**Template:** `DestinationGuideTemplate`
**Status:** groen na desktop-, mobiel-, bron-, zoek- en runtime-QA

## Onderzoek en ownerkeuze

- Vergelijkende DFS-clusterrun uitgevoerd: 18 relevante records, 42 concurrentdomeinen, hoofdtermvolume circa 140 en KD 0.
- Elf geslaagde live Nederlandse SERP-sets onderzocht, waaronder de semantische reisduurvervanger `hoe lang in nakhon phanom` nadat de exacte query tweemaal door DataForSEO werd geweigerd.
- Zeven bruikbare letterlijke owner-PAA behouden; generieke provincieranglijsten, Thailand-highlights, Ho Chi Minh City- en luchthavenruis uitgesloten.
- Zichtbare concurrenten onderzocht bij BM Air, Rough Guides en Travelfish. Feiten en veranderlijke planning gecontroleerd bij TAT, UNESCO, Department of Airports Thailand, TMD en NederlandWereldwijd.
- City-, travel-guide- en where-to-stay-kandidaten: nul gevonden rankingkeywords en geen zichtbaar backlinksamenvattingssignaal.
- `/nl/guides/travel-guide/nakhon-phanom/` consolideert daarom permanent naar de city-owner; de Engelse equivalent blijft 200.

## Content en ontwerp

- Unieke title, meta description en exact één H1.
- 2.751 gerenderde woorden in `main`.
- Vier duidelijke reiszones: rivierfront en klokkentoren, Wat Mahathat en Saint Anna, Ban Na Chok en Vietnamees erfgoed, plus Wat Phra That Phanom als afzonderlijke districtuitstap.
- City-first information gain: stad, provincie, That Phanom District en de Laotiaanse overkant worden niet als één compacte checklist gepresenteerd.
- De pagina maakt expliciet dat de markante bergen aan de Laotiaanse kant van de Mekong liggen en dat de stad zelf vlak is.
- De UNESCO-status is precies beschreven als Tentative List en niet als definitief ingeschreven werelderfgoed.
- Acht nieuwe projectgebonden WebP-assets voor hero, klokkentoren, Saint Anna, Ban Na Chok, Wat Phra That Phanom, fietsroute, eten en Lai Ruea Fai.

## Browser-QA

- Desktop: effectieve documentbreedte 1.265 px, geen horizontale overflow.
- Mobiel: 390 × 844, geen horizontale overflow; sticky bestemmingzoeker en vaste bottomnavigation aanwezig en de desktopnavigation verborgen.
- 17 gerenderde afbeeldingen, nul gebroken afbeeldingen en nul ontbrekende altteksten.
- Logo en hero hebben een image-preload; de hero-srcset verwijst naar `nakhon-phanom-hero.webp`.
- Open FAQ: tekstkleur `rgb(41, 53, 49)`, 14 px en 28 px line-height.
- Zoekmodal opent, sluit en navigeert terug naar de juiste Nederlandse owner. De gedeelde index is daarbij uitgebreid van een handmatige shortlist naar alle 34 steden en negen aanvullende eilanden zonder dubbele slugs; alle 43 zoekroutes geven lokaal 200.
- Geen applicatiefouten in de browserconsole. De ontwikkelomgeving meldt alleen de bekende LCP-waarschuwing doordat dezelfde reeds gepreloade hero-asset later opnieuw op de pagina wordt gebruikt; de daadwerkelijke hero-preload is aantoonbaar aanwezig.

## SEO, links en affiliates

- Canonical: `https://go2-thailand.com/nl/city/nakhon-phanom/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Zes JSON-LD-typen: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Affiliate-uitgangen naar Trip.com, Klook en 12Go bevatten `noopener noreferrer nofollow sponsored` en zichtbare disclosures.
- Owner en alle gecontroleerde interne contentroutes geven 200: verblijf, bezienswaardigheden, eten, festivals, vervoer, Mukdahan en weer.
- NL duplicate: 308 naar de owner; Engelse travel-guide: 200.
- TypeScript, designcheck (7 primitives/26 templates), cannibalisatie (0/0) en Amazon-affiliatecheck (13/13) groen.

## Bronnen en veranderlijke feiten

De pagina behandelt festivaldata, vluchtfrequenties, marktavonden, tempelceremonies, grensregels, visa, verzekeringsdekking, weer en rivierstand als veranderlijke feiten. Oude ferry- of visa-on-arrivaldetails uit concurrentteksten zijn niet overgenomen; actuele controle bij officiële instanties blijft expliciet onderdeel van de reisbeslissing.
