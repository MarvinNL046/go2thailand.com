# Nederlandse Kata-surfowner — finale audit

**Route:** `/nl/phuket/kata/surfing/`
**Status:** exact owner, premium en production-ready gecontroleerd

- Zelfstandige `KataSurfingGuideNl` vervangt de oude prijs-, golfhoogte- en schoollijst door niveaukeuze, actuele conditie, zeven leschecks en een weersfallback.
- HTTP 200 voor NL- en EN-surfowner plus Nederlandse Kata-parent en Kata Noi-sibling.
- Browser-QA: `lang=nl`, vier schemas, vier sponsored links, nul Engelse UI-lekken, geen oude prijs-/golf-/schoolclaims en geen horizontale overflow op 1265 of 360 px.
- Mobiele zoekpil en bottom navigation blijven intact; hero, stippelroute, ton-sur-ton kaarten, conditietabel en donkergroene veiligheidssectie renderen consistent.
- TypeScript, design-, affiliate- en cannibalisatiegates zijn groen.
- Klook en alternatieve lesprovider verschijnen pas na gratis niveau-, conditie- en veiligheidsadvies; Trip.com alleen voor verblijfslogistiek.
- Geen Amazonproduct geforceerd: huren of instructeursmateriaal is voor deze reisintentie doorgaans passender dan vooraf kopen.
