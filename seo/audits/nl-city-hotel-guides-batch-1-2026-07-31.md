# Acceptatie-audit NL bestemmingshotelgidsen — batch 1

Datum: 2026-07-31

## Geaccepteerde routes

- `/nl/best-hotels/pattaya/`
- `/nl/best-hotels/ayutthaya/`
- `/nl/best-hotels/chiang-rai/`
- `/nl/best-hotels/hat-yai/`
- `/nl/best-hotels/sukhothai/`

## Bewijs

- Iedere route rendert via het gedeelde premium `HotelGuideTemplate` met zelfstandige Nederlandse ownerdata.
- Lokale HTTP-controle: alle vijf status 200, exacte canonical en `nofollow sponsored` op de centrale Trip.com/Travelpayouts-link.
- TypeScript `tsc --noEmit --incremental false`: groen na integratie.
- `design:verify`: groen.
- `affiliate:verify`: groen; geen ongeautoriseerde of geforceerde Amazonproductslug toegevoegd.
- Vercel-previewdeployment `dpl_CZPoAukL7Sh4eX4NnGwmyPb4asWP`: READY na volledige production build.
- Live smoke-test op homepage en alle vijf routes: HTML aanwezig, canonical aanwezig en gesponsorde affiliate-markering aanwezig.
- Preview: `https://go2thailand-4s2nxs49o-marvinnl046s-projects.vercel.app`.

## SEO- en kwaliteitscontrole

- Eén primaire intentie en exacte routeowner per stad.
- Geen vaste prijs, vluchtige reviewscore of ongefundeerde “beste”-rangorde.
- Interne links verbinden reisgids, attracties en foodowner zonder geforceerde ankertekst.
- FAQ beantwoordt intentgerichte vragen; niet reproduceerbare PAA wordt niet als echte PAA geclaimd.
- Bronnenlijst bevat officiële bestemmings- en hotelsites.
- Affiliate disclosure, actuele-beschikbaarheidsformulering en externe-linkattributen zijn centraal afgedwongen.

## Acceptatie

De vijf routes mogen worden toegevoegd aan `nl:hotel-guide.acceptedRoutes`. De familystatus blijft `pending` totdat alle 75 geplande hotel-guideowners zijn geaccepteerd.
