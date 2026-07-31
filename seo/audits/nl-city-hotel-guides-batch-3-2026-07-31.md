# Acceptatie-audit NL bestemmingshotelgidsen — batch 3

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/pai/`
- `/nl/best-hotels/mae-hong-son/`
- `/nl/best-hotels/lampang/`
- `/nl/best-hotels/khon-kaen/`

## Bewijs

- Vier zelfstandig geschreven Nederlandse `HotelGuideData`-owners via één premium herbruikbaar template.
- Iedere route heeft vijf gebiedskeuzes, acht hotelpicks, split-staylogica, vier boektips, acht FAQ’s, natuurlijke interne links en officiële bronnen.
- Lokale rendered smoketest: viermaal status 200, exacte canonical, H1 en gesponsorde affiliatemarkering.
- Geen vaste prijs, vluchtige reviewscore of geforceerde Amazonlink.
- Volledige TypeScript-check en `git diff --check`: groen na integratie.
- Gerichte designcoverage: viermaal premium signature; 313/700 exacte NL owners.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; geen ongeautoriseerde productslug of geforceerde Amazonlink.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen.

## Status

Deze vier routes zijn geaccepteerd. `nl:hotel-guide` staat nu op 23/75 en blijft `pending` voor de resterende owners.
