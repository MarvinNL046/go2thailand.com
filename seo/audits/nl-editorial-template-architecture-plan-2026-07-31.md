# NL editorial 253 — schaalbaar template-architectuurplan

Datum inspectie: 1 augustus 2026
Planbestand: opgesteld zonder broncodewijzigingen
Scopebron: `seo/audits/goal-completion-ledger.json`, familie `nl:editorial`

## Uitkomst

De 253 routes moeten niet worden omgebouwd tot 253 losse React-pagina's. De schaalbare oplossing is:

1. één dunne route-dispatcher;
2. één locale-specifieke NL editorial templatefamilie;
3. zeven vaste, intentionele layoutvarianten;
4. één klein, geïsoleerd premium-profiel per artikel;
5. de bestaande Markdown als unieke lange inhoudsbron;
6. een verifier die volledige dekking, uniekheid, freshness, SEO, affiliates en runtimegedrag bewijst.

Dit voorkomt copy-pastecomponenten, maar maakt iedere pagina wel inhoudelijk en visueel anders op basis van eigen intent, hero, beslismodules, ownergrens, bronnen, links en eventuele affiliatefit.

## 1. Authoritative baseline

De huidige goal-ledger is leidend en bevat exact:

- 253 open routes in `nl:editorial`;
- 1 blogindex: `/nl/blog/`;
- 252 blogartikelen;
- 0 geaccepteerde routes in deze familie;
- 252 routes met een gedeelde premium designsignatuur;
- 1 route zonder premium signatuur: `/nl/blog/`;
- 0 bewezen exact owners binnen deze familie.

De filesystemtelling is bewust niet de scopetelling. `content/blog/nl/` bevat 272 Markdownbestanden en `getAllPosts('nl')` levert op het inspectiemoment 254 actieve posts na consolidaties. Sommige blogroutes zijn echter al aan andere ownerfamilies toegewezen of worden door gespecialiseerde componenten gerenderd. Alleen de 253 paden uit de goal-ledger mogen de afsluitende editorial-verifier sturen.

### Inhoudsprofiel van de 252 artikelen

| Archetypegroep | Routes | Bestaande categorieën |
|---|---:|---|
| Tijdgevoelige updates | 87 | news, nieuws, tourism-news, events, festivals, seasonal, seizoen |
| Food & drink | 38 | food, food-drink, eten-drinken |
| Bestemming & route | 37 | city-guide, stadsgids, destinations, islands, eilanden, travel, day-trips, things-to-do |
| Ervaring & attractie | 31 | activities, activiteiten, attractions, adventure, nature, temples, entertainment, nightlife, shopping |
| Verblijf | 13 | hotels, accommodation |
| Praktisch & planning | 32 | transport, practical, practical-info, travel-tips, travel-planning, planning, budget, visa, weer |
| Cultuur & verantwoord reizen | 9 | culture, responsible travel |
| Nog zonder categorie | 5 | ontbrekende frontmattercategorie |
| **Totaal artikelen** | **252** | |

Kwaliteitssignalen uit de actieve ledgerselectie:

- 246/252 hebben een `sources`-veld;
- 246/252 hebben een description;
- 247/252 hebben een category;
- 252/252 hebben een image en `lastUpdated`;
- 164/252 Markdownbronnen bevatten minder dan 800 woorden;
- 22/252 bevatten minder dan 500 woorden;
- mediaan: circa 669 woorden.

De woordtelling is een risicosignaal, geen automatische afkeur. Een gespecialiseerd React-ownercomponent kan rijk renderen terwijl de achterliggende legacy-Markdown kort is. De verifier moet daarom de uiteindelijke route-HTML en gekozen render owner controleren, niet uitsluitend de `.md`-lengte.

## 2. Huidige architectuur en belangrijkste problemen

### Route en dispatch

`pages/blog/[slug].tsx` is momenteel een bestand van circa 866 regels dat tegelijk verantwoordelijk is voor:

