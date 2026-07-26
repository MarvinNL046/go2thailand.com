# NL food-detailfamilie — design-, SEO- en runtime-audit 2026-07-26

## Scope en eigenaarschap

- Templatefamilie: `/nl/food/<gerecht>/`, 46 routes uit `data/food/index.json`.
- Zes zelfstandig onderzochte eigenaarroutes zijn nu geregistreerd: `/nl/food/pad-thai/`, `/nl/food/som-tam/`, `/nl/food/tom-yum-goong/`, `/nl/food/khao-soi/`, `/nl/food/massaman-curry/` en `/nl/food/mango-sticky-rice/`.
- De detailpagina bezit reisintentie: herkennen, smaak, mogelijke ingrediënten, bestellen en regionale context.
- Receptintentie blijft buiten deze paginafamilie. Er staat daarom nergens `Recipe`-schema zonder een volledig, verifieerbaar recept.
- De brede `/nl/food/`-hub bezit “eten in Thailand”; de curryvergelijker bezit “Thaise currysoorten”. Detailroutes beantwoorden alleen de gerecht-specifieke intent.
- Engels bleef functioneel en inhoudelijk onaangeroerd. De afzonderlijke EN-research volgt pas na de NL-fase.

## Researchbewijs

- Zes afzonderlijke DataForSEO-keywordclusters zijn vastgelegd op 26 juli 2026.
- Zes live Nederlandse SERP-sets leverden samen 46 organische resultaten en 33 letterlijke PAA-vragen op.
- Alleen Pad Thai, Som Tam, Tom Yum Goong en Khao Soi tonen twee geselecteerde Nederlandstalige PAA-antwoorden. Massaman en Mango Sticky Rice kregen in de NL-SERP alleen Engelstalige PAA; die zijn niet kunstmatig vertaald of als Nederlandse PAA gepresenteerd.
- Pad Thai en Massaman Curry zijn afzonderlijk op bestaande rankings en backlinks gecontroleerd: geen migratiesignaal aangetroffen.
- Pad Thai- en Massaman-concurrenten zijn via DataForSEO inhoudelijk geparseerd. Officiële culinaire context komt onder meer van Tourism Authority of Thailand, Thailand Foundation en voor Tomyum Kung van UNESCO.
- Gemeten hoofdintentie: `pad thai thailand` volume 70/KD 0; `khao soi thailand` volume 30; `massaman curry thailand` volume 8100/KD 2; `mango sticky rice thailand` volume 140/KD 18. Som Tam en Tom Yum Goong hadden geen meetbaar lokaal volume, maar wel bruikbare SERP/PAA-intentie.

## Herbruikbaar premium ontwerp

- Eén responsive component stuurt alle 46 routes aan, met 46 unieke redactionele profielen.
- Grote fotografische hero met ton-sur-ton overgang, donkere informatiekaart, compacte kruimels en twee duidelijke CTA’s.
- Sticky inhoudsnavigatie staat onder de mobiele zoekbalk en onder de desktopnavbar.
- Geen generieke cardmuur: smaakkompas, ingrediëntsignalen, gestippelde bestelroute, tweeluik “kies dit / let op”, regionale beeldsectie, kooklesblok, producttaak, FAQ, gerelateerde gerechten en bronvlak wisselen ritme en informatiedichtheid af.
- Alle 79 unieke broningrediënten hebben een Nederlandse presentatielaag; allergenen blijven expliciet een signaal en nooit een veiligheidsgarantie.
- Mobiele bottom navigation, leesbare accordiontekst, schaalbare titels en donkere groentinten sluiten aan op het bestaande redesignsysteem.

## Affiliate-integriteit

- Per route precies drie als `sponsored nofollow` gemarkeerde uitgangen: één Klook-kookles en twee Amazon OneLink-productroutes.
- Iedere Klook-link heeft een gerecht-specifieke `subid=dish-<slug>-nl-cooking`.
- Amazon-links lopen uitsluitend via de centrale `/go/`-router. Hoofdgerechten krijgen kookboek + granieten vijzel; desserts krijgen kookboek + rijstkoker.
- Disclosure benoemt commissie, geen meerprijs, OneLink-landroutering en dynamische beschikbaarheid. Er staan geen vaste productprijzen of verkoopbeloftes.

## Structured data en techniek

- Alle routes: globale `Organization`, pagina-eigen `Article`, `BreadcrumbList` en `ItemList`.
- Alleen de vier bewezen PAA-routes: aanvullend `FAQPage`.
- Alle routes: één H1, één `main`-landmark, `lang="nl"`, self-canonical en hreflang `en`, `nl`, `x-default`.
- Next Image vervangt ruwe foodafbeeldingen; alle 46 bronbeelden bestaan lokaal en hebben alttekst.
- De Engelse Pad Thai-route rendert nog steeds de Engelse legacycontent en lekt niet naar het Nederlandse component.

## Verificatiebewijs

- `npm run seo:verify:nl-dishes`: 46/46 routes groen; 46/46 profielen; vier echte-PAA owners; 42 routes zonder verzonnen FAQ.
- `npx tsc --noEmit --incremental false`: groen.
- `npx next build`: 1.263 statische pagina’s succesvol gebouwd; `/food/[slug]` is 29,3 kB routespecifiek en 149 kB first-load JS.
- Een metadatahelper die onbedoeld het volledige fooddatamodule in de clientbundel trok is verwijderd; first-load daalde in dezelfde buildomgeving van 977 kB naar 149 kB.
- Browser-QA op 375 px en 1440 px: geen horizontale overflow, geen kapotte beelden, één H1/main, correcte schema’s en drie affiliate-uitgangen.
- Visueel gecontroleerd: Pad Thai als volledige basisroute, Gaeng Tai Pla als lange/extreme inhoudsvariant en Mango Sticky Rice als dessert- en rijstkokerbranch.
- Gerenderde hoofdcontentsteekproef: Pad Thai 920 woorden, Gaeng Tai Pla 796 woorden, Mango Sticky Rice 800 woorden.

## Nog bewust open binnen de totale sitegoal

- De overige 40 long-tail gerechten hebben wel een uniek inhoudsprofiel en volledige technische QA, maar krijgen alleen extra PAA of verdere semantische uitbreiding wanneer afzonderlijke Nederlandse SERP-research daar bewijs voor levert.
- Sitebrede natuurlijke-inline-linkaudit volgt nadat alle Nederlandse families zijn afgewerkt.
- De Engelse foodfamilie wordt later opnieuw onderzocht en herschreven; geen directe vertaalcopy.
