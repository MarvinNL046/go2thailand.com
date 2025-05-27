// Ezoic Ad Unit Configurations for Go2Thailand
export const EZOIC_AD_UNITS = {
  // Homepage ads
  HOMEPAGE_HEADER: 'go2thailand_homepage_header',
  HOMEPAGE_FEATURED: 'go2thailand_homepage_featured',
  HOMEPAGE_MID_CONTENT: 'go2thailand_homepage_mid_content',
  HOMEPAGE_BOTTOM: 'go2thailand_homepage_bottom',
  
  // City index page ads
  CITY_INDEX_BANNER: 'go2thailand_city_index_banner',
  CITY_INDEX_GRID: 'go2thailand_city_index_grid',
  
  // City detail page ads (the money makers! 💰)
  CITY_HEADER_BANNER: 'go2thailand_city_header',
  CITY_SIDEBAR_RECTANGLE: 'go2thailand_city_sidebar_rect',  // Your favorite!
  CITY_SIDEBAR_SKYSCRAPER: 'go2thailand_city_sidebar_sky',
  CITY_IN_CONTENT_1: 'go2thailand_city_content_1',
  CITY_IN_CONTENT_2: 'go2thailand_city_content_2',
  CITY_BOTTOM_BANNER: 'go2thailand_city_bottom',
  
  // Category page ads
  ATTRACTIONS_BANNER: 'go2thailand_attractions_banner',
  FOOD_BANNER: 'go2thailand_food_banner',
  HOTELS_BANNER: 'go2thailand_hotels_banner',
  
  // Top 10 Page Ad Units - Revenue optimized! 💰
  TOP10_RESTAURANTS_HEADER: 'go2thailand_top10_restaurants_header',
  TOP10_RESTAURANTS_IN_CONTENT_1: 'go2thailand_top10_restaurants_content_1',
  TOP10_RESTAURANTS_IN_CONTENT_2: 'go2thailand_top10_restaurants_content_2',
  TOP10_RESTAURANTS_SIDEBAR: 'go2thailand_top10_restaurants_sidebar',
  TOP10_RESTAURANTS_BOTTOM: 'go2thailand_top10_restaurants_bottom',
  
  TOP10_HOTELS_HEADER: 'go2thailand_top10_hotels_header',
  TOP10_HOTELS_IN_CONTENT_1: 'go2thailand_top10_hotels_content_1',
  TOP10_HOTELS_IN_CONTENT_2: 'go2thailand_top10_hotels_content_2',
  TOP10_HOTELS_SIDEBAR: 'go2thailand_top10_hotels_sidebar',
  TOP10_HOTELS_BOTTOM: 'go2thailand_top10_hotels_bottom',
  
  TOP10_ATTRACTIONS_HEADER: 'go2thailand_top10_attractions_header',
  TOP10_ATTRACTIONS_IN_CONTENT_1: 'go2thailand_top10_attractions_content_1',
  TOP10_ATTRACTIONS_IN_CONTENT_2: 'go2thailand_top10_attractions_content_2',
  TOP10_ATTRACTIONS_SIDEBAR: 'go2thailand_top10_attractions_sidebar',
  TOP10_ATTRACTIONS_BOTTOM: 'go2thailand_top10_attractions_bottom',
  
  // Mobile specific
  MOBILE_STICKY_BOTTOM: 'go2thailand_mobile_sticky',
  MOBILE_IN_CONTENT: 'go2thailand_mobile_content',
  TOP10_MOBILE_STICKY: 'go2thailand_top10_mobile_sticky',
  TOP10_MOBILE_INTERSTITIAL: 'go2thailand_top10_mobile_interstitial'
} as const;

