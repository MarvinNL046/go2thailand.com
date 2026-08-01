import { useRouter } from 'next/router';
import NlTopicalManualGuide from '../components/editorial/NlTopicalManualGuide';
import ThailandCookingClassesGuideEn from '../components/food/ThailandCookingClassesGuideEn';
import { nlTopicalManualGuides } from '../data/editorial/nl-topical-manual';

export default function BestCookingClassesPage() {
  const { locale } = useRouter();
  return locale === 'nl'
    ? <NlTopicalManualGuide data={nlTopicalManualGuides['best-cooking-classes-in-thailand']} />
    : <ThailandCookingClassesGuideEn />;
}
