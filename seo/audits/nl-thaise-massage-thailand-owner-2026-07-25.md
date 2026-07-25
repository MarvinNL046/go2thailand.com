# Acceptatie-audit — NL Thaise massage in Thailand owner

**Route:** `/nl/blog/thai-massage-guide-types-prices/`  
**Datum:** 25 juli 2026  
**Status:** geïmplementeerd en lokaal geverifieerd

## Zoekintentie en inhoud

- Primaire owner: `thaise massage thailand`; de brede term `thaise massage` heeft volgens DFS veel volume maar overwegend lokale Nederlandse salonintentie en is daarom niet als geïsoleerde primaire owner gekozen.
- Twee DFS-clusters met samen 486 records en 50 concurrentdomeinen, tien actuele Nederlandse SERP-sets, echte PAA, drie reisconcurrentieparses, vijf primaire bronchecks, rankingcheck en backlinkcheck vastgelegd.
- De bestaande GA4-route met 44 weergaven en 34 actieve gebruikers bleef exact behouden.
- 2.206 zichtbare gerenderde woorden en één H1.
- Tien echte PAA-vragen met geopende tekstkleur `rgb(41, 53, 49)`.
- De nieuwe owner behandelt typen, kleding, olie, druk, rek, kruidenwarmte, Wat Pho als gedateerd prijsanker, intake, consent, professionele grenzen, veiligheid, kwaliteitscontrole, fooi en reisplanning.
- De owner blijft gescheiden van wellnessretreats, Wat Pho, algemene destinationowners en medische behandelintentie.
- Onbewezen first-person ervaring, de claim `2.500 jaar oud`, medische garanties, vaste landelijke prijsranges, euroconversies en twaalf oude commerciële uitgangen zijn niet overgenomen.
- De Engelse route blijft inhoudelijk ongewijzigd.

## Health-adjacent en broncontrole

- Nuad Thai wordt op basis van UNESCO als in 2019 ingeschreven immaterieel cultureel erfgoed beschreven.
- Traditionele `sen`-concepten worden als cultureel systeem genoemd, niet als bewezen moderne anatomie.
- Wat Pho-prijzen zijn voorzien van venue, exacte raadpleegdatum en wijzigingswaarschuwing; ze worden niet als Thailand-gemiddelde gepresenteerd.
- Thaise overheidsinformatie onderbouwt registratie, vergunning en HSS-controlepunten.
- NCCIH onderbouwt de genuanceerde veiligheidscontext: doorgaans laag risico bij passend opgeleide uitvoering, maar zeldzame ernstige complicaties zijn mogelijk en medische zorg mag niet worden uitgesteld.
- Geen diagnose, persoonlijk behandeladvies of aanbeveling van massage bij hernia, zwangerschap of andere aandoeningen.
- Stop-signalen en risicofactoren zijn praktische overlegtriggers, geen volledige medische checklist.
- De PAA over een erectie wordt discreet beantwoord als mogelijke onwillekeurige lichamelijke reactie die nooit toestemming of seksuele dienstverlening impliceert.

## Design en beeld

- Drie nieuwe projectgebonden WebP-assets:
  - `/images/redesign/thai-massage-hero.webp`
  - `/images/redesign/thai-massage-choices.webp`
  - `/images/redesign/thai-massage-consent.webp`
- Premium editorial hero met rustige tekstzone, professionele niet-geseksualiseerde setting en vertrekkaart.
- Volwaardige paginaopbouw met vier keuzeprofielen, visuele vergelijking, erfgoedblok, officiële prijskaart, driedelige sessieroute, reisritmekaarten, consentbeeld, veiligheidsfilter, kwaliteitscheck, etiquette, PAA, Klook-vervolgstap, related guides en bronnen.
- Desktopbrowser op 1.280 px: document- en bodybreedte 1.265 px, viewport 1.280 px en geen documentoverflow.
- Mobiele browser op 390 × 844: document- en bodybreedte beide 375 px en geen documentoverflow.
- Alle acht gerenderde pagina- en layoutbeelden geladen na progressieve volledige scroll; geen gebroken beelden en bruikbare alt-teksten aanwezig.

## Natuurlijke interne links

- Vijf natuurlijke inline links in lopende uitleg:
  - `Bangkok` en `Chiang Mai` vanuit de concrete keuzecontext;
  - `praktische Wat Pho-gids` vanuit het gedateerde prijsvoorbeeld;
  - `gids voor wellnessretreats` voor de bredere reisintentie;
  - `Thaise etiquettegids` vanuit de kwaliteits- en gedragscheck.
- Related-guidecards verwijzen aanvullend naar Wat Pho, wellnessretreats en Bangkok.
- Alle zeven unieke interne hoofdcontentroutes reageerden lokaal met HTTP 200.
- Ankerteksten beschrijven de vervolgvraag en stapelen het primaire keyword niet kunstmatig.

## Amazon OneLink en overige affiliatecontrole

- Amazon-productfit is expliciet beoordeeld en bewust niet toegevoegd.
- Een massagebal, olie of herstelproduct zou de directe sessiekeuze niet noodzakelijk afronden en kan op deze health-adjacent owner onbedoeld een gezondheidsclaim of geforceerde productintentie suggereren.
- Dit no-add-besluit is vastgelegd in de ownerbrief; de centrale OneLink-strategie blijft actief op owners met een echte uitrustingstaak.
- Eén rustige Klook-link staat pas na alle onafhankelijke keuze-, consent- en veiligheidsinformatie.
- De zichtbare disclosure noemt commissie, geen extra kosten en de noodzaak aanbieder, inhoud, prijs, voorwaarden en geschiktheid zelf te controleren.
- De gesponsorde link bevat `noopener noreferrer nofollow sponsored`.
- Projectbrede Amazon-verificatie blijft groen: 16 gebruikte slugs en 16 geregistreerde producten.

## Techniek, SEO en React-review

- Canonical exact: `https://go2-thailand.com/nl/blog/thai-massage-guide-types-prices/`.
- Hreflang `en`, `nl` en `x-default` aanwezig.
- JSON-LD valide voor Article, FAQPage, BreadcrumbList, ItemList en HowTo; globale Organization is daarnaast aanwezig.
- Semantische headings, artikelen, lijsten, description list, native details/summary en echte links gebruikt.
- Hooks zijn onvoorwaardelijk; contentbeelden gebruiken `next/image`; geen onnodige clientstate toegevoegd.
- TypeScript en gerichte ESLint zonder errors of warnings.
- Cannibalisatiecheck: nul harde botsingen en nul waarschuwingen.
- Designsystemcheck groen: zeven primitives en 26 pilottemplates.

## Releasegates

- `npx tsc --noEmit`: groen.
- Gerichte ESLint voor owner en blogrouter: groen zonder warnings.
- `npm run seo:cannibalization`: groen, 0/0.
- `npm run design:verify`: groen.
- `npm run affiliate:verify`: groen.
- `npm run seo:verify:nl-runtime`: groen, 86/86 NL-ownerroutes reageren correct op de lokale server.
