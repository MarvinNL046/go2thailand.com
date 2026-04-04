import { useRouter } from 'next/router';

const SAFETYWING_LINK = 'https://safetywing.com/?referenceID=26490463&utm_source=26490463&utm_medium=Ambassador';
const EKTA_LINK = 'https://ektatraveling.tpo.lv/pK9wyXgr';

interface InsuranceCTAProps {
  context?: 'scooter' | 'diving' | 'health' | 'nomad' | 'general';
}

const CONTEXT_TEXT: Record<string, { heading: { en: string; nl: string }; body: { en: string; nl: string } }> = {
  scooter: {
    heading: { en: 'Motorbike Insurance for Thailand', nl: 'Scooter Verzekering voor Thailand' },
    body: {
      en: 'Most travel insurance excludes motorbike accidents. Get covered for scooter riding with adventure sports add-ons.',
      nl: 'De meeste reisverzekeringen dekken geen scooter ongelukken. Zorg voor dekking met avontuurlijke sport opties.',
    },
  },
  diving: {
    heading: { en: 'Dive Insurance for Thailand', nl: 'Duikverzekering voor Thailand' },
    body: {
      en: 'Standard travel insurance often excludes scuba diving below 10m. Get adventure sports coverage including diving.',
      nl: 'Standaard reisverzekeringen dekken vaak geen duiken dieper dan 10m. Kies voor avontuurlijke sport dekking inclusief duiken.',
    },
  },
  health: {
    heading: { en: 'Travel Health Insurance for Thailand', nl: 'Reis Ziektekostenverzekering voor Thailand' },
    body: {
      en: 'Thai hospitals require upfront payment from foreigners. A simple ER visit costs $500+. Get covered from $0.99/day.',
      nl: 'Thaise ziekenhuizen vragen vooruitbetaling van buitenlanders. Een simpel SEH-bezoek kost $500+. Verzeker je vanaf $0,99/dag.',
    },
  },
  nomad: {
    heading: { en: 'Nomad Insurance for Thailand', nl: 'Nomaden Verzekering voor Thailand' },
    body: {
      en: 'Travel medical insurance for 175+ countries. Covers illness, injury, delays, lost luggage, and trip interruptions. Cancel anytime.',
      nl: 'Medische reisverzekering voor 175+ landen. Dekt ziekte, letsel, vertragingen, verloren bagage en reisonderbrekingen. Altijd opzegbaar.',
    },
  },
  general: {
    heading: { en: 'Travel Insurance for Thailand', nl: 'Reisverzekering voor Thailand' },
    body: {
      en: 'Don\'t travel to Thailand without insurance. Medical emergencies, motorbike accidents, and COVID-19 — covered from $0.99/day.',
      nl: 'Reis niet naar Thailand zonder verzekering. Medische noodgevallen, scooter ongelukken en COVID-19 — gedekt vanaf $0,99/dag.',
    },
  },
};

export default function InsuranceCTA({ context = 'general' }: InsuranceCTAProps) {
  const { locale } = useRouter();
  const nl = locale === 'nl';
  const raw = CONTEXT_TEXT[context] || CONTEXT_TEXT.general;
  const text = { heading: nl ? raw.heading.nl : raw.heading.en, body: nl ? raw.body.nl : raw.body.en };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 my-8">
      <div className="text-white mb-4">
        <h3 className="text-lg font-bold font-heading mb-1">{text.heading}</h3>
        <p className="text-blue-200 text-sm">{text.body}</p>
      </div>
      {/* SafetyWing branded button banner */}
      <a href={SAFETYWING_LINK} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block mb-3 rounded-xl overflow-hidden hover:opacity-95 transition-opacity">
        <img src="/images/affiliates/safetywing/button-horizontal.webp" alt="SafetyWing — Let's get you insured!" className="w-full h-auto" />
      </a>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={SAFETYWING_LINK}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors whitespace-nowrap text-center"
        >
          {nl ? 'SafetyWing — vanaf $42/maand' : 'SafetyWing — from $42/mo'}
        </a>
        <a
          href={EKTA_LINK}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors whitespace-nowrap border border-blue-500 text-center"
        >
          {nl ? 'Ekta — vanaf $0,99/dag' : 'Ekta — from $0.99/day'}
        </a>
      </div>
      <p className="text-blue-400/60 text-xs mt-3">
        {nl
          ? 'Affiliate links — we kunnen een commissie verdienen zonder extra kosten voor jou.'
          : 'Affiliate links — we may earn a commission at no extra cost to you.'}
      </p>
    </div>
  );
}
