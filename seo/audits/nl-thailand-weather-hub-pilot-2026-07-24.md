# Audit — NL Thailand weer en beste reistijd

## Scope

Owner-route: `/nl/weather/`

## Implementatie

- Nederlandse legacy-hub vervangen door `ThailandWeatherHub`; de Engelse locale blijft op de bestaande pagina tot afzonderlijke Engelse research.
- Interactieve maandvergelijking met officiële TMD-klimaatnormalen 1991–2020 voor Chiang Mai, Bangkok, Krabi en Phuket.
- Eigen beslislaag voor Andaman versus Golf, bootdagen, klimaat versus forecast, seizoenen en twaalf maandspokes.
- Drie contextuele Amazon-productlinks via de eigen `/go/`-registry en Trip.com/Klook-links met zichtbare disclosures.
- FAQPage, WebPage en BreadcrumbList-schema op basis van echte Nederlandse PAA-vragen.
- Drie nieuwe lokaal geoptimaliseerde WebP-assets; geen externe stockhotlinks.
- Locale-specifieke permanente consolidatie van drie brede overlappende NL-routes; de Engelse routes blijven onaangeraakt.

## Acceptatie

- [x] TypeScript
- [x] ESLint zonder nieuwe template-eigen fouten
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier
- [x] HTTP 200 en server-rendered hero/maandselector
- [x] Desktop browser-QA op 1440 × 1000
- [x] Mobiele browser-QA op 390 × 844
- [x] Maandselectorinteractie in echte browser gecontroleerd
- [x] Canonical, hreflang, schema, affiliatelinks, assets en redirects via HTTP/DOM gecontroleerd

## Huidige browseruitkomst

De lokale owner geeft HTTP 200 en bevat de nieuwe hero en interactieve maandvergelijker. De drie WebP-assets wegen ongeveer 119 KB, 111 KB en 157 KB. Desktop op 1440 px en mobiel via Chrome Device Metrics op exact 390 × 844 zijn visueel gecontroleerd. De mobiele documentbreedte bleef exact 390 px. De selector schakelde naar augustus, zette `aria-pressed="true"` en toonde het verdict `Reken op tropische variatie`.

DOM- en HTTP-controle: precies één H1, juiste NL-canonical, NL/EN-hreflang, FAQPage-, WebPage- en BreadcrumbList-schema, vijf gesponsorde affiliatelinks en drie lokale assets met HTTP 200. De drie geconsolideerde NL-routes geven 308 naar de owner. De Engelse weather- en best-time-routes geven 200 en behouden hun bestaande inhoud. TypeScript, ESLint, de verifier voor dertien templates, SEO en affiliatecontrole zijn groen.
