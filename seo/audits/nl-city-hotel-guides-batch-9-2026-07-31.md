# Acceptatie-audit NL bestemmingshotelgidsen — batch 9

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/prachinburi/`
- `/nl/best-hotels/satun/`

## Bewijs

- Twee zelfstandige Nederlandse owners met exact vijf beslisgebieden, acht gecontroleerde hotels, een split-stay, vier boektips, exact acht FAQ’s, natuurlijke interne links en primaire/first-party bronnen.
- Prachinburi scheidt rivierstad, Khao Yai-oost, 304, Kabin Buri en Na Di/Thap Lan; Satun scheidt vastelandbases en houdt Koh Lipe buiten de hoofdintentie.
- Zes nieuwe locatiegebonden WebP-assets geven beide routes een eigen hero en twee routebeelden; alle gebruikte lokale assets bestaan.
- Hotelkaarten verwijzen naar officiële first-party kanalen. De centrale Trip.com/Travelpayouts-uitgang blijft de enige gesponsorde actuele prijscheck; Amazon is niet geforceerd.
- Geen vaste prijs, vluchtige reviewscore, numerieke transferbelofte, kunstmatige schaarste of verzonnen PAA/volume.
- Researchmethode en de onbruikbare DFS-HTTP-laag zijn transparant vastgelegd in `seo/research/nl/2026-07-31-city-hotel-guides-batch-9.md`.
- Datastructuurcheck: Prachinburi 5/8/4/8/9 en Satun 5/8/4/8/13 voor gebieden/hotels/tips/FAQ’s/bronnen.
- Lokale rendered test: beide routes status 200, exacte canonical, H1, centrale Trip.com/Travelpayouts-route en `nofollow sponsored` affiliatemarkering.
- Echte browser-QA op 1440×1000 en 390×844: geen error-overlay, console-error, kapotte afbeelding of horizontale overflow; acht officiële hotelkanalen per route zichtbaar. De gedeelde mobiele hero-overlay is tijdens deze audit versterkt en opnieuw visueel goedgekeurd voor leesbaar donkergroen op de foto.
- TypeScript (`tsc --noEmit --incremental false`) groen na registratie.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; 17 gebruikte Amazon-slugs en 21 geregistreerde producten.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen.
- Gerichte designcoverage: beide nieuwe owners premium; 667/700 NL-routes met premium signature, 0 hybrid en 335/700 exacte NL owners.

De twee routes zijn geaccepteerd. `nl:hotel-guide` staat op 52/82; alleen de dertig individuele Phuket-hotelprofielen blijven open.
