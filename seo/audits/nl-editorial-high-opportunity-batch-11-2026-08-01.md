# Audit — NL editorial high-opportunity batch 11

Datum: 2026-08-01
Routes: 7
Onderzoek: `seo/research/nl/2026-08-01-editorial-high-opportunity-batch-11-current-web.md`

## Resultaat

- Zes routes zijn expliciet `ready/index`.
- `foreign-investors-buying-thai-hotels-12-billion-baht-2026` is expliciet `archived/noindex`, omdat de oude jaartotaalclaim een verwachting en geen definitieve uitkomst is.
- Alle zeven routes hebben een typed NL-editorialprofiel, route-eigen hero, self-canonical en een gedocumenteerd lifecyclebesluit.
- De drie generieke artikelen zijn volledig in natuurlijk Nederlands herschreven.
- De vier bestaande gespecialiseerde renderers voor koffie, durian, Lumpini en Cave Fantasy zijn behouden en geactualiseerd. Daardoor blijft eerder opgebouwde visuele en zoekintentie-specifieke UX intact.
- Claims over DFS, PAA, vaste prijzen, dynamische scores en ingehaalde toekomstdata zijn uit de zichtbare gespecialiseerde verantwoording verwijderd.

## Routecontrole

| Route | Profiel | Renderer | Robots | Belangrijkste kwaliteitsingreep |
| --- | --- | --- | --- | --- |
| Chiang Mai digital nomad | evergreen/planning | typed generic | index | Ranglijst vervangen door wijk-, budget-, lucht- en visumbesluit. |
| Buitenlandse hotelinvesteerders | news-update/archived | typed generic | noindex | Onbewezen jaartotaal gedegradeerd tot transparant archief. |
| Hands-free bagage | evergreen/transport | typed generic | index | Overdrachtsketen, uitsluitingen, marge en dagtas centraal. |
| Bangkok specialty coffee | food/overview | specialized | index | Drie routes en officiële locatiechecks; geen top-10 of score-afhankelijkheid. |
| Durianseizoen | food/dish | specialized | index | Regionaal oogstvenster, rijpheid, eenheid en voedselveiligheid. |
| Lumpini Hawker Centre | food/market | specialized | index | BMA-bron en dagchecks voor roterend aanbod. |
| Cave Fantasy | evergreen/compare | specialized | index | MBK-status bevestigd; zones, criteria en live ticketvoorwaarden. |

## Assets

Nieuwe imagegen-assets, gegenereerd met de ingebouwde imagegen-tool en daarna lokaal geoptimaliseerd naar WebP:

- `public/images/redesign/editorial/chiang-mai-cheapest-digital-nomad-city-2026-hero.webp`
- `public/images/redesign/editorial/foreign-investors-buying-thai-hotels-12-billion-baht-2026-hero.webp`
- `public/images/redesign/editorial/thailand-hands-free-travel-luggage-delivery-trend-2026-hero.webp`

De vier gespecialiseerde routebeelden zijn als route-eigen, geoptimaliseerde editorial-derivaten opgeslagen:

- `public/images/redesign/editorial/bangkok-specialty-coffee-cafe-guide-2026-hero.webp`
- `public/images/redesign/editorial/durian-season-thailand-2026-where-to-eat-buy-guide-hero.webp`
- `public/images/redesign/editorial/bangkok-lumpini-hawker-centre-street-food-2026-hero.webp`
- `public/images/redesign/editorial/cave-fantasy-mbk-center-bangkok-immersive-art-2026-hero.webp`

Alle bestanden zijn 1600 × 900 en blijven onder de projectgrens van 450 KB.

## Affiliatecontrole

- Bestaande gespecialiseerde affiliateblokken blijven inhoudelijk relevant: Trip.com bij een Bangkok- of Chanthaburi-verblijfsbesluit, Klook bij Cave Fantasy en Amazon alleen bij passende eetuitrusting.
- Geen affiliateblok is toegevoegd aan een route zonder natuurlijke transactionele vervolgstap.
- Externe affiliate-CTA’s in de gespecialiseerde renderers gebruiken `target="_blank"` en `rel="noopener noreferrer nofollow sponsored"`.

## Verificatie

De integrerende root-agent voert na acceptatie in de centrale family-manifesten de volledige familie-, asset-, design-, affiliate-, canonical- en ledgergates uit. Deze batch controleert zelfstandig:

- JSON-profielen en manifestcluster;
- frontmatter/profiel-heropad;
- TypeScript zonder incrementale cache;
- runtime 200, H1, canonical en robots voor representatieve generieke en gespecialiseerde routes;
- interne links en bestandsassets;
- afwezigheid van zichtbare DFS/PAA-claims in de toegewezen actuele renderers.
