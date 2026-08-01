# Acceptatie-audit NL Phuket-hotelprofielen — batch 2

Datum: 2026-07-31

## Routes

- `/nl/phuket/patong/hotels/movenpick-myth-hotel-patong-phuket/`
- `/nl/phuket/patong/hotels/lub-d-phuket-patong/`

## Bewijs

- Twee zelfstandige NL ownerobjecten gebruiken de bestaande premium hotel-detailtemplate op hun exacte bestaande route.
- Accor/Mövenpick en Lub d zijn de primaire bronnen; vaste prijs, reviewscore, ervaringsreview en ongecontroleerde legacyclaims zijn verwijderd.
- Twee unieke lokale WebP-heroassets bestaan en zijn als AI-redactioneel gelabeld.
- De gedeelde runtime-verifier staat op 5/5 groen: HTTP 200, exact canonical, één H1, schema, Trip.com-uitgangen, volledige sponsored-rel, lokale assets en geen prijs/reviewclaim.
- TypeScript, design-, affiliate- en cannibalisatiegates zijn groen.
- Echte browser-QA: Mövenpick desktop 1440×1000 en Lub d mobiel 390×844. Geen horizontale overflow, kapotte afbeelding, error-overlay of console warning/error; hero-copy en CTA’s zijn leesbaar.

Deze twee routes mogen worden toegevoegd aan `nl:hotel-guide.acceptedRoutes`. De familystatus blijft `pending` voor de overige 25 individuele Phuket-hotelprofielen.
