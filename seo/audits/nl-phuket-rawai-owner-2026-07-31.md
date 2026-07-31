# Nederlandse Rawai-owner — finale audit

**Route:** `/nl/phuket/rawai/`  
**Status:** exact owner, premium en production-ready gecontroleerd

## Bewijs

- Zelfstandige Nederlandse DFS-, SERP-, concurrent- en echte PAA-research is lokaal vastgelegd.
- De oude paarse pSEO-layout is vervangen door `RawaiAreaGuideNl` op `PhuketAreaGuideTemplate`; Engels blijft een zelfstandige owner.
- Unieke metadata, H1, zonekeuze, waterfrontveiligheid, vergelijkingen, seizoensplanning, FAQ, bronnen en methodologie.
- Route gaf na een schone devcache HTTP 200; de legacy vaste seafoodprijs stond niet meer in de HTML.
- Browser-QA: `lang=nl`, vijf schemas, vier sponsored links, geen error-overlay en geen horizontale overflow op 1265 px of 375 px.
- Mobiele zoekpil en vaste bottom navigation bleven intact.
- TypeScript, `design:verify`, `affiliate:verify` en `seo:cannibalization` zijn groen; nul cannibalisatiebotsingen of waarschuwingen.

## Opmerking over lokale runtime

Een te brede gelijktijdige 2.263-route audit maakte de gegenereerde Next-devcache inconsistent. Alleen dat auditproces is gestopt; de cache is recoverable naar `.codex-runtime` verplaatst en poort 3000 is schoon herstart. Broncode en commits waren niet geraakt.
