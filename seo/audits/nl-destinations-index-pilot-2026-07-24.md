# NL bestemmingenoverzicht — mobiele acceptatie 2026-07-24

## Scope

Owner-route: `/nl/city/`

## Acceptatie

- [x] Eén H1 met semantisch correcte tekst `Thailand. Waar begin je?`.
- [x] Zelfrefererende NL-canonical en `en`, `nl`, `x-default` hreflang.
- [x] Organization-, FAQPage-, ItemList-, CollectionPage- en BreadcrumbList-schema.
- [x] Mobiele zoekpil en bottomnavigation aanwezig.
- [x] Viewport 390 × 844 met documentbreedte 375/375 en zonder horizontale overflow.
- [x] Hero, reisstijlkaarten, Thailandkaart, bronnen, nieuwsbrief en footer visueel geïnspecteerd.
- [x] Geen ontbrekende alt-teksten of lege links.
- [x] Twee ontbrekende gedeelde related-assets gevonden en vervangen door nieuwe lokale WebP-bestanden.
- [x] TypeScript, gerichte ESLint, design-, SEO- en affiliateverificatie groen.

## Herstel tijdens de gate

De related-kaarten verwezen naar niet-bestaande `thailand-excursions-hero.webp` en `transport-thailand-hero.webp`. Beide assets zijn via de ingebouwde imagegen-route als eigen redactionele beelden gemaakt, naar WebP geoptimaliseerd en aan de designverifier toegevoegd. Browsercontrole bevestigt voor beide Next Image-routes een geladen beeld van 390 × 219 zonder fout.

De H1 bevatte visueel wel een regelovergang, maar de DOM las `Thailand.Waar begin je?`. Een expliciete whitespace-node herstelt de toegankelijke en indexeerbare tekst zonder de art direction te wijzigen.
