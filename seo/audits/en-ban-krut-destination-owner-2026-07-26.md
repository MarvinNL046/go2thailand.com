# English Ban Krut destination owner audit — 2026-07-26

## Outcome

The English Ban Krut destination owner was rebuilt on the locale-aware premium destination template and the legacy English blog owner was consolidated.

## Verified implementation

- `/city/ban-krut/` returns 200.
- `/nl/city/ban-krut/` still returns 200 on the same shared template.
- `/blog/ban-krut-beach-guide-hidden-gem-prachuap-2026/` returns a permanent 308 to `/city/ban-krut/`.
- Canonical: `https://go2-thailand.com/city/ban-krut/`.
- Hreflang: reciprocal English, Dutch and x-default URLs are present.
- Schema types: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` and `WebPage`.
- All six exact PAA questions occur twice in SSR HTML: once visibly and once in FAQ JSON-LD.
- Desktop has no horizontal overflow (`1265` document width within a `1280` viewport).
- Mobile has no horizontal overflow (`375` rendered document width within a `390` viewport).
- All 17 lazy and priority images load after a full-page scroll; no broken image remains.
- English related-guide and source labels contain no Dutch leakage.
- Every rendered internal pathname returns 200; unavailable Ban Krut hotel/weather child URLs normalize to relevant owner sections.
- Trip.com, Klook and 12Go links include `noopener noreferrer nofollow sponsored` and no frozen price or rating.
- The old and new English Ban Krut URLs returned no owned DFS rankings or backlinks at capture time, so the consolidation preserves rather than discards known external signals.
- TypeScript passes with `npx tsc --noEmit --incremental false`.

## Visual/content decisions

- Reuses five dedicated Ban Krut image assets for hero, coast zones, Wat Thang Sai, seafood and the route banner.
- Keeps the premium editorial rhythm: decision-led hero, quick answer, four area cards, immersive route banner, three trip contrasts, food context, itinerary, practical cards, exact-PAA accordion, related guides and sourced method section.
- Destination commerce remains limited to contextually relevant Trip.com, Klook and 12Go choices. Amazon cookware is reserved for recipe and food owners where it solves a visible cooking task.
