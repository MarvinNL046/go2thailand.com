# Acceptatie-audit NL Phuket-hotelprofielen — batch 4

Datum: 2026-07-31

## Routes

- `/nl/phuket/karon/hotels/pullman-phuket-arcadia-karon-beach-resort/`
- `/nl/phuket/karon/hotels/centara-grand-beach-resort-phuket/`
- `/nl/phuket/karon/hotels/mandarava-resort-and-spa-karon-beach/`
- `/nl/phuket/karon/hotels/beyond-resort-karon/`
- `/nl/phuket/karon/hotels/avista-grande-karon-mgallery/`

## Zelfstandige research

- Voor ieder profiel is een afzonderlijke Nederlandse branded SERP-call gestart. Vier DataForSEO-calls retourneerden providerstatus `20000 Ok`, maar het lokale researchproces eindigde vóór een bruikbaar artifact met exitcode 1. De vijfde call retourneerde `40200 Payment Required`. Daarom claimt geen owner zoekvolume, ranking, concurrentiedata of echte PAA.
- Pullman is gecorrigeerd naar de huidige officiële entiteit `Pullman Phuket Karon Beach Resort`. De legacy-URL blijft behouden, maar titel, H1, Hotel-schema en inhoud maken duidelijk dat `Pullman Phuket Arcadia Naithon Beach` een ander hotel is.
- Centara gebruikt de actuele officiële hotel-, accommodatie-, contact- en factsheetinformatie. `Direct aan Karon Beach` wordt niet vertaald naar privéstrand of een onbewezen unieke ranglijst.
- Mandarava gebruikt de officiële huidige inventaris van 232 kamers, vijf infinity pools en 700 meter tot het strand. Oude claims over negen pools en een vaste shuttlefrequentie zijn verwijderd.
- Beyond gebruikt het actuele officiële 18+-beleid en 81 sea-viewkamers. De oude 16+- en 192-kamerclaims zijn verwijderd.
- Avista gebruikt Accor/MGallery en de propertysite: 159 kamers, huidige categorieën en een hoofd- plus kinderzwembad. De oude rooftop-infinitypoolclaim is verwijderd; rooftop verwijst naar de bar.
- Alle owners gebruiken `Vragen vóór je boekt` en alleen primaire bronnen.

## Design en techniek

- Vijf zelfstandige NL owners gebruiken de gedeelde premium hotel-detailtemplate; de Engelse routes blijven ongewijzigd.
- Vijf unieke lokale WebP-heroassets zijn gegenereerd en naar 1800×1012 geoptimaliseerd met afzonderlijke Karon-composities.
- De runtime-verifier staat op 13/13 groen: HTTP 200, exact canonical, één H1, vier vereiste schema’s, lokale assets, minimaal drie Trip.com-uitgangen, volledige sponsored-rel en geen vaste prijs-, score- of ervaringsreviewclaim.
- TypeScript is groen. Pullman en Beyond zijn in de browser visueel gecontroleerd: geen overflow, kapotte beelden, error-overlay of console warnings/errors; exact één H1 en drie sponsored-uitgangen.

Deze vijf routes mogen worden toegevoegd aan `nl:hotel-guide.acceptedRoutes`. Er blijven daarna zeventien individuele Phuket-hotelprofielen over.
