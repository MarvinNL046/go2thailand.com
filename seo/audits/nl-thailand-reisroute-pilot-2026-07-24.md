# Audit — NL Thailand reisroute

## Scope

Owner-route: `/nl/thailand-itinerary/`

## Implementatie

- Nederlandse legacy-pagina vervangen door de nieuwe `ThailandRouteGuide`; Engelse locale blijft op de bestaande pagina tot eigen EN-research.
- Interactieve keuze voor 10 dagen, 2 weken, 3 weken en 4 weken, inclusief reisblokken, tempo en aantal grote verplaatsingen.
- Geografisch correcte Thailand-SVG met éénrichtingsroute, drie reisfamilies en een aparte 21-daagse tijdlijn.
- Eigen beslismodel voor transfertaks en een kustfork voor Andaman versus de Golf.
- Contextuele affiliateblokken voor 12Go, Trip.com en Klook met zichtbare disclosure en placement-subids.
- FAQPage, Article en BreadcrumbList-schema; exacte PAA-vragen uit vijf Nederlandse SERPs.
- Drie nieuwe lokaal geoptimaliseerde WebP-assets; geen externe stockhotlinks.
- Locale-specifieke permanente redirect van `/nl/itinerary/` naar de owner; EN blijft onaangeraakt.

## Acceptatie

- [x] TypeScript
- [x] ESLint zonder template-eigen fouten
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier
- [x] HTTP 200 en server-rendered titel/hero
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Duurselectorinteractie in echte browser gecontroleerd
- [x] Canonical, hreflang, schema en zichtbare FAQ in browser gecontroleerd

## Huidige technische uitkomst

De lokale owner geeft HTTP 200, bevat de nieuwe titel en hero in de server-rendered HTML en compileert zonder TypeScript-fouten. De drie assets wegen na WebP-optimalisatie ongeveer 175 KB, 222 KB en 258 KB. Desktop op 1440 px en mobiel via Chrome Device Metrics op exact 390 × 844 zijn visueel gecontroleerd. De mobiele documentbreedte bleef 390 px; alleen de bedoelde sectienavigatie scrolt horizontaal binnen haar eigen container. De duurselector wisselde naar `2 weken`, zette `aria-selected="true"` en toonde `De complete eerste kennismaking`.

DOM- en HTTP-controle: precies één H1, juiste NL-canonical, NL/EN-hreflang, FAQPage-, Article- en BreadcrumbList-schema, drie gesponsorde affiliatelinks, drie lokale assets met HTTP 200 en een 308 van `/nl/itinerary/` naar de owner. De Engelse pagina geeft 200 en behoudt de legacy-Engelse inhoud.
