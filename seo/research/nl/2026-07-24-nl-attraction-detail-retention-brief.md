# Retentiebrief — Nederlandse attractiedetailfamilie

**Vastgelegd:** 24 juli 2026  
**Familie:** `/nl/city/<stad>/attractions/<attractie>/`  
**Besluit:** twee attractiedetailowners behouden; Koh Samet naar een eilandpillar verplaatsen; 269 niet-gelokaliseerde duplicaten uit de Nederlandse index verwijderen.

## Bewijs voor de architectuurkeuze

- DataForSEO Ranked Keywords vond 4 zoekwoorden op 3 van de 272 Nederlandse detail-URLs.
- De volledige DataForSEO Backlinks Bulk Pages Summary vond op geen van de 272 URLs een backlink of verwijzend domein.
- De bestaande templates vertaalden alleen navigatie en vaste labels, terwijl de kerntekst en delen van de structured data Engels bleven.
- `ko samet` en `samet` rankten op de oude attractie-URL, maar de afzonderlijke DFS-cluster toont brede eilandintentie: `koh samet thailand` heeft volume 2.900 en KD 0.
- De twee echte attractie-intenties zijn `koh samui wat plai laem` met volume 390 en `blue temple chiang rai` met volume 210.

## Definitieve keyword-owners

| Primaire intentie | Definitieve owner | Actie |
|---|---|---|
| Koh Samet Thailand | `/nl/islands/koh-samet/` | Nieuwe premium eilandpillar; permanente redirect vanaf de oude Rayong-attractie-URL. |
| Koh Samui Wat Plai Laem | `/nl/city/koh-samui/attractions/wat-plai-laem/` | Behouden en volledig zelfstandig Nederlands herbouwd. |
| Blue Temple Chiang Rai | `/nl/city/chiang-rai/attractions/blue-temple/` | Behouden en volledig zelfstandig Nederlands herbouwd. |

## SERP- en PAA-richting

### Koh Samet

- Zoekintentie: brede eilandkeuze, stranden, bereikbaarheid vanaf Bangkok, verblijfsduur en drukte.
- Echte PAA: of het eiland de moeite waard is, hoeveel dagen nodig zijn en of het druk is.
- Contentvorm: bestemmingsoverzicht met vier verblijfzones, weekdag-versus-weekendkeuze, driedaagse route, Ban Phe-logistiek en actuele zeeconditie als beslislaag.
- Primaire bronnen: Tourism Authority of Thailand voor Ko Samet, Rayong en de tweedaagse route.

### Wat Plai Laem

- Zoekintentie: wat het complex is, wat je ziet, kleding en hoe het in een Koh Samui-route past.
- Contentvorm: compact bezoekplan met uitleg over Guanyin/Cundi, Budai, het meer, respect en een logische noordoostelijke halve dag.
- Geen vaste openingstijden of entreeclaims zonder betrouwbare actuele primaire bevestiging.

### Blue Temple

- Zoekintentie: of de tempel de moeite waard is, kleding, benodigde tijd en combinatie met andere Chiang Rai-tempels.
- Contentvorm: zelfstandige bezoekgids met moderne geschiedenis, ontwerpdetails, bezoekvolgorde, respect en een route buiten de gehaaste tourbuslogica.
- Officiële TAT-bron voor ligging, ontwerpcontext en hoofdkenmerken; secundaire bronnen alleen duidelijk benoemd.

## Designrichting

- Eén herbruikbare `AttractionDetailGuideTemplate` met premium hero, ton-sur-ton keuzevlak, bezoekplan, visuele stippelroute, respectsectie, PAA-FAQ en bronnenmethodiek.
- Eén eigen realistisch sfeerbeeld per behouden attractie en één eigen Koh Samet-hero. De captions benoemen dat de beelden AI-gegenereerd zijn en geen actuele toegang, ceremonie of exacte hotelweergave bewijzen.
- Mobiel blijft besluitgericht: sticky bestemmingzoeker, sterke eerste CTA, bottom-navigation en geen horizontale overflow.

## DFS-evidence

- Familie-audit: `2026-07-24-nl-attraction-detail-family-indexation.md` en `.json`.
- Koh Samet: `2026-07-24-koh-samet-thailand-dfs-cluster.md` en `2026-07-24-koh-samet-thailand.md`.
- Wat Plai Laem: `2026-07-24-wat-plai-laem-koh-samui-dfs-cluster.md` en de bijbehorende live SERP.
- Blue Temple: `2026-07-24-blue-temple-chiang-rai-dfs-cluster.md` en `2026-07-24-blue-temple-chiang-rai.md`.

