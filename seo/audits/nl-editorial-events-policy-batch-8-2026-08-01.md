# NL editorial events/policy batch 8 — acceptatieaudit

Peildatum: 2026-08-01
Scope: zeven toegewezen NL editorial routes. Centrale family completion, keyword-CSV, ledger, package scripts en registry zijn niet gewijzigd.

## Resultaat

| Route | Profiel | Lifecycle | Robots | Runtime |
|---|---|---|---|---|
| `/nl/blog/thailand-300-baht-tourist-entry-fee-2026-what-to-know/` | policy-guide | ready / unknown | index | 200 |
| `/nl/blog/thailand-tourism-next-strategy-value-over-volume-2026/` | news-update | archived | noindex,follow | 200 |
| `/nl/blog/songkran-2026-survival-guide-what-to-know/` | event-guide | archived / elapsed | noindex,follow | 200 |
| `/nl/blog/airasia-tat-fly-your-feelings-free-flights-lisa-2026/` | news-update | archived | noindex,follow | 200 |
| `/nl/blog/bun-bang-fai-rocket-festival-yasothon-2026/` | event-guide | ready / recurring | index | 200 |
| `/nl/blog/siam-songkran-music-festival-2026-bangkok-guide/` | event-guide | archived / elapsed | noindex,follow | 200 |
| `/nl/blog/world-of-coffee-bangkok-2026-specialty-coffee-event/` | event-guide | archived / elapsed | noindex,follow | 200 |

## Content- en ownerreview

- Alle zeven oude bodies zijn volledig herschreven in natuurlijk Nederlands.
- Geen Engelse restzinnen of mojibake aangetroffen in de toegewezen contentbestanden.
- 300-baht-route corrigeert de onbewezen claim dat de heffing in 2026 automatisch actief is; voorgesteld beleid, het officiële besluit uit 2024 en de huidige verificatiestatus zijn gescheiden.
- Tourism Next is expliciet geconsolideerd naar `/nl/blog/thailand-tourism-shifts-gears-fewer-visitors-better-experiences-2026/`.
- Songkran survival is expliciet geconsolideerd naar `/nl/blog/songkran-festival-2026-guide/`.
- AirAsia gebruikt de verstreken boekingsperiode niet als actuele korting; de nog mogelijke reisperiode wordt alleen aan bestaande reserveringen gekoppeld.
- Bun Bang Fai behoudt een eigen intentie als terugkerende culturele gids; data van 2026 worden niet als volgende editie gepresenteerd.
- SIAM Songkran en World of Coffee zijn eerlijke eventarchieven zonder oude ticket-, registratie- of wederverkoopclaim.
- Geen vaste consumentenprijs en geen affiliateblok toegevoegd. Dat is bewust: vijf routes zijn archief/consolidatie en de twee ready owners hebben geen natuurlijke, actuele commerciële noodzaak.

Indicatieve bodyomvang, exclusief frontmatter:

| Routekern | Woorden |
|---|---:|
| 300-baht-heffing | 437 |
| Tourism Next consolidatie | 227 |
| Songkran survival consolidatie | 289 |
| AirAsia campagnearchief | 355 |
| Bun Bang Fai | 436 |
| SIAM Songkran archief | 298 |
| World of Coffee archief | 376 |

De kortere teksten zijn doelbewuste archief- of consolidatiepagina's; ze worden niet kunstmatig verlengd om een vervallen intentie opnieuw te laten concurreren.

## Profiel- en loader-QA

Alle zeven JSON-profielen zijn via `requireNlEditorialProfile` geladen en gevalideerd:

```text
thailand-300-baht-tourist-entry-fee-2026-what-to-know ready policy-guide
thailand-tourism-next-strategy-value-over-volume-2026 archived news-update
songkran-2026-survival-guide-what-to-know archived event-guide
airasia-tat-fly-your-feelings-free-flights-lisa-2026 archived news-update
bun-bang-fai-rocket-festival-yasothon-2026 ready event-guide
siam-songkran-music-festival-2026-bangkok-guide archived event-guide
world-of-coffee-bangkok-2026-specialty-coffee-event archived event-guide
```

Daarmee zijn onder andere slug/route-pariteit, manifestcluster, self-canonical, enumwaarden, unieke block-id's, ISO-datums, HTTPS-bronnen en metadatalengtes gevalideerd.

## Runtime SEO-QA

Op `http://localhost:3000` gecontroleerd:

- 7/7 routes: HTTP 200.
- 7/7 routes: exact één `<h1>`.
- 7/7 routes: canonical naar de eigen production-URL.
- 5/5 archived/consolidated routes: `robots=noindex,follow`.
- 2/2 ready routes: geen noindex-meta.
- 2/2 interne bodylinks: HTTP 200.
- Geen runtime errorpagina aangetroffen.

## Route-eigen assets

Alle profiles en frontmatters wijzen exact naar een eigen bestand onder `public/images/redesign/editorial/`.

| Asset | Afmetingen | Bestandsgrootte |
|---|---:|---:|
| `thailand-300-baht-tourist-entry-fee-2026-what-to-know-hero.webp` | 1024×576 | 77,328 bytes |
| `thailand-tourism-next-strategy-value-over-volume-2026-hero.webp` | 1024×576 | 136,406 bytes |
| `songkran-2026-survival-guide-what-to-know-hero.webp` | 1024×576 | 159,496 bytes |
| `airasia-tat-fly-your-feelings-free-flights-lisa-2026-hero.webp` | 1376×774 | 161,926 bytes |
| `bun-bang-fai-rocket-festival-yasothon-2026-hero.webp` | 1024×576 | 165,970 bytes |
| `siam-songkran-music-festival-2026-bangkok-guide-hero.webp` | 1024×576 | 126,112 bytes |
| `world-of-coffee-bangkok-2026-specialty-coffee-event-hero.webp` | 1024×576 | 103,036 bytes |

- Alle assets zijn WebP, minimaal 1000×560 en kleiner dan 450 KB.
- Contactsheet handmatig beoordeeld: onderwerpen zijn routepassend, bruikbaar achter hero-overlays en bevatten geen ingebakken tekst of CTA.
- Altteksten beschrijven het daadwerkelijke zichtbare beeld; de AirAsia-archiefroute claimt bewust geen vliegtuig wanneer het beeld stedelijk vervoer toont.

## Technische gates

Uitgevoerd:

```text
npx.cmd tsc --noEmit --incremental false
```

Resultaat: exitcode 0, geen TypeScript-fouten.

Aanvullend:

- zeven profielen direct gevalideerd via de typed loader;
- toegewezen markdown gecontroleerd op mojibake en Engelse restclaims;
- zeven imagebestanden programmatisch gecontroleerd op padpariteit, formaat, afmetingen en bestandsgrootte;
- interne consolidatielinks tegen de lokale server gecontroleerd.

## Centrale integratie

De root-agent kan op basis van deze audit:

- alle zeven routes als expliciet beoordeeld opnemen in `nl:editorial` family completion;
- alleen de twee `ready/index` owners als geïmplementeerde keyword-owners tellen;
- de vijf `archived/noindex` routes niet als nieuwe indexeerbare keyword-owner opvoeren;
- daarna de centrale ledger-, cannibalization-, editorial- en assetgates uitvoeren.
