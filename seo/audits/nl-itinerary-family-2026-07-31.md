# Nederlandse reisroutefamilie — definitieve acceptatie

Datum: 31 juli 2026

## Scope en ownergrenzen

De familie omvat **15/15 routes**: de directory `/nl/itineraries/` plus veertien detailowners voor 3, 5, 7, 10 en 14 dagen en de afzonderlijke Mekongroute. Iedere owner bezit één duur-netwerkcombinatie. Regio- en bestemmingspagina’s bezitten plaatscontext; weerowners bezitten klimaatbeslissingen; deze familie bezit hotelbases, dagtaken, overgangen en flexibele route-uitvoering.

## Research en contentkwaliteit

- `seo/research/nl/2026-07-31-thailand-itinerary-family-browser-brief.md` legt acht zichtbare Google Nederland-SERPs, echte PAA, concurrentiepatronen en primaire bronnen vast.
- Bestaande lokale DFS-signalen zijn creditzuinig hergebruikt; nieuw bewijs is correct als Browser/primair brononderzoek gelabeld.
- Veertien exacte detailowners en één directoryowner staan in `seo/keywords-nl.csv`; cannibalisatiecontrole meldt nul fouten en nul waarschuwingen.
- De Nederlandse template rendert de oude JSON-prijzen, budgettabellen, vaste transferduren, absolute beste-claims en garanties niet.
- Iedere route begrenst hotelbases, behandelt een lange overgang als keten en geeft conditionele berg-, park- of zeedagen een gelijkwaardig alternatief.
- Golf, Andaman, Mekonggrens en noord-zuidroutes blijven afzonderlijke vervoers- en conditienetwerken.

## Design, functionaliteit en affiliates

- `NlItinerariesDirectory` biedt werkende duur- en netwerkfilters, veertien visuele kaarten, keuze-uitleg, FAQ en routebronnen.
- `NlItineraryGuideTemplate` rendert voor alle veertien owners hotelbases, dagtijdlijn, beslisregels, flexcards, overdrachten, voorbereiding, FAQ en natuurlijke vervolglinks.
- Bestaande premium route- en bestemmingassets zijn bewust hergebruikt waar zij exact dezelfde corridor tonen; iedere kaart krijgt de passende ownerillustratie en alttekst.
- Trip.com, 12Go en Klook verschijnen alleen na de routebeslissing met actuele-opties-CTA, disclosure en `noopener noreferrer nofollow sponsored`. Amazon is niet geforceerd op brede route-intentie.

## Verificatie

- TypeScript zonder emit: groen.
- `npm run design:verify`: groen en bewaakt 14 detailowners, directory, schema, affiliate-relaties en verboden legacyclaims.
- `npm run affiliate:verify`: groen.
- `npm run seo:cannibalization`: 0 harde collisions en 0 waarschuwingen.
- Browser desktop-QA: directoryfilter *3 dagen* reduceert correct naar drie routes; desktopdetail heeft premium hero, schema en nul overflow.
- Browser mobile-QA: 14-daagse owner op 390 × 844, minimaal 44 px touchdoelen, nul overflow en leesbare geopende FAQ.
- De sitebrede audit vond één 308-link naar een oude Bangkokgids; die is vervangen door de directe attractie-owner. Definitief resultaat: **702/702** NL-sitemaproutes zonder harde fouten en zonder waarschuwingen.
- Design coverage: **703/703** premium signatures, 0 hybrid en **175 exacte Nederlandse owners**.

## Uitkomst

De Nederlandse reisroutefamilie is gesloten: **15/15** routes hebben zelfstandige Nederlandse research, een reusable premium implementatie, transparante actuele affiliate-uitgangen en volledige technische en responsieve acceptatie.
