# NL Krabi weer — acceptance audit

**Route:** `/nl/city/krabi/weather/`  
**Datum:** 24 juli 2026  
**Status:** desktop- en mobiele acceptatie groen

## Zoekintentie en inhoud

- De pagina bezit de evergreen reisplanningsintentie rond `krabi weer`, zonder een live weersvoorspelling na te bootsen.
- De inhoud gebruikt officiële TMD-klimaatnormalen voor Krabi (1991–2020), een maandtabel, seizoenskeuzes, paklijst, plan A/B/C en zes zichtbare PAA-antwoorden.
- Klimaatgemiddelden en de actuele TMD-verwachting worden expliciet van elkaar gescheiden.

## Browserbewijs

- Desktopviewport: 1440 × 1000; documentbreedte 1425/1425 en geen horizontale overflow.
- Mobiele viewport: 390 × 844; documentbreedte 375/375 en geen horizontale overflow.
- H1: `Krabi weer. Wanneer ga jij?`; de eerder ontbrekende semantische spatie is in het gedeelde weertemplate hersteld.
- Geen mislukte afbeeldingen, ontbrekende alt-teksten of lege links gevonden.
- Hero, klimaatkaarten, maandweergave, paklijst en flexibele plansectie zijn visueel gecontroleerd.
- Mobiele zoekbalk, hamburger/drawer en vaste bottom-navigation zijn aanwezig.

## SEO en commercie

- Canonical wijst naar de Nederlandse route.
- `nl`, `en` en `x-default` hreflang zijn aanwezig.
- JSON-LD: `Organization`, `FAQPage`, `BreadcrumbList`, `WebPage` en `Dataset`.
- Zeven commerciële links zijn als sponsored gemarkeerd; Amazon-productlinks lopen via de locale-neutrale `/go/`-redirects en Klook blijft contextueel.
- FAQ-schema en zichtbare FAQ-inhoud zijn vanuit dezelfde data opgebouwd.

## Release-opmerking

De pagina blijft onderdeel van de uiteindelijke sitebrede performance-, toegankelijkheids- en productieheadercontrole. De lokale pagina-acceptatie zelf is afgerond.
