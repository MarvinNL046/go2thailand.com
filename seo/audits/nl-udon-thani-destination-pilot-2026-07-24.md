# NL destination-owner audit — Udon Thani

**Route:** `/nl/city/udon-thani/`  
**Controle:** 24 juli 2026  
**Status:** groen voor deze owner

## Research en intent

- Betaalde live DataForSEO-vergelijking uitgevoerd voor Phitsanulok, Trang, Udon Thani en Hat Yai.
- Udon Thani geselecteerd op bruikbare locatie-intentie: exact volume 260, KD 0 en vijf relevante PAA's op de hoofdquery.
- Aanvullende SERP/PAA-checks uitgevoerd voor `wat te doen in udon thani` en `udon thani bezienswaardigheden`.
- Cluster, concurrentdomeinen, huidige rankings en backlinks afzonderlijk vastgelegd.
- Drie Nederlandse concurrenten volledig geparseerd; aangevuld met TAT, UNESCO, SRT, Department of Airports, TMD en NederlandWereldwijd.
- Negen letterlijk verzamelde Nederlandse PAA-vragen verwerkt. De generieke Thailand-vraag is bewust uitgesloten.
- Ownergrenzen bewaakt: de bestemming bezit keuze, verblijfsduur, zones, route en praktische context; attractie-, hotel-, food- en weerintentie verwijzen naar eigen owners.

## Information gain

- Stad, Ban Chiang, Red Lotus Sea en Phu Phrabat worden als vier geografisch gescheiden reisblokken behandeld.
- Ban Chiang en Phu Phrabat worden niet als één vaag UNESCO-verhaal samengevoegd: prehistorische bewoning en technologie versus rotslandschap, kunst en Dvaravati-Sīma-stenen.
- De Red Lotus Sea wordt als ochtend- en seizoensbeslissing beschreven, zonder verouderde bloeigarantie.
- Udon-stad krijgt een zelfstandig stads- en eetverhaal in plaats van de rol van wachtruimte voor Laos.
- Kosten, veiligheid en vervoer zijn beslissingsteksten zonder verzonnen dagbudgetten of bevroren dienstregelingen.

## Unieke beeldset

Gebouwd met de ingebouwde image-generationmodus en daarna geoptimaliseerd naar WebP:

1. `udon-thani-destination-hero.webp` — Red Lotus Sea met echte waterlelie-schaal, boot rechts en rustige kopruimte links.
2. `udon-thani-nong-prajak.webp` — dagelijks stadsparkritme met wandelaars en fietser.
3. `udon-thani-ban-chiang.webp` — beschermde archeologische context en rood beschilderd aardewerk.
4. `udon-thani-phu-phrabat.webp` — breed rotslandschap, bospad en Sīma-stenen.
5. `udon-thani-food-breakfast.webp` — lokale tafel met khao piak sen, khai kata, naem nueng en Isaan-elementen.

Promptset: documentaire reisfotografie, locatiegebonden details, geen tekst of logo's, geen fantasy, per compositie afgestemd op hero, kaart, banner of editorial foodsection.

## Browser-QA

### Desktop — 1440 × 1000

- H1: `Udon Thani Thailand` — exact één H1.
- Title: `Udon Thani Thailand: route, tips & wat te doen (2026)`.
- Gerenderde hoofdcontent: 2.482 woorden.
- Canonical: `https://go2-thailand.com/nl/city/udon-thani/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Schema: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- FAQ: negen items; open antwoordkleur `rgb(41, 53, 49)` en goed leesbaar.
- Alle vijftien gerenderde beeldinstanties laden na lazy-load met `naturalWidth > 0`.
- Geen horizontale overflow: documentbreedte 1.425 bij een effectieve viewportbreedte van 1.425.
- Trip.com, Klook en 12Go-links bevatten `noopener noreferrer nofollow sponsored` en eigen sub-ID's.

### Mobiel — 390 × 844

- Effectieve contentviewport 375 px; documentbreedte eveneens 375 px, dus geen horizontale overflow.
- Sticky bestemmingszoeker en mobiele bottomnavigation gedragen zich volgens het herbruikbare systeem.
- Hero, tekst, CTA en typografie blijven leesbaar zonder afgekapt H1.
- De gedeelde highlightkaart is verbeterd: op kleine telefoons staat het beeld nu boven de tekst; vanaf `sm` blijft de eerdere zij-aan-zijcompositie behouden en desktop blijft ongewijzigd.

## Links en runtime

Alle unieke interne targets vanaf de owner retourneren HTTP 200:

- `/nl/`
- `/nl/city/`
- `/nl/best-hotels/udon-thani/`
- `/nl/city/udon-thani/attractions/`
- `/nl/city/udon-thani/food/`
- `/nl/transport/`
- `/nl/weather/`

## Automatische poorten

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — 7 primitives en 26 pilottemplates groen.
- `npm run seo:cannibalization` — 0 harde botsingen, 0 waarschuwingen.
- `npm run affiliate:verify` — 13/13 Amazon-slugs/producten groen.
- `npm run seo:verify:nl-runtime` — 63/63 Nederlandse routes groen op localhost.

## Observatie buiten deze owner

De globaal ingeladen Travelpayouts/Emrld-script logt op localhost `config is not valid`. De Udon-affiliate-CTA's zelf zijn correct en werken met de geregistreerde directe links. De globale scriptconfiguratie hoort in een aparte productie-/trackingaudit te worden gecontroleerd; de lokale melding is niet door destination-data veroorzaakt.
