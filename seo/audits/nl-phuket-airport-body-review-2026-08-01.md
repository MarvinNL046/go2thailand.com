# NL Phuket Airport body review — 1 augustus 2026

## Scope

- Route: `/nl/blog/phuket-airport/`
- Contentbestand: `content/blog/nl/phuket-airport.md`
- Onderzoek: `seo/research/nl/2026-07-31-editorial-pilot-current-web.md`
- Primaire bronnen: Airports of Thailand (AOT) en Thai Immigration Bureau
- Dit is een body- en frontmatterreview. JSON-profiel, registry, template, routeconfiguratie en SEO-ledgers zijn niet gewijzigd.

## Redactionele beslissing

De pagina beantwoordt voortaan eerst de reizigersvraag: welke aankomststappen doorloop je en welk vervoer past bij je verblijfzone, bagage en aankomstcontext? De body is volledig opnieuw geschreven in natuurlijk Nederlands. De airport-owner blijft begrensd tot aankomst, terminalkeuze, aansluiting en onward transport; algemene hotel- en bestemmingskeuzes gaan via interne links naar hun eigen owners.

## Verwijderd

- Mojibake en kapotte valuta-, pijl- en emoji-tekens.
- Verzonnen teambezoeken, tientallen landingen en andere onbewezen persoonlijke ervaring.
- Vaste wachttijden, taxitarieven, busfrequenties, maaltijdprijzen en wisselkoersen.
- Onbewezen claims over nieuwe vertrekbelastingen, percentages en ingangsdata.
- De foutieve instructie dat TM6 via een app moest worden ingevuld.
- Onbetrouwbare claims over visumduur, paspoortgeldigheid en directe vliegroutes.
- Legacy widget-HTML, inline styles, QR-afbeeldingen en Engelstalige CTA's.
- Niet-primaire bronnen die geen noodzakelijke claim droegen.

## Claim- en bronkaart

| Claimlaag | Primaire bron | Implementatie |
|---|---|---|
| Internationale aankomstvolgorde | AOT Phuket Airport | Paspoortcontrole, toepasselijke controle, bagage, douane en vervoer worden als proces beschreven. |
| Binnenlandse, internationale en CIQ-stromen | AOT Phuket Airport | De body vraagt reizigers terminal-, bagage- en transferinstructies bij hun luchtvaartmaatschappij te bevestigen. |
| Vervoersvormen | AOT transportation | Taxi, limousine, app-rit, bus, minivan en huurauto worden als keuzeopties genoemd zonder vaste prijsbelofte. |
| Smart Bus-corridor | AOT Phuket Smart Bus | Alleen de door AOT genoemde kustcorridor is opgenomen; dienstregeling en voorwaarden moeten live worden gecontroleerd. |
| Digitale aankomstkaart | Thai Immigration Bureau TDAC | TDAC vervangt de papieren aankomstkaart, wordt binnen de officiële driedaagse periode ingediend en is expliciet geen visum. |
| Officiële wifi | AOT free Wi-Fi | Alleen het bestaan en de noodzaak de actuele officiële netwerknaam te controleren worden genoemd. |
| Verloren bagage versus terminalvoorwerp | AOT Lost & Found plus airline-proces | De twee meldroutes zijn duidelijk van elkaar gescheiden. |
| VAT-refundvolgorde | AOT VAT refund for tourists | De reiziger krijgt alleen het duurzame advies de procedure vóór het afgeven van relevante ruimbagage te controleren. |

## Interne links

Alle vijf interne links zijn locale-correct en bestaan in de actuele goal-ledger:

- `/nl/best-hotels/phuket/`
- `/nl/city/phuket/`
- `/nl/transport/`
- `/nl/travel-guides/sim-card-thailand/`
- `/nl/visa/`

## Verificatie

- Markdownbody: 1.981 woorden vóór de laatste bron-only frontmatteraanpassing; de body zelf veranderde daarna niet.
- Koppen van niveau 2 of 3: 24.
- Unsafe HTML-tags: 0.
- Legacy `data-widget`-blokken: 0.
- Gedetecteerde mojibakepatronen: 0.
- Vaste transferprijzen, wachttijden, belastingpercentages of wisselkoersen: 0.
- Onbewezen persoonlijke ervaringsclaims: 0.
- Interne links buiten `/nl/`: 0.

## Freshnessregel

Vervoersschema's, opstapplekken, inreisregels, airlineprocedures en wifi-instructies blijven veranderlijk. De pagina gebruikt daarom check-actueel taal en verwijst bij iedere kritieke laag naar de primaire uitvoerder of autoriteit.