- tientallen NL/EN slugchecks voor gespecialiseerde componenten;
- generieke SEO en schema;
- hero, article layout, sidebars en affiliateblokken;
- third-party widgethydratie;
- runtime rendering;
- `getStaticProps`, redirects, locale fallback en enkele metadata-overrides.

Dit is een conflict-hotspot. Iedere nieuwe premium owner vergroot de imports en `if (post.slug === ...)`-keten. De gespecialiseerde ownercomponenten zijn waardevol, maar hun dispatch hoort niet verweven te zijn met de generieke artikelmarkup.

### Data loading

`lib/blog.js`:

- leest `content/blog/<locale>/<slug>.md` met `gray-matter`;
- converteert Markdown met `remark`, `remark-gfm` en `remark-html`;
- demoteert content-H1 naar H2;
- normaliseert historische interne links;
- voegt affiliaterelaties toe aan herkende externe links;
- extraheert FAQ uit frontmatter of Markdown;
- beheert locale-specifieke consolidaties;
- maakt index-, categorie-, tag-, related- en adjacent-data.

Sterk punt: de bestaande Markdown kan de unieke lange artikelinhoud blijven dragen. Zwakke punten:

- `sanitize: false` laat historische inline-HTML en widgetmarkup door;
- de NL-route kan bij ontbrekende NL-content terugvallen op Engelse content;
- legacy interne en affiliate-HTML worden pas achteraf met regex genormaliseerd;
- schema-URL's, share-URL's en labels in de generieke pagina zijn niet overal locale-afgeleid;
- frontmattercategory is tweetalig en niet genormaliseerd;
- bronvormen bevatten alleen `name` en `url`, zonder claimtype, verificatiedatum of primaire/secundaire status.

### Generieke blogpagina

De gedeelde pagina bevat nuttige blokken zoals `BlogTableOfContents`, `BuyerIntentNextStep`, `TripFunnelBlock`, `Sources`, `RelatedPosts` en security/affiliateblokken. Toch zijn er structurele risico's:

- de visuele stijl is grotendeels de oudere witte-card/bloglayout;
- de affiliate-sidebars kunnen veel niet-contextuele producten tegelijk tonen;
- `blog-funnel-intent.ts` classificeert heuristisch en bouwt grotendeels Engelstalige CTA-labels;
- third-party widget-URLs gebruiken vaste Engelse localeparameters;
- de index en Article/Breadcrumb/share-URL's zijn niet overal expliciet `/nl/`-correct;
- één algemene proseflow bewijst geen unieke ownerintentie of inhoudsgrens;
- oudere Markdown bevat aantoonbaar onbewezen persoonlijke ervaring, vaste prijzen, garanties, superlatieven en tijdgevoelige 2026-claims.

Een nieuwe CSS-shell rond ongewijzigde legacycopy zou daarom geen production-ready afronding zijn.

### Bestaande premium voorbeelden

Te behouden patronen:

- `components/blog/ClimateUpdateGuideTemplate.tsx` met typed data uit `data/climate/nl/`;
- `components/editorial/NlTopicalManualGuide.tsx` met typed data uit `data/editorial/nl-topical-manual.ts`;
- gespecialiseerde food-, market-, attraction-, hotel-, wellness- en activityowners die nu via de slugketen dispatchen;
- designprimitives: `EditorialHero`, `PageSectionNav`, `SectionHeading`, `FaqSplitSection`, `RelatedGuidesSection`, `SourceMethodSection`, `AffiliateDisclosure` en `FeedbackForm`.

De nieuwe architectuur moet deze componenten niet dupliceren, maar ze via een expliciete ownerregistry voorrang geven.

## 3. Doelarchitectuur

### 3.1 Dunne router, renderers met eigen hooks