// Ad placement configurations
export const AD_PLACEMENTS = {
  // High-value sidebar placement for city details
  CITY_SIDEBAR: {
    adUnit: EZOIC_AD_UNITS.CITY_SIDEBAR_RECTANGLE,
    size: 'rectangle' as const,
    className: 'mb-8 mx-auto sticky top-4',
    lazy: true
  },
  
  // Header banners
  HEADER_BANNER: {
    adUnit: EZOIC_AD_UNITS.CITY_HEADER_BANNER,
    size: 'banner' as const,
    className: 'my-6 mx-auto',
    lazy: false
  },
  
  // In-content ads between sections
  IN_CONTENT: {
    adUnit: EZOIC_AD_UNITS.CITY_IN_CONTENT_1,
    size: 'rectangle' as const,
    className: 'my-8 mx-auto',
    lazy: true
  },
  
  // Homepage specific placements
  HOMEPAGE_HEADER: {
    adUnit: EZOIC_AD_UNITS.HOMEPAGE_HEADER,
    size: 'banner' as const,
    className: 'mx-auto',
    lazy: false
  },
  
  HOMEPAGE_FEATURED: {
    adUnit: EZOIC_AD_UNITS.HOMEPAGE_FEATURED,
    size: 'rectangle' as const,
    className: 'mx-auto',
    lazy: true
  },
  
  // Mobile sticky bottom
  MOBILE_STICKY: {
    adUnit: EZOIC_AD_UNITS.MOBILE_STICKY_BOTTOM,
    size: 'mobile-banner' as const,
    className: 'fixed bottom-0 left-0 right-0 z-50 md:hidden',
    lazy: false
  },
  
  // Top 10 Pages - Revenue Optimized Placements 💰
  TOP10_HEADER_BANNER: {
    size: 'banner' as const,
    className: 'my-6 mx-auto',
    lazy: false
  },
  
  TOP10_SIDEBAR: {
    size: 'rectangle' as const,
    className: 'mb-8 mx-auto sticky top-4',
    lazy: true
  },
  
  TOP10_IN_CONTENT_1: {
    size: 'rectangle' as const,
    className: 'my-8 mx-auto',
    lazy: true
  },
  
  TOP10_IN_CONTENT_2: {
    size: 'rectangle' as const,
    className: 'my-8 mx-auto',
    lazy: true
  },
  
  TOP10_BOTTOM_BANNER: {
    size: 'banner' as const,
    className: 'my-6 mx-auto',
    lazy: true
  },
  
  TOP10_MOBILE_STICKY: {
    adUnit: EZOIC_AD_UNITS.TOP10_MOBILE_STICKY,
    size: 'mobile-banner' as const,
    className: 'fixed bottom-0 left-0 right-0 z-50 md:hidden',
    lazy: false
  }
} as const;

// Revenue optimization settings
export const AD_CONFIG = {
  // Enable ads in production only
  ENABLED: process.env.NODE_ENV === 'production',
  
  // Your Ezoic site key (you'll get this from Ezoic dashboard)
  SITE_KEY: process.env.NEXT_PUBLIC_EZOIC_SITE_KEY,
  
  // Ad refresh settings
  REFRESH_INTERVAL: 30000, // 30 seconds
  
  // Lazy loading threshold
  LAZY_THRESHOLD: 0.1,
  
  // Development mode settings
  DEV_MODE: {
    SHOW_PLACEHOLDERS: true,
    LOG_AD_EVENTS: true
  }
};

// Helper function to get ad unit for specific page
export function getAdUnitForPage(pageType: string, position: string): string {
  const key = `${pageType.toUpperCase()}_${position.toUpperCase()}` as keyof typeof EZOIC_AD_UNITS;
  return EZOIC_AD_UNITS[key] || EZOIC_AD_UNITS.CITY_SIDEBAR_RECTANGLE;
}

// Helper function to get Top 10 ad units for specific category
export function getTop10AdUnits(category: 'restaurants' | 'hotels' | 'attractions') {
  const categoryUpper = category.toUpperCase();
  return {
    header: EZOIC_AD_UNITS[`TOP10_${categoryUpper}_HEADER` as keyof typeof EZOIC_AD_UNITS],
    sidebar: EZOIC_AD_UNITS[`TOP10_${categoryUpper}_SIDEBAR` as keyof typeof EZOIC_AD_UNITS],
    inContent1: EZOIC_AD_UNITS[`TOP10_${categoryUpper}_IN_CONTENT_1` as keyof typeof EZOIC_AD_UNITS],
    inContent2: EZOIC_AD_UNITS[`TOP10_${categoryUpper}_IN_CONTENT_2` as keyof typeof EZOIC_AD_UNITS],
    bottom: EZOIC_AD_UNITS[`TOP10_${categoryUpper}_BOTTOM` as keyof typeof EZOIC_AD_UNITS],
  };
}

// Top 10 page ad placements with dynamic ad units
export function getTop10AdPlacements(category: 'restaurants' | 'hotels' | 'attractions') {
  const adUnits = getTop10AdUnits(category);
  
  return {
    header: {
      ...AD_PLACEMENTS.TOP10_HEADER_BANNER,
      adUnit: adUnits.header
    },
    sidebar: {
      ...AD_PLACEMENTS.TOP10_SIDEBAR,
      adUnit: adUnits.sidebar
    },
    inContent1: {
      ...AD_PLACEMENTS.TOP10_IN_CONTENT_1,
      adUnit: adUnits.inContent1
    },
    inContent2: {
      ...AD_PLACEMENTS.TOP10_IN_CONTENT_2,
      adUnit: adUnits.inContent2
    },
    bottom: {
      ...AD_PLACEMENTS.TOP10_BOTTOM_BANNER,
      adUnit: adUnits.bottom
    }
  };
}

// Revenue tracking helper
export function trackAdView(adUnit: string, pageType: string) {
  if (typeof window !== 'undefined' && AD_CONFIG.DEV_MODE.LOG_AD_EVENTS) {
    console.log(`Ad viewed: ${adUnit} on ${pageType}`);
  }
}
