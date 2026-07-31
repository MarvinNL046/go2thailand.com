# Nederlandse Patong-restaurants-owner — finale audit

**Route:** `/nl/phuket/patong/restaurants/`
**Status:** exact owner, premium en production-ready gecontroleerd

- Zelfstandige `PatongRestaurantsNl` gebruikt het premium tweetalige `PatongExperienceTemplate` en geen generieke legacy-opmaak.
- Canonical, alternatieve Engelse URL, nl-NL Article-, Breadcrumb-, ItemList- en FAQ-schema komen uit dezelfde ownerdata.
- De informatiearchitectuur scheidt restaurantkeuze van algemene Patong-fit, nightlife en hotels.
- De commerciële laag bevat alleen actuele-prijs-/beschikbaarheidschecks voor relevante food-ervaringen en hotels, met affiliate disclosure.
- Geen vaste restaurantprijzen, ranglijsten, ratings, openingsuren of zaakgaranties; geen geforceerde Amazoncross-sell.
- HTTP 200 voor NL- en EN-owner plus Nederlandse parent en nightlife sibling; de oude vaste prijs- en top-10-copy ontbreekt.
- Browser-QA: `lang=nl`, vijf schemas, drie sponsored links, nul Engelse UI-lekken en geen horizontale overflow op 1265 of 360 px.
- De mobiele zoekpil en bottom navigation blijven intact; de hero en contenthiërarchie renderen in de premium ton-sur-ton vormtaal.
- TypeScript, design-, affiliate- en cannibalisatiegates zijn groen.
