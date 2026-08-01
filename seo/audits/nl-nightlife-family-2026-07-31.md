# NL nightlife family-audit — 31 juli 2026

## Scope en status

Production-readiness audit van exact vijf Nederlandse routes:

1. `/nl/nightlife/`
2. `/nl/nightlife/bangkok/`
3. `/nl/nightlife/chiang-mai/`
4. `/nl/nightlife/pattaya/`
5. `/nl/nightlife/phuket/`

DataForSEO-credits waren tijdens deze afronding uitgeput. Er zijn daarom geen nieuwe volume-, KD-, ranking- of echte-PAA-claims toegevoegd. De landelijke hub en Pattaya-owner behouden hun bestaande, opgeslagen research van 25–26 juli 2026. Bangkok, Chiang Mai en Phuket zijn op 31 juli 2026 onafhankelijk gevalideerd met drie actuele Nederlandse webzoekopdrachten en zichtbare organische resultaatpatronen. Het volledige fallbackbewijs staat in [`seo/research/nl/2026-07-31-city-nightlife-web-serp-refresh.md`](../research/nl/2026-07-31-city-nightlife-web-serp-refresh.md).

## Web-SERP-gevalideerde ownergrenzen en keywordregistry

De registry bevatte al `thailand nightlife` voor de landelijke hub en `pattaya nightlife` voor Pattaya. De drie andere city owners ontbraken. Hun primary, Nederlandse varianten en ownergrenzen zijn nu via actuele web-SERP-fallback gevalideerd. Conform de exclusieve taak is `seo/keywords-nl.csv` niet aangepast; onderstaande regels kunnen bij de centrale registry-update administratief worden overgenomen.

| Route | Voorgestelde primary | Voorgestelde secondary | Ownergrens |
|---|---|---|---|
| `/nl/nightlife/bangkok/` | `bangkok nightlife` | `nachtleven bangkok`, `uitgaan bangkok`, `khao san road avond`, `rooftop bar bangkok`, `clubs bangkok`, `rca bangkok`, `is khao san road veilig` | Bezit de keuze tussen Bangkok-wijken, avondtype en terugroute. Algemene bestemming, food, hotels en individuele venues blijven afzonderlijk. |
| `/nl/nightlife/chiang-mai/` | `chiang mai nightlife` | `nachtleven chiang mai`, `uitgaan chiang mai`, `nimman nightlife`, `avondmarkt chiang mai`, `live muziek chiang mai` | Bezit de keuze tussen Old City, Night Bazaar, Nimman en riverside. Marktdetail, food, hotels en venueprofielen blijven afzonderlijk. |
| `/nl/nightlife/phuket/` | `phuket nightlife` | `nachtleven phuket`, `uitgaan phuket`, `bangla road phuket`, `phuket avond`, `phuket clubs`, `is bangla road veilig` | Bezit de eilandbrede kustplaatsvergelijking. Patong/Bangla-detail blijft bij `/nl/phuket/patong/nightlife/`; hotels, restaurants en afzonderlijke kustplaatsowners blijven apart. |

De vijf owners overlappen hierdoor niet:

- de hub vergelijkt bestemmingen;
- Bangkok, Chiang Mai en Phuket kiezen binnen één bestemming;
- Pattaya bezit zijn eigen gebieds- en avondroute;
- Patong bezit de straat- en zonekeuze binnen Patong, niet heel Phuket.

`npm run seo:cannibalization` gaf vóór de edits 0 harde collisions en 0 waarschuwingen. De ontbrekende registryregels zijn een control-layer gap, geen reden om de bestaande routes op generieke JSON-copy te laten staan.

## Wat is vervangen

De Nederlandse Bangkok-, Chiang Mai- en Phuket-routes vielen terug op verouderde generieke JSON-pagina's. Die bevatten onder andere:

- onbewezen persoonlijke verificatieclaims;
- vaste drank-, entree-, taxi- en songthaewprijzen;
- universele piek- en sluitingstijden;
- vluchtige venue- en clubranglijsten;
- absolute superlatieven en veiligheidsformuleringen;
- Engelstalige FAQ-generatie op Nederlandse routes;
- een oud carddesign zonder volwaardig bronnen-, affiliate- of actualiteitsmodel.

De NL-dispatch gebruikt nu één herbruikbaar premium city-nightlife-template met drie zelfstandig ingevulde profielen. De Engelse routes blijven bewust ongewijzigd.

## Design en UX

Alle vijf routes gebruiken het premium Go2Thailand-systeem met donkere jade, saffraanaccent, ton-sur-ton secties, editorial typography en gecontroleerde dividers. De drie nieuwe owners bevatten:

- redactionele hero met één H1 en twee duidelijke interne acties;
- sticky sectienavigatie;
- keuzekader en expliciete ownergrens;
- zonecards met fit, plan en trade-off;
- visuele avondroute met gestippelde lijn;
- actualiteitschecks;
- contextuele Klook-CTA pas na gratis keuzehulp;
- veiligheidssectie en natuurlijke vervolglinks;
- FAQ, gerelateerde gidsen en bronmethodiek.

