# NL editorial news/lifecycle batch 2 — acceptatie-audit

Datum: 2026-08-01
Scope: exact zeven Nederlandse editorial owners
Research: `seo/research/nl/2026-08-01-editorial-news-lifecycle-batch-2-current-web.md`

## Uitkomst

Alle zeven routes hebben een natuurlijke Nederlandse body, een strikt typed profiel, actuele primaire of first-party bronnen, een expliciete lifecycle en een route-eigen hero. Geen route is verwijderd en alle zeven blijven lokaal bereikbaar met HTTP 200.

| Route | Woorden | Cluster | Lifecycle | Robots | Besluit |
|---|---:|---|---|---|---|
| `/nl/blog/thailand-hotel-boom-2026-record-pipeline-bangkok-luxury/` | 734 | hotels | `ready` | index | Actuele Q1-pipeline en sterke beslisintentie; ‘pipeline’ wordt niet gelijkgesteld aan geopend. |
| `/nl/blog/thailand-anutin-reelected-prime-minister-march-2026/` | 649 | policy | `ready` | index | Officiële benoeming en huidige functie blijven relevant; de tekst gebruikt ‘opnieuw benoemd’ en scheidt beleid van reisregels. |
| `/nl/blog/thailand-2026-election-tourism-rail-investment/` | 603 | policy | `archived` | noindex | Voorspellende verkiezingsintentie is ingehaald. Centrale 301 naar de actuele Anutin-owner aanbevolen, maar niet in deze batch uitgevoerd. |
| `/nl/blog/thailand-three-airport-high-speed-rail-2026-update/` | 634 | transport | `ready` | index | Lopend project met actuele officiële bronowner; freshnesscontrole iedere 30–60 dagen. |
| `/nl/blog/bangkok-best-city-asia-2026-destinasian-award/` | 680 | news-trends | `ready` | index | Bevestigd awardfeit met een duurzame reisbeslissing; methodologie en grenzen zijn zichtbaar. |
| `/nl/blog/pattaya-tourism-paradox-quality-over-quantity-2026/` | 640 | news-trends | `archived` | noindex | De oude city-level paradox is niet bronvast. De route bewaart een correctie en draagt nationale strategie niet als eigen owner. |
| `/nl/blog/thailand-casino-legalization-shelved-anutin-2026/` | 626 | policy | `archived` | noindex | De formele intrekking was in juli 2025, niet maart 2026. Later consolideren naar een actuele wetgevingsowner als die bestaat. |

## Belangrijkste correcties

- Hotelpipeline bijgewerkt van Q4 naar Q1 2026: Bangkok 68 projecten/16.267 kamers; Thailand 161/41.812. Geen claim dat alle projecten al in aanbouw of boekbaar zijn.
- Anutin beschreven als opnieuw benoemd na de House-vote, niet als rechtstreeks door de bevolking herkozen.
- De verkiezingsvooruitblik bevat geen toekomstige kabinetsvorming of causale claim dat de verkiezing spoorbudgetten ‘bracht’.
- De drie-luchthavenspoorlijn staat expliciet als niet-operationeel. Officiële live planning noemt 2031; verwachte bouwstart is geen bevestigde start.
- De Bangkok-award wordt correct als lezersverkiezing behandeld.
- De Pattaya-paradox is teruggebracht tot een broncheck; nationale, provinciale, stedelijke en eilanddata worden niet vermengd.
- Het casinowetsvoorstel staat als ingetrokken, zonder fictieve casino-openingen, vergunningen of boekbare resorts.

## SEO, links en affiliate

- Frontmatter-slugs, profielslugs, routes en manifestclusters matchen 7/7.
- Alle canonicals wijzen naar de exacte Nederlandse route.
- Iedere runtimepagina bevat exact één H1.
- De bodies bevatten samen 24 natuurlijke interne `/nl/`-routeverwijzingen; alle doelen bestaan in `goal-completion-ledger.json`.
- Geen raw script-, iframe-, widget-, inline-image- of link-HTML; geen mojibake of generieke `thailand-news-default.webp`.
- Alleen de hotelpipelineowner bevat een Trip.com-affiliateblok. Dat sluit aan op echte commerciële intentie en gebruikt uitsluitend live prijs en voorwaarden. Politiek, spoor, award en gecorrigeerde archieven bevatten geen geforceerde affiliate.

## Visuele assets

Alle beelden zijn WebP, 1600×900 en route-eigen onder `/images/redesign/editorial/<slug>-hero.webp`.

- Vijf bestaande routepassende lokale beelden zijn geoptimaliseerd naar de editorial assetmap.
- Voor de verkiezingsowner is met de ingebouwde Imagegen-workflow een brede, niet-persoonsgebonden parlementaire editorial hero gemaakt.
- Voor de casino-archive is met Imagegen een sobere wetgevingsvisual rond een gepauzeerde beleidsmap gemaakt, zonder gokglamour of herkenbare politicus.

Gebruikte generatie-intentie: fotorealistische natuurlijke editorial websitehero, 16:9, rustige negatieve ruimte voor copy, geen leesbare tekst, logo, watermerk, identificeerbare politicus of misleidende persfotostijl.

## Technische verificatie

- `requireNlEditorialProfile()` met Zod: 7/7 profielen geslaagd.
- Mechanische bodycontrole: 7/7 slug/route/cluster/asset/link/encoding/veilige-Markdowncontroles geslaagd.
- `npx tsc --noEmit --pretty false`: geslaagd zonder fouten.
- Runtime `http://localhost:3000`: 7/7 routes HTTP 200 en 7/7 hero-assets HTTP 200.
- Metadata: 7/7 exact één H1 en juiste canonical; 3/3 archieven renderen `noindex`, 4/4 actuele owners niet.
- Browsercontrole van de hotelpipelineowner: betekenisvolle content, volledige interactieve structuur en geen Next.js-erroroverlay.
- `git diff --check` voor de batchscope: geslaagd; alleen line-endingwaarschuwingen waar Git later LF naar CRLF normaliseert.

## Centrale vervolgstappen buiten scope

Deze batch wijzigt geen family-completion, keywords, ledger, package, registry of redirects. Bij een latere centrale consolidatieronde:

1. redirect de verkiezingsvooruitblik naar de actuele Anutin/regeringsowner;
2. consolideer de blijvende Value over Volume-uitleg uit Pattaya naar een landelijke toerismeowner;
3. consolideer het casino-archief naar een actuele owner over Thaise gokwetgeving als die bestaat.

Tot die tijd blijven alle drie correctiepagina’s bereikbaar met HTTP 200 en `noindex`, zodat er geen onbedoelde 404 of oude misinformatie ontstaat.
