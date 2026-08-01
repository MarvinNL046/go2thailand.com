# Nederlandse Kata-owner — finale audit

**Route:** `/nl/phuket/kata/`
**Status:** exact owner, premium en production-ready gecontroleerd

- Zelfstandige `KataAreaGuideNl` gebruikt het tweetalige premium `PhuketAreaGuideTemplate`; de oude generieke pagina is vervangen door een dunne locale-wrapper.
- De owner bewaart de bestaande URL en positie-79-ranking voor `kata beach phuket`, maar verwijdert vaste prijzen, percentages, reistijden, golfhoogtes en universele zwemclaims.
- HTTP 200 voor NL- en EN-owner, Karon-sibling, surfspoke en Kata Noi-spoke.
- Browser-QA: `lang=nl`, vijf schemas, vijf sponsored links, geen echte Engelse UI-lekken, geen legacyclaims en geen horizontale overflow op 1265 of 360 px.
- Mobiele zoekpil en bottom navigation blijven intact; hero, micro-zones, ritme, vergelijking en bronnen renderen in het premium designsysteem.
- TypeScript, design-, affiliate- en cannibalisatiegates zijn groen.
- Geen Amazon-product geforceerd: de gebiedskeuze wordt beter opgelost door kaart-, hotel-, vervoers- en actuele activiteitschecks.
