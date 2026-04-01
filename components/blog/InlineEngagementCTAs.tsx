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

function findCtaForText(text: string, usedHrefs: Set<string>): CtaConfig {
  const lower = text.toLowerCase();
  for (const cta of CTA_MAP) {
    if (usedHrefs.has(cta.href)) continue;
    if (cta.keywords.some((kw) => lower.includes(kw))) return cta;
  }
  return FALLBACK_CTA;
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

    return () => {
      document.querySelectorAll('[data-engagement-cta]').forEach((el) => el.remove());
    };
  }, []);

  return null;
}
