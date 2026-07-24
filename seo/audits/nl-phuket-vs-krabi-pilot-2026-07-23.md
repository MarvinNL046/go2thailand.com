# NL Phuket-vs-Krabi pilot — QA 2026-07-23

## Route en indexatie

- Owner: `/nl/compare/phuket-vs-krabi/`.
- HTTP 200 op de lokale server.
- Zelfrefererende canonical bevat `/nl/`.
- Hreflang bevat alleen `nl` en `x-default`, omdat de Engelse route in de retired noindexfamilie nog geen equivalente herbouw heeft.
- De NL-sitemap bevat exact deze ene vergelijkingsroute; de EN-sitemap bevat hem niet.
- `/nl/compare/` en de overige automatisch gegenereerde vergelijkingen blijven `noindex, follow`.
- De Engelse Phuket-vs-Krabi-route blijft 200, toont de bestaande Engelse template en behoudt `noindex, follow`.

## Zoekonderzoek

- DataForSEO-cluster: `krabi of phuket` volume 50, `phuket of krabi` volume 30, gerichte secundaire intentie volume 10.
- Live SERP en vijf echte PAA-vragen vastgelegd voor Nederland.
- Drie bruikbare concurrentpagina's geparsed; de Reddit-positie gaf geen parsebare pagina-inhoud terug en is niet als bron gebruikt.
- De bestaande owner-URL heeft geen DFS-rankings of backlinks.
- Brede vraag “Waar ligt het mooiste deel van Thailand?” blijft bij de bestemmingenhub en is niet kunstmatig in deze FAQ opgenomen.

## Content en schema

- Eén H1: `Phuket of Krabi?`.
- Title: `Phuket of Krabi? Eerlijke vergelijking per reisstijl`.
- Schema: Organization, ItemList, FAQPage en BreadcrumbList.
- ItemList beschrijft dezelfde zes zichtbare criteria als de tabel.
- FAQPage is gelijk aan de zes zichtbare FAQ-antwoorden.
- Geen aggregateRating, onbewezen reviewscore of tijdloze prijsclaim.
- Officiële bronlinks: Tourism Authority of Thailand, Airports of Thailand en Department of Airports Thailand.

## Visuele QA desktop

- Nieuwe pagina-eigen hero `phuket-vs-krabi-hero.webp`, 1920 × 960, circa 329 KB.
- Hero, quick verdict, vergelijkingstabel, reisprofielen, visuele dagritmes, routebanner, boekingskaarten en FAQ afzonderlijk geïnspecteerd.
- Geen paginabrede horizontale overflow op 1265 px; de tabel is bewust lokaal horizontaal scrollbaar voor kleinere schermen.
- Alle acht beelden laden zonder fout en hebben een niet-lege alttekst.
- FAQ-open/dicht-interactie getest; de tweede vraag opent met goed leesbare antwoordtekst.
- Geen Next.js error overlay of applicatiefout.

## Links en affiliates

- Alle vijf zichtbare interne canonical links geven direct HTTP 200 zonder redirect.
- Zes commerciële links hebben `noopener noreferrer nofollow sponsored`.
- 12Go-, Trip.com- en Klook-links geven een werkende 302 naar de juiste partnerketen en bevatten hun placement-subid.
- Disclosures staan bij de route-CTA, onder het boekingsblok en onder de related affiliate-link.

## Technische checks

- TypeScript `npx tsc --noEmit`: groen.
- Nieuwe template ESLint: geen fouten of eigen waarschuwingen na cleanup.
- `design:verify`: 7 primitives, 8 pilots.
- `seo:verify`: 0 harde collisions, 0 waarschuwingen.
- `affiliate:verify`: groen.
- Sitemap na pilot: 1.868 EN, 1.767 NL, totaal 3.635.
- Devserver blijft actief op poort 3000.

## Mobiele gate — afgerond 2026-07-24

- [x] Echte 390 × 844-browserviewport uitgevoerd; documentbreedte 375/375 zonder horizontale pagina-overflow.
- [x] Hero, dagritmekaart, gecombineerde-routefeature, FAQ en onderste vervolgkaarten afzonderlijk visueel gecontroleerd.
- [x] Nul werkelijk mislukte afbeeldingen, ontbrekende alt-teksten of lege links.
- [x] Mobiele zoekpil en bottomnavigation aanwezig zonder kerninteractie af te dekken.

De H1 zag er visueel correct uit maar leverde aanvankelijk `Phuket ofKrabi?` als DOM-tekst. Een expliciete whitespace-node herstelt nu `Phuket of Krabi?` zonder de regelafbreking te veranderen.
