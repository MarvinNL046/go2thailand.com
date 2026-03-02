/**
 * RiskCard — shows common risks grouped by category
 *
 * Counts risk occurrences across all cities from the enrichment data.
 * Displays as a 2x2 grid on desktop, stacked on mobile.
 * Each category card has a colored top border.
 */

import { useMemo } from 'react';
import { useRouter } from 'next/router';
import type { IndexCity, BilingualText } from '../../lib/thailand-index';

interface RiskCardProps {
  cities: IndexCity[];
}

interface RiskDescription {
  en: string;
  nl: string;
}

interface RiskCategory {
  label: BilingualText;
  icon: string;
  borderColor: string;
  risks: Record<string, RiskDescription>;
}

const RISK_CATEGORIES: Record<string, RiskCategory> = {
  scams: {
    label: { en: 'Scams & Fraud', nl: 'Oplichting & Fraude' },
    icon: '\u26A0\uFE0F',
    borderColor: 'border-t-amber-500',
    risks: {
      'taxi-scams': { en: 'Taxi meter refusal or rigged meters', nl: 'Taximeter weigering of gemanipuleerde meters' },
      'tuk-tuk-overcharging': { en: 'Tuk-tuk price inflation for tourists', nl: 'Tuk-tuk prijsopdrijving voor toeristen' },
      'gem-scams': { en: 'Fake gem shop schemes', nl: 'Nep edelstenen winkel trucs' },
      'jet-ski-scams': { en: 'Jet-ski damage claims for pre-existing damage', nl: 'Jet-ski schade claims voor bestaande schade' },
      'fake-police': { en: 'Impersonation of police for fines', nl: 'Imitatie van politie voor boetes' },
      'atm-skimming': { en: 'Card skimming at ATMs', nl: 'Kaart skimming bij geldautomaten' },
    },
  },
  theft: {
    label: { en: 'Theft & Crime', nl: 'Diefstal & Criminaliteit' },
    icon: '\uD83D\uDD12',
    borderColor: 'border-t-red-500',
    risks: {
      'pickpocketing': { en: 'Pickpocketing in crowded areas', nl: 'Zakkenrollerij in drukke gebieden' },
      'bag-snatching': { en: 'Bag snatching from motorbikes', nl: 'Tassenroof vanaf motorfietsen' },
      'drink-spiking': { en: 'Drink spiking in nightlife areas', nl: 'Drankjes drogeren in uitgaansgebieden' },
      'petty-theft': { en: 'Petty theft from rooms or beaches', nl: 'Kleine diefstal uit kamers of stranden' },
    },
  },
  traffic: {
    label: { en: 'Traffic & Transport', nl: 'Verkeer & Vervoer' },
    icon: '\uD83D\uDEF5',
    borderColor: 'border-t-orange-500',
    risks: {
      'traffic-accidents': { en: 'Road accidents, especially on motorbikes', nl: 'Verkeersongevallen, vooral op motorfietsen' },
      'motorbike-accidents': { en: 'Motorbike rental accidents (no license/insurance)', nl: 'Motorhuur ongevallen (geen rijbewijs/verzekering)' },
      'road-safety': { en: 'General road safety concerns', nl: 'Algemene verkeersveiligheid zorgen' },
    },
  },
  nature: {
    label: { en: 'Nature & Health', nl: 'Natuur & Gezondheid' },
    icon: '\uD83C\uDF0A',
    borderColor: 'border-t-blue-500',
    risks: {
      'rip-currents': { en: 'Dangerous rip currents at beaches', nl: 'Gevaarlijke muistromingen bij stranden' },
      'animal-bites': { en: 'Stray dog/monkey bites', nl: 'Beten van zwerfhonden/apen' },
      'food-poisoning': { en: 'Food poisoning from street food', nl: 'Voedselvergiftiging door straateten' },
      'food-hygiene': { en: 'Food hygiene concerns at local eateries', nl: 'Voedselhygiene zorgen bij lokale eetgelegenheden' },
      'jellyfish-stings': { en: 'Jellyfish stings (seasonal)', nl: 'Kwallensteken (seizoensgebonden)' },
      'water-safety': { en: 'Water safety risks at beaches and pools', nl: 'Waterveiligheid risico\'s bij stranden en zwembaden' },
      'air-pollution': { en: 'Air pollution, especially during burning season', nl: 'Luchtvervuiling, vooral tijdens het brandseizoen' },
      'boat-safety': { en: 'Boat safety on island transfers', nl: 'Bootveiligheid bij eilandoversteken' },
    },
  },
};

const RiskCard: React.FC<RiskCardProps> = ({ cities }) => {
  const { locale } = useRouter();
  const loc = (locale as keyof BilingualText) || 'en';

  // Count how many cities report each risk
  const riskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const city of cities) {
      if (!city.safety?.common_risks) continue;
      for (const risk of city.safety.common_risks) {
        counts[risk] = (counts[risk] || 0) + 1;
      }
    }
    return counts;
  }, [cities]);

  // Build category data with sorted risks
  const categories = useMemo(() => {
    return Object.entries(RISK_CATEGORIES).map(([key, category]) => {
      const activeRisks = Object.entries(category.risks)
        .filter(([riskKey]) => (riskCounts[riskKey] ?? 0) > 0)
        .sort((a, b) => (riskCounts[b[0]] ?? 0) - (riskCounts[a[0]] ?? 0));

      return {
        key,
        ...category,
        activeRisks,
      };
    });
  }, [riskCounts]);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {categories.map((category) => (
        <div
          key={category.key}
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 ${category.borderColor} overflow-hidden`}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl" role="img" aria-hidden="true">
                {category.icon}
              </span>
              <h3 className="font-bold font-heading text-gray-900">
                {category.label[loc] || category.label.en}
              </h3>
            </div>

            {category.activeRisks.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                {loc === 'nl'
                  ? 'Geen risico\'s gemeld in onze data'
                  : 'No risks reported in our data'}
              </p>
            ) : (
              <ul className="space-y-3">
                {category.activeRisks.map(([riskKey, riskDesc]) => (
                  <li key={riskKey} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                    <div>
                      <p className="text-sm text-gray-700">
                        {riskDesc[loc] || riskDesc.en}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {loc === 'nl'
                          ? `Gemeld in ${riskCounts[riskKey]} ${riskCounts[riskKey] === 1 ? 'stad' : 'steden'}`
                          : `Reported in ${riskCounts[riskKey]} ${riskCounts[riskKey] === 1 ? 'city' : 'cities'}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiskCard;
