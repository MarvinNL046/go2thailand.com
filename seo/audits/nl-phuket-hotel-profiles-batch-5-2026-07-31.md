# Acceptatie-audit NL Phuket-hotelprofielen — batch 5

Datum: 2026-07-31

## Routes

- `/nl/phuket/bang-tao/hotels/hilton-garden-inn-phuket-bang-tao/`
- `/nl/phuket/nai-harn/hotels/the-nai-harn-phuket/`
- `/nl/phuket/nai-harn/hotels/wyndham-grand-nai-harn-beach-phuket/`
- `/nl/phuket/rawai/hotels/selina-serenity-rawai-phuket/`

## Zelfstandige research

- DataForSEO retourneerde in de voorafgaande hotelbatch `40200 Payment Required`; daarom zijn geen nieuwe betaalde calls geforceerd en claimt geen owner zoekvolume, ranking, concurrentiedata of echte PAA.
- Hilton is gecontroleerd bij Hilton-overzicht, hotelinfo, locatie, kamers en dining. De owner gebruikt 177 kamers, 1,2 km tot Bang Tao Beach, twee rooftoppools en geen airportshuttle; de oude 282-kamer-, 350-meter- en gratis-shuttleclaims zijn verwijderd.
- The Nai Harn is gecontroleerd bij de officiële hotel-, accommodatie-, kamer- en servicepagina’s. De owner corrigeert dat niet iedere kamer zeezicht heeft en behandelt hoogteverschil, lift tot verdieping zes en categoriebezetting als echte beslispunten.
- Wyndham is gecontroleerd bij Wyndham-overzicht, kamers, amenities, dining en locatie. De owner gebruikt 353 kamers, tien zwembaden en minder dan één kilometer tot het strand; de oude 226-kamer-, drie-pool- en hillsideclaims zijn verwijderd.
- Selina is een expliciete status-/identiteitsowner. De directe Cloudbeds-engine toont actuele voorraad onder de naam Selina Serenity Rawai, maar Collective en Socialtel bevestigen geen actuele Rawai-rebrand. De pagina adviseert daarom rechtstreeks naam, exploitant, kamertype en badkamer te bevestigen en noemt de accommodatie niet automatisch Socialtel.
- Alle owners gebruiken `Vragen vóór je boekt`, alleen primaire/statusbronnen en geen vaste prijzen, ratings of persoonlijke ervaringsclaims.

## Design en techniek

- Vier zelfstandige NL owners gebruiken de gedeelde premium hotel-detailtemplate op drie bestaande routetemplates; de Engelse routes blijven ongewijzigd.
- Vier unieke lokale WebP-heroassets zijn gegenereerd en naar 1800×1012 geoptimaliseerd: Laguna-rooftop, Nai Harn-cliff, vlak familie-resort en getijdenkust/coworkinghybride.
- De runtime-verifier staat op 17/17 groen: HTTP 200, exact canonical, één H1, vier vereiste schema’s, lokale assets, minimaal drie Trip.com-uitgangen, volledige sponsored-rel en geen vaste prijs-, score- of ervaringsreviewclaim.
- TypeScript is groen. The Nai Harn en Selina zijn in de browser visueel gecontroleerd: geen overflow, kapotte beelden, error-overlay of console warnings/errors; exact één H1 en drie sponsored-uitgangen.

Deze vier routes mogen worden toegevoegd aan `nl:hotel-guide.acceptedRoutes`. Er blijven daarna dertien individuele Patong-hotelprofielen over.
