# NL editorial batch 23 — implementatie-audit

Peildatum: 1 augustus 2026

Scope: exact zeven toegewezen NL-editorialroutes. Trat en Koh Kood/Trat zijn uitgesloten. Centrale family completion, ledger, keywordbestanden, `next.config.js` en sitemap zijn niet gewijzigd.

## Routebesluiten

| Route | Profiel | Indexering | Redirect |
|---|---|---|---|
| Ban Phe–Koh Samet festival | archived / elapsed | noindex,follow | geen |
| Banthat Thong Road | ready / food guide | index | geen |
| THE BARAI HUA HIN | ready / hotel guide | index | geen |
| Blue Jasmine | ready / route guide | index | geen |
| Central Phuket expansion | ready / confirmed news update | index | geen |
| Chilli Fest | archived / elapsed | noindex,follow | geen |
| Ethical elephant sanctuaries | archived / consolidated | noindex,follow | advies naar `/nl/best-elephant-sanctuaries-in-thailand/`; niet centraal uitgevoerd |

## Inhouds- en ontwerpaudit

- Alle zeven Markdown-bodies zijn onafhankelijk herschreven in Nederlands.
- Alle zeven routes hebben een schema-v1 typed profiel dat aansluit op de bestaande manifestcluster.
- Iedere route gebruikt een afzonderlijk gegenereerde, tekstloze hero in het premium redactionele designsysteem.
- Eventpagina’s tonen een verstreken datum bovenaan en hebben geen ticket- of boekings-CTA.
- Hotel- en railclaims verwijzen naar primaire operatorbronnen; vaste prijzen zijn verwijderd.
- Wellness bevat expliciete medische grenzen; olifantenwelzijn hanteert observation-only als ondergrens zonder eeuwige keurmerkclaim.
- Affiliates: alleen Banthat Thong (tourvergelijking) en THE BARAI (live hotelvoorwaarden), beide na onafhankelijke keuzehulp en met disclosure.

## Verificatie

- Cannibalization-baseline vóór schrijven: `0 hard collision(s), 0 warning(s)`.
- Gerichte loader/runtimecheck via `requireNlEditorialProfile`: alle zeven profielen laden; statussen `4 ready / 3 archived`, en alleen de drie archived profielen hebben `noindex: true`.
- `npm run seo:verify:nl-editorial-assets`: geslaagd; alle 182 geaccepteerde hero’s lokaal, gematcht, uniek voor indexeerbare routes en maximaal 450 KB.
- `npx tsc --noEmit`: geslaagd zonder fouten.
- `npm run design:verify`: geslaagd; 7 primitives en 34 pilot templates.
- `npm run affiliate:verify`: geslaagd; 17 gebruikte slugs en 21 geregistreerde producten.
- `npm run seo:audit:nl-editorial-risk`: uitgevoerd; sitebrede inventaris 252 artikelen. Geen batch-23-route verscheen in de getoonde high-risk top.
- `git diff --check -- <23 batchfiles>`: geslaagd; alleen waarschuwingen over toekomstige Windows CRLF-normalisatie.
- Scopecheck op `goal-completion-ledger.json`, `keywords-nl.csv`, `used-keywords-nl.md`, `next.config.js`, `public/sitemap.xml` en `nl-editorial-manifest.json`: geen batchwijzigingen.
- Geen staging, commit of centrale redirectmutatie uitgevoerd.
