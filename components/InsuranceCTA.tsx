const SAFETYWING_LINK = 'https://safetywing.com/?referenceID=26490463&utm_source=26490463&utm_medium=Ambassador';
const EKTA_LINK = 'https://ektatraveling.tpo.lv/pK9wyXgr';

interface InsuranceCTAProps {
  context?: 'scooter' | 'diving' | 'health' | 'nomad' | 'general';
}

const CONTEXT_TEXT: Record<string, { heading: string; body: string }> = {
  scooter: {
    heading: 'Motorbike Insurance for Thailand',
    body: 'Most travel insurance excludes motorbike accidents. Get covered for scooter riding with adventure sports add-ons.',
  },
  diving: {
    heading: 'Dive Insurance for Thailand',
    body: 'Standard travel insurance often excludes scuba diving below 10m. Get adventure sports coverage including diving.',
  },
  health: {
    heading: 'Travel Health Insurance for Thailand',
    body: 'Thai hospitals require upfront payment from foreigners. A simple ER visit costs $500+. Get covered from $0.99/day.',
  },
  nomad: {
    heading: 'Nomad Insurance for Thailand',
    body: 'Monthly subscriptions for digital nomads, or budget coverage from $0.99/day. 190+ countries covered.',
  },
  general: {
    heading: 'Travel Insurance for Thailand',
    body: 'Don\'t travel to Thailand without insurance. Medical emergencies, motorbike accidents, and COVID-19 — covered from $0.99/day.',
  },
};

export default function InsuranceCTA({ context = 'general' }: InsuranceCTAProps) {
  const text = CONTEXT_TEXT[context] || CONTEXT_TEXT.general;

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 my-8">
      <div className="text-white mb-4">
        <h3 className="text-lg font-bold font-heading mb-1">{text.heading}</h3>
        <p className="text-blue-200 text-sm">{text.body}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={SAFETYWING_LINK}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors whitespace-nowrap text-center"
        >
          SafetyWing — from $42/mo
        </a>
        <a
          href={EKTA_LINK}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors whitespace-nowrap border border-blue-500 text-center"
        >
          Ekta — from $0.99/day
        </a>
      </div>
      <p className="text-blue-400/60 text-xs mt-3">
        Affiliate links — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
