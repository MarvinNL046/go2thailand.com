import { useEffect } from 'react';

interface CtaConfig {
  keywords: string[];
  href: string;
  label: string;
  icon: string;
}

const CTA_MAP: CtaConfig[] = [
  { keywords: ['bangkok'], href: '/city/bangkok/', label: 'Explore Bangkok City Guide', icon: '🏙️' },
  { keywords: ['chiang mai'], href: '/city/chiang-mai/', label: 'Explore Chiang Mai City Guide', icon: '🏔️' },
  { keywords: ['phuket'], href: '/city/phuket/', label: 'Explore Phuket City Guide', icon: '🏖️' },
  { keywords: ['pattaya'], href: '/city/pattaya/', label: 'Explore Pattaya City Guide', icon: '🌊' },
  { keywords: ['krabi'], href: '/city/krabi/', label: 'Explore Krabi City Guide', icon: '🪸' },
  { keywords: ['chiang rai'], href: '/city/chiang-rai/', label: 'Explore Chiang Rai City Guide', icon: '🏯' },
  { keywords: ['koh samui', 'samui'], href: '/city/koh-samui/', label: 'Explore Koh Samui Guide', icon: '🌴' },
  { keywords: ['hua hin'], href: '/city/hua-hin/', label: 'Explore Hua Hin City Guide', icon: '🏖️' },
  { keywords: ['pai'], href: '/city/pai/', label: 'Explore Pai City Guide', icon: '🌿' },
  { keywords: ['kanchanaburi'], href: '/city/kanchanaburi/', label: 'Explore Kanchanaburi Guide', icon: '🌉' },
  { keywords: ['visa', 'permit', 'immigration'], href: '/visa/', label: 'Thailand Visa Guide', icon: '📋' },
  { keywords: ['transport', 'bus', 'train', 'flight', 'airport'], href: '/transport/', label: 'Transport & Routes', icon: '🚂' },
  { keywords: ['island', 'beach', 'snorkel', 'diving'], href: '/islands/', label: 'Thailand Islands Guide', icon: '🏝️' },
  { keywords: ['food', 'restaurant', 'eat', 'cuisine', 'dish', 'street food'], href: '/food/', label: 'Thai Food & Cuisine', icon: '🍜' },
  { keywords: ['hotel', 'stay', 'accommodation', 'hostel', 'resort'], href: '/thailand-travel-guide/', label: 'Thailand Travel Guide', icon: '🏨' },
  { keywords: ['insurance', 'safety', 'safe'], href: '/travel-insurance-thailand/', label: 'Travel Insurance Guide', icon: '🛡️' },
  { keywords: ['esim', 'sim card', 'internet', 'wifi'], href: '/esim/', label: 'Thailand eSIM Guide', icon: '📱' },
];

const FALLBACK_CTA: CtaConfig = {
  keywords: [],
  href: '/thailand-travel-guide/',
  label: 'Thailand Travel Guide 2026',
  icon: '🇹🇭',
};

// Affiliate CTAs — matched to page content intent, max 1 per article
const AFFILIATE_CTA_MAP: CtaConfig[] = [
  { keywords: ['where to stay', 'hotel', 'neighborhood', 'accommodation', 'resort', 'hostel'], href: 'https://trip.tpo.lv/TmObooZ5?subid=inline', label: 'Search Thailand Hotels on Trip.com', icon: '🏨' },
  { keywords: ['bus', 'train', 'flight', 'transport', 'airport', 'bangkok to', 'to phuket', 'to chiang'], href: 'https://12go.tpo.lv/tNA80urD?subid=inline', label: 'Book Transport on 12Go Asia', icon: '🚂' },
  { keywords: ['market', 'food tour', 'cooking class', 'street food', 'night market'], href: 'https://klook.tpo.lv/7Dt6WApj?subid=inline', label: 'Book a Food Tour on Klook', icon: '🍜' },
  { keywords: ['island', 'beach', 'diving', 'snorkel', 'boat'], href: 'https://klook.tpo.lv/7Dt6WApj?subid=inline-beach', label: 'Book Island Activities on Klook', icon: '🏝️' },
  { keywords: ['visa', 'insurance', 'safe', 'digital nomad'], href: 'https://nordvpn.tpo.lv/ekHF1i55?subid=inline', label: 'Stay Secure with NordVPN', icon: '🛡️' },
];

