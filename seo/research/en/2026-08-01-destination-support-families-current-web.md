# English destination-support families — current-web refresh

Date: 2026-08-01

## Owner boundaries and search intent

- `/city/` owns destination discovery: choose a Thai place by region, trip shape and practical fit. It must not compete with a single city guide or claim an objective “best”.
- `/city/{city}/attractions/` owns the attraction shortlist and route-planning overview for that city. A card links to a detail page only when a real detail owner exists; otherwise it resolves to the card anchor.
- `/city/{city}/weather/` owns monthly planning context for that city. Dedicated evidence-led owners render where available; the fallback owns only broad planning averages and must never present those values as a live forecast or a guarantee.
- `/` owns broad Thailand inspiration and the first destination hand-off.
- `/compare/phuket-vs-krabi/` owns the independently researched head-to-head decision. The retired programmatic comparison directory remains outside this accepted family.

## Existing research reused

The repository already contains independent English destination briefs for the indexed cities, dedicated English weather research for Phuket and Koh Samui, the Thailand weather owner, and the evidence-led Phuket–Krabi comparison component. This pass reused those owners instead of creating a second keyword target.

## Current primary-source refresh

- Thai Meteorological Department weather and warnings: https://www.tmd.go.th/en/Weather
- Thai Meteorological Department forecast products: https://tmd.go.th/en/forecast/forecastWeather
- Tourism Authority of Thailand climate overview: https://www.tourismthailand.org/Plan-Your-Trip/Weather
- Tourism Authority of Thailand destination directory: https://www.tourismthailand.org/Destinations
- UK FCDO Thailand travel advice: https://www.gov.uk/foreign-travel-advice/thailand

The refresh confirms why climate context and current conditions need separate wording: TMD exposes daily, seven-day, monthly, seasonal, marine and warning products, while TAT gives only broad national climate framing. Current safety advice is explicitly changeable and should be linked rather than paraphrased into evergreen destination copy.

## Editorial decisions

- Avoid year-stamped evergreen destination and attraction titles.
- Derive fallback weather extrema from the page dataset rather than hard-coding April, December, September and January for every city.
- State that fallback weather values are planning data, not a travel-date forecast; hand current decisions to TMD.
- Avoid “perfect weather”, guaranteed low prices and guaranteed low crowds.
- Preserve optional, disclosed affiliate hand-offs after the editorial decision; affiliate availability does not control list order.
