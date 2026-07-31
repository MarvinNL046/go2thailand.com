# Acceptatie-audit NL bestemmingshotelgidsen — batch 6

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/trang/`
- `/nl/best-hotels/chanthaburi/`
- `/nl/best-hotels/chiang-khan/`
- `/nl/best-hotels/nong-khai/`

## Bewijs

- Vier zelfstandige Nederlandse owners met vijf gebieden, acht hotels, split-stay, vier tips, acht FAQ’s, natuurlijke links en primaire bronnen.
- Lokale rendered test: viermaal status 200, exacte canonical, H1 en gesponsorde affiliatemarkering.
- TypeScript en diff-check groen na integratie.
- Geen vaste prijs, reviewscore, transferbelofte of geforceerde Amazonlink.
- Gerichte designcoverage: viermaal premium signature; 325/700 exacte NL owners.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; geen ongeautoriseerde productslug of geforceerde Amazonlink.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen.

De vier routes zijn geaccepteerd. `nl:hotel-guide` staat nu op 35/75 en blijft `pending`.
