# NL Mukdahan destination — acceptance audit

**Route:** `/nl/city/mukdahan/`

**Datum:** 25 juli 2026

**Template:** `DestinationGuideTemplate`
**Status:** groen na desktop-, mobiel-, bron-, affiliate- en runtime-QA

## Onderzoek en ownerkeuze

- Twee DataForSEO-clusters onderzocht; primaire term `mukdahan` heeft Nederlands volume circa 50 en KD 0, met `mukdahan thailand` op circa 20.
- Elf geslaagde live Nederlandse SERP-sets onderzocht. De twee letterlijke Savannakhet-queries gaven na herhaling DFS-fout 40101; `second thai lao friendship bridge mukdahan` is als geslaagde semantische vervanger gebruikt.
- Zeven bruikbare letterlijke owner-PAA behouden. Algemene Thailand-, provincie-, luchthaven- en grensruis is uitgesloten.
- Vier zichtbare concurrenten inhoudelijk onderzocht: BM Air, Thailandblog, Adventures of Jellie en ThailandAddict. Verouderde ferry-, visa-run-, prijs- en openingstijdclaims zijn niet als actuele instructie overgenomen.
- Feiten en veranderlijke planning gecontroleerd bij TAT, TAT ASEAN Heritage Trail, TMD, State Railway of Thailand en NederlandWereldwijd.
- City-, travel-guide- en where-to-stay-kandidaten: nul gevonden rankingkeywords en geen zichtbaar backlinksamenvattingssignaal.
- `/nl/guides/travel-guide/mukdahan/` consolideert daarom permanent naar de city-owner; de Engelse equivalent blijft 200.

## Content en ontwerp

- Unieke title, meta description en exact één H1.
- 2.587 gerenderde woorden in `main`.
- Vier duidelijke reiszones: rivierfront en Indochina Market, Ho Kaeo, Phu Manorom en Phu Pha Thoep als afzonderlijke provinciale natuurdag.
- City-first information gain: Mukdahan-stad, Mukdahan-provincie en Savannakhet worden niet als één compacte checklist gepresenteerd.
- De Second Thai-Lao Friendship Bridge wordt als infrastructuur en grensbeslissing behandeld, niet als spontane wandelattractie.
- Acht nieuwe, onderling unieke, projectgebonden WebP-assets voor hero, markt, Ho Kaeo, Phu Manorom, Phu Pha Thoep, rivierroute, Friendship Bridge en eten.
- Alle acht bronassets geven lokaal 200 en zijn geoptimaliseerd tot circa 110–306 kB; de originele imagegen-uitvoer is behouden.

## Browser-QA

- Desktop: 1.440 × 1.000 viewport, effectieve documentbreedte 1.425/1.425, zonder horizontale overflow.
- Mobiel: 390 × 844 viewport, effectieve documentbreedte 375/375, zonder horizontale overflow; sticky bestemmingzoeker en vaste bottomnavigation zichtbaar, desktopheader visueel verborgen.
- Hero, route, praktische kaarten en FAQ zijn afzonderlijk op desktop en mobiel gecontroleerd; de onderste paginahelft behoudt beeldritme en contenthiërarchie.
- 17 gerenderde beeldinstanties, nul gebroken bronbestanden en nul ontbrekende altteksten. Lazy beelden buiten de actieve viewport blijven terecht uitgesteld; alle onderliggende projectassets geven 200.
- Logo en hero hebben een image-preload. De devconsole meldt de bekende Next-LCP-waarschuwing wanneer dezelfde hero later als weerbeeld opnieuw in beeld komt; de echte hero is in `EditorialHero` expliciet `priority`.
- Open FAQ: tekstkleur `rgb(41, 53, 49)`, 14 px en 28 px line-height.
- Geen error-overlay. De enige overige browserwaarschuwing is een Next dev-HMR `isrManifest`-melding en treedt niet op als pagina- of componentfout.

## SEO, links en affiliates

- Canonical: `https://go2-thailand.com/nl/city/mukdahan/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Zes JSON-LD-typen: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Vijf affiliate-uitgangen verdeeld over Trip.com, Klook en 12Go bevatten alle `noopener noreferrer nofollow sponsored` en hebben zichtbare disclosures.
- Owner en alle gecontroleerde interne contentroutes geven 200: homepage, bestemmingen, verblijf, vervoer, bezienswaardigheden, eten, Nakhon Phanom en weer.
- NL duplicate: 308 naar de owner; Engelse travel-guide: 200.
- TypeScript, gerichte ESLint-configcontrole, designcheck (7 primitives/26 templates), cannibalisatie (0/0) en Amazon-affiliatecheck (13/13) groen.

## Bronnen en veranderlijke feiten

De pagina behandelt parkstatus, tempeltoegang, marktbezetting, bus- en vluchtnetwerk, grensopening, visa, verzekeringsdekking, weer en rivierstand als veranderlijke feiten. Mukdahan heeft geen commercieel passagiersvliegveld of passagiersstation; de tekst schrijft daarom geen universele “dichtstbijzijnde luchthaven” voor, maar laat de reiziger actuele vluchten, wegtransfer en deur-tot-deurtijd vergelijken.
