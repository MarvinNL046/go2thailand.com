# NL editorial batch 26 — audit

Scope: exact zeven toegewezen routes. Trat en Koh Kood/Trat uitgesloten. Geen centrale family completion, ledger, keywords, manifest, `next.config.js` of sitemap gewijzigd.

## Implementatie

- Zeven volledig herschreven NL-bodies.
- Zeven schema-v1 typed profielen met manifestcluster.
- Zeven unieke route-eigen imagegen-WebP-hero’s.
- Lifecycle: 3 ready/index en 4 archived/noindex.
- Redirectadvies: tourism target → actuele outlook; 4am → nightlife; eVisa → visa hub. AeroThai bewust zonder redirect.
- Geen affiliate; geen vaste prijs- of openingsgarantie.

## QA

- `npm run seo:cannibalization`: 0 hard collisions en 0 waarschuwingen.
- Gerichte loader/runtime via `requireNlEditorialProfile`: 7/7 geladen; 3 ready/index en 4 archived/noindex.
- `npm run seo:verify:nl-editorial-assets`: geslaagd; 196 geaccepteerde hero’s lokaal, gematcht, uniek voor indexeerbare routes en maximaal 450 KB.
- `npx tsc --noEmit`: `TSC_EXIT=0`.
- `npm run design:verify`: geslaagd; 7 primitives en 34 pilot templates.
- `npm run affiliate:verify`: geslaagd; 17 gebruikte slugs en 21 geregistreerde producten.
- Scoped `git diff --check`: geslaagd; uitsluitend verwachte CRLF-waarschuwingen voor zeven Markdownfiles.
- Centrale scopecheck op ledger, keywordlogs, manifest, `next.config.js` en sitemap: leeg.
- Niet gestaged of gecommit.
