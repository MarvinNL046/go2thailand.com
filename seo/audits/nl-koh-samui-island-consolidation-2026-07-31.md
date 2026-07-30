# Consolidatie — Nederlandse Koh Samui-islandalias

**Alias:** `/nl/islands/koh-samui/`  
**Owner:** `/nl/city/koh-samui/`  
**Datum:** 2026-07-31  
**Besluit:** permanente redirect

## Waarom geen tweede redesign?

Beide routes boden dezelfde brede bestemmingstaak: Koh Samui begrijpen, gebieden kiezen, reisduur, stranden, vervoer, budgetcontext en de vraag of het eiland de moeite waard is. “City” en “island” vormen hier geen afzonderlijke zoekintenties.

De city-owner heeft al drie zelfstandige DFS-clusters met 307 keywords en 50 concurrentdomeinen, twee live SERPs, tien echte PAA, vijf concurrentieparses en herhaalde ranking- en backlinkchecks. De meest recente exacte ownercheck van 30 juli 2026 vond geen actieve ranking of backlinks; er is daarom geen URL-signaal dat splitsing rechtvaardigt. Voor de islandalias bestaan evenmin afzonderlijke ranking-, backlink- of GA4-signalen in de lokale evidence.

## Implementatie

- Permanente Next.js-redirect van de NL islandalias naar de bestaande NL city-owner.
- Interne NL-linknormalisatie wijst direct naar `/city/koh-samui/` zonder redirect-hop.
- Alias verwijderd uit de Nederlandse sitemap.
- Engelse island- en cityroutes blijven onaangeraakt tot hun zelfstandige Engelse onderzoekscyclus.

## Behouden specialistische owners

`/nl/city/koh-samui/attractions/`, `/weather/`, `/food/`, `/best-hotels/koh-samui/` en Wat Plai Laem blijven zelfstandige, reeds onderzochte taken.
