import Link from 'next/link';

const COOKING_CATEGORIES = ['main-dish', 'soup', 'curry', 'salad', 'stir-fry', 'noodle'];

interface FoodAffiliateCTAProps {
  category: string;
  dishName: string;
}

export default function FoodAffiliateCTA({ category, dishName }: FoodAffiliateCTAProps) {
  if (!COOKING_CATEGORIES.includes(category)) return null;

  return (
    <div className="bg-thailand-blue/5 border border-thailand-blue/20 rounded-2xl p-6 my-6">
      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
        Want to Learn Thai Cooking?
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Master {dishName} and other Thai dishes with hands-on cooking classes and guided food tours.
      </p>
      <div className="flex flex-wrap gap-3 mb-3">
        <a
          href="https://klook.tpo.lv/aq6ZFxvc"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-[#FF5722] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#e64a19] transition-colors"
        >
          Cooking Classes on Klook
        </a>
        <a
          href="https://getyourguide.tpo.lv/GuAFfGGK"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-[#1B9E3E] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#157a30] transition-colors"
        >
          Food Tours on GetYourGuide
        </a>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline font-medium">
          See our guide to the best cooking classes in Thailand →
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        We may earn a commission at no extra cost to you. Prices shown are from partner sites.
      </p>
    </div>
  );
}
