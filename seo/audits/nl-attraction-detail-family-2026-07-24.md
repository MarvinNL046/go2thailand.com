# Acceptance-audit — Nederlandse attractiedetailfamilie

**Datum:** 24 juli 2026  
**Status:** twee attractiedetailowners en één geconsolideerde eilandowner groen; 269 niet-gelokaliseerde detailduplicaten verwijderd.

## Definitieve owner-routes

- `/nl/islands/koh-samet/`
- `/nl/city/koh-samui/attractions/wat-plai-laem/`
- `/nl/city/chiang-rai/attractions/blue-temple/`

## Research en indexatiebesluit

- DataForSEO controleerde 272 Nederlandse attractiedetail-URLs.
- Ranked Keywords vond 4 zoekwoorden op 3 URLs; Bulk Backlinks vond 0 backlinks en 0 verwijzende domeinen op alle 272 URLs.
- DFS-kosten familieaudit: 0,01248 voor rankings en 0,081792 voor backlinks.
- Koh Samet is na een zelfstandige cluster, live SERP, echte PAA en concurrentieparse als brede eilandintentie geclassificeerd. De oude route `/nl/city/rayong/attractions/koh-samet/` retourneert een permanente 308 naar `/nl/islands/koh-samet/`.
- Alleen Wat Plai Laem en Blue Temple hebben bewezen detailintentie en zelfstandig onderzochte Nederlandse inhoud gekregen.
- Een willekeurige verwijderde NL-route retourneert 404; de equivalente Engelse route blijft 200.

## Design en assets

- Nieuwe herbruikbare `AttractionDetailGuideTemplate` met jade/crème/saffraan-design, editoriale hero, keuzehulp, visitplan, gestippelde route, respectsectie, FAQ en bronnen.
- Bestaande `DestinationGuideTemplate` ondersteunt nu ook eilandaffiliates en toont geen niet-bestaande interne hotelgidsknop wanneer `stayGuideHref` leeg is.
- Drie nieuwe geoptimaliseerde WebP-assets:
  - `koh-samet-attraction-hero.webp` — rustige, realistische Golfkust zonder foutieve Andaman-karstformaties.
  - `wat-plai-laem-hero.webp` — meer, tempelcomplex en achttienarmige Guanyin als contextueel sfeerbeeld.
  - `blue-temple-chiang-rai-hero.webp` — blauw-gouden tempelarchitectuur in zacht ochtendlicht.
- Alle drie pagina’s gebruiken een duidelijke AI-beeldcaption of redactionele context en presenteren het beeld niet als bewijs voor actuele omstandigheden.

## Browser-QA

- Koh Samet desktop 1440×1000: premium hero, sidecard, section-nav en eerste keuzevlakken visueel groen.
- Koh Samet mobiel 390×844: H1 `Koh Samet Thailand`, documentbreedte 375/375, 0 gebroken afbeeldingen en volledige contentstructuur tot en met FAQ en bronnen.
- Wat Plai Laem mobiel 390×844: hero, CTA’s en copy leesbaar; geen overflow of gebroken afbeeldingen.
- Blue Temple mobiel én desktop gecontroleerd: realistische crop, leesbare hero, geen overflow of gebroken afbeeldingen.
- H1-tekst bevat na correctie een semantische spatie tussen attractienaam en plaatsnaam.
- Affiliate-CTA’s hebben `target="_blank"` en `rel="noopener noreferrer nofollow sponsored"`.
- Structured data aanwezig: `TouristDestination` voor Koh Samet; `TouristAttraction` voor de twee tempels; daarnaast FAQ, Breadcrumb, WebPage en ItemList waar passend.
- De bekende sitebrede `emrldco.com config is not valid`-melding is niet template-eigen en blijft voor de afzonderlijke third-party/performance-audit.

## Sitemap en runtime

- Nederlandse sitemap: exact 2 attractiedetail-owners, 1 Koh Samet-eilandowner en 0 oude Koh Samet-attractie-URLs.
- Engelse sitemap: alle 272 bestaande attractiedetailroutes behouden.
- Totale sitemapoutput: 2.954 URLs — 1.874 EN en 1.080 NL.
- SEO-inventaris: 2.886 canonical routes — 1.840 EN en 1.046 NL.
- NL-runtimecheck, TypeScript, gerichte ESLint zonder errors, designsysteem, SEO-kannibalisatie en Amazon-affiliatecheck zijn groen.

## Bekende niet-blokkerende observatie

- Na veel routecompilaties hield de Next.js ontwikkelcache tijdelijk een ongeldige runtime-state vast. Een schone serverherstart herstelde alle pagina’s; de actieve server op poort 3000 retourneert daarna 200 voor de drie owners. Er is geen ongeldig JSON-bestand op schijf gevonden.

