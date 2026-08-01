# Go2Thailand masterplan — redesign + SEO

Status: actief via de Codex `/goal`  
Volgorde: eerst Nederlands, daarna Engels  
Werkbranch: `redesign`

## Einddoel

Go2Thailand wordt één consistent, snel en betrouwbaar Thailand-platform met een
premium editorial design, herbruikbare paginatemplates en locale-specifieke SEO.
Nederlands en Engels delen code, feiten en visuele assets waar dat logisch is,
maar krijgen ieder hun eigen keywordmap, SERP-analyse, PAA-vragen en zoekintentie.

## Huidige omvang

- 164 publieke page-bestanden
- 60 dynamische route-templates
- 104 statische routes
- 240 bestanden met clusterdata
- 1.923 URL's in de Engelse sitemap
- 1.842 URL's in de Nederlandse sitemap
- 3.765 sitemap-URL's totaal

Deze aantallen zijn een inventaris, geen publicatiedoel. Oude, dunne,
overlappende of niet-unieke URL's worden geconsolideerd, geredirect of uit de
index gehouden voordat er design- en schrijfwerk aan wordt besteed.

## Vaste autonome werklus

Elke batch doorloopt zonder handmatige tussenstappen dezelfde cyclus:

1. Routes, bestaande copy, data, prestaties en interne links inventariseren.
2. Eigenaar van de zoekintentie bepalen en cannibalisatie uitsluiten.
3. DataForSEO gebruiken voor volume, KD, intent, SERP, concurrenten, echte PAA,
   gerelateerde zoekopdrachten en waar beschikbaar huidige posities.
4. Primaire/officiële bronnen verzamelen en feiten controleren.
5. Een locale-specifieke contentbrief en informatiearchitectuur opslaan.
6. De pagina via een gedeeld template en typed data bouwen of migreren.
7. Metadata, canonical, hreflang, schema, interne links en disclosures toevoegen.
8. Typecheck, SEO-checks, affiliate-checks en browser-QA uitvoeren.
9. Desktop en mobiel controleren op overflow, contrast, beelden en interacties.
10. Status en bewijs bijwerken en automatisch met de volgende pagina doorgaan.

Alleen stoppen voor een echte blokkade: ontbrekende toegang, een onomkeerbare
productbeslissing of een keuze die de businessstrategie materieel verandert.

## Paginatemplates

We ontwerpen pagina-typen, niet duizenden losse pagina's.

| Template | Belangrijkste routes | Kernfunctie |
|---|---|---|
| 1. Homepage | `/`, `/nl/` | merk, inspiratie en start van reisfunnel |
| 2. Bestemmingen-hub | `/city/`, `/islands/`, `/region/`, `/province/` | ontdekken en filteren |
| 3. Bestemming-detail | `/city/[slug]/`, `/islands/[slug]/`, `/province/[slug]/` | pillar en lokale navigatie |
| 4. Bezienswaardigheden & activiteiten | attractions, things-to-do, tours en experience-pages | informatieve inspiratie + Klook |
| 5. Weer & beste reistijd | weather, maandpagina's en best-time | klimaat, planning en seizoensintentie |
| 6. Verblijven | best-hotels, where-to-stay, areas en hotel-detail | gebiedskeuze + Trip.com |
| 7. Reisroute & vervoer | itineraries, transport, flights en car rental | routebeslissingen en boeking |
| 8. Praktische gids | visa, veiligheid, budget, eSIM, verzekering en gear | voorbereiding en vertrouwen |
| 9. Editorial | blog, food, drinks, temples, nightlife en news | long-form clustercontent |
| 10. Commercieel/best-of | compare, top-10 en specifieke commerciële landingpages | vergelijken en converteren |

Juridische, contact-, policy- en sitemap-pagina's gebruiken een gedeelde rustige
content-shell en vormen geen afzonderlijk zwaar template.

## Fases

### Fase 0 — fundament en indexatie

- Route-eigenaren, duplicaten, redirects en canonical-conflicten in kaart brengen.
- Per locale een URL-status vastleggen: keep, improve, merge, redirect of noindex.
- Meetbare prioriteitsscore maken uit opportunity, huidige positie, businesswaarde,
  contentrisico en templatehefboom.
- Design tokens, shell, navigatie, footer, buttons, cards en disclosures opschonen.

### Fase 1 — Nederlandse Krabi-pilot afronden

- `/nl/city/krabi/`
- `/nl/city/krabi/attractions/`
- `/nl/city/krabi/weather/`
- `/nl/best-hotels/krabi/`

Deze vier pagina's bewijzen de pillar/subpillar-architectuur, onderlinge links,
schema's, visuele taal en affiliatebalans. De bestaande Nederlandse teksten
krijgen een volledige menselijke eindredactie op slechte vertalingen en
onnatuurlijke zinsbouw.

### Fase 2 — designsysteem bevriezen

- Tokens voor kleur, type, spacing, radius, schaduw en dividers.
- Herbruikbare hero-, trust-, card-, route-, FAQ-, source- en affiliateblokken.
- Gedeelde schema- en SEO-primitives.
- Typed data-contracten voor alle tien templates.
- Responsieve referenties voor desktop, tablet en mobiel.

Na deze fase worden uitzonderingen alleen toegevoegd als de zoekintentie of
contentvorm dat aantoonbaar nodig maakt.