`pages/blog/[slug].tsx` wordt uiteindelijk een dunne server/data-dispatcher. `getStaticProps` bepaalt een serialiseerbare `renderMode`:

```text
consolidation   -> permanente redirect
special-owner  -> bestaande gespecialiseerde owner
nl-editorial   -> nieuwe typed NL editorial template
legacy-en      -> bestaande Engelse blogrenderer
not-found      -> 404
```

De pagecomponent rendert daarna één childrenderer. Hooks voor widgethydratie, GSAP of affiliate-sub-ID leven in die childrenderer, niet vóór tientallen conditionele returns. Zo blijft hookvolgorde veilig en laadt een gespecialiseerde owner geen ongebruikte legacylogica.

Belangrijke localeregel: een `/nl/blog/.../` route mag nooit Engelse bodycopy als fallback renderen. Als een NL-owner ontbreekt, moet de route expliciet redirecten, 404'en of de NL legacybron gebruiken. De huidige EN-fallback is voor de NL-family verboden.

### 3.2 Markdown blijft de unieke prosebron

De 252 bestaande bestanden onder `content/blog/nl/` blijven eigenaar van:

- artikelproza;
- tussenkoppen;
- tabellen en lijsten;
- bestaande redactionele bronlinks;
- datum en auteur;
- eventueel expliciet onderbouwde FAQ.

Ze worden inhoudelijk herschreven wanneer de route-audit dat vereist. De premium template mag geen generieke filler toevoegen om een woordminimum te halen.

### 3.3 Eén geïsoleerd premium-profiel per route

Voorgestelde map:

`data/editorial/blog/nl/<slug>.json`

Elk bestand bevat alleen de unieke overlay die niet uit Markdown kan worden afgeleid:

```json
{
  "version": 1,
  "slug": "...",
  "layout": "update | food | destination | experience | stay | practical | culture",
  "intent": {
    "primary": "...",
    "secondary": ["..."],
    "answerFirst": "...",
    "ownerBoundary": "...",
    "indexingDecision": "index | redirect | noindex"
  },
  "hero": {
    "eyebrow": "...",
    "title": "...",
    "accent": "...",
    "description": "...",
    "image": "/images/redesign/editorial/...-hero.webp",
    "imageAlt": "...",
    "imageCaption": "..."
  },
  "decision": {
    "title": "...",
    "description": "...",
    "cards": []
  },
  "checks": [],
  "freshness": {
    "verifiedAt": "YYYY-MM-DD",
    "stableClaims": [],
    "volatileClaims": [],
    "expiryAction": "..."
  },
  "faq": [],
  "related": [],
  "affiliates": [],
  "researchEvidence": []
}
```

Waarom één JSON per route en geen groot TypeScriptobject:

- agents kunnen disjuncte routes bewerken zonder mergeconflict;
- een routeprofiel is reviewbaar zonder honderden omliggende records;
- de verifier kan ontbrekende, dubbele en orphanprofielen direct vinden;
- JSON blijft serialiseerbaar en kan door een server-only loader worden gevalideerd;
- title, description, body, date en auteur hoeven niet te worden gedupliceerd.

Een gegenereerde registry mag bestaan als buildartifact, maar het per-route JSON is de source of truth.

### 3.4 Zeven layoutvarianten, geen 252 componenten

Voorgestelde layouts:

1. `update` — datumstatus, wat veranderde, reizigersimpact, actie nu, wat nog onzeker is;
2. `food` — gerecht/markt/gebied, smaak- of bestelkeuze, voedselveiligheid/allergenen, routefit;
3. `destination` — reisfit, zones, ritme, logistiek, trade-offs;
4. `experience` — keuzeprofielen, operatorcheck, veiligheids-/ethische grens, live voorwaarden;
5. `stay` — locatie, doelgroepfit, kamertype/voorzieningcheck, boekingsstatus, alternatieven;
6. `practical` — antwoord eerst, beslisboom, stappen, documenten/voorwaarden, failure path;
7. `culture` — betekenis, context, respectvolle deelname, wat niet te simplificeren, bronnen.

