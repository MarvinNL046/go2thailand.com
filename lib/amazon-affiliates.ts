/**
 * Central Amazon product registry.
 *
 * Public pages link to /go/<slug>/ instead of embedding Amazon URLs. The
 * redirect route adds the approved US Associates tracking ID. When the US
 * store and international Store IDs are linked in Amazon OneLink, Amazon can
 * then redirect visitors to a matching product in their local marketplace.
 */
export const amazonAffiliateLinks = {
  'airvault-vacuum-backpack': 'https://www.amazon.com/dp/B0DQD8FVJB',
  'ugreen-25000-power-bank': 'https://www.amazon.com/dp/B0BJQ7F16T',
  'anker-powercore-10k': 'https://www.amazon.com/dp/B0CX4992Z8',
  'momax-travel-adapter': 'https://www.amazon.com/dp/B0BHQNMDNC',
  'sun-cube-wide-brim-hat': 'https://www.amazon.com/dp/B09WHGZ46G',
  'neutrogena-beach-defense-spf70': 'https://www.amazon.com/dp/B00AEN4QZ8',
  'badger-anti-bug-spray': 'https://www.amazon.com/dp/B003FBPFJW',
  'rainleaf-travel-towel': 'https://www.amazon.com/dp/B01K1TX77W',
  'venture-pal-packable-backpack': 'https://www.amazon.com/dp/B07PY3D9M7',
  'simari-water-shoes': 'https://www.amazon.com/dp/B08SJ4JQWD',
  'earth-pak-dry-bag': 'https://www.amazon.com/dp/B01GZCUCO0',
  'hovsiyla-quick-dry-shirt': 'https://www.amazon.com/dp/B0D266SMGD',
  'hagon-rain-ponchos': 'https://www.amazon.com/dp/B076ZHMR3S',
  'simple-thai-food-cookbook': 'https://www.amazon.com/dp/1607745232',
  'zojirushi-six-cup-rice-cooker': 'https://www.amazon.com/dp/B00004S576',
  'thai-granite-mortar-eight-inch': 'https://www.amazon.com/dp/B0747DHS6T',
  'chatramue-original-thai-tea': 'https://www.amazon.com/dp/B00712N6II',
  'owala-freesip-24oz': 'https://www.amazon.com/dp/B0BZYCJK89',
  'kooky-freeze-dried-monthong-durian': 'https://www.amazon.com/dp/B0CYHBSNSV',
} as const;

export type AmazonAffiliateSlug = keyof typeof amazonAffiliateLinks;

// Approved Amazon.com Associates tracking ID for Go2Thailand.
export const AMAZON_ASSOCIATES_TAG = 'go2thailand-20';

export function withAmazonAssociateTag(rawUrl: string): string {
  const url = new URL(rawUrl);

  if (isAmazonHost(url.hostname) && !url.searchParams.has('tag')) {
    url.searchParams.set('tag', AMAZON_ASSOCIATES_TAG);
  }

  return url.toString();
}

export function resolveAmazonAffiliateDestination(slug: string): string | null {
  const destination = amazonAffiliateLinks[slug as AmazonAffiliateSlug];
  return destination ? withAmazonAssociateTag(destination) : null;
}

function isAmazonHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === 'amazon.com' || host.startsWith('amazon.') || host.includes('.amazon.');
}

export const amazonAffiliateRedirectHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow',
};
