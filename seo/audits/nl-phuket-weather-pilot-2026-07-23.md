# QA-audit — NL Phuket weer

**Route:** `/nl/city/phuket/weather/`  
**Datum:** 23 juli 2026; mobiele hercontrole 24 juli 2026  
**Resultaat:** desktop- en echte mobiele viewport-QA groen

## Design en inhoud

- Premium weather-template rendert met bestemmingsspecifieke headings en data; geen Krabi-tekst lekt door.
- Nieuwe hero, green-season banner en paklijst-flatlay laden zonder fouten.
- Hero, statistieken, maandtabel, seizoenskaarten, route-illustratie, Amazon-paklijst, FAQ, gerelateerde gidsen en bronnen zijn visueel gecontroleerd.
- Geen horizontale overflow gevonden bij de beschikbare desktopviewport.
- FAQ-interactie werkt en open antwoorden hebben voldoende visueel contrast.

## SEO en structured data

- Title: `Phuket weer & beste reistijd per maand`.
- H1: `Phuket weer. Wanneer ga jij?`.
- Canonical: `https://go2-thailand.com/nl/city/phuket/weather/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Geen `noindex` op de NL-route.
- Geldige JSON-LD-blokken aanwezig voor Organization, FAQPage, BreadcrumbList, WebPage en Dataset.
- DFS-cluster, live SERP, echte PAA, rankings, backlinks en drie concurrentieparses zijn vastgelegd in `seo/research/nl/`.

## Bronnen en feiten

- Maandwaarden handmatig gecontroleerd tegen de officiële TMD-klimaatnormalen voor station Phuket 48564, periode 1991–2020.
- De pagina maakt zichtbaar onderscheid tussen klimaatgemiddelden en een live voorspelling.
- Actuele weerknoppen verwijzen naar de officiële TMD-pagina voor Phuket.
- De TAT-bron ondersteunt de bestemmings- en rode-vlagcontext.

## Links en affiliatecontrole

- Alle twaalf maandroutes, de Phuket-pillar, attractions, hotelgids en travel-gear route geven direct HTTP 200.
- Vijf Amazon-go-routes geven een verwachte interne 307-doorverwijzing.
- Klook en Trip.com bevatten een placement-subid.
- Alle zeven commerciële links hebben `nofollow sponsored`; externe links openen in een nieuw tabblad.
- Amazon-disclosure, uitjesdisclosure en Trip.com-disclosure zijn zichtbaar bij de relevante CTA’s.

## Technische checks

- TypeScript: geslaagd.
- Gerichte ESLint: 0 errors; alleen bestaande waarschuwingen in de legacy route.
- Design-system verificatie: geslaagd, 7 primitives en 8 templates.
- SEO-verificatie: 0 hard collisions en 0 warnings.
- Amazon-affiliateverificatie: 13 gebruikte slugs en 13 geregistreerde producten.
- Alle acht afbeeldingen zijn na lazy-load compleet; geen gebroken beeld.

## Mobiele hercontrole — 24 juli

- Echte viewport: 390 × 844; documentbreedte 375/375 en geen horizontale overflow.
- H1: `Phuket weer. Wanneer ga jij?`.
- Geen gebroken afbeeldingen, ontbrekende alt-attributen of lege links gevonden.
- Mobiele zoekbalk en bottom-navigation zijn zichtbaar.
- Hero en de lagere Plan A/B/C-sectie zijn visueel gecontroleerd; kaarten, tekst en CTA blijven leesbaar zonder afkappen.
