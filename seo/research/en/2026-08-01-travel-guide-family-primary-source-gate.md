# English travel-guide family — primary-source and freshness gate

Reviewed: 2026-08-01

## Scope

This review covers the 74 routes assigned to `en:travel-guide`: 40 city itinerary owners, 24 `/travel-guides/*` topic owners and 10 top-level planning/index routes.

## Current primary verification paths

- Thailand Immigration Bureau, TDAC guide: <https://tdac.immigration.go.th/manual/en/>
  - Live review confirmed the official form, submission/update workflow and explicit warning that TDAC is not a visa.
- Ministry of Foreign Affairs, official Thai e-Visa portal: <https://www.thaievisa.go.th/>
  - Use for the current application route; eligibility cannot be generalized across passports and residence countries.
- Thai Meteorological Department: <https://www.tmd.go.th/en/>
  - Live review confirmed daily, seven-day, monthly, seasonal, warning and marine-weather products. Forecast claims belong here, not in a static guide.
- CDC Thailand traveler view: <https://wwwnc.cdc.gov/travel/destinations/traveler/none/thailand>
  - Live review confirmed that health guidance varies by itinerary, activity and traveller; individual advice remains clinician-led.
- Tourism Authority of Thailand: <https://www.tourismthailand.org/>
  - Official destination context only. It does not prove a particular operator, live opening time, fare or availability.

## Editorial decisions

1. The legacy generic English JSON cannot be treated as current evidence. It contains frozen exchange rates, visa durations/fees, price bands, rankings and broad safety language without a source trail.
2. The new generic English owner therefore retains only the useful topic headings. It does not render the unsupported body copy, tables, calendars or FAQ answers.
3. City itinerary pages are sequencing frameworks. Existing city-source records establish context; fares, schedules, access, weather and provider details are explicitly live checks.
4. Affiliate links appear only where a destination-specific partner set exists and only after the editorial decision. Every such link is labelled, uses `nofollow sponsored`, and tells the reader to check the actual provider and total.
5. Generic evidence pages have no product affiliate block: the source review does not support a product-level recommendation.

## Static-owner closure

The final twelve legacy English routes now render through `StaticTravelGuideOwnerEn`. Each route has a distinct intent, decision checklist, natural internal links and the relevant subset of the verification paths above. Legacy volatile copy is no longer part of the visible English article. Only the activities owner exposes a Klook comparison link; the other eleven routes do not force an affiliate placement.
