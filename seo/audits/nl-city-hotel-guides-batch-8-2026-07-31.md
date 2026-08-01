# Acceptatie-audit NL bestemmingshotelgidsen — batch 8

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/chiang-khong/`
- `/nl/best-hotels/kamphaeng-phet/`
- `/nl/best-hotels/nan/`
- `/nl/best-hotels/phetchaburi/`

## Bewijs

- Vier zelfstandige Nederlandse owners met exact vijf beslisgebieden, acht gecontroleerde hotels, een split-stay, vier boektips, exact acht FAQ’s, natuurlijke interne links en primaire/first-party bronnen.
- Lokale rendered test: viermaal status 200, exacte canonical, H1, centrale Trip.com/Travelpayouts-route en `nofollow sponsored` affiliatemarkering.
- Datastructuurcheck: 5 gebieden, 8 hotels, 4 tips en 8 FAQ’s per owner; 0 ontbrekende assets.
- TypeScript (`tsc --noEmit --incremental false`) groen na registratie.
- Geen vaste prijs, vluchtige reviewscore, numerieke transferbelofte, kunstmatige schaarste of geforceerde Amazonlink.
- Twaalf nieuwe projectspecifieke WebP-assets geven iedere bestemming een lokale hero, routebeslissing en tweede verblijfslandschap.
- Gerichte designcoverage: viermaal premium signature; 667/700 NL-routes met premium signature, 0 hybrid en 333/700 exacte NL owners.
- Researchmethodiek, intentiegrenzen en de tijdelijk onbruikbare DFS-HTTP-response staan transparant in `seo/research/nl/2026-07-31-city-hotel-guides-batch-8.md`; er zijn geen niet-geverifieerde volumes of PAA’s ingevuld.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; 17 gebruikte Amazon-slugs en 21 geregistreerde producten, zonder geforceerde hotelproductlink.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen.

De vier routes zijn geaccepteerd. `nl:hotel-guide` staat nu op 43/75 en blijft `pending`.