Deze layouts zijn deterministisch. Er wordt niet willekeurig van kleuren of modulevolgorde gewisseld om kunstmatige uniekheid te simuleren. Het verschil komt uit zoekintentie en contentvorm.

Iedere layout gebruikt dezelfde Go2Thailand-primitives, maar kiest een eigen compositie van:

- `EditorialHero`;
- answer-first status/trustbar;
- decision cards;
- route/tijdlijn of checkpad;
- originele Markdownbody in `NlEditorialProse`;
- freshness-/grensbanner;
- contextuele affiliateblok;
- FAQ, related guides en source method.

### 3.5 Typed modulegrens

De overlay kan een begrensde discriminated union gebruiken voor aanvullende modules:

- `decisionCards`;
- `timeline`;
- `comparison`;
- `checklist`;
- `status`;
- `boundary`;
- `routeSteps`;
- `packing`;
- `quote` alleen met expliciete bron;
- `affiliate` alleen via centrale partner/productregistry.

Vrije HTML, losse Tailwindstrings en willekeurige Reactnodes horen niet in JSON. Dat bewaakt accessibility, design en affiliateattributie centraal.

## 4. Exacte voorgestelde bestanden

### Nieuwe shared code — alleen foundation/integrator

- `data/editorial/blog/types.ts`
  Types voor profielen, layouts, modules, sources, freshness, links en affiliates.
- `lib/nl-editorial-loader.ts`
  Server-only loader: leest profiel + Markdownpost, valideert slug/page URL/layout en levert één page model.
- `lib/blog-owner-registry.ts`
  Centrale prioriteit voor bestaande gespecialiseerde owners; geen contentdata.
- `components/editorial/blog/NlEditorialArticle.tsx`
  Hoofdcompositie en schema.
- `components/editorial/blog/NlEditorialDirectory.tsx`
  Premium `/nl/blog/` index; Engelse index blijft ongewijzigd.
- `components/editorial/blog/NlEditorialProse.tsx`
  Veilige, premium styling voor unieke Markdownbody, heading anchors, tables, quotes en lijsten.
- `components/editorial/blog/NlEditorialModuleRenderer.tsx`
  Enige renderer voor de typed modules.
- `components/editorial/blog/NlEditorialFreshness.tsx`
  Status, verified date, veranderlijke details en expiry action.
- `components/editorial/blog/NlEditorialAffiliateBlock.tsx`
  Contextuele, Nederlandstalige CTA's met centrale URL-resolutie en disclosure.
- `components/editorial/blog/layouts/UpdateLayout.tsx`
- `components/editorial/blog/layouts/FoodLayout.tsx`
- `components/editorial/blog/layouts/DestinationLayout.tsx`
- `components/editorial/blog/layouts/ExperienceLayout.tsx`
- `components/editorial/blog/layouts/StayLayout.tsx`
- `components/editorial/blog/layouts/PracticalLayout.tsx`
- `components/editorial/blog/layouts/CultureLayout.tsx`

### Bestaande shared code — één integrator, kleine edits

- `pages/blog/[slug].tsx` — reduceren tot dispatcher; EN-behavior behouden.
- `pages/blog/index.tsx` — alleen `locale === 'nl'` naar `NlEditorialDirectory`; EN-layout behouden.
- `lib/blog.js` — bestaande loader/consolidations behouden; alleen locale-fallback, veilig HTML-pad en aanvullende serialiseerbare velden aanscherpen.
- `components/blog/RelatedPosts.tsx` — of vervangen in NL-template, of alle leeslabels locale-correct maken.
- `components/blog/Sources.tsx` — niet als primaire nieuwe source renderer gebruiken tenzij source metadata wordt uitgebreid.

### Per-route veilige workset — paralleliseerbaar

