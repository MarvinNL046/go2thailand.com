# Acceptatie-audit NL editorial batch 12

Datum: 1 augustus 2026

## Scope

Zeven toegewezen NL editorial-routes, zonder wijzigingen aan `family-completion.json`, keyword-CSV, ledger, redirects, sitemap of git-history.

## Acceptatiebesluit

- **Ready/index (5):** streetfood Bangkok per wijk/eetvorm, Koh Samui vanuit Nederland, Bangkok first-time/Reddit, Anantara Siam renovatie, Andaz One Bangkok.
- **Archived/noindex (2):** brede snorkel-eilandenblog en Phuket-weerblog.
- **Redirectadvies:**
  - `/nl/blog/snorkelen-thailand-beste-eilanden-heldere-zicht/` → `/nl/travel-guides/diving-snorkeling-thailand/`
  - `/nl/blog/phuket-weer/` → `/nl/city/phuket/weather/`

## Content- en designherstel

- Alle zeven legacybodies volledig vervangen; mojibake, gefingeerde eerstehandservaring, vaste prijzen, absolute veiligheid en generieke affiliatewidgets verwijderd.
- Alle routes hebben een typed profiel dat exact met slug, route en manifestcluster overeenkomt.
- Vijf indexowners hebben zelfstandige quick answers, beslismodules, natuurlijke interne links, FAQ en bronsectie.
- Beide archived routes hebben een noindex-profiel en één duidelijke doorstroom naar de sterkere owner.
- Zeven route-eigen lokale hero’s zijn als 1600×900 WebP afgeleid van de bestaande routebeelden; ieder bestand blijft onder 450 KB.
- Hotelowners gebruiken uitsluitend `live-price-only`; renovatie- en openingsclaims zijn naar primaire hotelbronnen teruggebracht.
- Affiliateblokken zijn beperkt tot vier natuurlijke beslismomenten en bevatten transparante disclosure. Geen Amazonblok geforceerd.

## SEO-grenzen

- Canonical is zelfrefererend zolang de centrale redirect nog niet is toegevoegd.
- `noindex,follow` staat alleen op de twee consolidatiekandidaten.
- FAQ-schema en BlogPosting/Breadcrumb-schema komen uit de typed renderer; er is geen Review-, Rating-, Offer- of prijs-schema toegevoegd.
- De vijf keyword owners staan in het researchdocument voor centrale toevoeging; archived routes krijgen geen ownerregel.

## QA-resultaat

- Typed loader: alle zeven profielen laden en matchen exact op manifestslug, route en cluster.
- Runtime op `localhost:3000`: alle zeven routes geven HTTP 200 en exact één H1.
- Canonical: alle zeven zelfrefererend en exact gelijk aan de NL-route.
- Robots: de twee consolidatiekandidaten geven `noindex,follow`; de vijf owners hebben geen noindex-directive.
- Schema: de vijf owners renderen BlogPosting, BreadcrumbList en FAQPage; de twee archived routes renderen BlogPosting en BreadcrumbList.
- Affiliates: vier natuurlijke uitgangen; iedere gerenderde anchor heeft `noopener noreferrer nofollow sponsored`. Sitebrede affiliate-verificatie groen.
- Assets: zevenmaal 1600×900 WebP; bestandsgroottes 145.908–253.236 bytes, dus allemaal onder 450 KB.
- TypeScript: `tsc --noEmit --incremental false` groen.
- Content-risk inventory opnieuw gegenereerd; dit is een rapporterende sitebrede audit en geen batchgate.
- `git diff --check` op de batchwijzigingen zonder whitespacefouten; alleen bestaande Git CRLF-waarschuwingen.
