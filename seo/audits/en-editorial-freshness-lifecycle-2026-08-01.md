# English editorial freshness and lifecycle audit — batch 1

Date: 2026-08-01
Scope: 15 active `/blog/` routes
Outcome: 15 converted from future-event framing to explicit historical/recap framing

## Routes reviewed

1. `/blog/andamanda-phuket-day-songkran-pool-party-2026/`
2. `/blog/bangkok-songkran-2026-khaosan-road-safety-plan/`
3. `/blog/earth-hour-2026-bangkok-thailand-landmarks-lights-off/`
4. `/blog/kraftwerk-multimedia-tour-bangkok-may-2026-concert-guide/`
5. `/blog/pattaya-music-festival-2026-free-beach-concerts-march/`
6. `/blog/pattaya-pride-circuit-festival-asia-lgbtq-june-2026/`
7. `/blog/phra-pradaeng-songkran-2026-mon-culture-samut-prakan/`
8. `/blog/royal-ploughing-ceremony-bangkok-may-2026/`
9. `/blog/s2o-songkran-music-festival-2026-bangkok-edm-water-party/`
10. `/blog/siam-songkran-music-festival-2026-bangkok-guide/`
11. `/blog/silom-edge-songkran-2026-bangkok-water-festival-event/`
12. `/blog/songkran-festival-2026-guide/`
13. `/blog/thailand-travel-fair-2026-qsncc-bangkok/`
14. `/blog/thailand-tourism-festival-2026-5-must-do-food-culture-highlights/`
15. `/blog/thailand-tourism-festival-2026-culinary-regional-food-guide/`

## Changes made

- All 15 `lastUpdated` fields set to `2026-08-01`.
- All 15 titles changed from announcement/current-event framing to a clear `Recap` or historical formulation.
- All 15 descriptions changed to past-tense recap intent.
- All 15 bodies now begin with a visible dated status notice.
- Three misleading lead paragraphs were rewritten into past tense (Khaosan Songkran, the general Songkran guide, and Thailand Tourism Festival overview/food guide).
- Existing slugs, categories, tags, images, source lists, internal links and affiliate links were preserved.

## Risk decisions

- No redirects or `noindex` were added: these pages still contain unique historical, cultural and trip-planning value.
- Old ticket prices, event offers, safety plans and line-ups were not presented as current in the new status notices.
- No unverifiable event outcome, attendance figure or future date was added.
- Deeper sentence-by-sentence historical copy remains intact unless its opening context directly misrepresented the event as upcoming.

## Validation evidence

- Frontmatter uniqueness and required-field checks: see command output from the batch handoff.
- Internal link and image preservation: checked by targeted content scan.
- Repository TypeScript/data/design checks: see command output from the batch handoff.

## Remaining English freshness queue

This is deliberately a bounded first batch. Other active 2025/2026 policy, price, aviation, hotel-opening and future-event articles still require separate primary-source lifecycle review; this note does not certify those pages.
