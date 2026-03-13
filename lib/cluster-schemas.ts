// lib/cluster-schemas.ts
import { z, ZodSchema } from 'zod';

// --- Schemas ---

export const SourceMetaSchema = z.object({
  sourceName: z.string(),
  sourceUrl: z.string(),
  lastVerified: z.string(),
});

export const ClusterSEOSchema = z.object({
  title: z.string(),
  metaDescription: z.string(),
  slug: z.string(),
});

export const ClusterAttractionSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
  location: z.string().optional(),
  entranceFee: z.string().optional(),
  tips: z.array(z.string()).optional(),
  googleMapsUrl: z.string().optional(),
  sources: z.array(SourceMetaSchema).optional(),
});

export const ClusterHotelSchema = z.object({
  name: z.string(),
  category: z.enum(['budget', 'mid-range', 'luxury']),
  priceRange: z.string(),
  area: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).optional(),
  bookingUrl: z.string().optional(),
  reviewScore: z.string().optional(),
  bestFor: z.array(z.string()).optional(),
  sources: z.array(SourceMetaSchema).optional(),
});

export const ClusterNeighborhoodSchema = z.object({
  name: z.string(),
  description: z.string(),
  bestFor: z.string(),
  priceLevel: z.string(),
  highlights: z.array(z.string()),
  recommendedHotels: z.array(z.string()).optional(),
  walkingScore: z.string().optional(),
  transportNotes: z.array(z.string()).optional(),
  sources: z.array(SourceMetaSchema).optional(),
});

export const ClusterActivitySchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  duration: z.string().optional(),
  price: z.string().optional(),
  tips: z.array(z.string()).optional(),
  affiliateType: z.enum(['tours', 'activities']).optional(),
  bookingUrl: z.string().optional(),
  bestTime: z.string().optional(),
  familyFriendly: z.boolean().optional(),
  sources: z.array(SourceMetaSchema).optional(),
});

export const DestinationHubSchema = z.object({
  seo: ClusterSEOSchema,
  citySlug: z.string(),
  cityName: z.string(),
  overview: z.string(),
  highlights: z.array(z.string()),
  bestTimeToVisit: z.object({
    peak: z.string(),
    shoulder: z.string(),
    lowSeason: z.string(),
    recommendation: z.string(),
  }),
  topAttractions: z.array(ClusterAttractionSchema),
  travelTips: z.array(z.string()),
  gettingThere: z.string(),
  gettingAround: z.string(),
  generatedAt: z.string(),
  lastUpdated: z.string(),
  sources: z.array(SourceMetaSchema),
});

export const ThingsToDoPageSchema = z.object({
  seo: ClusterSEOSchema,
  citySlug: z.string(),
  cityName: z.string(),
  intro: z.string(),
  activities: z.array(ClusterActivitySchema),
  travelTips: z.array(z.string()),
  generatedAt: z.string(),
  lastUpdated: z.string(),
  sources: z.array(SourceMetaSchema),
});

export const HotelsPageSchema = z.object({
  seo: ClusterSEOSchema,
  citySlug: z.string(),
  cityName: z.string(),
  intro: z.string(),
  hotels: z.array(ClusterHotelSchema),
  bookingTips: z.array(z.string()),
  generatedAt: z.string(),
  lastUpdated: z.string(),
  sources: z.array(SourceMetaSchema),
});

export const WhereToStayPageSchema = z.object({
  seo: ClusterSEOSchema,
  citySlug: z.string(),
  cityName: z.string(),
  intro: z.string(),
  neighborhoods: z.array(ClusterNeighborhoodSchema),
  generalTips: z.array(z.string()),
  generatedAt: z.string(),
  lastUpdated: z.string(),
  sources: z.array(SourceMetaSchema),
});

export const TravelGuidePageSchema = z.object({
  seo: ClusterSEOSchema,
  citySlug: z.string(),
  cityName: z.string(),
  intro: z.string(),
  itinerary: z.object({
    title: z.string(),
    days: z.array(
      z.object({
        day: z.number(),
        title: z.string(),
        activities: z.array(z.string()),
      })
    ),
  }),
  transport: z.object({
    fromBangkok: z.string(),
    localTransport: z.array(z.string()),
  }),
  food: z.object({
    mustTry: z.array(z.string()),
    foodAreas: z.array(z.string()),
    tips: z.array(z.string()),
  }),
  etiquette: z.array(z.string()),
  budget: z.object({
    budget: z.string(),
    midRange: z.string(),
    luxury: z.string(),
  }),
  generatedAt: z.string(),
  lastUpdated: z.string(),
  sources: z.array(SourceMetaSchema),
});

export const ClusterManifestSchema = z.object({
  citySlug: z.string(),
  cityName: z.string(),
  status: z.enum(['draft', 'published', 'needs-update']),
  generatedAt: z.string(),
  lastVerified: z.string(),
  pages: z.array(z.string()),
  sourcesCount: z.number(),
});

// --- Validate function ---

export function validateClusterFile<T>(
  data: unknown,
  schema: ZodSchema<T>
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.issues.map(
    (e) => `${e.path.join('.')}: ${e.message}`
  );
  return { success: false, errors };
}
