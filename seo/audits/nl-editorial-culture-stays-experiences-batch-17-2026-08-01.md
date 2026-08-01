# Audit — NL editorial batch 17

Datum: 1 augustus 2026

## Lifecycle en ownership

| Route | Status | Index | Primaire keyword-owner | Centrale actie |
|---|---|---:|---|---|
| `/nl/blog/phra-pradaeng-songkran-2026-mon-culture-samut-prakan/` | ready, event elapsed | ja | `Phra Pradaeng Songkran` | behouden als lokale Mon-owner |
| `/nl/blog/prince-akatoki-riverside-bangkok-japanese-luxury-hotel-2026/` | ready, status-first | ja | `Prince Akatoki Riverside Bangkok` | geen redirect |
| `/nl/blog/rava-beach-club-phuket-bangtao-longest-beach-club-2026/` | ready, evergreen | ja | `RAVA Beach Club Phuket` | geen redirect |
| `/nl/blog/red-lotus-sea-udon-thani-lisa-effect-record-visitors-2026/` | ready, evergreen destination | ja | `Red Lotus Sea Udon Thani` | geen redirect |
| `/nl/blog/sak-yant-bamboo-tattoo-thailand-guide-2026/` | ready, evergreen safety/culture | ja | `Sak Yant Thailand` | geen redirect |
| `/nl/blog/singapore-airlines-chiang-mai-nonstop-flights-2026/` | archived, superseded | nee | geen nieuwe owner | archive/noindex; redirect niet vereist |
| `/nl/blog/songkran-2026-76-provinces-nationwide-celebrations-guide/` | archived, duplicate en elapsed | nee | geen; hoofdowner bezit intentie | 301 naar `/nl/blog/songkran-festival-2026-guide/` |

## CSV-handoff voor centrale integratie

```csv
route,lifecycle,index,primary_keyword,redirect_target
/nl/blog/phra-pradaeng-songkran-2026-mon-culture-samut-prakan/,ready,true,Phra Pradaeng Songkran,
/nl/blog/prince-akatoki-riverside-bangkok-japanese-luxury-hotel-2026/,ready,true,Prince Akatoki Riverside Bangkok,
/nl/blog/rava-beach-club-phuket-bangtao-longest-beach-club-2026/,ready,true,RAVA Beach Club Phuket,
/nl/blog/red-lotus-sea-udon-thani-lisa-effect-record-visitors-2026/,ready,true,Red Lotus Sea Udon Thani,
/nl/blog/sak-yant-bamboo-tattoo-thailand-guide-2026/,ready,true,Sak Yant Thailand,
/nl/blog/singapore-airlines-chiang-mai-nonstop-flights-2026/,archived,false,,
/nl/blog/songkran-2026-76-provinces-nationwide-celebrations-guide/,archived,false,,/nl/blog/songkran-festival-2026-guide/
```

## Content- en claimcontrole

- Alle bodies zijn volledig natuurlijk Nederlands en bevatten minimaal 500 woorden.
- Verlopen Songkrandata worden uitsluitend als historische data beschreven.
- Prince Akatoki belooft geen openingsdag, operationele faciliteit of vaste kamerprijs.
- De RAVA-superlatief is zichtbaar aan Banyan Tree toegeschreven.
- De Red Lotus Sea-prognose wordt niet als record of definitieve telling gepresenteerd.
- Sak Yant bevat informed-consent-, steriele-materialen-, inkt-, nazorg- en alarmsymptoomchecks; geen religieuze of medische garanties.
- De Singapore Airlines-claim is expliciet gecorrigeerd en noindex.

## Design en assets

- Zeven nieuwe route-eigen heroes, ingebouwd in frontmatter en typed profile.
- Alle bestanden zijn WebP, 1600×900 en 75–192 KB.
- Geen twee indexeerbare routes delen een identiek bestand.
- Premium layouts: event/update, hotel, experience, destination en culture; route-eigen CTA's en modules.

## Canonical, robots en schema

- Iedere typed canonical wijst naar de eigen geldige NL-route.
- Vijf ready-profielen blijven indexeerbaar.
- Beide archived-profielen hebben `seo.noindex: true`; renderer geeft `noindex,follow`.
- BlogPosting, breadcrumbs en profiel-FAQ worden door het gedeelde typed systeem geleverd.

## Affiliatecontrole

- Geen onnatuurlijke affiliateplaatsing toegevoegd.
- Geen vaste prijzen of misleidende boekbaarheid.
- Geen externe commerciële link zonder disclosure; deze batch bevat geen affiliate-CTA.

## Wijzigingsgrenzen

Niet gewijzigd: `family-completion.json`, keyword-ownerbestand, ledger, `next.config.js` en sitemap. Root verwerkt accepted routes, vijf keyword-owners en één geadviseerde 301 centraal.
