# Nederlandse eilandfamilie — definitieve acceptatie

Datum: 31 juli 2026

## Scope en ownergrens

De hoofdqueue bevat tien geïnventariseerde routes: de eilanddirectory, acht zelfstandige eilandowners, Koh Samet en de legacy-eilandroute voor Koh Samui. De vier Koh Tao-routes hebben hun eigen reeds geaccepteerde familie en worden hier niet opnieuw geclaimd.

| Route | Beslissing |
|---|---|
| `/nl/islands/` | Premium kust-, netwerk- en reisstijldirectory; bezit de brede eilandkeuze. |
| `/nl/islands/koh-phangan/` | Zelfstandige owner voor gebieden, Full Moon-versus-rust en ferryketen. |
| `/nl/islands/koh-phi-phi/` | Zelfstandige owner voor Phi Phi Don-verblijf; Don/Leh-intentie expliciet gescheiden. |
| `/nl/islands/koh-lanta/` | Zelfstandige owner voor noord-zuidkeuze, Old Town en aankomstketen. |
| `/nl/islands/koh-chang/` | Zelfstandige owner voor westkustzones, ferry en bergachtige hoofdweg. |
| `/nl/islands/koh-lipe/` | Zelfstandige owner voor kustkeuze, Pak Bara-keten en Tarutao-context. |
| `/nl/islands/koh-yao-noi/` | Zelfstandige owner voor Noi/Yai-scheiding, getij en boot-hotelketen. |
| `/nl/islands/koh-mak/` | Zelfstandige owner voor vier kustzones, Trat-keten en begrensde low-carbonclaim. |
| `/nl/islands/koh-samet/` | Zelfstandige owner voor strandzones, Ban Phe-keten en parkcontext. |
| `/nl/islands/koh-samui/` | Bewuste permanente `308` naar de bestaande sterkere `/nl/city/koh-samui/`-destinationowner; geen concurrerende tweede islandowner. |

## Onderzoek en inhoud

- Alle negen canonieke routes staan als exacte `implemented` owner in `seo/keywords-nl.csv` en hebben locale-specifieke research, echte zoekvragen en een afgebakende intentie.
- De laatste owners zijn zonder extra DataForSEO-verbruik aangevuld met zichtbare Google Nederland-SERP/PAA en primaire bronnen. De researchbrief vermeldt de methode expliciet.
- Marketingabsoluten, vaste vaarprijzen en -tijden, universele beste maanden en strand-, zicht-, wildlife- of stiltegaranties zijn verwijderd of begrensd.
- De directory bezit de landelijke shortlist. `/nl/thailand-islands/` blijft de route-/eilandhopowner; individuele eilandpagina’s bezitten verblijf, zones en lokale logistiek.
- Koh Samui blijft op de bestaande, uitgebreid onderzochte city/destinationowner. De redirect voorkomt cannibalisatie en dubbele hreflang/canonicalsignalen.

## Design, affiliate en toegankelijkheid

- De gerenderde designaudit rapporteert `703/703` premium signatures en `155` exacte Nederlandse owners na Koh Mak.
- Alle nieuwe eilandowners gebruiken het herbruikbare destinationtemplate met unieke hero, leesbare hiërarchie, zones, besliskaarten, planning, FAQ, bronnen en natuurlijke vervolgkeuzes.
- Affiliates zijn contextueel: Trip.com bij verblijf, Klook waar activiteiten werkelijk passen en 12Go op de directory voor vervoer. Externe links gebruiken disclosure en `nofollow sponsored`; Amazon wordt niet geforceerd op brede islandowners.
- Desktop- en mobiele Browser-QA is tijdens de owneracceptaties uitgevoerd. De laatste Koh Mak-check bevestigde geen horizontale overflow en een leesbaar geopend FAQ-antwoord.

## Technische acceptatie

- `npm run design:verify`: groen.
- `npm run affiliate:verify`: 16 gebruikte slugs en 20 geregistreerde Amazonproducten, groen.
- `npm run seo:cannibalization`: 0 harde collisions en 0 waarschuwingen.
- TypeScript zonder emit: groen.
- `seo/audits/runtime/nl-koh-mak-final-2026-07-31.json`: `702/702` Nederlandse sitemaproutes zonder harde fouten en zonder waarschuwingen.
- `seo/audits/design-coverage-nl-2026-07-30.md`: `703/703` premium signatures, 0 hybrid en 155 exacte owners.
- De legacyroute `/nl/islands/koh-samui/` reageert lokaal met permanente `308` naar `/nl/city/koh-samui/`; alle negen canonieke hoofdqueue-routes reageren met HTTP 200.

## Uitkomst

De Nederlandse eilandhoofdqueue is gesloten: **10/10** routes hebben een expliciete owner- of consolidatiebeslissing met research-, premium-design- en technische QA-bewijs. De afzonderlijke Koh Tao-familie blijft daarnaast reeds gesloten op **4/4**.
