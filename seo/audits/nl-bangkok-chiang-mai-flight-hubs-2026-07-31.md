# NL Bangkok- en Chiang Mai-vluchthubs — finale audit

**Routes:** `/nl/flights-to-bangkok/`, `/nl/flights-to-chiang-mai/`  
**Status:** twee exacte owners, premium en production-ready gecontroleerd

- Eén herbruikbare `DestinationFlightsGuideNl` geeft beide owners dezelfde premium structuur, met inhoudelijk verschillende beslislogica.
- Bangkok bezit de algemene BKK/DMK- en destination-flight intent; Chiang Mai bezit CNX en de keuze tussen een doorgaand ticket en een losse aansluiting.
- Acht zichtbare Google-NL SERP-controles en echte PAA-patronen zijn verwerkt. DataForSEO was tijdelijk niet leverbaar (`40200 Payment Required`) en blokkeerde de hybride research niet.
- Oude vaste prijsbanden, frequenties, airlines, goedkoopste-maandclaims, vluchtduur, transferprijzen en verificatiedata zijn uit NL-rendering én geserialiseerde NL-props verwijderd.
- Beide routes geven HTTP 200, een exacte canonical, NL/EN hreflang, FAQ-schema en uitsluitend sponsored affiliate-uitgangen.
- Desktop- en mobiele browser-QA: geen horizontale overflow, geen Engelse templatelekken en behoud van mobiele zoekpil/bottom navigation.
- Travelpayouts/Trip.com verschijnt als actuele prijscheck na gratis keuzehulp. Geen geforceerde Amazoncross-sell, omdat de vluchtowners geen natuurlijke productintentie hebben.
