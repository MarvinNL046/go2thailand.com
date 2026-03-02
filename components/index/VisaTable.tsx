/**
 * VisaTable — static table showing Thailand visa options for digital nomads
 *
 * Hardcoded data (not from JSON). Renders as a clean table with subtle borders,
 * alternating row backgrounds, and responsive horizontal scroll on mobile.
 */

import { useRouter } from 'next/router';
import type { BilingualText } from '../../lib/thailand-index';

interface VisaEntry {
  type: BilingualText;
  duration: BilingualText;
  cost: BilingualText;
  bestFor: BilingualText;
  requirements: BilingualText;
}

const VISA_DATA: VisaEntry[] = [
  {
    type: { en: 'Tourist Visa Exemption', nl: 'Toeristenvisum Vrijstelling' },
    duration: { en: '60 days', nl: '60 dagen' },
    cost: { en: 'Free', nl: 'Gratis' },
    bestFor: { en: 'Short trips, first visits', nl: 'Korte reizen, eerste bezoek' },
    requirements: {
      en: 'Return ticket, proof of funds ($500/person)',
      nl: 'Retourticket, bewijs van financien ($500/persoon)',
    },
  },
  {
    type: { en: 'Destination Thailand Visa (DTV)', nl: 'Destination Thailand Visa (DTV)' },
    duration: { en: '5 years (180 days/entry)', nl: '5 jaar (180 dagen/bezoek)' },
    cost: { en: '\u0E3F10,000 (~$280)', nl: '\u0E3F10.000 (~$280)' },
    bestFor: { en: 'Digital nomads, remote workers', nl: 'Digitale nomaden, remote werkers' },
    requirements: {
      en: 'Proof of remote work or freelancing, \u0E3F500,000 in savings',
      nl: 'Bewijs van remote werk of freelancen, \u0E3F500.000 spaargeld',
    },
  },
  {
    type: { en: 'ED Visa (Education)', nl: 'ED Visum (Onderwijs)' },
    duration: { en: '1 year (renewable)', nl: '1 jaar (verlengbaar)' },
    cost: { en: '\u0E3F5,000-20,000', nl: '\u0E3F5.000-20.000' },
    bestFor: { en: 'Thai language, Muay Thai students', nl: 'Thai taal, Muay Thai studenten' },
    requirements: {
      en: 'Enrollment in approved school',
      nl: 'Inschrijving bij erkende school',
    },
  },
  {
    type: { en: 'Thailand Elite', nl: 'Thailand Elite' },
    duration: { en: '5-20 years', nl: '5-20 jaar' },
    cost: { en: '\u0E3F600k-2M ($17k-$57k)', nl: '\u0E3F600k-2M ($17k-$57k)' },
    bestFor: { en: 'Long-term residents, luxury lifestyle', nl: 'Langverblijvers, luxe levensstijl' },
    requirements: {
      en: 'Membership fee, background check',
      nl: 'Lidmaatschapsbijdrage, antecedentenonderzoek',
    },
  },
  {
    type: { en: 'Retirement (O-A)', nl: 'Pensioen (O-A)' },
    duration: { en: '1 year (renewable)', nl: '1 jaar (verlengbaar)' },
    cost: { en: '\u0E3F2,000', nl: '\u0E3F2.000' },
    bestFor: { en: 'Retirees 50+', nl: 'Gepensioneerden 50+' },
    requirements: {
      en: '\u0E3F800,000 in Thai bank or \u0E3F65,000/month income',
      nl: '\u0E3F800.000 op Thaise bank of \u0E3F65.000/maand inkomen',
    },
  },
];

const columnHeaders: { key: keyof VisaEntry; label: BilingualText }[] = [
  { key: 'type', label: { en: 'Visa Type', nl: 'Visumtype' } },
  { key: 'duration', label: { en: 'Duration', nl: 'Duur' } },
  { key: 'cost', label: { en: 'Cost', nl: 'Kosten' } },
  { key: 'bestFor', label: { en: 'Best For', nl: 'Geschikt Voor' } },
  { key: 'requirements', label: { en: 'Requirements', nl: 'Vereisten' } },
];

const VisaTable: React.FC = () => {
  const { locale } = useRouter();
  const loc = (locale as keyof BilingualText) || 'en';

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-cream border-b border-gray-200">
            {columnHeaders.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap"
              >
                {col.label[loc] || col.label.en}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VISA_DATA.map((visa, idx) => (
            <tr
              key={idx}
              className={`border-b border-gray-100 ${
                idx % 2 === 1 ? 'bg-surface-cream/40' : 'bg-white'
              }`}
            >
              <td className="px-4 py-3 font-semibold text-thailand-blue whitespace-nowrap">
                {visa.type[loc] || visa.type.en}
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                {visa.duration[loc] || visa.duration.en}
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                {visa.cost[loc] || visa.cost.en}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {visa.bestFor[loc] || visa.bestFor.en}
              </td>
              <td className="px-4 py-3 text-gray-600 text-xs leading-relaxed max-w-xs">
                {visa.requirements[loc] || visa.requirements.en}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisaTable;
