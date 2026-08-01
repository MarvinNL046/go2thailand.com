import { sevenElevenThailandNl } from '../../data/practical-guides/nl/seven-eleven-thailand';
import { sevenElevenThailandEn } from '../../data/practical-guides/en/seven-eleven-thailand';
import { PracticalEditorialGuideTemplate } from './PracticalEditorialGuideTemplate';

export default function SevenElevenThailandGuide({ language = 'nl' }: { language?: 'nl' | 'en' }) {
  return <PracticalEditorialGuideTemplate data={language === 'en' ? sevenElevenThailandEn : sevenElevenThailandNl} />;
}