function findCtaForText(text: string, usedHrefs: Set<string>): CtaConfig {
  const lower = text.toLowerCase();
  for (const cta of CTA_MAP) {
    if (usedHrefs.has(cta.href)) continue;
    if (cta.keywords.some((kw) => lower.includes(kw))) return cta;
  }
  return FALLBACK_CTA;
}

function findAffiliateCta(fullText: string): CtaConfig | null {
  const lower = fullText.toLowerCase();
  for (const cta of AFFILIATE_CTA_MAP) {
    if (cta.keywords.some((kw) => lower.includes(kw))) return cta;
  }
  return null;
}

function createAffiliateCta(cta: CtaConfig): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'not-prose my-8 bg-gradient-to-r from-thailand-blue/5 to-thailand-red/5 border border-thailand-blue/20 rounded-xl p-5 hover:shadow-md transition-shadow';
  wrapper.setAttribute('data-engagement-cta', 'true');

  const link = document.createElement('a');
  link.href = cta.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'flex items-center gap-4 w-full no-underline';
  link.innerHTML = `
    <span class="text-3xl flex-shrink-0">${cta.icon}</span>
    <span class="flex-1">
      <span class="font-bold text-gray-900 block">${cta.label}</span>
      <span class="text-xs text-gray-500">Affiliate link</span>
    </span>
    <span class="bg-thailand-red text-white px-4 py-2 rounded-lg text-sm font-semibold flex-shrink-0">Book Now</span>
  `;

  wrapper.appendChild(link);
  return wrapper;
}

function createCtaElement(cta: CtaConfig): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'not-prose my-8 bg-surface-cream rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow';
  wrapper.setAttribute('data-engagement-cta', 'true');

  const link = document.createElement('a');
  link.href = cta.href;
  link.className = 'flex items-center gap-4 w-full no-underline';
  link.innerHTML = `
    <span class="text-2xl flex-shrink-0">${cta.icon}</span>
    <span class="flex-1">
      <span class="font-semibold text-gray-900 text-sm">${cta.label}</span>
    </span>
    <svg class="w-5 h-5 text-thailand-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  `;

  wrapper.appendChild(link);
  return wrapper;
}

export default function InlineEngagementCTAs() {
  useEffect(() => {
    const contentEl = document.querySelector('[data-blog-content]');
    if (!contentEl) return;

    const headings = contentEl.querySelectorAll('h2');
    if (headings.length < 3) return;

    const usedHrefs = new Set<string>();
    let ctaCount = 0;
    const MAX_CTAS = 3;

    headings.forEach((h2, i) => {
      if ((i + 1) % 2 !== 0) return;
      if (ctaCount >= MAX_CTAS) return;

      const textBefore = h2.textContent || '';
      let textAfter = '';
      let sibling = h2.nextElementSibling;
      while (sibling && sibling.tagName !== 'H2') {
        textAfter += sibling.textContent || '';
        sibling = sibling.nextElementSibling;
      }

      const contextText = textBefore + ' ' + textAfter;
      const cta = findCtaForText(contextText, usedHrefs);
      usedHrefs.add(cta.href);

      let insertBefore = h2.nextElementSibling;
      while (insertBefore && insertBefore.tagName !== 'H2') {
        const next = insertBefore.nextElementSibling;
        if (!next || next.tagName === 'H2') {
          insertBefore.after(createCtaElement(cta));
          ctaCount++;
          break;
        }
        insertBefore = next;
      }
    });

    // Inject 1 affiliate CTA after the 4th H2 (if enough sections)
    if (headings.length >= 4) {
      const fullText = contentEl.textContent || '';
      const affiliateCta = findAffiliateCta(fullText);
      if (affiliateCta) {
        const h2 = headings[3]; // 4th H2 (index 3)
        let lastInSection = h2.nextElementSibling;
        while (lastInSection && lastInSection.nextElementSibling && lastInSection.nextElementSibling.tagName !== 'H2') {
          lastInSection = lastInSection.nextElementSibling;
        }
        if (lastInSection) {
          lastInSection.after(createAffiliateCta(affiliateCta));
        }
      }
    }

    return () => {
      document.querySelectorAll('[data-engagement-cta]').forEach((el) => el.remove());
    };
  }, []);

  return null;
}
