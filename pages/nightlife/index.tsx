import { useRouter } from "next/router";
import { ThailandNightlifeGuide } from "../../components/nightlife/ThailandNightlifeGuide";
import { ThailandNightlifeGuideEn } from "../../components/nightlife/ThailandNightlifeGuideEn";

export default function NightlifeIndex() {
  const { locale } = useRouter();
  return locale === "nl" ? (
    <ThailandNightlifeGuide />
  ) : (
    <ThailandNightlifeGuideEn />
  );
}