### Fase 3 — Nederlandse bestemmingsclusters

- DFS-prioriteiten bepalen met quick wins en commerciële relevantie.
- Per bestemming pillar + relevante subpillars bouwen.
- Alleen unieke maand-, attractie- of gebiedspagina's publiceren als de SERP en
  beschikbare content voldoende onderscheid rechtvaardigen.
- Interne links opbouwen vanuit hub → pillar → subpillar → detail.

### Fase 4 — Nederlandse commerciële en praktische clusters

- Verblijven, activiteiten, vervoer, routes en reisproducten.
- Klook, Trip.com en Amazon via centrale, controleerbare affiliatepatronen.
- Disclosures vóór de eerste commerciële CTA.
- Geen bevroren prijzen, reviewcounts of ratings zonder toegestane live bron/API.

### Fase 5 — Nederlandse editorial en sitebrede harmonisatie

- Hubs, blog-, food-, island-, region- en praktische content migreren.
- Oude one-off designs vervangen door gedeelde templates.
- Overlappende routes consolideren en interne links herstellen.

### Fase 6 — Nederlandse publicatiegate

NL is pas afgerond als iedere te indexeren URL voldoet aan de Definition of Done
en sitemap, canonical, hreflang, schema en interne links samen kloppen.

### Fase 7 — zelfstandige Engelse research

- UK is de huidige standaardmarkt, tenzij projectconfiguratie later wijzigt.
- Geen keywords of PAA uit het Nederlands vertalen.
- Engelse SERP's, concurrenten en contentformats opnieuw onderzoeken.
- De Nederlandse templatecode hergebruiken, niet automatisch de Nederlandse
  contentstructuur als de Engelse zoekintentie daarvan afwijkt.

### Fase 8 — Engelse uitrol en eindcontrole

- Dezelfde clustergewijze uitvoering en kwaliteitsgates als NL.
- Reciprocal hreflang alleen wanneer beide equivalente pagina's echt bestaan.
- Totale audit over beide talen, affiliates, performance en releaseconfiguratie.

## Definition of Done per indexeerbare pagina

### SEO en content

- Één unieke primaire zoekintentie en geen harde cannibalisatie.
- Live, locale-specifieke DFS/SERP/PAA-evidence opgeslagen.
- Heldere title, meta description, één H1 en logische headingstructuur.
- Direct antwoord op hoofdvraag en echte informatie-winst tegenover concurrenten.
- Feiten ondersteund door geschikte primaire/officiële bronnen.
- Natuurlijke interne links naar parent, siblings en logische next steps.
- Zelfrefererende canonical en alleen geldige reciprocal hreflang.
- Passend schema waarvan zichtbare copy en JSON-LD exact overeenkomen.

### Design en techniek

- Gebouwd op een gedeeld template, tenzij een uitzondering gedocumenteerd is.
- Desktop, tablet en mobiel gecontroleerd.
- Geen horizontale overflow, kapotte afbeeldingen of onleesbare toestanden.
- Toetsenbordbediening, focus, semantiek, contrast en alt-teksten op orde.
- Geen framework-overlay, hydration error of relevante consolefout.
- Acceptabele Core Web Vitals-risico's: stabiele images, beperkte client-JS en
  prioriteit voor echte above-the-fold assets.

### Affiliates en vertrouwen

- Affiliateblokken zijn contextueel behulpzaam en niet bannerachtig.
- Disclosure staat vóór of direct bij de eerste affiliate-CTA.
- Externe commerciële links gebruiken `sponsored nofollow noopener`.
- Amazon-links lopen via de centrale `/go/`-registry en zijn OneLink-compatible.
- Foodowners mogen één compact Amazon-cross-sellblok tonen wanneer kookgerei,
  een kookboek of ingrediënt de zichtbare kooktaak aantoonbaar ondersteunt.
  Productkeuze volgt het gerecht; generieke carrousels en irrelevante reisgear
  horen niet op foodpagina's. De CTA verwijst altijd naar het actuele aanbod.
- Geen verzonnen ervaring, tests, prijzen, ratings of urgentie.

### Verificatie

- Typecheck slaagt.
- SEO-cannibalisatiecheck slaagt.
- Affiliatecheck slaagt waar van toepassing.
- Route geeft de verwachte HTTP-status, canonical en schema.
- Visuele browsercontrole slaagt op representatieve data en beide viewports.

## Voortgangsadministratie

- `seo/keywords-nl.csv` en `seo/keywords-en.csv`: pagina- en researchstatus.
- `seo/research/<locale>/`: live SERP/PAA-bewijs en contentbriefs.
- `seo/used-keywords-<locale>.md`: alleen na echte publicatie.
- Route-inventaris: keep/improve/merge/redirect/noindex-besluit.
- Dit document: mastervolgorde en Definition of Done.

## Eerstvolgende uitvoerbare batch

1. Route-inventaris uitbreiden met indexatiebesluiten en template-eigenaarschap.
2. NL Krabi `waar verblijven` met DFS afronden en bouwen.
3. De drie reeds gebouwde Krabi-pagina's redactioneel en technisch finaliseren.
4. Het Krabi-cluster als templateacceptatietest gebruiken.
5. Op basis van DFS quick wins de volgende Nederlandse bestemming kiezen.
