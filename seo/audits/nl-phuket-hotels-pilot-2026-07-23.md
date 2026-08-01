# NL Phuket hotels — pilot-audit

**Route:** `http://localhost:3000/nl/best-hotels/phuket/`  
**Datum:** 23 juli 2026  
**Status:** implementatie, desktop-QA en mobiele viewport-QA groen

## Research en intent

- Afzonderlijke Nederlandse DFS-clusters uitgevoerd voor `hotels phuket`, `waar verblijven phuket` en `beste hotels phuket`.
- Live SERP en echte People Also Ask vastgelegd; de zichtbare FAQ gebruikt zes vragen uit die set.
- Concurrenten geparseerd en ruwe contentomvang vastgelegd.
- Huidige route had geen gemeten rankings en geen backlinks.
- Brede hoofdintentie wordt geconsolideerd op `/nl/best-hotels/phuket/`; smallere hotel-/doelgroeppagina’s blijven onaangeroerd tot hun eigen audit.

## On-page en schema

- Title: `Hotels in Phuket: waar verblijven & beste gebieden`.
- Meta description: 136 tekens en afgestemd op gebiedskeuze plus hotelintentie.
- Exact één H1: `Waar verblijven in Phuket?`.
- Canonical: `https://go2-thailand.com/nl/best-hotels/phuket/`.
- Hreflang: NL, EN en x-default aanwezig en correct gepaard.
- Schema: Organization, BreadcrumbList, FAQPage, ItemList en WebPage.
- FAQPage bevat zes zichtbare vragen; ItemList bevat de zes zichtbare gebieden.
- Related links naar Phuket-pillar, bezienswaardigheden en weer geven lokaal direct HTTP 200.

## Design en assets

- Nieuwe panoramische hero met tekstluwte links.
- Zes nieuwe gebiedsbeelden: Patong, Kata/Karon, Kamala, Bang Tao, Rawai/Nai Harn en Old Town.
- Alle zeven assets zijn merkneutraal en geoptimaliseerd als WebP:
  - hero: 1920×900, circa 247 KB;
  - kaarten: 1200×900, circa 168–236 KB.
- Gebiedskaarten tonen reisstijl, voordeel, trade-off en vervoerslogica.
- Hotelkaarten gebruiken een responsieve 3×2-opstelling op desktop en één kolom op mobiel.
- Split-staymodule gebruikt de bestaande gestippelde route met drie waypoints.
- Ton-sur-ton vlakken, dividerbreedte, donkere jade, saffraanaccenten en typografie volgen het gedeelde designsysteem.

## Responsive en browser-QA

- Desktop gecontroleerd op 1280 px: hero, keuzehulp, gebiedskaarten, hotelkaarten en boekingsmodule correct.
- Mobiel gecontroleerd op 390×844: sticky bestemmingzoeker en bottom navigation zichtbaar, H1 leesbaar en kaarten stapelen correct.
- Geen horizontale overflow op desktop of mobiel.
- Geen kapotte afbeeldingen; 10 van 12 afbeeldingen laden lazy en de hero/assets boven de vouw laden eager waar passend.
- Open FAQ-antwoord heeft voldoende contrast op mobiel.

## Affiliate en transparantie

- Negen zichtbare Trip.com-affiliatelinks aanwezig.
- Alle links gebruiken `noopener noreferrer nofollow sponsored`.
- Alle placements hebben een eigen `phuket-hotels-guide-*` sub-ID.
- Zichtbare disclosure staat in de hero en bij de hotelkeuzes.
- Geen vaste prijs, reviewscore of misleidende rangorde opgenomen.

## Consolidatie

- `/nl/where-to-stay/phuket/` geeft permanent HTTP 308 naar `/nl/best-hotels/phuket/`.
- De oude NL-hoofdroute is uitgesloten van de NL-sitemap.
- De Engelse `/where-to-stay/phuket/` blijft HTTP 200 totdat de Engelse researchfase is uitgevoerd.

## Automatische controles

- `npx tsc --noEmit`: geslaagd.
- `npm run design:verify`: geslaagd.
- `npm run seo:verify`: 0 harde collisions en 0 waarschuwingen.
- `npm run affiliate:verify`: geslaagd.
- Gerichte ESLint: 0 fouten; één bestaande waarschuwing in de legacy-fallback van `[slug].tsx`.
- Lokale ontwikkelserver blijft actief op poort 3000.

## Niet door deze template veroorzaakt

De browserconsole meldt `config is not valid` vanuit de sitebrede derde-partyscriptbron `emrldco.com`. De pagina zelf produceert geen eigen consolefout. Dit wordt meegenomen in de latere sitebrede performance- en third-party-audit; de externe integratie wordt niet stilzwijgend verwijderd binnen deze destination-subpillar.