Voor iedere slug krijgt één eigenaar exclusief:

- `content/blog/nl/<slug>.md`;
- `data/editorial/blog/nl/<slug>.json`;
- `seo/research/nl/editorial/<slug>.md`;
- eventueel `public/images/redesign/editorial/<slug>-hero.webp`.

Geen routeagent wijzigt shared templates, dispatch, package.json, globale verifiers, keyword-CSV of goal-ledger.

### Verificatie en bewijs — integrator

- `scripts/verify-nl-editorial-family.ts`;
- `scripts/generate-nl-editorial-coverage.ts`;
- `seo/audits/runtime/nl-editorial-coverage.json`;
- `seo/audits/nl-editorial-family-2026-08-xx.md`;
- bestaande `seo/inventory/family-completion.json` en goal-ledger pas na volledige acceptatie.

## 5. Content- en SEO-workflow per route

Een route krijgt niet automatisch `index` omdat er al een Markdownbestand bestaat.

1. **Ownerbeslissing**
   Kies `index`, `redirect` of uitzonderlijk `noindex`. Controleer consolidaties, andere city/food/hotel/visaowners en cannibalisatie.
2. **Zelfstandige NL intentresearch**
   DFS wanneer beschikbaar; anders transparante actuele web-SERP-fallback. Claim geen volume, KD, ranking of echte PAA zonder dat bewijs.
3. **Bronaudit**
   Scheid primaire bron, gezaghebbende uitleg en louter concurrentiecontext. Een domeinhomepage is geen bewijs voor een specifieke claim.
4. **Freshnessbeslissing**
   Markeer stabiele en vluchtige claims. Event-, prijs-, dienstregeling-, wet-, route-, hotelopening- en venueclaims krijgen verified date en expiry action.
5. **Bodyreview**
   Verwijder verzonnen eerste persoon, vaste prijs- en tijdclaims zonder bron, garanties, beste-/grootsteclaims, oude events als toekomstige activiteit en letterlijke vertaalconstructies.
6. **Unieke overlay**
   Schrijf answer-first, ownergrens, hero, minimaal twee route-eigen beslismodules, relevante checks en drie natuurlijke vervolglinks.
7. **Affiliatefit**
   Voeg alleen een partner of Amazonproduct toe als het de volgende concrete beslissing oplost. Toon actuele-prijs/voorwaarden-CTA; nooit een vaste prijs uit de copy.
8. **Route-QA**
   Static verifier, HTTP, schema, mobiel/desktop en bronbewijs vóór acceptatie.

### Tijdgevoelige 87-routebatch

Deze batch verdient de strengste triage. Voor elk artikel:

- toekomstig/actueel: datum en officiële status opnieuw bewijzen;
- afgelopen maar nog nuttig: ombouwen naar uitkomst, terugblik of evergreen context;
- achterhaald en zonder blijvende intent: consolideren/redirecten;
- niet indexeerbaar nieuwsfragment: niet cosmetisch verlengen tot schijnowner.

Event-schema mag alleen worden gebruikt wanneer de eventstatus en data actueel zijn. Een verlopen event krijgt niet stilzwijgend een nieuwe datum.

## 6. Affiliate-architectuur

De nieuwe NL-template gebruikt geen algemene sidebar met Booking, Klook, GYG, eSIM, verzekering en 12Go tegelijk.

Profielen declareren nul tot maximaal enkele contextuele acties:

- `trip` voor een concrete hotel-/verblijfsbeslissing;
- `klook` voor een relevante activiteit na gratis keuzehulp;
- `twelveGo` voor een concrete route of transfer;
- `travelpayouts` alleen waar de bestaande partnerroute aantoonbaar past;
- `amazon` alleen via bestaande `/go/<slug>/` OneLinkregistry en product-fit.

De renderer bepaalt centraal:

