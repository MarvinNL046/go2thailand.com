# Acceptance-audit — Nederlandse Ayutthaya destination-owner

**Datum:** 24 juli 2026  
**Status:** premium destination-owner, research en responsive QA groen.

## Definitieve owner-route

- `/nl/city/ayutthaya/`

## Research

- DataForSEO-cluster: 73 keywordrecords en 19 concurrentdomeinen.
- Primair zoekvolume 4.400; KD 0.
- Live Nederlandse SERP: 10 organische resultaten en 6 echte PAA-vragen.
- Exacte owner: 4 rankingkeywords; beste bewezen positie 24 voor `thailand ayutthaya` met volume 4.400.
- Geen backlinks of verwijzende domeinen gevonden.
- Drie concurrentiepagina’s volledig via DFS Content Parsing gelezen: BackpackenInAzie, Reisjunk en 333travel.
- Familiebrede stadsanalyse ondersteunt consolidatie van dubbele top-10-, reistijd- en verblijfspaden zonder de Engelse routes aan te raken.

## Design en assets

- Bestaande herbruikbare `DestinationGuideTemplate` krijgt nieuwe Ayutthaya-data en een semantisch passende `touristType`-override.
- De Klook-microcopy in het gedeelde template is ontdaan van oude Krabi-specifieke “karst of eilanden”-tekst.
- Drie nieuwe geoptimaliseerde WebP-assets, met de imagegen-skill gemaakt:
  - `ayutthaya-destination-hero.webp` — historische ruïnes en fietsers bij zacht ochtendlicht.
  - `ayutthaya-river-heritage.webp` — rivier, boot en tempels als routebanner.
  - `ayutthaya-food-specialties.webp` — riviergarnaal, boat noodles en roti sai mai.
- Bestaande specifieke Ayutthaya-beelden worden alleen gebruikt waar zij inhoudelijk bij de zone horen.

## Browser-QA

- Desktop 1440×1000: hero, sidecard, CTA’s en sectienavigatie visueel groen.
- Rivierbanner, drie highlightcards en donkere foodsectie afzonderlijk gecontroleerd.
- Mobiel 390×844: app-zoekbalk en bottom-nav intact; hero, CTA’s en foodcopy leesbaar.
- Documentbreedte 375/375 en geen horizontale overflow.
- Geen gebroken afbeeldingen.
- Exact één H1: `Ayutthaya Thailand`.
- Canonical wijst naar de Nederlandse owner; `en`, `nl` en `x-default` hreflang zijn aanwezig.
- Structured data: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Vijf zichtbare affiliate-CTA’s zijn gecontroleerd en dragen `noopener noreferrer nofollow sponsored` met `target="_blank"`.

## Technische poorten

- Lokale owner retourneert HTTP 200.
- TypeScript, gerichte ESLint zonder errors, designsysteem, SEO-cannibalisatie en affiliateverificatie zijn groen.
- De Nederlandse owner-runtimecheck staat na toevoeging van Ayutthaya op 55/55 groene routes.
- De Engelse Ayutthaya-route en content blijven onaangeroerd tot de afzonderlijke Engelse researchfase.

## Bekende sitebrede observatie

- De globale `emrldco.com`-scriptlaag kan in development `config is not valid` loggen. Dit is niet Ayutthaya-template-eigen en blijft voor de afzonderlijke third-party/performance-audit.
