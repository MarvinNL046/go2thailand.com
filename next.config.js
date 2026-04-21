/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
      // Old URL patterns
      {
        source: '/cities/:slug*/',
        destination: '/city/:slug*/',
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
  // Optimize for Vercel deployment
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig
