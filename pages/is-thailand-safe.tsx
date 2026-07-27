import { useRouter } from 'next/router';
import ThailandSafetyGuide from '../components/safety/ThailandSafetyGuide';
import ThailandSafetyGuideEn from '../components/safety/ThailandSafetyGuideEn';

export default function IsThailandSafePage() {
  const { locale } = useRouter();
  return locale === 'nl' ? <ThailandSafetyGuide /> : <ThailandSafetyGuideEn />;
}

export const getStaticProps = async () => ({ props: {}, revalidate: 604800 });
