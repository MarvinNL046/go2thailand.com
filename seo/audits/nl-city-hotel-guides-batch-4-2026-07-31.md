# Acceptatie-audit NL bestemmingshotelgidsen — batch 4

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/udon-thani/`
- `/nl/best-hotels/nakhon-ratchasima/`
- `/nl/best-hotels/ubon-ratchathani/`
- `/nl/best-hotels/lopburi/`

## Bewijs

- Vier zelfstandige Nederlandse datasets met ieder vijf gebiedskeuzes, acht hotels, split-stay, vier boektips, acht FAQ’s, interne links en primaire bronnen.
- Lokale rendered test: viermaal HTTP 200, exacte canonical, H1 en gesponsorde affiliatemarkering.
- TypeScript en `git diff --check`: groen na integratie.
- Geen vaste prijs, reviewscore, ongecontroleerde transferclaim of geforceerde Amazonlink.
- Gerichte designcoverage: viermaal premium signature; 317/700 exacte NL owners.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; geregistreerde producten en geen geforceerde Amazonlink.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen.

De vier routes zijn geaccepteerd. `nl:hotel-guide` staat nu op 27/75 en blijft `pending`.
