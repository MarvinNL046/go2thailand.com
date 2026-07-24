# NL Lopburi destination — acceptance audit

**Route:** `/nl/city/lopburi/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- DFS-hoofdquery `lopburi thailand`: volume 90, KD 0, informationele intentie; spellingvolgorde `thailand lopburi`: volume 260.
- Zestien directe clusterrecords en vijftig concurrerende domeinen.
- Tien live Nederlandse SERP's voor bestemming, bezienswaardigheden, activiteiten, apen, tempels, Bangkok-route, verblijfsduur, beste reistijd, zonnebloemen en bezoekwaardigheid.
- Echte terugkerende PAA's zijn gebruikt; algemene Thailand- en zonnebloemvragen zijn niet als lokale vragen herschreven.
- Zes DFS Content Parsing-bronnen: drie Nederlandse concurrenten, twee officiële TAT-pagina's en Museum Thailand.
- De bestaande city owner rankt voor twee varianten rond positie 64–69. De URL blijft daarom exact behouden.
- `/nl/guides/travel-guide/lopburi/` heeft nul rankings en geen aangetoond backlinkprofiel. Alleen deze Nederlandse duplicate consolideert permanent naar de city owner.
- Engelse Lopburi-routes blijven onaangeroerd tot de afzonderlijke EN-fase.

## Information gain

1. De apenpopulatie wordt niet als vaste toeristische garantie gepresenteerd; actief beheer en de veranderlijke situatie in 2026 zijn expliciet.
2. De erfgoedroute is de constante kern: Prang Sam Yot, Wat Phra Si Rattana Mahathat, Phra Narai Ratchaniwet, het nationale museum en Ban Wichayen.
3. Lopburi en Lopburi 2 worden als apart stationsbesluit behandeld zonder een statische dienstregeling vast te zetten.
4. Zonnebloemen zijn verspreide landbouwpercelen; een actuele foto, locatie en toestemming gaan vóór een oud maandoverzicht.
5. Eén overnachting wordt als robuustere keuze uitgelegd, terwijl een haalbare dagtrip niet kunstmatig wordt uitgesloten.
6. Apenveiligheid vermijdt voeren, lokken, aanraken en loshangende spullen en geeft een medisch handelingsadvies bij beet of kras.
7. Thai Phuan-context en lokale producten geven een foodlaag zonder onbewezen restaurant- of prijsclaims.

## Visueel systeem

Vijf unieke plaatsgebonden WebP-assets zijn met de imagegen-skill gemaakt en geoptimaliseerd:

- `lopburi-hero.webp` — Prang Sam Yot als architectonische hoofdrol, rustige donkere tekstzone en enkele makaken.
- `lopburi-palace-quarter.webp` — Narai-paleisarchitectuur, bogen, tuin en warm zijlicht.
- `lopburi-monkey-reality.webp` — documentaire observatie op afstand, zonder voeren of contact.
- `lopburi-sunflower-route.webp` — geloofwaardig veld, pad en kalksteenlandschap.
- `lopburi-route-banner.webp` — één doorlopende panoramaroute van Khmer-ruïne via paleis naar seizoensveld.

De vijf assets wegen samen circa 1,4 MiB. De originele PNG's blijven in de lokale Codex imagegen-map bewaard.

## Browser-QA

- In-app Browser gecontroleerd op desktop (1265 px) en mobiel (375 px contentviewport binnen 390 × 844); beide weergaven hebben geen horizontale overflow.
- Eén H1: `Lopburi meer dan de apen`; title en canonical zijn correct en de pagina bevat circa 2.606 gerenderde woorden in `<main>`.
- Canonical: `https://go2-thailand.com/nl/city/lopburi/`; hreflang bevat `nl`, `en` en `x-default`.
- JSON-LD aanwezig voor `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- Mobiele sticky zoekbalk en vaste bottom navigation zijn zichtbaar en bruikbaar; desktop en mobiel hebben geen Next-erroroverlay en een schone verse consolelog.
- Alle 15 inhoudsafbeeldingen laden na een volledige doorscroll, zonder gebroken bron en zonder ontbrekende of lege alt-tekst.
- De standaard geopende FAQ heeft `rgb(41, 53, 49)`, 14 px tekst en 28 px regelhoogte en is ook mobiel duidelijk leesbaar.
- Alle zes zichtbare interne hoofdlinks geven HTTP 200. Niet-bestaande Nederlandstalige detail-URL's zijn bewust vervangen door de bestaande attractiehub.
- `/nl/guides/travel-guide/lopburi/` geeft 308 naar `/nl/city/lopburi/`; `/guides/travel-guide/lopburi/` blijft 200 voor de latere Engelse fase.
- De globale Travelpayouts Drive-loader blijft sitebreed actief in productie, maar wordt niet meer in development geladen. Daarmee verdwijnt de externe `config is not valid`-fout uit lokale QA zonder trackinglinks, widgets of productiemonetisatie te verwijderen.

## Gates

- `npx tsc --noEmit` — groen; gegenereerde `tsconfig.tsbuildinfo` hersteld.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:verify:nl-runtime` — groen: 72/72 routes.
- `npm run seo:cannibalization` — groen: 0 harde collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte Amazon-slugs en 13 geregistreerde producten.
- `git diff --check` — groen.
