# Acceptatie-audit NL Phuket-hotelprofielen — batch 2

Datum: 2026-07-31

## Routes

- `/nl/phuket/patong/hotels/movenpick-myth-hotel-patong-phuket/`
- `/nl/phuket/patong/hotels/lub-d-phuket-patong/`

## Bewijs tot nu toe

- Twee zelfstandige NL ownerobjecten gebruiken de bestaande premium hotel-detailtemplate op hun exacte bestaande route.
- Accor/Mövenpick en Lub d zijn de primaire bronnen; vaste prijs, reviewscore, ervaringsreview en ongecontroleerde legacyclaims zijn verwijderd.
- Twee unieke lokale WebP-heroassets bestaan en zijn als AI-redactioneel gelabeld.
- De gedeelde runtime-verifier staat op 5/5 groen: HTTP 200, exact canonical, één H1, schema, Trip.com-uitgangen, volledige sponsored-rel, lokale assets en geen prijs/reviewclaim.
- TypeScript en projectbrede gates worden vóór acceptatie opnieuw uitgevoerd.
- Echte viewport-QA moet nog worden vastgelegd voordat deze twee routes in `acceptedRoutes` komen. Tot dat moment blijven zij terecht buiten de ledgeracceptatie.

