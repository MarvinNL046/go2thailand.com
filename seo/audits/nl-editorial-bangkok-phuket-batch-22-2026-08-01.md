# NL editorial audit — Bangkok & Phuket batch 22

Datum: 2026-08-01
Scope: exact 7 routes. Trat/Koh Kood uitgesloten.
Centrale completion-, ledger-, keyword-, sitemap- en configbestanden zijn geen onderdeel van deze batch.

## Lifecyclebesluiten

| Route | Status | Index | Reden / vervolg |
|---|---|---:|---|
| `/nl/blog/bangkok-art-biennale-2026-angels-mara-guide/` | Ready, scheduled | ja | Officieel bevestigd evenement; heraudit na 2027-02-28 |
| `/nl/blog/bangkok-best-cocktail-bars-march-2026-nightlife/` | Archived | nee | Tijdelijke maartselectie; brede actuele owner is `/nl/city/bangkok/nightlife/` |
| `/nl/blog/bangkok-floating-markets-guide-damnoen-amphawa-2026/` | Ready, evergreen | ja | Zelfstandige marktvergelijking met blijvende intentie |
| `/nl/blog/bangkok-new-rooftop-bars-2026-sato-san-sanctuary-iris/` | Ready, 2026 | ja | Exact venue-trio actueel; heraudit na 2026 |
| `/nl/blog/bangkok-songkran-2026-khaosan-road-safety-plan/` | Archived, elapsed | nee | Lokale editie en regels verlopen |
| `/nl/blog/bangkok-yellow-pink-line-monorail-tourist-guide-2026/` | Ready, evergreen | ja | Unieke lijn- en overstapintentie; foutieve kaartclaim verwijderd |
| `/nl/blog/bangla-road-phuket-digital-makeover-nightlife-2026/` | Superseded | nee | Kernclaim niet onderbouwd; exacte owner bestaat |

## Aanbevolen redirects

Niet geïmplementeerd omdat `next.config.js` buiten scope staat.

1. **301 aanbevolen:** `/nl/blog/bangla-road-phuket-digital-makeover-nightlife-2026/` → `/nl/phuket/patong/nightlife/`.
2. **Geen directe redirect nu:** cocktailbars maart 2026. Laat als noindex-archief met CTA naar `/nl/city/bangkok/nightlife/`; een redirect kan pas na inbound-link- en intentiecheck.
3. **Geen directe redirect nu:** Khao San Songkran 2026. Laat als noindex-archief; de algemene festivalroute bevat eveneens een jaartal en is geen vanzelfsprekende permanente bestemming.

## Implementatie-audit

- 7 Markdown-bodies volledig herschreven in Nederlands.
- 7 typed editorial profiles met route, cluster, lifecycle, SEO, hero, layout en gevalideerde blocks.
- 7 unieke route-eigen imagegen heroes als WebP, 1600×1067.
- 4 indexeerbare canonicals zijn self-referencing via profile.
- 3 archief/superseded profiles zijn self-referencing plus `noindex: true` totdat redirects bewust centraal worden geïmplementeerd.
- Geen affiliateblocks toegevoegd; CTA’s volgen alleen natuurlijke keuze- of actualiteitslogica.
- Veiligheids- en alcoholclaims beperkt tot officiële kaders; geen medisch advies of universele veiligheidsgarantie.

## Risicoreparaties

- BAB: gratis-toegangsgarantie en definitieve venueclaim verwijderd.
- Cocktailbars: vaste drankprijzen, generieke sluitingstijden en “beste”-actualiteit verwijderd.
- Floating markets: vaste bootprijzen, authentiek-superlatieven, universele opening en gegarandeerde vuurvliegjes verwijderd.
- Rooftops: vaste tijden en dresscodegaranties vervangen door live checks.
- Songkran: editiegebonden regels, verboden en impliciete juridische actualiteit gearchiveerd.
- Monorail: Mangmoom-universaliteitsclaim ingetrokken; service per operator.
- Bangla: AR-, LED-, theme-night-, crowdshare- en veiliger/schonerclaims ingetrokken.

## Keywordhandoff

Aanbevolen primaries voor de vier indexeerbare routes:

- `Bangkok Art Biennale 2026`
- `drijvende markt Bangkok`
- `nieuwe rooftopbars Bangkok 2026`
- `MRT Yellow Line Pink Line Bangkok`

Geen centrale keywordbestanden gewijzigd. Publicatielog pas bij daadwerkelijke publicatie en na finale ownercheck bijwerken.

## Open operationele acties

- Centrale eigenaar kan de aanbevolen Bangla 301 later in redirectconfig verwerken.
- BAB opnieuw controleren zodra de definitieve routekaart en toegang per locatie gepubliceerd zijn.
- Rooftoptrio eind 2026 herbeoordelen op lifecycle.
- De algemene Songkran-owner vóór de volgende editie voorzien van het nieuwe jaar en actuele lokale regels.
