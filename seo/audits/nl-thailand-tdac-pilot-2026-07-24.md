# Audit — NL Thailand Digital Arrival Card

## Scope

Owner-route: `/nl/visa/digital-arrival-card/`

## Implementatie

- NL-only premium template; de Engelse visa-detailpagina en data blijven onaangeroerd tot afzonderlijke Engelse research.
- Twee eigen geoptimaliseerde WebP-assets: hero en visuele formulierflow.
- Officiële gratis TDAC-link is de primaire actie in hero, kort antwoord, invulflow en eindcontrole.
- Werkende aankomstdatum-calculator voor het driedagenvenster inclusief aankomstdag.
- Interactieve zesdelige documentenchecklist met voortgang.
- Vijfstappenflow, kinderen/groepen, land/lucht/zee, transit en correctiepad.
- FAQPage, WebPage en BreadcrumbList-schema op basis van echte Nederlandse PAA-vragen.
- Twee ondergeschikte contextuele affiliatelinks met zichtbare disclosure.
- Dubbele NL-blogroute redirect permanent naar deze owner.

## Acceptatie

- [x] TypeScript
- [x] ESLint zonder template-eigen waarschuwingen
- [x] Design-system verifier
- [x] SEO verifier
- [x] Affiliate verifier
- [x] HTTP 200 en één H1
- [x] Desktop browser-QA op 1440 × 1000
- [x] Mobiele browser-QA op exact 390 × 844 zonder horizontale overflow
- [x] Datumcalculator met echte browserinput gecontroleerd
- [x] Checklistinteractie met echte browserclick gecontroleerd
- [x] Canonical, hreflang, schema, affiliatelinks, assets en redirect via HTTP/DOM gecontroleerd

## Browseruitkomst

Hero, calculator, formulierflow, checklist en correctiepad zijn op desktop en mobiel visueel gecontroleerd. De route heeft één H1 en geen horizontale overflow. De enige consolemelding is de bekende sitebrede `config is not valid` van `emrldco.com`; er is geen Next.js-erroroverlay of template-eigen browserfout.
