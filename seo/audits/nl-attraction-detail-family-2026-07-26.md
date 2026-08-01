# NL attractiedetailfamilie — afrondingsaudit 2026-07-26

## Scope en rankingbehoud

De twee zelfstandige Nederlandse attractiedetailowners blijven op hun exacte URL staan:

| Owner | Vers DFS-signaal | Backlinks | Besluit |
|---|---|---:|---|
| `/nl/city/koh-samui/attractions/wat-plai-laem/` | `koh samui wat plai laem`, positie 31, volume 390 | 0 | Exacte owner behouden |
| `/nl/city/chiang-rai/attractions/blue-temple/` | `chiang rai blue temple`, positie 76, volume 210 | 0 | Exacte owner behouden |

De rankings- en backlinkrefresh kostte samen `0.072312`. Bestaande zelfstandige SERP-, PAA- en concurrentieonderzoeken bepalen de vraag- en contentlaag; er zijn geen vragen verzonnen.

## Design en inhoud

De gedeelde premium detailtemplate heeft nu één main-landmark in plaats van twee en bevat per owner een redactionele hero, snel oordeel, betekenislaag, doelgroep/trade-offs, bezoekplan, gestippelde route, respectsectie, FAQ, gerelateerde gidsen en bronverantwoording.

Twee nieuwe brede imagegen-assets voorkomen dat de pagina’s na de hero alleen uit tekstkaarten bestaan:

- `public/images/redesign/wat-plai-laem-reflection-banner.webp` — tempelmeer en Guanyin-context, 1600×667, 244 KB;
- `public/images/redesign/blue-temple-rain-banner.webp` — blauw-gouden architectuur na regen, 1600×667, 278 KB.

De banners zijn lokaal naar WebP geoptimaliseerd, hebben beschrijvende alt-tekst en een zichtbare AI-sfeerbeeldnotitie. `dateModified` staat op `2026-07-26`.

## Links, assets en affiliates

Wat Plai Laem linkt natuurlijk naar Koh Samui, het attractieoverzicht en de hotelowner. Blue Temple linkt naar Chiang Rai, het attractieoverzicht en Noord-Thailand. Alle gerenderde interne links zijn live gecontroleerd. Daarbij zijn drie bestaande kapotte cardbeelden vervangen door aanwezige projectassets.

Alle drie Klook-uitgangen per pagina lopen via het ingestelde `klook.tpo.lv`-redirectdomein, dragen `nofollow noopener noreferrer sponsored` en hebben zichtbare affiliatevermelding. Amazon OneLink is niet geforceerd op tempelbezoekintentie; relevante productuitgangen horen in paklijst- en gearcontent.

## Verificatie

`npm run seo:verify:nl-attraction-details` is groen voor 2/2 owners en controleert ContentOps, DFS/PAA, rankingbehoud, metadata, één H1/main, canonical/hreflang, schema, Klook-attributen, bronnen, beschrijvende clusterlinks, alle interne statussen en de featurebeelden.

Brede regressiegates zijn groen: TypeScript, gerichte ESLint zonder fouten, 106/106 NL runtime-owners, 0 SEO-collisions, affiliatecontrole en design-systemcontrole. ContentOps staat op 97 `implemented` en 9 `implementing`.

Browser-QA is uitgevoerd op Wat Plai Laem bij 1280×720 en Blue Temple met echte 390×844 device-emulatie. Hero’s, banners, sticky zoekbalk, bottomnavigation en cookiekeuze werken zonder document-overflow, kapotte beelden of consolefouten. De vier detailkaarten hebben bewust intern geclipte decoratieve cirkels; die vergroten de documentbreedte niet.

De Engelse pagina’s blijven voor hun eigen onderzoeksfase inhoudelijk ongemoeid.