- `target="_blank"`;
- `rel="noopener noreferrer nofollow sponsored"`;
- Nederlandstalige disclosure;
- Sub-ID/placement;
- CTA-tekst zoals “Bekijk actuele prijs bij …” of “Controleer actuele tickets”;
- geen beschikbaarheids- of goedkoopstegarantie.

Heuristieken uit `lib/blog-funnel-intent.ts` kunnen als auditadvies dienen, maar niet als automatisch publicatiebesluit. De huidige classifier heeft Engelse labels en kan een stad of intent verkeerd kiezen uit bodyfrequentie.

## 7. Beeldstrategie

“Premium” vereist geen willekeurige extra fotografie per sectie. Iedere route krijgt:

- een inhoudelijk juiste, liefst unieke hero;
- een beschrijvende, locale-correcte alt;
- eventueel één route-eigen bannerbeeld wanneer de layout het echt nodig heeft;
- verder iconen, typografie, ton-sur-tonvlakken en routevisuals uit het designsysteem.

Nieuwe assets:

- pad: `public/images/redesign/editorial/<slug>-hero.webp`;
- bij voorkeur 1800 × 1012 WebP;
- geen tekst, watermerk, onjuiste tempel/kaart/merkdetails of onbewezen specifieke venueweergave;
- verifier controleert bestaan, dimensies, bestandsgrootte en dubbele hashes;
- hergebruik is toegestaan als hetzelfde beeld semantisch klopt, maar een generieke hero over tientallen ongerelateerde onderwerpen faalt de visuele audit.

## 8. Verificatiescriptontwerp

### 8.1 Statische dekking

`scripts/verify-nl-editorial-family.ts` leest de 253 actuele paden uit de goal-ledger en bewijst:

- exact 1 index + 252 artikelpaden;
- ieder artikel heeft precies één geldige uitkomst: premium-profiel, gespecialiseerde owner of permanente consolidatie;
- geen ontbrekend profiel, dubbel slugprofiel of orphanprofiel;
- geen Engelse fallback voor een NL-route;
- ieder `index`-profiel heeft unieke primary, answer-first en owner boundary;
- page URL en slug komen exact overeen met de NL-route;
- title/description, category/taxonomy en hero zijn aanwezig;
- heroasset bestaat en alt is niet gelijk aan title of slugdump;
- minimaal vereiste route-eigen modules per layout;
- sources hebben title/creator/url/note/verifiedAt of een expliciete migratie naar die vorm;
- vluchtige claims hebben freshness en expiry action;
- FAQ-schema wordt alleen uitgegeven bij zichtbare FAQ;
- affiliatepartner/productslug bestaat in de centrale registry;
- elke affiliate heeft disclosure en wordt centraal gerenderd;
- related links zijn beschrijvend, bestaan in de NL-ownerinventaris en zijn geen historische alias;
- HTML bevat geen tweede H1, script, inline eventhandler of niet-toegestane widgetmarkup.

### 8.2 Uniekheidscontrole

Geen cosmetische “uniek genoeg”-score. De verifier maakt genormaliseerde fingerprints van:

- hero title + description;
- answer-first;
- owner boundary;
- decision card titles/copy;
- checks;
- zichtbare bodytekst zonder navigatie/footer.

Hard fail:

- identieke hero/answer/boundary tussen verschillende slugs;
- meer dan een afgesproken lage overlap van route-eigen modulecopy;
- een profiel dat alleen plaatsnaam of jaartal in standaardcopy vervangt;
- meerdere routes met dezelfde primary binnen de locale.

Bodyoverlap wordt als reviewlijst gerapporteerd, niet blind als redirectbesluit: eventupdates kunnen legitiem een bronnen- of veiligheidsalinea delen.

### 8.3 Claimlint

Reviewflags voor onder meer:

