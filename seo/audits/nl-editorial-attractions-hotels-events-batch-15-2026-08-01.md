# Audit — NL editorial attractions, hotels & events batch 15

Datum: 2026-08-01
Routes: 7
Onderzoek: `seo/research/nl/2026-08-01-editorial-attractions-hotels-events-batch-15-current-web.md`

## Resultaat

- Vijf routes zijn `ready/index`: Erawan, Fairmont, Kahavadi, KAIA en Koh Larn.
- Twee verstreken events zijn `archived/noindex`: HYROX Bangkok en Khao Yai Food & Wine Festival.
- Alle zeven routes hebben een typed profiel, route-eigen Nederlandse longform body, self-canonical en exact één H1 in de runtime.
- Alle zeven routes hebben een uniek lokaal hero-beeld van 1600 × 900, WebP en minder dan 450 KB.
- Alle vaste hotel-, tour-, ferry-, park- en eventprijzen zijn verwijderd. Hotel-CTA's hanteren uitsluitend live totaalprijzen.
- Alle nieuwe interne links in deze batch geven lokaal HTTP 200.
- Er is geen redirect nodig: beide archieven blijven transparante historische owners en hebben `noindex,follow`.

## Routebesluiten

| Route | Status | Robots | Primaire keyword-owner | Kerncontrole |
| --- | --- | --- | --- | --- |
| Erawan Falls | ready | index | `Erawan watervallen bezoeken` | DNP-sluiting/heropening verwerkt; geen vaste entree, bus of open-garantie. |
| Fairmont Bangkok | ready | index | `Fairmont Bangkok Sukhumvit` | Oude juni-opening verwijderd; officiële statusverschillen zichtbaar gemaakt. |
| HYROX Bangkok | archived | noindex | `HYROX Bangkok 2026` | 20–22 maart verstreken; geen volgende editie geïmpliceerd. |
| Kahavadi Chiang Rai | ready | index | `Kahavadi Chiang Rai` | Hilton-opening 1 juli bevestigd; alleen live prijs en exacte kamer. |
| KAIA Koh Phangan | ready | index | `KAIA Koh Phangan` | Nog gepland voor eind 2026; geen affiliate of boekbaarheidsclaim. |
| Khao Yai Food & Wine | archived | noindex | `Khao Yai Food Wine Festival 2026` | 16–18 januari verstreken; festival los van wijngaarddag. |
| Koh Larn | ready | index | `Koh Larn vanuit Pattaya` | Geen statische ferryprijs/tijd; aankomstpier en terugmarge leidend. |

## UX, schema en toegankelijkheid

- De typed layouts renderen route-eigen hero, freshness/status, anker-navigatie, antwoordblok, modulaire kaarten/checklists, FAQ en bronsectie.
- De hotelroutes gebruiken `hotel-guide` met `pricePolicy: live-price-only`; de twee archieven gebruiken `event-guide` met `temporalStatus: elapsed` en echte start-/einddatum.
- FAQ- en BlogPosting-schema worden uit het typed document opgebouwd. `dateModified` is 2026-08-01 en `inLanguage` is `nl-NL`.
- Hero-altteksten beschrijven de zichtbare scène zonder keywordstapeling of niet-zichtbare merkclaim.

## Affiliatecontrole

- Fairmont en Kahavadi: Trip.com, ondergeschikt aan de kamer- en statuscheck.
- Erawan en Koh Larn: Klook, als vergelijking met de zelfstandige route.
- KAIA en beide eventarchieven: geen affiliateblok.
- De gedeelde typed affiliatecomponent opent extern en gebruikt `rel="noopener noreferrer nofollow sponsored"`.
- Elke commerciële beschrijving meldt dat Go2Thailand mogelijk commissie ontvangt zonder hogere gebruikersprijs.

## Redirectadvies

Geen redirect. HYROX Bangkok 2026 en het Khao Yai Food & Wine Festival 2026 hebben een eigen historische event-intentie en bronset. Zij blijven bereikbaar met self-canonical en `noindex,follow`, maar worden niet als actuele eventpagina aangeboden.

## Verificatiebewijs

- Exacte profielen geladen via `requireNlEditorialProfile` zonder schema- of manifestfout.
- Runtime: alle zeven routes HTTP 200, exact één H1, correcte self-canonical; de twee archieven tonen `noindex,follow`, de vijf ready-routes geen robots-noindex.
- Interne-linkcrawl: alle batchlinks lokaal HTTP 200 na vervanging van twee nog niet renderende specifieke attractieslugs door bestaande hubs/owners.
- Assets: alle zeven 1600 × 900, 98–259 KB, lokale unieke WebP.
- Typecheck, design-, affiliate- en diff-check worden na de contentcontrole als laatste batchgates uitgevoerd.

## Imagegen-promptset

De ingebouwde imagegen-tool is gebruikt met zeven afzonderlijke prompts: Erawan-kalksteenpoelen, een niet-gebrande Sukhumvit-hotelentree, een indoor hybrid fitnessrace, een Lanna-rivierretreat, een tented suite boven Koh Phangan, een Khao Yai-wijngaardtafel en een ferrybenadering van Koh Larn. Alle prompts vereisten 16:9 editorial travel photography, linkse copyruimte, natuurlijke diepe groentinten en geen tekst, logo of watermark.
