# Acceptatie-audit NL bestemmingshotelgidsen — batch 5

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/phitsanulok/`
- `/nl/best-hotels/trat/`
- `/nl/best-hotels/rayong/`
- `/nl/best-hotels/nakhon-si-thammarat/`

## Bewijs

- Vier zelfstandige NL owners met gebiedskeuzes, acht concrete hotelpicks, split-stay, vier boektips, acht FAQ’s, natuurlijke interne links en officiële bronnen.
- Lokale rendered test: viermaal HTTP 200, exacte canonical, H1 en gesponsorde affiliatemarkering.
- Volledige TypeScript-check en `git diff --check`: groen na integratie.
- Geen vaste prijs, vluchtige score, ongedekte transferbelofte of geforceerde Amazonlink.
- Gerichte designcoverage: viermaal premium signature; 321/700 exacte NL owners.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; geen ongeautoriseerde productslug of geforceerde Amazonlink.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen, waaronder geen botsing tussen de Trat-bestemming, food-owner en nieuwe hotelowner.

De vier routes zijn geaccepteerd. `nl:hotel-guide` staat nu op 31/75 en blijft `pending`.
