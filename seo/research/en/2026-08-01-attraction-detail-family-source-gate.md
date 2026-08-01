# English attraction-detail family: source gate

Date checked: 2026-08-01
Scope: the 70 English `/city/{city}/attractions/{attraction}/` URLs in the current sitemap.

## Method

- Enumerated the route family from `public/sitemap.xml` and resolved each route to its enhanced or base JSON record.
- Checked every record for editorial sources, official-site links, volatile opening-hour and admission fields, local image existence and body depth.
- Checked current web results for the one exact premium owner, Wat Plai Laem. The current Tourism Authority of Thailand Koh Samui destination page confirms destination context but does not publish a dependable venue timetable or admission price. Other current results disagree or are secondary. The page therefore correctly qualifies access and avoids a fixed timetable.
- Treated a source that establishes identity or heritage as insufficient proof of a current price or opening schedule.

## Primary/current evidence sampled

- Tourism Authority of Thailand, Koh Samui province: https://www.tourismthailand.org/Destinations/Provinces/Ko-Samui/360
- Tourism Authority of Thailand, Koh Samui itinerary: https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/ko-samui-surat-thani-4-days
- Tourism Authority of Thailand (Japan), Wat Plai Laem: https://www.thailandtravel.or.jp/wat-plai-laem/

## Static findings

- 70 sitemap routes inspected.
- 70/70 hero images resolve to local files.
- 70/70 records contain an opening-hours field and numeric admission field, but these fields do not carry claim-level verification dates.
- 29/70 records contain at least one valid editorial source URL.
- 41/70 records have no editorial source URL and are now safely gated with `noindex, follow`.
- 12/70 expose an official website field. This is used only as a live-check destination, not as proof that the stored hours or price are current.
- 68 routes are correctly registered as English-only; 2 have a reciprocal locale owner in the generated hreflang registry.
- 0 missing local attraction images.

## Publishing policy applied

The legacy template no longer renders stored prices or opening hours as current facts and no longer emits those values as `Offer`, `isAccessibleForFree` or `openingHours` schema. It tells readers to verify hours and admission with the venue. Unsupported records are `noindex, follow` and receive no affiliate modules. Source-backed pages need at least 300 words before commercial modules are eligible.

The exact Wat Plai Laem owner remains indexable. Its visitor guidance uses qualified language, includes full BreadcrumbList, TouristAttraction, FAQPage and WebPage schema, and labels Klook links as sponsored affiliate links.
