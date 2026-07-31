/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  // Houd zware statische assets uit de serverless-function-bundles. Een
  // eerdere cron traceerde circa 256 MB en overschreed de functielimiet.
  outputFileTracingExcludes: {
    "*": [
      "public/images/**",
      "public/qrcodes/**",
      "public/affiliate-qrcodes/**",
      "public/pinterest/**",
      "content/blog/**",
    ],
  },
  reactStrictMode: true,
  trailingSlash: true,
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
    localeDetection: false, // We want full control over language selection
  },
  images: {
    // Optimized for local images only
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
    ],
  },
  generateBuildId: async () => {
    return "go2-thailand-" + new Date().toISOString().split("T")[0];
  },
  // Enable ISR for dynamic content updates
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      // Retire five broad NL manual duplicates in favour of the independently
      // researched owners. Preserve every English URL until its own phase.
      {
        source: "/nl/thailand-street-food/",
        destination: "/nl/food/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/esim/",
        destination: "/nl/travel-guides/sim-card-thailand/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/best-diving-snorkeling-in-thailand/",
        destination: "/nl/travel-guides/diving-snorkeling-thailand/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/phi-phi-island-tour/",
        destination: "/nl/phuket-tours/phi-phi-day-trip/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/best-places-to-visit-thailand/",
        destination: "/nl/city/",
        permanent: true,
        locale: false,
      },
      // Retire the old bilingual budget landing page in favour of the
      // independently researched locale owners.
      {
        source: "/budget-travel/",
        destination: "/thailand-index/budget/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/budget-travel/",
        destination: "/nl/thailand-index/budget/",
        permanent: true,
        locale: false,
      },
      {
        source: "/practical-info/packing-list/",
        destination: "/travel-gear/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/practical-info/packing-list/",
        destination: "/nl/travel-gear/",
        permanent: true,
        locale: false,
      },
      {
        source: "/thailand-index/safety/",
        destination: "/is-thailand-safe/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/thailand-index/safety/",
        destination: "/nl/is-thailand-safe/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/thailand-index/transport/",
        destination: "/nl/transport/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/thailand-itinerary/",
        destination: "/nl/itineraries/",
        permanent: true,
        locale: false,
      },
      // No Dutch translation exists for this English comparison owner. The
      // locale fallback previously exposed a duplicate /nl/ URL to search.
      {
        source:
          "/nl/blog/thailand-vs-philippines-which-southeast-asian-paradise-to-choose/",
        destination:
          "/blog/thailand-vs-philippines-which-southeast-asian-paradise-to-choose/",
        permanent: true,
        locale: false,
      },
      // English duplicate owners consolidate into the stronger, more recent
      // editorial route while preserving signals from the older URL.
      {
        source: "/blog/thailand-health-vaccinations/",
        destination: "/blog/thailand-health-vaccinations-doctors-recommend/",
        permanent: true,
        locale: false,
      },
      {
        source: "/blog/thailand-king-cobra-season/",
        destination: "/blog/thailand-king-cobra-season-travelers-guide/",
        permanent: true,
        locale: false,
      },
      {
        source: "/blog/where-to-stay-chiang-mai-neighborhoods/",
        destination: "/where-to-stay/chiang-mai/",
        permanent: true,
        locale: false,
      },
      // This generated record points to a Kanchanaburi property under a Nan
      // slug. Send visitors to the verified Nan hotel shortlist instead.
      {
        source: "/hotel/dheva-mantra-resort-spa-nan/",
        destination: "/best-hotels/nan/",
        permanent: true,
        locale: false,
      },
      // The researched NL visa hub owns broad visa and entry-requirement
      // intent. TDAC keeps one dedicated structured spoke; generated blog
      // duplicates consolidate without changing any English route.
      {
        source:
          "/nl/blog/thailand-visa-voor-nederlanders-2026-wat-je-nodig-hebt/",
        destination: "/nl/visa/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-visa-nederlanders-2026/",
        destination: "/nl/visa/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-visa-nederlanders-2026-wat-je-nodig-hebt/",
        destination: "/nl/visa/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-visa-guide-2026/",
        destination: "/nl/visa/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-digital-arrival-card-tdac-guide/",
        destination: "/nl/visa/digital-arrival-card/",
        permanent: true,
        locale: false,
      },
      // DTV requirements stay on the visa spoke. The broader nomad-city,
      // cost and infrastructure intent belongs to the existing NL index.
      {
        source: "/nl/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities/",
        destination: "/nl/thailand-index/digital-nomad/",
        permanent: true,
        locale: false,
      },
      // Consolidate broad NL safety intent into the researched owner while
      // retaining the dedicated scams guide as its supporting spoke.
      {
        source: "/nl/thailand-index/safety/",
        destination: "/nl/is-thailand-safe/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/is-thailand-safe-tourists-2026/",
        destination: "/nl/is-thailand-safe/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-travel-scams-2026/",
        destination: "/nl/practical-info/scams-safety/",
        permanent: true,
        locale: false,
      },
      // Retire five NL editorial duplicates after explicit owner review. The
      // established island, beach and practical guides retain canonical intent.
      {
        source: "/nl/blog/koh-tao-guide-diving-beaches-budget-travel/",
        destination: "/nl/islands/koh-tao/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/koh-chang-guide-thailand-eastern-island/",
        destination: "/nl/islands/koh-chang/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/best-beaches-thailand/",
        destination: "/nl/best-beaches-in-thailand/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/15-hidden-gems-thailand-tourists-miss/",
        destination: "/nl/travel-guides/hidden-gems-off-beaten-path-thailand/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/solo-female-travel-thailand-safety-tips/",
        destination: "/nl/travel-guides/solo-female-travel-thailand/",
        permanent: true,
        locale: false,
      },
      // Independent EN research preserves the ranking broad owner, the
      // ranking scams spoke and the specialist solo-female guide. Retire
      // only the zero-signal duplicates after their own checks.
      {
        source: "/thailand-index/safety/",
        destination: "/is-thailand-safe/",
        permanent: true,
        locale: false,
      },
      {
        source: "/blog/is-thailand-safe-tourists-2026/",
        destination: "/is-thailand-safe/",
        permanent: true,
        locale: false,
      },
      {
        source: "/blog/thailand-travel-scams-2026/",
        destination: "/practical-info/scams-safety/",
        permanent: true,
        locale: false,
      },
      {
        source: "/blog/solo-female-travel-thailand-safety-tips/",
        destination: "/travel-guides/solo-female-travel-thailand/",
        permanent: true,
        locale: false,
      },
      // The dated K-pop roundup has no ranking or backlink signal and became
      // stale after its headline events passed. Consolidate it into the
      // independently researched, current BTS Bangkok owner in English only.
      {
        source:
          "/blog/kpop-concerts-bangkok-2026-seventeen-treasure-bts-guide/",
        destination:
          "/blog/bts-world-tour-bangkok-december-2026-tickets-guide/",
        permanent: true,
        locale: false,
      },
      // The researched practical-info owner carries broad NL etiquette,
      // temple, wai and social-custom intent. Preserve the English guide
      // until its own English research and redesign phase.
      {
        source: "/nl/travel-guides/thai-etiquette-dos-donts/",
        destination: "/nl/practical-info/etiquette-culture/",
        permanent: true,
        locale: false,
      },
      // The practical-info guide owns broad NL Thailand vaccination and
      // travel-health preparation intent. Keep the hospital-care spoke and
      // every English route untouched until their own research phase.
      {
        source: "/nl/travel-guides/vaccinations-travel-health-thailand/",
        destination: "/nl/practical-info/health-vaccinations/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-health-vaccinations/",
        destination: "/nl/practical-info/health-vaccinations/",
        permanent: true,
        locale: false,
      },
      // The researched food hub owns broad NL Thai-food and eating-in-
      // Thailand intent. Keep vegetarian, drink, dish and city-food pages as
      // focused spokes, and preserve the English cuisine guide for its own
      // English research phase.
      {
        source: "/nl/travel-guides/thai-cuisine-food-guide/",
        destination: "/nl/food/",
        permanent: true,
        locale: false,
      },
      // The established NL weather URL owns the broad weather, climate,
      // rainy-season and best-time intent. Preserve all English routes until
      // their separate research phase.
      {
        source: "/nl/travel-guides/thailand-weather/",
        destination: "/nl/weather/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/thailand-index/best-time/",
        destination: "/nl/weather/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/best-time-to-visit/",
        destination: "/nl/weather/",
        permanent: true,
        locale: false,
      },
      // The five researched NL city weather pages combine climate, monthly
      // weather and best-time intent. Consolidate their legacy duplicate
      // owners while leaving every English route untouched.
      {
        source: "/nl/city/bangkok/best-time-to-visit/",
        destination: "/nl/city/bangkok/weather/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/chiang-mai/best-time-to-visit/",
        destination: "/nl/city/chiang-mai/weather/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/krabi/best-time-to-visit/",
        destination: "/nl/city/krabi/weather/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/phuket/best-time-to-visit/",
        destination: "/nl/city/phuket/weather/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/koh-samui/best-time-to-visit/",
        destination: "/nl/city/koh-samui/weather/",
        permanent: true,
        locale: false,
      },
      // The independently researched NL city owner already owns the complete
      // Koh Samui destination intent. Do not keep a second broad island URL.
      {
        source: "/nl/islands/koh-samui/",
        destination: "/nl/city/koh-samui/",
        permanent: true,
        locale: false,
      },
      // Independent EN research found identical weather/best-time intent and
      // no ranking or backlink equity on either URL. Keep one paired owner.
      {
        source: "/city/koh-samui/best-time-to-visit/",
        destination: "/city/koh-samui/weather/",
        permanent: true,
        locale: false,
      },
      {
        source: "/city/phuket/best-time-to-visit/",
        destination: "/city/phuket/weather/",
        permanent: true,
        locale: false,
      },
      // NL itinerary intent is owned by the researched pillar. Keep EN
      // untouched until the separate English research and redesign phase.
      {
        source: "/nl/itinerary/",
        destination: "/nl/itineraries/",
        permanent: true,
        locale: false,
      },
      // Consolidate broad NL Thailand-cost intent into the researched,
      // interactive budget owner. Duration-specific spokes stay separate.
      {
        source: "/nl/budget-travel/",
        destination: "/nl/thailand-index/budget/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-budget-2026-daily-costs/",
        destination: "/nl/thailand-index/budget/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-cheap-2026-travel-costs/",
        destination: "/nl/thailand-index/budget/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/blog/thailand-budget-vs-comfort-travel/",
        destination: "/nl/thailand-index/budget/",
        permanent: true,
        locale: false,
      },
      // The seven researched NL accommodation owners combine area choice and
      // hotel selection. Consolidate old where-to-stay aliases while keeping
      // all English routes untouched until their independent DFS phase.
      {
        source: "/nl/where-to-stay/krabi/",
        destination: "/nl/best-hotels/krabi/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/where-to-stay/phuket/",
        destination: "/nl/best-hotels/phuket/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/where-to-stay/bangkok/",
        destination: "/nl/best-hotels/bangkok/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/where-to-stay/chiang-mai/",
        destination: "/nl/best-hotels/chiang-mai/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/where-to-stay/koh-samui/",
        destination: "/nl/best-hotels/koh-samui/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/where-to-stay/khao-sok/",
        destination: "/nl/best-hotels/khao-sok/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/where-to-stay/koh-tao/",
        destination: "/nl/best-hotels/koh-tao/",
        permanent: true,
        locale: false,
      },
      // Koh Tao is an island owner, not a city owner. DFS found no ranking or
      // backlink signal on the old city URL. Consolidate the former route
      // family into the researched NL island cluster; keep EN untouched.
      {
        source: "/nl/city/koh-tao/",
        destination: "/nl/islands/koh-tao/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/koh-tao/attractions/",
        destination: "/nl/islands/koh-tao/attractions/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/koh-tao/top-10-attractions/",
        destination: "/nl/islands/koh-tao/attractions/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/koh-tao/diving/",
        destination: "/nl/islands/koh-tao/diving/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/koh-tao/snorkeling/",
        destination: "/nl/islands/koh-tao/snorkeling/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/travel-guides/koh-tao/",
        destination: "/nl/islands/koh-tao/",
        permanent: true,
        locale: false,
      },
      // The researched NL Phuket owner is the richer attractions guide.
      // Keep the English ranking route untouched until the English DFS phase.
      {
        source: "/nl/city/phuket/top-10-attractions/",
        destination: "/nl/city/phuket/attractions/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/city/bangkok/top-10-attractions/",
        destination: "/nl/city/bangkok/attractions/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL
      // Lopburi travel-guide route. The researched city owner now carries
      // broad destination intent; keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/lopburi/",
        destination: "/nl/city/lopburi/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Ubon
      // Ratchathani travel-guide route. Consolidate broad destination intent
      // into the researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/ubon-ratchathani/",
        destination: "/nl/city/ubon-ratchathani/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Korat
      // travel-guide route. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/nakhon-ratchasima/",
        destination: "/nl/city/nakhon-ratchasima/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Nong
      // Khai travel-guide route. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/nong-khai/",
        destination: "/nl/city/nong-khai/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Chiang
      // Khan travel-guide route. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/chiang-khan/",
        destination: "/nl/city/chiang-khan/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Nakhon
      // Si Thammarat travel guide. Consolidate broad destination intent into
      // the researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/nakhon-si-thammarat/",
        destination: "/nl/city/nakhon-si-thammarat/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Nakhon
      // Phanom travel guide. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/nakhon-phanom/",
        destination: "/nl/city/nakhon-phanom/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL
      // Mukdahan travel guide. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/mukdahan/",
        destination: "/nl/city/mukdahan/",
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Bueng
      // Kan travel guide. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: "/nl/guides/travel-guide/bueng-kan/",
        destination: "/nl/city/bueng-kan/",
        permanent: true,
        locale: false,
      },
      // Broad Koh Samet intent belongs to the island pillar, not to a Rayong
      // attraction-detail duplicate. Preserve its existing ranking signal.
      {
        source: "/nl/city/rayong/attractions/koh-samet/",
        destination: "/nl/islands/koh-samet/",
        permanent: true,
        locale: false,
      },
      // Old URL patterns
      {
        source: "/cities/:slug*/",
        destination: "/city/:slug*/",
        permanent: true,
      },
      // Flights spoke URLs — dropped /from/ filler (was /flights-to-phuket/from/<X>/)
      {
        source: "/flights-to-phuket/from/:origin/",
        destination: "/flights-to-phuket/:origin/",
        permanent: true,
      },
      // Self-referencing transport route bug
      {
        source: "/transport/bangkok-to-bangkok/",
        destination: "/transport/",
        permanent: true,
      },
      // The researched English blog URL owns the complete Bangkok-Samui
      // journey. NL keeps its existing mainland Surat Thani hand-off.
      {
        source: "/transport/bangkok-to-koh-samui/",
        destination: "/blog/bangkok-to-koh-samui-guide/",
        permanent: true,
        locale: false,
      },
      {
        source: "/nl/transport/bangkok-to-koh-samui/",
        destination: "/nl/transport/bangkok-to-surat-thani/",
        permanent: true,
        locale: false,
      },
      // Old island URL referenced in blog posts
      {
        source: "/islands/phuket/",
        destination: "/city/phuket/",
        permanent: true,
      },
      // Consolidate duplicate section URLs to canonical city pages
      {
        source: "/destinations/:slug/",
        destination: "/city/:slug/",
        permanent: true,
      },
      {
        source: "/things-to-do/:slug/",
        destination: "/city/:slug/attractions/",
        permanent: true,
      },
      // PSEO canonical: /best-hotels/[city] is THE hotels-per-city page.
      // The cluster-based template at /best-hotels/[slug] (data/clusters/<city>/hotels.json)
      // gives a deeper review than the city subpage, so we point the city
      // hotel routes at it instead of the other way around.
      {
        source: "/city/:slug/hotels/",
        destination: "/best-hotels/:slug/",
        permanent: true,
      },
      {
        source: "/city/:slug/top-10-hotels/",
        destination: "/best-hotels/:slug/",
        permanent: true,
      },
      // Canonical accommodation architecture lives under /where-to-stay/.
      {
        source: "/guides/where-to-stay/",
        destination: "/where-to-stay/",
        permanent: true,
      },
      {
        source: "/guides/where-to-stay/:slug/",
        destination: "/where-to-stay/:slug/",
        permanent: true,
      },
      // Travel insurance duplicate URL → canonical page
      {
        source: "/travel-insurance-thailand/",
        destination: "/travel-insurance/",
        permanent: true,
      },
      // Unsupported locales → English equivalent (we only serve en + nl)
      { source: "/ja/:path*", destination: "/:path*", permanent: true },
      { source: "/ko/:path*", destination: "/:path*", permanent: true },
      { source: "/zh/:path*", destination: "/:path*", permanent: true },
      { source: "/ru/:path*", destination: "/:path*", permanent: true },
      { source: "/th/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

module.exports = nextConfig;
