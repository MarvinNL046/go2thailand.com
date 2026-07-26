import { useRouter } from 'next/router';
import ThailandEsimSimGuide from '../../components/connectivity/ThailandEsimSimGuide';

export default function SimCardThailandPage() {
  const { locale } = useRouter();
  return <ThailandEsimSimGuide language={locale === 'nl' ? 'nl' : 'en'} />;
}
