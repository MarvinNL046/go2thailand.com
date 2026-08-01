import { useRouter } from 'next/router';
import ThailandEsimSimGuide from '../../components/connectivity/ThailandEsimSimGuide';

export default function SimCardThailandPage() {
  const { locale } = useRouter();
  const language = locale === 'nl' ? 'nl' : 'en';
  return language === 'en' ? <div data-premium-template="connectivity-guide-en"><ThailandEsimSimGuide language={language} /></div> : <ThailandEsimSimGuide language={language} />;
}
