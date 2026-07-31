# NL editorial events batch 1 — acceptatie-audit

Datum: 2026-08-01  
Scope: exact zes Nederlandse eventowners uit `nl:editorial`  
Research: `seo/research/nl/2026-08-01-editorial-events-batch-1-current-web.md`

## Uitkomst

Alle zes routes hebben een volledig herschreven Nederlandse body, een strikt gevalideerd typed profiel, een route-eigen geoptimaliseerde hero, actuele primaire bronnen en een expliciete lifecycle. Verlopen 2026-informatie wordt nergens als toekomstige agenda gepresenteerd. De twee laagwaardige, volledig verstreken eventowners zijn als archief met `noindex` ingericht; de terugkerende of nog geplande owners blijven indexeerbaar.

| Route | Woorden | Lifecycle | Indexbesluit | Redactionele reden |
|---|---:|---|---|---|
| `/nl/blog/songkran-festival-2026-guide/` | 1.202 | `ready` · `elapsed` | index | Songkran is een jaarlijks terugkerende UNESCO-erkende traditie met blijvende culturele en planningsintentie. De route maakt duidelijk dat de editie van 2026 voorbij is en laat nieuwe data uitsluitend van officiële publicaties afhangen. |
| `/nl/blog/pattaya-music-festival-2026-free-beach-concerts-march/` | 947 | `archived` · `elapsed` | noindex | De exacte vierweekendenagenda van maart 2026 is verstreken en heeft buiten die editie weinig zelfstandige zoekwaarde. De geverifieerde terugblik blijft bereikbaar, maar moet later naar een nieuwe evergreen of actuele festivalowner worden geconsolideerd wanneer die bestaat. |
| `/nl/blog/bangkok-craft-beer-scene-2026-bars-festivals-guide/` | 1.041 | `ready` · `recurring` | index | People Festival 2026 is voorbij, maar de onderliggende intentie rond actuele taprooms, Thaise brouwers en nieuwe evenementen blijft terugkeren. De body gebruikt daarom een controleerbaar keuzekader in plaats van een snel verouderende ranglijst. |
| `/nl/blog/thailand-ttm-plus-2026-pattaya-business-tourism/` | 864 | `archived` · `elapsed` | noindex | TTM+ was een verstreken B2B-vakbeurs, geen blijvende consumentenattractie. De route bewaart alleen de bronvaste marktsignalen; een latere redirect of consolidatie naar een actuele zakelijke toerisme-owner verdient de voorkeur boven jaarlijkse dunne eventpagina’s. |
| `/nl/blog/thailand-imf-world-bank-annual-meetings-bangkok-2026/` | 978 | `ready` · `scheduled` | index | De bijeenkomst staat bevestigd voor 12–18 oktober 2026. De route scheidt geregistreerde fysieke toegang van publieke online sessies en vermijdt onbevestigde prijs- of druktevoorspellingen. |
| `/nl/blog/thailand-tomorrowland-pattaya-first-asia-edition-2026/` | 999 | `ready` · `scheduled` | index | Het evenement staat bevestigd voor 11–13 december 2026 en is officieel uitverkocht. Daarom ligt de waarde bij toegangscontrole, scam-preventie, verblijfszone en vervoer, zonder alternatieve ticketverkoop te suggereren. |

## Content- en SEO-controles

- De zes frontmatter-slugs, profielslugs, canonieke routes en manifestcluster `events` zijn exact gelijk.
- Iedere body opent answer-first met de status op 1 augustus 2026.
- Primaire brondekking: 15 bronvermeldingen over de zes bodies; TAT, UNESCO, Chonburi PAO, Beer People, IMF, World Bank Group en Tomorrowland zijn als routepassende bronhouders gebruikt.
- Alle interne body- en profiellinks gebruiken Nederlandse `/nl/`-routes. De 24 unieke routeverwijzingen bestaan in `goal-completion-ledger.json`.
- Geen script-, iframe-, widget-, inline-image- of ruwe link-HTML; geen gedetecteerde mojibake; geen legacy `thailand-news-default.webp`.
- Geen vaste consumentenprijzen, oncontroleerbare persoonlijke ervaringen of toekomstige formuleringen voor verstreken evenementen.
- De bodies bevatten respectievelijk 6, 3, 4, 3, 4 en 4 natuurlijke interne links. Ze verbinden alleen met relevante bestemmings-, hotel-, vervoer-, etiquette-, food- of planningsowners.

## Assets

Frontmatter en profiel gebruiken per route hetzelfde bestaande bestand:

- `/images/redesign/editorial/songkran-festival-2026-guide-hero.webp`
- `/images/redesign/editorial/pattaya-music-festival-2026-free-beach-concerts-march-hero.webp`
- `/images/redesign/editorial/bangkok-craft-beer-scene-2026-bars-festivals-guide-hero.webp`
- `/images/redesign/editorial/thailand-ttm-plus-2026-pattaya-business-tourism-hero.webp`
- `/images/redesign/editorial/thailand-imf-world-bank-annual-meetings-bangkok-2026-hero.webp`
- `/images/redesign/editorial/thailand-tomorrowland-pattaya-first-asia-edition-2026-hero.webp`

Alle zes bestanden bestaan lokaal, zijn WebP en antwoorden op de devserver met HTTP 200.

## Affiliatebesluit

Deze batch bevat bewust geen geforceerde affiliateblokken:

- bij verstreken evenementen zou een event-CTA misleidend zijn;
- alcoholcontent krijgt geen willekeurige Amazon-cross-sell;
- TTM+ en de IMF/Wereldbank-bijeenkomst hebben geen passende consumententransactie;
- Tomorrowland is officieel uitverkocht, waardoor een ticket-CTA onjuist is.

Waar verblijf wel een natuurlijke vervolgbeslissing is, verwijst de tekst naar de bestaande Nederlandse hotelowner. Die owner beheert de actuele prijs- en beschikbaarheidsuitgang; de eventpagina noemt geen vaste hotelprijs.

## Technische verificatie

- `requireNlEditorialProfile()` valideert 6/6 profielen met Zod en controleert slug, route en manifestcluster.
- `npx tsc --noEmit --pretty false`: geslaagd zonder TypeScript-fouten.
- Mechanische Markdown-, link-, asset- en encodingcontrole: 6/6 geslaagd.
- Runtime op `http://localhost:3000`: 6/6 routes HTTP 200 en 6/6 hero-assets HTTP 200.
- De twee gearchiveerde routes renderen een robots-`noindex`; de vier actieve routes renderen geen onbedoelde `noindex`.
- Browsercontrole op een verstreken owner en een geplande owner: betekenisvolle content, interactieve navigatie en geen Next.js-erroroverlay.

## Afbakening en vervolg

Deze batch wijzigt geen centrale manifest-, registry-, ledger-, redirect- of family-completionbestanden en bevat geen commit. Pattaya Music Festival en TTM+ zijn inhoudelijk gereed als bronvast archief, maar hun uiteindelijke consolidatie of redirect hoort bij een aparte centrale lifecyclebeslissing.
