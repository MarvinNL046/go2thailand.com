# Acceptatie-audit NL bestemmingshotelgidsen — batch 2

Datum: 2026-07-31

## Routes

- `/nl/best-hotels/chumphon/`
- `/nl/best-hotels/hua-hin/`
- `/nl/best-hotels/kanchanaburi/`
- `/nl/best-hotels/surat-thani/`

## Inhoud en technische controle

- Vier zelfstandige Nederlandse datasets renderen via het premium `HotelGuideTemplate`.
- Iedere owner heeft vijf gebiedskeuzes, acht concrete hotelkeuzes, split-stayadvies, boekingstips, acht FAQ’s, interne vervolgroutes en officiële bronnen.
- Lokale HTTP-smoketest: viermaal status 200, exacte canonical, H1 en gesponsorde affiliatemarkering aanwezig.
- Alle externe hotelboekingsknoppen gebruiken centraal actuele beschikbaarheid; geen vaste prijs, vluchtige score of geforceerde Amazonlink.
- Interne links gebruiken natuurlijke Nederlandse ankertekst en scheiden stad, strand, luchthaven, station en ferryterminal waar nodig.
- TypeScript: groen.
- Gerichte rendered-designaudit: viermaal premium signature; 309/700 exacte NL owners in het actuele rapport.
- `design:verify`: groen; 7 primitives en 34 pilottemplates.
- `affiliate:verify`: groen; alleen geregistreerde productslugs en geen Amazonlink op deze hotelowners.
- `seo:cannibalization`: groen; 0 harde botsingen en 0 waarschuwingen.

## Acceptatievoorwaarde

De vier routes zijn geaccepteerd in `nl:hotel-guide.acceptedRoutes`. De familie staat nu op 19/75 en blijft `pending` totdat alle 75 geplande owners afzonderlijk zijn bewezen.
