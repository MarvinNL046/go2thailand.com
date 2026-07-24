# NL Krabi hotels — acceptance audit

**Route:** `/nl/best-hotels/krabi/`  
**Datum:** 24 juli 2026  
**Status:** desktop- en mobiele acceptatie groen

## Zoekintentie en inhoud

- De route bezit de gecombineerde gebieds- en hotelintentie voor `waar verblijven in krabi` en `hotels krabi`.
- Het ontwerp laat de gebruiker eerst Ao Nang, Railay, Krabi Town en Klong Muang/Tubkaek vergelijken en pas daarna hotels kiezen.
- Gebiedstrade-offs, vervoersfrictie, één of twee bases en boekingsvoorwaarden leveren meer informatiewinst dan een vluchtige top-10 op prijs.
- `/nl/where-to-stay/krabi/` consolideert permanent naar deze eigenaar; de Engelse route blijft buiten deze Nederlandse wijziging.

## Browserbewijs

- Desktopviewport: 1440 × 1000; documentbreedte 1425/1425 en geen horizontale overflow.
- Mobiele viewport: 390 × 844; documentbreedte 375/375 en geen horizontale overflow.
- H1: `Waar verblijven in Krabi?`.
- Geen mislukte afbeeldingen, ontbrekende alt-teksten of lege links gevonden.
- Hero, gebiedskeuze, verblijfsverdeling, boekingskaarten en lagere secties zijn visueel gecontroleerd.
- Mobiele zoekbalk, hamburger/drawer en vaste bottom-navigation zijn aanwezig.

## SEO en commercie

- Canonical wijst naar de Nederlandse route.
- `nl`, `en` en `x-default` hreflang zijn aanwezig.
- JSON-LD: `Organization`, `BreadcrumbList`, `FAQPage`, `ItemList` en `WebPage`; er worden geen ongeverifieerde review- of prijsvelden gepubliceerd.
- Elf commerciële links zijn als sponsored gemarkeerd en de Trip.com-affiliateverklaring staat vóór de eerste commerciële keuze.
- Interne vervolgstappen verbinden de pagina met het Krabi-overzicht, bezienswaardigheden en weer.

## Release-opmerking

De pagina blijft onderdeel van de uiteindelijke sitebrede performance-, toegankelijkheids- en productieheadercontrole. De lokale pagina-acceptatie zelf is afgerond.
