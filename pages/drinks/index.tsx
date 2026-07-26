import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ThaiDrinksGuide } from "../../components/food/ThaiDrinksGuide";
import { ThaiDrinksGuideEn } from "../../components/food/ThaiDrinksGuideEn";
import { getAllDrinks } from "../../lib/drinks";

interface Drink {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
    thai: string;
  };
  category: string;
  type: string;
  description: {
    en: string;
    nl: string;
  };
  image: string;
  temperature: string;
  alcohol_content: string;
  caffeine: string;
  price_range: string;
  occasions: string[];
}

interface DrinksPageProps {
  drinks: Drink[];
}

export default function DrinksPage({ drinks }: DrinksPageProps) {
  const { locale } = useRouter();
  return locale === "nl" ? (
    <ThaiDrinksGuide drinks={drinks} />
  ) : (
    <ThaiDrinksGuideEn drinks={drinks} />
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    drinks: getAllDrinks(),
  },
});
