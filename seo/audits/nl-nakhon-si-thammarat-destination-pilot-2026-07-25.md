# NL Nakhon Si Thammarat destination — acceptance audit

**Route:** `/nl/city/nakhon-si-thammarat/`

**Datum:** 25 juli 2026

**Template:** `DestinationGuideTemplate`
**Status:** groen na desktop-, mobiel-, bron- en runtime-QA

## Onderzoek en ownerkeuze

- Vergelijkende DFS-clusterrun uitgevoerd: 18 relevante records, 49 concurrentdomeinen, hoofdtermvolume circa 210 en KD 3.
- Elf live Nederlandse SERP-sets onderzocht voor de hoofdterm, bezienswaardigheden, reisduur, Kiriwong, Wat Phra Mahathat, nang talung, reistijd en luchthavenintentie.
- Zeven bruikbare letterlijke owner-PAA behouden; generieke Thailand-, Chiang Mai-, Myanmar-, woning- en provincieruis uitgesloten.
- Zichtbare concurrenten onderzocht bij onder meer LocalHeroTravel, Azie.nl/Rough Guides en Thailandblog. Feiten en planning gecontroleerd bij TAT, Thailand.go.th, UNESCO, TMD, Department of Airports, DNP en NederlandWereldwijd.
- City-, travel-guide- en where-to-stay-kandidaten: nul gevonden rankingkeywords en geen zichtbaar backlinksamenvattingssignaal.
- `/nl/guides/travel-guide/nakhon-si-thammarat/` consolideert daarom permanent naar de city-owner; de Engelse equivalent blijft 200.

## Content en ontwerp

- Unieke title, meta description en exact één H1.
- 2.650 gerenderde woorden in `main`.
- Vier duidelijke reiszones: Wat Phra Mahathat/Ratchadamnoen, Ban Nang Talung/ambacht, Tha Wang/marktritme en Kiriwong/Lan Saka als afzonderlijke daguitstap.
- City-first information gain: stad, provincie, Kiriwong en Khanom worden niet als één compacte checklist gepresenteerd.
- Onjuiste oude treinclaim gecorrigeerd: de stad heeft een eigen spoorstation, terwijl sommige verbindingen een overstap via Thung Song vragen.
- Acht nieuwe projectgebonden WebP-assets voor hero, oude stad, schaduwpoppenspel, Kiriwong, tempeldetail, routebanner, eten en Tha Wang. Het grootste kaartbeeld is aanvullend gecomprimeerd van 425 kB naar 311 kB zonder dimensieverlies.

## Browser-QA

- Desktop: effectieve documentbreedte 1.265 px, geen horizontale overflow.
- Mobiel: 390 × 844, geen horizontale overflow; sticky bestemmingzoeker en vaste bottomnavigation aanwezig en de desktopnavigation verborgen.
- 17 gerenderde afbeeldingen, nul gebroken afbeeldingen en nul ontbrekende altteksten.
- Logo en hero hebben een image-preload; de hero-srcset verwijst naar `nakhon-si-thammarat-hero.webp`.
- Open FAQ: tekstkleur `rgb(41, 53, 49)`, 14 px, 28 px line-height en zichtbaar op een transparante achtergrond.
- Geen console-warnings of -errors tijdens de eindcontrole.

## SEO, links en affiliates

- Canonical: `https://go2-thailand.com/nl/city/nakhon-si-thammarat/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Zes JSON-LD-typen: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Affiliate-uitgangen naar Trip.com, Klook en 12Go bevatten `noopener noreferrer nofollow sponsored` en zichtbare disclosures.
- Owner en alle gecontroleerde interne contentroutes geven 200: verblijf, bezienswaardigheden, eten, vervoer, Surat Thani, Hat Yai en weer.
- NL duplicate: 308 naar de owner; Engelse travel-guide: 200.
- TypeScript, designcheck (7 primitives/26 templates), cannibalisatie (0/0) en Amazon-affiliatecheck (13/13) groen.

## Bronnen en veranderlijke feiten

De pagina claimt Wat Phra Mahathat tijdens de lopende 48e UNESCO-sessie niet voortijdig als definitief werelderfgoed. Openingstijden, demonstraties, vluchtfrequenties, treinroutes, transfers, weersomstandigheden en waterstand worden als veranderlijke feiten behandeld met expliciete controlepunten bij officiële of lokale bronnen.
