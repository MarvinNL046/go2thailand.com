# NL Ubon Ratchathani destination-owner audit — 2026-07-24

## Status

Geïmplementeerd en volledig lokaal gevalideerd.

## Owner en zoekintentie

- Primaire owner: `/nl/city/ubon-ratchathani/`
- Primair keyword: `ubon ratchathani thailand` — volume 90, KD 0, informational
- Ondersteunende intenties: bezienswaardigheden, de moeite waard, kaarsenfestival, Pha Taem, Khong Chiam en Sam Phan Bok
- De overlappende NL travel-guide had geen gemeten rankings of backlinks en consolideert permanent naar deze owner.
- De hotelowner blijft apart voor verblijfsintentie; Engelse routes blijven in deze NL-fase onaangeroerd.

## Onderzoek en informatievoordeel

- DataForSEO-cluster: 66 directe records en 41 concurrentdomeinen.
- Tien Nederlandse SERP's en zes passende echte PAA-vragen onderzocht.
- Concurrenten en officiële bronnen gecontroleerd voor stad/provincie, kaarsenfestival, Pha Taem, vliegveld, trein en actueel reisadvies.
- Informatievoordeel: duidelijke stad-provinciescheiding, drie-nachtenroute, waterstand vóór Sam Phan Bok, jaarprogramma vóór festivaldata, Warin Chamrap voor het station en actuele grenszones als aparte routebeslissing.

## Visuele implementatie

- Zeven nieuwe plaatsgebonden WebP-assets: hero, kaarsenfestival, Wat Nong Bua, Pha Taem, Khong Chiam, foodmarkt en routebanner.
- De herbruikbare premium destination-template draagt zones, highlights, food, route, planning, FAQ, bronnen en gerelateerde gidsen.

## QA

- Browser desktop: 1280 px viewport, 2712 gerenderde hoofdcontentwoorden, geen horizontale overflow.
- Browser mobiel: 390 × 844 px, volledige H1 leesbaar, sticky bestemmingszoeker en bottom-navigation zichtbaar, geen horizontale overflow.
- Alle 17 gerenderde afbeeldingen laden; nul kapotte afbeeldingen en nul ontbrekende alt-teksten.
- De nieuwe Wat Nong Bua-cardasset vervangt hergebruik van de hero. De hero staat één keer in de DOM en is als LCP-afbeelding gepreload.
- FAQ open-state is op desktop en mobiel donker, scherp en goed leesbaar.
- Canonical, NL/EN/x-default hreflang en zes schema-objecten aanwezig: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Alle gerenderde interne ownerlinks geven lokaal HTTP 200.
- `/nl/guides/travel-guide/ubon-ratchathani/` geeft permanent 308 naar de city-owner; de Engelse route blijft HTTP 200.
- Repository-gates groen: TypeScript, 7 design-primitives en 26 templates, 73/73 NL-runtimeowners, 0 cannibalisatiebotsingen en 13/13 Amazon-affiliateproducten.
- Browserconsole bevat geen paginafouten of LCP-waarschuwing na de asset-splitsing; alleen een ontwikkelserver-HMR-waarschuwing die niet in productie bestaat.
