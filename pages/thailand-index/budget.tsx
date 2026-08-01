import { useRouter } from 'next/router';
import ThailandBudgetGuide from '../../components/budget/ThailandBudgetGuide';
import { StaticTravelGuideOwnerEn } from '../../components/travel/StaticTravelGuideOwnerEn';

export default function BudgetPage() {
  const { locale } = useRouter();
  return locale === 'nl' ? <ThailandBudgetGuide /> : <StaticTravelGuideOwnerEn owner="budget" />;
}
