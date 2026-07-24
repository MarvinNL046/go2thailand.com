# SEO- en ontwerpbrief — hotels en verblijven in Phuket

**Route:** `/nl/best-hotels/phuket/`  
**Primair:** `hotels phuket` / `hotels in phuket thailand`  
**Secundair:** `phuket hotels`, `hotel phuket`, `best hotels phuket`, `waar verblijven phuket`, `hotels patong phuket`, `phuket resort`  
**Intent:** commercieel onderzoek met een belangrijke informatieve voorvraag: eerst het juiste gebied kiezen, daarna een hotel vergelijken.

## DFS-samenvatting

- `hotels in phuket thailand` en directe varianten: volume 720, KD 0.
- `hotels phuket`: volume 590, commercieel.
- `phuket resort`: volume 260.
- Patong-hotelvarianten: volume 170.
- `best hotels phuket`: volume 110, KD 0.
- De huidige URL heeft geen gemeten rankings en geen backlinks; er is daarom geen bestaand linkequityrisico bij inhoudelijke herbouw.
- Hotel-aggregators domineren de brede SERP. De redactionele informatiewinst is niet nóg een prijsfeed, maar een heldere gebiedskeuze met controleerbare hotelvoorbeelden en expliciete trade-offs.

## Echte People Also Ask-vragen

Verzameld via de Nederlandse DataForSEO-live-SERP op 23 juli 2026:

1. Waar kun je het beste verblijven in Phuket?
2. Wat is het leukste deel van Phuket?
3. Welk strand is het mooist in Phuket?
4. Hoeveel dagen heb je nodig in Phuket?
5. Wat is het rustige gedeelte van Phuket?
6. Is het noorden of het zuiden van Phuket beter?

Vragen over de beste reistijd horen inhoudelijk bij `/nl/city/phuket/weather/`. De hotelpagina beantwoordt die alleen kort in de context van boekingsvoorwaarden en linkt door.

## Concurrentie en contentlengte

Geparseerde bronnen en ruwe omvang, inclusief navigatie-/footertekst:

- Backpackeninazie, Phuket-gids: circa 1.966 woorden; brede bestemming met een korte verblijfssectie.
- Travelalut, Phuket-tips: circa 2.182 woorden; brede tips en een beperkt hoteladvies.
- Thailand Travel, hotels Phuket: circa 682 woorden; commercieel aanbod per strand/segment.
- Silverjet, luxe vakantie Phuket: circa 901 woorden; luxe aanbod en commerciële positionering.

De SERP splitst brede accommodatie-intentie tussen boekingsmachines, brede Phuket-gidsen en aanbieders. De nieuwe pagina hoeft hun volledige bestemmingsinformatie niet te kopiëren. Doel is ongeveer 2.200–3.000 woorden aan zichtbare, beslissingsgerichte content, verdeeld over zes gebieden, zes redactionele hotelvoorbeelden, boekingstips, split-stay en PAA.

## Informatiearchitectuur

1. Direct antwoord met zes uitvalsbases.
2. Gebiedskeuze met best-for, voordeel, trade-off en vervoer.
3. Zes redactionele hotelvoorbeelden, één per gebied; geen vaste prijzen of ratings.
4. Drie zinvolle split-stay-opties met visuele stippellijn.
5. Praktische boekingscontrole: kaart, vervoer, seizoen en voorwaarden.
6. Exacte PAA-vragen in een zichtbare FAQ en gesynchroniseerde FAQPage-schema.
7. Related links naar de Phuket-pillar, bezienswaardigheden en weer.
8. Bron- en methodesectie met TAT, officiële vervoersinformatie en officiële hotelsites.

## Gebiedsmodel

| Gebied | Primaire reisstijl | Belangrijkste trade-off |
|---|---|---|
| Patong | nachtleven en maximaal aanbod | druk en mogelijk luid |
| Kata & Karon | eerste bezoek, strand, stellen en gezinnen | populair en verspreide “beach”-claims |
| Kamala | rustiger westkustresort | minder avondkeuze |
| Bang Tao & Surin | luxe, ruimte en resorttijd | verder van zuid en Old Town |
| Rawai & Nai Harn | ontspannen zuiden en langer verblijf | vervoer vrijwel noodzakelijk |
| Phuket Old Town | cultuur, eten en korte stadsstop | geen strandbasis |

## Bronnenbeleid

- Bestemmingsclaims: Tourism Authority of Thailand.
- Luchthaven en kustbus: Airports of Thailand / officiële Phuket Smart Bus-pagina.
- Airport–Old Town: officiële Phuket Airport Bus.
- Hotelclaims: uitsluitend officiële hotelsites; geen gekopieerde reviewscore of vluchtige prijs.
- Veranderlijke dienstregelingen, tarieven en beschikbaarheid worden niet als blijvend feit gepresenteerd.

## Cannibalisatiebesluit

- `/nl/best-hotels/phuket/` wordt de enige NL-eigenaar van de gecombineerde hoofdintentie “waar verblijven + hotels Phuket”.
- `/nl/where-to-stay/phuket/` krijgt een locale-specifieke permanente redirect naar de nieuwe route en verdwijnt uit de NL-sitemap.
- De Engelse `/where-to-stay/phuket/` blijft intact totdat daarvoor afzonderlijke Engelse DFS-research is uitgevoerd.
- Smallere hotel- en doelgroepclusters blijven voorlopig afzonderlijk; consolidatie volgt pas na hun eigen inhouds- en backlinkaudit.

## Visuele verrijking

Zeven nieuwe, merkneutrale WebP-assets vormen één redactionele familie:

- panoramische Phuket-resorthero met tekstluwte links;
- afzonderlijke sferen voor Patong, Kata/Karon, Kamala, Bang Tao, Rawai/Nai Harn en Old Town;
- gebiedskaarten met beeld, expliciete trade-off en vervoersregel;
- code-native split-stayroute met stippellijn en genummerde waypoints.

Alle assets zijn lokaal geoptimaliseerd naar 1920×900 of 1200×900 en worden via `next/image` responsief geladen.