- “ik heb”, “wij bezochten”, “in mijn jaren” zonder gedocumenteerde founder evidence;
- vaste THB/EUR-bedragen;
- exacte opening, frequentie, reistijd, bezoekersaantal of percentage;
- “veilig”, “altijd”, “gegarandeerd”, “de beste”, “grootste”, “must”;
- toekomsttaal bij een verlopen datum;
- Engelse CTA- of navigatietekst in NL-rendering.

Een flag is niet altijd een fout, maar kan alleen worden geaccepteerd met route-evidence en een expliciete uitzonderingsnotitie.

### 8.4 Runtime voor alle 253

De verifier controleert iedere uiteindelijke route of redirect:

- verwachte HTTP-status;
- `<html lang="nl">`;
- exact één H1;
- zelfrefererende canonical of juiste permanente redirect;
- reciproque `nl`, `en`, `x-default` hreflang waar het paar bestaat;
- premium signature;
- Article/BlogPosting + Breadcrumb schema, plus alleen zichtbare aanvullende schema's;
- geen Internal Server Error of Next-overlay;
- geen gebroken lokale afbeelding;
- externe affiliateattributie volledig;
- interne links zonder `/nl/nl/`, localelek of bekende alias;
- redelijke HTML- en page-propsgrootte.

Runtimechecks moeten in batches draaien om de devserver niet met 253 gelijktijdige requests te overbelasten.

### 8.5 Representatieve browser-QA

Minimaal twee routes per layout plus de blogindex, desktop én 390px mobiel:

- horizontale overflow;
- hero crop en leesbaarheid;
- sticky sectienav;
- headingvolgorde;
- toetsenbordfocus;
- formulierlabels;
- accordions;
- reduced motion;
- console/error-overlay;
- broken images;
- bottom-nav en cookiebannerinteractie.

De steekproef vervangt de 253-route runtimecheck niet; hij bewijst de gedeelde visuele componenten.

## 9. Veilige uitvoeringsfasen

### Fase A — scopefreeze en beslissingen

- exporteer de exacte 253 ledgerpaden naar een read-only manifest;
- bepaal voor 252 artikelen `index`, `redirect` of `noindex`;
- leg overlaps met reeds geaccepteerde city-, food-, hotel-, visa-, route- en activityowners vast;
- voeg nog geen pagina toe buiten deze frozen set.

### Fase B — foundation met drie pilots

Bouw loader, template, profielvalidator en drie zeer verschillende pilots:

- één tijdgevoelige update;
- één evergreen decision guide;
- één commerciële maar contextuele route.

Pas na desktop/mobile, schema, locale en affiliate-QA wordt het fundament bevroren.

### Fase C — zeven disjuncte batches

Werk per layoutgroep. Iedere routeagent bezit alleen zijn eigen vier bestanden. De integrator wijzigt shared code uitsluitend tussen batches. Aanbevolen volgorde:

1. 5 ontbrekende categorieën en de dunste/risicovolste routes;
2. 87 updates vanwege vervalrisico;
3. 32 praktische routes;
4. 13 verblijfroutes;
5. 31 experience routes;
6. 38 foodroutes;
7. 37 destinationroutes en 9 cultuurroutes.

### Fase D — premium blogindex

`/nl/blog/` krijgt een eigen directorytemplate met:

- antwoord op wat de blog biedt;
- redactionele clusterkeuze in plaats van 35 ongenormaliseerde categories;
- zoekfunctie met expliciet label;
- server-rendered belangrijke clusterlinks;
- toegankelijke paginering/filterstate;
- locale-correct Blog/CollectionPage/ItemList-schema;
- geen generieke affiliatecarrousel boven redactionele navigatie.

De Engelse index blijft in deze NL-fase functioneel gelijk.

### Fase E — familieacceptatie

- statische verifier 253/253;
- runtime 253/253 of gedocumenteerde redirects;
- browsermatrix groen;
- design-, affiliate-, cannibalisatie- en sitemapgates groen;
- coverage-audit en beslismanifest gecontroleerd;
- pas daarna family-completion, keywords en goal-ledger centraal bijwerken.

