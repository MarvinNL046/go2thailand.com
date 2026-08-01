# Acceptatie-audit — NL editorial batch 16

**Datum:** 1 augustus 2026
**Scope:** zeven routes
**Implementatiestatus:** klaar voor centrale acceptatie; family-completion, keywords, ledger, redirects en sitemap zijn bewust niet door deze batch gewijzigd.

## Lifecycle en ownergrenzen

- **4 ready/index:** K-pop Bangkok 2026, Mahanakhon I-Tilt, Muay Thai voor beginners en nieuwe vliegroutes Thailand 2026.
- **3 archived/noindex:** Koh Lipe-blogduplicate, onbewezen Samui Airport-hubclaim en Phuket Old Town-blogduplicate.
- De Koh Lipe-route wordt niet verward met Trat of Koh Kood; beide zijn volledig buiten scope gebleven.
- Muay Thai behoudt zijn bestaande gespecialiseerde renderer, audit en drie bestaande route-eigen beelden. Het typed profiel is aanvullend familybewijs en vervangt het premium ontwerp niet.

## Contentkwaliteit

- Oude mojibake, opgeblazen superlatieven, onbewezen directe Schipholclaims, vaste prijsverwachtingen en doorverkoopimplicaties zijn uit de zes herschreven Markdownroutes verwijderd.
- K-pop maakt verstreken en geplande data zichtbaar en gebruikt de officiële uitverkochte status zonder reseller-CTA.
- I-Tilt scheidt basisentree en losse ervaring, begrenst de officiële “first outdoor tilting” claim en plaatst deelnamevoorwaarden vóór conversie.
- Nieuwe vliegroutes gebruikt luchthaven-codes en complete-chainchecks; extra capaciteit wordt niet gelijkgesteld aan lagere tarieven.
- Samui Airport archiveert de misleidende hubclaim in plaats van haar cosmetisch te herschrijven.
- De bestaande Muay Thai-pagina bewaakt vrijwillig sparren, conservatieve opbouw, uitrustingscheck, poliscontrole en medische terughoudendheid.

## Design en assets

- Zes nieuwe route-eigen, lokaal opgeslagen WebP-heroes zijn gemaakt met de ingebouwde image generation workflow en lokaal omgezet naar 1536×1024:
  - `koh-lipe-maldives-of-thailand-travel-guide-2026-hero.webp` — 128.060 bytes
  - `koh-samui-airport-international-hub-bangkok-airways-2026-hero.webp` — 229.174 bytes
  - `kpop-concerts-bangkok-2026-seventeen-treasure-bts-guide-hero.webp` — 105.170 bytes
  - `mahanakhon-skywalk-i-tilt-bangkok-worlds-highest-tilt-2026-hero.webp` — 145.924 bytes
  - `new-airline-routes-thailand-2026-flydubai-norse-scoot-chiang-rai-hero.webp` — 68.334 bytes
  - `old-town-phuket-walking-guide-street-art-cafes-2026-hero.webp` — 198.744 bytes
- Muay Thai gebruikt zijn bestaande unieke `muay-thai-beginner-hero.webp` van 1672×941 en 155.374 bytes. Die hoort bij de gespecialiseerde pagina en wordt niet onnodig vervangen.
- Alle zeven heroes zijn lokale WebP-bestanden, groter dan 1000×560 en kleiner dan 450 KB.
- De nieuwe beelden vermijden logo's, herkenbare artiesten, documentair bedoelde persoonsclaims en ingelegde tekst.

## SEO en techniek

- Alle zeven typed profielen matchen exact met slug, route en manifestcluster.
- Ready-profielen hebben self-canonical en geen `noindex`; archived-profielen hebben self-canonical plus `noindex: true` totdat de centrale permanente redirect actief is.
- Het typed template levert BlogPosting, BreadcrumbList en waar aanwezig FAQPage. De bestaande Muay Thai-renderer behoudt zijn uitgebreidere Article/HowTo/FAQ/Breadcrumb-schema.
- Frontmatter-hero en profiel-hero zijn exact gelijk.
- Interne links wijzen naar bestaande, afgebakende owners; redirectdoelen zijn apart aan root gemeld.
- Alleen I-Tilt bevat een nieuwe commerciële uitgang: een contextuele Klook-link ná productuitleg, met zichtbare disclosure en live-prijsbeleid. K-pop, luchtvaart en archived routes krijgen bewust geen geforceerde affiliate.

## Uitgevoerde QA

- Gerichte loadercheck: **7/7** profielen laden en matchen exact met het manifest.
- Gerichte assetcheck: **7/7** frontmatter/profile-matches, alle bestanden onder 450 KB en minimaal 1000×560. De vier ready-heroes hebben onderling verschillende SHA-256-hashes; Muay Thai is `3275e11eefde…`.
- Lokale ready-runtime: **4/4 HTTP 200**, ieder exact één H1, self-canonical, geen robots-noindex en geen interne serverfout. Het typed template rendert BlogPosting/Breadcrumb/FAQ waar van toepassing; Muay Thai rendert zijn gespecialiseerde schemaset.
- Lokale archived-runtime vóór centrale redirect: **3/3 HTTP 200**, ieder één H1, self-canonical en exact `noindex,follow`.
- Alle unieke interne hoofdlinks uit de profielen zijn gecontroleerd. De vervoerlink is tijdens QA van een legacy redirectpad naar de directe bestaande `/nl/transport/`-owner gecorrigeerd.
- De enige nieuwe affiliate-uitgang rendert als `_blank` met exact `noopener noreferrer nofollow sponsored` en zichtbare live-prijsdisclosure.
- `npm run seo:verify:nl-editorial:accepted`: groen — 134/253 accepted, 133 artikelprofielen; deze zeven in-progress profielen correct genegeerd tot centrale acceptatie.
- `npm run seo:verify:nl-editorial-assets`: groen — 133 reeds geaccepteerde heroes lokaal, gematcht, uniek waar indexeerbaar en onder 450 KB.
- `npm run design:verify`: groen — 7 primitives en 34 pilottemplates.
- `npm run affiliate:verify`: groen — 17 gebruikte Amazon-slugs en 21 geregistreerde producten.
- `npm run seo:audit:nl-editorial-risk`: uitgevoerd — volledige inventaris 252 artikelen; de resterende globale risicolijst hoort bij volgende batches en blokkeert deze zeven lifecyclebesluiten niet.
- `npx tsc --noEmit --incremental false`: groen.
- Gerichte `git diff --check`: groen; uitsluitend Windows-regelafbrekingswaarschuwingen, geen whitespacefouten.

De drie permanente redirects en sitemapuitsluitingen kunnen pas na centrale integratie worden getest, omdat deze batch volgens opdracht `next.config.js` en `lib/sitemap.js` niet wijzigt.
