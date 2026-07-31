# Acceptatie-audit NL bestemmingshotelgidsen — batch 7

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/bueng-kan/`
- `/nl/best-hotels/nakhon-phanom/`
- `/nl/best-hotels/mukdahan/`
- `/nl/best-hotels/buriram/`

## Bewijs

- Vier zelfstandige Nederlandse owners met exact vijf beslisgebieden, acht gecontroleerde hotels, een split-stay, vier boektips, exact acht FAQ’s, natuurlijke interne links en primaire/first-party bronnen.
- Lokale rendered test: viermaal status 200, exacte canonical, H1, centrale Trip.com/Travelpayouts-route en `nofollow sponsored` affiliatemarkering.
- TypeScript (`tsc --noEmit --incremental false`) en `git diff --check` groen na integratie.
- Geen vaste prijs, vluchtige reviewscore, numerieke transferbelofte, kunstmatige schaarste of geforceerde Amazonlink.
- Gerichte designcoverage: viermaal premium signature; 667/700 NL-routes met premium signature, 0 hybrid en 329/700 exacte NL owners.
- Buriram gebruikt drie nieuwe lokale premium assets voor hero, sportstad en Nang Rong/Phanom Rung; alle overige gebruikte assets bestaan lokaal.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; 17 gebruikte Amazon-slugs en 21 geregistreerde producten, zonder ongeautoriseerde productslug of geforceerde hotelproductlink.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen.
- Researchmethodiek en het tijdelijk mislukte DFS-transport voor Buriram zijn transparant vastgelegd in `seo/research/nl/2026-07-31-city-hotel-guides-batch-7.md`; er zijn geen niet-geverifieerde metrics of PAA’s ingevuld.

De vier routes zijn geaccepteerd. `nl:hotel-guide` staat nu op 39/75 en blijft `pending`.
