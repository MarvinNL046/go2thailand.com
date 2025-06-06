export const siteConfig = {
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'go2-thailand.com',
  name: 'Go2 Thailand',
  description: 'Your comprehensive guide to Thailand travel',
  category: 'travel',
  language: 'en'
};

export function getSiteDomain(): string {
  if (typeof window !== 'undefined') {
    // In browser, use the actual hostname
    return window.location.hostname;
  }
  
  // In server, use environment variable or default
  return siteConfig.domain;
}