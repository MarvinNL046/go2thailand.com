# NL editorial islands, activiteiten en safety — batch 4 acceptatie-audit

Datum: 1 augustus 2026
Toegewezen routes: 7

## Lifecycle en ownerbesluit

| Route | Cluster | Status | Indexatie | Bestemming / taak |
|---|---|---|---|---|
| `/nl/blog/sanctuary-of-truth-pattaya-wooden-temple/` | culture-wellness | ready | index | Specifieke attractiebezoeker: betekenis, planning, helm- en bouwplaatsregels. |
| `/nl/blog/full-moon-party-koh-phangan-guide-2026/` | events | ready, recurring | index | Terugkerend evenement: datumcontrole, verblijf, vervoer en nachtplan. |
| `/nl/blog/koh-tao-guide-diving-beaches-budget-travel/` | destination-guides | archived | noindex,follow | Consolideren naar `/nl/islands/koh-tao/`. |
| `/nl/blog/koh-chang-guide-thailand-eastern-island/` | destination-guides | archived | noindex,follow | Consolideren naar `/nl/islands/koh-chang/`. |
| `/nl/blog/best-beaches-thailand/` | destination-guides | archived | noindex,follow | Consolideren naar `/nl/best-beaches-in-thailand/`. |
| `/nl/blog/15-hidden-gems-thailand-tourists-miss/` | destination-guides | archived | noindex,follow | Consolideren naar `/nl/travel-guides/hidden-gems-off-beaten-path-thailand/`. |
| `/nl/blog/solo-female-travel-thailand-safety-tips/` | planning | archived | noindex,follow | Consolideren naar `/nl/travel-guides/solo-female-travel-thailand/`. |

De vijf consolidaties volgen `nl-editorial-owner-consolidation-triage-2026-07-31.md`. Zij claimen geen nieuw keyword en bevatten geen affiliateblok. De centrale integrator moet de vijf permanente NL-redirects toevoegen; deze batch wijzigde conform opdracht geen centrale consolidatieregistry.

## Contentreview

- beide zelfstandige owners zijn volledig herschreven in natuurlijk Nederlands;
- oude widgets, QR-blokken, iframes, vaste prijzen, vaste ferryuren en ongeverifieerde bezoekersaantallen zijn verwijderd;
- geen verzonnen eerste persoon of persoonlijke bezoekervaring;
- geen absolute veiligheidsclaim;
- Full Moon Party bevat bewust geen statische 2026-datalijst: organisatorcontrole is de beslisstap;
- Sanctuary of Truth noemt geen ongeverifieerde superlatief of absolute “spijkerloos”-claim;
- de vijf retired bodies zijn bewust kort en sturen elk naar de exacte bestaande owner;
- Klook en 12Go staan alleen op de twee routes waar de bezoek- of vervoerbeslissing concreet is, met live-optieformulering en disclosure.

## Beeld

- alle zeven profielen en frontmatters gebruiken exact `/images/redesign/editorial/<slug>-hero.webp`;
- alle zeven assets zijn 1600 × 900 WebP en kleiner dan 250 kB;
- het aanvankelijk onnauwkeurige oude Sanctuary-blogbeeld is vervangen door de herkenbare bestaande Pattaya Sanctuary-routeasset;
- de Full Moon Party-hero toont een avondstraat en volle maan, zonder een onjuiste belofte over een specifieke feestopstelling.

## Technische QA

Directe loader-validatie:

- 7/7 profielen parsen met `loadNlEditorialProfile`;
- 2/7 `ready` zonder `noindex`;
- 5/7 `archived` met `noindex: true`;
- alle profielclusters matchen het NL editorial manifest.

Runtime op `http://localhost:3000`:

- 7/7 HTTP 200;
- 7/7 exact één H1;
- 7/7 zelfrefererende NL-canonical zolang de centrale redirects nog niet zijn geïntegreerd;
- 5/5 retired routes renderen `noindex,follow`;
- 2/2 indexowners renderen één `BlogPosting`-schema en drie hreflang-links;
- 2/2 affiliateowners renderen externe CTA's met `target="_blank"` en `nofollow sponsored`;
- 0 legacy `data-widget`, iframe of `javascript:`-URL in de toegewezen artikelbody's;
- 12/12 unieke interne NL-linkdoelen geven HTTP 200;
- TypeScript: `npx tsc --noEmit --incremental false` geslaagd;
- `git diff --check` op alle toegewezen tekst- en profielbestanden geslaagd.

## Centrale follow-up

Voeg uitsluitend in de centrale integratiefase locale-specifieke permanente redirects toe voor de vijf archived routes. Laat Sanctuary of Truth en Full Moon Party zelfstandig indexeerbaar. Voeg alleen voor deze twee ready owners een geïmplementeerde keywordrij toe; retired routes mogen niet als nieuwe exacte owners in de keywordledger meetellen.
