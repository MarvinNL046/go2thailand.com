# Audit — NL editorial tourism/news trends batch 5

Datum: 1 augustus 2026
Scope: exact zes Nederlandse news-, trends- en hotelowners.

## Resultaat per route

| Route | Cluster | Lifecycle | Uitkomst |
|---|---|---|---|
| `/nl/blog/thailand-electricity-tariff-cut-2026-cost-of-living/` | news-trends | archived / superseded / noindex | Verlopen januari–apriltarief vervangen door uitleg van Ft-periodes en huurcontrole. |
| `/nl/blog/thailand-mekong-river-cruises-cultural-tourism-2026/` | news-trends | archived / superseded / noindex | Strategie en werkelijk boekbare cruise gescheiden; onbevestigde dorps- en grensclaims verwijderd. |
| `/nl/blog/thailand-pivots-marketing-short-haul-asian-markets-2026/` | news-trends | ready / confirmed / index | Actuele TAT-marktsegmentatie zonder Europese afwijzings- of prijsclaim. |
| `/nl/blog/thailand-tourism-2026-middle-east-impact-visitor-numbers/` | news-trends | ready / confirmed / index | Maartverstoring, aprilherijking en juni-update als expliciet gedateerde tijdlijn. |
| `/nl/blog/thailand-tourism-shifts-gears-fewer-visitors-better-experiences-2026/` | news-trends | ready / confirmed / index | Value over Volume uitgelegd als beleidsrichting, niet als rust- of prijsgarantie. |
| `/nl/blog/new-luxury-resorts-thailand-2026-marriott-hilton-mercure/` | hotels | ready / live-price-only / index | Alleen officieel bevestigde of expliciet geplande hotelstatus; oude onbevestigde Marriott- en Mercureclaims verwijderd. |

## Hotelstatus en commerciële laag

- Kahavadi Chiang Rai: opening door Hilton bevestigd op 1 juli 2026.
- Hilton Bangkok Suvarnabhumi Golf Resort & Spa: opening door Hilton bevestigd; mogelijke beperkte renovatiewerkzaamheden blijven controlepunt.
- Nivata Koh Samui: op de peildatum gepland voor oktober en nog niet boekbaar.
- De legacyclaim dat drie specifieke Marriott-, Hilton- en Mercureprojecten allemaal als 2026-opening beschikbaar waren, is verwijderd.
- Alleen de hotelowner bevat een Trip.com-affiliateblok met expliciet live-pricebeleid.
- De CTA vraagt om de actuele prijs voor exacte data, kamertype, belastingen en voorwaarden; nergens staat een vaste kamerprijs.

## Visuele uitvoering

Met de ingebouwde imagegen-tool zijn zes afzonderlijke fotorealistische editorial hero's gemaakt:

1. energie en langer verblijf in Bangkok;
2. Mekong-riviercultuur bij Nakhon Phanom;
3. regionale Aziatische short-haulreizen;
4. vluchtverstoring zonder crisis- of oorlogsensatie;
5. community-led Value over Volume;
6. hedendaagse Thaise hospitality zonder merk- of resortclaim.

Alle beelden zijn als WebP opgeslagen onder `/images/redesign/editorial/<slug>-hero.webp`, 1536 × 1024 pixels en ongeveer 66–192 KB. Er staan geen logo's, prijzen, teksten of merkspecifieke bouwwerken in.

## Route-eigen component

De hotelroute had een oudere statische owner die vóór het typed profiel werd gerenderd. `components/hotels/NewLuxuryResortsThailandGuide.tsx` is teruggebracht tot een dunne adapter naar `NlEditorialArticle`, waardoor het typed profiel nu de enige bron is voor hero, metadata, blokken en actuele hotelstatus. Registry en centrale routering zijn niet gewijzigd.

## QA

| Controle | Resultaat |
|---|---|
| Typed loader en manifestcluster | 6/6 geslaagd; vijf `news-trends`, één `hotels` |
| Markdown-parser | 6/6 geslaagd |
| Lifecycle | twee archived + noindex, vier ready + index |
| Lokale runtime | 6/6 HTTP 200 |
| HTML-taal | 6/6 `lang="nl"` |
| H1 | exact één per route |
| Canonical | 6/6 exact op de eigen NL-route |
| Robots | exact gelijk aan lifecyclebesluit |
| Route-eigen hero | 6/6 aanwezig op schijf en in runtime-HTML |
| Interne links | alle gebruikte Nederlandse doelen HTTP 200 |
| Mojibake, widgets, scripts, iframes en shortcodepatronen | geen treffers in batchcontent/profielen/research |
| Fake ervaring, vaste prijzen en koop-nu-taal | geen treffers |
| `tsc --noEmit --incremental false` | exit 0 |

## Bronmemo

De primaire broncontrole en claimgrenzen staan in `seo/research/nl/2026-08-01-editorial-tourism-news-trends-batch-5-current-web.md`. Er zijn geen DFS-, ranking-, volume- of PAA-claims gebruikt.