Desktop-QA op Bangkok en mobile-QA op Phuket tonen geen horizontale overflow of error-overlay. Chiang Mai is met browser-evaluatie gecontroleerd op 390px: één H1, betekenisvolle inhoud, geen overlay, 0px overflow en één correct gemarkeerde sponsored link. De cookiebanner overlapt in de screenshot een deel van de hero, maar dat is bestaand consentgedrag en geen nightlife-componentdefect.

## Content, veiligheid en ethiek

- Adult entertainment wordt feitelijk en niet-sensationeel benoemd als zichtbaar maar optioneel.
- Er worden geen seksuele diensten, prijzen of aankooproutes gepromoot.
- Geen wijk krijgt een absoluut veilig/onveilig label.
- Iedere city owner behandelt onduidelijke rekeningen, onbeheerde drankjes, verkeersrisico, zelf rijden na alcohol, Tourist Police 1155 en 191.
- Phuket benoemt expliciet dat alcohol en nachtzwemmen niet samengaan.
- Chiang Mai behandelt woonstraten, rookseizoen/luchtkwaliteit en het ontbreken van gegarandeerde songthaewprijzen.
- Bangkok scheidt Khao San, Chinatown, Sukhumvit, Thonglor/Ekkamai en RCA zonder een clubranglijst als feit te presenteren.
- Tijdgevoelige venue-, event-, markt-, prijs-, dresscode- en vervoersinformatie blijft een controlepunt voor de bezoekdag.

## SEO en techniek

- Zelfrefererende canonical en reciproque `en`, `nl` en `x-default` hreflang komen uit de globale `Hreflang`-laag.
- Gerenderde controle op `/nl/nightlife/bangkok/` bevestigde de juiste canonical en alle drie alternates.
- Nieuwe city owners leveren `Article`, `FAQPage`, `BreadcrumbList`, `HowTo` en `ItemList` JSON-LD.
- `inLanguage` is `nl-NL`; `dateModified` is 2026-07-31.
- Metadata is uniek per route en binnen de componentverifier begrensd.
- Interne links zijn beschrijvend en natuurlijk: landelijke nightlife-hub, city owner, food owner, hotel owner en voor Phuket de aparte Patong-owner.
- Bestaande hub en Pattaya-owner blijven hun premium zelfstandige schema- en bronnenlaag gebruiken.

## Affiliates

De citytemplate gebruikt uitsluitend een contextuele Klook-uitgang voor actuele avondactiviteiten. De CTA staat na zonekeuze en actualiteitschecks, niet in de eerste informatieve alinea. Attributie gebruikt `target="_blank"` en `rel="noopener noreferrer nofollow sponsored"`, met zichtbare disclosure en een expliciete check op aanbieder, datum, locatie, leeftijd, transfer, inclusies en annulering.

Geen Amazon-product is geforceerd: een fysiek product lost de keuze tussen avondzones niet op. De bestaande landelijke en Pattaya-owners kunnen hun functionele powerbankroute behouden waar die expliciet als navigatie-/terugritbackup wordt gekaderd.

## Bronnen en freshness

De drie nieuwe owners gebruiken minimaal:

- Tourism Authority of Thailand: actuele algemene alcoholregels (29 mei 2026);
- NederlandWereldwijd: actueel Nederlands reisadvies;
- Thailand Tourist Police Bureau: hotline 1155;
- de officiële TAT-bestemmingspagina voor Bangkok, Chiang Mai of Phuket.

De content claimt niet dat deze bestemmingsbronnen actuele venueagenda's bewijzen. Die worden expliciet als live controle bij de venue, organisator of vervoerder gelaten. Laatst redactioneel gecontroleerd: 31 juli 2026.

## Verificatiebewijs

- `npm run seo:cannibalization` — groen vóór edit: 0 harde collisions, 0 waarschuwingen.
- Gerichte TypeScript-check op `CityNightlifeGuideNl.tsx` en `nl-city-guides.ts` — groen. De volledige worktree-check meldde uitsluitend een gelijktijdige, buiten-scope globale-scriptcollision tussen `scripts/audit-en-premium-coverage.ts` en `scripts/verify-nl-manual-review.ts`; er bleven geen nightlife-typefouten over.
- `npx tsx scripts/verify-nl-nightlife-family.ts` — groen, 5/5 routes.
- HTTP runtime: alle vijf routes 200, exact één H1 en geen Internal Server Error.
- Bangkok canonical/hreflang: correct `nl`, `en`, `x-default` en zelfrefererende canonical.
- Agent-browser Chiang Mai 390px: inhoud 8613 tekens, één H1, geen error-overlay, 0px overflow, één sponsored link.

## Administratieve control-layer overdracht

De drie web-SERP-gevalideerde keywordowners kunnen centraal aan `seo/keywords-nl.csv` en de family-completion/goal-ledger worden toegevoegd. Dat is bewust niet in deze exclusieve familie-edit gedaan. Dit is alleen een administratieve overdracht: er staat geen open intent- of ownergrensonderzoek meer voor deze drie routes. Een eventuele latere DFS-run kan metrische prioritering toevoegen, maar is geen voorwaarde voor de huidige production-readiness en mag niet worden voorgesteld als reeds uitgevoerd bewijs.
