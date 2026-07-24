# NL Krabi pilot — acceptance audit

**Datum:** 23 juli 2026  
**Status:** implementatie gereed; meenemen in de uiteindelijke release-audit

## Gecontroleerde routes

- `/nl/city/krabi/`
- `/nl/city/krabi/attractions/`
- `/nl/city/krabi/weather/`
- `/nl/best-hotels/krabi/`

## Acceptatiegates

- Alle vier routes geven HTTP 200.
- Elke pagina heeft exact één H1.
- Titles en descriptions zijn uniek en Nederlandstalig.
- Canonicals wijzen naar de Nederlandse URL.
- EN- en NL-hreflang verwijzen naar de juiste taalversies.
- Alle JSON-LD-blokken parsen zonder fout.
- Geen kapotte afbeeldingen of horizontale desktop-overflow gevonden.
- Geen onverwachte browserconsolefouten gevonden.
- Krabi-overzicht, bezienswaardigheden, weer en verblijven linken onderling binnen `/nl/`.
- Affiliate-CTA’s gebruiken `nofollow sponsored noopener noreferrer`.
- Amazon-productlinks lopen bewust via locale-neutrale `/go/`-redirects.

## Intentieconsolidatie

- `/nl/where-to-stay/krabi/` geeft permanent 308 naar `/nl/best-hotels/krabi/`.
- De Engelse `/where-to-stay/krabi/` blijft HTTP 200 tot de Engelse DFS-fase.
- De oude NL-route is verwijderd uit `sitemap-nl.xml` en uit toekomstige sitemapgeneratie.
- DataForSEO vond 0 backlinks, 0 verwijzende domeinen en 0 live NL-keywords voor de oude route.

## Technische regressiechecks

- TypeScript: geslaagd.
- SEO-cannibalisatie: 0 harde botsingen, 0 waarschuwingen.
- Amazon-affiliatevalidatie: 13 van 13 gebruikte slugs geregistreerd.
- Engelse Krabi-hotelpagina en oude generieke NL-hotelpagina’s blijven bereikbaar.

## Release-opmerking

De uiteindelijke sitebrede release-audit herhaalt responsive checks op echte mobiele viewports, performance, accessibility en productieheaders. Deze pilot bepaalt intussen de visuele en redactionele standaard voor volgende Nederlandse bestemmingsclusters.
