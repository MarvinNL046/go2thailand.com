import Link from 'next/link';

interface CityLink {
  slug: string;
  name: string;
  region: string;
}

interface FoodCityLinksProps {
  dishName: string;
  cities: CityLink[];
}

export default function FoodCityLinks({ dishName, cities }: FoodCityLinksProps) {
  if (!cities || cities.length === 0) return null;

  return (
    <section className="mt-10 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Where to Try {dishName}
      </h2>
      <p className="text-gray-600 text-sm mb-5">
        These cities are known for their {dishName.toLowerCase()}. Explore local food scenes and restaurants.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/city/${city.slug}/food/`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-orange-200 transition-all duration-200 group"
          >
            <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
              {city.name}
            </div>
            <div className="text-sm text-gray-500 mt-1 capitalize">
              {city.region} Thailand
            </div>
            <div className="text-sm text-orange-600 font-medium mt-2">
              Explore food in {city.name} →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
