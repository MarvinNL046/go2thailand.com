# NL Korat / Nakhon Ratchasima destination-owner audit — 2026-07-24

## Status

Geïmplementeerd en volledig lokaal gevalideerd.

## Owner en zoekintentie

- Primaire owner: `/nl/city/nakhon-ratchasima/`
- Primair keyword: `korat thailand` — volume 320, KD 1, informational
- Officiële naam en tweede intentie: `nakhon ratchasima thailand` — volume 90, KD 7
- Ondersteunende intenties: bezienswaardigheden, bezoekwaardigheid, Phimai, Khao Yai, pad mee Korat, geopark en beste reistijd.
- De overlappende NL travel-guide had geen gemeten rankings of backlinks en consolideert permanent naar deze owner.
- De hotelowner blijft apart voor verblijfsintentie; Engelse routes blijven in deze NL-fase onaangeroerd.

## Onderzoek en informatievoordeel

- DataForSEO-cluster: 105 ruwe records en 50 concurrentdomeinen.
- Tien Nederlandse SERP's en acht passende echte PAA-vragen onderzocht.
- Vier Nederlandse concurrenten volledig geparseerd; TAT, UNESCO, DNP en SRT als primaire bronnen gecontroleerd.
- Informatievoordeel: naamverklaring, stad/provincie, Phimai/Khao Yai/geopark als afzonderlijke corridors, drie-nachtenbeslissing, Pak Chong als eigen basis en pad mee Korat als lokale eetidentiteit.

## Visuele implementatie

- Acht nieuwe projectgebonden WebP-assets: hero, Ya Mo, Wat Sala Loi, Phimai, Khorat Geopark, Khao Yai, routebanner en pad mee Korat.
- Het herbruikbare premium destination-template draagt zones, highlights, food, route, planning, FAQ, bronnen en gerelateerde gidsen.

## QA

- Browser desktop: 1280 px viewport, 2681 gerenderde hoofdcontentwoorden, geen horizontale overflow.
- Browser mobiel: 390 × 844 px, volledige H1 leesbaar, sticky bestemmingszoeker en bottom-navigation zichtbaar, geen horizontale overflow.
- Alle 17 gerenderde afbeeldingen laden; nul kapotte afbeeldingen en nul ontbrekende alt-teksten.
- De hero staat één keer in de DOM en is als LCP-afbeelding gepreload.
- FAQ open-state is op desktop en mobiel donker, scherp en goed leesbaar: rgb(41, 53, 49), 14 px en 28 px regelhoogte.
- Canonical, NL/EN/x-default hreflang en zes schema-objecten aanwezig: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Alle interne ownerlinks geven lokaal HTTP 200.
- `/nl/guides/travel-guide/nakhon-ratchasima/` geeft permanent 308 naar de city-owner; de Engelse route blijft HTTP 200.
- Repository-gates groen: TypeScript, 7 design-primitives en 26 templates, 74/74 NL-runtimeowners, 0 cannibalisatiebotsingen en 13/13 Amazon-affiliateproducten.
- Browserconsole bevat geen paginafouten of LCP-waarschuwing; alleen een ontwikkelserver-HMR-waarschuwing die niet in productie bestaat.
