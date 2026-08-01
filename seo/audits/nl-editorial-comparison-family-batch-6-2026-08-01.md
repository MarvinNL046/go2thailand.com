# Audit — NL editorial comparison & family batch 6

- Datum: 2026-08-01
- Scope: exact zeven toegewezen `/nl/blog/`-routes
- Centrale ledgers/keywords/registry: niet gewijzigd in deze batch

## Lifecycle en ownergrenzen

| Route | Status | Index | Ownergrens |
|---|---|---:|---|
| `cheapest-vs-most-expensive-hotel-bangkok` | ready | ja | hotelbudgetwaarde; niet de Bangkok-wijkenowner |
| `goedkoopste-vs-duurste-hotel-bangkok` | archived | nee | duplicaat geconsolideerd naar bovenstaande owner |
| `thailand-first-time-visitors-essential-guide-2026` | archived | nee | consolideert naar `/nl/thailand-for-first-timers/` |
| `thailand-honeymoon-guide-romantic-destinations` | ready | ja | reisstijl/tempo; geen afzonderlijke hotelregio-owner |
| `thailand-vs-bali-2026-which-is-better` | ready | ja | neutrale landenkeuze |
| `thailand-vs-vietnam-which-country-visit-2026` | ready | ja | neutrale landenkeuze |
| `thailand-with-kids-family-travel-guide` | archived | nee | consolideert naar `/nl/travel-guides/thailand-with-kids/` |

## Contentcorrecties

- Onbewezen first-person ervaringen verwijderd.
- Vaste prijzen, wisselkoersconversies, ranglijsten en “beste/goedkoopste”-absoluten verwijderd.
- Misleidende algemene seizoensregels vervangen door regio- en maandcontext.
- Gezondheids- en veiligheidsclaims beperkt tot bronondersteunde voorbereiding.
- Beide landenvergelijkingen laten meerdere valide uitkomsten zien.
- Interne links gebruiken beschrijvende ankertekst en verwijzen naar bestaande route-, wijk- en cityowners.
- De twee reeds bezette starter-/gezinstermen zijn niet als nieuwe keywordowner geclaimd; beide blogroutes zijn archived/noindex en kandidaat voor permanente redirect.

## Design en assets

- Zeven typed NL editorial profiles toegevoegd met passende layoutvarianten.
- Iedere route heeft een eigen bestand onder `public/images/redesign/editorial/`; de twee landenvergelijkingen gebruiken nieuw gegenereerde `-hero-v2.webp`-scènes.
- Alle beelden zijn naar 1376 × 768 WebP verwerkt; er staat geen tekst in de beelden.
- Hero-altteksten beschrijven het zichtbare onderwerp zonder keywordstapeling.

De twee nieuwe vergelijkingbeelden zijn met de ingebouwde imagegen-tool gemaakt. Promptdoel: een fotorealistische, tekstloze split-scene waarin Thailand respectievelijk met Bali en Vietnam wordt vergeleken; geen vlaggen, logo’s of watermerken.

## Affiliates

- Trip.com live-prijs-CTA op de actieve hotelbudgetowner.
- Trip.com live-prijs-CTA op de honeymoonplanner als natuurlijke accommodatiehandeling.
- Geen affiliateblok op archives of landenvergelijkingen omdat daar geen directe producttaak noodzakelijk is.
- Externe affiliateblokken worden door de gedeelde renderer met sponsored/nofollow-relatie behandeld.

## Technische acceptatie

Uit te voeren/uitgevoerd binnen de batch:

- profile loader-validatie voor alle zeven slugs;
- markdown/frontmatter-beeldmatch;
- route runtime: HTTP 200, één H1, self-canonical;
- archived route: noindex;
- interne-linkcontrole;
- hero-dimensies en bestandsgrootte;
- TypeScript zonder emit.

De centrale parent-agent voegt de geaccepteerde routes, vier indexeerbare keywordowners en ledgerstatus pas toe na integratie van alle parallelle batches. Permanente redirects worden aanbevolen voor de drie geconsolideerde routes.