## 10. Conflicten en mitigaties

| Conflict | Risico | Mitigatie |
|---|---|---|
| `pages/blog/[slug].tsx` | Meerdere agents voegen imports/slugchecks toe | Eén foundation/integrator; routeagents raken dit bestand niet aan. |
| `lib/blog.js` | Consolidaties, linknormalisatie en loader worden elders gewijzigd | Kleine geïsoleerde patches; voor en na iedere batch diff/rebase en linktests. |
| `pages/blog/index.tsx` | EN en NL delen één pagina | Alleen locale-dispatch toevoegen; EN snapshot/runtime apart verifiëren. |
| Bestaande special owners | Generieke template kan rijke owner overschrijven | Expliciete registry met hogere prioriteit dan generieke NL-profielen. |
| `content/blog/nl/*.md` | Parallelle contentedit op dezelfde slug | Eén eigenaar per slug; workset manifest; geen gedeelde bulk-rewrite. |
| Grote centrale datafile | Mergeconflicten en onreviewbare objects | Eén JSON-profiel per slug; geen 252-record TypeScriptobject. |
| Categories | Nederlands/Engels en vijf ontbrekend | Introduceer aparte genormaliseerde `editorialCluster`; wijzig legacycategory niet blind. |
| Inline widget-HTML | XSS/design/localelek en dubbele affiliates | Verwijder tijdens route-audit; typed affiliate modules, allowlist voor body-HTML. |
| EN fallback | Nederlandse URL kan Engelse copy tonen | Verbieden in NL-dispatch en verifier. |
| Hardcoded URLs | Schema/share/breadcrumb missen `/nl/` | Bouw alle URL's uit locale + route model; runtime exact vergelijken. |
| Heuristische funnels | Engelse labels of verkeerde commerciële intent | Alleen advies; per-route typed affiliate recipe is publicatiebron. |
| Verouderd nieuws | Oude 2026-claim blijft als toekomstig advies staan | Freshness/status/expiry verplicht; redirect of historische context waar nodig. |
| `package.json` | Parallelle agents voegen scripts toe | Alleen integrator voegt aan het einde maximaal twee npm scripts toe. |
| Verifiers als globalscript | TS `Cannot redeclare block-scoped variable` | Elk nieuw `.ts`-script begint met `export {}` en gebruikt unieke identifiers. |
| Ledgers/CSV | Gelijktijdige centrale edits en valse completion | Routeagents wijzigen ze nooit; één eindupdate na bewezen 253-dekking. |

## 11. Definition of done

De familie is pas gereed wanneer huidige evidence bewijst dat:

- alle 253 authoritative routes een expliciete index/redirect/noindexbeslissing hebben;
- iedere indexroute een unieke NL ownerintentie en bronnen/freshnessbewijs heeft;
- geen NL-route Engelse fallbackcopy rendert;
- gespecialiseerde bestaande owners behouden blijven;
- alle overige artikelen via dezelfde typed premium templatefamilie renderen;
- designverschillen uit zeven inhoudelijke layouts komen, niet uit copy-pastepagina's;
- affiliates contextueel, transparant en correct geattribueerd zijn;
- canonical, hreflang, schema, interne links, afbeeldingen, accessibility en responsive runtime zijn gecontroleerd;
- statische en runtimeverifier 253/253 groen zijn;
- de blogindex premium en locale-correct is;
- family-completion en goal-ledger daarna pas als evidence-updates worden aangepast.

## Aanbevolen eerste implementatiestap

Maak eerst uitsluitend de types, server-loader, ownerregistry, hoofdtemplate en drie pilotprofielen. Bevries daarna de shared API. Dat voorkomt dat 252 routeprofielen tegelijk worden geschreven tegen een bewegend dataschema en is de snelste route naar echte parallelle schaal zonder design- of SEO-schuld.
