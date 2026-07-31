# Audit — NL editorial events batch 2

Datum: 1 augustus 2026
Scope: exact acht Nederlandse event- en lifecycle-owners.

## Lifecyclebesluit per route

| Route | Status | Robots | Redactionele uitkomst |
|---|---|---|---|
| `/nl/blog/bts-world-tour-bangkok-december-2026-tickets-guide/` | ready / scheduled | index | Bevestigde data en stadion; officiële ticketroute en scamcheck, geen wederverkoop. |
| `/nl/blog/global-wellness-summit-2026-phuket-november/` | ready / scheduled | index | Zakelijke summit helder afgebakend van publiek festival, retreat en hotelpakket. |
| `/nl/blog/s2o-songkran-music-festival-2026-bangkok-edm-water-party/` | archived / elapsed | noindex | Historisch overzicht; oude ticketinformatie en toekomstige taal verwijderd. |
| `/nl/blog/songkran-2026-water-gun-rules-fines-safety-guide/` | archived / elapsed | noindex | Universele boeteclaims verwijderd; consolidatiegrens richting brede Songkran-owner vastgelegd. |
| `/nl/blog/toyota-thailand-open-2026-badminton-bangkok-nimibutr-arena/` | archived / elapsed | noindex | BWF-historie zonder ticket- of reizigersprijsclaim. |
| `/nl/blog/kraftwerk-multimedia-tour-bangkok-may-2026-concert-guide/` | archived / elapsed | noindex | Verlopen concert en verkooppagina uitsluitend als historische bron. |
| `/nl/blog/nasatta-light-festival-ratchaburi-fairy-dreams-2026/` | archived / elapsed | noindex | Einddatum verwerkt; volgende editie wordt niet verondersteld. |
| `/nl/blog/loi-krathong-yi-peng-2026-festival-guide/` | ready / recurring | index | Verschil tussen tradities, lokale programmacontrole en veilige lantaarnregels. |

## Inhoud en ontwerp

- Alle acht legacybodies zijn vervangen door natuurlijk Nederlands zonder mojibake, widgets, raw scripts of fake ervaringsclaims.
- Iedere route gebruikt exact het eigen geoptimaliseerde WebP-asset onder `/images/redesign/editorial/<slug>-hero.webp` in frontmatter én profiel.
- Alle routes hebben een typed eventprofiel met status, peildatum, CTA-ankers, beslisblokken, FAQ en primaire bronnen.
- Verlopen routes bevatten geen affiliate-, ticket- of wederverkoopuitgang.
- Ook de drie actuele routes hebben geen affiliateblok, omdat officiële deelname en ticketvoorwaarden leidend zijn en geen passende affiliatevoorraad is aangetoond.

## Ticket- en prijsbeleid

- Geen vaste ticketprijzen of onbevestigde boetebedragen.
- Geen claim dat registratie, hotel of retreat toegang tot een evenement omvat.
- Geen socialmedia- of secundaire wederverkooplink voor BTS.
- Oude ThaiTicketMajor-informatie bij Kraftwerk staat alleen als historische bron, niet als CTA.
- Eventstatus en toegang moeten opnieuw via de primaire bron worden gecontroleerd.

## QA

| Controle | Resultaat |
|---|---|
| JSON parse en typed loader | 8/8 geslaagd |
| Manifestcluster | 8/8 exact `events` |
| Lifecycle | 3 indexeerbaar ready, 5 archived + noindex |
| Markdown-parser | 8/8 geslaagd |
| Lokale runtime | 8/8 HTTP 200 |
| HTML-taal | 8/8 `lang="nl"` |
| H1 | exact één per route |
| Canonical | 8/8 exact op eigen NL-route |
| Robots | 5 verlopen routes noindex; 3 actuele routes indexeerbaar |
| Route-eigen hero | 8/8 in runtime-HTML en op schijf |
| Interne links | alle gebruikte Nederlandse doelen HTTP 200 |
| Mojibake, scripts, iframes en shortcodepatronen | geen treffers |
| Vaste prijzen, koop-nu-taal en fake ervaring | geen treffers |
| `tsc --noEmit --incremental false` | exit 0 |

## Bronmemo

De statusbesluiten en primaire broncontrole staan in `seo/research/nl/2026-08-01-editorial-events-batch-2-current-web.md`. Er zijn geen DFS-, ranking-, volume- of PAA-claims gebruikt.
