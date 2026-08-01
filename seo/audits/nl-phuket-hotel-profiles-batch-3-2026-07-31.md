# Acceptatie-audit NL Phuket-hotelprofielen — batch 3

Datum: 2026-07-31

## Routes

- `/nl/phuket/kamala/hotels/novotel-phuket-kamala-beach/`
- `/nl/phuket/kamala/hotels/sunwing-kamala-beach/`
- `/nl/phuket/kamala/hotels/sunprime-kamala-beach/`

## Zelfstandige research

- Voor ieder hotel is een afzonderlijke Nederlandse branded SERP-call uitgevoerd. DataForSEO retourneerde driemaal providerstatus `20000 Ok`, maar het lokale researchproces eindigde vóór het schrijven van een bruikbaar artifact met exitcode 1. Daarom worden geen volume-, concurrent-, ranking- of PAA-claims aan deze owners toegeschreven.
- Novotel is gecontroleerd bij de actuele Accor-hotelpagina en de Nederlandse Accor-variant. De owner gebruikt categorie-, oppervlakte-, bezettings-, afstands- en onderhoudsinformatie alleen met bron- en datumcontext.
- Sunwing is gecontroleerd bij de officiële hotel-, zwembad- en kamerpagina’s. De owner corrigeert de oude kamertelling en zwembadaantallen en behandelt pool access, kinderleeftijden en kids-eat-free als voorwaardelijke boekingsinformatie.
- Sunprime is gecontroleerd bij de actuele Kamala Beach Resort/Sunprime hotel-, kamer- en foodpagina’s. De owner corrigeert `adults-only` naar het bewijsbare 16+-beleid en beschrijft Sunprime Inclusive niet als onbeperkte all-inclusiveformule.
- Alle drie routes gebruiken daarom het transparante label `Vragen vóór je boekt`, niet `echte PAA`.

## Design en techniek

- Drie zelfstandige NL ownerobjecten gebruiken de gedeelde premium hotel-detailtemplate op hun exacte bestaande routes; de Engelse routes blijven ongewijzigd.
- Drie unieke lokale WebP-heroassets zijn gegenereerd, geoptimaliseerd naar 1800×1012 en als AI-redactioneel sfeerbeeld gelabeld.
- De gedeelde runtime-verifier staat op 8/8 groen: HTTP 200, exact canonical, één H1, BreadcrumbList/FAQPage/Hotel/WebPage-schema, minimaal drie Trip.com-uitgangen, volledige sponsored-rel, lokale assets en geen vaste prijs-, score- of ervaringsreviewclaim.
- TypeScript, design-, affiliate- en cannibalisatiegates zijn groen.
- Browser-QA op Novotel en Sunprime bij de actuele browserviewport: geen horizontale overflow, kapotte afbeelding, error-overlay of console warning/error; exact één H1 en drie gesponsorde Trip.com-uitgangen. Dezelfde reeds mobiel geaccepteerde template wordt zonder structurele variant gebruikt; de nieuwe titels breken binnen de responsive typografieregels.

Deze drie routes mogen worden toegevoegd aan `nl:hotel-guide.acceptedRoutes`. De familystatus blijft `pending` voor de overige 22 individuele Phuket-hotelprofielen.
