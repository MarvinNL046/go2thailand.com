# Audit — NL Thailand budget en kosten

## Scope

Owner-route: `/nl/thailand-index/budget/`

## Implementatie

- Nederlandse legacy-index vervangen door `ThailandBudgetGuide`; de Engelse locale blijft op de bestaande pagina tot afzonderlijke Engelse research.
- Interactieve berekening voor reisduur, groepsgrootte, reisstijl en regio, met kostenverdeling, intercitypost en 10% buffer.
- Eigen informatieblokken over regioverschillen, budgetlekken, cash versus kaart en het controleren van echte quotes.
- Contextuele affiliateblokken voor Trip.com, 12Go en Klook met zichtbare disclosure en placement-subids.
- FAQPage, WebPage en BreadcrumbList-schema op basis van echte Nederlandse PAA-vragen.
- Drie nieuwe lokaal geoptimaliseerde WebP-assets; geen externe stockhotlinks.
- Locale-specifieke permanente consolidatie van `/nl/budget-travel/` en drie brede overlappende blogroutes; de Engelse routes blijven onaangeraakt.

## Acceptatie

- [x] TypeScript
- [x] ESLint zonder template-eigen fouten
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier
- [x] HTTP 200 en server-rendered titel/hero
- [x] Desktop browser-QA op 1440 × 1000
- [x] Mobiele browser-QA op 390 × 844
- [x] Calculatorinteractie in echte browser gecontroleerd
- [x] Canonical, hreflang, schema, affiliatelinks, assets en redirects via HTTP/DOM gecontroleerd

## Huidige browseruitkomst

De lokale owner geeft HTTP 200 en bevat de nieuwe hero en calculator. De drie WebP-assets wegen ongeveer 125 KB, 180 KB en 281 KB. Desktop op 1440 px en mobiel via Chrome Device Metrics op exact 390 × 844 zijn visueel gecontroleerd. De mobiele documentbreedte bleef exact 390 px. De calculator schakelde naar 28 dagen, vier reizigers, Comfort en Vooral eilanden; alle vier knoppen rapporteerden `aria-pressed="true"` en de berekende totaalband wijzigde naar €24.610–€47.830.

DOM- en HTTP-controle: precies één H1, juiste NL-canonical, NL/EN-hreflang, FAQPage-, WebPage- en BreadcrumbList-schema, drie gesponsorde affiliatelinks en drie lokale assets met HTTP 200. De vier geconsolideerde NL-routes geven 308 naar de owner. De Engelse owner geeft 200 en behoudt de legacy-Engelse inhoud. TypeScript, ESLint, de verifier voor twaalf templates, SEO en affiliatecontrole zijn groen.
