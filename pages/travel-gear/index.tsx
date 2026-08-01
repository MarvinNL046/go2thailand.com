import { useRouter } from 'next/router';
import PackingGuideTemplate from '../../components/gear/PackingGuideTemplate';
import { thailandPackingGuide } from '../../data/gear/nl/thailand-packing';
import { thailandPackingGuideEn } from '../../data/gear/en/thailand-packing';

export default function TravelGearPage() {
  const { locale } = useRouter();
  return <PackingGuideTemplate data={locale === 'nl' ? thailandPackingGuide : thailandPackingGuideEn} />;
}
