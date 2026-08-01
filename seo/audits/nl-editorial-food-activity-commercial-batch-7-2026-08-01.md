# NL editorial food/activity commercial batch 7 — acceptatie-audit

Datum: 1 augustus 2026
Routes: 5

## Uitkomst

| Route | Status | Renderer | Ownergrens | Affiliatefit |
|---|---|---|---|---|
| `/nl/blog/bangkok-samyan-street-food-tour-review-klook-2026/` | ready/index | typed food-guide | Eén actueel tourproduct, geen Bangkok-foodhub of persoonlijke review | Klook live productcheck |
| `/nl/blog/thai-cooking-classes-chiang-mai/` | ready/index | typed food-guide | Lokale kookles; landelijke vergelijking blijft elders | Klook lesvergelijking |
| `/nl/blog/thai-curry-guide-green-red-yellow-massaman-panang/` | ready/index | specialized `thai-curry-nl` | Currytypes en bestellen; afzonderlijke dishowners houden recepten | Klook kookles + 3 natuurlijke Amazon OneLink-thuiskookroutes |
| `/nl/blog/thai-massage-guide-types-prices/` | ready/index | specialized `thai-massage-nl` | Type, consent, live prijscheck en veiligheid; geen medische owner | Klook sessievergelijking |
| `/nl/blog/tom-yum-goong-guide/` | archived/noindex | typed food-guide | Consolideren naar `/nl/food/tom-yum-goong/` | geen |

De centrale integrator moet alleen voor Tom yum een permanente NL-redirect toevoegen. De vier ready routes mogen als owners worden geaccepteerd; curry en massage waren al geregistreerde specialized owners.

## Inhoud en commerciële kwaliteit

- Samyan is volledig herschreven van fake first-person review naar productgerichte beslischeck.
- Oude Samyan-prijs, beoordeling, boekingsvolume, badge, vaste duur, stops en inclusies zijn verwijderd.
- Chiang Mai bevat geen ranglijst van scholen of vaste prijs; menu, hands-on tijd, groepsvorm, dieet en logistiek sturen de keuze.
- Curry en massage behouden hun gespecialiseerde premium renderer-prioriteit.
- Massage toont geen numerieke Wat Pho-prijzen meer; de officiële menukaart is alleen een live controlebron.
- Specialized bronmethodes noemen geen DFS- of PAA-claim meer.
- Tom yum bevat geen tweede recept- of bestelowner en verwijst naar de bestaande dish-owner.
- Geen legacy widgets, iframes, QR-blokken of verzonnen persoonlijke ervaring in de toegewezen contentbestanden.
- Klook en Amazon worden uitsluitend geplaatst bij een concrete activiteit, sessie of thuiskooktaak en renderen met sponsored-relatie en disclosure.

## Bronnen

- WHO Five Keys voor keuken- en tourhygiëne;
- UNESCO voor Tomyum Kung en Nuad Thai;
- Thailand Foundation voor currycultuur;
- NCCIH en Thaise overheidsinformatie voor massageveiligheid en providercontext;
- TAT voor Chiang Mai-bestemmingscontext;
- actuele Klook-productpagina alleen voor het commerciële Samyan-productrecord.

Geen DFS-volume, ranking of echte-PAA-claim is aan deze batch toegevoegd.

## Beeld

- 5/5 route-eigen assets op `/images/redesign/editorial/<slug>-hero.webp`;
- 5/5 1600 × 900 WebP;
- grootste bestand circa 168 kB;
- specialized component, profiel en frontmatter gebruiken voor curry en massage dezelfde nieuwe editorial hero.

## QA

- 5/5 profielen valideren via `loadNlEditorialProfile` en matchen het manifestcluster;
- 4/5 ready/index, 1/5 archived met `noindex: true`;
- runtime 5/5 HTTP 200 en exact één H1;
- 5/5 zelfrefererende canonical zolang de centrale Tom yum-redirect nog niet is geïntegreerd;
- Tom yum rendert `noindex,follow`;
- 5/5 route-eigen hero in prerendered HTML;
- 0 legacy widget- of `javascript:`-signaal;
- 6/6 unieke interne NL-linkdoelen HTTP 200;
- affiliateweergave: Samyan 1, kookles 1, curry 5 en massage 1 sponsored links;
- TypeScript en cannibalisatiecheck groen;
- `git diff --check` op toegewezen bestanden groen.
