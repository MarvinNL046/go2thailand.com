import { thailandEsimSimNl } from '../../data/connectivity-guides/nl/thailand-esim-sim';
import { thailandEsimSimEn } from '../../data/connectivity-guides/en/thailand-esim-sim';
import { ConnectivityGuideTemplate } from './ConnectivityGuideTemplate';

export default function ThailandEsimSimGuide({ language = 'nl' }: { language?: 'nl' | 'en' }) {
  return <ConnectivityGuideTemplate data={language === 'en' ? thailandEsimSimEn : thailandEsimSimNl} />;
}
