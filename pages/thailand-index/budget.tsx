import { useRouter } from 'next/router';
import ThailandBudgetGuide from '../../components/budget/ThailandBudgetGuide';
import ThailandBudgetGuideEn from '../../components/budget/ThailandBudgetGuideEn';

export default function BudgetPage() {
  const { locale } = useRouter();
  return locale === 'nl' ? <ThailandBudgetGuide /> : <ThailandBudgetGuideEn />;
}
