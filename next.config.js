/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  // Houd zware statische assets uit de serverless-function-bundles. Een
  // eerdere cron traceerde circa 256 MB en overschreed de functielimiet.
  outputFileTracingExcludes: {
    '*': [
      'public/images/**',
      'public/qrcodes/**',
      'public/affiliate-qrcodes/**',
      'public/pinterest/**',
      'content/blog/**',
    ],
  },
  reactStrictMode: true,
  trailingSlash: true,
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    localeDetection: false, // We want full control over language selection
  },
  images: {
    // Optimized for local images only
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
    ],
  },
  generateBuildId: async () => {
    return 'go2-thailand-' + new Date().toISOString().split('T')[0]
  },
  // Enable ISR for dynamic content updates
  async rewrites() {
    return []
  },
  async redirects() {
    return [
      // The researched NL visa hub owns broad visa and entry-requirement
      // intent. TDAC keeps one dedicated structured spoke; generated blog
      // duplicates consolidate without changing any English route.
      {
        source: '/nl/blog/thailand-visa-voor-nederlanders-2026-wat-je-nodig-hebt/',
        destination: '/nl/visa/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-visa-nederlanders-2026/',
        destination: '/nl/visa/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-visa-nederlanders-2026-wat-je-nodig-hebt/',
        destination: '/nl/visa/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-visa-guide-2026/',
        destination: '/nl/visa/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-digital-arrival-card-tdac-guide/',
        destination: '/nl/visa/digital-arrival-card/',
        permanent: true,
        locale: false,
      },
      // DTV requirements stay on the visa spoke. The broader nomad-city,
      // cost and infrastructure intent belongs to the existing NL index.
      {
        source: '/nl/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities/',
        destination: '/nl/thailand-index/digital-nomad/',
        permanent: true,
        locale: false,
      },
      // Consolidate broad NL safety intent into the researched owner while
      // retaining the dedicated scams guide as its supporting spoke.
      {
        source: '/nl/thailand-index/safety/',
        destination: '/nl/is-thailand-safe/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/is-thailand-safe-tourists-2026/',
        destination: '/nl/is-thailand-safe/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-travel-scams-2026/',
        destination: '/nl/practical-info/scams-safety/',
        permanent: true,
        locale: false,
      },
      // The established NL weather URL owns the broad weather, climate,
      // rainy-season and best-time intent. Preserve all English routes until
      // their separate research phase.
      {
        source: '/nl/travel-guides/thailand-weather/',
        destination: '/nl/weather/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/thailand-index/best-time/',
        destination: '/nl/weather/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/best-time-to-visit/',
        destination: '/nl/weather/',
        permanent: true,
        locale: false,
      },
      // NL itinerary intent is owned by the researched pillar. Keep EN
      // untouched until the separate English research and redesign phase.
      {
        source: '/nl/itinerary/',
        destination: '/nl/thailand-itinerary/',
        permanent: true,
        locale: false,
      },
      // Consolidate broad NL Thailand-cost intent into the researched,
      // interactive budget owner. Duration-specific spokes stay separate.
      {
        source: '/nl/budget-travel/',
        destination: '/nl/thailand-index/budget/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-budget-2026-daily-costs/',
        destination: '/nl/thailand-index/budget/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-cheap-2026-travel-costs/',
        destination: '/nl/thailand-index/budget/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/blog/thailand-budget-vs-comfort-travel/',
        destination: '/nl/thailand-index/budget/',
        permanent: true,
        locale: false,
      },
      // NL Krabi accommodation intent is consolidated into the researched
      // area-first hotel guide. Keep EN untouched until its own DFS phase.
      {
        source: '/nl/where-to-stay/krabi/',
        destination: '/nl/best-hotels/krabi/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/where-to-stay/phuket/',
        destination: '/nl/best-hotels/phuket/',
        permanent: true,
        locale: false,
      },
      // The researched NL Phuket owner is the richer attractions guide.
      // Keep the English ranking route untouched until the English DFS phase.
      {
        source: '/nl/city/phuket/top-10-attractions/',
        destination: '/nl/city/phuket/attractions/',
        permanent: true,
        locale: false,
      },
      {
        source: '/nl/city/bangkok/top-10-attractions/',
        destination: '/nl/city/bangkok/attractions/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL
      // Lopburi travel-guide route. The researched city owner now carries
      // broad destination intent; keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/lopburi/',
        destination: '/nl/city/lopburi/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Ubon
      // Ratchathani travel-guide route. Consolidate broad destination intent
      // into the researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/ubon-ratchathani/',
        destination: '/nl/city/ubon-ratchathani/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Korat
      // travel-guide route. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/nakhon-ratchasima/',
        destination: '/nl/city/nakhon-ratchasima/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Nong
      // Khai travel-guide route. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/nong-khai/',
        destination: '/nl/city/nong-khai/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Chiang
      // Khan travel-guide route. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/chiang-khan/',
        destination: '/nl/city/chiang-khan/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Nakhon
      // Si Thammarat travel guide. Consolidate broad destination intent into
      // the researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/nakhon-si-thammarat/',
        destination: '/nl/city/nakhon-si-thammarat/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Nakhon
      // Phanom travel guide. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/nakhon-phanom/',
        destination: '/nl/city/nakhon-phanom/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL
      // Mukdahan travel guide. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/mukdahan/',
        destination: '/nl/city/mukdahan/',
        permanent: true,
        locale: false,
      },
      // DFS found no rankings or backlink signal for the duplicate NL Bueng
      // Kan travel guide. Consolidate broad destination intent into the
      // researched city owner and keep the English route untouched.
      {
        source: '/nl/guides/travel-guide/bueng-kan/',
        destination: '/nl/city/bueng-kan/',
        permanent: true,
        locale: false,
      },
      // Broad Koh Samet intent belongs to the island pillar, not to a Rayong
      // attraction-detail duplicate. Preserve its existing ranking signal.
      {
        source: '/nl/city/rayong/attractions/koh-samet/',
        destination: '/nl/islands/koh-samet/',
        permanent: true,
        locale: false,
      },
      // Old URL patterns
      {
        source: '/cities/:slug*/',
        destination: '/city/:slug*/',
        permanent: true,
      },
      // Flights spoke URLs — dropped /from/ filler (was /flights-to-phuket/from/<X>/)
      {
        source: '/flights-to-phuket/from/:origin/',
        destination: '/flights-to-phuket/:origin/',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/',
        permanent: true,
      },
      // Self-referencing transport route bug
      {
        source: '/transport/bangkok-to-bangkok/',
        destination: '/transport/',
        permanent: true,
      },
      // Koh Samui requires going through Surat Thani
      {
        source: '/transport/bangkok-to-koh-samui/',
        destination: '/transport/bangkok-to-surat-thani/',
        permanent: true,
      },
      // Old island URL referenced in blog posts
      {
        source: '/islands/phuket/',
        destination: '/city/phuket/',
        permanent: true,
      },
      // Consolidate duplicate section URLs to canonical city pages
      {
        source: '/destinations/:slug/',
        destination: '/city/:slug/',
        permanent: true,
      },
      {
        source: '/things-to-do/:slug/',
        destination: '/city/:slug/attractions/',
        permanent: true,
      },
      // PSEO canonical: /best-hotels/[city] is THE hotels-per-city page.
      // The cluster-based template at /best-hotels/[slug] (data/clusters/<city>/hotels.json)
      // gives a deeper review than the city subpage, so we point the city
      // hotel routes at it instead of the other way around.
      {
        source: '/city/:slug/hotels/',
        destination: '/best-hotels/:slug/',
        permanent: true,
      },
      {
        source: '/city/:slug/top-10-hotels/',
        destination: '/best-hotels/:slug/',
        permanent: true,
      },
      // Canonical accommodation architecture lives under /where-to-stay/.
      {
        source: '/guides/where-to-stay/',
        destination: '/where-to-stay/',
        permanent: true,
      },
      {
        source: '/guides/where-to-stay/:slug/',
        destination: '/where-to-stay/:slug/',
        permanent: true,
      },
      // Travel insurance duplicate URL → canonical page
      {
        source: '/travel-insurance-thailand/',
        destination: '/travel-insurance/',
        permanent: true,
      },
      // Unsupported locales → English equivalent (we only serve en + nl)
      { source: '/ja/:path*', destination: '/:path*', permanent: true },
      { source: '/ko/:path*', destination: '/:path*', permanent: true },
      { source: '/zh/:path*', destination: '/:path*', permanent: true },
      { source: '/ru/:path*', destination: '/:path*', permanent: true },
      { source: '/th/:path*', destination: '/:path*', permanent: true },
    ]
  },
}

module.exports = nextConfig
