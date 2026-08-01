# Acceptatie-audit NL Phuket-hotelprofielen — batch 1

Datum: 2026-07-31

## Routes

- `/nl/phuket/patong/hotels/grand-mercure-phuket-patong/`
- `/nl/phuket/patong/hotels/four-points-by-sheraton-phuket-patong-beach-resort/`
- `/nl/phuket/patong/hotels/hotel-indigo-phuket-patong/`

## Bewijs

- Drie zelfstandige NL ownerobjecten gebruiken het bestaande premium `HotelDetailGuideTemplate`; er is geen tweede designsysteem gebouwd.
- De exacte bestaande Phuket-URL’s zijn behouden en dispatchen alleen voor NL naar de nieuwe ownerdata. EN blijft bewust onaangeraakt voor de afzonderlijke Engelse researchfase.
- Accor, Marriott en IHG zijn als primaire bronnen gebruikt. Vaste USD-prijzen, vluchtige ratings, niet-bewezen verblijfservaringen en bronloze superlatieven zijn uit de NL-render verwijderd.
- De drie DFS SERP-runs gaven `20000 Ok` zonder bruikbaar artefact en exitcode 1. Daarom worden geen PAA-, volume- of rankingclaims verzonnen; de FAQ-labeling zegt expliciet `Vragen vóór je boekt`.
- Drie unieke 1920×1080 WebP-sfeerbeelden zijn gegenereerd, lokaal opgeslagen en duidelijk als AI-redactioneel gelabeld. De pagina verwijst voor actuele hotel- en kamerfoto’s naar de aanbieder.
- Exacte canonical, Nederlandse H1/title/description, BreadcrumbList, Hotel, WebPage en FAQPage worden via de bestaande premium template gerenderd.
- Trip.com/Travelpayouts blijft de gesponsorde actuele beschikbaarheidscheck met placement-subid, `target=_blank` en `noopener noreferrer nofollow sponsored`. Amazon is niet geforceerd op een branded hotelkeuzepagina.
- Lokale HTTP-test: alle drie routes status 200, exacte canonical, premium sectie, gesponsorde affiliatelink en geen kapotte route.
- Echte browser-QA: Grand Mercure desktop 1440×1000 en mobiel 390×844; Four Points mobiel 390×844; Hotel Indigo desktop 1440×1000. Geen horizontale overflow, kapotte afbeelding, error-overlay of console warning/error; hero-copy en CTA’s zijn leesbaar.
- TypeScript-gate is groen na de eerste implementatie; de volledige projectgates worden vóór acceptatieregistratie opnieuw uitgevoerd.

Deze drie routes mogen na de volledige groene gate-run worden toegevoegd aan `nl:hotel-guide.acceptedRoutes`. De familystatus blijft `pending` voor de overige 27 individuele Phuket-hotelprofielen.

