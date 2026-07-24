# Audit — NL Thailand veiligheid en reisadvies

## Scope

Owner-route: `/nl/is-thailand-safe/`

## Implementatie

- NL-owner vervangen door `ThailandSafetyGuide`; Engelse locale blijft ongewijzigd tot afzonderlijke Engelse research.
- Live adviesladder met directe overheidsbron; geen zelfbedachte landen- of stadscore.
- Besliskaarten voor verkeer, scams, zee/natuur en solo-/uitgaanscontext.
- Eigen vervoersmodule, scamherkenning, interactieve zesstappen-vertrekcheck en offline noodplan.
- FAQPage, WebPage en BreadcrumbList-schema op basis van echte Nederlandse PAA-vragen.
- Drie eigen, lokaal geoptimaliseerde WebP-assets; geen externe stockhotlinks.
- Drie contextuele affiliatevervolgstappen met zichtbare disclosure en zonder veiligheidsclaim.
- Locale-specifieke consolidatie van twee brede veiligheidsroutes en één dubbele scamblog.

## Acceptatie

- [x] TypeScript
- [x] ESLint zonder template-eigen waarschuwingen
- [x] Design-system verifier
- [x] SEO verifier
- [x] Affiliate verifier
- [x] HTTP 200 en server-rendered hero/checklist
- [x] Desktop browser-QA op 1440 × 1000
- [x] Mobiele browser-QA op 390 × 844 zonder horizontale overflow
- [x] Checklistinteractie in echte browser gecontroleerd
- [x] Canonical, hreflang, schema, affiliatelinks, assets en redirects via HTTP/DOM gecontroleerd

## Uitkomst

De owner geeft lokaal HTTP 200 met precies één H1, de juiste NL-canonical, NL/EN-hreflang en FAQPage-, WebPage- en BreadcrumbList-schema. Er staan drie als `sponsored` gemarkeerde vervolgstappen. Alle drie de nieuwe WebP-assets geven HTTP 200; de drie NL-consolidaties geven 308 naar de gekozen owner of scamspoke. `/en/is-thailand-safe/` blijft HTTP 200 met de bestaande Engelse inhoud.

Desktop op 1440 × 1000 en mobiel op exact 390 × 844 zijn visueel gecontroleerd. De documentbreedte bleef 390 px. De vervoer- en noodpakketcomposities laden na lazy-loading correct en de zes checklistknoppen schakelen naar `aria-pressed="true"`. TypeScript, ESLint, de verifier voor veertien templates, SEO en affiliatecontrole zijn groen.

De browserconsole toont op localhost de al bekende sitebrede melding `config is not valid` uit de bestaande `emrldco.com`-integratie. Er is geen Next.js-erroroverlay of template-eigen runtimefout; de third-party-integratie blijft onderdeel van de afzonderlijke sitebrede performance-audit.
