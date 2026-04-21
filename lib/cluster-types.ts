// lib/cluster-types.ts
// Client-safe types — no fs/path imports

export interface SourceMeta {
  sourceName: string;
  sourceUrl: string;
  lastVerified: string;
}

export interface ClusterManifest {
  citySlug: string;
  cityName: string;
  status: 'draft' | 'published' | 'needs-update';
  generatedAt: string;
  lastVerified: string;
  pages: string[];
  sourcesCount: number;
}

export interface ClusterSEO {
  title: string;
  metaDescription: string;
  slug: string;
}

export interface ClusterAttraction {
  name: string;
  description: string;
  type: string;
  location?: string;
  entranceFee?: string;
  tips?: string[];
  googleMapsUrl?: string;
  sources?: SourceMeta[];
}

export interface ClusterHotel {
  name: string;
  category: 'budget' | 'mid-range' | 'luxury';
  priceRange: string;
  area: string;
  description: string;
  highlights?: string[];
  bookingUrl?: string;
  reviewScore?: string;
  bestFor?: string[];
  sources?: SourceMeta[];
}

export interface ClusterNeighborhood {
  name: string;
  description: string;
  bestFor: string;
  priceLevel: string;
  highlights: string[];
  recommendedHotels?: string[];
  walkingScore?: string;
  transportNotes?: string[];
  sources?: SourceMeta[];
}

export interface ClusterActivity {
  name: string;
  description: string;
  category: string;
  duration?: string;
  price?: string;
  tips?: string[];
  affiliateType?: 'tours' | 'activities';
  bookingUrl?: string;
  bestTime?: string;
  familyFriendly?: boolean;
  sources?: SourceMeta[];
}

export interface DestinationHub {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  overview: string;
  highlights: string[];
  bestTimeToVisit: {
    peak: string;
    shoulder: string;
    lowSeason: string;
    recommendation: string;
  };
  topAttractions: ClusterAttraction[];
  travelTips: string[];
  gettingThere: string;
  gettingAround: string;
  generatedAt: string;
  lastUpdated: string;
  sources: SourceMeta[];
}

export interface ThingsToDoPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  activities: ClusterActivity[];
  travelTips: string[];
  generatedAt: string;
  lastUpdated: string;
  sources: SourceMeta[];
}

export interface HotelsPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  hotels: ClusterHotel[];
  bookingTips: string[];
  generatedAt: string;
  lastUpdated: string;
  sources: SourceMeta[];
}

export interface WhereToStayPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  neighborhoods: ClusterNeighborhood[];
  generalTips: string[];
  generatedAt: string;
  lastUpdated: string;
  sources: SourceMeta[];
}

export interface TravelGuidePage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  itinerary: {
    title: string;
    days: Array<{
      day: number;
      title: string;
      activities: string[];
    }>;
  };
  transport: {
    fromBangkok: string;
    localTransport: string[];
  };
  food: {
    mustTry: string[];
    foodAreas: string[];
    tips: string[];
  };
  etiquette: string[];
  budget: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  generatedAt: string;
  lastUpdated: string;
  sources: SourceMeta[];
}

// Internal links for cross-linking within a cluster (client-safe, no fs)
export function getClusterLinks(citySlug: string, cityName: string) {
  return {
    hub: { href: `/destinations/${citySlug}/`, label: `${cityName} Travel Guide` },
    thingsToDo: { href: `/things-to-do/${citySlug}/`, label: `Things To Do in ${cityName}` },
    hotels: { href: `/best-hotels/${citySlug}/`, label: `Best Hotels in ${cityName}` },
    whereToStay: { href: `/where-to-stay/${citySlug}/`, label: `Where To Stay in ${cityName}` },
    travelGuide: { href: `/guides/travel-guide/${citySlug}/`, label: `${cityName} Travel Guide` },
    cityHub: { href: `/city/${citySlug}/`, label: `Explore ${cityName}` },
    cityAttractions: { href: `/city/${citySlug}/top-10-attractions/`, label: `Top 10 Attractions in ${cityName}` },
    cityHotels: { href: `/city/${citySlug}/top-10-hotels/`, label: `Top 10 Hotels in ${cityName}` },
    cityFood: { href: `/city/${citySlug}/food/`, label: `${cityName} Food Guide` },
    cityWeather: { href: `/city/${citySlug}/weather/`, label: `${cityName} Weather` },
    cityBudget: { href: `/city/${citySlug}/budget/`, label: `${cityName} Budget Guide` },
  };
}
